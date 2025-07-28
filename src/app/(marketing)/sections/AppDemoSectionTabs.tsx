'use client';

import React, {
	useState,
	useCallback,
	useMemo,
	useRef,
	useEffect,
} from 'react';
import {
	HeroTabs,
	type HeroTabItem,
} from '@/app/(marketing)/components/tabs/HeroTabs';
import { Badge } from '@/components/ui/core/Badge';
import Image from 'next/image';

// Tab configuration
const DEMO_TABS_CONFIG: HeroTabItem[] = [
	{
		id: 'score-performance',
		label: "Team's actions",
		description: "Build your actions' framework",
	},
	{
		id: 'review-team',
		label: "Score people's actions",
		description: 'Real-time performance scoring',
	},
	{
		id: 'review-member',
		label: 'Review performances',
		description: 'Progress tracking made visible',
	},
	{
		id: 'generate-review',
		label: 'Generate reviews',
		description: 'AI-powered performance reviews',
	},
];

// Content descriptions for each tab
const TAB_CONTENT_CONFIG = [
	{
		id: 'score-performance',
		title: 'Select the actions that matter to your team.',
		subtitle: 'Clarify the actions that drive team performance',
		description:
			"Create a clear list of meaningful actions and behaviours that reflect your organisation's values, culture, and functions. Select from a curated list to ensure every action is relevant, impactful, and clearly understood by your team.",
		highlights: [
			'Clear expectations for team',
			'Focus on actions that drive impact',
			'Custom list to maintain relevance',
			'Simple to manage and scale',
		],
		illustration: 'illustrationTab1.svg',
	},
	{
		id: 'review-team',
		title: 'Score people performance in real time.',
		subtitle: 'Capture and evaluate team actions instantly',
		description:
			"The tool is designed to quickly and effectively score team performance by choosing the team member, the action they took, and the score itself. It's easy to use and enjoyable.",
		highlights: [
			'Quick and effortless scoring',
			'Score via mobile and desktop',
			'Immediate performance data update with each score',
		],
		illustration: 'illustrationTab2.svg',
	},
	{
		id: 'review-member',
		title: "Review people's performance data and trends",
		subtitle: 'Turn insights into meaningful conversations',
		description:
			'Monitor progress, identify patterns, and find opportunities for coaching with clear dashboards. Use data to identify high performers and help those who are not meeting expectations.',
		highlights: [
			'Clear dashboards for individuals and teams',
			'Know who is thriving and who is struggling',
			'Conduct smarter, data-backed 1:1s',
			"Measure and communicate team's impact",
		],
		illustration: 'illustrationTab3.svg',
	},
	{
		id: 'generate-review',
		title: 'Generate accurate performance reviews with AI.',
		subtitle: 'Let AI do the heavy lifting—fairly, smartly and fast',
		description:
			'Effortlessly turn real-time scores into ready-to-share performance reviews. Our AI generates objective, personalised summaries that save time, reduce bias, and make feedback easier to understand—for both managers, team members, and HR team.',
		highlights: [
			'AI-crafted, bias-free review summaries',
			'Saves hours on manual review writing',
			'Fair, consistent, and personalised',
			'Easy exports for HR, managers, and employees',
		],
		illustration: 'illustrationTab4.svg',
	},
];

// Props interface
interface AppDemoSectionTabsProps {
	className?: string;
}

