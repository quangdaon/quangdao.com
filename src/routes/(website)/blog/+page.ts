import { getPosts } from '$lib/content';

export async function load() {
	const posts = (await getPosts('blog')).sort((a, b) => b.date.getTime() - a.date.getTime());
	return {
		posts,
		pageTitle: `Quangdao's Blog`,
		pageDescription: 'Ramblings and the occassional useful nugget from Quangdao Nguyen.'
	};
}
