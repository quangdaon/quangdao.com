import type { PageData } from './$types';
import { apiGet } from '$lib/api';
import type { ActivitiesResponse, Activity } from '$lib/integrations/activities/models';

export const load = async ({ fetch }): PageData => {
	const response: ActivitiesResponse = (await apiGet(fetch, '/api/now'))!;

	return { ...response };
};
