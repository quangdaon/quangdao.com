<script lang="ts">
	import type { XpSet } from '$lib/integrations/codestats';
	import { isMobile } from '$lib/utils/mobile';
	import LangStat from './LangStat.svelte';

	interface Props {
		stats: Record<string, XpSet>;
	}

	let { stats }: Props = $props();

	let statsToUse = $derived(Object.entries(stats)
		.sort(([, a], [, b]) => b.xps - a.xps)
		.splice(0, !$isMobile ? 12 : 4));
</script>

<details>
	<summary>Usage Stats</summary>
	<div class="codestats">
		<ul>
			{#each statsToUse as [lang, xp]}
				<LangStat {lang} {xp} />
			{/each}
			<li class="attribution">
				Powered by <a href="https://codestats.net/users/QuangdaoN">Code::Stats</a>
			</li>
		</ul>
	</div>
</details>

<style lang="scss">
	@use '@scissors/media';
	@use '@scissors/breakpoints';

	.codestats {
		font-size: 0.75em;
		background: var(--color-gray-200-op-5);
		padding: 1em;
		margin: var(--spacing) 0;
		@include media.dark {
			background: var(--color-green-base-op-5);
		}
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1em;
		@include breakpoints.large {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.attribution {
		font-style: italic;
		margin: 1rem 0 0 auto;
		font-size: 0.75em;
		text-align: right;
		@include breakpoints.large {
			grid-column-start: 4;
		}
	}
</style>
