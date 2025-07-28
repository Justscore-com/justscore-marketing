import type { Metadata } from 'next';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ClientToaster } from '@/components/ui/core/Toast/ClientToaster';
import Providers from '@/app/components/Provider';

export const metadata: Metadata = {
	title: 'JustScore',
	description: 'Performance Management Platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Preload critical font variants for optimal performance */}
				<link
					rel="preload"
					href="/fonts/GeneralSans-Regular.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/GeneralSans-Semibold.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/GeneralSans-Medium.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				{/* Preload serif font if used above the fold */}
				<link
					rel="preload"
					href="/fonts/MontaguSlab-Light.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				{/* DNS prefetch for better performance */}
				<link rel="dns-prefetch" href="//fonts.googleapis.com" />
			</head>
			<body className="antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
					storageKey="ui-theme"
				>
					<Providers>
						{children}
						<ClientToaster />
					</Providers>
				</ThemeProvider>
				<script
					type="text/javascript"
					id="hs-script-loader"
					async
					defer
					src="//js-eu1.hs-scripts.com/146397770.js"
				></script>
			</body>
		</html>
	);
}
