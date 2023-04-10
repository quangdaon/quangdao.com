<script>
	import SocialIcons from '../shared/SocialIcons.svelte';
	import FooterName from './FooterName.svelte';
</script>

<footer>
	<div class="footer-content">
		<FooterName />
		<div class="social">
			<SocialIcons />
		</div>
	</div>
</footer>

<style lang="scss">
	@use '~/breakpoints';
	@use '~/settings';
	@use '~/placeholders';

	footer {
		position: relative;
		z-index: 2;
		margin-top: 2rem;

		@include settings.media-print {
			display: none;
		}
	}

	.footer-content {
		@extend %container;
		padding: 1em;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}

	.social {
		margin: auto;
		text-align: center;
		:global(a) {
			display: inline-block;
			padding: 0 1em;
		}
		:global(a:hover) {
			--color-foreground: var(--color-purple-base);
		}
		:global(svg) {
			display: block;
			width: 1em;
		}
	}
</style>
