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
				{/* Google Tag Manager */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','GTM-5X8NMTFR');`,
					}}
				/>
				{/* End Google Tag Manager */}
				{/* Hotjar Tracking Code */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(h,o,t,j,a,r){
						h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
						h._hjSettings={hjid:6483401,hjsv:6};
						a=o.getElementsByTagName('head')[0];
						r=o.createElement('script');r.async=1;
						r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
						a.appendChild(r);
					})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
					}}
				/>

				{/* Start of HubSpot Embed Code */}
				<script
					type="text/javascript"
					id="hs-script-loader"
					async
					defer
					src="//js-eu1.hs-scripts.com/146397770.js"
				></script>
				{/* End of HubSpot Embed Code */}

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
				<link rel="dns-prefetch" href="//www.googletagmanager.com" />
			</head>
			<body className="antialiased">
				{/* Google Tag Manager (noscript) */}
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-5X8NMTFR"
						height="0"
						width="0"
						style={{ display: 'none', visibility: 'hidden' }}
					/>
				</noscript>
				{/* End Google Tag Manager (noscript) */}

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
			</body>
		</html>
	);
}
