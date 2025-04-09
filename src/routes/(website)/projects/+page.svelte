<script lang="ts">
	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<h1>Projects</h1>

{#each data.projects as project}
	<article>
		<h2>{project.title}</h2>
		<p>{project.description}</p>
		<ul>
			{#each project.links as link}
				<li>
					<a href={link.url} rel="external">{link.label}</a>
				</li>
			{/each}
		</ul>
	</article>
{/each}
