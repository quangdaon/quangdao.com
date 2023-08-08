import type {
	CurrentlyPlayingDetails,
	SpotifyAlbum,
	SpotifyArtist,
	SpotifyTrack
} from '$lib/integrations/spotify/models';

const MINIMUM_IMAGE_WIDTH = 128;

const getImage = (images: any[]): any => {
	const sortedImages = [...images].sort((a: any, b: any) => a.width - b.width);
	return sortedImages.find((e: any) => e.width >= MINIMUM_IMAGE_WIDTH);
};

const mapTrack = (details: any): SpotifyTrack => ({
	title: details.item.name,
	url: details.item.external_urls.spotify,
	progress: details.progress_ms,
	duration: details.item.duration_ms
});

const mapArtist = (src: any): SpotifyArtist => ({
	name: src.name,
	url: src.external_urls.spotify
});

const mapAlbum = (src: any): SpotifyAlbum => ({
	title: src.name,
	url: src.external_urls.spotify,
	imageUrl: getImage(src.images).url,
	artists: src.artists.map(mapArtist)
});

export const mapCurrentlyPlayingDetails = (details: any): CurrentlyPlayingDetails => ({
	track: mapTrack(details),
	album: mapAlbum(details.item.album),
	artists: details.item.artists.map(mapArtist)
});
