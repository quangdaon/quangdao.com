<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;

	$: active = $page.url.pathname.indexOf(href) === 0;
</script>

<a class:active {href}><slot /></a>

<style lang="scss">
	@use '~/settings';

	a,
	a:active,
	a:visited {
		display: block;
		padding: 1em;
		&.active {
			text-decoration-color: var(--color-purple-base);
		}
		@include settings.dark-theme {
			text-decoration-color: var(--color-orange-base);
			&.active {
				text-decoration-color: var(--color-green-base);
			}
		}
	}
</style>
