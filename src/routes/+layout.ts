import type { PageData } from './$types';

export const load = ({ url }: { url: URL }): PageData => {
	const path: string = url.pathname;

	return {
		path
	};
};

export const prerender = true;
