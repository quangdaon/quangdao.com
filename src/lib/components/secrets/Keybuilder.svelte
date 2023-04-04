<script>
	import Key from './Key.svelte';
	const teeth = [0, 0, 0, 0, 0, 0];
	$: key = teeth.join('');
</script>

<div class="keybuilder">
	<div class="keysizer">
		{#each teeth as tooth, i}
			<input type="number" bind:value={teeth[i]} max="5" min="0" />
		{/each}
	</div>
	<div class="key">
		<Key {key} />
	</div>
</div>

<style>
	.keybuilder {
		position: fixed;
		width: 200px;
		left: 0;
		top: 0;
    z-index: 20;
	}

  .keysizer {
    display: flex;
  }

	.key {
		width: 100%;
	}
</style>
