'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BrandLogo } from '@/components/logo/BrandLogo';
import { Button } from '@/components/ui/core/Button';
import { Badge } from '@/components/ui/core/Badge';
import { ArrowRight, Film, CircleCheckBig } from 'lucide-react';
import { useEarlyAdoptersStore } from '@/store/early-adopters-store';
import { DecorativeSVG } from '@/app/(marketing)/components/decorative/DecorativeSVG';
import {
	generateRandomDecorations,
	type SVGDecoration,
} from '@/app/(marketing)/utils/svgDecorations';

// Reusable SVG Underline Component
const EnjoyablyUnderline = ({ className = '' }: { className?: string }) => (
	<svg
		width="362"
		height="31"
		viewBox="0 0 362 31"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={`absolute lg:-bottom-7 left-1/2 -translate-x-1/2 w-full max-w-[294px] md:max-w-[336px] lg:max-w-[380px] h-auto ${className}`}
		aria-hidden="true"
		role="img"
		focusable="false"
	>
		<title>Decorative underline</title>
		<path
			d="M360.542 17.8975C357.724 16.464 355.419 14.3437 338.725 11.638C333.015 10.7377 327.317 9.76309 321.603 8.90005C278.942 3.42917 275.23 3.63253 243.755 1.32117C226.896 0.34405 209.993 0.27213 193.111 -0.000669752C181.207 -0.0279498 169.3 0.38621 157.399 0.61933C93.3083 3.35973 115.61 1.90397 70.9552 5.74053C51.714 8.26269 32.5188 11.1618 13.293 13.8105C10.4261 14.4081 7.51582 14.8446 4.68721 15.601C1.55737 16.4492 1.43994 16.4144 0.99318 16.8112C-1.04658 18.2447 0.232418 21.806 3.2193 21.1512C11.8966 18.8027 11.46 19.0259 48.6761 13.7956C49.7636 14.9066 50.5371 14.6338 53.3785 14.5669C56.7458 14.4875 60.113 14.4354 63.4777 14.2891C77.1383 13.3442 90.7631 11.9033 104.416 10.8295C109.116 10.5071 113.811 10.0557 118.51 9.66389C124.436 9.37621 130.364 9.09597 136.291 8.82069C166.997 8.28501 158.108 8.04445 196.195 8.44373C202.174 8.68925 196.596 8.39909 228.29 10.1549C252.953 12.3572 279.583 17.084 303.707 21.5927C314.141 23.5544 333.492 27.3463 343.612 30.7141C344.584 30.9745 345.725 30.6472 346.295 29.8263C347.104 28.9037 346.974 27.4207 346.096 26.57C345.266 25.7963 344.018 25.7169 342.986 25.3102C338.419 23.8594 331.705 22.3119 326.732 21.2033L333.41 22.0168C339.287 22.793 345.225 22.9889 351.112 23.6908C353.869 23.9288 357.604 24.1396 359.879 22.602C360.456 22.2201 361.119 21.9201 361.464 21.2951C362.169 20.1568 361.752 18.5522 360.548 17.9025L360.542 17.8975ZM236.245 5.89429C245.854 6.24149 275.557 8.58509 286.445 9.59941C298.175 10.9659 309.903 12.3349 321.613 13.8625C327.804 15.0455 340.538 16.6426 347.581 18.3612C344.551 18.076 341.513 17.8727 338.48 17.6024C304.409 13.6592 270.369 9.41341 236.245 5.89429Z"
			fill="url(#paint0_linear_enjoyably)"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_enjoyably"
				x1="0"
				y1="15.3999"
				x2="361.807"
				y2="15.3999"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#9ECC9A" />
				<stop offset="0.543269" stopColor="#8AD0F7" />
				<stop offset="1" stopColor="#77ABF9" />
			</linearGradient>
		</defs>
	</svg>
);

