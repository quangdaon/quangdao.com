<script lang="ts">
	import { goto } from '$app/navigation';
	import { sineInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { getCurrentTheme } from '$lib/config/splash/themes';
	import { prefersReducedMotion } from '$lib/utils/accessibility';
	import KeyHole from '../secrets/KeyHole.svelte';
	import SocialIcons from '../shared/SocialIcons.svelte';
	import SplashPanel from './SplashPanel.svelte';
	import SplashWidget from './SplashWidget.svelte';
	import SplashMessage from './SplashMessage.svelte';

	const theme = getCurrentTheme();

	let animation = $derived((node: Element) =>
		$prefersReducedMotion
			? fade(node, { duration: 250, easing: sineInOut })
			: fly(node, { x: '-100%', duration: 750, opacity: 1, easing: sineInOut }));
</script>

<div class="splash splash-theme-{theme?.name}">
	<div class="intro">
		<h1 transition:animation|global>
			<SplashWidget /> I'm Quangdao, and I am an
		</h1>
	</div>
	{#if theme?.message}
		<SplashMessage {theme} />
	{/if}
	<div class="panels">
		<SplashPanel href="/blog" label="endlessly-curious," title="Blog" order={1}>
			<div class="unlock">
				<KeyHole onSolved={() => goto('/secrets')} />
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
	@use '@scissors/positioning';
	@use '@scissors/breakpoints';

	.splash {
		position: fixed;
		overflow: hidden;
		z-index: 10;
		@include positioning.fill-container;
		display: flex;
		flex-direction: column;
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
			background: var(--color-background);
			color: var(--color-white);
			line-height: 1;
			font-size: 3em;
			font-family: var(--font-script);
			pointer-events: all;
		}
		@include breakpoints.large {
			display: block;
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
		width: 50%;
		margin: auto;
		display: flex;
		align-items: center;
		:global(a) {
			display: block;
			flex: 1 1 auto;
			color: inherit;
			&:hover {
				--color-foreground: var(--color-purple-base);
			}
		}
	}
</style>
