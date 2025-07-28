'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Types for our component props
interface StoryBox {
	id: string;
	title: string;
	description: string;
	icon: string;
	iconAlt: string;
	colSpan?: 1 | 2 | 3; // Prop for column span
	descriptionScene?: string; // Optional description scene to overlay on the image
}

interface TabContent {
	id: string;
	label: string;
	title?: string;
	description?: string;
	features: StoryBox[]; // Keep 'features' for compatibility with existing data
}

interface TabsStoriesGridProps {
	tabs: TabContent[];
	className?: string;
	showHeader?: boolean; // Option to show/hide the tab header
}

// Helper to determine if a story should span multiple columns
const getColSpanClass = (colSpan?: 1 | 2 | 3) => {
	switch (colSpan) {
		case 2:
			return 'col-span-1 sm:col-span-2';
		case 3:
			return 'col-span-1 sm:col-span-3';
		default:
			return 'col-span-1';
	}
};

// Animation variants - simplified to only use fade
const tabVariants = {
	inactive: { opacity: 0 },
	active: { opacity: 1 },
};

export const TabsStoriesGrid: React.FC<TabsStoriesGridProps> = ({
	tabs,
	className,
	showHeader = false,
}) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	// Get the current active tab content
	const activeTab = tabs[activeTabIndex];

	// Memoized tab change handler
	const handleTabChange = useCallback((index: number) => {
		setActiveTabIndex(index);
	}, []);

	return (
		<div className={cn('w-full space-y-12', className)}>
			{/* Tab Navigation */}
			<div className="flex justify-center">
				<nav
					className="inline-flex rounded-full bg-neutral-100 p-1.5 border-t border-neutral-200"
					role="tablist"
					aria-label="Story category tabs"
				>
					{tabs.map((tab, index) => (
						<div key={tab.id} className="relative">
							<button
								onClick={() => handleTabChange(index)}
								className={cn(
									'relative px-6 py-2.5 -mt-[2px] rounded-full transition-all text-sm font-medium border border-transparent cursor-pointer z-10',
									activeTabIndex === index
										? 'text-primary-800'
										: 'text-neutral-600 hover:text-neutral-900'
								)}
								role="tab"
								aria-selected={activeTabIndex === index}
								aria-controls={`tabpanel-${tab.id}`}
								id={`tab-${tab.id}`}
							>
								{/* Background */}
								{activeTabIndex === index && (
									<motion.div
										layoutId="activeTabBackground"
										className="absolute inset-0 bg-primary-200 border border-primary-200 border-b-primary-300 rounded-full z-0"
										transition={{ ease: 'easeInOut', duration: 0.25 }}
									/>
								)}

								{/* Foreground Text */}
								<span className="relative z-10">{tab.label}</span>
							</button>
						</div>
					))}
				</nav>
			</div>

			{/* Tab Content Section */}
			<div className="relative">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeTabIndex}
						variants={tabVariants}
						initial="inactive"
						animate="active"
						exit="inactive"
						transition={{ duration: 0.25 }}
						id={`tabpanel-${activeTab.id}`}
						role="tabpanel"
						aria-labelledby={`tab-${activeTab.id}`}
						className="space-y-12"
					>
						{/* Tab Header - Optional */}
						{showHeader && activeTab.title && activeTab.description && (
							<div className="section-header-centered">
								<h2 className="marketing-h2">{activeTab.title}</h2>
								<p className="marketing-body text-neutral-600">
									{activeTab.description}
								</p>
							</div>
						)}

						{/* Stories Grid - Limited to max 3 columns */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{activeTab.features.map(story => (
								<div
									key={story.id}
									className={cn(
										'bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md border border-neutral-100',
										getColSpanClass(story.colSpan)
									)}
									style={{ height: '460px' }} // Fixed height of 460px for all boxes
								>
									<div className="relative flex flex-col h-full">
										{/* Title at the top - fixed height for consistency */}
										<div className="hidden p-6 pb-3">
											<h3 className="marketing-h4">{story.title}</h3>
											<p className="marketing-body-sm text-neutral-600 line-clamp-2">
												{story.description}
											</p>
										</div>

										{/* SVG Image container - takes remaining height */}
										<div className="relative flex-grow overflow-hidden">
											<div className="absolute inset-0 flex items-center justify-center m-4">
												<Image
													src={story.icon}
													alt={story.iconAlt}
													fill
													className="object-contain" // Changed to object-contain to maintain proportions
													sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												/>
											</div>

											{/* Optional description scene overlay at the bottom */}
											{story.descriptionScene && (
												<div className="description-scene absolute bottom-0 left-0 right-0 bg-white/90 p-4">
													<p className="text-xs text-center">
														{story.descriptionScene}
													</p>
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};
