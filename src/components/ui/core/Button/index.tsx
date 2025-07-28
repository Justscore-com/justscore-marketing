import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base capitalize font-medium leading-0 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer',
	{
		variants: {
			variant: {
				default:
					'bg-linear-to-br from-neutral-100 to-neutral-200/75 text-neutral-950 hover:opacity-90 border border-neutral-200/25 border-b-neutral-300/75',
				neutral:
					'bg-linear-to-br from-neutral-800 to-neutral-950 text-neutral-50 hover:opacity-90',
				primary:
					'bg-linear-to-br from-primary-600 to-primary-700 text-primary-50 hover:opacity-90 border border-primary-500/25 border-b-primary-500/50',
				secondary:
					'bg-primary-200 text-primary-800 hover:opacity-90 border border-primary-200 border-b-primary-300',
				destructive:
					'bg-linear-to-br from-destructive-500 to-destructive-600 text-white hover:opacity-90',
				'destructive-light':
					'bg-linear-to-br from-destructive-50 to-destructive-100 text-destructive-600 hover:opacity-90',
				warning:
					'bg-linear-to-br from-warning-500 to-warning-600 text-white hover:opacity-90',
				outline:
					'border border-border bg-transparent hover:bg-neutral-50 hover:border-border-strong text-neutral-950 hover:bg-neutral-50',
				accent:
					'bg-linear-to-br from-accent-500 to-accent-400 text-accent-900 hover:opacity-90',
				ghost: 'text-neutral-950 hover:bg-neutral-100 hover:opacity-90',
				link: 'text-primary-600 underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3 [&_svg]:size-4',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 [&_svg]:size-3',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4 [&_svg]:size-5',
				xl: 'h-12 rounded-md px-8 has-[>svg]:px-8 text-base [&_svg]:size-6',
				icon: 'size-9 rounded-full [&_svg]:size-4',
			},
			icon: {
				true: 'p-0 rounded-full',
			},
		},
		compoundVariants: [
			{
				icon: true,
				size: 'default',
				className: '!size-8 [&_svg]:!size-4',
			},
			{
				icon: true,
				size: 'sm',
				className: '!size-6 [&_svg]:!size-3',
			},
			{
				icon: true,
				size: 'lg',
				className: '!size-12 [&_svg]:!size-5',
			},
			{
				icon: true,
				size: 'xl',
				className: '!size-14 [&_svg]:!size-6',
			},
		],
		defaultVariants: {
			variant: 'default',
			size: 'default',
			icon: false,
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	icon?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, icon, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, icon, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
