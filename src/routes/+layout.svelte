<script>
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import { windowHeight, windowWidth } from '$lib/data/store';
	import '../styles/main.scss';

	export let data;
</script>

<svelte:window bind:innerHeight={$windowHeight} bind:innerWidth={$windowWidth} />

<svelte:head>
	<title>Quangdao Nguyen</title>
	<meta
		name="description"
		content="Quangdao is a creative, adaptable, and resourceful software engineer with a passion for pushing limits and challenging impossiblities."
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
</div>
