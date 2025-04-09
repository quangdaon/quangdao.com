<script lang="ts">
	interface Props {
		key: String;
	}

	let { key }: Props = $props();
	const toothWidth = 20;

	const convertPoints = (arr: number[][]) => {
		return arr.map((e) => e.join(',')).join(' ');
	};

	const calcPoints = (teeth: string[]) => {
		const points = [[20, 50]];

		for (let i = 0; i < teeth.length; i++) {
			const tooth = teeth[i];
			const x = i * toothWidth + 20;
			const y = 50;
			const h = 12 + Number(tooth) * 6;
			points.push(
				[x, y + h - (i % 2 ? 0 : 6)],
				[x + toothWidth, y + h - (i % 2 ? 6 : 0)],
				[x + toothWidth, y]
			);
		}

		points.push([120, 50]);

		return points;
	};

	let teeth = $derived(key.split(''));
</script>

<svg viewBox="0 0 300 100">
	<ellipse class="ring" cx="270" cy="50" rx="20" ry="40" />
	<rect class="rod" x="0" y="30" height="20" width="250" ry="10" />
	<rect class="glare" x="10" y="32" height="5" width="200" ry="10" />
	<polygon class="teeth" points={convertPoints(calcPoints(teeth))} />
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

	.teeth {
		fill: var(--color-orange-600);
		transition: all 1s;
	}
</style>
