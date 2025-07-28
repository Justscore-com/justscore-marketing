'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/core/Button';
import { useEarlyAdoptersStore } from '@/store/early-adopters-store';
import {
	CheckCircle,
	Share2,
	Copy,
	ExternalLink,
	Sparkles,
	Mail,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Simple confetti implementation
const createConfetti = () => {
	const colors = [
		'#9ECC9A',
		'#8AD0F7',
		'#77ABF9',
		'#FFD700',
		'#FF6B6B',
		'#4ECDC4',
	];
	const confettiContainer = document.createElement('div');
	confettiContainer.style.position = 'fixed';
	confettiContainer.style.top = '0';
	confettiContainer.style.left = '0';
	confettiContainer.style.width = '100%';
	confettiContainer.style.height = '100%';
	confettiContainer.style.pointerEvents = 'none';
	confettiContainer.style.zIndex = '9999';
	confettiContainer.setAttribute('aria-hidden', 'true');

	for (let i = 0; i < 50; i++) {
		const confetti = document.createElement('div');
		confetti.style.position = 'absolute';
		confetti.style.width = Math.random() * 10 + 5 + 'px';
		confetti.style.height = confetti.style.width;
		confetti.style.backgroundColor =
			colors[Math.floor(Math.random() * colors.length)];
		confetti.style.left = Math.random() * 100 + '%';
		confetti.style.top = '-10px';
		confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
		confetti.style.opacity = Math.random() * 0.8 + 0.2 + '';
		confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

		// Animation
		const duration = Math.random() * 3000 + 2000;
		const finalLeft = Math.random() * 100;
		const rotation = Math.random() * 720 - 360;

		confetti.animate(
			[
				{
					transform: `translateY(0px) rotate(${Math.random() * 360}deg)`,
					opacity: confetti.style.opacity,
				},
				{
					transform: `translateY(${window.innerHeight + 10}px) translateX(${(finalLeft - parseInt(confetti.style.left)) * 2}px) rotate(${rotation}deg)`,
					opacity: '0',
				},
			],
			{
				duration: duration,
				easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			}
		);

		confettiContainer.appendChild(confetti);
	}

	document.body.appendChild(confettiContainer);

	// Clean up after animation
	setTimeout(() => {
		if (document.body.contains(confettiContainer)) {
			document.body.removeChild(confettiContainer);
		}
	}, 5000);
};

const Step5Success: React.FC = () => {
	const { formData, hasShared, markAsShared, closeModal } =
		useEarlyAdoptersStore();

	// Refs for announcements
	const successAnnouncementRef = useRef<HTMLDivElement>(null);

	const handleClose = useCallback(() => {
		// Announce modal closure
		const announcer = document.createElement('div');
		announcer.setAttribute('aria-live', 'polite');
		announcer.className = 'sr-only';
		announcer.textContent = 'Registration complete. Modal closing.';

		document.body.appendChild(announcer);

		setTimeout(() => {
			if (document.body.contains(announcer)) {
				document.body.removeChild(announcer);
			}
			closeModal();
		}, 1000);
	}, [closeModal]);

	// Success effect and announcements on mount
	useEffect(() => {
		// Announce success immediately
		if (successAnnouncementRef.current) {
			successAnnouncementRef.current.textContent = `Registration successful! Welcome to JustScore early access. Your email ${formData.email} has been registered.`;
		}

		// Create confetti effect after a short delay
		const confettiTimer = setTimeout(() => {
			createConfetti();
		}, 300);

		// Focus management - focus the main heading
		const focusTimer = setTimeout(() => {
			const heading = document.querySelector(
				'h2[class*="display-1"]'
			) as HTMLElement;
			if (heading) {
				heading.focus();
			}
		}, 500);

		return () => {
			clearTimeout(confettiTimer);
			clearTimeout(focusTimer);
		};
	}, [formData.email]);

	return (
		<div className="space-y-2 text-center">
			{/* Hidden heading for screen readers */}
			<h2 className="sr-only">Registration Successful</h2>

			{/* Success message */}
			<div className="space-y-1 pt-4">
				<h2 className="marketing-h3" tabIndex={-1} aria-live="polite">
					You&apos;re on the list!
				</h2>
				<p className="marketing-body max-w-md mx-auto">
					<span className="sr-only">Your registered email is: </span>
					{formData.email}
				</p>
			</div>

			{/* What happens next */}
			<div aria-labelledby="next-steps-heading" className="py-6">
				<div className="space-y-1">
					<h3 id="next-steps-heading" className="marketing-h6">
						What&apos;s next?
					</h3>
					<p className="caption text-foreground-weak">
						We&apos;ll notify you as soon as early access is available.
					</p>
				</div>
			</div>

			{/* Social Media Section - Improved */}
			<div className="space-y-4" aria-labelledby="social-section-heading">
				{/* Hidden heading for screen readers */}
				<h2 id="social-section-heading" className="marketing-h6">
					Follow us
				</h2>

				<nav
					className="flex flex-wrap gap-4 justify-center items-center"
					aria-label="Social media links"
					role="navigation"
				>
					<Link
						href="https://www.linkedin.com/company/justscorehq"
						className="bg-primary-950 flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-full p-2"
						aria-label="Follow JustScore on LinkedIn"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="relative size-4">
							<Image
								src="/icons/linkedin.svg"
								alt=""
								fill
								className="object-contain text-neutral-50"
								sizes="28px"
								role="presentation"
							/>
						</div>
						<span className="sr-only">LinkedIn (opens in new tab)</span>
					</Link>

					<Link
						href="https://x.com/justscorehq"
						className="bg-primary-950 flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-full p-2"
						aria-label="Follow JustScore on X (formerly Twitter)"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="relative size-4">
							<Image
								src="/icons/x.svg"
								alt=""
								fill
								className="object-contain text-neutral-50"
								sizes="28px"
								role="presentation"
							/>
						</div>
						<span className="sr-only">
							X formerly Twitter (opens in new tab)
						</span>
					</Link>

					<Link
						href="https://www.tiktok.com/@justscorehq"
						className="bg-primary-950 flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-full p-2"
						aria-label="Follow JustScore on TikTok"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="relative size-4">
							<Image
								src="/icons/tiktok.svg"
								alt=""
								fill
								className="object-contain text-neutral-50"
								sizes="28px"
								role="presentation"
							/>
						</div>
						<span className="sr-only">TikTok (opens in new tab)</span>
					</Link>

					<Link
						href="https://www.instagram.com/justscorehq/"
						className="bg-primary-950 flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-full p-2"
						aria-label="Follow JustScore on Instagram"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="relative size-4">
							<Image
								src="/icons/instagram.svg"
								alt=""
								fill
								className="object-contain text-neutral-50"
								sizes="28px"
								role="presentation"
							/>
						</div>
						<span className="sr-only">Instagram (opens in new tab)</span>
					</Link>
				</nav>

				{/* Additional context for screen readers */}
				<div className="sr-only">
					<p>
						Connect with JustScore on social media for the latest updates,
						performance management tips, and product announcements.
					</p>
				</div>
			</div>

			{/* Close button */}
			<div className="flex justify-between items-center pt-8">
				<Button
					variant="primary"
					size="lg"
					className="w-full"
					onClick={handleClose}
					aria-describedby="close-button-help"
				>
					Done
				</Button>
				<div id="close-button-help" className="sr-only">
					Close the registration modal and return to the main page
				</div>
			</div>

			{/* Live regions for announcements */}
			<div
				ref={successAnnouncementRef}
				aria-live="assertive"
				aria-atomic="true"
				className="sr-only"
				role="status"
			/>

			{/* Instructions for screen readers */}
			<div className="sr-only">
				<p>
					Registration completed successfully. You can now share your
					registration on social media or copy a link to share. Click the Done
					button to close this dialog and return to the main page.
				</p>
			</div>
		</div>
	);
};

export default Step5Success;
