// src/app/(marketing)/components/sections/DemoMenu.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, User, FileText } from 'lucide-react';

// Demo menu item interface
export interface DemoMenuItem {
	id: string;
	title: string;
	description: string;
	mobileScreen: {
		id: string;
		src: string;
		alt: string;
		title?: string;
	};
	illustration: {
		src: string;
		alt: string;
		icon: React.ComponentType<any>;
	};
}

// Demo menu configuration
export const DEMO_MENU_CONFIG: DemoMenuItem[] = [
	{
		id: 'score-performance',
		title: "Score someone's performance",
		description:
			'Quickly evaluate and score team member performance with our intuitive rating system.',
		mobileScreen: {
			id: 'scoring-screen',
			src: '/images/mobile/screens/scoring/01.png',
			alt: 'Performance Scoring Interface',
			title: 'Score Performance',
		},
		illustration: {
			src: '/images/illustrations/justie-leaning.svg',
			alt: 'Performance Scoring Visualization',
			icon: BarChart3,
		},
	},
	{
		id: 'review-team',
		title: 'Review your Team performance',
		description:
			"Get comprehensive insights into your team's overall performance and trends.",
		mobileScreen: {
			id: 'team-screen',
			src: '/images/mobile/screens/team/01.png',
			alt: 'Team Performance Dashboard',
			title: 'Team Overview',
		},
		illustration: {
			src: '/images/illustrations/team.svg',
			alt: 'Team Performance Visualization',
			icon: Users,
		},
	},
	{
		id: 'review-member',
		title: "Review someone's performance",
		description:
			'Dive deep into individual performance metrics and detailed analytics.',
		mobileScreen: {
			id: 'member-screen',
			src: '/images/mobile/screens/member/01.png',
			alt: 'Individual Performance Review',
			title: 'Member Review',
		},
		illustration: {
			src: '/images/illustrations/member.svg',
			alt: 'Individual Performance Visualization',
			icon: User,
		},
	},
	{
		id: 'generate-review',
		title: 'Generate a custom Performance Review',
		description:
			'Create comprehensive, customized performance reviews with AI-powered insights.',
		mobileScreen: {
			id: 'pr-screen',
			src: '/images/mobile/screens/pr/01.png',
			alt: 'Performance Review Generator',
			title: 'Custom Review',
		},
		illustration: {
			src: '/images/illustrations/pr.svg',
			alt: 'Performance Review Generation Visualization',
			icon: FileText,
		},
	},
];

// Animation constants - Consistent across all components
const SECTION_ANIMATION_DURATION = 0.25;
const STAGGER_DELAY = 0.05;

// Props interface
interface DemoMenuProps {
	items: DemoMenuItem[];
	activeIndex: number;
	onSelectItem: (index: number) => void;
	className?: string;
}

export const DemoMenu: React.FC<DemoMenuProps> = ({
	items,
	activeIndex,
	onSelectItem,
	className = '',
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: SECTION_ANIMATION_DURATION,
				delay: 0, // No delay
			}}
			className={className}
		>
			<div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-neutral-200 lg:sticky lg:top-8">
				<div className="mb-4 sm:mb-6">
					<h3 className="text-lg sm:text-xl font-semibold text-primary-950 mb-2">
						Choose a Feature to Explore
					</h3>
					<p className="text-xs sm:text-sm text-neutral-600">
						Select any feature below to see it in action
					</p>
				</div>

				<nav className="space-y-2 sm:space-y-3">
					{items.map((item, index) => (
						<motion.button
							key={item.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{
								duration: SECTION_ANIMATION_DURATION,
								delay: 0, // No staggered delays
							}}
							onClick={() => onSelectItem(index)}
							className={`w-full text-left p-3 sm:p-4 lg:p-5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
								index === activeIndex
									? 'bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-300 shadow-md'
									: 'bg-neutral-50 border-2 border-transparent hover:bg-gradient-to-r hover:from-neutral-100 hover:to-neutral-150 hover:border-neutral-300 hover:shadow-sm'
							}`}
						>
							{/* Active indicator */}
							{index === activeIndex && (
								<motion.div
									layoutId="activeIndicator"
									className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r-full"
									transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								/>
							)}

							<div className="space-y-1 sm:space-y-2 relative z-10">
								<div className="flex items-start justify-between">
									<h4
										className={`font-semibold text-sm sm:text-base lg:text-lg transition-colors leading-tight ${
											index === activeIndex
												? 'text-primary-900'
												: 'text-neutral-900 group-hover:text-primary-900'
										}`}
									>
										{item.title}
									</h4>

									{/* Number indicator */}
									<div
										className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ml-2 sm:ml-3 ${
											index === activeIndex
												? 'bg-primary-500 text-white'
												: 'bg-neutral-300 text-neutral-600 group-hover:bg-primary-400 group-hover:text-white'
										}`}
									>
										{index + 1}
									</div>
								</div>

								<p
									className={`text-xs sm:text-sm transition-colors leading-relaxed ${
										index === activeIndex
											? 'text-primary-800'
											: 'text-neutral-600 group-hover:text-neutral-700'
									}`}
								>
									{item.description}
								</p>
							</div>

							{/* Subtle hover effect */}
							<div
								className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
									index !== activeIndex ? 'group-hover:opacity-100' : ''
								}`}
							>
								<div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-50/20 rounded-xl" />
							</div>
						</motion.button>
					))}
				</nav>

				{/* Progress indicator */}
				<div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-neutral-200">
					<div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
						<span>Progress</span>
						<span>
							{activeIndex + 1} of {items.length}
						</span>
					</div>
					<div className="w-full bg-neutral-200 rounded-full h-1.5">
						<motion.div
							className="bg-gradient-to-r from-primary-400 to-primary-500 h-1.5 rounded-full"
							initial={{ width: '25%' }}
							animate={{
								width: `${((activeIndex + 1) / items.length) * 100}%`,
							}}
							transition={{ duration: 0.3, ease: 'easeOut' }}
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
