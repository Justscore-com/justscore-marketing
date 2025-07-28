'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IPhoneFrame } from './IPhoneFrame';
import Image from 'next/image';

// Screen data type
interface AppScreen {
	id: string;
	src: string;
	alt: string;
	title?: string;
}

// Component props
interface ScreenSlideshowProps {
	/**
	 * Array of screens to display
	 */
	screens: AppScreen[];
	/**
	 * Auto-advance interval in milliseconds
	 */
	autoAdvanceInterval?: number;
	/**
	 * Whether to pause on hover
	 */
	pauseOnHover?: boolean;
	/**
	 * Whether to show navigation dots
	 */
	showIndicators?: boolean;
	/**
	 * Whether to show manual navigation arrows
	 */
	showNavigation?: boolean;
	/**
	 * Additional CSS classes for the container
	 */
	className?: string;
	/**
	 * iPhone frame size
	 */
	phoneSize?: 'sm' | 'md' | 'lg';
	/**
	 * Callback when screen changes
	 */
	onScreenChange?: (screenIndex: number) => void;
	/**
	 * Whether to use container sizing instead of fixed sizing
	 */
	useContainerSizing?: boolean;
}

// Animation variants
const slideVariants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 1000 : -1000,
		opacity: 0,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		zIndex: 0,
		x: direction < 0 ? 1000 : -1000,
		opacity: 0,
	}),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

export const ScreenSlideshow: React.FC<ScreenSlideshowProps> = ({
	screens,
	autoAdvanceInterval = 4000,
	pauseOnHover = true,
	showIndicators = true,
	showNavigation = false,
	className = '',
	phoneSize = 'sm',
	onScreenChange,
	useContainerSizing = false,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	// Auto-advance logic
	useEffect(() => {
		if (isPaused || screens.length <= 1 || autoAdvanceInterval === 0) return;

		const interval = setInterval(() => {
			paginate(1);
		}, autoAdvanceInterval);

		return () => clearInterval(interval);
	}, [currentIndex, isPaused, screens.length, autoAdvanceInterval]);

	// Pagination function
	const paginate = useCallback(
		(newDirection: number) => {
			setDirection(newDirection);
			setCurrentIndex(prevIndex => {
				const newIndex = prevIndex + newDirection;
				if (newIndex >= screens.length) return 0;
				if (newIndex < 0) return screens.length - 1;
				return newIndex;
			});
		},
		[screens.length]
	);

	// Go to specific screen
	const goToScreen = useCallback(
		(index: number) => {
			if (index === currentIndex) return;
			const newDirection = index > currentIndex ? 1 : -1;
			setDirection(newDirection);
			setCurrentIndex(index);
		},
		[currentIndex]
	);

	// Notify parent of screen change
	useEffect(() => {
		onScreenChange?.(currentIndex);
	}, [currentIndex, onScreenChange]);

	// Handle pause on hover
	const handleMouseEnter = useCallback(() => {
		if (pauseOnHover) setIsPaused(true);
	}, [pauseOnHover]);

	const handleMouseLeave = useCallback(() => {
		if (pauseOnHover) setIsPaused(false);
	}, [pauseOnHover]);

	// Return slideshow with iPhone frame
	if (!screens.length) {
		return <div>No screens available</div>;
	}

	return (
		<div
			className={`relative ${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<IPhoneFrame
				screenSrc={screens[currentIndex]?.src}
				screenAlt={screens[currentIndex]?.alt || 'App screen'}
				showFrame={true}
				useContainerSizing={useContainerSizing}
			/>

			{/* Navigation Arrows - Only show if not using container sizing */}
			{showNavigation && screens.length > 1 && !useContainerSizing && (
				<>
					<button
						className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
						onClick={() => paginate(-1)}
						aria-label="Previous screen"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path
								d="M15 18L9 12L15 6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<button
						className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
						onClick={() => paginate(1)}
						aria-label="Next screen"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path
								d="M9 18L15 12L9 6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</>
			)}

			{/* Indicator Dots - Only show if not using container sizing */}
			{showIndicators && screens.length > 1 && !useContainerSizing && (
				<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
					{screens.map((_, index) => (
						<button
							key={index}
							className={`w-2 h-2 rounded-full transition-all duration-200 ${
								index === currentIndex
									? 'bg-neutral-800 scale-125'
									: 'bg-neutral-300 hover:bg-neutral-400'
							}`}
							onClick={() => goToScreen(index)}
							aria-label={`Go to screen ${index + 1}`}
						/>
					))}
				</div>
			)}

			{/* Progress Bar - Only show if not using container sizing */}
			{!isPaused &&
				screens.length > 1 &&
				autoAdvanceInterval > 0 &&
				!useContainerSizing && (
					<div className="absolute bottom-10 left-8 right-8 h-0.5 bg-transparent rounded-full overflow-hidden">
						<motion.div
							key={currentIndex}
							className="h-full bg-neutral-300"
							initial={{ width: '0%' }}
							animate={{ width: '100%' }}
							transition={{
								duration: autoAdvanceInterval / 1000,
								ease: 'linear',
							}}
						/>
					</div>
				)}
		</div>
	);
};
