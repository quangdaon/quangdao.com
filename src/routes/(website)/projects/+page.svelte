<script lang="ts">
	export let data;
</script>

<h1>Projects</h1>

{#each data.projects as project}
	<div>
		<h2>{project.title}</h2>
		<p>{project.description}</p>
		<ul>
			{#each project.links as link}
				<li>
					<a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
				</li>
			{/each}
		</ul>
	</div>
{/each}
