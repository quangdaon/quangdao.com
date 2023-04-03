import type { PageLoadEvent } from './$types';
import { getPost } from '$lib/content';
import { error } from '@sveltejs/kit';

export async function load({ params }: PageLoadEvent) {
	const post = await getPost('blog', params.slug);
	if (!post) throw error(404);
	return {
		post,
		pageTitle: `${post.title} | Quangdao's Blog`,
		pageDescription: post.description
	};
}
