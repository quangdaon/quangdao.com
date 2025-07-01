<script lang="ts">
	import { dev } from '$app/environment';
	import type { ActivitiesResponse } from '$lib/integrations/activities/models';

	interface Props {
		data: ActivitiesResponse;
	}

	const { data }: Props = $props();
	const { activities, lastUpdated } = data;
	const updated = new Date(lastUpdated);
	const convertedLastUpdated = new Date(updated.setHours(updated.getHours() + 6));
</script>

<h1>What I'm up to <i>now</i>.</h1>

<p>
	This is a <a href="https://nownownow.com/about">/now page</a> inspired by
	<a href="https://sive.rs/now">Derek Sivers</a>. If you don't have one, you should!
</p>

{#each activities as activity}
	<h2 data-hobby-id={dev ? activity.notionId : null}>{activity.title}</h2>

	{@html activity.content}
{/each}

<p><i>Last Updated: {convertedLastUpdated.toLocaleDateString()}</i></p>

<p>
	Fun fact: this page pulls its content dynamically from <a href="https://www.notion.com/">Notion</a>. Curious how it works? <a href="/blog/now-by-notion">Check out my blog post.</a>
</p>
