import { browser } from '$app/environment';
import { keyLength } from '$lib/secrets';
import { writable } from 'svelte/store';

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

export const keyValue = localStorageWritable(
	'KEY_VALUE',
	Array(keyLength).fill('0').join(''),
	(val) => val.length === keyLength
);
