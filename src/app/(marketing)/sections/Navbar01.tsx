'use client';

import * as React from 'react';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { BrandLogo } from '@/components/logo/BrandLogo';
import { Button } from '@/components/ui/core/Button';
import { cn } from '@/lib/utils';
import { useEarlyAdoptersStore } from '@/store/early-adopters-store';

// Hook
function useScrolled(threshold = 0) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > threshold);
		};
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [threshold]);

	return scrolled;
}

// NavLink with enhanced accessibility
const NavLink = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & {
		children: React.ReactNode;
	}
>(({ className, children, ...props }, ref) => (
	<Link
		ref={ref}
		className={cn(
			'text-sm font-medium text-foreground-weak hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-sm px-2 py-1',
			className
		)}
		{...props}
	>
		{children}
	</Link>
));
NavLink.displayName = 'NavLink';

// Main Navbar Component
export const Navbar = () => {
	const scrolled = useScrolled(2);
	const openModal = useEarlyAdoptersStore(state => state.openModal);
	const isModalOpen = useEarlyAdoptersStore(state => state.isModalOpen);

	// Debug logs
	console.log('Navbar - openModal function:', openModal);
	console.log('Navbar - isModalOpen:', isModalOpen);

	const handleGetEarlyAccess = useCallback(() => {
		console.log('Get early access button clicked from Navbar!');
		console.log('About to call openModal...');
		openModal();
		console.log('openModal called from Navbar');
	}, [openModal]);

	return (
		<nav
			id="primary-navigation"
			className={cn(
				'w-full max-w-8xl px-4 sm:px-8 pb-1 z-40 fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 rounded-b-4xl transition-shadow',
				scrolled && 'shadow-sm'
			)}
			role="navigation"
			aria-label="Primary navigation"
		>
			<div className="flex h-16 items-center justify-between">
				{/* LEFT - Logo */}
				<div className="flex items-center gap-12">
					<Link
						href="/"
						aria-label="JustScore home page"
						className="focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-sm"
					>
						<BrandLogo
							variant="default"
							size="base"
							className="text-primary-950"
						/>
					</Link>
				</div>

				{/* RIGHT - Contact and CTA */}
				<div className="flex items-center gap-6 mt-1">
					<div className="flex items-center gap-6">
						<NavLink
							href="mailto:hello@justscore.com?subject=Hello%20Justscore team"
							className="text-xs transition-all duration-300"
						>
							Contact us
						</NavLink>

						<div
							className={cn(
								'overflow-hidden transition-all duration-300 ease-out',
								scrolled ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
							)}
						>
							<Button
								variant="primary"
								size="sm"
								className={cn(
									'text-xs rounded-full px-4 pb-0 cursor-pointer transition-all duration-300 ease-out whitespace-nowrap',
									scrolled
										? 'translate-x-0 opacity-100'
										: 'translate-x-8 opacity-0'
								)}
								onClick={handleGetEarlyAccess}
								aria-describedby="navbar-cta-description"
							>
								Get early access
							</Button>
							<div id="navbar-cta-description" className="sr-only">
								Open early access signup form
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Screen reader navigation announcement */}
			<div className="sr-only">
				<p>
					Main navigation bar with JustScore logo, contact link, and
					call-to-action button.
					{scrolled && ' Scroll-activated early access button is now visible.'}
				</p>
			</div>
		</nav>
	);
};
