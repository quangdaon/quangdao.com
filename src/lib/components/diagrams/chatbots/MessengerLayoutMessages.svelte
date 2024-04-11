<script>
	import './MessengerLayout.scss';
	export let level = 3;
</script>

<div class="component messages">
	{#if level >= 3}
		<div class="message-row"><div class="component message other" /></div>
		<div class="message-row"><div class="component message self" /></div>
		<div class="message-row"><div class="component message other" /></div>
	{/if}
</div>
