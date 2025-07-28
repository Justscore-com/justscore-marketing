'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BenefitsTabsContent } from './BenefitsTabsContent';
import { IllustrationTabs } from '@/app/(marketing)/components/tabs/tabs-illustrations';
import Image from 'next/image';
import { BrandLogo } from '@/components/logo/BrandLogo';
import { Button } from '@/components/ui/core/Button';
import { ArrowRight, Film } from 'lucide-react';
import { Badge } from '@/components/ui/core/Badge';

// Tab configuration type
interface TabConfig {
	id: string;
	label: string;
	illustration: React.ReactNode;
}

// Tab data configuration
const TAB_CONFIG: TabConfig[] = [
	{
		id: 'team-manager',
		label: 'the Team Manager',
		illustration: (
			<IllustrationTabs
				svg="/images/hero/team-manager.svg"
				text="the Team Manager"
			/>
		),
	},
	{
		id: 'team',
		label: 'the Team',
		illustration: (
			<IllustrationTabs svg="/images/hero/team.svg" text="the Team" />
		),
	},
	{
		id: 'hr-leader',
		label: 'the HR Leader',
		illustration: (
			<IllustrationTabs svg="/images/hero/hr.svg" text="the HR Leader" />
		),
	},
	{
		id: 'business',
		label: 'the Business',
		illustration: (
			<IllustrationTabs svg="/images/hero/business.svg" text="the Business" />
		),
	},
	{
		id: 'pets',
		label: 'the Pets',
		illustration: (
			<IllustrationTabs svg="/images/hero/pets.svg" text="the Pets" />
		),
	},
];

// Active Indicator SVG Component
const ActiveIndicator = ({ className = '' }) => (
	<svg
		width="154"
		height="39"
		viewBox="0 0 154 39"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<path
			d="M7.2223 0C-44.1821 0 197.424 0 147.046 0C96.6684 0 77.1342 39 77.1342 39C77.1342 39 58.6267 0 7.2223 0Z"
			fill="white"
		/>
	</svg>
);

// Tab Button Component
interface TabButtonProps {
	tab: TabConfig;
	isActive: boolean;
	onClick: () => void;
	index: number;
}

const TabButton = ({ tab, isActive, onClick, index }: TabButtonProps) => (
	<button
		onClick={onClick}
		className="
      relative flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200"
		aria-pressed={isActive}
		role="tab"
	>
		{React.cloneElement(tab.illustration as React.ReactElement, {
			isActive,
		})}

		{/* Active Indicator */}
		{isActive && (
			<motion.div
				layoutId="hero-tab-indicator"
				className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-primary-500 z-10"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					type: 'spring',
					stiffness: 300,
					damping: 20,
				}}
			>
				<ActiveIndicator className="w-full h-auto" />
			</motion.div>
		)}
	</button>
);

export const Benefits = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	// Memoized tab change handler
	const handleTabChange = useCallback((index: number) => {
		setActiveTabIndex(index);
	}, []);

	return (
		<section className="bg-transparent pb-0 px-0">
			{/* Tab Navigation */}
			<div className="section-container">
				<nav
					className="w-full grid grid-cols-5 gap-4 relative mb-[2px]"
					role="tablist"
					aria-label="User persona tabs"
				>
					{TAB_CONFIG.map((tab, index) => (
						<TabButton
							key={tab.id}
							tab={tab}
							isActive={activeTabIndex === index}
							onClick={() => handleTabChange(index)}
							index={index}
						/>
					))}
				</nav>
			</div>

			{/* Hero Content */}
			<BenefitsTabsContent activeTabIndex={activeTabIndex} />
		</section>
	);
};
