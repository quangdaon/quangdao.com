<script lang="ts">
	import { tooltip } from '$lib/actions/tooltip';

	interface Props {
		slug: string;
		alt: string;
	}

	let { slug, alt }: Props = $props();
</script>

<a href={`/images/comics/large/${slug}.png`} use:tooltip={'View Large Image'} target="_blank">
	<img src={`/images/comics/web/${slug}.png`} {alt} />
</a>

<style>
	a {
		display: inline-block;
	}
</style>
