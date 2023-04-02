<script lang="ts">
	import { toFormattedDate } from '$lib/utils';

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
			margin-left: 0.5em;
			font-weight: normal;
		}
	}

	.tags {
		opacity: 0.5;
		font-size: 0.75em;
		span {
			margin-right: 0.5em;
		}
	}
</style>
