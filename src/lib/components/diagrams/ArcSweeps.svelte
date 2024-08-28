<script lang="ts">
	import type { Coordinates } from '$lib/utils/geotrig';

	let rx = 25;
	let ry = 10;
	let rotate = 0;

	enum ArcFlag {
		LargeArc = 1,
		Sweep = 2
	}

	let flagsChecked: ArcFlag[] = [];

	const vpWidth = 100;
	const vpHeight = 70;

	let svgRef: SVGSVGElement;

	const points: Record<string, Coordinates> = {
		a: [vpWidth / 2 - 5, vpHeight / 2 - 5],
		b: [vpWidth / 2 + 5, vpHeight / 2 + 10]
	};

	let start: Coordinates;
	let startMouse: Coordinates;

	const getMouseMoveHandler = (point: keyof typeof points) => (evt: MouseEvent) => {
		const ratio = vpWidth / svgRef.getBoundingClientRect().width;
		const offsetX = (evt.clientX - startMouse[0]) * ratio;
		const offsetY = (evt.clientY - startMouse[1]) * ratio;
		points[point][0] = Math.max(2, Math.min(vpWidth - 2, start[0] + offsetX));
		points[point][1] = Math.max(2, Math.min(vpHeight - 2, start[1] + offsetY));
	};

	const dragStart = (evt: MouseEvent, point: keyof typeof points) => {
		start = [...points[point]];
		startMouse = [evt.clientX, evt.clientY];

		const handleMouseMove = getMouseMoveHandler(point);

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', () => {
			document.removeEventListener('mousemove', handleMouseMove);
		});
	};

	$: flags = flagsChecked.reduce((a, b) => a + b, 0);
	$: isFlagOn = (flags: number, flag: ArcFlag) => {
		return (flags & flag) === flag ? 1 : 0;
	};
</script>

<svg viewBox="0 0 {vpWidth} {vpHeight}" bind:this={svgRef}>
	{#each Array(4) as _, i}
		<path
			class="line"
			d="
        M {points.a[0]} {points.a[1]}
        A {rx} {ry},
          {rotate},
          {isFlagOn(i, ArcFlag.LargeArc)},
          {isFlagOn(i, ArcFlag.Sweep)},
          {points.b[0]} {points.b[1]}
      "
			stroke-width={flags === i ? 0.25 : 0.1}
			stroke-dasharray={flags === i ? 0 : 1}
		/>
	{/each}
	<g class="handle">
		<circle
			class="point"
			cx={points.a[0]}
			cy={points.a[1]}
			r="1"
			stroke="none"
			on:mousedown={(e) => dragStart(e, 'a')}
		/>
		<text x={points.a[0] + 1} y={points.a[1] + 3} font-size="3">Point A</text>
	</g>
	<g class="handle">
		<circle
			class="point"
			cx={points.b[0]}
			cy={points.b[1]}
			r="1"
			stroke="none"
			on:mousedown={(e) => dragStart(e, 'b')}
		/>
		<text x={points.b[0] + 1} y={points.b[1] + 3} font-size="3">Point B</text>
	</g>
</svg>

<div class="controls">
	<div class="row row-range">
		RX: <input type="range" bind:value={rx} min="10" max="60" step="1" />
	</div>
	<div class="row row-range">
		RY: <input type="range" bind:value={ry} min="10" max="60" step="1" />
	</div>
	<div class="row row-range">
		Rotation: <input type="range" bind:value={rotate} min="0" max="180" step="11.25" />
	</div>
	<div class="row">
		<label>
			Large Arc Flag
			<input type="checkbox" value={ArcFlag.LargeArc} bind:group={flagsChecked} name="arcflags" />
		</label>
		<label>
			Sweep Flag
			<input type="checkbox" value={ArcFlag.Sweep} bind:group={flagsChecked} name="arcflags" />
		</label>
	</div>
</div>

<style lang="scss">
	@use '@scissors/media';

	.point {
		fill: var(--color-foreground);
		stroke: none;
	}

	.line {
		fill: none;
		stroke: var(--color-foreground);
	}

	.handle {
		circle {
			cursor: grab;
		}
		text {
			display: none;
		}
		&:hover {
			text {
				display: block;
			}
		}
	}

	.controls {
		max-width: 400px;
		margin: auto;
		.row {
			display: flex;
			align-items: center;
			justify-content: center;
			&.row-range {
				justify-content: space-between;
			}
			input {
				margin: 0 0.5rem;
			}
		}
	}

	@include media.print {
		.handle {
			text {
				display: block;
			}
		}
		.controls {
			display: none;
		}
	}
</style>
