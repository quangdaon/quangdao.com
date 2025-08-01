import type {
	BlockObjectResponse,
	ListBlockChildrenResponse,
	RichTextItemResponse
} from '@notionhq/client';
import type {
	BulletedListItemBlockObjectResponse,
	NumberedListItemBlockObjectResponse,
	TextRichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';

type BlockGroup =
	| {
			type: 'numbered_list_item';
			blocks: NumberedListItemBlockObjectResponse[];
	  }
	| {
			type: 'bulleted_list_item';
			blocks: BulletedListItemBlockObjectResponse[];
	  };

type Annotation = keyof TextRichTextItemResponse['annotations'];
const annotationsMapping: Partial<Record<Annotation, string>> = {
	italic: 'i',
	bold: 'b',
	strikethrough: 's',
	code: 'code',
	underline: 'u'
};

const wrap = (content: string, tag: string, attrs?: Record<string, string>) => {
	let openingTag = tag;

	if (attrs) {
		openingTag +=
			' ' +
			Object.entries(attrs)
				.map(([key, val]) => `${key}="${val}"`)
				.join(' ');
	}
	return `<${openingTag}>${content}</${tag}>`;
};

const renderComponents = (components: RichTextItemResponse[], tag: string) => {
	let innerContent = '';

	for (const comp of components) {
		let node = comp.plain_text;

		for (const a in comp.annotations) {
			const annotation = a as keyof typeof comp.annotations;

			if (comp.annotations[annotation] && annotation in annotationsMapping) {
				const tag = annotationsMapping[annotation];
				node = wrap(node, tag ?? 'span');
			}
		}

		if (comp.type === 'text' && comp.href) {
			node = wrap(node, 'a', { href: comp.href });
		}

		innerContent += node;
	}
	return wrap(innerContent, tag);
};

const renderGroup = (group: BlockGroup) => {
	const tag = group.type === 'bulleted_list_item' ? 'ul' : 'ol';
	const items: string[] = [];

	for (const child of group.blocks) {
		const { rich_text: text } =
			child.type === 'bulleted_list_item' ? child.bulleted_list_item : child.numbered_list_item;

		items.push(renderComponents(text, 'li'));
	}

	return wrap(items.join(''), tag);
};

export const renderContent = (page: ListBlockChildrenResponse): string => {
	let result = '';
	const blocks = [...page.results];
	let currentGroup: BlockGroup | null = null;

	for (const block of blocks) {
		if (!('type' in block)) continue;

		if (currentGroup && addToGroupIfSameType(currentGroup, block)) {
			continue;
		}

		if (currentGroup) {
			result += renderGroup(currentGroup);
			currentGroup = null;
		}

		result += handleBlock(block, (newGroup) => (currentGroup = newGroup));
	}

	if (currentGroup) {
		result += renderGroup(currentGroup);
	}

	return result;
};

const handleBlock = (
	block: BlockObjectResponse,
	startGroup: (group: BlockGroup) => void
): string => {
	switch (block.type) {
		case 'paragraph':
			return renderComponents(block.paragraph.rich_text, 'p');
		case 'heading_1':
			return renderComponents(block.heading_1.rich_text, 'h1');
		case 'heading_2':
			return renderComponents(block.heading_2.rich_text, 'h2');
		case 'heading_3':
			return renderComponents(block.heading_3.rich_text, 'h3');
		case 'numbered_list_item':
			startGroup({
				type: 'numbered_list_item',
				blocks: [block]
			});
			return '';
		case 'bulleted_list_item':
			startGroup({
				type: 'bulleted_list_item',
				blocks: [block]
			});
			return '';
		default:
			return ''; // Ignore other block types
	}
};

function addToGroupIfSameType(group: BlockGroup, block: BlockObjectResponse): boolean {
	if (group.type === 'numbered_list_item' && block.type === 'numbered_list_item') {
		group.blocks.push(block);
		return true;
	}
	if (group.type === 'bulleted_list_item' && block.type === 'bulleted_list_item') {
		group.blocks.push(block);
		return true;
	}
	return false;
}
