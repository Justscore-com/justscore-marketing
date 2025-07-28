'use client';

import React from 'react';
import Image from 'next/image';
import { CircleAlert, CircleCheckBig } from 'lucide-react';

export const Differences = () => {
	return (
		<section
			className="w-full md:py-14 px-4 lg:px-8 lg:pb-40 relative overflow-hidden"
			aria-labelledby="differences-heading"
		>
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<header className="md:text-center mb-12 lg:mb-24 xl:mb-40 max-w-3xl mx-auto">
					<h2 id="differences-heading" className="marketing-h1 mb-4">
						How are we different?
					</h2>
					<div className="max-w-xl mx-auto space-y-6">
						<p className="marketing-body-lg">Less admin. More clarity.</p>
					</div>
				</header>

				{/* Comparison Grid */}
				<div
					className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 max-w-lg lg:max-w-full mx-auto"
					role="group"
					aria-labelledby="comparison-description"
				>
					{/* Hidden description for screen readers */}
					<div id="comparison-description" className="sr-only">
						Comparison between traditional performance management tools and
						JustScore, showing problems with traditional tools on the left and
						JustScore solutions on the right.
					</div>

					{/* Traditional Tools Column */}
					<div className="grid grid-cols-12 md:grid-cols-3 gap-4">
						<div
							className="col-span-10 md:col-span-2 space-y-4"
							aria-labelledby="traditional-tools-heading"
						>
							<header>
								<h3
									id="traditional-tools-heading"
									className="marketing-h5 text-right"
								>
									With traditional tools
								</h3>
								<div className="sr-only">
									<p>
										Problems and limitations of traditional performance
										management tools:
									</p>
								</div>
							</header>

							<ul
								className="text-right space-y-2 marketing-body"
								role="list"
								aria-label="Problems with traditional tools"
							>
								<li className="flex items-start justify-end gap-3">
									<span>Built for HR, not for managers</span>
									<CircleAlert
										className="md:mt-1 text-warning-600 size-4 md:size-5 shrink-0"
										aria-label="Problem indicator"
										role="img"
									/>
								</li>
								<li className="flex items-start justify-end gap-3">
									<span>Late, manual data entry</span>
									<CircleAlert
										className="md:mt-1 text-warning-600 size-4 md:size-5 shrink-0"
										aria-label="Problem indicator"
										role="img"
									/>
								</li>
								<li className="flex items-start justify-end gap-3">
									<span>One-size-fits-none forms</span>
									<CircleAlert
										className="md:mt-1 text-warning-600 size-4 md:size-5 shrink-0"
										aria-label="Problem indicator"
										role="img"
									/>
								</li>
								<li className="flex items-start justify-end gap-3">
									<span>Clunky UX, zero engagement</span>
									<CircleAlert
										className="md:mt-1 text-warning-600 size-4 md:size-5 shrink-0"
										aria-label="Problem indicator"
										role="img"
									/>
								</li>
								<li className="flex items-start justify-end gap-3">
									<span>Feels like a chore</span>
									<CircleAlert
										className="md:mt-1 text-warning-600 size-4 md:size-5 shrink-0"
										aria-label="Problem indicator"
										role="img"
									/>
								</li>
							</ul>
						</div>

						{/* Traditional Tools Illustration */}
						<div className="col-span-2 md:col-span-1 relative h-[10rem] lg:h-[14rem] mt-8 md:mt-12">
							<Image
								src="/images/illustrations/justy-concerned.svg"
								alt="Illustration of Justy looking concerned and frustrated, representing the difficulties with traditional performance management tools"
								fill
								className="object-contain"
								priority
								sizes="100vw"
							/>
						</div>
					</div>

					{/* JustScore Column */}
					<div className="grid grid-cols-12 md:grid-cols-3 gap-4 md:gap-0">
						{/* JustScore Illustration */}
						<div className="col-span-2 md:col-span-1 relative h-[12rem] md:h-[24rem] min-w-[4rem]">
							<Image
								src="/images/illustrations/justie-leaning.svg"
								alt="Illustration of Justie leaning forward with confidence and enthusiasm, representing the positive experience with JustScore"
								fill
								className="object-contain scale-x-[-1] xl:-ml-6"
								priority
								sizes="100vw"
							/>
						</div>

						<div
							className="col-span-10 md:col-span-2 space-y-4 xl:-ml-6"
							aria-labelledby="justscore-heading"
						>
							<header>
								<h3 id="justscore-heading" className="marketing-h5">
									With JustScore
								</h3>
								<div className="sr-only">
									<p>Solutions and benefits provided by JustScore:</p>
								</div>
							</header>

							<ul
								className="space-y-2 max-w-xs md:max-w-sm marketing-body"
								role="list"
								aria-label="Benefits of JustScore"
							>
								<li className="flex items-start gap-3">
									<CircleCheckBig
										className="md:mt-1 text-primary-400 size-4 md:size-5 shrink-0"
										aria-label="Benefit indicator"
										role="img"
									/>
									<span>Designed for managers, loved by HR</span>
								</li>
								<li className="flex items-start gap-3">
									<CircleCheckBig
										className="md:mt-1 text-primary-400 size-4 md:size-5 shrink-0"
										aria-label="Benefit indicator"
										role="img"
									/>
									<span>Real-time scoring, no admin lag.</span>
								</li>
								<li className="flex items-start gap-3">
									<CircleCheckBig
										className="md:mt-1 text-primary-400 size-4 md:size-5 shrink-0"
										aria-label="Benefit indicator"
										role="img"
									/>
									<span>Context-rich, team relevant actions</span>
								</li>
								<li className="flex items-start gap-3">
									<CircleCheckBig
										className="md:mt-1 text-primary-400 size-4 md:size-5 shrink-0"
										aria-label="Benefit indicator"
										role="img"
									/>
									<span>Intuitive and enjoyable experience</span>
								</li>
								<li className="flex items-start gap-3">
									<CircleCheckBig
										className="md:mt-1 text-primary-400 size-4 md:size-5 shrink-0"
										aria-label="Benefit indicator"
										role="img"
									/>
									<span>Feels like a boost, not a burden</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Comparison Summary for Screen Readers */}
				<div className="sr-only">
					<h3>Comparison Summary</h3>
					<p>
						Traditional performance management tools have five main problems:
						they&apos;re built for HR instead of managers, require late manual
						data entry, use one-size-fits-none forms, have clunky user
						experience with zero engagement, and feel like a chore.
					</p>
					<p>
						JustScore solves these problems by being designed for managers while
						loved by HR, providing real-time scoring without admin lag, offering
						context-rich team-relevant actions, delivering an intuitive and
						enjoyable experience, and feeling like a boost rather than a burden.
					</p>
				</div>
			</div>

			{/* Decorative Background Elements */}
			<div
				className="hidden xl:block absolute top-12 left-1/2 -z-10 overflow-hidden"
				aria-hidden="true"
			>
				<svg
					width="860"
					height="768"
					viewBox="0 0 804 725"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					role="presentation"
				>
					<title>Decorative background element</title>
					<g filter="url(#filter0_f_1789_306)">
						<path
							d="M328.714 34C311.646 134.182 244.815 198.97 146.729 217.063C93.4691 222.292 59.7467 213.038 34.4531 202.779C65.0921 230.529 83.6 262.728 103.135 301.353C159.684 441.163 50.2861 557.671 43.706 560.858C75.2506 545.002 134.68 523.764 216.681 528.575C386.438 538.563 474.728 670.294 482.061 690.812C467.684 650.579 464.834 593.72 477.179 528.575C500.788 404.175 608.372 289.483 765.065 265.947C765.675 265.855 770 265.48 770 265.48C596.652 282.579 502.884 229.737 502.884 229.737C374.159 165.965 340.969 65.2772 328.714 34Z"
							fill="#EAEAEA"
						/>
					</g>
					<path
						d="M328.714 34C311.646 134.182 244.815 198.97 146.729 217.063C93.4691 222.292 59.7467 213.038 34.4531 202.779C65.0921 230.529 83.6 262.728 103.135 301.353C159.684 441.163 50.2861 557.671 43.706 560.858C75.2506 545.002 134.68 523.764 216.681 528.575C386.438 538.563 474.728 670.294 482.061 690.812C467.684 650.579 464.834 593.72 477.179 528.575C500.788 404.175 608.372 289.483 765.065 265.947C765.675 265.855 770 265.48 770 265.48C596.652 282.579 502.884 229.737 502.884 229.737C374.159 165.965 340.969 65.2772 328.714 34Z"
						fill="white"
					/>
					<defs>
						<filter
							id="filter0_f_1789_306"
							x="0.453125"
							y="0"
							width="803.547"
							height="724.812"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="BackgroundImageFix"
								result="shape"
							/>
							<feGaussianBlur
								stdDeviation="17"
								result="effect1_foregroundBlur_1789_306"
							/>
						</filter>
					</defs>
				</svg>
			</div>

			<div
				className="hidden xl:block absolute bottom-0 left-0 overflow-hidden"
				aria-hidden="true"
			>
				<svg
					width="406"
					height="274"
					viewBox="0 0 406 274"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					role="presentation"
				>
					<title>Decorative background gradient</title>
					<path
						d="M0.0488281 0C14.377 36.5724 53.1833 154.308 203.688 228.875C203.86 228.972 274.033 268.434 405.742 274H0V0.279297C0.0159484 0.186162 0.0329533 0.0931876 0.0488281 0Z"
						fill="url(#paint0_linear_1847_31)"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_1847_31"
							x1="0"
							y1="274"
							x2="406"
							y2="274"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#8ECD84" />
							<stop offset="1" stopColor="#9CCEA5" />
						</linearGradient>
					</defs>
				</svg>
			</div>
		</section>
	);
};
