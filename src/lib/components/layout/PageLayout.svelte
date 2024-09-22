<script lang="ts">
	import Gears from '$lib/components/decor/Gears.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import { fade } from 'svelte/transition';

	export let delay = true;
</script>

<div out:fade={{ delay: delay ? 1000 : 0, duration: 0 }}>
	<!-- <GearsTop /> -->
	<SiteHeader />

	<main>
		<slot />
	</main>

	<SiteFooter />
	<Gears />
</div>

<style lang="scss">
	@use '@scissors/layout';

	main {
		@extend %container;
		position: relative;
		z-index: 2;
	}
</style>
