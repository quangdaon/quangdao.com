import type { PostType, PostData } from './definition-types';
import { definitions } from '../definitions';

type PostsCache = {
	[K in PostType]?: PostData<K>[];
};

let postsCache: PostsCache;

async function compilePosts() {
	const allPostFiles = import.meta.glob(`/src/content/**/*.md`);
	const iterablePostFiles = Object.entries(allPostFiles);

	postsCache = {};

	let postType: PostType;
	for (postType in definitions) {
		const postsRoot = `/src/content/${postType}`;
		const relevantPostFiles = iterablePostFiles.filter(([path]) => path.startsWith(postsRoot));
		const posts = await Promise.all<PostData<typeof postType>>(
			relevantPostFiles.map(async ([path, resolver]) => {
				const result = (await resolver()) as any;
				const { metadata, default: component } = result;

				const data = {
					...metadata,
					slug: metadata.slug || path.replace(new RegExp(`^${postsRoot}/(.*?).md$`), '$1'),
					component
				};

				return definitions[postType].transform(data);
			})
		);

		postsCache[postType] = posts as any;
	}
}

export async function loadPosts<T extends PostType>(postType: T): Promise<PostData<T>[]> {
	if (!postsCache) await compilePosts();
	return postsCache[postType] || [];
}

export async function loadPost<T extends PostType>(
	postType: T,
	slug: string
): Promise<PostData<T> | undefined> {
	const posts = await loadPosts(postType);
	return posts.find((e) => e.slug === slug);
}
