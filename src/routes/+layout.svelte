<script>
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import { windowHeight, windowWidth } from '$lib/data/store';
	import '../styles/main.scss';

	export let data;
</script>

<svelte:window bind:innerHeight={$windowHeight} bind:innerWidth={$windowWidth} />

<PageMeta />

<div class="app">
	{#if data.path === '/'}
		<slot />
	{:else}
		<PageLayout>
			<slot />
		</PageLayout>
	{/if}
</div>
