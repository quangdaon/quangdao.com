<script lang="ts">
	import { page } from '$app/stores';
	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();

	let active = $derived($page.url.pathname.indexOf(href) === 0);
</script>

<a class:active {href}>{@render children?.()}</a>

<style lang="scss">
	@use '@scissors/media';

	a,
	a:active,
	a:visited {
		display: block;
		padding: 1em;
		&.active {
			text-decoration-color: var(--color-purple-base);
		}
		@include media.dark {
			text-decoration-color: var(--color-orange-base);
			&.active {
				text-decoration-color: var(--color-green-base);
			}
		}
	}
</style>
