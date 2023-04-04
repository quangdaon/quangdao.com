const keyLength = 6;
const keyMax = 5;

const seed = (d: Date) => d.getUTCDate() | (d.getUTCDay() ^ d.getUTCMonth());

export const getKey = (d: Date) =>
	((seed(d) * d.getUTCDate() * 365) % (keyMax ** keyLength - 1))
		.toString(keyMax)
		.padStart(keyLength, '0');
