<script lang="ts">
	import { page } from '$app/state';
	import NotFound from '$lib/components/page/NotFound.svelte';
</script>

{#if page.status === 404}
	<NotFound />
{:else if page.error}
	<h1>Uh-Oh!</h1>
	<p>Something went terribly wrong.</p>
{/if}
