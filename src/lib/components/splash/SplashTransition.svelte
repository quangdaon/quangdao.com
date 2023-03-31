<script lang="ts">
	import { isDesktop } from '$lib/data/store';
	import { fly } from 'svelte/transition';
	export let dir = 1;
	import { sineInOut } from 'svelte/easing';
</script>

<div
	class={$$restProps.class || ''}
	transition:fly={{
		x: $isDesktop ? 0 : `${100 * dir}vw`,
		y: $isDesktop ? `${100 * dir}vh` : 0,
		duration: 750,
		opacity: 1,
		easing: sineInOut
	}}
>
	<slot />
</div>
