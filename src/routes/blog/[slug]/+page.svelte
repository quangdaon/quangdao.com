<script lang="ts">
	import { toFormattedDate } from '$lib/utils';
	export let data;
</script>

<h1>{data.title}</h1>

{#if data.date}
	<time>{toFormattedDate(data.date)}</time>
{/if}

<svelte:component this={data.component} />
