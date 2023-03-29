<script lang="ts">
	import { toFormattedDate } from '$lib/utils';
	export let data;
</script>

<h1>{data.title}</h1>

<time>{toFormattedDate(data.date)}</time>

<svelte:component this={data.component} />
