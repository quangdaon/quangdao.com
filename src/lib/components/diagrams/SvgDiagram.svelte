<script lang="ts">
	export let viewBox: string;
</script>

<div class="diagram">
	<svg {viewBox} {...$$props}>
		<slot />
	</svg>
</div>


<style>
  svg :global(.stroke), svg :global(line) {
    fill: transparent;
    stroke: var(--color-foreground);
  }
</style>