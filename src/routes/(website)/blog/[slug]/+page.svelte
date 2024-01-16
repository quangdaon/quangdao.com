<script lang="ts">
	import Comments from '$lib/components/blog/Comments.svelte';
	import { toFormattedDate } from '$lib/utils/datetime';
	export let data;

	$: post = data.post;
</script>

<section class="post">
	<header>
		<h1>{post.title}</h1>
		<time>{toFormattedDate(post.date)}</time>
	</header>

	<div class="post">
		<svelte:component this={post.component} />
	</div>
</section>

<Comments />

<style lang="scss">
	header {
		margin-bottom: 2rem;
		h1 {
			font-size: 2em;
		}
	}

	:global(.post svg, .post .diagram) {
		display: block;
		margin: 2em auto;
		max-width: 600px;
		overflow: hidden;
	}
</style>
