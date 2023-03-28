import { loadPost } from '$lib/content';

export async function load({ params }) {
	return await loadPost('blog', params.slug);
}
