import type { PostType, PostData } from './definition-types';
import { definitions } from '../definitions';

type PostsCache = {
	[K in PostType]?: PostData<K>[];
};

let postsCache: PostsCache;

async function compilePosts() {
	const allPostFiles = import.meta.glob(`/src/posts/**/*.md`);
	const iterablePostFiles = Object.entries(allPostFiles);

	postsCache = {};

	let postType: PostType;
	for (postType in definitions) {
		const postsRoot = `/src/posts/${postType}`;
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

		postsCache[postType] = posts.filter(definitions[postType].filter as any) as any;
	}
}

export async function getPosts<T extends PostType>(postType: T): Promise<PostData<T>[]> {
	if (!postsCache) await compilePosts();
	return postsCache[postType] || [];
}

export async function getPost<T extends PostType>(
	postType: T,
	slug: string
): Promise<PostData<T> | undefined> {
	const posts = await getPosts(postType);
	return posts.find((e) => e.slug === slug);
}
