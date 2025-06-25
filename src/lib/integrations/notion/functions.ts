import {
	NOTION_ACTIVE_HOBBIES_THRESHOLD_DAYS,
	NOTION_ACTIVITIES_DATABASE_ID,
	NOTION_HOBBIES_DATABASE_ID,
	NOTION_TOKEN
} from '$env/static/private';
import { Client } from '@notionhq/client';

export const getNotionActivities = async () => {
	const client = new Client({ auth: NOTION_TOKEN });
	const today = new Date();
	const threshold = +NOTION_ACTIVE_HOBBIES_THRESHOLD_DAYS;
	const dateThreshold = new Date(today.setDate(today.getDate() - threshold));

	const results = await client.databases.query({
		database_id: NOTION_ACTIVITIES_DATABASE_ID,
		filter: {
			property: 'Date',
			date: {
				after: dateThreshold.toISOString()
			}
		}
	});

	return results;
};

export const getNotionHobbies = async () => {
	const client = new Client({ auth: NOTION_TOKEN });
	const today = new Date();
	const threshold = +NOTION_ACTIVE_HOBBIES_THRESHOLD_DAYS;
	const dateThreshold = new Date(today.setDate(today.getDate() - threshold));

	const results = await client.databases.query({
		database_id: NOTION_HOBBIES_DATABASE_ID,
		filter: {
			and: [
        {
          property: 'Display Mode',
          select: {
            does_not_equal: 'Always Hide'
          }
        },
				{
					or: [
						{
							property: 'Latest Activity',
							rollup: {
								date: {
									after: dateThreshold.toISOString()
								}
							}
						},
						{
							property: 'Display Mode',
							select: {
								equals: 'Always Show'
							}
						}
					]
				}
			]
		},
		sorts: [{ property: 'Sort Order', direction: 'ascending' }]
	});

	return results;
};

export const getNotionHobby = async (pageId: string) => {
	const client = new Client({ auth: NOTION_TOKEN });

	const results = await client.blocks.children.list({
		block_id: pageId
	});

	return results;
};
