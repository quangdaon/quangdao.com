import { loadPosts } from '$lib/content';

export async function load() {
  const posts = await loadPosts('blog');
	return { posts };
}
