import { getPosts } from '$lib/content';

export async function load() {
	const posts = (await getPosts('blog')).sort(
		(a, b) => b.date.getTime() - a.date.getTime()
	);
	return { posts };
}
