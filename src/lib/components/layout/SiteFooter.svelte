<script>
	import SocialIcons from '../shared/SocialIcons.svelte';
</script>

<footer>
	<div class="footer-content">
		<div>
			<p>&copy; Quangdao</p>
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
		@include breakpoints.large {
			display: flex;
			text-align: left;
			p {
				margin: 0;
			}
		}
	}

	.social {
		display: flex;
		:global(a:hover) {
			--color-foreground: var(--color-purple-base);
		}
		:global(svg) {
			width: 1em;
			padding: 0 1em;
			@include breakpoints.large {
				padding: 1em;
			}
		}
	}
</style>
