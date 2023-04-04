<script lang="ts">
	export let key: String;
	const toothWidth = 20;

	const calcPoints = (tooth: number, i: number) => {
		const x = i * toothWidth + 20;
		const y = 50;
		const h = 12 + Number(tooth) * 6;

		return [
			[x, y],
			[x, y + h - (i % 2 ? 0 : 6)],
			[x + toothWidth + 3, y + h - (i % 2 ? 6 : 0)],
			[x + toothWidth + 3, y]
		];
	};

	const convertPoints = (arr: number[][]) => {
		return arr.map((e) => e.join(',')).join(' ');
	};

	$: teeth = key.split('');
</script>

<svg viewBox="0 0 300 100">
	<ellipse class="ring" cx="270" cy="50" rx="20" ry="40" />
	<rect class="rod" x="0" y="30" height="20" width="250" ry="10" />
	<rect class="glare" x="10" y="32" height="5" width="200" ry="10" />
	<g class="teeth">
		{#each teeth as tooth, i}
			<polygon class="tooth" points={convertPoints(calcPoints(+tooth, i))} />
		{/each}
	</g>
</svg>

<style>
	svg {
		width: 100%;
	}

	.ring {
		fill: transparent;
		stroke: var(--color-orange-base);
		stroke-width: 15;
	}

	.rod {
		fill: var(--color-orange-base);
	}

	.glare {
		fill: var(--color-orange-200);
	}

	.tooth {
		fill: var(--color-orange-600);
	}
</style>
