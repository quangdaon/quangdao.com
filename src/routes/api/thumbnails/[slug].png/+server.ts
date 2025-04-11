import { getPost } from '$lib/content';
import { error } from '@sveltejs/kit';
import { loadThumbnail } from '$lib/utils/thumbnails';

export async function GET({ params }) {
	const { slug } = params;
	const post = await getPost('blog', slug);

	if (!post) throw error(404, 'Post not found');

	const [cached, buffer] = await loadThumbnail(slug, post.title);

	return new Response(buffer, {
		headers: {
			'Content-Type': 'image/png',
			'X-Cache': cached ? 'HIT' : 'MISS'
		}
	});
}
