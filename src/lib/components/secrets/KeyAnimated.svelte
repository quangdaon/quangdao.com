<script lang="ts">
	import { onMount } from 'svelte';
	import Key from './Key.svelte';
	import { keyLength, keyMax } from '$lib/secrets';
	const cycleValue = (keyMax + 1) ** keyLength;
	let num = 0;
	let lastUpdateMs = 0;

	function drawLoop(ms: number) {
		if (ms - lastUpdateMs > 2000) {
			num = Math.floor(Math.random() * cycleValue);
			lastUpdateMs = ms;
		}

		requestAnimationFrame(drawLoop);
	}

	onMount(() => {
		requestAnimationFrame(drawLoop);
	});

	$: key = (num % cycleValue).toString(keyMax + 1).padStart(keyLength, '0');
</script>

<div class="block">
	<p>Key: {key}</p>
		<Key {key} />
</div>

<style lang="scss">
	.block {
		margin: var(--spacing) auto;
    max-width: 200px;
		p {
      text-align: center;
			margin: 0;
		}
	}
</style>
