<script>
	import { tooltipParams } from '$lib/actions/tooltip';
</script>

{#if $tooltipParams}
	<div
		class="tooltip"
		style="--x: {$tooltipParams.x}px; --y: {$tooltipParams.y}px"
	>
		{$tooltipParams?.message}
	</div>
{/if}

<style lang="scss">
	.tooltip {
		position: absolute;
		left: var(--x);
		top: var(--y);
		z-index: 99;
		--color-background: var(--color-blue-base);
		color: var(--color-white);
		background: var(--color-background);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.75rem;
    max-width: 200px;
    line-height: 1.2;
		transform: translate(-50%, calc(-100% - 1em));
    box-shadow: 0 0.25rem 1rem var(--color-gray-900-op-1);
		&::after {
			content: '';
			position: absolute;
			top: 100%;
			width: 0.5em;
			height: 0.5em;
			left: 50%;
			border: 0.5em solid transparent;
			border-top-color: var(--color-background);
			transform: translate(-50%);
		}
	}
</style>
