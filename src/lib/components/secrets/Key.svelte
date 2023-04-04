<script lang="ts">
	export let key: String;
	const toothWidth = 20;

	$: teeth = key.split('');
</script>

<svg viewBox="0 0 400 100">
	<ellipse class="ring" cx="370" cy="50" rx="20" ry="40" />
	<rect class="rod" x="0" y="30" height="20" width="350" ry="10" />
	<g class="teeth">
		{#each teeth as tooth, i}
			{@const x = i * toothWidth + 20}
			{@const y = 50}
			{@const h = 12 + Number(tooth) * 6}
			
			<polygon
				class="tooth"
				points="{x},{y} {x},{y + h - (i % 2 ? 0 : 6)} {x + toothWidth},{y +
					h -
					(i % 2 ? 6 : 0)} {x + toothWidth},{y}"
			/>
		{/each}
	</g>
</svg>

<style>
	svg {
		width: 200px;
		--color-key: var(--color-orange-base);
	}

	.ring {
		fill: transparent;
		stroke: var(--color-key);
		stroke-width: 15;
	}

	.rod,
	.tooth {
		fill: var(--color-key);
	}
</style>
