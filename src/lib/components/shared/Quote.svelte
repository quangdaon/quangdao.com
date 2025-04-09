<script lang="ts">
	interface Props {
		by: string;
		children?: import('svelte').Snippet;
	}

	let { by, children }: Props = $props();
</script>

<blockquote>
	<p class="quote">{@render children?.()}</p>
	{#if by}
		<p class="author">&mdash; {by}</p>
	{/if}
</blockquote>

<style lang="scss">
	@use '@scissors/media';
	blockquote {
		position: relative;
		font-family: var(--font-script);
		margin: 2rem auto;
		font-size: 1.5rem;
		max-width: 80%;
		text-align: center;
		transform: rotate(-2deg);
		.quote {
			white-space: pre-line;
			&::before,
			&::after {
				display: inline;
				pointer-events: none;
				color: var(--color-highlight);
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
