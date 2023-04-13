import type { ContentPost } from './ContentPost';

export interface BlogPost extends ContentPost {
	description: string;
	tags: string[];
	categories: string[];
	date: Date;
	socialImage?: string;
}
