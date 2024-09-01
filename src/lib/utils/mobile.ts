import { browser } from '$app/environment';
import { readable } from 'svelte/store';

const THRESHOLD_MOBILE = 1200;

export const isMobile = readable(true, (set) => {
	if (!browser) {
    set(false);
		return () => 0;
	}

	const listener = () => {
		set(window.screen.width <= THRESHOLD_MOBILE);
	};

	listener();
	window.addEventListener('resize', listener, true);

	return () => window.removeEventListener('resize', listener);
});
