<script>
	import { browser, dev } from '$app/environment';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import Tooltip from '$lib/components/shared/Tooltip.svelte';
	import { windowHeight, windowWidth } from '$lib/data/store';
	import { plausible } from '$lib/utils/plausible';
	import '../styles/main.scss';

	export let data;

	if (browser) plausible.enableAutoPageviews();
</script>

<svelte:window bind:innerHeight={$windowHeight} bind:innerWidth={$windowWidth} />

<svelte:head>
	<PageMeta />
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
