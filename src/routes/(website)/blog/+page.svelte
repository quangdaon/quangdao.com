<script lang="ts">
	export let data;
</script>

<h1>
  Quangdao's Blog
</h1>

{#each data.posts as post}
  <div>
    <h1>{post.title}</h1>
    <p>{post.description}</p>
    <p><a href={`/blog/${post.slug}`}>Read More</a></p>
  </div>
{/each}