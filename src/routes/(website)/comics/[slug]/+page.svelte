<script>
	import Comic from '$lib/components/comics/Comic.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';

	export let data;
</script>

<PageLayout>
	<h1 slot="title">{data.title}</h1>

	<Comic {...data} />

	<h3 id="transcript">Transcript:</h3>

	<svelte:component this={data.component} />
</PageLayout>
