const keyLength = 6;
const keyMax = 5;

const seed = (d: Date) => d.getDate() | (d.getDay() ^ d.getMonth());

export const getKey = (d: Date) =>
	((seed(d) * d.getDate() * 365) % (keyMax ** keyLength - 1))
		.toString(keyMax)
		.padStart(keyLength, '0');
