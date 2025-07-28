'use client';

import React from 'react';

interface StickyPhoneWrapperProps {
	children: React.ReactNode;
	className?: string;
	bottomOffset?: number;
	enabled?: boolean;
	initialPeekHeight?: number;
}

export const StickyPhoneWrapper: React.FC<StickyPhoneWrapperProps> = ({
	children,
	className = '',
}) => {
	return <div className={className}>{children}</div>;
};
