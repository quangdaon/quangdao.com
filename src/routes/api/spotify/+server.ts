import { json } from '@sveltejs/kit';
import { getNowPlaying } from '$lib/integrations/spotify/api';

export async function GET() {
	const result = await getNowPlaying();

	if (!result) return new Response(null, { status: 204 });

	return json(result);
}
