<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.pageTitle}</title>
	<meta name="description" content={$page.data.pageDescription} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url} />
	<meta property="og:title" content={$page.data.pageTitle} />
	<meta property="og:description" content={$page.data.pageDescription} />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url} />
	<meta property="twitter:title" content={$page.data.pageTitle} />
	<meta property="twitter:description" content={$page.data.pageDescription} />
</svelte:head>
