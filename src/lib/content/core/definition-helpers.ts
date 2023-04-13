import type { ContentPost } from '../types';

type PostTypeTransformer<T extends ContentPost> = {
	[K in keyof T]?: (rawValue: any, rawObject: Record<keyof T, string>) => T[K];
};

interface PostTypeDefinition<T extends ContentPost> {
	transformations: PostTypeTransformer<T>;
	filter: (arg: T) => boolean;
}

interface PostTypeConfiguration<T extends ContentPost> {
	transform(raw: Record<keyof T, string>): T;
	filter(arg: T): boolean;
	type: T; // TODO: bit of a hack :/
}

export function definePostType<T extends ContentPost>({
	transformations,
	filter
}: Partial<PostTypeDefinition<T>>): PostTypeConfiguration<T> {
	return {
		transform(raw): T {
			const result = {} as T;

			if (!transformations) return raw as T;

			const allKeys = [
				...new Set(Object.keys(raw).concat(Object.keys(transformations)))
			] as (keyof T)[];

			for (const key of allKeys) {
				const transform = transformations[key];
				result[key] = transform ? transform(raw[key], raw) : (raw[key] as T[typeof key]);
			}

			return result;
		},
		filter: filter || (() => true),
		type: {} as T
	};
}
