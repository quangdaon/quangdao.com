<script>
	import SocialIcons from '../shared/SocialIcons.svelte';
	let useVietnameseName = false;
</script>

<footer>
	<div class="footer-content">
		<div class="name" on:dblclick={() => (useVietnameseName = !useVietnameseName)}>
			{#if useVietnameseName}
				<p lang="vn">Nguyễn Quang Đạo</p>
				<p class="pronunciation">
					(<abbr title={'"ng" is like the suffix -ing; upward pitch like you are asking a question'}
						>ngween</abbr
					>
					<abbr
						title={'Exactly how someone trying to impersonate a stereotypical eastern accent would say "one"; neutral tone'}
						>wahng</abbr
					>
					<abbr title={'same as the anglocized "dow (Jones)" except with a heavy tone'}>dow</abbr>)
				</p>
			{:else}
				<p>Quangdao Nguyen</p>
				<p class="pronunciation">
					(<abbr title={'Rhymes with "Ron"'}>kwahn</abbr>&bull;<abbr title={'As in "Dow Jones"'}
						>dow</abbr
					>
					<abbr title={'Like "win" but with another N in front'}>nwin</abbr>)
				</p>
			{/if}
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
			&[lang='vn'] {
				font-family: sans-serif;
			}
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
