// src/app/(marketing)/components/sections/AppDemoSection.tsx

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
	DemoMenu,
	DEMO_MENU_CONFIG,
} from '@/app/(marketing)/components/__mobileAppShowcase/DemoMenu';
import { DemoSlideshow } from '@/app/(marketing)/components/__mobileAppShowcase/DemoSlideshow';
import { DemoIllustration } from '@/app/(marketing)/components/__mobileAppShowcase/DemoIllustration';

// Animation constants
const SECTION_ANIMATION_DURATION = 0.5;

// Props interface
interface AppDemoSectionProps {
	className?: string;
}

export const AppDemoSection: React.FC<AppDemoSectionProps> = ({
	className = '',
}) => {
	// State management
	const [activeMenuIndex, setActiveMenuIndex] = useState(0);

	// Get active menu item
	const activeMenuItem = useMemo(() => {
		return DEMO_MENU_CONFIG[activeMenuIndex] || DEMO_MENU_CONFIG[0];
	}, [activeMenuIndex]);

	// Handle menu selection
	const handleMenuSelect = useCallback(
		(index: number) => {
			if (
				index !== activeMenuIndex &&
				index >= 0 &&
				index < DEMO_MENU_CONFIG.length
			) {
				setActiveMenuIndex(index);
			}
		},
		[activeMenuIndex]
	);

	return (
		<section className={`relative py-12 sm:py-16 lg:py-24 ${className}`}>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: SECTION_ANIMATION_DURATION }}
					className="text-center mb-8 sm:mb-12 lg:mb-16"
				>
					<h2 className="marketing-h2 text-primary-950 mb-3 sm:mb-4">
						Experience the Power of Performance Management
					</h2>
					<p className="marketing-body-lg text-foreground max-w-2xl mx-auto px-4 sm:px-0">
						Discover how our intuitive platform transforms the way you manage,
						track, and improve team performance.
					</p>
				</motion.div>

				{/* Main Demo Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
					{/* Left Menu - Mobile: Full width, Desktop: 4 columns */}
					<DemoMenu
						items={DEMO_MENU_CONFIG}
						activeIndex={activeMenuIndex}
						onSelectItem={handleMenuSelect}
						className="lg:col-span-4 order-1 lg:order-1"
					/>

					{/* Center Slideshow - Mobile: Full width, Desktop: 4 columns */}
					<DemoSlideshow
						activeItem={activeMenuItem}
						activeMenuIndex={activeMenuIndex}
						totalItems={DEMO_MENU_CONFIG.length}
						className="lg:col-span-4 order-3 lg:order-2"
					/>

					{/* Right Illustration - Mobile: Full width, Desktop: 4 columns */}
					<DemoIllustration
						activeItem={activeMenuItem}
						className="lg:col-span-4 order-2 lg:order-3"
					/>
				</div>

				{/* Mobile-only action hint */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.5 }}
					className="block sm:hidden text-center mt-6 px-4"
				>
					<p className="text-xs text-neutral-500">
						👆 Tap any feature above to explore the demo
					</p>
				</motion.div>
			</div>
		</section>
	);
};
