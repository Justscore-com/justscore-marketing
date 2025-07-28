'use client';

import React, { useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/core/Badge';
import { Button } from '@/components/ui/core/Button';
import { useEarlyAdoptersStore } from '@/store/early-adopters-store';

// Props interface
interface StartReminderProps {
	className?: string;
}

export function StartReminder({ className = '' }: StartReminderProps) {
	const openModal = useEarlyAdoptersStore(state => state.openModal);
	const isModalOpen = useEarlyAdoptersStore(state => state.isModalOpen);

	// Debug logs
	console.log('StartReminder - openModal function:', openModal);
	console.log('StartReminder - isModalOpen:', isModalOpen);

	const handleGetEarlyAccess = useCallback(() => {
		console.log('Get early access button clicked from StartReminder!');
		console.log('About to call openModal...');
		openModal();
		console.log('openModal called from StartReminder');
	}, [openModal]);

	return (
		<section
			className={`relative pt-64 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-tertiary-300 via-secondary-300 to-primary-300 overflow-hidden rounded-b-3xl ${className}`}
			aria-labelledby="cta-heading"
			role="region"
		>
			{/* Decorative top border */}
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2"
				aria-hidden="true"
			>
				<svg
					width="726"
					height="184"
					viewBox="0 0 726 184"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					role="presentation"
				>
					<title>Decorative section divider</title>
					<path
						d="M34.0456 0C-208.289 0 930.711 0 693.216 0C455.721 0 363.631 184 363.631 184C363.631 184 276.381 0 34.0456 0Z"
						fill="white"
					/>
				</svg>
			</div>

			<div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
				{/* Main content */}
				<header className="pb-8 lg:pb-12">
					{/* Hidden section description for screen readers */}
					<div className="sr-only">
						<p>
							Final call-to-action section encouraging users to sign up for
							early access to JustScore.
						</p>
					</div>

					<h2 id="cta-heading" className="space-y-4">
						<span className="block marketing-h5 text-primary-950">
							Unlock your potential.
						</span>
						<span className="block marketing-h1 text-primary-950">
							Multiply your impact.
						</span>
					</h2>
				</header>

				{/* CTA Button */}
				<div
					className="flex flex-col sm:flex-row justify-center gap-4"
					role="group"
					aria-labelledby="cta-actions-heading"
				>
					{/* Hidden heading for screen readers */}
					<h3 id="cta-actions-heading" className="sr-only">
						Get Started Actions
					</h3>

					<Button
						size="xl"
						variant="primary"
						className="btn-rounded w-full sm:w-auto cursor-pointer"
						onClick={handleGetEarlyAccess}
						aria-describedby="cta-button-description"
					>
						Get early access
						<ArrowRight aria-hidden="true" />
					</Button>

					{/* Button description for screen readers */}
					<div id="cta-button-description" className="sr-only">
						Sign up for priority early access to JustScore and receive exclusive
						updates on new features
					</div>
				</div>

				{/* Description */}
				<div className="max-w-lg mx-auto pt-4">
					<p className="marketing-body" id="cta-benefits">
						Receive early access and stay ahead of the curve.
					</p>

					{/* Additional context for screen readers */}
					<div className="sr-only">
						<p>
							By signing up for early access, you&apos;ll be among the first to
							experience JustScore&apos;s innovative performance management
							platform when it launches. You&apos;ll also receive exclusive
							updates about new features and beta testing opportunities.
						</p>
					</div>
				</div>

				{/* Value proposition for screen readers */}
				<div className="sr-only">
					<h3>Why Get Early Access?</h3>
					<ul>
						<li>Priority access when JustScore launches</li>
						<li>Exclusive feature updates and announcements</li>
						<li>Opportunity to participate in beta testing</li>
						<li>Shape the future of performance management tools</li>
						<li>Get ahead of your competition with innovative solutions</li>
					</ul>
				</div>
			</div>

			{/* Additional decorative elements */}
			<div
				className="absolute inset-0 overflow-hidden pointer-events-none"
				aria-hidden="true"
			>
				{/* Subtle gradient overlays */}
				<div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary-25 to-transparent opacity-30"></div>
				<div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-secondary-25 to-transparent opacity-30"></div>
			</div>

			{/* Success metrics for screen readers */}
			<div className="sr-only">
				<h3>What Others Are Saying</h3>
				<p>
					Join thousands of managers who are already preparing to transform
					their performance management approach with JustScore. Be part of the
					solution that&apos;s designed by managers, for managers.
				</p>
			</div>

			{/* Social proof for screen readers */}
			<div className="sr-only">
				<h3>Trusted by Forward-Thinking Organizations</h3>
				<p>
					JustScore is being developed with input from experienced managers
					across various industries, ensuring it meets real-world needs and
					challenges.
				</p>
			</div>
		</section>
	);
}
