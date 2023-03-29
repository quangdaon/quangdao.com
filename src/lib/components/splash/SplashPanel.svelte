<script lang="ts">
	export let label: string;
	const hue = Math.floor(Math.random() * 361);
</script>

<div class="panel" style="--hue: {hue}">
	<div class="content">
		<h2>{label}</h2>
	</div>
</div>

<style lang="scss">
	.panel {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1 1 auto;
		background: hsl(var(--hue), 70%, 80%); // temp
		$background-colors: (pink, lightgreen, lightblue, periwinkle);
		@for $i from 1 through length($background-colors) {
			$color: nth($background-colors, $i);
			&:nth-child(#{$i}) {
				background-color: $color;
			}
		}
	}
</style>
