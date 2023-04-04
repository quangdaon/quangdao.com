<script lang="ts">
	export let value: number;

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
	<button type="button" on:click={increment} tabindex="-1">▲</button>
	<input bind:value max="5" min="0" pattern="[0-5]" maxlength="1" on:keydown={mapEntry} />
	<button type="button" on:click={decrement} tabindex="-1">▼</button>
</div>

<style lang="scss">
	.picker {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: fit-content;
		width: 1em;
	}

	input {
		font-size: 1.2em;
		min-width: 0;
		text-align: center;
		background: transparent;
		border: none;
		max-width: 100%;
    color: var(--color-foreground);
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
