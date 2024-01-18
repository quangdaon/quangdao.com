<script lang="ts">
	export let baseIn: number;
	export let baseOut: number;
	export let value: string;

	const resultsInDecimal = false;
	const targetBase = resultsInDecimal ? 10 : baseOut;

	$: digits = value.split('');
</script>

<div class="breakdown">
	{#each digits as digit, i}
		{@const power = digits.length - i - 1}
		{@const convertedDigit = parseInt(digit, baseIn)}
		{@const magnitude = baseIn ** power}
		{@const digitValue = convertedDigit * magnitude}

		{@const powerDisplay = power.toString(targetBase)}
		{@const convertedDigitDisplay = convertedDigit.toString(targetBase)}
		{@const magnitudeDisplay = magnitude.toString(targetBase)}
		{@const digitValueDisplay = digitValue.toString(targetBase)}
		{@const baseInDisplay = baseIn.toString(targetBase)}
		{#if i > 0}<div class="plus">+</div>{/if}
		<div class="cell">
			<div class="digit">{digit}</div>
			<div class="power">
				<abbr title={`${convertedDigitDisplay} × ${magnitudeDisplay}`}
					>{convertedDigitDisplay} × {baseInDisplay}<sup>{powerDisplay}</sup></abbr
				>
			</div>
			<div class="value" title={digitValueDisplay}>{digitValueDisplay}</div>
		</div>
	{/each}
</div>

<style>
	.breakdown {
		font-size: 0.875em;
		display: grid;
		gap: 1em 0.5em;
		grid-template-columns: repeat(8, minmax(0, 1fr) 1em);
	}

	.cell {
		text-align: center;
	}

	.power {
		font-size: 0.75em;
	}

	.plus {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.value {
		text-overflow: ellipsis;
		word-break: keep-all;
		text-wrap: nowrap;
		word-wrap: normal;
		overflow: hidden;
	}
</style>
