<script lang="ts">
	import { onMount } from 'svelte';
	import HandWidget from './widgets/HandWidget.svelte';
	import { apiGet } from '$lib/api';
	import JamWithMeWidget from './widgets/JamWithMeWidget.svelte';
	import type { JamWithMeDetails } from '$lib/integrations/jam-with-me/models';

	let showWidget = false;
	let music: JamWithMeDetails | null;

	const refreshJamWithMe = async () => {
		music = await apiGet('/api/jam-with-me');
		if (!music) return;

		console.log('Now playing: ' + music.track.title);

		const diff = music.track.duration - music.track.progress;

		setTimeout(refreshJamWithMe, diff);
	};

	onMount(async () => {
		await refreshJamWithMe();
		showWidget = true;
	});
</script>

{#if showWidget}
	<div class="widget">
		<div class="widget-container">
			{#if music}
				<JamWithMeWidget {music} />
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
