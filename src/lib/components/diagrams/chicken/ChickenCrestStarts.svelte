<svg viewBox="40 16 40 30">
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
			d="
      M 60 42
      L 44.44365081389596 26.443650813895953
      A 22 22, 0, 0, 1, 75.55634918610404 26.443650813895953
    "
			fill="#ff000020"
		/>
		<line
			x1="60"
			y1="42"
			x2="44.44365081389596"
			y2="26.443650813895953"
			stroke="#f00"
			stroke-width="0.1"
			stroke-dasharray="0.5 0.5"
		/>
		<g class="unit">
			<circle
				cx="45.85786437626905"
				cy="27.85786437626905"
				r="0.25"
				fill="#f00"
				stroke="#f00"
				stroke-width="0"
			/>
			<text x="46.35786437626905" y="27.85786437626905" font-size="1" fill="#f00">b' (?, ?)</text>
		</g>
		<g class="unit">
			<circle
				cx="44.44365081389596"
				cy="26.443650813895953"
				r="0.25"
				fill="#f00"
				stroke="#f00"
				stroke-width="0"
			/>
			<text x="44.94365081389596" y="26.443650813895953" font-size="1" fill="#f00">a' (?, ?)</text>
		</g>
		<line
			x1="60"
			y1="42"
			x2="75.55634918610404"
			y2="26.443650813895953"
			stroke="#f00"
			stroke-width="0.1"
			stroke-dasharray="0.5 0.5"
		/>
		<g class="unit">
			<circle
				cx="75.55634918610404"
				cy="26.443650813895953"
				r="0.25"
				fill="#f00"
				stroke="#f00"
				stroke-width="0"
			/>
			<text x="76.05634918610404" y="26.443650813895953" font-size="1" fill="#f00">a" (?, ?)</text>
		</g>
		<g class="unit">
			<circle
				cx="74.14213562373095"
				cy="27.85786437626905"
				r="0.25"
				fill="#f00"
				stroke="#f00"
				stroke-width="0"
			/>
			<text x="74.64213562373095" y="28.35786437626905" font-size="1" fill="#f00">b" (?, ?)</text>
		</g>
		<line
			x1="60"
			y1="42"
			x2="60"
			y2="20"
			stroke="#a8f"
			stroke-width="0.1"
			stroke-dasharray="0.5 0.5"
		/>
		<g class="unit">
			<circle cx="60" cy="22" r="0.25" fill="#a8f" stroke="#a8f" stroke-width="0" />
			<text x="60.5" y="22" font-size="1" fill="#a8f">b (60, 22)</text>
		</g>
		<g class="unit">
			<circle cx="60" cy="20" r="0.25" fill="#a8f" stroke="#a8f" stroke-width="0" />
			<text x="60.5" y="20" font-size="1" fill="#a8f">a (60, 20)</text>
		</g>
		<g class="unit">
			<circle cx="60" cy="42" r="0.25" fill="#a8f" stroke="#a8f" stroke-width="0" />
			<text x="60.5" y="43" font-size="1" fill="#a8f">o (60, 42)</text>
		</g>
		<path
			d="
      M 60 42
      L 60 38
      A 4 4, 0, 0, 1, 62.82842712474619 39.17157287525381
    "
			fill="#a080f020"
		/>
		<g class="unit">
			<path
				d="
        M 60 38
        A 4 4, 0, 0, 1, 62.82842712474619 39.17157287525381
      "
				fill="none"
				stroke="#a8f"
				stroke-width="0.1"
			/>
			<text x="61" y="37.5" font-size="1" fill="#a8f">θ (45°)</text>
		</g>
	</g>
</svg>

<style lang="scss">
	g.unit {
		&:hover {
			text {
				font-weight: bold;
			}
			path,
			circle {
				stroke-width: 0.2;
			}
		}
	}
</style>
