import type { SvelteComponent } from 'svelte';

export interface ContentPost {
	title: string;
	slug: string;
	component?: typeof SvelteComponent;
}
