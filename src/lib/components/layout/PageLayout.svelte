<script lang="ts">
	import Gears from '$lib/components/decor/Gears.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		delay?: boolean;
		children?: import('svelte').Snippet;
	}

	let { delay = true, children }: Props = $props();
</script>

<div out:fade|global={{ delay: delay ? 1000 : 0, duration: 0 }}>
	<!-- <GearsTop /> -->
	<SiteHeader />

	<main>
		{@render children?.()}
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
