// src/app/(marketing)/components/sections/DemoSlideshow.tsx

'use client';

import React, { useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenSlideshow } from './ScreenSlideshow';
import { StickyPhoneWrapper } from './StickyPhoneWrapper';
import type { DemoMenuItem } from './DemoMenu';

// Animation constants
const SECTION_ANIMATION_DURATION = 0.25;
const STAGGER_DELAY = 0.05;

// Props interface
interface DemoSlideshowProps {
	activeItem: DemoMenuItem;
	activeMenuIndex: number;
	totalItems: number;
	className?: string;
	/**
	 * Enable sticky phone effect
	 */
	enableStickyPhone?: boolean;
	/**
	 * Bottom offset for sticky phone (in pixels)
	 */
	stickyBottomOffset?: number;
	/**
	 * Custom height for the phone container
	 */
	height?: string;
	/**
	 * Custom width for the phone container
	 */
	width?: string;
	/**
	 * Whether to use container sizing instead of fixed sizing
	 */
	useContainerSizing?: boolean;
}

export const DemoSlideshow: React.FC<DemoSlideshowProps> = ({
	activeItem,
	activeMenuIndex,
	totalItems,
	className = '',
	enableStickyPhone = true,
	stickyBottomOffset = 20,
	height,
	width,
	useContainerSizing = false,
}) => {
	// Convert single screen to array for ScreenSlideshow
	const slideshowScreens = useMemo(
		() => [activeItem.mobileScreen],
		[activeItem]
	);

	// Handle slideshow screen change (for potential analytics)
	const handleScreenChange = useCallback(
		(screenIndex: number) => {
			// Optional: Add analytics or tracking here
			console.log(
				`Demo screen viewed: ${activeItem.id} - Screen ${screenIndex}`
			);
		},
		[activeItem.id]
	);

	// Dynamic sizing based on props
	const containerStyle = useMemo(() => {
		if (!useContainerSizing) return {};

		return {
			height: height || '100%',
			width: width || '100%',
		};
	}, [height, width, useContainerSizing]);

	// Dynamic className for sizing
	const sizingClasses = useMemo(() => {
		if (useContainerSizing) {
			return 'w-full h-full';
		}

		// Default sizing classes
		return 'w-full h-full min-w-[280px] min-h-[580px] max-w-[350px] max-h-[700px]';
	}, [useContainerSizing]);

	const slideShowContent = (
		<div
			className="relative w-full h-full flex justify-center items-center"
			style={containerStyle}
		>
			<ScreenSlideshow
				key={activeItem.id} // Force re-mount when menu changes
				screens={slideshowScreens}
				autoAdvanceInterval={0} // Disable auto-advance for demo
				pauseOnHover={false}
				showIndicators={false} // Hide indicators since we only have one screen
				showNavigation={false} // Hide navigation for single screen
				phoneSize="md"
				onScreenChange={handleScreenChange}
				className={sizingClasses}
				useContainerSizing={useContainerSizing}
			/>

			{/* Background decoration - Only show if not using container sizing */}
			{!useContainerSizing && (
				<div className="absolute inset-0 -z-10">
					{/* Primary gradient glow effect */}
					<motion.div
						key={`glow-${activeItem.id}`}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] max-h-[400px] rounded-full blur-3xl opacity-40"
						style={{
							background:
								'radial-gradient(circle, rgb(59 130 246 / 1) 0%, rgb(59 130 246 / 0.6) 40%, transparent 70%)',
						}}
					/>
				</div>
			)}
		</div>
	);

	return (
		<motion.div
			initial={{ opacity: 0, x: -30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: SECTION_ANIMATION_DURATION,
				delay: 0,
			}}
			className={`flex justify-center items-center w-full h-full ${className}`}
		>
			{enableStickyPhone ? (
				<StickyPhoneWrapper
					bottomOffset={stickyBottomOffset}
					className="w-full h-full"
				>
					{slideShowContent}
				</StickyPhoneWrapper>
			) : (
				slideShowContent
			)}
		</motion.div>
	);
};
