import { getCodeStats } from '$lib/integrations/codestats';

export async function load() {
	const stats = await getCodeStats();
	return { stats };
}
