import type { Plugin } from 'vite';
import path from 'node:path';
import fs from 'node:fs/promises';
import fm from 'front-matter';
import type { Dirent } from 'fs';
import type { BlogPost } from '$lib/content/types';
import { existsSync } from 'node:fs';
import { CanvasRenderingContext2D, createCanvas, loadImage, registerFont } from 'canvas';

const assetsBasePath = './assets';
const socialBaseImagePath = `${assetsBasePath}/images/social-clean.png`;
const ubuntuMonoFontPath = `${assetsBasePath}/fonts/UbuntuMono-R.ttf`;
const generatedImagesCachePath = `static/images/thumbnails`;

function wrapText(
	ctx: CanvasRenderingContext2D,
	text: string,
	maxWidth: number,
	fontSize: number
): string[] {
	ctx.font = `normal ${fontSize}px UbuntuMono`;
	const words = text.split(' ');
	const lines = [];
	let line = '';

	for (let i = 0; i < words.length; i++) {
		const testLine = line + words[i] + ' ';
		const metrics = ctx.measureText(testLine);
		if (metrics.width > maxWidth && i > 0) {
			lines.push(line.trim());
			line = words[i] + ' ';
		} else {
			line = testLine;
		}
	}
	lines.push(line.trim());
	return lines;
}

export async function generateThumbnail(text: string) {
	const image = await loadImage(path.resolve(socialBaseImagePath));
	registerFont(path.resolve(ubuntuMonoFontPath), { family: 'UbuntuMono' });

	const width = 1200;
	const height = 630;
	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext('2d');

	ctx.drawImage(image, 0, 0, width, height);

	const boxPadding = 10;
	const boxX = 60 + boxPadding;
	const boxY = 310 + boxPadding;
	const boxWidth = 1080 - boxPadding * 2;
	const boxHeight = 180 - boxPadding * 2;

	let fontSize = 100;
	let lines: string[] = [];
	while (fontSize > 10) {
		lines = wrapText(ctx, text, boxWidth, fontSize);
		const lineHeight = fontSize * 1.2;
		const totalHeight = lines.length * lineHeight;
		if (totalHeight <= boxHeight) break;
		fontSize -= 2;
	}

	ctx.fillStyle = 'white';
	ctx.textBaseline = 'top';
	ctx.font = `normal ${fontSize}px UbuntuMono`;

	const lineHeight = fontSize * 1.2;
	const totalTextHeight = lines.length * lineHeight;
	const startY = boxY + (boxHeight - totalTextHeight) / 2;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const lineWidth = ctx.measureText(line).width;
		const x = boxX + (boxWidth - lineWidth) / 2;
		const y = startY + i * lineHeight;
		ctx.fillText(line, x, y);
	}

	return canvas;
}

async function saveThumbnail(file: Dirent) {
	const content = await fs.readFile(path.join(file.parentPath, file.name), 'utf-8');
	const data = fm<BlogPost>(content); // expects frontmatter with title

	if (data.attributes.socialImage) return;

	const slug = file.name.replace(/^\d{4}-\d{2}-\d{2}-(.*?).md/, '$1').replace(/\\/g, '/');
	const outputPath = `${generatedImagesCachePath}/${slug}.g.png`;

	if (existsSync(outputPath)) {
		return;
	}

	const canvas = await generateThumbnail(data.attributes.title);
	const buffer = canvas.toBuffer('image/png');

	await fs.mkdir(path.dirname(outputPath), { recursive: true });
	await fs.writeFile(outputPath, buffer);

	console.log(`Generated ${outputPath}`);
}

async function generateImages() {
	const baseDir = path.resolve('src/posts/blog');
	const files = await fs.readdir(baseDir, { withFileTypes: true });

	const promises = files.map(saveThumbnail);

	await Promise.all(promises);
}

export function generateSocialImages(): Plugin {
	return {
		name: 'generate-social-images',
		buildStart: generateImages,
		configureServer: generateImages
	};
}
