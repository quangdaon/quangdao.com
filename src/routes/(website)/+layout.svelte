<script lang="ts">
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
</script>

<SiteHeader />

<main>
	<slot />
</main>

<SiteFooter />

<style lang="scss">
	@use '~/placeholders';
	
	main {
		@extend %container;
	}
</style>