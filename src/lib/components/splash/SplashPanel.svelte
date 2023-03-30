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

	.panel {
		position: relative;
		flex: 1 0 0;
		$background-colors: (pink, lightblue, lightgreen, lavender);
		@for $i from 1 through length($background-colors) {
			$color: nth($background-colors, $i);
			&:nth-child(#{$i}) {
				background-color: $color;
			}
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
		color: currentColor;
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
