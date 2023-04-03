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
		display: flex;
		justify-content: space-between;
		align-items: center;
		p {
			margin: 0;
		}
	}

	.social {
		display: flex;
		:global(a:hover) {
			--color-foreground: var(--color-purple-base);
		}
		:global(svg) {
			width: 1em;
			padding: 1em;
		}
	}
</style>
