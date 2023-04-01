<script lang="ts">
	import { scale } from 'svelte/transition';
</script>

<main transition:scale={{
	duration: 500,
	start: 0.9
}}>
	<slot />
</main>

<footer />
