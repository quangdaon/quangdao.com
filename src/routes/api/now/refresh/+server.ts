import { refreshActivities } from '$lib/integrations/activities';

export async function POST() {
	refreshActivities();
	return new Response(null, { status: 204 });
}
