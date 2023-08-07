import { json } from '@sveltejs/kit';
import { getNowPlaying } from '$lib/integrations/spotify/api';

export async function GET() {
	const data = await getNowPlaying();
	const result = await data.json();

	return json(result);
}
