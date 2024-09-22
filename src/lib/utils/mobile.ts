import { browser } from '$app/environment';
import { readable } from 'svelte/store';

const THRESHOLD_MOBILE = 800;

export const isMobile = readable(true, (set) => {
	if (!browser) {
		set(false);
		return;
	}

	const listener = () => {
		set(window.screen.width <= THRESHOLD_MOBILE);
	};

	listener();
	window.addEventListener('resize', listener, true);

	return () => window.removeEventListener('resize', listener);
});
