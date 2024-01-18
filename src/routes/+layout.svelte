<script>
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import Tooltip from '$lib/components/shared/Tooltip.svelte';
	import { windowHeight, windowWidth } from '$lib/data/store';
	import { tracker } from '$lib/utils/tracking';
	import '../styles/main.scss';

	export let data;

	tracker.start();
</script>

<svelte:window bind:innerHeight={$windowHeight} bind:innerWidth={$windowWidth} />

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
		<slot />
	{:else}
		<PageLayout>
			<slot />
		</PageLayout>
	{/if}
	<Tooltip />
</div>
