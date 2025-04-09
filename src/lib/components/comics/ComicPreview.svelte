<script lang="ts">
	import { getPost } from '$lib/content';
	import type { ComicPost } from '$lib/content/types';
	import { onMount } from 'svelte';
	import Comic from './Comic.svelte';
	interface Props {
		slug: string;
	}

	let { slug }: Props = $props();
	let comic: ComicPost | undefined = $state();

	onMount(async () => {
		comic = await getPost('comics', slug);
	});
</script>

{#if comic}
	<h1 id={comic.slug}>
		{comic.title}
	</h1>

	<Comic {...comic} />

	<p><a href={`/comics/${comic.slug}#transcript`}>View Transcript</a></p>
{/if}
