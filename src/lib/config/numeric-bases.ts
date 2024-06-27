export const baseNames: Record<number, string> = {
	2: 'Binary',
	3: 'Ternary',
	10: 'Decimal',
	16: 'Hexadecimal'
};

export const getBaseName = (base: number): string =>
	base in baseNames ? baseNames[base] : 'Base-' + base;

export const getAllowedDigits = (base: number) => {
	const digits = [];
	const baseDigits = 'abcdefghijklmnopqrstuvwxyz';

	for (let i = 0; i < Math.min(10, base); i++) {
		digits.push(i.toString());
	}

	for (let i = 0; i < Math.max(0, base - 10); i++) {
		digits.push(baseDigits[i]);
	}

	return digits;
};
