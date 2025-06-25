import type { ActivitiesResponse, Activity } from './models';
import { getNotionHobbies, getNotionHobby, renderContent } from '../notion';
import type { PageObjectResponse } from '@notionhq/client';
import { NOTION_ACTIVE_HOBBIES_THRESHOLD_DAYS } from '$env/static/private';

let cache: {
	data: ActivitiesResponse | null;
	lastChecked: Date | null;
} = {
	data: null,
	lastChecked: null
};

const processHobby = async (entry: PageObjectResponse): Promise<Activity | null> => {
	const name = entry.properties['Name'];

	if (name.type !== 'title') return null;

	const page = await getNotionHobby(entry.id);

	return {
		notionId: entry.id,
		title: name.title[0].plain_text,
		content: renderContent(page)
	};
};

const isCacheStale = (date: Date) => {
	const threshold = new Date();
	threshold.setDate(threshold.getDate() - +NOTION_ACTIVE_HOBBIES_THRESHOLD_DAYS);
	
	return date < threshold;
};

export const getActivities = async (): Promise<ActivitiesResponse> => {
	if (cache.data && cache.lastChecked && !isCacheStale(cache.lastChecked)) {
		return cache.data;
	}

	const result = await refreshActivities();

	return result;
};

export const refreshActivities = async () => {
	const hobbies = await getNotionHobbies();
	const editTs = hobbies.results.map((h) => new Date((h as PageObjectResponse).last_edited_time));

	const promises: Promise<Activity | null>[] = hobbies.results.map((h) =>
		processHobby(h as PageObjectResponse)
	);

	const activities = (await Promise.all(promises)).filter((e) => e !== null);
	const lastUpdated = [...editTs].toSorted((a, b) => +b - +a)[0];

	const result = {
		lastUpdated,
		activities
	};

	cache.data = result;
	cache.lastChecked = new Date();
	return result;
};
