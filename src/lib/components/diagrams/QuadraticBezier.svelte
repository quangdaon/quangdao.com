<script lang="ts">
	import type { Coordinates } from '$lib/utils/geotrig';

	const vpWidth = 100;
	const vpHeight = 70;
	let t = 0.5;

	let svgRef: SVGSVGElement;

	const points: Record<string, Coordinates> = {
		a: [10, vpHeight - 10],
		b: [vpWidth - 15, vpHeight - 20],
		control: [50, 20]
	};

	let start: Coordinates;
	let startMouse: Coordinates;

	const getMouseMoveHandler = (point: keyof typeof points) => (evt: MouseEvent) => {
		const ratio = vpWidth / svgRef.getBoundingClientRect().width;
		console.log(ratio);
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

	// points.a[0] + (points.control[0] - points.a[0]) * t,
	$: ta = points.a.map((p: number, i: number) => p + (points.control[i] - p) * t);
	$: tb = points.control.map((p: number, i: number) => p + (points.b[i] - p) * t);
	$: tt = ta.map((p: number, i: number) => p + (tb[i] - p) * t);
</script>

<svg viewBox="0 0 {vpWidth} {vpHeight}" bind:this={svgRef}>
	<path
		class="line"
		d="
      M {points.a[0]} {points.a[1]}
      Q {points.control[0]} {points.control[1]}, {points.b[0]} {points.b[1]}
    "
		stroke-width="0.1"
		stroke-dasharray="1 1"
	/>
	<path
		class="line"
		d="
      M {points.a[0]} {points.a[1]}
      Q {ta[0]} {ta[1]}, {tt[0]} {tt[1]}
    "
		stroke-width="0.5"
	/>
	<line
		class="line"
		x1={points.a[0]}
		y1={points.a[1]}
		x2={points.b[0]}
		y2={points.b[1]}
		stroke-width="0.1"
	/>
	<line
		class="line"
		x1={points.a[0]}
		y1={points.a[1]}
		x2={points.control[0]}
		y2={points.control[1]}
		stroke-width="0.1"
		stroke-dasharray="1 1"
	/>
	<line
		class="line"
		x1={points.control[0]}
		y1={points.control[1]}
		x2={points.b[0]}
		y2={points.b[1]}
		stroke-width="0.1"
		stroke-dasharray="1 1"
	/>
	<g class="t">
		<circle class="point" cx={ta[0]} cy={ta[1]} r="0.5" stroke="none" />
		<circle class="point" cx={tb[0]} cy={tb[1]} r="0.5" stroke="none" />
		<circle class="point" cx={tt[0]} cy={tt[1]} r="0.5" stroke="none" />
		<line class="line" x1={ta[0]} y1={ta[1]} x2={tb[0]} y2={tb[1]} stroke-width="0.1" />
		<text x={tt[0]} y={tt[1] - 2} font-size="3">t: {t}</text>
	</g>
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
	<g class="handle">
		<circle
			class="point"
			cx={points.control[0]}
			cy={points.control[1]}
			r="1"
			stroke="none"
			on:mousedown={(e) => dragStart(e, 'control')}
		/>
		<text x={points.control[0] + 1} y={points.control[1] + 3} font-size="3">Control</text>
	</g>
</svg>

<div class="controls">
	t: <input type="range" bind:value={t} min="0" max="1" step="0.01" />
</div>

<style lang="scss">
	@use '~/settings';

	svg {
		--t-color: #f00;
		@include settings.dark-theme {
			--t-color: #0f0;
		}
	}

	.point {
		fill: var(--color-foreground);
		stroke: none;
	}
	.line {
		fill: none;
		stroke: var(--color-foreground);
	}

	g.t {
		.point {
			fill: var(--t-color);
		}
		.line {
			stroke: var(--t-color);
		}
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
		display: flex;
		align-items: center;
		justify-content: center;
		input {
			margin: 0 0.5rem;
		}
	}

	@include settings.media-print {
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
