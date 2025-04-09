<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_CANONICAL_DOMAIN } from '$env/static/public';

	const canonicalBaseUrl = `https://${PUBLIC_CANONICAL_DOMAIN}`;
	const pageUrl = canonicalBaseUrl + page.url.pathname;
</script>

<link rel="canonical" href="{pageUrl}" />

<title>{page.data.pageTitle}</title>
<meta name="description" content={page.data.pageDescription} />

<meta property="og:type" content="website" />
<meta property="og:url" content={pageUrl} />
<meta property="og:title" content={page.data.pageTitle} />
<meta property="og:description" content={page.data.pageDescription} />
<meta property="og:image" content={page.data.pageSocialImage} />

<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={pageUrl} />
<meta property="twitter:title" content={page.data.pageTitle} />
<meta property="twitter:description" content={page.data.pageDescription} />
<meta property="twitter:image" content={page.data.pageSocialImage} />
