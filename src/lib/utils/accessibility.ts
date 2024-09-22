import { browser } from '$app/environment';
import { readable } from 'svelte/store';


export const prefersReducedMotion = readable(false, (set) => {
	if (!browser) return;
	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	set(mediaQuery.matches);

	const listener = function (e: MediaQueryListEvent) {
		set(e.matches);
	};

	mediaQuery.addEventListener('change', listener);

	return () => mediaQuery.removeEventListener('change', listener);
});