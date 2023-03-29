import { loadPost } from '$lib/content';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	return (await loadPost('comics', params.slug)) || error(404);
}
