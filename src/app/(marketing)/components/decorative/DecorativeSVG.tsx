// components/decorative/DecorativeSVG.tsx

import React from 'react';

interface DecorativeSVGProps {
	gradient: string;
	scale: number;
}

export const DecorativeSVG: React.FC<DecorativeSVGProps> = ({
	gradient,
	scale,
}) => {
	// Generate unique gradient ID for each instance
	const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

	const getGradientDef = (gradientType: string) => {
		switch (gradientType) {
			case 'gradient1':
				return (
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="var(--tertiary-300)" />
						<stop offset="50%" stopColor="var(--secondary-300)" />
						<stop offset="100%" stopColor="var(--primary-300)" />
					</linearGradient>
				);
			case 'gradient2':
				return (
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="var(--secondary-400)" />
						<stop offset="100%" stopColor="var(--secondary-200)" />
					</linearGradient>
				);
			case 'gradient3':
				return (
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="var(--tertiary-200)" />
						<stop offset="50%" stopColor="var(--tertiary-200)" />
						<stop offset="100%" stopColor="var(--secondary-400)" />
					</linearGradient>
				);
			case 'gradient4':
				return (
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="var(--primary-400)" />
						<stop offset="100%" stopColor="var(--secondary-200)" />
					</linearGradient>
				);
			case 'gradient5':
				return (
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="var(--primary-400)" />
						<stop offset="50%" stopColor="var(--secondary-200)" />
						<stop offset="100%" stopColor="var(--tertiary-200)" />
					</linearGradient>
				);
			default:
				return (
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#8B5CF6" />
						<stop offset="100%" stopColor="#06B6D4" />
					</linearGradient>
				);
		}
	};

	return (
		<svg
			width="50"
			height="44"
			viewBox="0 0 50 44"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="opacity-20"
			style={{
				transform: `scale(${scale})`,
				transformOrigin: 'center',
			}}
		>
			<defs>{getGradientDef(gradient)}</defs>
			<path
				d="M20.0029 0C18.8426 6.71123 14.2997 11.0514 7.63213 12.2634C4.01171 12.6137 1.71937 11.9938 0 11.3066C2.08273 13.1655 3.34084 15.3225 4.66877 17.91C8.51276 27.276 1.07628 35.0808 0.628978 35.2943C2.77327 34.2321 6.81306 32.8094 12.3872 33.1317C23.9267 33.8008 29.9284 42.6255 30.4269 44C29.4496 41.3047 29.2559 37.4958 30.095 33.1317C31.6998 24.7981 39.0131 17.1148 49.6646 15.5382C49.706 15.532 50 15.5069 50 15.5069C38.2164 16.6523 31.8423 13.1124 31.8423 13.1124C23.092 8.84039 20.8359 2.09527 20.0029 0Z"
				fill={`url(#${gradientId})`}
			/>
		</svg>
	);
};
