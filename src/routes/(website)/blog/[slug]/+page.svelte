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

	<svelte:component this={post.component} />
</section>

<Comments />

<style lang="scss">
	header {
		margin-bottom: 2rem;
		h1 {
			font-size: 2em;
		}
	}
</style>
