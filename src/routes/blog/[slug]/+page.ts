import { loadPost } from '$lib/content';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	return (await loadPost('blog', params.slug)) || error(404);
}