export interface XpSet {
	new_xps: number;
	xps: number;
}

export interface CodeStats {
	dates: Record<string, number>;
	languages: Record<string, XpSet>;
	machines: Record<string, XpSet>;
	new_xps: number;
	total_xp: number;
	user: string;
}

export interface CalculatedStats {
	level: number;
	currentLevelXp: number;
	nextLevelXp: number;
	progress: number;
	progressPrevious: number;
	progressNew: number;
	remaining: number;
}

export async function getCodeStats(): Promise<CodeStats> {
	const res = await fetch('https://codestats.net/api/users/QuangdaoN');
	const stats = await res.json();
	return stats;
}

const LEVEL_FACTOR = 0.025;

export const calculateLevel = (xp: number) => Math.floor(LEVEL_FACTOR * Math.sqrt(xp));
const calculateLevelXp = (lvl: number) => Math.pow(Math.ceil(lvl / LEVEL_FACTOR), 2);

export const calculateStats = (data: XpSet): CalculatedStats => {
	const level = calculateLevel(data.xps);
	const currentLevelXp = calculateLevelXp(level);
	const nextLevelXp = calculateLevelXp(level + 1);

	const obtained = data.xps - currentLevelXp;
	const required = nextLevelXp - currentLevelXp;
	const progress = obtained / required;
	const progressPrevious = (obtained - data.new_xps) / required;
	const progressNew = data.new_xps / required;
	const remaining = required - obtained;

	return {
		level,
		currentLevelXp,
		nextLevelXp,
    progress,
    progressPrevious,
    progressNew,
		remaining
	};
};
