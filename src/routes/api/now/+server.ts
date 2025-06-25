import { json, error } from '@sveltejs/kit';
import { verifyNotionWebhook } from '$lib/integrations/notion';
import { getActivities, refreshActivities } from '$lib/integrations/activities';

export async function GET() {
	const result = await getActivities();

	return json(result);
}

export async function POST({ request }) {
	const rawBody = await request.text();
  const { verification_token: token, attempt_number } = JSON.parse(rawBody);
  
  console.log(`Attempt Number: ${attempt_number}`)

	const signature = request.headers.get('X-Notion-Signature') ?? '';

	const isValid = verifyNotionWebhook(token, rawBody, signature);

	if (!isValid) {
		return error(403, { message: 'Forbidden' });
	}

	await refreshActivities();
	return new Response(null, { status: 200 });
}

export const prerender = false;
