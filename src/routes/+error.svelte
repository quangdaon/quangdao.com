<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.status === 404}
	<h1>Nothing to See Here!</h1>
	<p>The page you attempted to reach does not exist.</p>
{:else}
	<h1>Uh-Oh!</h1>
	<p>Something went terribly wrong.</p>
{/if}
