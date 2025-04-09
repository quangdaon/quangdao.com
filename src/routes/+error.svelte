<script lang="ts">
	import { page } from '$app/state';
	import { getKey } from '$lib/secrets';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Key from '$lib/components/secrets/Key.svelte';
	import { tooltip } from '$lib/actions/tooltip';
	const key = getKey(new Date());

	let xStart = $state(0);
	let xNow = $state(0);
	let lastOffset = $state(0);
	let target = $derived(Math.max(0, Math.min(110, lastOffset + (xNow - xStart))));
	let offset = $derived(new Tween(target, { easing: cubicOut }));

	const dragOn = (e: MouseEvent) => {
		lastOffset = offset.current;
		xStart = e.clientX;
		xNow = e.clientX;
		document.addEventListener('mouseup', dragOff);
		document.addEventListener('mousemove', handleDrag);
	};

	const dragOff = () => {
		const target = offset.current > lastOffset ? 110 : 0;

		offset.set(target);

		document.removeEventListener('mouseup', dragOff);
		document.removeEventListener('mousemove', handleDrag);
	};

	const handleDrag = (e: MouseEvent) => {
		xNow = e.clientX;
	};
</script>

{#if page.status === 404}
	<h1>
		<span aria-hidden="true" class="key" use:tooltip={key}><Key {key} /></span>
		<span class="title" style="--offset: {offset.current}" onmousedown={dragOn} role="none">
			Nothing to See Here!
		</span>
	</h1>
	<p>The page you attempted to reach does not exist.</p>
{:else if page.error}
	<h1>Uh-Oh!</h1>
	<p>Something went terribly wrong.</p>
{/if}

<style>
	.key {
		width: 100px;
		display: inline-block;
		position: absolute;
	}

	.title {
		display: inline-block;
		background: var(--color-background);
		transform: translateX(calc(var(--offset) * 1px));
		user-select: none;
		cursor: text;
	}
</style>
