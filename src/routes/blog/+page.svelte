<script lang="ts">
	export let data;
</script>

{#each data.posts as post}
  {JSON.stringify(post)}
  <div>
    <h1>{post.data.title}</h1>
    <p>{post.data.description}</p>
    <p><a href={`/blog/${post.slug}`}>Read More</a></p>
  </div>
{/each}