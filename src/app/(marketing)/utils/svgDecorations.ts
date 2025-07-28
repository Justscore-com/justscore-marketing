// utils/svgDecorations.ts

export interface SVGDecoration {
	id: number;
	gradient: string;
	scale: number;
	top: string;
	left?: string;
	right?: string;
}

/**
 * Fixed positions for SVG decorations
 */
const DECORATIONS: SVGDecoration[] = [
	{ id: 1, top: '8%', left: '15%', gradient: 'gradient1', scale: 1.6 },
	{ id: 2, top: '12%', right: '20%', gradient: 'gradient5', scale: 2.4 },
	{ id: 3, top: '25%', left: '10%', gradient: 'gradient3', scale: 3.2 },
	{ id: 4, top: '30%', right: '8%', gradient: 'gradient4', scale: 1.8 },
	{ id: 5, top: '34%', left: '32%', gradient: 'gradient2', scale: 2.6 },
];

/**
 * Returns fixed SVG decorations
 */
export const generateRandomDecorations = (
	count: number = 5
): SVGDecoration[] => {
	return DECORATIONS.slice(0, count);
};
