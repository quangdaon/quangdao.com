import { definePostType } from './core/definition-helpers';
import type { BlogPost, ComicPost, ProjectPost } from './types';

export const definitions = {
	blog: definePostType<BlogPost>({
		slug: (str: string) => str.replace(/^\d{4}-\d{2}-\d{2}-/, ''), // Strips out date
		date: (str) => new Date(str)
	}),
	comics: definePostType<ComicPost>({
		alt: (alt, obj) => alt || obj.title
	}),
	projects: definePostType<ProjectPost>({})
};
