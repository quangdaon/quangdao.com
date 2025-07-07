import type { ActivitiesResponse, Activity } from './models';
import { getNotionPassions, getNotionPassion, renderContent } from '../notion';
import type { PageObjectResponse } from '@notionhq/client';
import { NOTION_ACTIVE_HOBBIES_THRESHOLD_DAYS } from '$env/static/private';
import { cacheGet, cacheSet } from '../caching';
interface CachedNowContent {
	data: ActivitiesResponse | null;
	lastChecked: Date | null;
}

let cache: CachedNowContent | null = null;

const CACHE_KEY = 'NOW:CONTENT';

const processActivity = async (entry: PageObjectResponse): Promise<Activity | null> => {
	const name = entry.properties['Name'];

	if (name.type !== 'title') return null;

	const page = await getNotionPassion(entry.id);

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
	cache ??= await cacheGet<CachedNowContent>(CACHE_KEY);

	if (cache?.data && cache.lastChecked && !isCacheStale(cache.lastChecked)) {
		return cache.data;
	}

	const result = await refreshActivities();

	return result;
};

export const refreshActivities = async () => {
	console.log('Refreshing activities...');
	const passions = await getNotionPassions();
	const editTs = passions.results.map((h) => new Date((h as PageObjectResponse).last_edited_time));

	const promises: Promise<Activity | null>[] = passions.results.map((h) =>
		processActivity(h as PageObjectResponse)
	);

	const activities = (await Promise.all(promises)).filter((e) => e !== null);
	const lastUpdated = [...editTs].toSorted((a, b) => +b - +a)[0];

	const result = {
		lastUpdated,
		activities
	};

	const exp = +NOTION_ACTIVE_HOBBIES_THRESHOLD_DAYS * 24 * 60 * 60;

	cache = {
		data: result,
		lastChecked: new Date()
	};

	await cacheSet<CachedNowContent>(CACHE_KEY, cache, exp);

	console.log('Refreshing activities complete.');

	return result;
};
