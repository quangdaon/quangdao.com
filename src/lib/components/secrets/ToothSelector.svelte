<script lang="ts">
	import { keyMax } from '$lib/secrets';


	export let value: number;
	export let disabled = false;

	const increment = () => (value = value >= 5 ? 0 : value + 1);
	const decrement = () => (value = value <= 0 ? 5 : value - 1);

	const mapEntry = (e: KeyboardEvent) => {
		if (e.key === 'Tab' || e.key === 'Enter') return;

		e.preventDefault();

		if (e.key === 'ArrowUp') {
			increment();
		}

		if (e.key === 'ArrowDown') {
			decrement();
		}

		const val = Number(e.key);
		if (val >= 0 && val < 6) {
			value = val;
		}
	};
</script>

<div class="picker">
	<button type="button" on:click={increment} tabindex="-1" {disabled}>▲</button>
	<input
		bind:value
		max={keyMax}
		min="0"
		pattern="[0-{keyMax}]"
		maxlength="1"
		on:keydown={mapEntry}
		{disabled}
	/>
	<button type="button" on:click={decrement} tabindex="-1" {disabled}>▼</button>
</div>

<style lang="scss">
	@use '@scissors/breakpoints';

	.picker {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 1em;
		font-size: 1.5em;
		@include breakpoints.large {
			font-size: 1em;
		}
	}

	input {
		font-size: 1.2em;
		min-width: 0;
		text-align: center;
		background: transparent;
		border: none;
		max-width: 100%;
		color: var(--color-foreground);
		padding: 0;
		&:focus {
			outline: none;
		}
	}

	button {
		font-size: 0.5em;
		background: transparent;
		border: none;
		color: var(--color-foreground);
	}
</style>
