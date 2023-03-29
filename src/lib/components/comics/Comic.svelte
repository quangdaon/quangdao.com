<script lang="ts">
	export let slug: string;
	export let alt: string;
</script>

<a href={`/images/comics/large/${slug}.png`} title="View Large Image" target="_blank">
	<img src={`/images/comics/web/${slug}.png`} {alt} />
</a>
