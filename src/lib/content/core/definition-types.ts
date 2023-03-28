import type { definitions } from '../definitions';

type TypeDefinitions = typeof definitions;
export type PostType = keyof TypeDefinitions;
export type PostData<T extends PostType> = TypeDefinitions[T]['type'];