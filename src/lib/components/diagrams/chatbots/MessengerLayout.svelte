<script>
  import './MessengerLayout.scss';
	import MessengerLayoutChat from './MessengerLayoutChat.svelte';
	export let level = 1;
</script>

<div class="component viewport">
	<div class="component sidebar">
		{#if level >= 2}
			<div class="component contact" />
			<div class="component contact" />
			<div class="component contact" />
		{/if}
	</div>
  <MessengerLayoutChat {level} />
</div>
