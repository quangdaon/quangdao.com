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
