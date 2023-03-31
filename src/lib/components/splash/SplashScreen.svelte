<script>
	import SocialIcons from '../shared/SocialIcons.svelte';
	import SplashPanel from './SplashPanel.svelte';
</script>

<div class="splash">
	<div class="intro">
		<h1>
			<span>Quangdao is a</span>
			<span aria-hidden="true">Quangdao is a</span>
		</h1>
	</div>
	<div class="panels">
		<SplashPanel href="/blog" label="well-versed," title="Blog" />
		<SplashPanel href="/uses" label="multi-talented," title="Uses" />
		<SplashPanel href="/projects" label="highly-functional" title="Projects" />
		<SplashPanel href="/bio" label="robot." title="Bio">
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
		position: absolute;
		@include mixins.fill-container;
		@include breakpoints.large {
			font-size: 1.5vw;
		}
	}

	.intro {
		display: none;
		position: absolute;
		top: 20%;
		left: 0;
		right: 0;
		z-index: 2;
		pointer-events: none;
		text-align: center;
		h1 {
			display: inline-block;
			margin: 0;
			color: var(--color-white);
			line-height: 1;
			font-size: 3em;
			pointer-events: all;
			span{
				display: block;
				&:nth-child(1) {
					color: var(--color-green);
					clip-path: polygon(0 0, 50% 0, 50% 120%, 0 120%);
				}
				&:nth-child(2) {
					color: var(--color-orange);
					clip-path: polygon(50% 0, 100% 0, 100% 120%, 50% 120%);
					transform: translateY(-100%);
				}
			}
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
				--color-foreground: var(--color-purple);
			}
		}
	}
</style>
