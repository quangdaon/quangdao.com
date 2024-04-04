---
title: Jam With Me! Sveltekit x Spotify API
description: A tutorial on integrating with a third party API using Sveltekit's server side functionality.
tags: [ api, tutorial, sveltekit ]
categories: [ Technology ]
date: '2023-08-14'
---

<script lang="ts">
	import type { JamWithMeDetails } from '$lib/integrations/jam-with-me/models';
	import JamWithMeWidget from '$lib/components/splash/widgets/JamWithMeWidget.svelte';
	import ApiPreview from '$lib/components/blog/ApiPreview.svelte';
	
	const sampleMusic: JamWithMeDetails = {
		source: {
			title: 'Sample',
			url: 'https://www.example.com/'
		},
		album: {
			title: 'Never Gonna Give You Up',
			artists: [{ name: 'Rick Astley', url: 'https://youtu.be/dQw4w9WgXcQ' }],
			url: 'https://youtu.be/dQw4w9WgXcQ',
			imageUrl: '/images/blog/rickroll-roll.gif'
		},
		artists: [{ name: 'Rick Astley', url: 'https://youtu.be/dQw4w9WgXcQ' }],
		track: {
			title: 'Never Gonna Give You Up',
			url: 'https://youtu.be/dQw4w9WgXcQ',
			duration: 1000,
			progress: 250
		}
	};
</script>

I am going to let you in on a secret. If you happen to visit my homepage while I'm playing music on Spotify, something magical happens. After a few seconds, the waving hand in my intro transforms into a dancing set of music notes. Here's an example of what it would look like:

<div class="widget-demo">
	<div class="widget-demo-preview">
		<JamWithMeWidget music={sampleMusic} />
	</div>
</div>

Hovering over the notes will reveal the song I currently have playing. Well, on the actual homepage version anyway. The one you see above is a static demo to showcase the widget. After all, I do not have Spotify playing 24/7 and have no intention to start just to make a blog post work.

## Connecting to Spotify

When it comes to actually connecting to the Spotify API, I heavily referenced [Thomas Moran's Tutorial](https://thomasmoran.dev/snippets/spotify-currently-playing/spotify-currently-playing/) on this topic. So rather than ripping off his content, I recommend giving it a read. His article covers the basics of authenticating to the Spotify API and using it to fetch your currently playing status. Since we're in Sveltekit, rather than importing the environment variables from `process.env`, we will import them from `$env/static/private`.

```ts
import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN
} from '$env/static/private';
```

The other adjustment I made is having my `getNowPlaying` method return the mapped response model instead of the fetch response object. I want to genericize my widget in case I want to add another ~~method of spying on myself~~ integration source in the future.

```ts
export const getNowPlaying = async (): Promise<JamWithMeDetails | null> => {
	const { access_token } = await getAccessToken();

	const response = await fetch(NOW_PLAYING_URL, {
		headers: { Authorization: `Bearer ${access_token}` }
	});

	if (response.status === 204) return null;

	const details = await response.json();

	if (!details?.is_playing || !details?.item) return null;

	return mapCurrentlyPlayingDetails(details);
};
```

## Mapping the Response Model

You may notice in the `getNowPlaying` snippet above that I am calling a mapping function. The exact details of the `JamWithMeDetails` model and mapping is not crucial, since you can always adapt it to your own needs, but here are my response models.

```ts
export interface JamWithMeArtist {
	name: string;
	url: string;
}

export interface JamWithMeTrack {
	title: string;
	url: string;
	progress: number;
	duration: number;
}

export interface JamWithMeAlbum {
	title: string;
	artists: JamWithMeArtist[];
	url: string;
	imageUrl: string;
}

export interface JamWithMeSource {
	title: string;
	url: string;
}

export interface JamWithMeDetails {
	track: JamWithMeTrack;
	artists: JamWithMeArtist[];
	album: JamWithMeAlbum;
	source: JamWithMeSource;
}
```

The mapping itself is pretty straightforward.

```ts
const MINIMUM_IMAGE_WIDTH = 128;

const getImage = (images: any[]): any => {
	const sortedImages = [...images].sort((a: any, b: any) => a.width - b.width);
	return sortedImages.find((e: any) => e.width >= MINIMUM_IMAGE_WIDTH);
};

const mapTrack = (details: any): JamWithMeTrack => ({
	title: details.item.name,
	url: details.item.external_urls.spotify,
	progress: details.progress_ms,
	duration: details.item.duration_ms
});

const mapArtist = (src: any): JamWithMeArtist => ({
	name: src.name,
	url: src.external_urls.spotify
});

const mapAlbum = (src: any): JamWithMeAlbum => ({
	title: src.name,
	url: src.external_urls.spotify,
	imageUrl: getImage(src.images).url,
	artists: src.artists.map(mapArtist)
});

export const mapCurrentlyPlayingDetails = (details: any): JamWithMeDetails => ({
	source: {
		title: 'Spotify',
		url: 'https://open.spotify.com/'
	},
	track: mapTrack(details),
	album: mapAlbum(details.item.album),
	artists: details.item.artists.map(mapArtist)
});
```

Most of the fields are direct mappings, and we just need to identify the corresponding fields. But I am doing a couple fancy things. The first is the way I'm retrieving the album image. Spotify returns the images ordered by the widest first, so you can simply take the first one, but the thumbnail I will be using does not need to be that large. The other thing I am doing here is added a source identifier. As I mentioned, I want this to be generic, so adding the source here will help with future-proofing if I do want to integrate with something else.

## Creating the Sveltekit Endpoint

Now that we have the data we need, we need to expose it to our app. As is, we _could_ call our `getNowPlaying` function from the front-end. The only thing we would need to adjust is to make the environment variables public. But that is really _really_ bad advice, because we are handling sensitive authentication credentials, so let's not do that.

Instead, we can perform our API interactions on the server-side and expose the data to our front-end via an API of our own. Luckily, Sveltekit makes doing so very easy. Creating an API endpoint in Sveltekit is very similar to creating any old page. We first need to create a route to define our endpoint. I want my endpoint to be `/api/jam-with-me`, so in my `routes` folder, I created a new folder under `api/jam-with-me`. But yours can be called whatever you want it to.

Normally, when creating a page in Sveltekit, you would create a `+page.svelte` file to define your template. If you wanted to get fancy, you can also create a `+page.ts` to process some data before loading it into your template. To create an API endpoint, you'd basically do the same but skip the template part. Except rather than `+page.ts`, we are going to create a `+server.ts` file. Our server file will export a `GET` function, which is the handler for when a user makes a GET request to our endpoint. We already did the heavy lifting to connect with Spotify and map our response, which makes our handler very simple.

```ts
import { json } from '@sveltejs/kit';
import { getNowPlaying } from 'path/to/get-now-playing';

export async function GET() {
	const result = await getNowPlaying();

	if (!result) return new Response(null, { status: 204 });

	return json(result);
}
```

Sveltekit makes handling JSON responses pretty easy, since you just need to call a built-in function that creates the response object with all the necessary headers and whatnot. I am also mapping null responses from Spotify to a `204` status response here. Alternatively, you can follow Thomas Moran's approach of returning an `isPlaying` flag on the response object itself. That's all it takes to set up the endpoint. You can see it in action here:

<ApiPreview slug="jam-with-me" />

<style lang="scss">
	@use '~/settings';

	.widget-demo {
		text-align: center;
		margin: 2em auto;
		&-preview {
			position: relative;
			font-size: 3rem;
			display:inline-block;
			@include settings.dark-theme {
				--color-black: #000;
			}
		}
	}
</style>