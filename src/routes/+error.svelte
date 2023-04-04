<script lang="ts">
	import { page } from '$app/stores';
	import { getKey } from '$lib/secrets';
	import { tweened } from 'svelte/motion';
	import Key from '$lib/components/secrets/Key.svelte';
	import { cubicOut } from 'svelte/easing';
	const key = getKey(new Date());

	let xStart = 0;
	let xNow = 0;
	let lastOffset = -110;
	let offset = tweened(lastOffset, { easing: cubicOut });

	const dragOn = (e: MouseEvent) => {
		lastOffset = $offset;
		xStart = e.clientX;
		xNow = e.clientX;
		document.addEventListener('mouseup', dragOff);
		document.addEventListener('mousemove', handleDrag);
	};

	const dragOff = () => {
		const target = $offset > lastOffset ? 0 : -110;

		offset.set(target);

		document.removeEventListener('mouseup', dragOff);
		document.removeEventListener('mousemove', handleDrag);
	};

	const handleDrag = (e: MouseEvent) => {
		xNow = e.clientX;
	};

	$: {
		offset.set(Math.min(0, Math.max(-110, lastOffset + (xNow - xStart))), { duration: 0 });
	}
</script>

{#if $page.status === 404}
	<h1>
		<span class="key" title={key}><Key {key} /></span>
		<span class="title" style="--offset: {$offset}" on:mousedown={dragOn}>
			Nothing to See Here!
		</span>
	</h1>
	<p>The page you attempted to reach does not exist.</p>
{:else if $page.error}
	<h1>Uh-Oh!</h1>
	<p>Something went terribly wrong.</p>
{/if}

<style>
	.key {
		width: 100px;
		display: inline-block;
	}

	.title {
		display: inline-block;
		background: var(--color-background);
		transform: translateX(calc(var(--offset) * 1px));
		user-select: none;
		cursor: text;
	}
</style>
