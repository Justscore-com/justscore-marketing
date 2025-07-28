// src/app/(marketing)/components/sections/DemoIllustration.tsx

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { DemoMenuItem } from './DemoMenu';

// Position configuration for different breakpoints
interface ResponsivePosition {
	top?: string;
	bottom?: string;
	left?: string;
	right?: string;
	x?: string; // transform translateX
	y?: string; // transform translateY
}

// Individual illustration configuration with responsive positioning
interface IllustrationConfig {
	id: string;
	// Size control (responsive)
	size: {
		width: string;
		height: string;
		scale?: string;
	};
	// Responsive positioning
	position: {
		desktop: ResponsivePosition;
		tablet?: ResponsivePosition;
		mobile?: ResponsivePosition;
	};
	// Visual effects
	opacity?: string;
	rotate?: string;
	// Animation overrides
	animationDelay?: number;
	animationDuration?: number;
}

// Configuration for each illustration with responsive positioning
const ILLUSTRATION_POSITION_CONFIG: Record<string, IllustrationConfig> = {
	'score-performance': {
		id: 'score-performance',
		size: {
			width: 'w-48 lg:w-64',
			height: 'h-48 lg:h-64',
			scale: 'scale-75 lg:scale-90',
		},
		position: {
			desktop: {
				top: 'lg:top-8',
				right: 'lg:right-4',
				x: 'lg:translate-x-2',
				y: 'lg:-translate-y-4',
			},
			tablet: {
				top: 'md:top-12',
				right: 'md:right-2',
				x: 'md:translate-x-1',
				y: 'md:-translate-y-2',
			},
			mobile: {
				bottom: 'bottom-4',
				left: 'left-4',
				x: '-translate-x-2',
				y: 'translate-y-2',
			},
		},
		opacity: 'opacity-70 lg:opacity-80',
		rotate: 'rotate-2 lg:rotate-3',
		animationDelay: 0.1,
		animationDuration: 0.4,
	},
	'review-team': {
		id: 'review-team',
		size: {
			width: 'w-52 lg:w-72',
			height: 'h-52 lg:h-72',
			scale: 'scale-80 lg:scale-95',
		},
		position: {
			desktop: {
				top: 'lg:top-12',
				left: 'lg:left-8',
				x: 'lg:-translate-x-4',
				y: 'lg:translate-y-2',
			},
			tablet: {
				top: 'md:top-8',
				left: 'md:left-4',
				x: 'md:-translate-x-2',
				y: 'md:translate-y-1',
			},
			mobile: {
				top: 'top-8',
				right: 'right-6',
				x: 'translate-x-3',
				y: '-translate-y-1',
			},
		},
		opacity: 'opacity-75 lg:opacity-85',
		rotate: '-rotate-1 lg:-rotate-2',
		animationDelay: 0.15,
		animationDuration: 0.35,
	},
	'review-member': {
		id: 'review-member',
		size: {
			width: 'w-56 lg:w-80',
			height: 'h-56 lg:h-80',
			scale: 'scale-85 lg:scale-100',
		},
		position: {
			desktop: {
				bottom: 'lg:bottom-8',
				right: 'lg:right-2',
				x: 'lg:translate-x-1',
				y: 'lg:translate-y-1',
			},
			tablet: {
				bottom: 'md:bottom-6',
				right: 'md:right-1',
				x: 'md:translate-x-0',
				y: 'md:translate-y-0',
			},
			mobile: {
				top: 'top-12',
				left: 'left-2',
				x: '-translate-x-1',
				y: '-translate-y-3',
			},
		},
		opacity: 'opacity-80 lg:opacity-90',
		animationDelay: 0.05,
		animationDuration: 0.3,
	},
	'generate-review': {
		id: 'generate-review',
		size: {
			width: 'w-44 lg:w-60',
			height: 'h-44 lg:h-60',
			scale: 'scale-70 lg:scale-85',
		},
		position: {
			desktop: {
				top: 'lg:top-16',
				left: 'lg:left-12',
				x: 'lg:-translate-x-2',
				y: 'lg:-translate-y-2',
			},
			tablet: {
				top: 'md:top-14',
				left: 'md:left-8',
				x: 'md:-translate-x-1',
				y: 'md:-translate-y-1',
			},
			mobile: {
				bottom: 'bottom-8',
				right: 'right-8',
				x: 'translate-x-4',
				y: 'translate-y-3',
			},
		},
		opacity: 'opacity-65 lg:opacity-75',
		rotate: 'rotate-0 lg:rotate-1',
		animationDelay: 0.2,
		animationDuration: 0.45,
	},
};

