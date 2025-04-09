<script lang="ts">
	import { getAllowedDigits } from '$lib/config/numeric-bases';

	interface Props {
		base?: number;
		value: string;
		onInput: () => void;
	}

	let { base = 2, value = $bindable(), onInput }: Props = $props();

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

		onInput();
	};

	$effect(() => {
		if (value === '') {
			value = '0';
			onInput();
		}
	});
</script>

<div class="viewer">
	<input type="text" bind:value onkeydown={mapEntry} oninput={onInput} />
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
