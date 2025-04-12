import type { Plugin } from 'vite';
import path from 'node:path';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import type { Dirent } from 'fs';

import fm from 'front-matter';
import type { BlogPost } from '$lib/content/types';

import { CanvasRenderingContext2D, createCanvas, loadImage, registerFont } from 'canvas';

// Constants
const assetsBasePath = './assets';
const socialBaseImagePath = path.join(assetsBasePath, 'images/social-clean.png');
const ubuntuMonoFontPath = path.join(assetsBasePath, 'fonts/UbuntuMono-R.ttf');
const generatedImagesCachePath = 'static/images/thumbnails';
const blogPostsDir = path.resolve('src/posts/blog');

const canvasWidth = 1200;
const canvasHeight = 630;
const textBox = {
	x: 60 + 10,
	y: 310 + 10,
	width: 1080 - 20,
	height: 180 - 20
};

// Utility: Wrap text to fit inside a max width
function wrapText(
	ctx: CanvasRenderingContext2D,
	text: string,
	maxWidth: number,
	fontSize: number
): string[] {
	ctx.font = `normal ${fontSize}px UbuntuMono`;
	const words = text.split(' ');
	const lines: string[] = [];

	let line = '';

	for (const word of words) {
		const testLine = `${line}${word} `;
		if (ctx.measureText(testLine).width > maxWidth && line) {
			lines.push(line.trim());
			line = `${word} `;
		} else {
			line = testLine;
		}
	}

	lines.push(line.trim());
	return lines;
}

// Main: Generate a canvas with wrapped title text
async function generateThumbnail(text: string) {
	const image = await loadImage(path.resolve(socialBaseImagePath));
	registerFont(path.resolve(ubuntuMonoFontPath), { family: 'UbuntuMono' });

	const canvas = createCanvas(canvasWidth, canvasHeight);
	const ctx = canvas.getContext('2d');

	ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

	let fontSize = 100;
	let lines: string[] = [];

	while (fontSize > 10) {
		lines = wrapText(ctx, text, textBox.width, fontSize);
		const totalHeight = lines.length * fontSize * 1.2;
		if (totalHeight <= textBox.height) break;
		fontSize -= 2;
	}

	ctx.fillStyle = 'white';
	ctx.textBaseline = 'top';
	ctx.font = `normal ${fontSize}px UbuntuMono`;

	const lineHeight = fontSize * 1.2;
	const totalTextHeight = lines.length * lineHeight;
	const startY = textBox.y + (textBox.height - totalTextHeight) / 2;

	lines.forEach((line, i) => {
		const lineWidth = ctx.measureText(line).width;
		const x = textBox.x + (textBox.width - lineWidth) / 2;
		const y = startY + i * lineHeight;
		ctx.fillText(line, x, y);
	});

	return canvas;
}

// Helpers
function getSlug(fileName: string) {
	return fileName.replace(/^\d{4}-\d{2}-\d{2}-(.*?).md$/, '$1').replace(/\\/g, '/');
}

function getOutputPath(slug: string) {
	return path.join(generatedImagesCachePath, `${slug}.g.png`);
}

// Generate + save a thumbnail image if not already cached
async function saveThumbnail(file: Dirent) {
	const fullPath = path.join(blogPostsDir, file.name);
	const content = await fs.readFile(fullPath, 'utf-8');
	const data = fm<BlogPost>(content);

	if (data.attributes.socialImage) return;

	const slug = getSlug(file.name);
	const outputPath = getOutputPath(slug);

	if (existsSync(outputPath)) return;

	const canvas = await generateThumbnail(data.attributes.title);
	const buffer = canvas.toBuffer('image/png');

	await fs.mkdir(path.dirname(outputPath), { recursive: true });
	await fs.writeFile(outputPath, buffer);

	console.log(`Generated ${outputPath}`);
}

// Process all blog files
async function generateImages() {
	const files = await fs.readdir(blogPostsDir, { withFileTypes: true });
	const postFiles = files.filter(f => f.isFile() && f.name.endsWith('.md'));
	await Promise.all(postFiles.map(saveThumbnail));
}

// Vite plugin definition
export function generateSocialImages(): Plugin {
	return {
		name: 'generate-social-images',
		buildStart: generateImages,
		configureServer: generateImages
	};
}