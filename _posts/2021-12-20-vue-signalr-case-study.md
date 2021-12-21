---
title: Vue SignalR Plugin Case Study
description: Last night marked the release of version 1 of my vue-signalr library and I wanted to share some insights on the project.
category: ['Technology']
tags: ['vue', 'signalr', 'plugin', 'tutorial']
---

Tonight, on December 20, 2021, after coming home from a surprise invite to a live taping of WWE Monday Night Raw, with Ricky Martin's Livin' La Vida Loca playing in the background, I released the first major version of my [`@quangdao/vue-signalr`][1] library. Now, this ain't my first rodeo with npm, but it's sure been a long time since my last one. And even though it's been less than an hour since I set off that Release 1 deployment, this package is already by far my most popular. So I just wanted to take some to time to reflect on the path that got us here, and go through the process, from creating a Vue plugin to automating the deployment, and explore the challenges along the way.

I'll be doing this as a four-part series, with each part dedicated to a major lesson learned throughout the process. Here's a handy-dandy table of contents if you just want to jump to the part that interests you:

- [How to Write a Vue 3 Plugin][2]
- Deploying to NPM Using GitHub Actions (Coming Soon)
- Managing a Public Open Source Library (Coming Soon)
- Documentation Using a GitHub Wiki (Coming Soon)

[1]: https://www.npmjs.com/package/@quangdao/vue-signalr
[2]: /2021/12/how-to-write-a-vue-3-plugin/