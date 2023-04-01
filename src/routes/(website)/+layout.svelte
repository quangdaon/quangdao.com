<script lang="ts">
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import { fade } from 'svelte/transition';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<SiteHeader />

{#key data.path}
	<main transition:fade>
		<slot />
	</main>
{/key}

<SiteFooter />

<style lang="scss">
	@use '~/placeholders';
	
	main {
		@extend %container;
	}
</style>