<script lang="ts">
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import { fade } from 'svelte/transition';
</script>

<div out:fade={{ delay: 1000 }}>
	<SiteHeader />

	<main>
		<slot />
	</main>

	<SiteFooter />
</div>

<style lang="scss">
	@use '~/placeholders';

	main {
		@extend %container;
	}
</style>
