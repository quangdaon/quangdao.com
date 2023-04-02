<script lang="ts">
	import Gears from '$lib/components/decor/Gears.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import { fade } from 'svelte/transition';
</script>

<div out:fade={{ delay: 1000 }}>
	<!-- <GearsTop /> -->
	<SiteHeader />

	<main>
		<slot />
	</main>

	<SiteFooter />
	<Gears />
</div>

<style lang="scss">
	@use '~/placeholders';

	main {
		@extend %container;
		position: relative;
		z-index: 2;
	}
</style>
