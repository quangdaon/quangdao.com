<script lang="ts">
	import { isDesktop } from '$lib/data/store';
	import { sineInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let title: string;
	export let label: string;
	export let href: string;
	export let order: number;

	const dir = order % 2 ? -1 : 1;
</script>

<div
	class="panel"
	transition:fly={{
		x: $isDesktop ? 0 : `${100 * dir}vw`,
		y: $isDesktop ? `${100 * dir}vh` : 0,
		duration: 750,
		opacity: 1,
		easing: sineInOut
	}}
>
	<a class="panel-link" {href}>
		<div class="content">
			<h2 class="label">{label}</h2>
			<div class="title-container">
				<h3 class="title">{title}</h3>
			</div>
		</div>
	</a>
	{#if $$slots.default}
		<div class="footer">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	@use '~/breakpoints';
	@use '~/variables';

	:global(.panel) {
		display: flex;
		flex-direction: column;
		position: relative;
		flex: 1 0 0;
		background-color: var(--color-background);
		--color-background: var(--color-green-base);
		--color-foreground: var(--color-orange-base);

		&:nth-child(even) {
			--color-background: var(--color-orange-base);
			--color-foreground: var(--color-green-base);
		}

		@include breakpoints.large {
			&:hover {
				.title {
					transform: translateY(0);
				}
			}
		}
	}

	.panel-link {
		flex: 1 1 auto;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		height: 100%;
		color: var(--color-foreground);
		text-decoration: none;
	}

	.content {
		text-align: center;
		@include breakpoints.large {
			margin-top: 6em;
		}
	}

	.label {
		display: none;
		margin: 0;
		@include breakpoints.large {
			display: block;
		}
	}

	.title-container {
		overflow: hidden;
	}

	.footer {
		width: 100%;
		@include breakpoints.large {
			position: absolute;
			bottom: 0;
			pointer-events: none;
			:global(*) {
				pointer-events: all;
			}
		}
	}

	.title {
		margin: 0;
		font-size: 4em;
		@include breakpoints.large {
			font-size: 1.2em;
			transform: translateY(100%);
			text-transform: lowercase;
			transition: 200ms;
			font-weight: normal;

			&::before {
				content: '(';
			}
			&::after {
				content: ')';
			}
		}
	}
</style>