interface DemoIllustrationProps {
	activeItem: DemoMenuItem;
	className?: string;
	/**
	 * Override default positioning behavior
	 */
	useCustomPositioning?: boolean;
	/**
	 * Container positioning mode - 'relative' or 'absolute'
	 */
	containerPosition?: 'relative' | 'absolute';
	/**
	 * Custom container dimensions
	 */
	containerDimensions?: {
		width?: string;
		height?: string;
	};
}

export const DemoIllustration: React.FC<DemoIllustrationProps> = ({
	activeItem,
	className = '',
	useCustomPositioning = true,
	containerPosition = 'relative',
	containerDimensions,
}) => {
	// Get configuration for current item
	const config = ILLUSTRATION_POSITION_CONFIG[activeItem.id];

	// Fallback configuration if not found
	const fallbackConfig: IllustrationConfig = {
		id: activeItem.id,
		size: {
			width: 'w-48 lg:w-64',
			height: 'h-48 lg:h-64',
			scale: 'scale-90 lg:scale-100',
		},
		position: {
			desktop: {
				top: 'lg:top-1/2',
				left: 'lg:left-1/2',
				x: 'lg:-translate-x-1/2',
				y: 'lg:-translate-y-1/2',
			},
			mobile: {
				top: 'top-1/2',
				left: 'left-1/2',
				x: '-translate-x-1/2',
				y: '-translate-y-1/2',
			},
		},
		opacity: 'opacity-85',
		animationDelay: 0.1,
		animationDuration: 0.3,
	};

	const activeConfig = config || fallbackConfig;

	// Build responsive position classes
	const buildPositionClasses = (pos: ResponsivePosition) =>
		[pos.top, pos.bottom, pos.left, pos.right, pos.x, pos.y].filter(Boolean);

	const positionClasses = useCustomPositioning
		? [
				// Base absolute positioning
				'absolute',
				// Desktop positioning
				...buildPositionClasses(activeConfig.position.desktop),
				// Tablet positioning
				...(activeConfig.position.tablet
					? buildPositionClasses(activeConfig.position.tablet)
					: []),
				// Mobile positioning
				...buildPositionClasses(
					activeConfig.position.mobile || activeConfig.position.desktop
				),
				// Visual effects
				activeConfig.size.scale,
				activeConfig.opacity,
				activeConfig.rotate,
			]
				.filter(Boolean)
				.join(' ')
		: 'flex items-center justify-center';

	// Build size classes
	const sizeClasses = [activeConfig.size.width, activeConfig.size.height]
		.filter(Boolean)
		.join(' ');

	// Container classes
	const containerClasses = [
		containerPosition,
		'w-full h-full overflow-hidden',
		containerDimensions?.width,
		containerDimensions?.height,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<motion.div
			initial={{ opacity: 0, x: 15 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: activeConfig.animationDuration || 0.3,
				delay: activeConfig.animationDelay || 0,
			}}
			className={containerClasses}
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5 bg-gradient-radial from-primary-500/20 via-transparent to-transparent" />

			<AnimatePresence mode="wait">
				<motion.div
					key={activeItem.id}
					initial={{ opacity: 0, x: 15, scale: 0.95 }}
					animate={{ opacity: 1, x: 0, scale: 1 }}
					exit={{ opacity: 0, x: -15, scale: 0.95 }}
					transition={{
						duration: activeConfig.animationDuration || 0.3,
						delay: activeConfig.animationDelay || 0,
					}}
					className={`z-10 transition-all duration-500 ease-out ${positionClasses}`}
				>
					{/* SVG Illustration Container */}
					<div className={`${sizeClasses} flex items-center justify-center`}>
						<Image
							src={activeItem.illustration.src}
							alt={activeItem.illustration.alt}
							width={400}
							height={400}
							className="object-contain w-full h-full max-w-full max-h-full"
							priority
							sizes="(max-width: 768px) 200px, 400px"
						/>
					</div>
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
};
