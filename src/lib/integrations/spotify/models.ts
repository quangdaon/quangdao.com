export interface SpotifyArtist {
    name: string;
    url: string;
}

export interface SpotifyTrack {
    title: string;
    url: string;
    progress: number;
    duration: number;
}

export interface SpotifyAlbum {
    title: string;
    artists: SpotifyArtist[];
    url: string;
    imageUrl: string;
}

export interface CurrentlyPlayingDetails {
    track: SpotifyTrack;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
}