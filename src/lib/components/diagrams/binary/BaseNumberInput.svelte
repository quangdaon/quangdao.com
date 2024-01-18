<script lang="ts">
	import { getAllowedDigits } from '$lib/config/numeric-bases';
	import { createEventDispatcher } from 'svelte';

	export let base = 2;
	export let value: string;

	var dispatch = createEventDispatcher();

	const increment = (dir: -1 | 1 = 1) => {
		var intValue = parseInt(value, base) + dir;
		if (intValue < 0) return;
		value = intValue.toString(base);
	};

	const getAllowedKeys = () => {
		const keys = [
			'Tab',
			'Enter',
			'Backspace',
			'Delete',
			'ArrowLeft',
			'ArrowRight',
			...getAllowedDigits(base)
		];

		return keys;
	};

	const allowedKeys = getAllowedKeys();

	const mapEntry = (e: KeyboardEvent) => {
		if (allowedKeys.includes(e.key) || (e.ctrlKey && e.key !== 'v') || e.altKey || e.metaKey)
			return;

		e.preventDefault();

		if (e.key === 'ArrowUp') {
			increment();
		}

		if (e.key === 'ArrowDown') {
			increment(-1);
		}

		dispatch('input');
	};

	$: if (value === '') {
		value = '0';
		dispatch('input');
	}
</script>

<div class="viewer">
	<input type="text" bind:value on:keydown={mapEntry} on:input />
</div>

<style>
	.viewer {
		text-align: center;
	}

	input {
		text-align: center;
	}

	input:active {
		outline: none;
	}
</style>
