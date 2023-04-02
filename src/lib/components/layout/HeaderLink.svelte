<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;

	$: active = $page.url.pathname.indexOf(href) === 0;
</script>

<a class:active {href}><slot /></a>

<style lang="scss">
	a {
		display: block;
		padding: 1em;
		&.active {
			text-decoration-color: var(--color-purple-base);
		}
		@media (prefers-color-scheme: dark) {
			&.active {
				text-decoration-color: var(--color-green-base);
			}
		}
	}
</style>
