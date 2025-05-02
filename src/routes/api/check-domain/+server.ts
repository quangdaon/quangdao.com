import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, request }) => {
	const origin = request.headers.get('origin') ?? '';

	if (!origin) {
		return new Response(JSON.stringify({ error: 'Bad request' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});		
	}

	const domain = url.searchParams.get('domain');
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': origin.includes('quangdao.com') ? origin : 'not_allowed'
	};

	console.log(origin);

	if (!domain) {
		return new Response(JSON.stringify({ error: 'Missing domain parameter' }), {
			status: 400,
			headers
		});
	}

	const requestUrl = `http://${domain}`;

	try {
		const res = await fetch(requestUrl);

		return new Response(
			JSON.stringify({
				statusCode: res.status,
				state: !res.ok ? 'error' : 'active'
			}),
			{
				status: 200,
				headers
			}
		);
	} catch {
		return new Response(
			JSON.stringify({
				statusCode: null,
				state: 'inactive'
			}),
			{
				status: 200,
				headers
			}
		);
	}
};
