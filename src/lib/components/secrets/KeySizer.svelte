<script lang="ts">
	import { run } from 'svelte/legacy';

	import { keyValue } from '$lib/data/store';
	import KeyAnimated from './KeyAnimated.svelte';
	import ToothSelector from './ToothSelector.svelte';
	interface Props {
		disabled?: boolean;
	}

	let { disabled = false }: Props = $props();
	const teeth = $state($keyValue.split('').map((e) => +e));

	run(() => {
		$keyValue = teeth.join('');
	});
</script>

<div class="keysizer">
	{#each teeth as tooth, i}
		<ToothSelector bind:value={teeth[i]} {disabled} />
	{/each}
</div>

<style>
	.keysizer {
		display: inline-flex;
	}
</style>
