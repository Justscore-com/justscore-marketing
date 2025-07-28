'use client';

import React from 'react';
import { TabsStoriesGrid } from '@/app/(marketing)/components/tabs/tabs-stories';

// Sample data configuration - replace with your actual content
const TABS_DATA = [
	{
		id: 'customer-stories',
		label: 'Unspoken Impact',
		title: 'Unspoken Impact',
		description:
			'See how our customers are transforming their team management with our platform.',
		features: [
			{
				id: 'story-enterprise',
				title: 'Global Enterprise Team',
				description:
					'How a Fortune 500 company improved team performance by 37% while reducing management overhead',
				icon: '/images/stories/01/01.svg',
				iconAlt: 'Enterprise success story',
				colSpan: 2 as const, // Type assertion to ensure it's treated as a literal type
				descriptionScene:
					'Enterprise HR leaders saw immediate ROI within 3 months',
			},
			{
				id: 'story-startup',
				title: 'Tech Startup Growth',
				description:
					'Scaling from 10 to 100 employees with consistent performance metrics and feedback loops',
				icon: '/images/stories/01/02.svg',
				iconAlt: 'Startup success story',
			},
			{
				id: 'story-remote',
				title: 'Remote-First Organization',
				description:
					'Managing distributed teams across 12 time zones with real-time performance tracking',
				icon: '/images/stories/01/03.svg',
				iconAlt: 'Remote work success story',
				descriptionScene:
					'100% remote team improved collaboration scores by 42%',
			},
			{
				id: 'story-nonprofit',
				title: 'Nonprofit Impact',
				description:
					'Stretching limited resources to maximize mission delivery through data-driven performance insights',
				icon: '/images/stories/01/04.svg',
				iconAlt: 'Nonprofit success story',
				colSpan: 2 as const, // Type assertion to ensure it's treated as a literal type
			},
		],
	},
	{
		id: 'use-cases',
		label: 'When Memory Fails',
		title: 'When Memory Fails',
		description:
			'Discover the many ways our platform can be tailored to your specific needs.',
		features: [
			{
				id: 'case-onboarding',
				title: 'New Employee Onboarding',
				description:
					'Streamline the onboarding process and set new hires up for success from day one',
				icon: '/images/stories/02/01.svg',
				iconAlt: 'Onboarding use case',
			},
			{
				id: 'case-performance',
				title: 'Quarterly Performance Reviews',
				description:
					'Transform dreaded reviews into productive growth conversations that employees actually look forward to',
				icon: '/images/stories/02/02.svg',
				iconAlt: 'Performance review use case',
				colSpan: 2 as const,
			},
			{
				id: 'case-goals',
				title: 'OKR & Goal Setting',
				description:
					'Align team goals with company objectives and track progress with real-time dashboards',
				icon: '/images/stories/02/03.svg',
				iconAlt: 'OKR use case',
				descriptionScene:
					'Teams using our OKR module achieve 27% more goals quarterly',
			},
			{
				id: 'case-development',
				title: 'Career Development Planning',
				description:
					'Create clear growth paths for every team member based on performance data and skills gap analysis',
				icon: '/images/stories/02/04.svg',
				iconAlt: 'Career development use case',
			},
			{
				id: 'case-remote',
				title: 'Remote Team Management',
				description:
					'Keep distributed teams connected, engaged, and performing with virtual tools and asynchronous workflows',
				icon: '/images/stories/02/05.svg',
				iconAlt: 'Remote management use case',
			},
		],
	},
	{
		id: 'industry',
		label: 'Vague Feedback Tragedy',
		title: 'Vague Feedback Tragedy',
		description:
			'See how we address unique challenges across different industries.',
		features: [
			{
				id: 'industry-tech',
				title: 'Technology',
				description:
					'Fast-paced innovation requires adaptive performance management that moves as quickly as your sprints',
				icon: '/images/stories/03/01.svg',
				iconAlt: 'Technology industry',
				colSpan: 2 as const,
				descriptionScene: 'Tech companies report 34% faster innovation cycles',
			},
			{
				id: 'industry-healthcare',
				title: 'Healthcare',
				description:
					'Balancing compliance requirements with patient-centered care demands specialized performance metrics',
				icon: '/images/stories/03/02.svg',
				iconAlt: 'Healthcare industry',
			},
			{
				id: 'industry-finance',
				title: 'Financial Services',
				description:
					'Driving results while maintaining regulatory compliance in a high-stakes environment',
				icon: '/images/stories/03/03.svg',
				iconAlt: 'Finance industry',
				descriptionScene:
					'Compliance training completion rates improved by 52%',
			},
			{
				id: 'industry-education',
				title: 'Education',
				description:
					'Supporting faculty and staff to focus on student outcomes with streamlined administrative processes',
				icon: '/images/stories/03/04.svg',
				iconAlt: 'Education industry',
			},
			{
				id: 'industry-nonprofit',
				title: 'Nonprofit',
				description:
					'Maximizing impact with limited resources and diverse stakeholders through aligned objectives',
				icon: '/images/stories/03/05.svg',
				iconAlt: 'Nonprofit industry',
			},
		],
	},
];

export const TabsStoriesSection01 = () => {
	return (
		<section className="pt-24">
			<div className="section-container">
				<div className="section-header-centered">
					<h2 className="marketing-display text-neutral-950">
						Managing a team today can feel like a juggling act.
					</h2>
					<p className="marketing-body text-neutral-600">
						Explore real-world examples of how our platform transforms team
						management across different scenarios and industries.
					</p>
				</div>

				<TabsStoriesGrid
					tabs={TABS_DATA}
					showHeader={false} // Set to true if you want to show the tab content headers
				/>
			</div>
		</section>
	);
};
