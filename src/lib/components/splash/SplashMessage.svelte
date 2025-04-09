<script lang="ts">
	import type { ThemeConfig } from '$lib/config/splash/themes';
	import { prefersReducedMotion } from '$lib/utils/accessibility';
	import { isMobile } from '$lib/utils/mobile';
	import { sineInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	export let theme: ThemeConfig;

	$: animation = (node: Element) =>
		$prefersReducedMotion
			? fade(node, { duration: 250, easing: sineInOut })
			: fly(node, {
					x: $isMobile ? '100vw' : 0,
					y: $isMobile ? 0 : '100vh',
					duration: 750,
					opacity: 1,
					easing: sineInOut
			  });
</script>

<div class="banner" transition:animation|global>
	{#if theme?.link}
		<a href={theme.link}>
			<h2>
				{theme.message}
			</h2>
		</a>
	{:else}
		<span>
			<h2>
				{theme.message}
			</h2>
		</span>
	{/if}
</div>

<style lang="scss">
	@use '@scissors/breakpoints';

	.banner {
		background-color: var(--color-background);
		color: var(--color-foreground);
		text-align: center;
		a {
			text-decoration: none;
		}
		h2 {
			margin: 0;
			padding: 0;
			font-size: 1em;
			font-family: var(--font-script);
			padding: 0.25em 1em;
		}
		@include breakpoints.large {
			display: block;
			position: absolute;
			left: 50%;
			bottom: 12vh;
			transform: translateX(-50%);
			z-index: 1;
			h2 {
				width: max-content;
			}
		}
	}
</style>
