import { ReactNode } from 'react';
import { Navbar } from './sections/Navbar01';
import '@/styles/globals-marketing.css';
// import { MobileBottomNav } from "@/app/(marketing)/sections/MobileBottomNav";

export default function MarketingLayout({ children }: { children: ReactNode }) {
	return (
		<div suppressHydrationWarning>
			{/* Skip to main content link for keyboard users */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
			>
				Skip to main content {/* TODO: Add a link to the main content */}
			</a>

			{/* Skip to navigation link */}
			<a
				href="#primary-navigation"
				className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-36 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
			>
				Skip to navigation
			</a>

			{/* Header landmark with navigation */}
			{/* <header role="banner" className="relative z-40">
				<Navbar />
			</header> */}

			{/* Main content landmark */}
			<main id="main-content" role="main" className="relative" tabIndex={-1}>
				{children}
			</main>

			{/* Footer will be added by the page components, but we ensure proper landmark structure */}

			{/* Mobile bottom navigation - currently commented out but preserved structure */}
			{/* <nav 
        role="navigation" 
        aria-label="Mobile bottom navigation"
        className="h-16 lg:hidden"
      >
        <MobileBottomNav />
      </nav> */}
		</div>
	);
}
