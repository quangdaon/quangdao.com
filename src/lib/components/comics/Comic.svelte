<script lang="ts">
	import { tooltip } from '$lib/actions/tooltip';

	export let slug: string;
	export let alt: string;
</script>

<a href={`/images/comics/large/${slug}.png`} use:tooltip={'View Large Image'} target="_blank">
	<img src={`/images/comics/web/${slug}.png`} {alt} />
</a>

<style>
	a {
		display: inline-block;
	}
</style>
