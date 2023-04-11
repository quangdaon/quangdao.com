<script lang="ts">
	import { rotateAngleAroundOrigin, type Coordinates } from '$lib/utils/geotrig';

	const edgeCoordinates: Coordinates = [60, 20];
	let offset = 0;
	let referenceCoordinates: Coordinates;

	$: referenceCoordinates = [60, 20 - offset];
	$: controlPoint = rotateAngleAroundOrigin(
		referenceCoordinates,
		[60, 42],
		-(Math.PI * 3 / 16)
	);
	$: referenceEdge = rotateAngleAroundOrigin(
		edgeCoordinates,
		[60, 42],
		-(Math.PI * 3 / 16)
	);
</script>

<svg viewBox="40 18 25 25">
	<g class="frame">
		<rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
		<rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
	</g>
	<g class="chicken">
		<polygon class="beak" points="45,35 35,45 45,55" fill="#f8f600" />
		<circle class="head" cx="60" cy="42" r="20" fill="#fff" />
		<g class="eye">
			<ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
			<ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
		</g>
		<path
			class="crest"
			d="
      M 45.85786437626905 27.85786437626905
      L 44.44365081389596 26.443650813895953
      L 51.580964487968025 21.674650284751692
      L 60 20
      L 68.41903551203197 21.674650284751692
      L 75.55634918610404 26.443650813895953
      L 74.14213562373095 27.85786437626905
    "
			fill="#f00"
		/>

		<path
			d="
      M 74.14213562373095 27.85786437626905
      A 20 20, 0, 0, 0, 45.85786437626905 27.85786437626905
    "
			fill="none"
			stroke="#fff"
			stroke-width="0.1"
			stroke-dasharray="0.5 0.5"
		/>

		<path
			d="
      M 44.44365081389596 26.443650813895953
      Q {controlPoint[0]} {controlPoint[1]}, 51.580964487968025 21.674650284751692
    "
			fill="#ff000080"
			stroke="#f00"
			stroke-width="0.1"
			stroke-dasharray="0.5 0.5"
		/>

		<circle
			class="head"
			cx="60"
			cy="42"
			r="22"
			fill="none"
			stroke="#900"
			stroke-width="0.1"
			stroke-dasharray="0.5 0.5"
		/>
	</g>
	<line
		x1="60"
		y1="42"
		x2="44.44365081389596"
		y2="26.443650813895953"
		stroke="#a8f"
		stroke-width="0.1"
		stroke-dasharray="0.5 0.5"
	/>
	<line
		x1="60"
		y1="42"
		x2="51.580964487968025"
		y2="21.674650284751692"
		stroke="#a8f"
		stroke-width="0.1"
		stroke-dasharray="0.5 0.5"
	/>
	<line
		x1="60"
		y1="42"
		x2={controlPoint[0]}
		y2={controlPoint[1]}
		stroke="#f00"
		stroke-width="0.1"
		stroke-dasharray="0.5 0.5"
	/>
	<circle cx="60" cy="42" r="0.25" fill="#a8f" stroke="#a8f" stroke-width="0" />
	<circle
		cx="44.44365081389596"
		cy="26.443650813895953"
		r="0.25"
		fill="#a8f"
		stroke="#a8f"
		stroke-width="0"
	/>
	<circle
		cx="51.580964487968025"
		cy="21.674650284751692"
		r="0.25"
		fill="#a8f"
		stroke="#a8f"
		stroke-width="0"
	/>
	<circle
		cx={controlPoint[0]}
		cy={controlPoint[1]}
		r="0.25"
		fill="#f00"
		stroke="#f00"
		stroke-width="0"
	/>
	<text
		x={controlPoint[0] - 1}
		y={controlPoint[1] +1}
		font-size="1"
		fill="#f00">n</text
	>
	<circle
		cx={referenceEdge[0]}
		cy={referenceEdge[1]}
		r="0.25"
		fill="#f00"
		stroke="#f00"
		stroke-width="0"
	/>
	<g>
		<line
			x1={controlPoint[0] + 0.5}
			y1={controlPoint[1] - 0.5}
			x2={referenceEdge[0] + 0.5}
			y2={referenceEdge[1] - 0.5}
			stroke="#000"
			stroke-width="0.1"
		/>
		<line
			x1={controlPoint[0] + 0.25}
			y1={controlPoint[1] - 0.25}
			x2={controlPoint[0] + 0.5}
			y2={controlPoint[1] - 0.5}
			stroke="#000"
			stroke-width="0.1"
		/>
		<line
			x1={referenceEdge[0] + 0.25}
			y1={referenceEdge[1] - 0.25}
			x2={referenceEdge[0] + 0.5}
			y2={referenceEdge[1] - 0.5}
			stroke="#000"
			stroke-width="0.1"
		/>
		<line
			x1={(referenceEdge[0] + controlPoint[0] + 1) / 2}
			y1={(referenceEdge[1] + controlPoint[1] - 1) / 2}
			x2={(referenceEdge[0] + controlPoint[0] + 1.5) / 2}
			y2={(referenceEdge[1] + controlPoint[1] - 1.5) / 2}
			stroke="#000"
			stroke-width="0.1"
		/>
		<text
			x={(referenceEdge[0] + controlPoint[0] + 1.7) / 2}
			y={(referenceEdge[1] + controlPoint[1] - 1.7) / 2}
			font-size="1"
			fill="#000">Offset: {offset}</text
		>
	</g>
</svg>

<div class="controls">
	Offset: <input type="range" bind:value={offset} min="0" max="6" step="0.1" />
</div>

<style lang="scss">
	@use '~/settings';

	.chicken {
		opacity: 0.2;
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
		.controls {
			display: none;
		}
	}
</style>
