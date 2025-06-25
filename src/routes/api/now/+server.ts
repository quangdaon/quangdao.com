import { json } from '@sveltejs/kit';
import { getActivities } from '$lib/integrations/activities';

export async function GET() {
  const result = await getActivities();

  return json(result);
}
