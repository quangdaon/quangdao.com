<script>
	import Comic from '$lib/components/comics/Comic.svelte';

	/** @type {{data: any}} */
	let { data } = $props();

	let post = $derived(data.post);
</script>

<h1>{post.title}</h1>

<Comic {...post} />

<h3 id="transcript">Transcript:</h3>

<post.component />
