<script lang="ts">
	export let data;
</script>

{#each data.posts as post}
  {JSON.stringify(post)}
{/each}