import { dev } from '$app/environment';
import { definePostType } from './core/definition-helpers';
import type { BlogPost, ComicPost, ProjectPost } from './types';

export const definitions = {
	blog: definePostType<BlogPost>({
		transformations: {
			slug: (str: string) => str.replace(/^\d{4}-\d{2}-\d{2}-/, ''), // Strips out date
			date: (str) => new Date(str)
		},
		filter({ date }) {
			return dev || date < new Date()
		} 
	}),
	comics: definePostType<ComicPost>({
		transformations: {
			alt: (alt, obj) => alt || obj.title
		}
	}),
	projects: definePostType<ProjectPost>({})
};
