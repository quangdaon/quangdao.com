import type { BlogPost } from '$lib/content/types';
import type { PageLoadEvent } from './$types';
import { loadPost } from '$lib/content';
import { error } from '@sveltejs/kit';

export async function load({ params }:PageLoadEvent): Promise<BlogPost> {
	const post = await loadPost('blog', params.slug);
	if (!post) throw error(404);
	return post;
}
