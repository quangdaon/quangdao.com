<script lang="ts">
	import { tooltip } from '$lib/actions/tooltip';
import { calculateStats, type XpSet } from '$lib/integrations/codestats';

	interface Props {
		lang: string;
		xp: XpSet;
	}

	let { lang, xp }: Props = $props();

	const stats = calculateStats(xp);
	const toPercent = (dec: number) => (dec * 100).toFixed(2);

	let xpDisplayValue = $state(`${xp.xps.toLocaleString()} XP`);

	if (xp.new_xps) {
		xpDisplayValue += ` (${xp.new_xps.toLocaleString()} XP Gained Today)`;
	}
</script>

<li class="stat">
	<p>
		{lang}
		<abbr use:tooltip={xpDisplayValue}>Lv. {stats.level}</abbr>
	</p>

	<div
		class="progress"
		use:tooltip={`${toPercent(
			stats.progress
		)}% | ${stats.remaining.toLocaleString()} XP to Level ${stats.level + 1}`}
	>
		<div
			class="progress-previous"
			style="--amount: {toPercent(stats.progressPrevious)}%"
			use:tooltip={`${toPercent(stats.progressPrevious)}%`}
		></div>
		<div
			class="progress-new"
			style="--amount: {toPercent(stats.progressNew)}%"
			use:tooltip={`${toPercent(stats.progressNew)}%`}
		></div>
	</div>
</li>

<style lang="scss">
	p {
		margin: 0 0 0.5em;
	}

	.progress {
		display: flex;
		height: 0.25rem;
		width: 100%;
		background: var(--color-gray-900-op-1);
		&-previous,
		&-new {
			height: 100%;
			width: var(--amount);
			&:hover {
				transform: scaleY(2);
			}
		}
		&-previous {
			background: var(--color-orange-base);
		}
		&-new {
			background: var(--color-purple-base);
		}
	}
</style>
