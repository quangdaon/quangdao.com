import { dev } from '$app/environment';
import type { PageData } from './$types';

export const load = ({ url }): PageData => {
	const path: string = url.pathname;

	return {
		path,
		pageTitle: 'Quangdao Nguyen',
		pageDescription:
			'Quangdao is a creative, adaptable, and resourceful software engineer with a passion for pushing limits and challenging impossiblities.',
		pageSocialImage: '/images/social.png'
	};
};

export const prerender = true;
