<script>
	import Comic from '$lib/components/comics/Comic.svelte';

	export let data;
</script>

<h1>{data.title}</h1>

<Comic {...data} />

<h3 id="transcript">Transcript:</h3>

<svelte:component this={data.component} />
