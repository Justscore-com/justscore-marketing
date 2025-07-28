'use client';

import React from 'react';
import Link from 'next/link';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/core/Breadcrumb';
import { SidebarTrigger } from '@/components/ui/composite/Sidebar';
import { Button } from '@/components/ui/core/Button';
import { BrandLogo } from '@/components/logo/BrandLogo';
import { Badge } from '@/components/ui/core/Badge';
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from '@/components/ui/core/Avatar';
import { Bell, Star, Settings, CreditCard, LogOut } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/core/DropdownMenu';
import { useClerk } from '@clerk/nextjs';
import { useSetupProgress } from '@/hooks/useSetupProgress';
import { useProfile } from '@/hooks/useProfile';

export interface BreadcrumbItem {
	href?: string;
	label: string;
}

interface PageBreadcrumbsProps {
	items: BreadcrumbItem[];
}

const UserNav = ({ isMobile = false }: { isMobile?: boolean }) => {
	const { data: profileData, isLoading } = useProfile();
	const { signOut } = useClerk();

	const user = profileData?.data;
	const firstName = user?.clerkProfile?.firstName || '';
	const lastName = user?.clerkProfile?.lastName || '';
	const displayName = user?.name || `${firstName} ${lastName}`.trim() || 'User';
	const email = user?.email || user?.clerkProfile?.primaryEmail || '';
	const imageUrl = user?.clerkProfile?.imageUrl;

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map(word => word.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	const initials = getInitials(displayName);

	const handleLogout = () => {
		signOut({ redirectUrl: '/' });
	};

	if (isLoading) {
		return <div className={`${isMobile ? 'size-8' : 'size-10'} rounded-full bg-gray-200 animate-pulse`} />;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative size-8 rounded-full"
					data-slot="dropdown-trigger"
				>
					<Avatar data-slot="avatar" className="size-8">
						<AvatarImage
							src={imageUrl || 'https://github.com/shadcn.png'}
							alt={`${displayName} avatar`}
						/>
						<AvatarFallback className={isMobile ? 'text-xs' : 'text-sm'}>
							{initials}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-56"
				align="end"
				forceMount
				data-slot="dropdown-content"
			>
				<DropdownMenuLabel data-slot="dropdown-label">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{displayName}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuItem data-slot="dropdown-item">
					<Star />
					<span>Upgrade to Pro</span>
				</DropdownMenuItem>
				<DropdownMenuItem data-slot="dropdown-item">
					<CreditCard />
					<span>Billing</span>
				</DropdownMenuItem>
				<DropdownMenuItem data-slot="dropdown-item">
					<Bell />
					<span>Notifications</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator data-slot="dropdown-separator" />
				<DropdownMenuItem data-slot="dropdown-item" onClick={handleLogout}>
					<LogOut />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
	const { showMainDashboard } = useSetupProgress();
	
	// Get the current page (last item in breadcrumbs)
	const currentPage = items.length > 0 ? items[items.length - 1] : null;

	return (
		<header className="flex flex-col gap-2 lg:pt-1">
			{/* Mobile top bar - only visible on mobile when showing main dashboard */}
			{showMainDashboard && (
				<div className="flex items-center justify-between lg:hidden bg-background sm:pt-2">
					{/* Logo on the left */}
					<div className="flex items-center">
						<BrandLogo variant="logotype" size="sm" />
					</div>


					{/* Right side with notifications and user profile */}
					<div className="flex items-center gap-4">
						{/* Notifications with badge */}
						<div className="relative">
							<Button 
								variant="ghost" 
								icon 
								aria-label="Notifications"
								className="size-8"
							>
								<Bell className="!size-5" />
							</Button>
							{/* Notification badge */}
							<Badge
								variant="accent"
								className="absolute -top-1 -right-1 min-w-4 h-4 px-1 flex items-center justify-center text-xs"
							>
								1
							</Badge>
						</div>

						{/* User profile */}
						<UserNav isMobile={true} />
					</div>
				</div>
			)}



			{/* Main header with breadcrumbs */}
			<div className={`flex items-center justify-between gap-8 pt-1 ${showMainDashboard ? 'px-0' : ''}`}>
				{showMainDashboard ? (
					<div className="flex items-center gap-1">
						<SidebarTrigger className="hidden lg:flex" />
						<Breadcrumb
							className={`lg:border-l border-input lg:px-4 ${items.length === 1 && items[0]?.label === 'Dashboard' ? 'lg:block hidden' : ''}`}
							data-slot="breadcrumb"
						>
							<BreadcrumbList data-slot="breadcrumb-list">
								<BreadcrumbItem data-slot="breadcrumb-item">
									<BreadcrumbLink asChild data-slot="breadcrumb-link">
										<Link href="/dashboard">Dashboard</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								{items.length > 1 && (
									<BreadcrumbSeparator data-slot="breadcrumb-separator" />
								)}
								{items
									.filter((_, index) => index < items.length - 1)
									.map((item, index, filteredItems) => {
										const isLast = index === filteredItems.length - 1;
										return (
											<React.Fragment key={item.label}>
												<BreadcrumbItem data-slot="breadcrumb-item">
													<BreadcrumbLink asChild data-slot="breadcrumb-link">
														<Link href={item.href ?? '#'}>{item.label}</Link>
													</BreadcrumbLink>
												</BreadcrumbItem>
												{!isLast && (
													<BreadcrumbSeparator data-slot="breadcrumb-separator" />
												)}
											</React.Fragment>
										);
									})}
								{/* Show current page in breadcrumb - bold on mobile, hidden on lg+ */}
								{currentPage && (
									<>
										<BreadcrumbSeparator data-slot="breadcrumb-separator" className="lg:hidden" />
										<BreadcrumbItem data-slot="breadcrumb-item">
											<BreadcrumbPage data-slot="breadcrumb-page" className="font-bold lg:hidden">
												{currentPage.label}
											</BreadcrumbPage>
										</BreadcrumbItem>
									</>
								)}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				) : (
					<div></div> // Empty div to maintain the flex layout
				)}
				
				{/* Desktop navigation - hidden on mobile when main dashboard is showing */}
				<div className={`items-center gap-4 ${showMainDashboard ? 'hidden lg:flex' : 'flex'}`}>
					<Button variant="ghost" icon aria-label="Notifications">
						<Bell />
					</Button>
					<UserNav />
				</div>
			</div>
		</header>
	);
}