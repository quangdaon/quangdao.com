import type { SvelteComponent } from 'svelte';

export interface ContentPost {
	title: string;
	slug: string;
	component?: typeof SvelteComponent;
}

export interface BlogPost extends ContentPost {
	description: string;
	tags: string[];
	categories: string[];
	date: Date;
}

interface PostTypes extends Record<string, ContentPost> {
	blog: BlogPost;
}

export async function loadContent<T extends keyof PostTypes>(postType: T): Promise<PostTypes[T][]> {
	const contentRoot = '/src/content';
	const postsRoot = `${contentRoot}/${postType}`;
	const allPostFiles = import.meta.glob(`/src/content/**/*.md`);
	const iterablePostFiles = Object.entries(allPostFiles);
	const relevantPostFiles = iterablePostFiles.filter(([path]) => path.startsWith(postsRoot));

	const posts = await Promise.all<PostTypes[T]>(
		relevantPostFiles.map(async ([path, resolver]) => {
			const result = (await resolver()) as any;
			const { metadata } = result;
			const slug = path.replace(new RegExp(`^${postsRoot}/(.*?).md$`), '$1');

			return {
				...(metadata as PostTypes[T]),
				slug
			};
		})
	);

	return posts;
}

export async function loadPost<T extends keyof PostTypes>(
	postType: T,
	slug: string
): Promise<PostTypes[T]> {
	const post = await import(`../content/${postType}/${slug}.md`);
	const { default: component, metadata: data } = post;

	return {
		...data,
		slug,
		component
	};
}
