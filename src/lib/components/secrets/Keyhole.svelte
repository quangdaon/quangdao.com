<script>
	import { browser } from '$app/environment';
	import { keyValue } from '$lib/data/store';
	import { getKey } from '$lib/secrets';
	import { createEventDispatcher } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import Key from './Key.svelte';
	import KeySizer from './KeySizer.svelte';
	let showBuilder = false;

	const dispatch = createEventDispatcher();

	const checkKey = () => {
		const match = $keyValue === getKey(new Date());
		if (match && browser) dispatch('solved');
	};
</script>

<div class="keyhole-container">
	<button
		class="keyhole"
		title="Hmm... What could this possibly be?"
		on:click={() => (showBuilder = !showBuilder)}
	>
		<svg viewBox="0 0 100 150">
			<circle cx="50" cy="50" r="50" class="keyhole-shape" />
			<rect x="25" y="60" rx="10" width="50" height="75" class="keyhole-shape" />
		</svg>
	</button>

	{#if showBuilder}
		<form class="keymaker" on:submit={checkKey}>
			<div class="sizer" in:slide|local out:fade|local>
				<KeySizer />
			</div>
			<button type="submit" class="key" transition:fade|local>
				<Key key={$keyValue} />
			</button>
		</form>
	{/if}
</div>

<style lang="scss">
	@use '~/breakpoints';

	svg {
		width: 50px;
	}

	
	.keymaker {
		z-index: 20;
		// padding: 0.25em;
		border-radius: 1em;
		--color-foreground: var(--color-white);
	}

	.keyhole {
		display: none;
		margin: auto;
		background-color: transparent;
		border: none;
		@include breakpoints.large {
			display: block;
		}
	}

	.sizer {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: calc(100% + 1rem);
	}

	.keyhole-shape {
		fill: var(--color-black);
		stroke: none;
	}

	.key {
		position: absolute;
		width: 250px;
		top: 0;
		left: 50%;
		background: transparent;
		border: none;
		filter: drop-shadow(0 0 60px var(--color-black));
		z-index: 30;
	}
</style>
