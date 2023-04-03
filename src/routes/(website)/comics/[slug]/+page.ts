import type { ComicPost } from '$lib/content/types';
import type { PageLoadEvent } from './$types';
import { getPost } from '$lib/content';
import { error } from '@sveltejs/kit';

export async function load({ params }: PageLoadEvent): Promise<ComicPost> {
	const post = await getPost('comics', params.slug);
	if (!post) throw error(404);
	return post;
}

export const prerender = false;
