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
    setTimeout(() => {
      const utteranceScript = document.createElement('script');
      const targetTag = document.getElementById('utterances-comments');
  
      for (const prop in options) {
        utteranceScript.setAttribute(prop, options[prop]);
      }
  
      targetTag?.appendChild(utteranceScript);
    }, 500);
	});
</script>

<noscript>JavaScript must be enabled to leave comments.</noscript>
<div id="utterances-comments" />
