import type { PageData } from './$types';

export const load = ({ url, setHeaders }): PageData => {
	const path: string = url.pathname;

	setHeaders({
		'X-Frame-Options': 'SAMEORIGIN'
	});

	return {
		path,
		pageTitle: 'Quangdao Nguyen',
		pageDescription:
			'Quangdao is a creative, adaptable, and resourceful software engineer with a passion for pushing limits and challenging impossiblities.',
		pageSocialImage: '/images/social.png'
	};
};

export const prerender = true;
