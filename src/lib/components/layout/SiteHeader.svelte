<script>
	import HeaderLink from './HeaderLink.svelte';
	import Logo from './Logo.svelte';
</script>

<header>
	<a class="brand" href="/">
		<Logo />
	</a>
	<nav>
		<ul>
			<li><HeaderLink href="/blog">Blog</HeaderLink></li>
			<li><HeaderLink href="/projects">Projects</HeaderLink></li>
			<li><HeaderLink href="/uses">Uses</HeaderLink></li>
			<li><HeaderLink href="/bio">Bio</HeaderLink></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@use '@scissors/breakpoints';
	@use '@scissors/media';
	@use '@scissors/layout';

	header {
		@extend %container;

		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		position: sticky;
		top: 0;
		background: var(--color-background);
		z-index: 5;
		@include breakpoints.large {
			position: relative;
		}
		@include media.print {
			display: none;
		}
	}

	.brand {
		display: block;
		padding: 1rem 0;
		margin: auto;
		@include breakpoints.large {
			margin-left: 0;
		}
	}

	nav {
		display: none;
		@include breakpoints.large {
			display: block;
		}
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
	}
</style>
