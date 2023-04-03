<script lang="ts">
  import { calculateLevel } from '$lib/integrations/codestats';
  import CodeStats from '$lib/components/uses/CodeStats.svelte';
  
  export let data;
  const { stats } = data;
</script>

# Uses

## Programming Languages & Frameworks

### Primary:

- C# / .NET
- JavaScript (Primarily TypeScript)
- Svelte / Sveltekit

<CodeStats stats={stats.languages} />

## Editors

<CodeStats stats={stats.machines} />
