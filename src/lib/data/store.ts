import { browser } from '$app/environment';
import { keyLength } from '$lib/secrets';
import { derived, readable, writable } from 'svelte/store';

export function localStorageWritable<T>(
	key: string,
	value: T,
	sanitizer: (storedValue: T) => boolean = () => true
) {
	if (!browser) return writable<T>(value);

	const stored = localStorage.getItem(key);
	const parsed = stored ? JSON.parse(stored) : null;
	const store = writable<T>(parsed && sanitizer(parsed) ? parsed : value);

	store.subscribe((v) => localStorage.setItem(key, JSON.stringify(v)));

	return store;
}

export const windowWidth = writable(0);
export const windowHeight = writable(0);
export const isDesktop = derived([windowWidth, windowHeight], ([$w, $h]) => $w > 1200 && $w > $h);

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

export const keyValue = localStorageWritable(
	'KEY_VALUE',
	Array(keyLength).fill('0').join(''),
	(val) => val.length === keyLength
);
