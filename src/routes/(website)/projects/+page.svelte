<script lang="ts">
	import PageLayout from '$lib/components/layout/PageLayout.svelte';

	export let data;
</script>

<PageLayout>
	<h1 slot="title">Projects</h1>

	{#each data.projects as project}
		<div>
			<h2>{project.title}</h2>
			<p>{project.description}</p>
			<ul>
				{#each project.links as link}
					<li>
						<a href={link.url} rel="external">{link.label}</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</PageLayout>
