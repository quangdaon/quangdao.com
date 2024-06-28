<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let slug: string;
	let loading = true;
	let status: number;
	let body: string | null;

	const refresh = async () => {
		if (!url) return;

		loading = true;

		const res = await fetch(url);

		status = res.status;
		try {
			body = '\n' + JSON.stringify(await res.json(), null, 4);
		} catch {
			body = 'None';
		}

		loading = false;
	};

	onMount(() => refresh());

	$: url = browser ? `${window.location.origin}/api/${slug}` : '';
</script>

<div class="api-preview">
	<div class="api-preview-header">
		<div class="api-preview-title">
			API Preview: {url}
		</div>
		<div class="api-preview-refresh">
			<button on:click|preventDefault={() => refresh()}>
				Refresh
			</button>
		</div>
	</div>
	<div class="api-preview-body">
		<pre>
{#if loading}
				Loading...{:else}
				Status Code: {status}
Response Body: {body}{/if}</pre>
	</div>
</div>

<style lang="scss">
	.api-preview {
		background: hsl(220, 13%, 18%);
		margin: 1em 0;
		&-header, &-body {
			padding: 0.5em;
		}
		&-header {
			display: flex;
			justify-content: space-between;
			button {
				background: hsl(220, 13%, 15%);
				border: none;
				color: var(--color-white);
				font-family: inherit;
				font-size: 0.5em;
				padding: 0.5em;
			}
		}
		&-body {
			background: hsl(220, 13%, 15%);
			font-size: 0.875rem;
			pre {
				margin: 0;
			}
		}
	}
</style>
