import { loadContent } from '$lib/content';

export async function load() {
  const posts = await loadContent();
  
  console.log(posts);

	return { posts };
}
