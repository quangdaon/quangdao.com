<script lang="ts">
	import { onMount } from 'svelte';
  
	const options: Record<string, string> = {
		src: 'https://utteranc.es/client.js',
		repo: 'quangdaon/quangdao.com',
		label: 'comments',
		crossorigin: 'anonymous',
		theme: 'preferred-color-scheme',
		async: '',
		'issue-term': 'pathname'
	};

	onMount(() => {
		const utteranceScript = document.createElement('script');
		const targetTag = document.getElementById('utterances-comments');

		for (const prop in options) {
			utteranceScript.setAttribute(prop, options[prop]);
		}

    targetTag?.appendChild(utteranceScript);
	});
</script>

<div class="comments">
	<noscript>JavaScript must be enabled to leave comments.</noscript>
	<div id="utterances-comments"></div>
</div>

<style lang="scss">
	@use '@scissors/media';

	@include media.print {
		.comments {
			display: none;
		}
	}
</style>