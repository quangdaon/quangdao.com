import type { ContentPost } from './ContentPost';

export interface ProjectPost extends ContentPost {
	title: string;
	description: string;
	priority: number;
	links: {
		label: string;
		url: string;
		icon?: string;
	}[];
}
