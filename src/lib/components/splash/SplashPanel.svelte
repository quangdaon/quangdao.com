<script lang="ts">
	export let title: string;
	export let label: string;
	export let href: string;
</script>

<div class="panel">
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

	.panel {
		position: relative;
		flex: 1 0 0;
		--color-background: var(--color-green);
		--color-foreground: var(--color-orange);

		&:nth-child(even) {
			--color-background: var(--color-orange);
			--color-foreground: var(--color-green);
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
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		height: 100%;
		color: var(--color-foreground);
		background-color: var(--color-background);
		text-decoration: none;
	}

	.content {
		text-align: center;
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
