<script lang="ts">
	import { onMount } from 'svelte';
	import HandWidget from './widgets/HandWidget.svelte';
	import { apiGet } from '$lib/api';
	import { delay } from '$lib/utils/delay';
	import JamWithMeWidget from './widgets/JamWithMeWidget.svelte';
	import type { JamWithMeDetails } from '$lib/integrations/jam-with-me/models';
	import { fade } from 'svelte/transition';

	type Widget = 'hand' | 'jam-with-me';

	let music: JamWithMeDetails | null;

	let widget: Widget | null = 'hand';

	const transitionDuration = 500;

	const refreshJamWithMe = async () => {
		music = await apiGet('/api/jam-with-me');
		if (!music) {
			setWidget('hand');
			return;
		}

		const diff = music.track.duration - music.track.progress;

		// Not using delay because we don't want to wait on this
		setTimeout(refreshJamWithMe, diff);
	};

	const setWidget = async (w: Widget) => {
		if (widget === w) return;
		widget = null;
		await delay(transitionDuration);
		widget = w;
	};

	onMount(async () => {
		await Promise.all([delay(3000), refreshJamWithMe()]);
		if (music) await setWidget('jam-with-me');
	});
</script>

<div class="widget">
	{#key widget}
		<div class="widget-container" transition:fade|global={{ duration: transitionDuration }}>
			{#if widget === 'jam-with-me' && !!music}
				<JamWithMeWidget {music} />
			{:else if widget === 'hand'}
				<HandWidget />
			{/if}
		</div>
	{/key}
</div>

<style lang="scss">
	.widget {
		position: relative;
		display: inline-block;
		width: 1.4em;
	}
</style>
