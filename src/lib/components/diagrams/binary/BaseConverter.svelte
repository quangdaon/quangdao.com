<script lang="ts">
	import { getBaseName } from '$lib/config/numeric-bases';
	import BaseNumberInput from './BaseNumberInput.svelte';

	export let baseIn: number;
	export let baseOut: number;

	let valueIn = '0';
	let valueOut = '0';

	const convertBase = (str: string, from: number, to: number) => {
		if (!str) return '0';
		var intValue = parseInt(str, from);

		if (isNaN(intValue)) return '0';

		var toValue = intValue.toString(to);

		return toValue;
	};

	const handleInputChange = () => {
		valueOut = convertBase(valueIn, baseIn, baseOut);
	};

	const handleOutputChange = () => {
		valueIn = convertBase(valueOut, baseOut, baseIn);
	};
</script>

<div class="converter">
	<div>
		<h3>{getBaseName(baseIn)}</h3>
		<BaseNumberInput base={baseIn} bind:value={valueIn} on:input={handleInputChange} />
	</div>

	<div>
		<h3>{getBaseName(baseOut)}</h3>
		<BaseNumberInput base={baseOut} bind:value={valueOut} on:input={handleOutputChange} />
	</div>
</div>

<style lang="scss">
	@use '~/breakpoints';

	.converter {
		margin: var(--spacing) 0;
		text-align: center;
		div {
			margin: var(--spacing) 0;
		}
	}

	@include breakpoints.large {
		.converter {
			display: flex;
			justify-content: space-around;
			gap: 1em;
		}
	}
</style>
