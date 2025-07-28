'use client';

import { BrandLogo } from '@/components/logo/BrandLogo';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
	return (
		<footer
			className="w-full px-4 py-8 lg:p-8 bg-gradient-to-br from-primary-950 to-neutral-950 text-background -mt-8"
			role="contentinfo"
			aria-label="Site footer"
		>
			<div className="flex flex-col-reverse md:flex-row gap-12 justify-between items-start pt-8">
				{/* Brand and Legal Section */}
				<div
					className="space-y-4 lg:space-y-2 w-full md:w-auto"
					aria-labelledby="brand-section-heading"
				>
					{/* Hidden heading for screen readers */}
					<h2 id="brand-section-heading" className="sr-only">
						JustScore Brand and Legal Information
					</h2>

					<div className="w-min mx-auto md:mx-0">
						<Link
							href="/"
							aria-label="JustScore home page"
							className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-sm"
						>
							<BrandLogo variant="icon" size="xl" color="light" />
						</Link>
					</div>

					<p className="text-sm text-neutral-500 pt-2 text-center md:text-left">
						<span className="sr-only">Copyright information: </span>© 2025
						JustScore Ltd. All rights reserved.
					</p>

					{/* Commented out legal links preserved as in original */}
					{/* <div className="flex flex-row gap-4 sm:gap-6 marketing-body-sm items-center w-full justify-center md:justify-start md:items-start">
            <Link 
              href="/" 
              className="text-neutral-300 hover:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-sm px-1"
            >
              Terms of service
            </Link>
            <Link 
              href="/" 
              className="text-neutral-300 hover:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-sm px-1"
            >
              Privacy Policy
            </Link>
          </div> */}
				</div>

				{/* Social Media Section */}
				<div
					className="space-y-4 w-full md:w-auto"
					aria-labelledby="social-section-heading"
				>
					{/* Hidden heading for screen readers */}
					<h2 id="social-section-heading" className="sr-only">
						Follow JustScore on Social Media
					</h2>

					<nav
						className="flex flex-wrap justify-center md:justify-end gap-8 marketing-body-sm items-center text-neutral-100"
						aria-label="Social media links"
						role="navigation"
					>
						<Link
							href="https://www.linkedin.com/company/justscorehq"
							className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-sm p-1"
							aria-label="Follow JustScore on LinkedIn"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="relative size-5 group-hover:scale-110 transition-transform duration-200">
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
							className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-sm p-1"
							aria-label="Follow JustScore on X (formerly Twitter)"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="relative size-5 group-hover:scale-110 transition-transform duration-200">
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
							className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-sm p-1"
							aria-label="Follow JustScore on TikTok"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="relative size-5 group-hover:scale-110 transition-transform duration-200">
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
							className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-950 rounded-sm p-1"
							aria-label="Follow JustScore on Instagram"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="relative size-5 group-hover:scale-110 transition-transform duration-200">
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
			</div>

			{/* Additional footer context for screen readers */}
			<div className="sr-only">
				<h2>About JustScore</h2>
				<p>
					JustScore is a performance management platform designed by managers,
					for managers. We help teams track performance in real-time and
					generate AI-powered reviews.
				</p>
			</div>
		</footer>
	);
};
