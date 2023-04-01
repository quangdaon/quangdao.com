<script lang="ts">
	import PageLayout from '$lib/components/layout/PageLayout.svelte';

	export let data;
</script>

<PageLayout>
	<h1 slot="title">Quangdao's Blog</h1>

	{#each data.posts as post}
		<article>
			<h2>{post.title}</h2>
			<p>{post.description}</p>
			<p><a href={`/blog/${post.slug}`}>Read More</a></p>
		</article>
	{/each}
</PageLayout>
