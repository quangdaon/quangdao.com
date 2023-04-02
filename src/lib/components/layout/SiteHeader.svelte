<script>
	import Logo from './Logo.svelte';

</script>

<header>
	<a class="brand" href="/">
    <Logo />
	</a>
	<nav>
		<ul>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/uses">Uses</a></li>
			<li><a href="/projects">Projects</a></li>
			<li><a href="/bio">Bio</a></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@use '~/breakpoints';
	@use '~/placeholders';

	header {
    @extend %container;

    display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		position: sticky;
		top: 0;
		background: var(--color-background);
		@include breakpoints.large {
			position: relative;
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

	li {
		a {
			display: block;
			padding: 1em;
		}
	}
</style>
