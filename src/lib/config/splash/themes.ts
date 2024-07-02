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
		message: `🖌️ Check out my new webcomic at www.theqornies.com! 🤡`,
		link: 'https://www.theqornies.com/',
		criteria: () => true
	}
];

// export const getCurrentTheme = () => themeConfigs[1];
export const getCurrentTheme = () => themeConfigs.find((e) => e.criteria());
