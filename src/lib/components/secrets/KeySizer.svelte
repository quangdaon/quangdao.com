<script lang="ts">
	export let disabled: boolean = false;
	import { keyValue } from '$lib/data/store';
	import ToothSelector from './ToothSelector.svelte';
	const teeth = $keyValue.split('').map((e) => +e);

	$: $keyValue = teeth.join('');
</script>

<div class="keysizer">
	{#each teeth as tooth}
		<ToothSelector bind:value={tooth} {disabled} />
	{/each}
</div>

<style>
	.keysizer {
		display: inline-flex;
	}
</style>
