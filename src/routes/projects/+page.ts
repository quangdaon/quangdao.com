import { loadPosts } from '$lib/content';

export async function load() {
  const projects = await loadPosts('projects');
	return { projects };
}
