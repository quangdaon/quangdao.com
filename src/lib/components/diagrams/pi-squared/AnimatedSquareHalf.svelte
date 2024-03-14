<script>
	import SvgDiagram from '../SvgDiagram.svelte';
</script>

<SvgDiagram viewBox="0 0 240 240" width="400">
	<rect x="0" y="0" width="240" height="240" class="stroke" stroke-width="2" />
	<rect x="0" y="0" width="120" height="120" class="stroke rect" />
	<line x1="120" y1="0" x2="120" y2="240" class="line" stroke-dasharray="4 2" />
	<line x1="0" y1="120" x2="240" y2="120" class="line" stroke-dasharray="4 2" />
</SvgDiagram>

<style>
	.rect {
		transform-origin: center;
		animation: shift 8s ease-in forwards infinite;
	}

	.line {
    opacity: 1;
		animation: vanish 8s ease-in forwards infinite;
	}

	@keyframes shift {
		0% {
			transform: rotate(0) translate(0);
			fill: transparent;
      stroke-width: 0;
		}
		12.5% {
			transform: rotate(0) translate(0);
			fill: transparent;
      stroke-width: 0;
		}
		25% {
			transform: rotate(0) translate(0);
			fill: rgba(0, 255, 0, 0.1);
      stroke-width: 1;
		}
		37.5% {
			transform: rotate(12deg) translate(27.5%, 24%);
			fill: rgba(0, 255, 0, 0.1);
      stroke-width: 1;
		}
		100% {
			transform: rotate(12deg) translate(27.5%, 24%);
			fill: rgba(0, 255, 0, 0.1);
      stroke-width: 1;
		}
	}

	@keyframes vanish {
		0% {
      stroke-width: 1;
		}
		12.5% {
      stroke-width: 1;
		}
		25% {
      stroke-width: 0;
		}
		100% {
      
      stroke-width: 0;
		}
	}
</style>
