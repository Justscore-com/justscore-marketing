'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';

interface ModalContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	titleId?: string;
	descriptionId?: string;
	setTitleId?: (id: string) => void;
	setDescriptionId?: (id: string) => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

const useModalContext = () => {
	const context = React.useContext(ModalContext);
	if (!context) {
		throw new Error('Modal components must be used within a Modal');
	}
	return context;
};

interface ModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
	withX?: boolean;
}

const Modal = ({ open, onOpenChange, children, withX = false }: ModalProps) => {
	const [titleId, setTitleId] = React.useState<string>();
	const [descriptionId, setDescriptionId] = React.useState<string>();

	// Keyboard and body scroll management
	React.useEffect(() => {
		if (!open) return;

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onOpenChange(false);
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.body.style.overflow = originalOverflow;
			document.removeEventListener('keydown', handleEscape);
		};
	}, [open, onOpenChange]);

	const contextValue = React.useMemo<ModalContextValue>(
		() => ({
			open,
			onOpenChange,
			titleId,
			descriptionId,
			setTitleId,
			setDescriptionId,
		}),
		[open, onOpenChange, titleId, descriptionId]
	);

	return (
		<ModalContext.Provider value={contextValue}>
			{React.Children.map(children, child => {
				if (React.isValidElement(child) && child.type === ModalContent) {
					return React.cloneElement(child, {
						...child.props,
						withX,
					});
				}
				return child;
			})}
		</ModalContext.Provider>
	);
};

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
	withX?: boolean;
}

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
	({ children, className, withX = false, ...props }, ref) => {
		const { open, onOpenChange, titleId, descriptionId } = useModalContext();
		const [isMounted, setIsMounted] = React.useState(false);
		const [isScrollable, setIsScrollable] = React.useState(false);
		const modalRef = React.useRef<HTMLDivElement>(null);
		const contentRef = React.useRef<HTMLDivElement>(null);

		// Handle client-side rendering
		React.useEffect(() => {
			setIsMounted(true);
		}, []);

		// Check if content is scrollable
		React.useEffect(() => {
			const checkScrollable = () => {
				if (modalRef.current) {
					const hasVerticalScrollbar =
						modalRef.current.scrollHeight > modalRef.current.clientHeight;
					setIsScrollable(hasVerticalScrollbar);
				}
			};

			if (open && modalRef.current) {
				// Check initially
				checkScrollable();

				// Check on resize
				const resizeObserver = new ResizeObserver(checkScrollable);
				resizeObserver.observe(modalRef.current);

				// Check when content changes
				const mutationObserver = new MutationObserver(checkScrollable);
				if (contentRef.current) {
					mutationObserver.observe(contentRef.current, {
						childList: true,
						subtree: true,
						attributes: true,
					});
				}

				return () => {
					resizeObserver.disconnect();
					mutationObserver.disconnect();
				};
			}
		}, [open, children]);

		// Separate children by type for optimal rendering
		const { header, actions, content } = React.useMemo(() => {
			const childArray = React.Children.toArray(children);
			return {
				header: childArray.find(
					child => React.isValidElement(child) && child.type === ModalHeader
				),
				actions: childArray.find(
					child => React.isValidElement(child) && child.type === ModalActions
				),
				content: childArray.filter(
					child =>
						!React.isValidElement(child) ||
						(child.type !== ModalHeader &&
							child.type !== ModalFooter &&
							child.type !== ModalActions)
				),
			};
		}, [children]);

		if (!isMounted || !open) return null;

		return createPortal(
			<div
				ref={modalRef}
				role="dialog"
				aria-modal={true}
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				className={cn(
					'bg-white z-50 fixed inset-0',
					// Key change: Use min-h-screen and flex for proper centering
					'min-h-screen flex flex-col',
					// Enable scrolling when needed
					isScrollable ? 'overflow-y-auto' : 'overflow-hidden',
					className
				)}
				{...props}
			>
				{/* X Button - Fixed position in top-right corner */}
				{withX && (
					<Button
						variant="ghost"
						size="lg"
						icon
						onClick={() => onOpenChange(false)}
						className="fixed top-4 right-4 z-50"
						aria-label="Close modal"
					>
						<X />
					</Button>
				)}

				{/* Fixed Header with action buttons */}
				{header && (
					<div className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-b from-white from-70% to-transparent to-100% p-4 py-8 md:p-8">
						<div className="relative">
							<div className="text-left">{header}</div>
							<div className="absolute top-0 right-0">{actions}</div>
						</div>
					</div>
				)}

				{/* Main content area - centered */}
				<div
					className={cn(
						'flex-1 p-4 md:p-8 flex items-center justify-center',
						// Full screen on mobile, centered on desktop
						'md:min-h-screen'
					)}
					style={{
						paddingTop: header ? '120px' : '2rem',
						paddingBottom: '2rem',
					}}
				>
					<div ref={contentRef} className="w-full max-w-2xl mx-auto">
						{content}
					</div>
				</div>
			</div>,
			document.body
		);
	}
);
ModalContent.displayName = 'ModalContent';

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	centered?: boolean;
}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
	({ className, centered = false, children, ...props }, ref) => {
		// Separate title and description from other content
		const { titleAndDescription, otherContent } = React.useMemo(() => {
			const childArray = React.Children.toArray(children);
			const titleAndDesc: React.ReactNode[] = [];
			const other: React.ReactNode[] = [];

			childArray.forEach(child => {
				if (React.isValidElement(child)) {
					if (child.type === ModalTitle || child.type === ModalDescription) {
						titleAndDesc.push(child);
					} else {
						other.push(child);
					}
				} else {
					other.push(child);
				}
			});

			return { titleAndDescription: titleAndDesc, otherContent: other };
		}, [children]);

		if (centered && titleAndDescription.length > 0) {
			return (
				<div ref={ref} className={cn('relative', className)} {...props}>
					{/* Centered title and description group */}
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
						<div className="flex flex-col space-y-1">
							{titleAndDescription.map((child, index) => {
								if (React.isValidElement(child)) {
									if (child.type === ModalTitle) {
										return React.cloneElement(child, {
											...child.props,
											key: index,
											centered: true,
											className: cn(
												'relative left-auto top-auto translate-x-0 translate-y-0',
												child.props.className
											),
										});
									}
									if (child.type === ModalDescription) {
										return React.cloneElement(child, {
											...child.props,
											key: index,
											className: cn('text-center mx-0', child.props.className),
										});
									}
								}
								return child;
							})}
						</div>
					</div>
					{/* Other content (like navigation buttons) */}
					{otherContent}
				</div>
			);
		}

		return (
			<div
				ref={ref}
				className={cn('flex flex-col space-y-1', className)}
				{...props}
			>
				{children}
			</div>
		);
	}
);
ModalHeader.displayName = 'ModalHeader';

const ModalFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	// Enhance buttons to be size lg and ensure proper alignment
	const enhancedChildren = React.useMemo(
		() =>
			React.Children.map(children, child => {
				if (React.isValidElement(child) && child.type === Button) {
					return React.cloneElement(child, {
						...child.props,
						size: 'xl',
					});
				}
				return child;
			}),
		[children]
	);

	return (
		<div
			ref={ref}
			className={cn('flex gap-4 justify-center items-center', className)}
			{...props}
		>
			{enhancedChildren}
		</div>
	);
});
ModalFooter.displayName = 'ModalFooter';

interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	centered?: boolean;
}

const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
	({ className, centered = false, ...props }, ref) => {
		const { setTitleId } = useModalContext();
		const id = React.useId();

		React.useEffect(() => {
			setTitleId?.(id);
			return () => setTitleId?.('');
		}, [id, setTitleId]);

		return (
			<h2
				ref={ref}
				id={id}
				className={cn(
					'heading-1',
					centered &&
						'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap',
					className
				)}
				{...props}
			/>
		);
	}
);
ModalTitle.displayName = 'ModalTitle';

const ModalDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	const { setDescriptionId } = useModalContext();
	const id = React.useId();

	React.useEffect(() => {
		setDescriptionId?.(id);
		return () => setDescriptionId?.('');
	}, [id, setDescriptionId]);

	return (
		<p
			ref={ref}
			id={id}
			className={cn('caption text-foreground-weak max-w-lg', className)}
			{...props}
		/>
	);
});
ModalDescription.displayName = 'ModalDescription';

const ModalActions = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	return (
		<div ref={ref} className={cn('flex gap-3', className)} {...props}>
			{children}
		</div>
	);
});
ModalActions.displayName = 'ModalActions';

export {
	Modal,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalActions,
	ModalTitle,
	ModalDescription,
	type ModalTitleProps,
	type ModalHeaderProps,
};
