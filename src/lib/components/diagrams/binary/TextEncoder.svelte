<script lang="ts">
	import { getAllowedDigits, getBaseName } from '$lib/config/numeric-bases';

	export let base: number;

	let bitSize = Math.log(256) / Math.log(base);
	if (bitSize !== Math.floor(bitSize)) bitSize = 0;

	const handleEncodingChange = () => {
		if (valueEncoded.trim() === '') {
			valuePlain = '';
			return;
		}

		valuePlain = formatEncoding(valueEncoded)
			.split(' ')
			.map((e) => String.fromCharCode(parseInt(e, base)))
			.join('');
	};

	const handlePlaintextChange = () => {
		valueEncoded = formatPlaintext(valuePlain)
			.split('')
			.map((e) => e.charCodeAt(0).toString(base).padStart(bitSize, '0'))
			.join(' ');
	};

	const formatPlaintext = (value: string) => {
		return value
			.split('')
			.map((e) => e.charCodeAt(0))
			.filter((e) => e < 256)
			.map((e) => String.fromCharCode(e))
			.join('');
	};

	const formatEncoding = (value: string) => {
		const illegalDigitsPattern = new RegExp(`[^ ${getAllowedDigits(base).join('')}]`, 'g');
		const rawValue = value.replace(illegalDigitsPattern, '').trim();
		if (!bitSize) return rawValue;

		const bytesPattern = new RegExp(`(.{1,${bitSize}})`, 'g');

		return (
			rawValue
				.replace(/\s/g, '')
				.match(bytesPattern)
				?.map((e) => e.padStart(bitSize, '0'))
				.join(' ') ?? ''
		);
	};

	let valuePlain = 'Hello, world!';
	let valueEncoded = '0';

	handlePlaintextChange();
</script>

<div class="converter">
	<div>
		<h3>{getBaseName(base)}</h3>
		<textarea
			bind:value={valueEncoded}
			on:input={handleEncodingChange}
			on:blur={() => (valueEncoded = formatEncoding(valueEncoded))}
		/>
	</div>

	<div>
		<h3>Plain Text</h3>
		<textarea
			bind:value={valuePlain}
			on:input={handlePlaintextChange}
			on:blur={() => (valuePlain = formatPlaintext(valuePlain))}
		/>
	</div>
</div>

<style lang="scss">
	@use '@scissors/breakpoints';

	.converter {
		text-align: center;
		div {
			margin: var(--spacing) 0;
		}

		textarea {
			width: 100%;
			min-height: 10em;
			resize: vertical;
		}
	}

	@include breakpoints.large {
		.converter {
			margin: var(--spacing) 0;
			display: flex;
			gap: var(--spacing);
			justify-content: stretch;
			div {
				flex: 1 0 0;
			}
		}
	}
</style>
