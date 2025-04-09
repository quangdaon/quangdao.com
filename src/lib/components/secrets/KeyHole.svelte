<script lang="ts">
	import { keyValue } from '$lib/data/store';
	import { getKey } from '$lib/secrets';
	import { fade, slide } from 'svelte/transition';
	import Key from './Key.svelte';
	import KeySizer from './KeySizer.svelte';
	import { tooltip } from '$lib/actions/tooltip';
	import { tracker } from '$lib/utils/tracking';
	let showBuilder = $state(false);

	let animationElement: Element | undefined = $state();

	interface Props {
		onSolved: () => void;
	}

	let { onSolved }: Props = $props();

	let failed = $state(false);
	let passed = $state(false);

	const checkKey = (e: Event) => {
		e.preventDefault();
		const match = $keyValue === getKey(new Date());
		tracker.track('Key Attempt', { props: { success: match, key: $keyValue } });
		if (match) {
			passed = true;
			animationElement?.addEventListener('animationend', () => {
				onSolved();
			});
		} else {
			failed = true;
			animationElement?.addEventListener('animationend', () => {
				failed = false;
			});
		}
	};
</script>

<div class="keyhole-container">
	<button
		aria-label="Keyhole Button"
		use:tooltip={showBuilder ? null : 'Hmm... What could this possibly be?'}
		class="keyhole"
		onclick={() => (showBuilder = !showBuilder)}
	>
		<svg viewBox="0 0 100 150">
			<circle cx="50" cy="50" r="50" class="keyhole-shape" />
			<rect x="25" y="60" rx="10" width="50" height="75" class="keyhole-shape" />
		</svg>
	</button>

	{#if showBuilder}
		<form class="keymaker" onsubmit={checkKey}>
			<div class="sizer" in:slide out:fade>
				<KeySizer disabled={failed} />
			</div>
			<button type="submit" class="key" transition:fade>
				<div class="key-animation" class:failed class:passed bind:this={animationElement}>
					<Key key={$keyValue} />
				</div>
			</button>
		</form>
	{/if}
</div>

<noscript>
	<style>
		.keyhole-container {
			display: none;
		}
	</style>
</noscript>

<style lang="scss">
	@use '@scissors/breakpoints';

	svg {
		width: 50px;
	}

	.keymaker {
		z-index: 20;
		border-radius: 1em;
	}

	.keyhole {
		margin: auto;
		background-color: transparent;
		border: none;
		display: block;
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
		width: 175px;
		top: 0;
		left: 50%;
		background: transparent;
		border: none;
		filter: drop-shadow(0 0 60px var(--color-black));
		z-index: 30;
		overflow: hidden;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 5px;
			bottom: 5px;
			height: 100%;
			background: linear-gradient(to right, var(--color-black), transparent);
			width: 10px;
			z-index: 3;
		}
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
