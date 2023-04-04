<script lang="ts">
	import { goto } from '$app/navigation';
	import { prefersReducedMotion } from '$lib/data/store';
	import { sineInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import KeyHole from '../secrets/KeyHole.svelte';
	import SocialIcons from '../shared/SocialIcons.svelte';
	import SplashPanel from './SplashPanel.svelte';

	$: animation = (node: Element) =>
		$prefersReducedMotion
			? fade(node, { duration: 250, easing: sineInOut })
			: fly(node, { x: '-100%', duration: 750, opacity: 1, easing: sineInOut });
</script>

<div class="splash">
	<div class="intro">
		<h1 transition:animation>
			<span class="hand">👋</span> I'm Quangdao, and I am an
		</h1>
	</div>
	<div class="panels">
		<SplashPanel href="/blog" label="endlessly-curious," title="Blog" order={1}>
			<div class="unlock">
				<!-- TODO: Find out why goto doesn't work on its own -->
				<KeyHole on:solved={() => setTimeout(() => goto('/secrets'), 0)} />
			</div>
		</SplashPanel>
		<SplashPanel href="/uses" label="multi-talented," title="Uses" order={2} />
		<SplashPanel href="/projects" label="highly-functional" title="Projects" order={3} />
		<SplashPanel href="/bio" label="robot." title="Bio" order={4}>
			<div class="social-links">
				<SocialIcons />
			</div>
		</SplashPanel>
	</div>
</div>

<style lang="scss">
	@use '~/mixins';
	@use '~/breakpoints';
	.splash {
		position: fixed;
		overflow: hidden;
		z-index: 10;
		@include mixins.fill-container;
		@include breakpoints.large {
			font-size: 1.75vw;
		}
	}

	.intro {
		display: none;
		position: absolute;
		top: 4em;
		left: 0;
		right: 0;
		z-index: 2;
		pointer-events: none;
		h1 {
			display: inline-block;
			margin: 0;
			padding: 0.25em;
			background: var(--color-blue-base);
			color: var(--color-white);
			line-height: 1;
			font-size: 3em;
			font-family: var(--font-script);
			pointer-events: all;
		}
		.hand {
			position: relative;
			display: inline-block;
			transform-origin: 90% 100%;
			transition: transform 200ms;
			&:hover {
				transition: none;
				animation: wave 1s 1 forwards;
			}
		}
		@include breakpoints.large {
			display: block;
		}
	}

	@keyframes wave {
		$amt: 5deg;
		0% {
			transform: rotate(0deg);
		}
		12.5% {
			transform: rotate($amt);
		}
		37.5% {
			transform: rotate(-$amt);
		}
		62.5% {
			transform: rotate($amt);
		}
		87.5% {
			transform: rotate(-$amt);
		}
		100% {
			transform: rotate(0deg);
		}
	}

	.panels {
		position: relative;
		display: flex;
		justify-content: stretch;
		flex-direction: column;
		position: relative;
		height: 100%;

		@include breakpoints.large {
			flex-direction: row;
		}
	}

	.unlock {
		display: none;
		--color-foreground: var(--color-white);
		@include breakpoints.large {
			display: block;
		}
	}

	.social-links {
		display: block;
		width: 50%;
		margin: auto;
		display: flex;
		align-items: center;
		:global(a) {
			display: block;
			flex: 1 1 auto;
			padding: 0.5rem;
			color: inherit;
			&:hover {
				--color-foreground: var(--color-purple-base);
			}
		}
	}
</style>
