<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		viewBox: string;
		children?: Snippet;
		[key: string]: any;
	}

	let { ...props }: Props = $props();
</script>

<div class="diagram">
	<svg {...props}>
		{@render props.children?.()}
	</svg>
</div>

<style>
	svg :global(.stroke),
	svg :global(line) {
		fill: transparent;
		stroke: var(--color-foreground);
	}
</style>
