<script lang="ts">
	import Comments from '$lib/components/blog/Comments.svelte';
	import { toFormattedDate } from '$lib/utils/datetime';
	export let data;

	const { post } = data;
</script>

<header>
	<h1>{post.title}</h1>
	<time>{toFormattedDate(post.date)}</time>
</header>

<svelte:component this={post.component} />

<Comments />

<style>
	header {
		margin-bottom: 2rem;
	}
</style>
