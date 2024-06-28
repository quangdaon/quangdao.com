---
title: Jam With Me! SvelteKit x Spotify API
description: A tutorial on integrating with a third-party API using SvelteKit's server-side functionality.
tags: [ api, tutorial, sveltekit ]
categories: [ Technology ]
date: '2024-07-04'
---

<script lang="ts">
	import type { JamWithMeDetails } from '$lib/integrations/jam-with-me/models';
	import JamWithMeWidget from '$lib/components/splash/widgets/JamWithMeWidget.svelte';
	import ApiPreview from '$lib/components/blog/ApiPreview.svelte';
	import Quote from '$lib/components/shared/Quote.svelte';
	
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

To connect to the Spotify API, I heavily referenced [Thomas Moran's Tutorial](https://thomasmoran.dev/snippets/spotify-currently-playing/spotify-currently-playing/) on this topic. So rather than ripping off his content, I recommend giving it a read. His article covers authenticating to the Spotify API and fetching your currently playing status. Since we're in SvelteKit, rather than importing the environment variables from `process.env`, we will import them from `$env/static/private`.

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

You may notice in the `getNowPlaying` snippet above that I am calling a mapping function. The exact details of the `JamWithMeDetails` model and mapping is not crucial, since you can always adapt it to your own needs. Here are my response models.

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

## Creating the SvelteKit Endpoint

Now that we have the data we need, we need to expose it to our app. As is, we _could_ call our `getNowPlaying` function from the front-end. The only thing we would need to adjust is to make the environment variables public. But that is really _really_ bad advice, because we are handling sensitive authentication credentials, so let's not do that.

Instead, we can perform our API interactions on the server-side and expose the data to our front-end via an API of our own. Luckily, SvelteKit makes doing so very easy. Creating an API endpoint in SvelteKit is very similar to creating any old page. We first need to create a route to define our endpoint. I want my endpoint to be `/api/jam-with-me`, so in my `routes` folder, I created a new folder under `api/jam-with-me`, but yours can be called whatever you want.

Normally, when creating a page in SvelteKit, you would create a `+page.svelte` file to define your template. If you wanted to get fancy, you can also create a `+page.ts` to process some data before loading it into your template. To create an API endpoint, you'd basically do the same but skip the template part. Except rather than `+page.ts`, we are going to create a `+server.ts` file. Our server file will export a `GET` function, which is the handler for when a user makes a GET request to our endpoint. We already did the heavy lifting to connect with Spotify and map our response, which makes our handler very simple.

```ts
import { json } from '@sveltejs/kit';
import { getNowPlaying } from 'path/to/get-now-playing';

export async function GET() {
	const result = await getNowPlaying();

	if (!result) return new Response(null, { status: 204 });

	return json(result);
}
```

SvelteKit makes handling JSON responses pretty easy, since you just need to call a built-in function that creates the response object with all the necessary headers and whatnot. I am also mapping null responses from Spotify to a `204` status response here. Alternatively, you can follow Thomas Moran's approach of returning an `isPlaying` flag on the response object itself. That's all it takes to set up the endpoint. You can see it in action here:

<ApiPreview slug="jam-with-me" />

## Displaying the James

The final piece to this puzzle is to actually render the currently playing song to the visitor. This can, of course, be done in any number of ways especially visually. But every approach needs to load the data somehow. For my purposes, there are a couple of things I want to achieve. First, I want this to take the place of the waving hand I already have on my home screen. I also want this to be somewhat scalable, so that I can add further "widgets" in the future if I want to. To achieve both goals, I created a `SplashWidget` component:

```svelte
<script lang="ts">
	/* imports removed for brevity */

	type Widget = 'hand' | 'jam-with-me';

	let music: JamWithMeDetails | null;

	let widget: Widget | null = 'hand';

	const transitionDuration = 500;

	const setWidget = async (w: Widget) => {
		if (widget === w) return;

		 // This, in tandum with the `transition` attribute on the widget-container below, creates a nice fade out/in effect.
		widget = null;
		await delay(transitionDuration);
		widget = w;
	};
</script>

<div class="widget">
	{#key widget}
		<div class="widget-container" transition:fade={{ duration: transitionDuration }}>
			{#if widget === 'jam-with-me' && !!music}
				<JamWithMeWidget {music} />
			{:else if widget === 'hand'}
				<HandWidget />
			{/if}
		</div>
	{/key}
</div>
```

I will admit, this isn't the cleanest approach. As more widgets get added, this component will grow tremendously. But for now, it will work. At this point, we have the tools to switch between widgets, but we'll never see anything other than the hand. So let's actually load our jams by adding this to the script tag of the component:

```ts
const refreshJamWithMe = async () => {
	music = await apiGet('/api/jam-with-me');
	if (!music) {
		setWidget('hand');
		return;
	}

	const diff = music.track.duration - music.track.progress;

	setTimeout(refreshJamWithMe, diff);
};

onMount(async () => {
	await Promise.all([delay(3000), refreshJamWithMe()]);
	if (music) await setWidget('jam-with-me');
});
```

Of course, the first step in refreshing the jams is to load the data from the endpoint we created. The `apiGet` function is just a little wraper around `fetch` that handles 204s and returns the typed response.

```ts
export const apiGet = async <T>(url: string): Promise<T | null> => {
  const response = await fetch(url);

  if (response.status === 204) return null;

  return response.json();
}
```

 If no data is returned, we just stop here and stay on the hand indefinitely. There is no retry here - the chances of someone landing on the homepage while I'm not playing music on Spotify and sticking around long enough until I am is negligible. Similarly, I'm not concerned with someone sticking around until I stop playing music and then staying until the music starts back up. Well, I'd be concerned about their mental state, but either way, once the music stops, it stops for good (or until you revisit the homepage).

 In Svelte, the `music` variable is already bindable and we can use it in our view. So the only thing left to do is refresh the track when the last one ends. We do this by calculating the difference between the track's total duration and current progress and then set a time out to refresh it after that time. This will automatically change the song after the current one ends. Of course, this isn't truly realtime and does not reflect changes due to skips, but it's close enough for what we're trying to achieve.

 Finally, all there's left to do is kick this off. By passing a callback to Svelte's built-in `onMount` hook, we can start it after we can confirm that the component's been mounted. In my case, I added a slight 3 seconds delay before actually starting the Jam With Me widget. This is entirely a personal choice and I feel that it makes for a clean transition after the hand, especially when the user reopens the homepage splash screen while already on the site.

 Even with all of this set up, there is one glaring issue if you tried this out yourself as is. The actual `JamWithMeWidget` component doesn't exist! So let's fix that.

 ```svelte
 <script lang="ts">
	export let music: JamWithMeDetails;
</script>

<div class="wrapper">
	<div class="notes">
		{#each { length: 4 } as _}
			<div class="note-container">
				<div class="note">🎵</div>
			</div>
		{/each}
	</div>
	<div class="details-wrapper">
		<div class="details">
			<div class="details-thumb">
				<a href={music.album.url}>
					<img
						src={music.album.imageUrl}
						alt={`${music.album.title} by ${music.album.artists[0].name}`}
					/>
				</a>
			</div>
			<div class="details-message">
				<h3>Jam with me! I'm currently listening to:</h3>

				<p>
					<a href={music.track.url}>{music.track.title}</a>
				</p>
				<p>
					by {music.artists[0].name}
				</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper:hover {
		.details-wrapper {
			display: block;
		}
	}
	.details-wrapper {
		--buffer: 0.5em;
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		padding-top: 1em;
		font-family: var(--font-primary);
		font-size: 1rem;
		z-index: 100;
	}
	.details {
		padding: 0.5em;
		background: var(--color-black);
		display: inline-flex;
		width: max-content;
		text-align: left;
		min-width: 100%;
		&-thumb {
			width: 6vw;
			flex: auto 0 0;
			a,
			img {
				width: 100%;
				display: block;
			}
		}
		&-message {
			flex: auto 1 1;
			max-width: 40vw;
			padding-left: 0.5em;
			font-size: 0.875em;
			h3 {
				margin-bottom: 0.75em;
			}
			p {
				margin: 0;
				line-height: 1.5;
			}
		}
	}

	.notes {
		.note-container {
			transform-origin: 0 100%;

			@media (prefers-reduced-motion: no-preference) {
				animation: phase 8s linear infinite forwards;
			}
			&:not(:first-child) {
				display: none;
				position: absolute;
				top: 0;
				left: 0;

				@media (prefers-reduced-motion: no-preference) {
					display: block;
				}
			}
			&:nth-child(2) {
				animation-delay: -2s;
			}
			&:nth-child(3) {
				animation-delay: -4s;
			}
			&:nth-child(4) {
				animation-delay: -6s;
			}
			&:nth-child(even) {
				.note {
					animation-delay: -250ms;
				}
			}
		}
		.note {
			@media (prefers-reduced-motion: no-preference) {
				animation: wiggle 500ms linear infinite alternate;
			}
		}
	}

	@keyframes wiggle {
		from {
			transform: rotate(-10deg);
		}
		to {
			transform: rotate(10deg);
		}
	}

	@keyframes phase {
		0% {
			opacity: 1;
			transform: scale(0) translate(0, 100%);
		}
		75% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: scale(1) translate(100%, -100%);
		}
	}
</style>
```

This component is _huuuuge_. However, a lot of it comes from the CSS, and particularly, the styles for the animation. As I mentioned before, the actual visuals are entirely subjective and this happens to be how I had designed it.

## Conclusion

If you read my [redesign article](/blog/2023-redesign) from last year, you may remember that my goal for this website is to be a sandbox for expressing my creativity. Little projects like this are the epitome of what I am trying to accomplish. Does it add any functionality to the website? Not really. What about value? Well, that depends on who you ask. I think there is value in adding a touch of personality to your portfolio. But is it going to be seen by a lot of people? Probably not. If you've read about [my recent April Fools' escapades](/blog/april-fools-hires), you'd know that's far from the top of my priorities. What matters is having fun and taking advantage of the freedom I have to build something for no other reason than simply because I can. To me, that is what art and programming is about.

<Quote by="Barbie Girl by Aqua">Imagination, life is your creation.</Quote>

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