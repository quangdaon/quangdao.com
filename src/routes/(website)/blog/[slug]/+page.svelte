<script lang="ts">
	import { toFormattedDate } from '$lib/utils';
	export let data;

	const { post } = data;
</script>

<header>
	<h1>{post.title}</h1>
	<time>{toFormattedDate(post.date)}</time>
</header>

<svelte:component this={post.component} />

<style>
	header {
		margin-bottom: 2rem;
	}
</style>