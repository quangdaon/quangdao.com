<script lang="ts">
	import { calculateStats, type XpSet } from '$lib/integrations/codestats';

	export let lang: String;
	export let xp: XpSet;

	const stats = calculateStats(xp);
	const progressPercent = (stats.progress * 100).toFixed(2);
</script>

<li class="stat">
	<p>{lang} <abbr title="{xp.xps.toLocaleString()} XP">Lv. {stats.level}</abbr></p>

	<div
		class="progress"
		title="{progressPercent}% | {stats.remaining.toLocaleString()} XP to Level {stats.level + 1}"
	>
		<div class="completed" style="--amount: {progressPercent}%" />
	</div>
</li>

<style lang="scss">
	p {
		margin: 0 0 0.5em;
	}

	.progress {
		height: 0.25rem;
		width: 100%;
		background: var(--color-gray-900-op-1);
	}

	.completed {
		height: 100%;
		width: var(--amount);
		background: var(--color-orange-base);
		&:hover {
			transform: scaleY(2);
		}
	}
</style>
