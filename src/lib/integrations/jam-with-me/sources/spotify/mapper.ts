import type {
	JamWithMeDetails,
	JamWithMeAlbum,
	JamWithMeArtist,
	JamWithMeTrack
} from '$lib/integrations/jam-with-me/models';

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
