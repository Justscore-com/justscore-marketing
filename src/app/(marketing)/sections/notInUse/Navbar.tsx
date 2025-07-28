'use client';

import * as React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { BrandLogo } from '@/components/logo/BrandLogo';
import { Button } from '@/components/ui/core/Button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navConfig } from '@/app/(marketing)/config/navigation-config';

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

// NavLink
const NavLink = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => (
	<Link
		ref={ref}
		className={cn(
			'text-sm font-medium text-foreground-weak hover:text-foreground transition-colors duration-200',
			className
		)}
		{...props}
	>
		{children}
	</Link>
));
NavLink.displayName = 'NavLink';

// Desktop Navigation
const DesktopNavigation = () => (
	<nav className="hidden lg:flex items-center gap-8 mt-1">
		{navConfig.mainLinks.map(link => (
			<NavLink key={link.title} href={link.href} className="text-xs">
				{link.title}
			</NavLink>
		))}
	</nav>
);

// Mobile Navigation
const MobileNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="lg:hidden">
			<Button
				variant="ghost"
				size="sm"
				onClick={() => setIsOpen(!isOpen)}
				className="p-2"
				aria-label="Toggle menu"
			>
				{isOpen ? <X size={20} /> : <Menu size={20} />}
			</Button>

			{isOpen && (
				<div className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md border-b border-border-weak/50 shadow-lg supports-[backdrop-filter]:bg-white/70 z-30">
					<nav className="container mx-auto px-4 py-4 space-y-4">
						{navConfig.mainLinks.map(link => (
							<NavLink
								key={link.title}
								href={link.href}
								className="block py-2"
								onClick={() => setIsOpen(false)}
							>
								{link.title}
							</NavLink>
						))}

						<div className="pt-4 space-y-3 border-t border-border-weak">
							<NavLink href="#" className="block py-2">
								Get the Mobile App
							</NavLink>
							<NavLink href="#" className="block py-2">
								Watch a demo
							</NavLink>

							<div className="pt-2 space-y-3">
								<SignedOut>
									<Button
										variant="neutral"
										size="sm"
										className="w-full"
										asChild
									>
										<Link href="/sign-in">Sign in</Link>
									</Button>
									<Button
										variant="primary"
										size="sm"
										className="w-full"
										asChild
									>
										<Link href="/sign-up">Sign up</Link>
									</Button>
								</SignedOut>
								<SignedIn>
									<Button
										variant="primary"
										size="sm"
										className="w-full"
										asChild
									>
										<Link href="/dashboard">Dashboard</Link>
									</Button>
								</SignedIn>
							</div>
						</div>
					</nav>
				</div>
			)}
		</div>
	);
};

// Navbar
export const Navbar = () => {
	const scrolled = useScrolled(2);

	return (
		<header
			className={cn(
				'w-full max-w-8xl px-0 sm:px-8 pb-1 z-40 fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 rounded-b-4xl transition-shadow',
				scrolled && 'shadow-sm'
			)}
		>
			<div className="flex h-16 items-center justify-between">
				{/* LEFT */}
				<div className="flex items-center gap-8">
					<BrandLogo variant="logotype" size="sm" />
					<DesktopNavigation />
				</div>

				{/* RIGHT */}
				<div className="flex items-center gap-6 mt-1">
					<div className="hidden lg:flex items-center gap-6">
						<NavLink href="#" className="text-xs">
							Get the Mobile App
						</NavLink>
						<NavLink href="#" className="text-xs">
							Watch a demo
						</NavLink>
					</div>

					<div className="hidden lg:flex items-center gap-3">
						<SignedOut>
							<Button
								variant="ghost"
								size="sm"
								className="text-xs rounded-full px-4 pb-0"
								asChild
							>
								<Link href="/sign-in">Sign in</Link>
							</Button>
							<Button
								variant="primary"
								size="sm"
								className="text-xs rounded-full px-4 pb-0"
								asChild
							>
								<Link href="/sign-up">Sign up</Link>
							</Button>
						</SignedOut>
						<SignedIn>
							<Button
								variant="primary"
								size="sm"
								className="text-xs rounded-full px-4 pb-0"
								asChild
							>
								<Link href="/dashboard">Dashboard</Link>
							</Button>
						</SignedIn>
					</div>

					<MobileNavigation />
				</div>
			</div>
		</header>
	);
};
