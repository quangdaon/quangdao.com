<script>
	import SocialIcons from '../shared/SocialIcons.svelte';
</script>

<footer>
	<div class="footer-content">
		<div class="name">
			<p>Quangdao Nguyen</p>
			<p class="pronunciation">(<abbr title='Rhymes with "Ron"'>kwahn</abbr>&bull;<abbr title='As in "Dow Jones"'>dow</abbr> <abbr title='Like "when" but with another N in front'>nwen</abbr>)</p>
		</div>
		<div class="social">
			<SocialIcons />
		</div>
	</div>
</footer>

<style lang="scss">
	@use '~/breakpoints';
	@use '~/placeholders';

	footer {
		position: relative;
		z-index: 2;
		margin-top: 2rem;
	}

	.footer-content {
		@extend %container;
		padding: 1em;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		p {
			margin: 1em 0;
		}
	}

	.name {
		margin: var(--spacing) 0;
		p {
			margin: 0;
		}
	}

	.pronunciation {
		font-size: 0.75em;
	}

	.social {
		margin: auto;
		text-align: center;
		:global(a:hover) {
			--color-foreground: var(--color-purple-base);
		}
		:global(svg) {
			width: 1em;
			padding: 0 1em;
		}
	}
</style>
