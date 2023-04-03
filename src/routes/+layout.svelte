<script>
	import { dev } from '$app/environment';
	import { windowHeight, windowWidth } from '$lib/data/store';
	import '../styles/main.scss';
</script>

<svelte:window bind:innerHeight={$windowHeight} bind:innerWidth={$windowWidth} />

<svelte:head>
	<title>Quangdao Nguyen</title>
	<meta
		name="description"
		content="Quangdao is a creative, adaptable, and resourceful software engineer with a passion for pushing limits and challenging impossiblities."
	/>

	{#if !dev}
		<script defer data-domain="quangdao.com" src="https://plausible.io/js/script.js"></script>
	{/if}
</svelte:head>

<div class="app">
	<slot />
</div>
