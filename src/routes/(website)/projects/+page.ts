import { getPosts } from '$lib/content';

export async function load() {
  const projects = await getPosts('projects');
	return { projects };
}
