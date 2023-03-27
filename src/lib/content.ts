export interface BlogPost {
	title: string;
	description: string;
	tags: string[];
	categories: string[];
	date: Date;
}

export async function loadContent() {
	const contentRoot = '/src/content';
	const postType = 'blog';
	const postsRoot = `${contentRoot}/${postType}`;
	const allPostFiles = import.meta.glob(`/src/content/**/*.md`);
  const iterablePostFiles = Object.entries(allPostFiles);
  const relevantPostFiles = iterablePostFiles.filter(([path]) => path.startsWith(postsRoot));

	const posts = await Promise.all(
		relevantPostFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as any;
			const postPath = path.replace(new RegExp(`^${postsRoot}/(.*?).md$`), '$1');

			return {
				meta: metadata as BlogPost,
				path: postPath
			};
		})
	);

	return posts;
}
