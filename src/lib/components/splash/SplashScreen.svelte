<script>
	import SocialIcons from '../shared/SocialIcons.svelte';
	import SplashPanel from './SplashPanel.svelte';
</script>

<div class="splash">
	<div class="intro">
		<h1>Quangdao is a</h1>
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
		top: 10%;
		left: 0;
		right: 0;
		text-align: center;
		z-index: 2;
		h1 {
			margin: 0;
			line-height: 1;
			font-size: 3em;
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
    }
  }
</style>
