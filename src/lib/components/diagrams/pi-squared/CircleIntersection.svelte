<script lang="ts">
	import type { Coordinates } from '$lib/utils/geotrig';
	import SvgDiagram from '../SvgDiagram.svelte';

	let controlPoint: Coordinates = [150, 59];
	let graphRef: SVGGElement;

	const radius = 120;
	const width = radius * 2;

	let start: Coordinates;
	let startMouse: Coordinates;

	const getMouseMoveHandler = () => (evt: MouseEvent) => {
		const ratio = width / graphRef.getBoundingClientRect().width;
		const offsetX = Math.round((evt.clientX - startMouse[0]) * ratio);
		const offsetY = Math.round((evt.clientY - startMouse[1]) * ratio);
		controlPoint[0] = Math.max(0, Math.min(width, start[0] + offsetX));
		controlPoint[1] = Math.max(0, Math.min(width, start[1] + offsetY));
	};

	const dragStart = (evt: MouseEvent) => {
		start = [...controlPoint];
		startMouse = [evt.clientX, evt.clientY];

		const handleMouseMove = getMouseMoveHandler();

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', () => {
			document.removeEventListener('mousemove', handleMouseMove);
		});
	};

	$: adjustedX = Math.abs(controlPoint[0] - radius);
	$: adjustedY = Math.abs(controlPoint[1] - radius);
	$: dist = Math.sqrt(adjustedX ** 2 + adjustedY ** 2);
	$: inCircle = dist <= radius;
	$: stats = [
		`Coordinates: (${controlPoint[0] - radius}, ${(controlPoint[1] - radius) * -1})`,
		`Distance: ${dist.toFixed(2)}`,
		`Radius: ${radius}`,
		`In Circle: ${inCircle ? 'Yes' : 'No'}`
	];
</script>

<SvgDiagram viewBox="-4 -4 400 250">
	<g class="graph" bind:this={graphRef}>
		<rect x="0" y="0" {width} height={width} class="stroke" />
		<line x1={radius} y1="0" x2={radius} y2={width} stroke-dasharray="4 2" />
		<line x1="0" y1={radius} x2={width} y2={radius} stroke-dasharray="4 2" />
		<circle cx={radius} cy={radius} r={radius} class="stroke circle" class:inCircle />
		<circle cx={radius} cy={radius} r="2" />
		<circle
			cx={controlPoint[0]}
			cy={controlPoint[1]}
			r="4"
			class="control"
			on:mousedown={(e) => dragStart(e)}
		/>
		<line
			x1={radius}
			y1={radius}
			x2={controlPoint[0]}
			y2={controlPoint[1]}
			stroke-dasharray="4 2"
		/>
		<line
			x1={controlPoint[0]}
			y1={radius}
			x2={controlPoint[0]}
			y2={controlPoint[1]}
			stroke-dasharray="2 1"
      stroke-width="0.5"
		/>
		<line
			x1={radius}
			y1={controlPoint[1]}
			x2={controlPoint[0]}
			y2={controlPoint[1]}
			stroke-dasharray="2 1"
      stroke-width="0.5"
		/>
	</g>
	<text x={width} y={radius} font-size="12" dominant-baseline="middle">
		{#each stats as statLine, i}
			<tspan x={width + 10} y="{(i + 1) * 1.5}em">{statLine}</tspan>
		{/each}
	</text>
	<g />
</SvgDiagram>

<style>
	.graph .circle {
		fill: rgba(255, 0, 0, 0.1);
	}

	.graph .inCircle {
		fill: rgba(0, 255, 0, 0.1);
	}

	.control {
		cursor: grab;
	}
</style>
