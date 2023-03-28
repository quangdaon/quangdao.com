---
title: SignalR Exception Handling in .NET Core
description: How to forward exceptions thrown in a SignalR hub to your clients.
category: ['Technology']
tags: ['signalr', 'tutorial']
date: '2022-02-20'
---

While working on a project, I came upon the need to forward errors thrown in a SignalR Hub to the client. However, when looking up best practices, I was surprised to find that there was not much information on this. I first came across a [Stack Overflow question](https://stackoverflow.com/questions/21796087/signalr-owin-and-exception-handling) that admitted took me far too long to realize was for .NET MVC, and not .NET Core. After that, I found a few suggestions to wrap every hub method in a try/catch block. `HubException` also exists, but they require the client to handle the error every time it invokes a message. In my opinion, neither of those are very sustainable. But eventually, I came across the perfect tool for centralized exception handling: `HubFilters`.

### Basic Implementation

The most basic implementation of this is almost entirely covered in [Microsoft's official documentation on `HubFilter`](https://docs.microsoft.com/en-us/aspnet/core/signalr/hub-filters). You can read that to learn more about how to create and register custom filters. Their example is actually an error _logging_ filter, but we can easily repurpose that to send the error message to the client like so:

```csharp
public class HubExceptionsFilter : IHubFilter
{
  public async ValueTask<object> InvokeMethodAsync(
      HubInvocationContext invocationContext, Func<HubInvocationContext, ValueTask<object>> next)
  {
    try
    {
      return await next(invocationContext);
    }
    catch (HubException ex)
    {
      await invocationContext.Hub.Clients.Caller.SendAsync("NoticeSent", ex.Message);
      throw;
    }
  }
}
```

If you're using strongly typed hubs like me, you have to cast the hub to get the available methods. As far as I know, there is no way to bind a HubFilter to a specific hub.

```csharp
public class CustomHubExceptionsFilter : IHubFilter
{
  public async ValueTask<object> InvokeMethodAsync(
      HubInvocationContext invocationContext, Func<HubInvocationContext, ValueTask<object>> next)
  {
    var hub = invocationContext.Hub as CustomHub;
    try
    {
      return await next(invocationContext);
    }
    catch (HubException ex)
    {
      await hub.Clients.Caller.ExceptionThrown(ex.Message);
      throw;
    }
  }
}
```

That's it! Now, you can just listen to `ExceptionThrown` messages in your client app just like any other message.

### Handling Broadcast Scopes

In the implementation we reached above, the exception is only sent to the caller who triggered it. Of course, you can configure that yourself to broadcast the message however you want; whether the caller, the group, or to every client. But my project has a particular requirement: depending on the nature of the exception, it needs to be broadcasted to varying scopes. This can either be just the caller, the entire group, or the host of the group. Additionally, my project also wants to display a title of the exception. To support all of this, I wrote a simple `BaseException`:

```csharp
public enum ExceptionScope {
  Caller,
  Group,
  Host
}

public class BaseException : HubException
{
  public string Title { get; set; }
  public ExceptionScope Scope { get; set; }

  public BaseException(ExceptionScope scope, string message) : base(message)
  {
    Scope = scope;
  }
}
```

Since the exception event no longer just sends a single message, I also needed a model of the data to send to the client. I made mine a generic `NoticeModel` since I'm using the same method for sending other notices.

```csharp
public class NoticeModel
{
  public string Type { get; set; }
  public string Title { get; set; }
  public string Message { get; set; }
}
```

After that, we need to update the filter to handle the messaging based on the scope of the exception:

```csharp
public class CustomHubExceptionsFilter : IHubFilter
{
  public async ValueTask<object> InvokeMethodAsync(
      HubInvocationContext invocationContext, Func<HubInvocationContext, ValueTask<object>> next)
  {
    var hub = invocationContext.Hub as CustomHub;
    try
    {
      return await next(invocationContext);
    }
    catch (BaseException ex)
    {
      switch (ex.Scope)
      {
        case ExceptionScope.Caller:
          await hub.Clients.Caller.NoticeSent(ExceptionToNotice(ex));
          break;
        case ExceptionScope.Host:
          var host = hub.GetHostConnectionId();
          await hub.Clients.Client(host).NoticeSent(ExceptionToNotice(ex));
          break;
        case ExceptionScope.Group:
          var group = hub.GetGroup();
          await hub.Clients.Group(group).NoticeSent(ExceptionToNotice(ex));
          break;
        default:
          await hub.Clients.Caller.NoticeSent(ExceptionToNotice(ex));
          break;
      }

      throw;
    }
    catch (Exception ex)
    {
      await hub.Clients.Caller.NoticeSent(new NoticeModel
      {
        Type = "error",
        Title = "Unknown Error Occurred",
        Message = ex.Message
      });

      throw;
    }
  }

  private static NoticeModel ExceptionToNotice(BaseException ex)
  {
    return new NoticeModel
    {
      Type = "error",
      Title = ex.Title,
      Message = ex.Message
    };
  }
}
```

From here, we can of course throw a `BaseException` a la `throw new BaseException(ExceptionScope.Caller, "Some error occurred.")`. However, my preferred approach is to create child exception classes for each type of exception. For example, an InvalidInputException might look something like:

```csharp
public class InvalidInputException : BaseException
{
  public InvalidInputException(string message = "The input is invalid.") :
    base(ExceptionScope.Caller, message)
  {
    Title = "Invalid Input";
  }
}
```

Now, any time an unexpected result occurs in our hub, we can throw the appropriate exception, and our handler will broadcast it to the appropriate parties. This can be extended to support other scopes, such as a GlobalException that gets broadcasted to connected all users.