export const AppDemoSectionTabs: React.FC<AppDemoSectionTabsProps> = ({
	className = '',
}) => {
	// State management
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);
	const announcementRef = useRef<HTMLDivElement>(null);

	// Get active content
	const activeContent = useMemo(() => {
		return TAB_CONTENT_CONFIG[activeTabIndex] || TAB_CONTENT_CONFIG[0];
	}, [activeTabIndex]);

	// Handle tab selection with announcements
	const handleTabChange = useCallback(
		(index: number) => {
			if (
				index !== activeTabIndex &&
				index >= 0 &&
				index < DEMO_TABS_CONFIG.length
			) {
				const previousIndex = activeTabIndex;
				setActiveTabIndex(index);

				// Announce tab change to screen readers
				const newTab = DEMO_TABS_CONFIG[index];
				const newContent = TAB_CONTENT_CONFIG[index];

				if (announcementRef.current) {
					announcementRef.current.textContent = `Selected ${newTab.label}. ${newContent.title}`;
				}

				// Focus the content area for screen readers
				if (contentRef.current) {
					contentRef.current.focus();
				}
			}
		},
		[activeTabIndex]
	);

	// Keyboard navigation for tabs
	const handleTabKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			switch (e.key) {
				case 'ArrowLeft':
					e.preventDefault();
					const prevIndex = index > 0 ? index - 1 : DEMO_TABS_CONFIG.length - 1;
					handleTabChange(prevIndex);
					break;
				case 'ArrowRight':
					e.preventDefault();
					const nextIndex = index < DEMO_TABS_CONFIG.length - 1 ? index + 1 : 0;
					handleTabChange(nextIndex);
					break;
				case 'Home':
					e.preventDefault();
					handleTabChange(0);
					break;
				case 'End':
					e.preventDefault();
					handleTabChange(DEMO_TABS_CONFIG.length - 1);
					break;
			}
		},
		[handleTabChange]
	);

	// Generate unique IDs for ARIA associations
	const tabId = (index: number) => `demo-tab-${index}`;
	const panelId = (index: number) => `demo-panel-${index}`;

	return (
		<section
			className={`relative py-12 sm:py-16 lg:py-24 ${className}`}
			aria-labelledby="demo-section-heading"
		>
			<div className="xl:container xl:mx-auto md:px-8 xl:px-8">
				{/* Section Header */}
				<header className="lg:text-center mb-8 sm:mb-12 lg:mb-16">
					<h2 id="demo-section-heading" className="marketing-h1 mb-3 sm:mb-4">
						How does it work?
					</h2>
					<p className="marketing-body-lg text-foreground max-w-xl lg:mx-auto">
						Discover how to make performance management enjoyable, effective,
						and insightful.
					</p>
				</header>

				{/* Hero Tabs - Desktop Only */}
				<div className="hidden lg:block mb-8 sm:mb-12 lg:mb-16">
					{/* Accessible wrapper for HeroTabs */}
					<div
						role="tablist"
						aria-label="JustScore features demonstration"
						onKeyDown={e => {
							// Handle keyboard navigation for the entire tablist
							switch (e.key) {
								case 'ArrowLeft':
									e.preventDefault();
									const prevIndex =
										activeTabIndex > 0
											? activeTabIndex - 1
											: DEMO_TABS_CONFIG.length - 1;
									handleTabChange(prevIndex);
									break;
								case 'ArrowRight':
									e.preventDefault();
									const nextIndex =
										activeTabIndex < DEMO_TABS_CONFIG.length - 1
											? activeTabIndex + 1
											: 0;
									handleTabChange(nextIndex);
									break;
								case 'Home':
									e.preventDefault();
									handleTabChange(0);
									break;
								case 'End':
									e.preventDefault();
									handleTabChange(DEMO_TABS_CONFIG.length - 1);
									break;
							}
						}}
					>
						<HeroTabs
							tabs={DEMO_TABS_CONFIG}
							activeIndex={activeTabIndex}
							onTabChange={handleTabChange}
							className="justify-center"
						/>
					</div>

					{/* Hidden accessibility enhancements */}
					<div className="sr-only">
						{/* Tab associations for screen readers */}
						{DEMO_TABS_CONFIG.map((tab, index) => (
							<div key={`sr-${tab.id}`}>
								<span
									id={tabId(index)}
									role="tab"
									aria-selected={index === activeTabIndex}
									aria-controls={panelId(index)}
								>
									{tab.label}: {tab.description}. Tab {index + 1} of{' '}
									{DEMO_TABS_CONFIG.length}.
								</span>
							</div>
						))}

						{/* Instructions for screen readers */}
						<p>
							Use arrow keys to navigate between tabs. Press Enter or Space to
							select a tab. Home and End keys jump to first and last tabs
							respectively.
						</p>
					</div>
				</div>

				{/* Desktop Layout - 2 Column Grid */}
				<div className="hidden lg:grid grid-cols-12 gap-6 lg:gap-4 xl:px-28">
					{/* Left Column - Content Description */}
					<div
						key={`content-${activeContent.id}`}
						className="order-1 col-span-5"
						id={panelId(activeTabIndex)}
						role="tabpanel"
						aria-labelledby={tabId(activeTabIndex)}
						tabIndex={-1}
						ref={contentRef}
					>
						<div className="space-y-6">
							{/* Header */}
							<header>
								<div className="mb-4">
									<Badge
										variant="primary-light"
										aria-label={`Feature category: ${DEMO_TABS_CONFIG[activeTabIndex]?.description}`}
									>
										{DEMO_TABS_CONFIG[activeTabIndex]?.description}
									</Badge>
								</div>
								<h3 className="marketing-h3 mb-4">{activeContent.title}</h3>
								{/* Hidden subtitle for screen readers */}
								<p className="sr-only">{activeContent.subtitle}</p>
							</header>

							{/* Description */}
							<p className="marketing-body">{activeContent.description}</p>

							{/* Highlights */}
							<div aria-labelledby="benefits-heading">
								<h4 id="benefits-heading" className="marketing-h6 pt-2 mb-4">
									Key Benefits
								</h4>
								<ul className="space-y-1.5" role="list">
									{activeContent.highlights.map((highlight, index) => (
										<li
											key={`${activeContent.id}-highlight-${index}`}
											className="flex items-start gap-3 marketing-body"
										>
											<div
												className="size-2.5 bg-primary-400 rounded-full mt-1.5 flex-shrink-0"
												aria-hidden="true"
											/>
											{highlight}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Right Column - Illustration */}
					<div className="order-2 col-span-7" aria-label="Feature illustration">
						<div className="relative w-full aspect-[4/3] max-w-2xl mx-auto">
							{/* Subtle background glow - decorative */}
							<div
								className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl blur-xl opacity-50 scale-105"
								aria-hidden="true"
							/>

							{/* Main illustration container */}
							<div className="relative w-full h-full p-8 lg:p-12">
								<Image
									key={`illustration-${activeContent.id}`}
									src={`images/illustrations/${activeContent.illustration}`}
									alt={`Illustration demonstrating ${activeContent.title.toLowerCase()}: ${activeContent.subtitle}`}
									fill
									className="object-contain transition-opacity duration-500 ease-in-out"
									priority={activeTabIndex === 0}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile/Tablet Layout - Sequential Content */}
				<div
					className="block lg:hidden space-y-16"
					role="region"
					aria-label="JustScore features overview"
				>
					{/* Hidden heading for mobile navigation */}
					<h3 className="sr-only">JustScore Features List</h3>

					{TAB_CONTENT_CONFIG.map((content, index) => (
						<article
							key={content.id}
							className="space-y-8"
							aria-labelledby={`mobile-feature-${index}`}
						>
							{/* Text Content */}
							<div className="space-y-6">
								{/* Header */}
								<header>
									<div className="mb-4">
										<Badge
											variant="primary-light"
											aria-label={`Feature category: ${DEMO_TABS_CONFIG[index]?.description}`}
										>
											{DEMO_TABS_CONFIG[index]?.description}
										</Badge>
									</div>
									<h3
										id={`mobile-feature-${index}`}
										className="marketing-h3 mb-4"
									>
										{content.title}
									</h3>
									{/* Hidden subtitle for screen readers */}
									<p className="sr-only">{content.subtitle}</p>
								</header>

								{/* Description */}
								<p className="text-base text-neutral-600 leading-relaxed max-w-xl">
									{content.description}
								</p>

								{/* Highlights */}
								<div aria-labelledby={`mobile-benefits-${index}`}>
									<h4
										id={`mobile-benefits-${index}`}
										className="marketing-h6 mb-4 pt-2"
									>
										Key Benefits
									</h4>
									<ul className="space-y-1.5" role="list">
										{content.highlights.map((highlight, highlightIndex) => (
											<li
												key={`${content.id}-mobile-${highlightIndex}`}
												className="flex items-start gap-3 text-neutral-700"
											>
												<div
													className="size-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"
													aria-hidden="true"
												/>
												{highlight}
											</li>
										))}
									</ul>
								</div>
							</div>

							{/* Illustration */}
							<figure className="relative w-full aspect-[4/3] max-w-lg mx-auto">
								{/* Subtle background glow - decorative */}
								<div
									className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl blur-lg opacity-40 scale-105"
									aria-hidden="true"
								/>

								{/* Main illustration container */}
								<div className="relative w-full h-full p-6 sm:p-8">
									<Image
										src={`images/illustrations/${content.illustration}`}
										alt={`Illustration demonstrating ${content.title.toLowerCase()}: ${content.subtitle}`}
										fill
										className="object-contain"
										sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
									/>
								</div>
							</figure>
						</article>
					))}
				</div>
			</div>

			{/* Live region for tab change announcements */}
			<div
				ref={announcementRef}
				aria-live="polite"
				aria-atomic="true"
				className="sr-only"
				role="status"
			/>

			{/* Additional screen reader instructions */}
			<div className="sr-only">
				<p>
					This section demonstrates JustScore&apos;s key features through an
					interactive tab interface on desktop, or a sequential list on mobile
					devices. Each feature includes detailed benefits and illustrations.
				</p>
			</div>
		</section>
	);
};
