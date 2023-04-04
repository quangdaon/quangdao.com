<script>
	import { browser } from '$app/environment';
	import { keyValue } from '$lib/data/store';
	import { getKey } from '$lib/secrets';
	import { createEventDispatcher } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import Key from './Key.svelte';
	import ToothSelector from './ToothSelector.svelte';
	const teeth = $keyValue.split('').map((e) => +e);

	const dispatch = createEventDispatcher();

	const checkKey = () => {
		const match = $keyValue === getKey(new Date());
		if (match && browser) dispatch('solved');
	};

	$: $keyValue = teeth.join('');
</script>

<form class="keymaker" in:slide out:fade on:submit={checkKey}>
	<div class="keysizer">
		{#each teeth as tooth}
			<ToothSelector bind:value={tooth} />
		{/each}
	</div>
	<button type="submit" class="key">
		<Key key={$keyValue} />
	</button>
</form>

<style>
	.keymaker {
		z-index: 20;
		padding: 0.25em;
		border-radius: 1em;
		--color-foreground: var(--color-white);
	}

	.keysizer {
		display: inline-flex;
	}

	.key {
		margin-top: 1rem;
		width: 0;
		min-width: 100%;
		background: transparent;
		border: none;
	}
</style>
