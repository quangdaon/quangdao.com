<script lang="ts">
	import { prefersReducedMotion } from '$lib/utils/accessibility';
	import { isMobile } from '$lib/utils/mobile';
	import { sineInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	export let title: string;
	export let label: string;
	export let href: string;
	export let order: number;
	
	const dir = order % 2 ? -1 : 1;

	const getAnimation = (isMobile: boolean) => (node: Element) =>
		$prefersReducedMotion
			? fade(node, { duration: 250, easing: sineInOut })
			: fly(node, {
					x: !isMobile ? 0 : `${100 * dir}vw`,
					y: !isMobile ? `${100 * dir}vh` : 0,
					duration: 750,
					opacity: 1,
					easing: sineInOut
			  })

	$: animation = getAnimation($isMobile);
</script>

<div class="panel" transition:animation|global>
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
	@use '@scissors/breakpoints';

	.panel {
		display: flex;
		flex-direction: column;
		position: relative;
		flex: 1 0 0;
		background-color: var(--color-background);
		font-size: 0.75em;

		@include breakpoints.large {
			font-size: 1em;
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

		&:hover {
			color: var(--color-foreground);
		}
	}

	.content {
		text-align: center;
		@include breakpoints.large {
			margin-top: 4em;
		}
	}

	.label {
		display: none;
		margin: 0;
		color: var(--color-foreground);
		@include breakpoints.large {
			display: block;
		}
	}

	.title-container {
		overflow: hidden;
	}

	.title {
		margin: 0;
		font-size: 4em;
		color: var(--color-foreground);
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
</style>
