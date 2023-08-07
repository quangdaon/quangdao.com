// Ref: https://thomasmoran.dev/snippets/spotify-currently-playing/spotify-currently-playing/

import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN
} from '$env/static/private';

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const BASIC_AUTH_TOKEN = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

// Source: https://stackoverflow.com/a/37562814
const getFormEncodedBody = (details: Record<string, string>) => {
	const formBody = [];
	for (const property in details) {
		const encodedKey = encodeURIComponent(property);
		const encodedValue = encodeURIComponent(details[property]);
		formBody.push(encodedKey + '=' + encodedValue);
	}

	return formBody.join('&');
};

const getAccessToken = async () => {
	const response = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${BASIC_AUTH_TOKEN}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: getFormEncodedBody({
			grant_type: 'refresh_token',
			refresh_token: SPOTIFY_REFRESH_TOKEN
		})
	});

	return response.json();
};

export const getNowPlaying = async () => {
	const { access_token } = await getAccessToken();

	return fetch(NOW_PLAYING_URL, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});
};
