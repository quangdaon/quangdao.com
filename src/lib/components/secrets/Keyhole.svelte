<script lang="ts">
	import { keyValue } from '$lib/data/store';
	import { getKey } from '$lib/secrets';
	import { createEventDispatcher } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import Key from './Key.svelte';
	import KeySizer from './KeySizer.svelte';
	let showBuilder = false;

	let animationElement: Element;

	const dispatch = createEventDispatcher();

	let failed = false;
	let passed = false;

	const checkKey = () => {
		const match = $keyValue === getKey(new Date());
		if (match) {
			passed = true;
			animationElement.addEventListener('animationend', () => {
				dispatch('solved');
			});
		} else {
			failed = true;
			animationElement.addEventListener('animationend', () => {
				failed = false;
			});
		}
	};
</script>

<div class="keyhole-container">
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
		<form class="keymaker" on:submit={checkKey}>
			<div class="sizer" in:slide|local out:fade|local>
				<KeySizer disabled={failed} />
			</div>
			<button type="submit" class="key" transition:fade|local>
				<div class="key-animation" class:failed class:passed bind:this={animationElement}>
					<Key key={$keyValue} />
				</div>
			</button>
		</form>
	{/if}
</div>

<style lang="scss">
	@use '~/breakpoints';

	svg {
		width: 50px;
	}

	.keymaker {
		z-index: 20;
		// padding: 0.25em;
		border-radius: 1em;
		--color-foreground: var(--color-white);
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

	.sizer {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: calc(100% + 1rem);
	}

	.keyhole-shape {
		fill: var(--color-black);
		stroke: none;
	}

	.key {
		position: absolute;
		width: 250px;
		top: 0;
		left: 50%;
		background: transparent;
		border: none;
		filter: drop-shadow(0 0 60px var(--color-black));
		z-index: 30;
		overflow: hidden;
	}

	.key-animation {
		&.failed {
			animation: unlockFail 1.5s;
		}
		&.passed {
			animation: unlockPass 1s;
			transform: translateX(-50%) rotateX(45deg);
		}
	}

	@keyframes unlockFail {
		0% {
			transform: translateX(0) rotateX(0deg);
		}

		33% {
			transform: translateX(-50%) rotateX(0deg);
		}

		45% {
			transform: translateX(-50%) rotateX(45deg);
		}

		55% {
			transform: translateX(-50%) rotateX(-45deg);
		}

		67% {
			transform: translateX(-50%) rotateX(0deg);
		}

		100% {
			transform: translateX(0) rotateX(0deg);
		}
	}

	@keyframes unlockPass {
		0% {
			transform: translateX(0) rotateX(0deg);
		}

		50% {
			transform: translateX(-50%) rotateX(0deg);
		}

		100% {
			transform: translateX(-50%) rotateX(45deg);
		}
	}
</style>
