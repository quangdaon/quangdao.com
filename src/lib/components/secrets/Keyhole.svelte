<script>
	import { goto } from '$app/navigation';
	import KeyMaker from './KeyMaker.svelte';
	let showBuilder = false;
</script>

<button
	class="keyhole"
	title="Hmm... What could this possibly be?"
	on:click={() => (showBuilder = !showBuilder)}
>
	<svg viewBox="0 0 100 150">
		<circle cx="50" cy="50" r="50" class="keyhole-shape" />
		<rect x="25" y="60" rx="10" width="50" height="75" class="keyhole-shape" />
	</svg>
</button>

{#if showBuilder}
	<div class="maker">
		<!-- TODO: Find out why goto doesn't work -->
		<KeyMaker on:solved={() => window.location.assign('/secrets')} />
	</div>
{/if}

<style lang="scss">
	@use '~/breakpoints';

	svg {
		width: 50px;
	}

	.keyhole {
		display: none;
		margin: auto;
		background-color: transparent;
		border: none;
		@include breakpoints.large {
			display: block;
		}
	}

	.maker {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: calc(100% + 1rem);
	}

	.keyhole-shape {
		fill: var(--color-black);
		stroke: none;
	}
</style>
