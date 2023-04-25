<script>
	import Comic from '$lib/components/comics/Comic.svelte';

	export let data;

	$: post = data.post;
</script>

<h1>{post.title}</h1>

<Comic {...post} />

<h3 id="transcript">Transcript:</h3>

<svelte:component this={post.component} />
