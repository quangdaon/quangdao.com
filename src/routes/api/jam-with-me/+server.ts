import { json } from '@sveltejs/kit';
import { getJamDetails } from '$lib/integrations/jam-with-me';

export async function GET() {
	const result = await getJamDetails();

	if (!result) return new Response(null, { status: 204 });

	return json(result);
}
