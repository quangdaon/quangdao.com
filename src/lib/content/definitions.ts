import type { BlogPost, ContentPost } from './types';

type PostTypeTransformer<T extends ContentPost> = { [K in keyof T]?: (raw: any) => T[K] };

interface PostTypeConfiguration<T extends ContentPost> {
	transform(raw: Record<keyof T, string>): T;
	type: T; // TODO: bit of a hack :/
}

function definePostType<T extends ContentPost>(
	transformations: PostTypeTransformer<T>
): PostTypeConfiguration<T> {
	return {
		transform(raw): T {
			const result = {} as T;
			for (const key of Object.keys(raw) as (keyof T)[]) {
				const transform = transformations[key];
				result[key] = transform ? transform(raw[key]) : (raw[key] as T[typeof key]);
			}

			return result;
		},
		type: {} as T
	};
}

export const definitions = {
	blog: definePostType<BlogPost>({
		date: (str) => new Date(str)
	})
};

type TypeDefinitions = typeof definitions;
export type PostType = keyof TypeDefinitions;
export type PostData<T extends PostType> = TypeDefinitions[T]['type'];
