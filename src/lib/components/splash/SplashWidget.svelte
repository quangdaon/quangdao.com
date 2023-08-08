<script lang="ts">
	import { onMount } from 'svelte';
	import HandWidget from './widgets/HandWidget.svelte';
	import JamWithMeWidget from './widgets/JamWithMeWidget.svelte';
	import type { CurrentlyPlayingDetails } from '$lib/integrations/spotify/models';

	let showWidget = false;
	let spotify: CurrentlyPlayingDetails;

	onMount(async () => {
		showWidget = true;
		spotify = await (await fetch('/api/spotify')).json();
	});
</script>

{#if showWidget}
	<div class="widget">
		<div class="widget-container">
			{#if spotify}
				<JamWithMeWidget />
			{:else}
				<HandWidget />
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.widget {
		position: relative;
		display: inline-block;
	}
</style>
