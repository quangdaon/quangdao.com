import { browser } from '$app/environment';
import { derived, readable, writable } from 'svelte/store';

export function localStorageWritable<T>(key: string, value: T) {
  if (!browser)
    return writable<T>(value);

  var stored = localStorage.getItem(key);
  var store = writable<T>(stored ? JSON.parse(stored) : value);

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


export const keyValue = localStorageWritable('KEY_VALUE', '000000');