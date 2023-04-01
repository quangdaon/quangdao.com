<script lang="ts">
	export let data;
</script>

<h1>
  Quangdao's Blog
</h1>

{#each data.posts as post}
  <article>
    <h2>{post.title}</h2>
    <p>{post.description}</p>
    <p><a href={`/blog/${post.slug}`}>Read More</a></p>
  </article>
{/each}