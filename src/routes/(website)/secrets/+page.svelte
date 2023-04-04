<script lang="ts">
	import { keyValue } from '$lib/data/store';
	import { getKey } from '$lib/secrets';
	import Secrets from './secrets.md';
	import KeyMaker from '$lib/components/secrets/KeyMaker.svelte';
	import { browser } from '$app/environment';
	let loaded = browser;
	let solved = $keyValue === getKey(new Date());
</script>

{#if loaded}
	{#if !solved}
		<div class="keymaker">
			<KeyMaker on:solved={() => (solved = true)} />
		</div>
	{:else}
		<Secrets />
	{/if}
{/if}

<style>
	.keymaker {
		width: 200px;
		margin: auto;
		text-align: center;
	}
</style>
