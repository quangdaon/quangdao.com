<script lang="ts">
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import { toFormattedDate } from '$lib/utils';
	export let data;
</script>

<PageLayout>
	<h1 slot="title">{data.title}</h1>

	<time>{toFormattedDate(data.date)}</time>

	<svelte:component this={data.component} />
</PageLayout>
