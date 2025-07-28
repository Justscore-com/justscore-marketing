import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded border px-1.5 py-0.5 text-xs font-medium leading-4 tracking-wide whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border border-border-strong bg-transparent text-neutral-700',
				neutral: 'border-transparent bg-neutral-800 text-white',
				'neutral-light': 'border-transparent bg-neutral-100 text-neutral-800',
				primary: 'border-transparent bg-primary-700 text-white',
				'primary-light': 'border-transparent bg-primary-100 text-primary-700',
				secondary: 'border-transparent bg-secondary-700 text-white',
				'secondary-light':
					'border-transparent bg-secondary-100 text-secondary-800',
				tertiary: 'border-transparent bg-tertiary-700 text-white',
				'tertiary-light':
					'border-transparent bg-tertiary-100 text-tertiary-800',
				info: 'border-transparent bg-primary-800 text-white',
				'info-light': 'border-transparent bg-primary-100 text-primary-900',
				outline: 'text-foreground border border-input',
				accent: 'border-transparent bg-accent-400 text-accent-900',
				'accent-light': 'border-transparent bg-accent-200 text-accent-900',
				destructive: 'border-transparent bg-destructive-600 text-white',
				'destructive-light':
					'border-transparent bg-destructive-100 text-destructive-700',
				success: 'border-transparent bg-success-600 text-white',
				'success-light': 'border-transparent bg-success-100 text-success-700',
				warning: 'border-transparent bg-warning-600 text-white',
				'warning-light': 'border-transparent bg-warning-100 text-warning-700',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
