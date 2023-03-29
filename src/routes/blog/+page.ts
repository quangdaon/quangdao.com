import { loadPosts } from '$lib/content';

export async function load() {
	const posts = (await loadPosts('blog')).sort(
		(a, b) => b.date.getTime() - a.date.getTime()
	);
	return { posts };
}
