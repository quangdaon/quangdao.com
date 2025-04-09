<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_CANONICAL_DOMAIN } from '$env/static/public';

	const data = $derived(page.data);
	const url = $derived(page.url);

	const canonicalBaseUrl = `https://${PUBLIC_CANONICAL_DOMAIN}`;
	const pageUrl = $derived(canonicalBaseUrl + url.pathname);
</script>

<link rel="canonical" href={pageUrl} />

<title>{data.pageTitle}</title>
<meta name="description" content={data.pageDescription} />

<meta property="og:type" content="website" />
<meta property="og:url" content={pageUrl} />
<meta property="og:title" content={data.pageTitle} />
<meta property="og:description" content={data.pageDescription} />
<meta property="og:image" content={data.pageSocialImage} />

<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={pageUrl} />
<meta property="twitter:title" content={data.pageTitle} />
<meta property="twitter:description" content={data.pageDescription} />
<meta property="twitter:image" content={data.pageSocialImage} />
