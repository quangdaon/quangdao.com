import { getPosts } from '$lib/content';

export async function load() {
	const projects = (await getPosts('projects')).sort((a, b) => a.priority - b.priority);
	return {
		projects,
		pageTitle: 'Projects by Quangdao Nguyen',
		pageDescription: 'A list of projects Quangdao worked on or is working on.'
	};
}
