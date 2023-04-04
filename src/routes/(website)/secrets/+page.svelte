<script lang="ts">
	import { keyValue } from '$lib/data/store';
	import { getKey } from '$lib/secrets';
	import Secrets from './secrets.md';
	import KeyMaker from '$lib/components/secrets/KeyMaker.svelte';
	import { browser } from '$app/environment';
	let solved = $keyValue === getKey(new Date());
	import Quote from '$lib/components/shared/Quote.svelte';
</script>

<Quote by="OneRepublic">
	So tell me what you want to hear
	Something that will light those ears
	I'm sick of all the insincere
	So I'm gonna give <mark>all my secrets</mark> away</Quote>

{#if browser}
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
