<script>
	import { tooltip } from '$lib/actions/tooltip';
	import { fly } from 'svelte/transition';
	let useVietnameseName = $state(false);
</script>

{#key useVietnameseName}
	<div
		class="name"
		ondblclick={() => (useVietnameseName = !useVietnameseName)}
		in:fly|global={{ duration: 200, y: 20 }}
	>
		{#if useVietnameseName}
			<p lang="vn">Nguyễn Quang Đạo</p>
			<p class="pronunciation">
				(<abbr
					use:tooltip={'"ng" is like the suffix -ing; upward pitch like you are asking a question'}
					>ngween</abbr
				>
				<abbr
					use:tooltip={'Exactly how someone trying to impersonate a stereotypical eastern accent would say "one"; neutral tone'}
					>wahng</abbr
				>
				<abbr use:tooltip={'same as the anglocized "dow (Jones)" except with a heavy tone'}
					>dow</abbr
				>)
			</p>
		{:else}
			<p>Quangdao Nguyen</p>
			<p class="pronunciation">
				(<abbr use:tooltip={'Rhymes with "Ron"'}>kwahn</abbr>&bull;<abbr
					use:tooltip={'As in "Dow Jones"'}>dow</abbr
				>
				<abbr use:tooltip={'Like "win" but with another N in front'}>nwin</abbr>)
			</p>
		{/if}
	</div>
{/key}

<style lang="scss">
	.name {
		margin: var(--spacing) 0;
		p {
			margin: 0;
			&[lang='vn'] {
				font-family: sans-serif;
			}
		}
	}

	.pronunciation {
		font-size: 0.75em;
	}
</style>
