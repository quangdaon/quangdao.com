export const keyLength = 6;
export const keyMax = 5;

const seed = (d: Date) => d.getUTCDate() | (d.getUTCDay() ^ d.getUTCMonth());

export const getKey = (d: Date) =>
	((seed(d) * d.getUTCDate() * 365) % ((keyMax + 1) ** keyLength - 1))
		.toString(keyMax + 1)
		.padStart(keyLength, '0');
