import { type PostType, type PostData, definitions } from './definitions';

export async function loadPosts<T extends PostType>(postType: T): Promise<PostData<T>[]> {
	const postsRoot = `/src/content/${postType}`;
	const allPostFiles = import.meta.glob(`/src/content/**/*.md`);
	const iterablePostFiles = Object.entries(allPostFiles);
	const relevantPostFiles = iterablePostFiles.filter(([path]) => path.startsWith(postsRoot));

	const posts = await Promise.all<PostData<T>>(
		relevantPostFiles.map(async ([path, resolver]) => {
			const result = (await resolver()) as any;
			const { metadata } = result;
			const slug = path.replace(new RegExp(`^${postsRoot}/(.*?).md$`), '$1');

			const data = {
				...metadata,
				slug
			};

			return definitions[postType].transform(data);
		})
	);

	return posts;
}

export async function loadPost<T extends PostType>(
	postType: T,
	slug: string
): Promise<PostData<T>> {
	const post = await import(`../../content/${postType}/${slug}.md`);
	const { default: component, metadata: data } = post;

	const result = {
		...data,
		slug,
		component
	};

	return definitions[postType].transform(result);
}
