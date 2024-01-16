<script lang="ts">
	const columns = 4 ;
	const rowsPerCol = 256 / columns;
	const range = (start: number, end: number) => {
		const result = [];

		for (let i = start; i <= end; i++) {
			result.push(i);
		}

		return result;
	};
</script>

<div class="charts">
	{#each range(0, columns - 1) as col}
		<table>
			<thead>
				<tr>
					<th>Code</th>
					<th>Character</th>
				</tr>
			</thead>
			<tbody>
				{#each range(0, rowsPerCol - 1) as i}
					{#if col * rowsPerCol + i < 256}
						<tr>
							<td>{col * rowsPerCol + i}</td>
							<td>{String.fromCharCode(col * rowsPerCol + i)}</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	{/each}
</div>

<style>
	.charts {
		display: flex;
	}

	table {
		margin: var(--spacing) 0;
		font-size: 0.75rem;
	}
</style>
