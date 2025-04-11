import { getPost } from '$lib/content';
import { error } from '@sveltejs/kit';
import { generateThumbnail } from '$lib/utils/thumbnails';

export async function GET({ params }) {
	const { slug } = params;
	const post = await getPost('blog', slug);

	if (!post) throw error(404, 'Post not found');

	const canvas = await generateThumbnail(post.title);

	return new Response(canvas.toBuffer('image/png'), {
		headers: {
			'Content-Type': 'image/png'
		}
	});
}
