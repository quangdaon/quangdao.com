<script>
	import { sineInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import SocialIcons from '../shared/SocialIcons.svelte';
	import SplashPanel from './SplashPanel.svelte';
</script>

<div class="splash">
	<div class="intro">
		<h1 transition:fly={{ x: '-100%', duration: 750, opacity: 1, easing: sineInOut }}>
			<span class="hand">👋</span> I'm Quangdao, and I am a
		</h1>
	</div>
	<div class="panels">
		<SplashPanel href="/blog" label="well-versed," title="Blog" order={1} />
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
			color: var(--color-orange-base);
			line-height: 1;
			font-size: 3em;
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
