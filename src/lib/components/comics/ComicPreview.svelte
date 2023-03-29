<script lang="ts">
	import { getPost } from '$lib/content';
	import type { ComicPost } from '$lib/content/types';
	import { onMount } from 'svelte';
	import Comic from './Comic.svelte';
	export let slug: string;
	let comic: ComicPost | undefined;

	onMount(async () => {
		comic = await getPost('comics', slug);
	});
</script>

{#if comic}
	<h1 id={comic.slug}>
		{comic.title}
	</h1>

	<Comic {...comic} />

	<a href={`/comics/${comic.slug}#transcript`}>View Transcript</a>
{/if}
