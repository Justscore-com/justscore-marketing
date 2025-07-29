import { Hero } from '@/app/(marketing)/sections/Hero';
import { Meet } from '@/app/(marketing)/sections/Meet';
import { Footer } from '@/app/(marketing)/sections/Footer';
import { AppDemoSectionTabs } from '@/app/(marketing)/sections/AppDemoSectionTabs';

// ✅ ADD: Early Adopters Flow Integration
import { EarlyAdoptersFlow } from '@/app/(marketing)/components/early-adopters/EarlyAdoptersFlow';
import { Differences } from '@/app/(marketing)/sections/Differences';
import { StartReminder } from '@/app/(marketing)/sections/StartReminder';

export default function HomePage() {
	return (
		<>
			<Hero />
			<Meet />
			<AppDemoSectionTabs />
			<Differences />
			<StartReminder />
			<Footer />

			{/* Early Adopters Modal - enables the entire flow */}
			<EarlyAdoptersFlow />
		</>
	);
}
