<script lang="ts">
  import { calculateLevel } from '$lib/integrations/codestats';
  import CodeStats from '$lib/components/uses/CodeStats.svelte';
  import BrandSheet from '$lib/components/uses/BrandSheet.svelte';
  
  export let data;
  const { stats } = data;
</script>

# What Quangdao Uses

## Programming Languages & Frameworks

- I am currently using **C#** as my primary programming language in tandum with the **.NET** environment. I also have historical experience with **PHP** and **NodeJS**.
- The UI framework I currently tend to reach for is **Svelte**, augmented by **Sveltekit** when necessary. It's a relatively recent addition to my toolbelt, and before that I would gravitate to **Vue**. Professionally, I also work in **Angular** and **React**.
- While I am perfectly satisfied with **JavaScript**, I do tend to enable **TypeScript** whenever I can.
- I've previously used **Microsoft SQL Server** as my primary database provider, but have been switching all of my personal projects over to **PostgreSQL**.

<CodeStats stats={stats.languages} />

## Editors

Right now, **VS Code** is my primary editor. I'm currently equipped with the **One Dark Pro** theme and the **Ubuntu Mono** font family. However, I've recently reacquired a **JetBrains** license and have been trying out **Rider** for my .NET development. I'm looking forward to trying out **Fleet**!

<CodeStats stats={stats.machines} />

## Other Software

- **Firefox** -- Primary Web Browser
- **DataGrip** -- Database IDE
- **Notion** -- Note-taking / Productivity Tool
- **GitHub** -- Source Code Repository
- **Netlify** -- Web Hosting
- **AWS** -- Web Hosting

## Brand

<BrandSheet />