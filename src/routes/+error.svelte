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

<style>
	.key {
		width: 100px;
		display: inline-block;
		position: absolute;
	}

	.title {
		display: inline-block;
		background: var(--color-background);
		transform: translateX(calc(var(--offset) * 1px));
		user-select: none;
		cursor: text;
	}
</style>
