import { getPosts } from '$lib/content';

export async function load() {
	const projects = (await getPosts('projects')).sort((a, b) => a.priority - b.priority);
	return { projects };
}
