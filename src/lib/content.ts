export interface BlogPost {
	title: string;
	description: string;
	tags: string[];
	categories: string[];
	date: Date;
}

interface PostTypes {
	blog: BlogPost;
}

interface PostData<T> {
	data: T;
	slug: string;
}

export async function loadContent<T extends keyof PostTypes>(
	postType: T
): Promise<PostData<PostTypes[T]>[]> {
	const contentRoot = '/src/content';
	const postsRoot = `${contentRoot}/${postType}`;
	const allPostFiles = import.meta.glob(`/src/content/**/*.md`);
	const iterablePostFiles = Object.entries(allPostFiles);
	const relevantPostFiles = iterablePostFiles.filter(([path]) => path.startsWith(postsRoot));

	const posts = await Promise.all<PostData<PostTypes[T]>>(
		relevantPostFiles.map(async ([path, resolver]) => {
			const result = (await resolver()) as any;
			const { metadata, default : def } = result;
			const slug = path.replace(new RegExp(`^${postsRoot}/(.*?).md$`), '$1');

			return {
				data: metadata as PostTypes[T],
				slug
			};
		})
	);

	return posts;
}
