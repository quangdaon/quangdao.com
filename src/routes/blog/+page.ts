import { loadContent } from '$lib/content';

export async function load() {
  const posts = await loadContent('blog');
	return { posts };
}

export const prerender = true;
