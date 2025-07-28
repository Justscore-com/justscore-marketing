import * as React from 'react';

import { cn } from '@/lib/utils';

// Type definition for size prop
type Size = 'sm' | 'base' | 'lg';

// Create context for sharing size
const CardContext = React.createContext<{ size: Size }>({ size: 'base' });

// Card component
const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'rounded-xl bg-card text-card-foreground border border-border-weak shadow-sm',
			className
		)}
		{...props}
	/>
));
Card.displayName = 'Card';

// CardHeader with size prop
const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { size?: Size }
>(({ className, size = 'base', ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex flex-col space-y-0.5 p-6 pt-5 pb-0', className)}
		{...props}
	>
		<CardContext.Provider value={{ size }}>
			{props.children}
		</CardContext.Provider>
	</div>
));
CardHeader.displayName = 'CardHeader';

// CardTitle picks up size from context
const CardTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { size } = React.useContext(CardContext);

	const sizeClasses = {
		sm: 'heading-3',
		base: 'heading-2',
		lg: 'heading-1',
	}[size];

	return (
		<div
			ref={ref}
			className={cn(
				`${sizeClasses} text-foreground-strong leading-none`,
				className
			)}
			{...props}
		/>
	);
});
CardTitle.displayName = 'CardTitle';

// CardDescription picks up size from context
const CardDescription = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { size } = React.useContext(CardContext);

	const sizeClasses = {
		sm: 'caption',
		base: 'caption',
		lg: 'body-base',
	}[size];

	return <div ref={ref} className={cn(sizeClasses, className)} {...props} />;
});
CardDescription.displayName = 'CardDescription';

// CardContent
const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('p-6 pb-8', className)} {...props} />
));
CardContent.displayName = 'CardContent';

// CardFooter
const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex items-center gap-3 p-6 pt-2', className)}
		{...props}
	/>
));
CardFooter.displayName = 'CardFooter';

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
};
