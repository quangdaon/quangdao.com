import { getCodeStats } from '$lib/integrations/codestats';

export async function load() {
	const stats = await getCodeStats();
	return {
		stats,
		pageTitle: 'Languages and Software that Quangdao Uses',
		pageDescription:
			'A compilation of tools, software, and programming environments that Quangdao uses on a regular basis.'
	};
}
