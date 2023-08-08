import { json } from '@sveltejs/kit';
import { getNowPlaying } from '$lib/integrations/spotify/api';

export async function GET() {
	const result = await getNowPlaying();

	return json(result);
}
