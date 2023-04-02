<script lang="ts">
	export let by: string;
</script>

<blockquote>
	<p class="quote"><slot /></p>
	<p class="author">&mdash; {by}</p>
</blockquote>

<style lang="scss">
	@use '~/settings';
	blockquote {
		position: relative;
		font-family: var(--font-script);
		margin: 2rem auto;
		font-size: 1.5rem;
		max-width: 80%;
		text-align: center;
		.quote {
			&::before,
			&::after {
				display: inline;
				pointer-events: none;
				color: var(--color-green-base);
				@include settings.dark-theme {
					color: var(--color-orange-base);
				}
			}

			&::before {
				content: '\201C';
			}

			&::after {
				content: '\201D';
			}
		}
		.author {
			list-style-type: none;
			margin-top: 0;
			text-align: right;
		}
	}
</style>
