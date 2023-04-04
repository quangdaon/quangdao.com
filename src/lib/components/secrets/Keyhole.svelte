<script>
	import Keybuilder from './Keybuilder.svelte';

</script>

<button class="keyhole" title="Hmm... What could this possibly be?">
	<svg viewBox="0 0 100 150">
		<circle cx="50" cy="50" r="50" class="keyhole-shape" />
		<rect x="25" y="60" rx="10" width="50" height="75" class="keyhole-shape" />
	</svg>
</button>

<Keybuilder />

<style>
	svg {
		width: 50px;
	}

	.keyhole {
		display: block;
		margin: auto;
		background-color: transparent;
    border: none;
    cursor: pointer;
	}

	.keyhole-shape {
		fill: var(--color-black);
		stroke: none;
	}
</style>
