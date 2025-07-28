// src/app/(marketing)/components/sections/HeroTabs.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Tab item interface
export interface HeroTabItem {
	id: string;
	label: string;
	description?: string;
}

// Props interface
interface HeroTabsProps {
	tabs: HeroTabItem[];
	activeIndex: number;
	onTabChange: (index: number) => void;
	className?: string;
}

export const HeroTabs: React.FC<HeroTabsProps> = ({
	tabs,
	activeIndex,
	onTabChange,
	className = '',
}) => {
	return (
		<div
			className={`flex flex-wrap justify-center gap-2 sm:gap-4 ${className}`}
		>
			{tabs.map((tab, index) => (
				<motion.button
					key={tab.id}
					onClick={() => onTabChange(index)}
					className={`relative px-4 py-2 sm:px-8 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer ${
						index === activeIndex
							? 'text-primary-800 border border-primary-200 shadow'
							: 'text-neutral-600 bg-white hover:bg-neutral-50 hover:text-primary-600 border border-neutral-200'
					}`}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					{/* Active tab background */}
					{index === activeIndex && (
						<motion.div
							layoutId="activeTab"
							className="absolute inset-0 bg-primary-200 rounded-full"
							transition={{ type: 'spring', stiffness: 300, damping: 30 }}
						/>
					)}

					<span className="relative z-10">{tab.label}</span>
				</motion.button>
			))}
		</div>
	);
};
