<script lang="ts">
	export let data;
</script>

<h1>{data.title}</h1>

<time>{data.date.toLocaleDateString()}</time>

<svelte:component this={data.component} />
