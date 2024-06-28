import type { JamWithMeDetails } from '../../models';

export const getNowPlaying = (): JamWithMeDetails => {
	return {
		source: {
			title: 'Sample',
			url: 'https://www.example.com/'
		},
		album: {
			title: 'Sample',
			artists: [{ name: 'Bogus', url: 'https://www.example.com/' }],
			url: 'https://www.example.com/',
			imageUrl: 'https://placekitten.com/128/128'
		},
		artists: [{ name: 'Bogus', url: 'https://www.example.com/' }],
		track: {
			title:
				'A Fake Song With an Abnormally Long Title Kinda Sorta Like Fall Out Boy\'s "My Songs Know What You Did in the Dark" But a Lot Longer',
			url: 'https://www.example.com/',
			duration: 1000,
			progress: 250
		}
	};
};
