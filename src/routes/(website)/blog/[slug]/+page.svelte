<script lang="ts">
	import { toFormattedDate } from '$lib/utils';
	export let data;

	const { post } = data;
</script>

<h1>{post.title}</h1>

<time>{toFormattedDate(post.date)}</time>

<svelte:component this={post.component} />
