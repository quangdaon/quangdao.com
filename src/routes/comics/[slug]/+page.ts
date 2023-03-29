import type { ComicPost } from '$lib/content/types';
import type { PageLoadEvent } from './$types';
import { loadPost } from '$lib/content';
import { error } from '@sveltejs/kit';

export async function load({ params }: PageLoadEvent): Promise<ComicPost> {
	const post = await loadPost('comics', params.slug);
	if (!post) throw error(404);
	return post;
}
