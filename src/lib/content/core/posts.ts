import type { PostType, PostData } from './definition-types';
import { definitions } from '../definitions';

let postsCache: { [K in PostType]?: PostData<K>[] } = {};

export async function loadPosts<T extends PostType>(postType: T): Promise<PostData<T>[]> {
	const postsRoot = `/src/content/${postType}`;
	const allPostFiles = import.meta.glob(`/src/content/**/*.md`);
	const iterablePostFiles = Object.entries(allPostFiles);
	const relevantPostFiles = iterablePostFiles.filter(([path]) => path.startsWith(postsRoot));

	if (postType in postsCache) return postsCache[postType] as PostData<T>[];

	const posts = await Promise.all<PostData<T>>(
		relevantPostFiles.map(async ([path, resolver]) => {
			const result = (await resolver()) as any;
			const { metadata, default: component } = result;

			const data = {
				...metadata,
				slug: metadata.slug || path.replace(new RegExp(`^${postsRoot}/(.*?).md$`), '$1'),
				component
			};

			const transformed = definitions[postType].transform(data);
			return transformed;
		})
	);

	postsCache[postType] = posts as any;

	return posts;
}

export async function loadPost<T extends PostType>(
	postType: T,
	slug: string
): Promise<PostData<T> | undefined> {
	const posts = await loadPosts(postType);
	return posts.find((e) => e.slug === slug);
}
