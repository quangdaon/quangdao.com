---
title: 'Svelte × ChatGPT'
description: How I build chatbots in Sveltekit using ChatGPT.
tags: [april-fools, artificial-intelligence, chatgpt, tutorial]
categories: [Technology]
date: '2024-04-18'
---

<script>
	import MessengerLayout from '$lib/components/diagrams/chatbots/MessengerLayout.svelte';
	import MessengerLayoutChat from '$lib/components/diagrams/chatbots/MessengerLayoutChat.svelte';
	import MessengerLayoutMessages from '$lib/components/diagrams/chatbots/MessengerLayoutMessages.svelte';
</script>

Last week, I talked about how for [April Fools' 2024](/blog/april-fools-hires), I wanted to build a chatbot in Teams so employees could chat with our "new hires." Well, spoiler alert, things did not go exactly to plan, but you will have to check out that post to learn more about that.

The short version of is that I could not secure the licenses I would have needed to set up the bots' user accounts on Teams. Naturally, I went ahead and built my own chatting platform. And I did so with the help of my handy dandy ~~notebook~~ [Sveltekit](https://svelte.dev/).

I have been using Svelte for a couple of years. It is a front-end web development framework in the same vein as Angular or Vue. Svelte*kit* is the metaframework wrapper around Svelte, which introduces a predefined standard and allows for stuff like static site rendering and backend processing capabilities. If you have ever used Next.js or Nuxt, it is the same idea.

Before we get too much further into the technical details, let's meet our new teammates!

<div class="diagram">

[![Yes, I know it's Cobblepot](/images/blog/nvisia-hires/cobblepot.png)](/images/blog/nvisia-hires/cobblepot.png)

[![Jack Sparrow](/images/blog/nvisia-hires/sparrow.png)](/images/blog/nvisia-hires/sparrow.png)

</div>

Yes, I know that Oswald's last name is supposed to be Cobblepot, but I did not catch in time. Apparently not enough people know his real name to call be out on it. You can chat with Jack Sparrow and Oswald _Cobblepot_ over on [EchoVerse](https://lab.quangdao.com/echoverse).

The full codebase for this project can be found [on GitHub](https://github.com/quangdaon/chatbotgpt).

## The UI

In my opinion, one of the more interesting aspects of building a chatting application, real or fake, is building the user interface. A chat interface has many moving parts to it. Literally. At the end of the day, what we're trying to achieve is something like this:

<div class="diagram">
  <MessengerLayout level="3" />
</div>

You are welcome to inspect this diagram for yourself, but I will break it down. Essentially, what we are looking at as a nesting of flexbox components. Let's start with the largest one, the application wrapper.

<div class="diagram">
  <MessengerLayout level="1" />
</div>

```html
<div class="wrapper">
	<div class="sidebar">...</div>
	<div class="chat">...</div>
</div>
```

```scss
.wrapper {
	display: flex;

	.sidebar {
		flex: 0 0 20%;
	}

	.chat {
		flex: 1 1 auto;
	}
}
```

Using `display: flex` on our wrapper here turns it into a flexbox container. On the sidebar, I am using a flex shorthand, which sets `flex-grow` and `flex-shrink` to 0 and `flex-basis` to `20%`. `flex-basis` is kind of the "default" width of a flexbox element. The sidebar will start off at 20% of the wrapper's width and expand or shrink as necessary. However, by setting `flex-grow` and `flex-shrink` to 0, it will stay at 20% of the container.

On the other hand, setting the flex property to `1 1 auto` on the `chat` element tells it to take up the rest of the available space. The `auto` is the flex basis so by default, it will take up its natural width. However, setting both `flex-grow` and `flex-shrink` to 1 allows it to grow or shrink depending on how much space its siblings take up. So within our wrapper, the sidebar will always take up one fifth of the space to the left, and the chat will take up whatever's left.

We can skip the sidebar, it's just a list of block-level elements. But theb `chat` element is its own flex container.

<div class="diagram">
  <MessengerLayoutChat />
</div>

```html
<div class="chat">
	<div class="infobar">...</div>
	<div class="messages">...</div>
	<div class="message-entry">...</div>
</div>
```

```scss
.chat {
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	.infobar {
		flex: 0 0 auto;
	}
	.messages {
		flex: 1 1 0;
	}
	.message-entry {
		flex: 0 0 auto;
	}
}
```

We already saw the `flex: 1 1 auto` on the chat component itself from its definition as a flexbox element. But this is where we see our first example of nested flexbox, because the addition of `display: flex` makes it simultaneously a flexbox element and a flexbox container. This time, the `flex-direction: column` makes it a vertical flexbox layout. The top `infobar` and bottom `message-entry` both have `flex: 0 0 auto`. We already went over what setting `flex-grow` and `flex-shrink` to 0 does; the element will try to stick at its `flex-basis` as much as possible. Setting `flex-basis` to `auto` here causes these elements to take up their natural height (remember, we're working vertically now). So the height of these two elements will depend entire in their contents.

The configuration on the `messages` component is where it gets a bit interesting. The flex basis here is set to `0`, which means that by default, it will take up no space at all! However, by setting `flex-grow` to 1, it will expand to take up any space left over. The difference between this and the `flex: 1 1 auto` we used for the chat element is that eventually the messages will fill up with child elements and having a `flex-basis` of 0 prevents that content from growing the element. Here's what the interface looks like with the sidebar and chat components in place.

<div class="diagram">
  <MessengerLayout level="2" />
</div>

Finally, the mesages component utilizes a little bit of basis CSS to get the floating bubbles effect.

<div class="diagram">
  <MessengerLayoutMessages />
</div>

```html
<div class="messages">
	<div class="message-row">
    <div class="message other">...</div>
  </div>
	<div class="message-row">
    <div class="message self">...</div>
  </div>
	<div class="message-row">
    <div class="message other">...</div>
  </div>
</div>
```

```scss
.messages {
	flex: 1 1 0;
  overflow-y: scroll;
}

.message {
	width: 60%;
	&.self {
		margin-left: auto;
	}
}
```

Because of the `flex: 1 1 0` trick we leveraged, this component will always take up however much space is avaiable within its container. What this enables us to do make this component scrollable while floating in the middle of a grid-like layout using `overflow-y: scroll`.

<style>
  img {
    width: 100%;
  }
</style>
