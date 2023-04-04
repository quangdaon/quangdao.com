<script>
	import Key from './Key.svelte';
	import ToothSelector from './ToothSelector.svelte';
	const teeth = [0, 0, 0, 0, 0, 0];
	$: key = teeth.join('');
</script>

<div class="keybuilder">
	<div class="keysizer">
		{#each teeth as tooth}
			<ToothSelector bind:value={tooth} />
		{/each}
	</div>
	<div class="key">
		<Key {key} />
	</div>
</div>

<style>
	.keybuilder {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: calc(100% + 1rem);
		z-index: 20;
		padding: 0.25em;
		border-radius: 1em;
		--color-foreground: var(--color-white);
	}

	.keysizer {
		display: flex;
	}

	.key {
		margin-top: 1rem;
		width: 0;
		min-width: 100%;
	}
</style>
