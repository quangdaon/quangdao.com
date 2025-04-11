import type { PageLoadEvent } from './$types';
import { getPost } from '$lib/content';
import { error } from '@sveltejs/kit';

export async function load({ params }: PageLoadEvent) {
	const post = await getPost('blog', params.slug);
	if (!post) return error(404);
	const data: Record<string, any> = {
		post,
		pageTitle: `${post.title} | Quangdao's Blog`,
		pageDescription: post.description
	};

	data.pageSocialImage = post.socialImage ?? `/api/thumbnails/${post.slug}.png`;
	
	return data;
}
