<script>
	import MessengerLayoutMessages from './MessengerLayoutMessages.svelte';

	import './MessengerLayout.scss';
	export let level = 2;
</script>

<div class="component chat">
	{#if level >= 2}
		<div class="component infobar" />
		<MessengerLayoutMessages {level} />
		<div class="component message-entry" />
	{/if}
</div>
