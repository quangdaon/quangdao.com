<script lang="ts">
	import { keyValue } from '$lib/data/store';
	import ToothSelector from './ToothSelector.svelte';
	interface Props {
		disabled?: boolean;
	}

	let { disabled = false }: Props = $props();
	const teeth = $state($keyValue.split('').map((e) => +e));

	$effect(() => {
		$keyValue = teeth.join('');
	});
</script>

<div class="keysizer">
	{#each teeth as _, i}
		<ToothSelector bind:value={teeth[i]} {disabled} />
	{/each}
</div>

<style>
	.keysizer {
		display: inline-flex;
	}
</style>
