import { browser } from '$app/environment';
import { derived, readable, writable } from 'svelte/store';

export const windowWidth = writable(0);
export const windowHeight = writable(0);
export const isDesktop = derived([windowWidth, windowHeight], ([$w, $h]) => $w > 1200 && $w > $h);

export const prefersReducedMotion = readable(false, (set) => {
	if (!browser) return;
	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	set(mediaQuery.matches);

	const listener = function (e: MediaQueryListEvent) {
		console.log(e.matches);
		set(e.matches);
	};

	mediaQuery.addEventListener('change', listener);

	return () => mediaQuery.removeEventListener('change', listener);
});
