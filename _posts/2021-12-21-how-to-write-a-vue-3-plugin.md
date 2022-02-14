---
title: How to Write a Vue 3 Plugin
description: A quick tutorial on how to create a plugin for Vue 3, based on my experience with Vue SignalR.
category: ['Technology']
tags: ['vue', 'signalr', 'plugin', 'tutorial']
---

If you want to get technical, a Vue plugin is really just an object that contains an `install` function. Do you just want to write a plugin for the sake of writing a plugin? Just copy and paste this snippet below:

```typescript
export const MyCustomPlugin = {
  install() {
    console.log('Hello world!');
  },
};
```

Boom! 💥 You are now the proud author of a custom Vue plugin. This plugin actually works with both Vue 2 and Vue 3, so hooray for backwards compatibility! Okay, obviously that's not what you're looking for. However, just like learning a new programming language, this is as good a place as any to start. So let's install it. In Vue 3, that would look something like this:

```typescript
import { createApp } from 'vue';
import { MyCustomPlugin } from './my-custom-plugin';
import App from './App.vue';

const app = createApp(App);
app.use(MyCustomPlugin);
app.mount('#app');
```

When you install this plugin and start up your app, the message `Hello world!` will appear in the console. This might be what you had expected, but it should also hint at how a Vue plugin works; specifically the fact that anything you put in the install method is run immediately upon installation. Let's make this plugin actually do something. For this example, we'll be building a simple counter plugin.

When a plugin is installed, Vue actually passes in a couple of arguments to it. The first is the instance of Vue itself. This allows us to hook into the app, so we can do things such as declare global components, attach a mixin, or even install other plugins. In our case, we'll be providing a service that can be injected into your components. The second argument is your options. Anything you pass to the `app.use` call above after the plugin itself is forwarded here. The full signature looks something like this:

```typescript
export const MyCustomPlugin = {
  install(app: App, options: any) {
    console.log('Hello world!');
  },
};
```

> Note: I dug into Vue's source code a bit and found that 1) the plugin doesn't necessarily need to be an object with an install method. It can just be the install method itself; ie a function with the same signature. Also 2) the options param is actually a ...rest, so any number of arguments can be forwarded to a plugin. However I have not used either of these techniques, so your milage may vary.

Coming from a .NET background, and having been working a lot with Angular at the time I started, `@quangdao/vue-signalr` was built as an injectable service. We'll be following that pattern for our little counter. So let's start by creating the service.

```typescript
export interface CounterConfig {
  initialValue?: number;
  step?: number;
}

export class CounterService {
  public readonly count: Ref<number>;
  private options: CounterConfig;

  constructor(options: CounterConfig) {
    this.options = {
      initialValue: 0,
      step: 1,
      ...options,
    };

    count = ref(this.options.initialValue);
  }

  increment() {
    count.value += this.options.step;
  }

  decrement() {
    count.value -= this.options.step;
  }
}
```

Depending on your familiarity with TypeScript, this class should be fairly straightforward. `count` is a `Ref` in this case, because we want to leverage Vue's reactivity on it, but besides that it's just a class with two methods to either increase or decrease the aforementioned count by a step configured through the options.

Let's get this service to our end users. In our plugin definition, we will need to create an instance of the service, and then use Vue to `provide` the instance so it can be injected in our components. I'm a fan type-safety, so while Vue's injector accepts hard-coded "magic" string values, for me, that's a big no-no. To fix that, we will also create an injection key. With all that in place, our plugin now looks like this:

```typescript
import { CounterConfig, CounterService } from './service';

import { InjectionKey } from 'vue';

export const CounterSymbol: InjectionKey<CounterService> = Symbol('CounterService');

export const CounterPlugin = {
  install(app: App, options: CounterConfig) {
    const service = new CounterService(options);
    app.provide(CounterSymbol, service);
  }
};
```

At this point, we're pretty much done with our plugin. Users can now use it like this:

```vue
{% raw %}
<template>
  <p>{{count}}</p>
  <button @click="decrement">-</button>
  <button @click="increment">+</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { CounterSymbol } from './counter-plugin';

export default defineComponent({
  name: 'App',  
  setup() {
    const counter = inject(CounterSymbol);

    if (!counter) {
      throw new Error('Failed to inject counter!');
    }

    return {
      count: counter.count,
      increment: counter.increment,
      decrement: counter.decrement
    }
  }
});
</script>
{% endraw %}
```

As you might have noticed, there is a catch with this approach. Because of the way Vue sets it up, `inject` technically _could_ return undefined. Therefore, if you're using TypeScript, you need a null check before using it. Thanks to a tip from [a helpful GitHub user], I found out that a relatively common pattern in Vue 3 is to provide a function (or "composable") that injects the service. Simply add this to the plugin file:

```typescript
export function useCounter() {
    const counter = inject(CounterSymbol);

    if (!counter) {
      throw new Error('Failed to inject counter!');
    }

    return counter;
}
```

Then, instead of using `const counter = inject(CounterSymbol);`, users consuming the plugin can now call `const counter = useCounter();`. Congratulations, you have just created your first Vue 3 plugin!

At this stage, you have the foundation for creating a Vue plugin that can do anything your heart desires. You don't even have to follow the service pattern I used here. The important part is understanding the plugin installation flow. I know the word "just" is thrown around a lot in the software world, but at the root of it, a Vue plugin really is _just_ a function. Whether a plugin is the correct route for supplying a certain feature could be up for debate, but that is a topic for another day. For now, let's rejoice in the fact that when the need comes, you can write a Vue plugin.

[1]: https://www.npmjs.com/package/@quangdao/vue-signalr
[2]: /2021/12/vue-signalr-case-study/