export const Hero = () => {
	const openModal = useEarlyAdoptersStore(state => state.openModal);
	const isModalOpen = useEarlyAdoptersStore(state => state.isModalOpen);
	const [svgDecorations, setSvgDecorations] = useState<SVGDecoration[]>([]);

	// Debug logs
	console.log('Hero - openModal function:', openModal);
	console.log('Hero - isModalOpen:', isModalOpen);

	const handleGetEarlyAccess = useCallback(() => {
		console.log('Get early access button clicked!');
		console.log('About to call openModal...');
		openModal();
		console.log('openModal called');
	}, [openModal]);

	return (
		<div className="mt-16 pb-0 px-0 relative" aria-labelledby="hero-heading">
			{/* Background SVGs - marked as decorative */}
			{/* Left SVG */}
			<div
				className="absolute left-0 top-[18rem] xl:top-40 w-1/2 h-[36rem] xl:h-[42rem] z-[-1] overflow-hidden hidden lg:flex flex-col justify-center items-start"
				aria-hidden="true"
			>
				<img
					src="/images/backgrounds/left.svg"
					alt=""
					className="w-auto h-[24rem] opacity-20"
					role="presentation"
				/>
			</div>

			{/* Right SVG */}
			<div
				className="absolute right-0 top-[18rem] xl:top-40 w-1/2 h-[36rem] xl:h-[42rem] z-[-1] overflow-hidden hidden lg:flex flex-col justify-center items-end"
				aria-hidden="true"
			>
				<img
					src="/images/backgrounds/right.svg"
					alt=""
					className="w-auto h-[24rem] opacity-20"
					role="presentation"
				/>
			</div>

			{/* Hero Content */}
			<div className="p-4 lg:p-8 mb-0 relative z-10">
				<div className="max-w-4xl mx-auto space-y-6 md:space-y-8 text-center">
					{/* Badge */}
					<div role="region" aria-label="Product positioning">
						<Badge variant="primary-light">Designed for people Managers</Badge>
					</div>

					{/* Main Heading - FIXED: Only H1 on the page */}
					<h1 id="hero-heading" className="marketing-display relative">
						Track and improve your team&apos;s performance,
						<span className="relative inline-block ml-2">
							enjoyably.
							<EnjoyablyUnderline />
						</span>
					</h1>

					{/* Subtitle - Changed from h2 to p for proper hierarchy */}
					<p className="marketing-body-lg max-w-xs md:max-w-md mx-auto lg:pb-4 pt-4">
						Score your team&apos;s key actions and watch live performance data
						unfold.
					</p>

					{/* Action Buttons */}
					<div className="flex flex-col lg:flex-row justify-center gap-4 py-2 lg:py-0">
						<Button
							size="xl"
							variant="primary"
							className="btn-rounded w-full md:w-min mx-auto cursor-pointer"
							onClick={handleGetEarlyAccess}
							aria-describedby="cta-description"
						>
							Get early access
							<ArrowRight aria-hidden="true" />
						</Button>
						<div id="cta-description" className="sr-only">
							Opens the early access signup form in a modal
						</div>
					</div>
				</div>
			</div>

			{/* Team Introduction Section */}
			<div
				className="relative mt-4 xl:-mt-8 z-10"
				aria-labelledby="team-intro-heading"
			>
				{/* Main Hero Section */}
				<div className="relative overflow-hidden">
					{/* Background Container */}
					<div className="rounded-3xl lg:rounded-[4rem] px-4 lg:px-16">
						<div className="">
							<div className="grid grid-cols-1 lg:grid-cols-7 gap-0 items-center">
								{/* Left Side - Justy Character */}
								<div className="hidden lg:flex col-span-2 items-end justify-center">
									<div className="marketing-body-xs text-muted-foreground w-[12rem] text-right">
										<strong>Justy</strong> is a Team Manager that cares about
										efficiency and productivity.
									</div>
									<div className="relative h-[21rem] w-[8rem]">
										<Image
											src="/images/illustrations/justy-thinking.svg"
											alt="Illustration of Justy, a team manager focused on efficiency and productivity"
											fill
											className="object-contain"
											priority
											sizes="100vw"
										/>
									</div>
								</div>

								{/* Center - Benefits Grid */}
								<div className="col-span-3 grid grid-cols-2 gap-4 lg:gap-8 sm:p-4 md:max-w-xl mx-auto bg-white/30 backdrop-blur-md supports-[backdrop-filter]:bg-white/30 rounded-3xl">
									{/* Accessible benefits list */}
									<div
										role="region"
										aria-labelledby="benefits-heading"
										className="col-span-2 sr-only"
									>
										<h2 id="benefits-heading">Key Benefits</h2>
									</div>

									<ul
										className="marketing-body leading-[1.3] space-y-4"
										role="list"
									>
										<li className="flex items-start gap-2 md:gap-3">
											<CircleCheckBig
												className="mt-0.5 text-primary-400 size-4 md:size-5 shrink-0"
												aria-hidden="true"
											/>
											<span>No more vague and uncomfortable reviews.</span>
										</li>
										<li className="flex items-start gap-2 md:gap-3">
											<CircleCheckBig
												className="mt-0.5 text-primary-400 size-4 md:size-5 shrink-0"
												aria-hidden="true"
											/>
											<span>No more biased and memory-based reviews.</span>
										</li>
										<li className="flex items-start gap-2 md:gap-3">
											<CircleCheckBig
												className="mt-0.5 text-primary-400 size-4 md:size-5 shrink-0"
												aria-hidden="true"
											/>
											<span>No form-filling and data entry effort.</span>
										</li>
									</ul>
									<ul
										className="marketing-body leading-[1.3] space-y-4"
										role="list"
									>
										<li className="flex items-start gap-2 md:gap-3">
											<CircleCheckBig
												className="mt-0.5 text-primary-400 size-4 md:size-5 shrink-0"
												aria-hidden="true"
											/>
											<span>AI-generated performance reviews.</span>
										</li>
										<li className="flex items-start gap-2 md:gap-3">
											<CircleCheckBig
												className="mt-0.5 text-primary-400 size-4 md:size-5 shrink-0"
												aria-hidden="true"
											/>
											<span>
												Recognise who&apos;s thriving, guide who&apos;s not,
												with data.
											</span>
										</li>
										<li className="flex items-start gap-2 md:gap-3">
											<CircleCheckBig
												className="mt-0.5 text-primary-400 size-4 md:size-5 shrink-0"
												aria-hidden="true"
											/>
											<span>Have deeper 1:1s with insights.</span>
										</li>
									</ul>
								</div>

								{/* Right Side - Justie Character */}
								<div className="hidden lg:flex col-span-2 items-end justify-center relative">
									<div className="relative h-[21rem] w-[12rem]">
										<Image
											src="/images/illustrations/justie-excited.svg"
											alt="Illustration of Justie, a multi-tasking creative team lead"
											fill
											className="object-contain"
											sizes="100vw"
											priority
										/>
									</div>
									<div className="marketing-body-xs text-foreground-weak w-[12rem]">
										<strong>Justie</strong> is a multi-tasking creative hands-on
										Team Lead that has a lot on her plate.
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Mobile characters */}
					<div className="lg:hidden relative">
						{/* Background image centered vertically behind grid */}
						<div
							className="absolute top-0 left-0 w-full h-[200px] px-4 -z-10"
							aria-hidden="true"
						>
							<Image
								src="/images/backgrounds/office.svg"
								alt=""
								fill
								className="object-contain opacity-20"
								priority
								sizes="100vw"
								role="presentation"
							/>
						</div>

						{/* Foreground grid content */}
						<div className="grid grid-cols-2 gap-4 p-4 mt-6 md:mt-8 max-w-lg mx-auto relative z-10">
							<div>
								<div className="relative h-[16rem]">
									<Image
										src="/images/illustrations/justy-thinking.svg"
										alt="Illustration of Justy, a team manager focused on efficiency and productivity"
										fill
										className="object-contain"
										priority
										sizes="100vw"
									/>
								</div>
								<div className="marketing-body-xs text-foreground-weak p-4 pb-0 max-w-[15rem] mx-auto">
									<strong>Justy</strong> is a Team Manager that cares about
									efficiency and productivity.
								</div>
							</div>
							<div>
								<div className="relative h-[16rem]">
									<Image
										src="/images/illustrations/justie-excited.svg"
										alt="Illustration of Justie, a multi-tasking creative team lead"
										fill
										className="object-contain"
										sizes="100vw"
										priority
									/>
								</div>
								<div className="marketing-body-xs text-foreground-weak p-4 pb-0 max-w-[15rem] mx-auto">
									<strong>Justie</strong> is a multi-tasking creative hands-on
									Team Lead that has a lot on her plate.
								</div>
							</div>
						</div>
					</div>

					{/* Team Description Section */}
					<div className="-mt-4 sm:mt-0 lg:pt-8 relative">
						{/* Hidden heading for screen readers */}
						<h2 id="team-intro-heading" className="sr-only">
							Meet our team personas
						</h2>

						<div className="marketing-body-xs text-muted-foreground max-w-[18rem] mx-auto text-center relative py-8 lg:py-0 z-10">
							<strong>Justy</strong> and <strong>Justie</strong> care about
							their team and being strong contributors to their organisation.
						</div>

						{/* Decorative SVG */}
						<div
							className="hidden md:flex mt-4 md:mt-0 lg:-mt-12 relative z-0 overflow-hidden justify-center"
							aria-hidden="true"
						>
							<svg
								viewBox="0 0 1469 271"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="h-auto mx-auto w-[900px] md:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] max-w-full"
								role="presentation"
								focusable="false"
							>
								<title>Decorative bottom border</title>
								<g filter="url(#filter0_f_1725_222)">
									<path
										d="M1066.22 63C828.831 63 736.717 246.836 736.635 247C736.635 247 649.385 63.0002 407.05 63H1066.22ZM1152.5 57L313.5 58L24 27H1445L1152.5 57Z"
										fill="#EAEAEA"
									/>
								</g>
								<path
									d="M1066.22 64C828.831 64 736.717 247.836 736.635 248C736.635 248 649.385 64.0002 407.05 64H16V0H1456V64H1066.22Z"
									fill="white"
								/>
								<defs>
									<filter
										id="filter0_f_1725_222"
										x="0"
										y="3"
										width="1469"
										height="268"
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
											stdDeviation="12"
											result="effect1_foregroundBlur_1725_222"
										/>
									</filter>
								</defs>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
