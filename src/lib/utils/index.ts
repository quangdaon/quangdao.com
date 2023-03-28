export const toFormattedDate = (date: Date | string): string =>
	new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC' });
