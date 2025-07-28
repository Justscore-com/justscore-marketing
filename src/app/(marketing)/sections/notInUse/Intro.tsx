'use client';

import React from 'react';
import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';

export const Intro: React.FC = () => {
	return (
		<div className="relative -mt-8">
			{/* Main Hero Section */}
			<div className="relative overflow-hidden">
				{/* Background Container */}
				<div className="rounded-3xl lg:rounded-[4rem] px-6 lg:px-16">
					<div className="">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-center">
							{/* Left Side */}
							<div className="flex items-end justify-center">
								<div className="marketing-body-xs text-muted-foreground w-[12rem] text-right">
									<strong>Justy</strong> is a Team Manager that cares about
									efficiency.
								</div>
								<div className="relative h-[21rem] w-[8rem]">
									<Image
										src="/images/illustrations/justy-thinking.svg"
										alt="Hero Visual"
										fill
										className="object-contain"
										priority
										sizes="100vw"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-8">
								<ul className="marketing-body space-y-4">
									<li className="flex items-start gap-3">
										<BadgeCheck
											className="mt-1 text-tertiary-400 size-5 shrink-0"
											size={20}
										/>
										<span>No more inaccurate and tedious assessments</span>
									</li>
									<li className="flex items-start gap-3">
										<BadgeCheck
											className="mt-1 text-tertiary-400 size-5 shrink-0"
											size={20}
										/>
										<span>No data entry</span>
									</li>
									<li className="flex items-start gap-3">
										<BadgeCheck
											className="mt-1 text-tertiary-400 size-5 shrink-0"
											size={20}
										/>
										<span>No typing/admin</span>
									</li>
								</ul>
								<ul className="marketing-body space-y-4">
									<li className="flex items-start gap-3">
										<BadgeCheck
											className="mt-1 text-tertiary-400 size-5 shrink-0"
											size={20}
										/>
										<span>Auto generated performance reviews</span>
									</li>
									<li className="flex items-start gap-3">
										<BadgeCheck
											className="mt-1 text-tertiary-400 size-5 shrink-0"
											size={20}
										/>
										<span>
											Recognise who’s thriving, <br />
											guide who’s not
										</span>
									</li>
									<li className="flex items-start gap-3">
										<BadgeCheck
											className="mt-1 text-tertiary-400 size-5 shrink-0"
											size={20}
										/>
										<span>Elevate 1:1’s with insights</span>
									</li>
								</ul>
							</div>
							{/* Right Side */}
							<div className="relative flex items-end justify-center">
								{/* Image shifted left */}
								<div className="relative h-[21rem] w-[12rem]">
									<Image
										src="/images/illustrations/justie-excited.svg"
										alt="Hero Visual"
										fill
										className="object-contain"
										sizes="100vw"
										priority
									/>
								</div>
								<div className="marketing-body-xs text-foreground-weak w-[12rem]">
									<strong>Justie</strong> is a creative hands-on Team Lead that
									has no time to waste.
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Decorative SVG Bottom */}
				<div className="relative pt-16">
					<div className="marketing-body-xs text-muted-foreground max-w-[15rem] mx-auto text-center relative pt-8 z-10">
						Justy and Justie care about their team and being the best managers
						they can be.
					</div>
					<div className="-mt-12 relative z-0">
						<svg
							width="1469"
							height="271"
							viewBox="0 0 1469 271"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mx-auto"
						>
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
	);
};
