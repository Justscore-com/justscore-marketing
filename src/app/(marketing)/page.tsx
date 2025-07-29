import { Hero } from '@/app/(marketing)/sections/Hero';
import { Meet } from '@/app/(marketing)/sections/Meet';
import { Footer } from '@/app/(marketing)/sections/Footer';
import { AppDemoSectionTabs } from '@/app/(marketing)/sections/AppDemoSectionTabs';

// ✅ ADD: Early Adopters Flow Integration
import { EarlyAdoptersFlow } from '@/app/(marketing)/components/early-adopters/EarlyAdoptersFlow';
import { Differences } from '@/app/(marketing)/sections/Differences';
import { StartReminder } from '@/app/(marketing)/sections/StartReminder';
import ComingSoonPage from './ComingSoonPage';
interface PageProps {
	searchParams: { [key: string]: string | string[] | undefined };
}
export default function HomePage({ searchParams }: PageProps) {
	const isPreview = searchParams.preview === 'preview';
	return (
		<>
			{!isPreview ? (
				<ComingSoonPage />
			) : (
				<div>
					<Hero />
					<Meet />
					<AppDemoSectionTabs />
					<Differences />
					<StartReminder />
					<Footer />

					{/* Early Adopters Modal - enables the entire flow */}
					<EarlyAdoptersFlow />
				</div>
			)}
		</>
	);
}
