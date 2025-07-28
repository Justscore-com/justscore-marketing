// src/app/(marketing)/components/sections/DemoIllustration.tsx

'use client';

import React, { useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Zap } from 'lucide-react';
import type { DemoMenuItem } from './DemoMenu';

// Animation constants
const SECTION_ANIMATION_DURATION = 0.5;
const STAGGER_DELAY = 0.1;

// Props interface
interface DemoIllustrationProps {
	activeItem: DemoMenuItem;
	className?: string;
}

export const DemoIllustration: React.FC<DemoIllustrationProps> = ({
	activeItem,
	className = '',
}) => {
	// Get color theme for active item
	const getColorTheme = useCallback((color: string) => {
		const themes = {
			blue: {
				primary: 'text-blue-600',
				bg: 'bg-blue-50',
				border: 'border-blue-200',
				gradient: 'from-blue-50 to-blue-100',
				accent: 'bg-blue-500',
				lightAccent: 'bg-blue-100',
			},
			green: {
				primary: 'text-green-600',
				bg: 'bg-green-50',
				border: 'border-green-200',
				gradient: 'from-green-50 to-green-100',
				accent: 'bg-green-500',
				lightAccent: 'bg-green-100',
			},
			purple: {
				primary: 'text-purple-600',
				bg: 'bg-purple-50',
				border: 'border-purple-200',
				gradient: 'from-purple-50 to-purple-100',
				accent: 'bg-purple-500',
				lightAccent: 'bg-purple-100',
			},
			orange: {
				primary: 'text-orange-600',
				bg: 'bg-orange-50',
				border: 'border-orange-200',
				gradient: 'from-orange-50 to-orange-100',
				accent: 'bg-orange-500',
				lightAccent: 'bg-orange-100',
			},
		};
		return themes[color as keyof typeof themes] || themes.blue;
	}, []);

	// Get current theme
	const currentTheme = useMemo(
		() => getColorTheme(activeItem.illustration.color),
		[activeItem.illustration.color, getColorTheme]
	);

	return (
		<motion.div
			initial={{ opacity: 0, x: 30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: SECTION_ANIMATION_DURATION,
				delay: STAGGER_DELAY * 3,
			}}
			className={className}
		>
			<div
				className={`bg-gradient-to-br ${currentTheme.gradient} rounded-2xl p-4 sm:p-6 lg:p-8 h-full min-h-[350px] sm:min-h-[400px] lg:min-h-[600px] border ${currentTheme.border} relative overflow-hidden`}
			>
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-5">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `radial-gradient(circle at 25% 25%, ${
								activeItem.illustration.color === 'blue'
									? '#3B82F6'
									: activeItem.illustration.color === 'green'
										? '#10B981'
										: activeItem.illustration.color === 'purple'
											? '#8B5CF6'
											: '#F59E0B'
							} 0%, transparent 50%)`,
						}}
					/>
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={activeItem.id}
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -20, scale: 0.95 }}
						transition={{ duration: SECTION_ANIMATION_DURATION }}
						className="relative z-10 h-full flex flex-col"
					>
						{/* Header */}
						<div className="mb-4 sm:mb-6">
							<div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
								<div
									className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl ${currentTheme.lightAccent} flex items-center justify-center`}
								>
									<activeItem.illustration.icon
										className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${currentTheme.primary}`}
									/>
								</div>
								<div>
									<h4 className="font-semibold text-base sm:text-lg text-neutral-900 leading-tight">
										{activeItem.title}
									</h4>
									<p className="text-xs sm:text-sm text-neutral-600">
										Real-time insights
									</p>
								</div>
							</div>
						</div>

						{/* Stats Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
							{activeItem.illustration.stats.map((stat, index) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 * (index + 1) }}
									className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/50"
								>
									<div className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 mb-1">
										{stat.value}
									</div>
									<div className="text-xs text-neutral-600 mb-1 sm:mb-2">
										{stat.label}
									</div>
									<div
										className={`text-xs font-medium flex items-center gap-1 ${
											stat.trend.startsWith('+')
												? 'text-green-600'
												: stat.trend.startsWith('-') &&
													  stat.label.includes('Time')
													? 'text-green-600'
													: 'text-red-600'
										}`}
									>
										{stat.trend.startsWith('+') ? (
											<TrendingUp className="w-3 h-3" />
										) : stat.trend.startsWith('-') &&
										  stat.label.includes('Time') ? (
											<TrendingUp className="w-3 h-3 rotate-180" />
										) : (
											<TrendingUp className="w-3 h-3 rotate-180" />
										)}
										{stat.trend}
									</div>
								</motion.div>
							))}
						</div>

						{/* Features List */}
						<div className="flex-1">
							<h5 className="font-medium text-sm sm:text-base text-neutral-900 mb-2 sm:mb-3">
								Key Features
							</h5>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-1.5 sm:gap-2">
								{activeItem.illustration.features.map((feature, index) => (
									<motion.div
										key={feature}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.1 * (index + 1) }}
										className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700"
									>
										<div
											className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${currentTheme.accent} flex-shrink-0`}
										/>
										{feature}
									</motion.div>
								))}
							</div>
						</div>

						{/* Visual Element */}
						<div className="mt-4 sm:mt-6">
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.3, duration: 0.5 }}
								className="relative"
							>
								{/* Placeholder for actual illustration - you can replace with real images */}
								<div
									className={`aspect-[4/3] rounded-lg sm:rounded-xl ${currentTheme.bg} border-2 border-dashed ${currentTheme.border} flex items-center justify-center relative overflow-hidden`}
								>
									{/* Animated background elements */}
									<div className="absolute inset-0">
										{[...Array(6)].map((_, i) => (
											<motion.div
												key={i}
												className={`absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentTheme.accent} opacity-20`}
												style={{
													left: `${20 + i * 15}%`,
													top: `${30 + (i % 2) * 40}%`,
												}}
												animate={{
													y: [0, -10, 0],
													opacity: [0.2, 0.5, 0.2],
												}}
												transition={{
													duration: 2,
													delay: i * 0.2,
													repeat: Infinity,
													ease: 'easeInOut',
												}}
											/>
										))}
									</div>

									{/* Central icon */}
									<div
										className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl ${currentTheme.lightAccent} flex items-center justify-center relative z-10`}
									>
										<activeItem.illustration.icon
											className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${currentTheme.primary}`}
										/>
									</div>

									{/* Image placeholder text */}
									<div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-center">
										<p className="text-xs text-neutral-500">
											{activeItem.illustration.alt}
										</p>
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</AnimatePresence>

				{/* Floating action indicator */}
				<motion.div
					key={`action-${activeItem.id}`}
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
					className="absolute top-3 right-3 sm:top-4 sm:right-4"
				>
					<div
						className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${currentTheme.accent} flex items-center justify-center shadow-lg`}
					>
						<Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};
