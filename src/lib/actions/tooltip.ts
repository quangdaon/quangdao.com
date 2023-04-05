import { writable } from 'svelte/store';

interface TooltipParameters {
	message: string;
	x: number;
	y: number;
}

export const tooltipParams = writable<TooltipParameters | null>(null);

export const tooltip = (node: Element, message: string | null) => {
	node.addEventListener('mouseover', (e) => {
    if (!message) return;

		const bounds = node.getBoundingClientRect();

		console.log(e);

		const x = bounds.x + window.scrollX + bounds.width / 2;
		const y = bounds.y + window.scrollY;

		tooltipParams.set({
			message,
			x,
			y
		});
	});

	node.addEventListener('mouseout', () => {
		tooltipParams.set(null);
	});

	return {
		update(newMessage: string | null) {
			message = newMessage;
		}
	};
};
