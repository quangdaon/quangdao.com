---
title: 'Breaking: Penguin and Sparrow join nvisia'
description: For April Fools' this year, I recruited The Penguin and Captain Jack Sparrow to join nvisia.
tags: [april-fools, artificial-intelligence, chatgpt]
categories: [Humor]
date: '2024-04-04'
---

<script>
	import Quote from '$lib/components/shared/Quote.svelte';
</script>

Back in April 2021, I somewhat made a name for myself by quitting my job. I had sent an email to my entire company indicating my resignation to become an anglerfish breeder. In the email, I left a link to my newly established business for anyone interested in obtaining anglerfish for themselves. After giving our VP of finance a heart attack and receiving a panicked call from HR, people eventually realized that the email was sent on April 1st and that my “link” was just a redirect to [a YouTube video of some guy dancing to 80s pop](https://www.youtube.com/watch?v=dQw4w9WgXcQ).

In 2022, guidelines for isolation due to the COVID-19 pandemic were starting to loosen up, and people were working on-site more frequently. As such, I thought it would be fun to do an in-person April Fool’s prank at our Milwaukee office. Unfortunately, this means that our Chicago and Madison offices would be left out, as would the individuals who continue to work remotely or at a client site. However, the reactions of people walking into an office taken over by penguins was worth it.

April Fool’s 2023 was on a Saturday, so I didn’t do anything. Well, technically, I did have an idea, but it was rejected by HR, which in hindsight is probably for the best so that I can retain plausible deniability on executing April Fool’s pranks during weekends. But here we are now, in 2024, and I need to make up for missing a year of action.

## The Plan

My initial idea was simple. In 2021, an employee left the company in a spectacular fashion, so what if, in 2024, a new employee joins? Now, it could just be some Joe Shmo with a fake profile and the big reveal is that this guy doesn’t actually exist and everyone’s just been welcoming nobody, but that is not very fun. What if the new employee was someone prominent, who appears in mainstream media, and who many nvisians would recognize, such as… The Penguin from Batman.

At nvisia, whenever a new employee is hired, they fill out a small questionnaire that gets shared with the rest of the company so we can get to know them better. Unfortunately, I don’t have access to post to this channel so I would need to get in cahoots with our talent acquisition team. As I was thinking through how Mr. Oswald Chesterfield “The Penguin” Copperpot would answer some of these questionnaire questions, something dawned on me. We wouldn’t hire new employees and not set up Teams account for them.

Obviously, no one would be fooled into thinking a supervillain from DC Comics is actually joining the company and they don’t need to search for that employee in the employee directory to know it’s fake. But what if they did anyway? I’m always down for adding an extra layer to my jokes and rewarding curious minds. To add a new user profile, I would also need our systems administrator’s help. At this point, I’m thinking of switching from the Penguin to Captain Jack Sparrow to get on the good side of our SysAdmin, who himself is a pirate. However, I did not want to lose out on the throwback to 2022 with the penguins.  That was when I decided that nvisia will be getting two new hires on April 1st, 2024. After all, we do operate in two regions and it’s not fair for one of them to be left out again.

There is still one more thing to cover. What happens if someone tries to talk to these profiles? These profiles were clearly fake, so it is reasonable that they don’t actually respond, right? No one ever said an April Fool’s joke needs to be so elaborate, and I did intend to just stop there. Until I was reminded of [this Code Bullet experiment](https://www.youtube.com/watch?v=g39AagVW0s0). Essentially what I'm saying is that up to this point, everything you have read was a whole lot of exposition to finally arrive at the fact that I built two chatbots using ChatGPT for April Fools', and this is how I did it.

## Connecting to ChatGPT

This part was surprisingly very easy. Mr. Bullet graciously left a link in his video description that pointed back to [the tutorial he followed](https://www.youtube.com/watch?v=gI9QSHpiMW0&t=1925s). This tutorial focused specifically on Unity, but leveraged a library that did all of the heavy lifting as far as communicating with the OpenAI API. To start, I wrote a console app to test my bots. Since the internal logic to connect with OpenAI will be shared between this testing interface and the actual Teams bot, I created a separate project for it, which I called `CharacterChatbot.Engine`. It was ultimately only comprised of the definition of a chatbot profile and what I called the `ChatContext`.

The profile is more or less just the configuration for each bot. In fact, it's the literal configuration model that I am binding the settings to.

```cs
public record ChatbotProfile
{
  public string DisplayName { get; set; }
  public string Prompt { get; set; }
}
```

The `ChatContext` is responsible for maintaining the history of a conversation and for generating the next message via ChatGPT. When a context is created, it generates the prompt and supplies the user's name. It also instatiates the service to connect to OpenAI.

```cs

public class ChatContext
{
  // always append this partial to tell the bot they're in a Teams chat and to supply the user's name.
  private const string CONSTANT_PROMPT = "{0} has opened a private Microsoft Teams chat with you.";
  private readonly OpenAIAPI _api;
  private readonly List<ChatMessage> _messages;

  public readonly string Prompt;

  public ChatContext(string secretKey, string user, ChatbotProfile profile)
  {
    Prompt = $"{profile.Prompt} {string.Format(CONSTANT_PROMPT, user)}";

    _api = new OpenAIAPI(secretKey); // instantiate service from OpenAI library
    _messages = new List<ChatMessage>
    {
      new(ChatMessageRole.System, Prompt)
    };
  }
}
```

The context also exposes a method to process the next message:

```cs
public async Task<string> Process(string next)
{
  var userMessage = new ChatMessage(ChatMessageRole.User, next);
  _messages.Add(userMessage);
  
  var chatResult = await _api.Chat.CreateChatCompletionAsync(new ChatRequest
  {
    Model = Model.ChatGPTTurbo, // ChatGPT-3.5 Turbo model
    Temperature = 0.1, // level of variance
    MaxTokens = 180, // max tokens generated
    Messages = _messages
  });
  
  
  var responseMessage = chatResult.Choices[0].Message;
  _messages.Add(responseMessage);

  return responseMessage.TextContent;
}
```

This `Process` method is the meat of the application. The way ChatGPT works is that each time you want it to process a message, you have to send the entire conversation thread to it through the OpenAI API, and it figures out how to follow up based on prior messages. In other words, OpenAI does not retain a record of the conversation. That is why the context is holding the conversation in memory. When we send the chat completion request, we're also specifying a few other things.

The `Model` is the version of the GPT engine that we want to use. In this case, `Model.ChatGPTTurbo` is the most advanced version of the GPT-3.5 model. I've also played around with GPT-4, which is, obviously enough, `Model.GPT4`. While that model was more advanced, it was also a lot more expensive. The `Temperature` argument represents the variance in its responses. The higher this value is, the more creative its responses will be, but it will also be more likely to deviate from the prompt. `MaxTokens` is the maximum number of tokens it will generate in a response. This is useful if you need to limit API usage, but I've found that declaring a max can occasionally cause it to cut off in the middle of a sentence.

And finally we supply our messages and send the request. OpenAI responds with a couple options, but for the purpose of an automated chat system, I just need to take the first one. We also need to add this message back to the list of messages that our context is keeping track of.

## Testing the Bot

As mentioned, I wanted to test this bot through a small console application. This will be a separate .NET Console Application project called `CharacterChatbot.Cli`. The specific details around configuring the app and loading a specific profile is not critical to this console app. If interested, you can find the full codebase on [GitHub](https://github.com/quangdaon/CharacterChatbot). What is important is the message loop and using the `ChatContext`. So for this purpose, we'll just use a hard-coded bot profile.

```cs
var chatbotProfile = new ChatbotProfile {
  DisplayName = "Captain Jack Sparrow",
  Prompt = "You are pirate captain, Jack Sparrow."
};

// the secret would be stored securely and passed into the console via a configuration;
// the name is just hardcoded to "Quangdao Nguyen" for this testing app but will ideally
// be coming from the chatting user's Teams profile
var context = new ChatContext(SECRET_KEY, "Quangdao Nguyen", chatbotProfile);

Console.WriteLine("ChatGPT Prompt: {0}", context.Prompt);
Console.WriteLine();

Console.WriteLine("You are speaking to {0}.", chatbotProfile.DisplayName);
Console.WriteLine();

// starts a recursive function
await DoMessageLoop();
```

This is the very beginning of our console app, where we are creating the context and then outputting some details, such as the full prompt and the name of the bot. Then we kick off a recursive method to handle our I/O. Here's what that method looks like:

```cs
async Task DoMessageLoop()
{
  Console.Write("You: ");
  var next = Console.ReadLine(); // capture user input

  // exit clause to stop the loop if user submits a blank message
  if (string.IsNullOrWhiteSpace(next)) return;

  var response = await context.Process(next);

  Console.WriteLine("{0}: {1}", chatbotProfile.DisplayName, response);

  // recursively call the same method
  await DoMessageLoop();
}
```

When dealing with recursion, you always want to have some sort of exit condition, otherwise your users will be trapped in an inescapable loop. In this case, if the user ever submits an empty message, the method will end without repeating. If the user does submit a message, it gets passed to the `Process` method on our context to process the message. Once a response comes back, it gets outputted to the console as a message from the bot. Then we call the same method again, which restarts the process by asking our user for their next message. Wash, rinse, repeat. Here's an example dialog with this configuration:

```
ChatGPT Prompt: You are pirate captain, Jack Sparrow. Quangdao Nguyen has opened a private Microsoft Teams chat with you.

You are speaking to Captain Jack Sparrow.

You: Ahoy! 
Captain Jack Sparrow: Ahoy there, Quangdao Nguyen! What brings ye to this corner of the seven seas?
You: What have you been up to? Any good plunders lately?
Captain Jack Sparrow: Ah, the life of a pirate is never dull, mate. We've been sailing the Caribbean, dodging the British Navy, and searching for lost treasure. As for plunders, well, let's just say we've had our fair share of gold doubloons and precious gems. But the greatest treasure, as always, is the freedom of the open sea.
You: That's awesome! Goodbye.
Captain Jack Sparrow: Fair winds and following seas, Quangdao Nguyen. Until we cross paths again, mate. Goodbye!
You: 

Process finished with exit code 0.
```

## Connecting to Teams

The most surprising part of this endeavor was how difficult setting up a development environment for Teams ended up being. I don't mean connecting to Microsoft's Graph API, or reading chat messages. It was more challenging just to create a sandbox organization where I can log into Teams as multiple users. At one point, I even remarked to a friend that:

<Quote by="me">
  It's harder to set up a development environment for Teams than it is to create an AI that pretends to be a specific fictional supervillain / pirate captain.
</Quote>

But I'm not going to dwell on that too much. Long story short, Microsoft closed their M365 developer subscription without making that obvious and I am now the proud owner of an actual M365 Business Plan. At least for the duration of the free trial.

With a way to test the bot, all that's left to do is hook it up to Teams. The bots will be powered by a .NET console application, similar to our testing app. This is how I had planned for the app to work:

1. Log into the bot's Microsoft user account
2. Fetch a list of one-on-one private chats
3. For each chat, retrieve the messages and spawn a `ChatContext`
4. Complete chats where the latest message did not come from the bot
5. Wait five minutes then repeat from 2

You may notice a pretty major hole in this plan. I had originally designed the `ChatContext` with the idea that each one would keep track of the entire conversation and process new messages one at a time. As I was designing the bot console app, I realized that it would make more sense to just retrieve the entire conversation from the Microsoft Graph API and send the whole transcript to OpenAI. This means that the way I was managing the chats would need to be reworked somewhat. However, I decided this was a bridge I can cross when I get there. First, I wanted to make sure that this idea would work and I can build the Teams bot in the first.

The first real challenge in creating the Teams bot is being able to log into the console app as the bot. At one point, I had thought about switching to a web-based app to be able to take advantage of an OAuth authorization grant flow. However, in my research, I came across [this video tutorial](https://www.youtube.com/watch?v=y9JKjMzU4-w) that uses the Microsoft Authentication Library to implement a username credentials login flow in a console app. I largely followed the techniques used here, with some changes to make it work with more recent versions of the library.

The core of this implementation is the `MsalAuthenticationProvider`, which implements `IAuthenticationProvider` and uses a username and password to request an access token. My implementation was largely the same as the tutorial:

```cs
public class MsalAuthenticationProvider : IAuthenticationProvider
{
  private static MsalAuthenticationProvider _singleton;
  private readonly IPublicClientApplication _clientApp;
  private readonly string[] _scopes;
  private readonly string _username;
  private readonly string _password;
  private string _userId;

  private MsalAuthenticationProvider(IPublicClientApplication clientApp, string[] scopes, string username,
    string password)
  {
    _clientApp = clientApp;
    _scopes = scopes;
    _username = username;
    _password = password;
  }

  public static MsalAuthenticationProvider GetInstance(IPublicClientApplication clientApp, string[] scopes,
    string username, string password)
  {
    if (_singleton is null)
    {
      _singleton = new MsalAuthenticationProvider(clientApp, scopes, username, password);
    }

    return _singleton;
  }

  public async Task AuthenticateRequestAsync(RequestInformation request,
    Dictionary<string, object> additionalAuthenticationContext = null,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var accessToken = await GetTokenAsync();
    request.Headers.Add("Authorization", $"Bearer {accessToken}");
  }

  private async Task<string> GetTokenAsync()
  {
    if (!string.IsNullOrEmpty(_userId))
    {
      try
      {
        var account = await _clientApp.GetAccountAsync(_userId);

        if (account is not null)
        {
          var silentResult = await _clientApp.AcquireTokenSilent(_scopes, account).ExecuteAsync();
          return silentResult.AccessToken;
        }
      }
      catch (MsalUiRequiredException)
      {
      }
    }

    var result = await _clientApp.AcquireTokenByUsernamePassword(_scopes, _username, _password).ExecuteAsync();
    _userId = result.Account.HomeAccountId.Identifier;
    return result.AccessToken;
  }
}
```

With the auth provider set up, the next step is to create the Graph client. This was provided through the `Microsoft.Graph` library.

```cs
var domain = "mymsfttenant.onmicrosoft.com"; // Read from config

var username = ReadUsername(); // Basically Console.ReadLine with a label
var password = ReadPassword();

var clientId = "<client_id>"; // Read from config
var tenantId = "<tenant_id>";
var authority = $"https://login.microsoftonline.com/{tenantId}";

var cca = PublicClientApplicationBuilder.Create(clientId).WithAuthority(authority).Build();

var authProvider = MsalAuthenticationProvider.GetInstance(cca, Scopes, $"{username}@{domain}", password);
var client = new GraphServiceClient(authProvider);
```

Once I got to this point, it was fairly easy to read and send messages through Teams as the bot user. The client did most of the work and is fairly comprehensive. Here are some examples of the methods I used.

```cs
public async Task<IEnumerable<Chat>> GetChats()
{
  var response = await _client.Me.Chats.GetAsync(requestConfiguration =>
  {
    requestConfiguration.QueryParameters.Expand = ["members"];
  });

  return response?.Value!.Where(e => e.ChatType == ChatType.OneOnOne);
}

public async Task<IEnumerable<ChatMessage>> GetChatMessages(string id)
{
  var response = await _client.Me.Chats[id].Messages.GetAsync();

  return response?.Value!.Where(e => e.DeletedDateTime is null && e.MessageType == ChatMessageType.Message);
}

public async Task<ConversationMember> GetChatParticipant(Chat chat)
{
  var profile = await GetProfile();
  var members = chat.Members!
    .OfType<AadUserConversationMember>()
    .Where(e => e.UserId != profile.Id);

  return members.Single();
}

public Task SendMessage(string id, string message)
{
  return _client.Me.Chats[id].Messages.PostAsync(new ChatMessage
  {
    Body = new ItemBody
    {
      Content = message
    }
  });
}
```

Perhaps you remember me saying many moons ago that all we had left to do was connect the ChatGPT bot to Teams. Well it is finally time. First, I needed to address the ChatContext issue.

Except...

That never happened.

## Another Microsoft-Sized Wrench in the Plans

It wasn't until after putting in all that work when I finally decided that it was time to gather my accomplices. While everyone was on board before I even I explained what the plan was, we quickly came across an issue that I had not considered and it was a hurdle I could not overcome. We would need a license for each of these Microsoft Teams bot accounts. And we would have needed to purchase the licenses for a whole year.

So the Teams bot idea unfortunately ended up being scrapped. But that was not the end of it, because I had a backup idea. I had mentioned earlier that creating a ChatGPT chatbot was "surprisingly very easy." It was so easy in fact, that I was willing to do it again, in a different language. But you'll have to tune in next week to learn more about that 😉

Until then, you can check out the .NET console version of this chatbot over [on GitHub](https://github.com/quangdaon/CharacterChatbot). The work I've started to implement to connect with Teams is in [a separate branch](https://github.com/quangdaon/CharacterChatbot/tree/teams).