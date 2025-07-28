'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Tab section content configuration type
interface TabSectionContent {
	id: string;
	title: string;
	description: string;
	buttons: {
		demo: {
			text: string;
			variant: 'outline' | 'primary' | 'secondary';
		};
		cta: {
			text: string;
			variant: 'primary' | 'outline' | 'secondary';
		};
	};
	image: {
		src: string;
		alt: string;
	};
}

// Tab sections configuration
const TAB_SECTIONS_CONFIG: TabSectionContent[] = [
	{
		id: 'team-manager',
		title:
			'I want to know how my team is performing effortlessly, instantly, and reliably.',
		description:
			'Quickly score and track team actions and behaviors in real time—unlocking data-driven insights to make you the most effective and efficient team leader in the organization.',
		buttons: {
			demo: {
				text: 'Secondary action',
				variant: 'outline',
			},
			cta: {
				text: 'Primary action',
				variant: 'secondary',
			},
		},
		image: {
			src: '/images/hero/team-manager.svg',
			alt: 'Team Manager Dashboard Interface',
		},
	},
	{
		id: 'team',
		title: 'We want to collaborate and grow together as a unified team.',
		description:
			'Empower your team with tools that foster collaboration, track individual growth, and celebrate collective achievements in real-time.',
		buttons: {
			demo: {
				text: 'See team features',
				variant: 'outline',
			},
			cta: {
				text: 'Join as team',
				variant: 'secondary',
			},
		},
		image: {
			src: '/images/hero/team.svg',
			alt: 'Team Collaboration Interface',
		},
	},
	{
		id: 'hr-leader',
		title: 'I need comprehensive insights across all teams and departments.',
		description:
			'Get organization-wide visibility with advanced analytics, compliance tracking, and strategic workforce planning tools.',
		buttons: {
			demo: {
				text: 'View HR tools',
				variant: 'outline',
			},
			cta: {
				text: 'Get HR access',
				variant: 'secondary',
			},
		},
		image: {
			src: '/images/hero/hr.svg',
			alt: 'HR Leader Dashboard Interface',
		},
	},
	{
		id: 'business',
		title: 'I want data-driven insights to make strategic business decisions.',
		description:
			'Access executive-level analytics, ROI tracking, and strategic planning tools to drive organizational success.',
		buttons: {
			demo: {
				text: 'Business demo',
				variant: 'outline',
			},
			cta: {
				text: 'Enterprise trial',
				variant: 'secondary',
			},
		},
		image: {
			src: '/images/hero/business.svg',
			alt: 'Business Intelligence Interface',
		},
	},
	{
		id: 'pets',
		title: 'Even our pets deserve the best work-life balance! 🐾',
		description:
			'Because every team member matters, including our four-legged colleagues who bring joy to the workplace.',
		buttons: {
			demo: {
				text: 'Pet features',
				variant: 'outline',
			},
			cta: {
				text: 'Adopt workflow',
				variant: 'secondary',
			},
		},
		image: {
			src: '/images/hero/pets.svg',
			alt: 'Pet-Friendly Workplace Interface',
		},
	},
];

// Animation constants
const SECTION_ANIMATION_DURATION = 0.3;

// Props interface
interface BenefitsTabsContentProps {
	activeTabIndex: number;
}

export const BenefitsTabsContent: React.FC<BenefitsTabsContentProps> = ({
	activeTabIndex,
}) => {
	// Get active section with fallback
	const activeSection = useMemo(() => {
		const section = TAB_SECTIONS_CONFIG[activeTabIndex];
		return section || TAB_SECTIONS_CONFIG[0];
	}, [activeTabIndex]);

	return (
		<div className="relative section-container">
			<AnimatePresence mode="wait">
				<motion.div
					key={activeTabIndex}
					transition={{ duration: SECTION_ANIMATION_DURATION }}
					className="w-full"
				>
					{/* Main Hero Section */}
					<div className="relative overflow-hidden">
						{/* Background Container */}
						<div className="bg-neutral-100 rounded-3xl lg:rounded-[4rem] p-6 md:p-12 lg:p-16 pb-8">
							<div className="container mx-auto">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
									{/* Content Section - Left Side */}
									<motion.div
										initial={{ opacity: 0, x: -15 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: SECTION_ANIMATION_DURATION,
											ease: 'easeOut',
											delay: 0,
										}}
										className="space-y-6 lg:space-y-8 flex flex-col justify-center"
									>
										{/* Title */}
										<h1 className="marketing-h1 text-primary-950 max-w-2xl">
											{activeSection.title}
										</h1>

										{/* Description */}
										<p className="marketing-body-lg max-w-lg text-foreground">
											{activeSection.description}
										</p>

										{/* Action Buttons */}
										{/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <SignUpButton>
                        <Button
                          size="xl"
                          variant={activeSection.buttons.cta.variant}
                          className="btn-rounded w-full sm:w-auto"
                        >
                          {activeSection.buttons.cta.text}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </SignUpButton>

                      <Button
                        size="xl"
                        variant={activeSection.buttons.demo.variant}
                        className="btn-rounded w-full sm:w-auto"
                      >
                        <Film className="mr-2 h-5 w-5" />
                        {activeSection.buttons.demo.text}
                      </Button>
                    </div> */}
									</motion.div>

									{/* Hero Image Section - Right Side */}
									<motion.div
										initial={{ opacity: 0, x: 15 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: SECTION_ANIMATION_DURATION,
											ease: 'easeOut',
											delay: 0,
										}}
										className="relative w-full flex justify-center lg:justify-end items-center h-full"
									>
										<div className="relative w-full max-w-[540px] aspect-[9/5] flex items-center justify-center">
											<Image
												src={activeSection.image.src}
												alt={activeSection.image.alt}
												fill
												className="object-contain"
												priority={activeTabIndex === 0}
												sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 540px"
											/>
										</div>
									</motion.div>
								</div>
							</div>
						</div>

						{/* Decorative SVG Bottom */}
						<div className="section-container flex justify-center">
							<svg
								className="text-neutral-100 fill-current"
								width="726"
								height="184"
								viewBox="0 0 726 184"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M34.048 0C-208.287 0 930.713 0 693.218 0C455.723 0 363.633 184 363.633 184C363.633 184 276.383 0 34.048 0Z"
									fill="currentColor"
								/>
							</svg>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
