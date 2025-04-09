<script>
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import Tooltip from '$lib/components/shared/Tooltip.svelte';
	import { tracker } from '$lib/utils/tracking';
	import '../styles/main.scss';
	import 'iconify-icon';

	/** @type {{data: any, children?: import('svelte').Snippet}} */
	let { data, children } = $props();

	tracker.start();

</script>

<svelte:head>
	<PageMeta />

	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
		integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="app">
	{#if data.path === '/'}
		{@render children?.()}
	{:else}
		<PageLayout>
			{@render children?.()}
		</PageLayout>
	{/if}
	<Tooltip />
</div>
