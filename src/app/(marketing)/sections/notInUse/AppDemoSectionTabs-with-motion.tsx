// src/app/(marketing)/components/sections/AppDemoSectionTabs.tsx

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
	HeroTabs,
	type HeroTabItem,
} from '@/app/(marketing)/components/tabs/HeroTabs';
import {
	DemoMenu,
	DEMO_MENU_CONFIG,
} from '@/app/(marketing)/components/mobileAppShowcase/DemoMenu';
import { DemoSlideshow } from '@/app/(marketing)/components/mobileAppShowcase/DemoSlideshow';
import { DemoIllustration } from '@/app/(marketing)/components/mobileAppShowcase/DemoIllustration';
import { Badge } from '@/components/ui/core/Badge';

// Tab configuration based on demo menu items
const DEMO_TABS_CONFIG: HeroTabItem[] = [
	{
		id: 'score-performance',
		label: 'Score Performance',
		description: 'Real-time performance scoring',
	},
	{
		id: 'review-team',
		label: 'Team Review',
		description: 'Comprehensive team insights',
	},
	{
		id: 'review-member',
		label: 'Member Review',
		description: 'Individual performance analysis',
	},
	{
		id: 'generate-review',
		label: 'Custom Review',
		description: 'AI-powered review generation',
	},
];

// Content descriptions for each tab
const TAB_CONTENT_CONFIG = [
	{
		id: 'score-performance',
		title: 'Quick Performance Scoring',
		subtitle: 'Evaluate team members instantly',
		description:
			'Our intuitive scoring system allows you to quickly evaluate and rate team member performance with customizable criteria. Get real-time feedback and track improvements over time with detailed analytics and trend analysis.',
		highlights: [
			'Real-time performance evaluation',
			'Customizable scoring criteria',
			'Instant feedback delivery',
			'Historical trend analysis',
		],
	},
	{
		id: 'review-team',
		title: 'Comprehensive Team Insights',
		subtitle: "Monitor your team's collective performance",
		description:
			"Get a bird's-eye view of your team's performance with comprehensive analytics, goal tracking, and collaboration metrics. Identify strengths, address weaknesses, and foster team growth with data-driven insights.",
		highlights: [
			'Team performance dashboard',
			'Goal achievement tracking',
			'Collaboration analytics',
			'Growth opportunity identification',
		],
	},
	{
		id: 'review-member',
		title: 'Individual Performance Analysis',
		subtitle: 'Deep dive into personal development',
		description:
			'Analyze individual team member performance with detailed metrics, skill assessments, and personalized development plans. Track progress over time and provide targeted support for professional growth.',
		highlights: [
			'Detailed performance metrics',
			'Skill assessment tools',
			'Personalized development plans',
			'Progress tracking timeline',
		],
	},
	{
		id: 'generate-review',
		title: 'AI-Powered Review Generation',
		subtitle: 'Create comprehensive reviews automatically',
		description:
			'Leverage artificial intelligence to generate detailed, personalized performance reviews based on collected data and metrics. Save time while ensuring comprehensive and consistent evaluation processes.',
		highlights: [
			'AI-generated content',
			'Personalized review templates',
			'Data-driven insights',
			'Consistent evaluation standards',
		],
	},
];

// Animation constants
const SECTION_ANIMATION_DURATION = 0.25;

// Props interface
interface AppDemoSectionTabsProps {
	className?: string;
}

export const AppDemoSectionTabs: React.FC<AppDemoSectionTabsProps> = ({
	className = '',
}) => {
	// State management
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	// Get active content and demo item
	const activeContent = useMemo(() => {
		return TAB_CONTENT_CONFIG[activeTabIndex] || TAB_CONTENT_CONFIG[0];
	}, [activeTabIndex]);

	const activeDemoItem = useMemo(() => {
		return DEMO_MENU_CONFIG[activeTabIndex] || DEMO_MENU_CONFIG[0];
	}, [activeTabIndex]);

	// Handle tab selection
	const handleTabChange = useCallback(
		(index: number) => {
			if (
				index !== activeTabIndex &&
				index >= 0 &&
				index < DEMO_TABS_CONFIG.length
			) {
				setActiveTabIndex(index);
			}
		},
		[activeTabIndex]
	);

	return (
		<section className={`relative py-12 sm:py-16 lg:py-24 ${className}`}>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: SECTION_ANIMATION_DURATION }}
					className="text-center mb-8 sm:mb-12 lg:mb-16"
				>
					<h2 className="marketing-display text-primary-950 mb-3 sm:mb-4">
						How does it work?
					</h2>
					<p className="marketing-body-lg text-foreground max-w-xl mx-auto px-4 sm:px-0">
						Discover how to make performance management enjoyable, effective,
						and insightful.
					</p>
				</motion.div>

				{/* Hero Tabs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: SECTION_ANIMATION_DURATION, delay: 0.1 }}
					className="mb-8 sm:mb-12 lg:mb-16"
				>
					<HeroTabs
						tabs={DEMO_TABS_CONFIG}
						activeIndex={activeTabIndex}
						onTabChange={handleTabChange}
						className="justify-center"
					/>
				</motion.div>

				{/* Main Demo Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
					{/* Left Content Description - Mobile: Full width, Desktop: 4 columns */}
					<motion.div
						key={`content-${activeContent.id}`}
						initial={{ opacity: 0, x: -15 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: SECTION_ANIMATION_DURATION,
							delay: 0.2,
						}}
						className="order-1"
					>
						<div className="rounded-2xl p-4 sm:p-6 lg:p-8 h-full">
							<div className="space-y-4 sm:space-y-6">
								{/* Header */}
								<div>
									<div className="mb-4">
										<Badge>
											{DEMO_TABS_CONFIG[activeTabIndex]?.description}
										</Badge>
									</div>
									<h3 className="marketing-h1 mb-4">{activeContent.title}</h3>
									<p className="marketing-h4">{activeContent.subtitle}</p>
								</div>

								{/* Description */}
								<p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
									{activeContent.description}
								</p>

								{/* Highlights */}
								<div>
									<h4 className="font-semibold text-neutral-900 mb-3 text-sm sm:text-base">
										Key Benefits
									</h4>
									<ul className="space-y-2">
										{activeContent.highlights.map((highlight, index) => (
											<motion.li
												key={highlight}
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: 0.3 + index * 0.1 }}
												className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700"
											>
												<div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
												{highlight}
											</motion.li>
										))}
									</ul>
								</div>

								{/* Call to Action */}
								{/* <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-4 border-t border-neutral-200"
                >
                  <p className="text-xs sm:text-sm text-neutral-500 mb-3">
                    Ready to experience this feature?
                  </p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
                    Learn more about {activeContent.title.toLowerCase()} →
                  </button>
                </motion.div> */}
							</div>
						</div>
					</motion.div>

					{/* Center Slideshow - Mobile: Full width, Desktop: 4 columns */}
					<DemoSlideshow
						activeItem={activeDemoItem}
						activeMenuIndex={activeTabIndex}
						totalItems={DEMO_MENU_CONFIG.length}
						className="order-2"
					/>

					{/* Right Illustration - Mobile: Full width, Desktop: 4 columns */}
					<DemoIllustration activeItem={activeDemoItem} className="order-3" />
				</div>

				{/* Mobile-only tab navigation hint */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.5 }}
					className="block sm:hidden text-center mt-6 px-4"
				>
					<p className="text-xs text-neutral-500">
						👆 Switch between tabs above to explore different features
					</p>
				</motion.div>
			</div>
		</section>
	);
};
