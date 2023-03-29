import { loadPost } from '$lib/content';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const post = await loadPost('comics', params.slug);
	if (!post) throw error(404);
	return post;
}
