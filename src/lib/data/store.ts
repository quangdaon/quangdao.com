import { derived, writable } from 'svelte/store';

export const windowWidth = writable(0);
export const windowHeight = writable(0);
export const isDesktop = derived([windowWidth, windowHeight], ([$w, $h]) => $w > 1200 && $w > $h);