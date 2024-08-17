<script lang="ts">
	import { toFormattedDate } from '$lib/utils/datetime';

	export let data;
</script>

<h1>Quangdao's Blog</h1>

{#each data.posts as post}
	<article>
		<h2>
			<a href={`/blog/${post.slug}`}>{post.title}</a>
			<time>{toFormattedDate(post.date)}</time>
		</h2>
		<p>{post.description}</p>
		<p class="tags">
			{#each post.tags as tag}
				<span>#{tag}</span>
			{/each}
		</p>
	</article>
{/each}

<style lang="scss">
	@use '~/breakpoints';

	h2 {
		a {
			text-decoration: none;
			&:hover {
				text-decoration: underline;
				color: currentColor;
			}
		}
		time {
			font-size: 1rem;
			font-weight: normal;
			display: block;
			@include breakpoints.large {
				display: inline-block;
				margin-left: 0.5em;
			}
		}
	}

	.tags {
		opacity: 0.7;
		font-size: 0.75em;
		span {
			display: inline-block;
			margin-right: 0.5em;
		}
	}
</style>
