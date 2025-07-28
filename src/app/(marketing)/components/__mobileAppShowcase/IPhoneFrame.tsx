'use client';

import React from 'react';
import Image from 'next/image';

interface IPhoneFrameProps {
	screenSrc: string;
	screenAlt: string;
	showFrame?: boolean;
	useContainerSizing?: boolean;
	className?: string;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
	screenSrc,
	screenAlt,
	showFrame = true,
	useContainerSizing = false,
	className = '',
}) => {
	if (useContainerSizing) {
		// Container-based sizing - fills parent container
		return (
			<div
				className={`relative w-full h-full flex items-center justify-center ${className}`}
			>
				{showFrame ? (
					// With iPhone frame - scales to container height, no notch
					<div className="relative h-full aspect-[9/19.5] scale-125">
						{/* iPhone frame background */}
						<div className="absolute inset-0 bg-neutral-900 rounded-[1.5rem] p-1 shadow-xl">
							{/* Screen container - no notch, clean design */}
							<div className="relative w-full h-full bg-black rounded-[1.25rem] overflow-hidden">
								<Image
									src={screenSrc}
									alt={screenAlt}
									fill
									className="object-cover"
									sizes="200px"
									priority
								/>
							</div>
						</div>
					</div>
				) : (
					// Without frame - just the screenshot
					<div className="relative w-full h-full scale-125">
						<Image
							src={screenSrc}
							alt={screenAlt}
							fill
							className="object-contain rounded-lg"
							sizes="(max-width: 768px) 200px, 300px"
							priority
						/>
					</div>
				)}
			</div>
		);
	}

	// Default fixed sizing (original behavior)
	return (
		<div className={`relative flex items-center justify-center ${className}`}>
			{showFrame ? (
				// With iPhone frame - fixed sizing, no notch
				<div className="relative w-[280px] h-[580px] md:w-[300px] md:h-[620px]">
					{/* iPhone frame background */}
					<div className="absolute inset-0 bg-neutral-900 rounded-[2.5rem] p-2 shadow-2xl">
						{/* Screen container - no notch */}
						<div className="relative w-full h-full bg-black rounded-[2rem] overflow-hidden">
							<Image
								src={screenSrc}
								alt={screenAlt}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 280px, 300px"
								priority
							/>
						</div>
					</div>
				</div>
			) : (
				// Without frame - just the screenshot with fixed sizing
				<div className="relative w-[260px] h-[560px] md:w-[280px] md:h-[600px]">
					<Image
						src={screenSrc}
						alt={screenAlt}
						fill
						className="object-contain rounded-lg"
						sizes="(max-width: 768px) 260px, 280px"
						priority
					/>
				</div>
			)}
		</div>
	);
};
