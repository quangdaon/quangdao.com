import { definePostType } from './core/definition-helpers';
import type { BlogPost, ComicPost, ProjectPost } from './types';

export const definitions = {
	blog: definePostType<BlogPost>({
		date: (str) => new Date(str)
	}),
	comics: definePostType<ComicPost>({
		alt: (alt, obj) => alt || obj.title
	}),
	projects: definePostType<ProjectPost>({})
};
