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