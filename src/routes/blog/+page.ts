import { loadPosts } from '$lib/content';

export async function load() {
	const posts = (await loadPosts('blog')).sort((a, b) => (a.date = b.date));
	return { posts };
}
