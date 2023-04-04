<script lang="ts">
	import { keyValue } from '$lib/data/store';
	import { getKey } from '$lib/secrets';
	import Secrets from './secrets.md';
	import { browser } from '$app/environment';
	let solved = $keyValue === getKey(new Date());
	import Quote from '$lib/components/shared/Quote.svelte';
	import { fade } from 'svelte/transition';
	import KeyHole from '$lib/components/secrets/KeyHole.svelte';
</script>

<Quote by="OneRepublic">
So tell me what you want to hear 
Something that will light those ears 
I'm sick of all the insincere
So I'm gonna give <mark>all my secrets</mark> away</Quote>

{#if browser}
	{#if !solved}
		<div class="keymaker">
			<KeyHole on:solved={() => (solved = true)} />
		</div>
	{:else}
		<div in:fade={{ duration: 200, delay: 500 }}>
			<Secrets />
		</div>
	{/if}
{/if}

<style lang="scss">
	@use '~/breakpoints';
	.keymaker {
		width: 200px;
		margin: 8rem auto auto;
		text-align: center;
		filter: drop-shadow(0 0 60px #fff);
		@include breakpoints.large {
			margin-top: 4rem;
		}
	}
</style>
