import { definePostType } from './core/definition-helpers';
import type { BlogPost } from './types';

export const definitions = {
	blog: definePostType<BlogPost>({
		date: (str) => new Date(str)
	})
};
