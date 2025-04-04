import { PUBLIC_SPLASH_MESSAGE_CONTENT, PUBLIC_SPLASH_MESSAGE_LINK } from '$env/static/public';

export interface ThemeConfig {
	name: string;
	message?: string;
	link?: string;
	criteria: () => boolean;
}

const themeConfigs: ThemeConfig[] = [
	{
		name: 'pride',
		message: '🏳️‍🌈 Happy Pride Month! 🏳️‍⚧️',
		link: 'https://en.wikipedia.org/wiki/Pride_Month',
		criteria() {
			return new Date().getMonth() === 5;
		}
	},
	{
		name: 'american-independence',
		message: '🇺🇸 Happy USA Independence Day! 🎆',
		link: 'https://en.wikipedia.org/wiki/Independence_Day_(United_States)',
		criteria() {
			const date = new Date();
			const month = date.getMonth();
			const day = date.getDate();

			return month === 6 && day === 4;
		}
	},
	{
		name: 'halloween',
		message: '🎃 Happy Halloween! 🦇',
		link: 'https://en.wikipedia.org/wiki/Halloween',
		criteria() {
			const date = new Date();
			const month = date.getMonth();
      const day = date.getDate();
      
			return month === 9 && day >= 30;
		}
	},
	{
		name: 'default',
		message: PUBLIC_SPLASH_MESSAGE_CONTENT,
		link: PUBLIC_SPLASH_MESSAGE_LINK,
		criteria: () => true
	}
];

export const getCurrentTheme = () => themeConfigs.find((e) => e.criteria());
