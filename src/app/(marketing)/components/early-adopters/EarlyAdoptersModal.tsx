'use client';

import React, { useEffect, useRef } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalTitle,
	ModalDescription,
} from '@/components/ui/core/Modal2';
import { Button } from '@/components/ui/core/Button';
import { Progress } from '@/components/ui/core/Progress';
import { useEarlyAdoptersStore } from '@/store/early-adopters-store';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/core/Card';

// Step components (we'll create these next)
const Step1EmailForm = React.lazy(() => import('./steps/Step1EmailForm'));
const Step2RoleForm = React.lazy(() => import('./steps/Step2RoleForm'));
const Step3TeamSizeForm = React.lazy(() => import('./steps/Step3TeamSizeForm'));
const Step4IndustryForm = React.lazy(() => import('./steps/Step4IndustryForm'));
const Step5Success = React.lazy(() => import('./steps/Step5Success'));

export const EarlyAdoptersModal = () => {
	const {
		isModalOpen,
		currentStep,
		isSubmitting,
		closeModal,
		nextStep,
		previousStep,
		validateCurrentStep,
		submitForm,
	} = useEarlyAdoptersStore();

	// Refs for focus management
	const modalRef = useRef<HTMLDivElement>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);

	// Store the previously focused element when modal opens
	useEffect(() => {
		if (isModalOpen) {
			previousFocusRef.current = document.activeElement as HTMLElement;
		} else if (previousFocusRef.current) {
			// Return focus to the element that opened the modal
			previousFocusRef.current.focus();
			previousFocusRef.current = null;
		}
	}, [isModalOpen]);

	// Announce step changes to screen readers
	useEffect(() => {
		if (isModalOpen && currentStep > 0) {
			const announcement = `Step ${currentStep} of 5`;

			// Create a temporary element to announce the step change
			const announcer = document.createElement('div');
			announcer.setAttribute('aria-live', 'polite');
			announcer.setAttribute('aria-atomic', 'true');
			announcer.className = 'sr-only';
			announcer.textContent = announcement;

			document.body.appendChild(announcer);

			// Clean up after announcement
			setTimeout(() => {
				document.body.removeChild(announcer);
			}, 1000);
		}
	}, [currentStep, isModalOpen]);

	// Calculate progress percentage
	const progressPercentage = (currentStep / 5) * 100;

	// Step configuration
	const stepConfig = {
		1: {
			title: 'Get early access',
			description:
				"You'll get priority access when we launch, plus exclusive updates on new features and early beta invitations.",
			showProgress: true,
			showBackButton: false,
			showHeaderFooter: false, // Step 1 has title/button in card
			primaryButtonText: 'Continue',
			primaryButtonAction: nextStep,
			ariaLabel: 'Email registration step',
		},
		2: {
			title: "What's your role?",
			description: 'Help us understand your position in your organization',
			showProgress: true,
			showBackButton: true,
			showHeaderFooter: false, // Step 2 also has title/button in card
			primaryButtonText: 'Continue',
			primaryButtonAction: nextStep,
			ariaLabel: 'Role selection step',
		},
		3: {
			title: 'Team size',
			description: 'How many people are in your team?',
			showProgress: true,
			showBackButton: true,
			showHeaderFooter: false, // Step 3 also has title/button in card
			primaryButtonText: 'Continue',
			primaryButtonAction: nextStep,
			ariaLabel: 'Team size selection step',
		},
		4: {
			title: 'Industry',
			description: 'What industry are you in?',
			showProgress: true,
			showBackButton: true,
			showHeaderFooter: false, // Step 4 also has title/button in card
			primaryButtonText: 'Get early access',
			primaryButtonAction: submitForm,
			ariaLabel: 'Industry selection step',
		},
		5: {
			title: 'Success',
			description: "You're successfully registered for early access",
			showProgress: false,
			showBackButton: false,
			showHeaderFooter: false, // Success step handles its own content
			primaryButtonText: null,
			primaryButtonAction: null,
			ariaLabel: 'Registration successful',
		},
	};

	const currentConfig = stepConfig[currentStep];

	const handlePrimaryAction = async () => {
		if (!currentConfig.primaryButtonAction) return;

		// Validate current step before proceeding
		if (currentStep < 5 && !validateCurrentStep()) {
			return;
		}

		await currentConfig.primaryButtonAction();
	};

	// Handle escape key to close modal
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape' && !isSubmitting) {
			closeModal();
		}
	};

	// Enhanced close handler with screen reader announcement
	const handleClose = () => {
		if (!isSubmitting) {
			// Announce modal closure to screen readers
			const announcer = document.createElement('div');
			announcer.setAttribute('aria-live', 'polite');
			announcer.className = 'sr-only';
			announcer.textContent = 'Early access signup closed';

			document.body.appendChild(announcer);

			setTimeout(() => {
				document.body.removeChild(announcer);
			}, 1000);

			closeModal();
		}
	};

	const renderCurrentStep = () => {
		// Loading fallback with proper accessibility
		const LoadingFallback = () => (
			<div
				className="animate-pulse h-32 bg-neutral-100 rounded"
				role="status"
				aria-label="Loading step content"
			>
				<span className="sr-only">Loading step {currentStep} content...</span>
			</div>
		);

		switch (currentStep) {
			case 1:
				return (
					<React.Suspense fallback={<LoadingFallback />}>
						<Step1EmailForm key={currentStep} />
					</React.Suspense>
				);
			case 2:
				return (
					<React.Suspense fallback={<LoadingFallback />}>
						<Step2RoleForm key={currentStep} />
					</React.Suspense>
				);
			case 3:
				return (
					<React.Suspense fallback={<LoadingFallback />}>
						<Step3TeamSizeForm key={currentStep} />
					</React.Suspense>
				);
			case 4:
				return (
					<React.Suspense fallback={<LoadingFallback />}>
						<Step4IndustryForm key={currentStep} />
					</React.Suspense>
				);
			case 5:
				return (
					<React.Suspense fallback={<LoadingFallback />}>
						<Step5Success key={currentStep} />
					</React.Suspense>
				);
			default:
				return null;
		}
	};

	if (!isModalOpen) return null;

	return (
		<Modal open={isModalOpen} onOpenChange={handleClose} withX={true}>
			<ModalContent
				ref={modalRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={
					currentConfig.showHeaderFooter ? 'modal-title' : undefined
				}
				aria-describedby={
					currentConfig.showHeaderFooter ? 'modal-description' : undefined
				}
				aria-label={currentConfig.ariaLabel}
				onKeyDown={handleKeyDown}
				tabIndex={-1}
			>
				{/* Only show header for steps that need it */}
				{currentConfig.showHeaderFooter && (
					<ModalHeader>
						{/* Progress bar - only show for steps 1-4 */}
						{currentConfig.showProgress && (
							<div className="absolute w-full top-0 left-0">
								<Progress
									value={progressPercentage}
									className="h-1.5 rounded-none"
									aria-label={`Step ${currentStep} of 5, ${Math.round(progressPercentage)}% complete`}
								/>
							</div>
						)}

						<ModalTitle id="modal-title">{currentConfig.title}</ModalTitle>
						<ModalDescription id="modal-description">
							{currentConfig.description}
						</ModalDescription>
					</ModalHeader>
				)}

				{/* Progress bar for Steps 1, 2, 3 & 4 (no header but still needs progress) */}
				{(currentStep === 1 ||
					currentStep === 2 ||
					currentStep === 3 ||
					currentStep === 4) &&
					currentConfig.showProgress && (
						<div className="absolute w-full top-0 left-0 z-40">
							<Progress
								value={progressPercentage}
								className="h-1.5 rounded-none"
								aria-label={`Registration progress: Step ${currentStep} of 5, ${Math.round(progressPercentage)}% complete`}
							/>
						</div>
					)}

				{/* Live region for form validation announcements */}
				<div
					aria-live="polite"
					aria-atomic="true"
					className="sr-only"
					id="form-announcements"
				/>

				{/* Step Content */}
				<Card
					className="max-w-xl mx-auto p-8"
					role="main"
					aria-label={`Step ${currentStep}: ${currentConfig.title}`}
				>
					{renderCurrentStep()}
				</Card>

				{/* Footer - only show for steps that need it */}
				{currentConfig.showHeaderFooter && currentStep < 5 && (
					<ModalFooter>
						<div className="flex justify-between items-center w-full max-w-xl mx-auto">
							{/* Back button */}
							<div className="flex-1">
								{currentConfig.showBackButton && (
									<Button
										variant="ghost"
										size="lg"
										onClick={previousStep}
										disabled={isSubmitting}
										className="flex items-center gap-2"
										aria-label={`Go back to step ${currentStep - 1}`}
									>
										<ArrowLeft aria-hidden="true" />
										Back
									</Button>
								)}
							</div>

							{/* Primary action button */}
							<div className="flex-1 flex justify-end">
								{currentConfig.primaryButtonText && (
									<Button
										variant="primary"
										size="lg"
										onClick={handlePrimaryAction}
										disabled={isSubmitting}
										className="flex items-center gap-2 min-w-[140px]"
										aria-describedby={
											currentStep === 4
												? 'submit-description'
												: 'continue-description'
										}
									>
										{isSubmitting ? (
											<>
												<div
													className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
													aria-hidden="true"
												/>
												<span className="sr-only">
													Processing your request, please wait
												</span>
												{currentStep === 4 ? 'Submitting...' : 'Processing...'}
											</>
										) : (
											<>
												{currentConfig.primaryButtonText}
												<ArrowRight aria-hidden="true" />
											</>
										)}
									</Button>
								)}
							</div>
						</div>

						{/* Hidden descriptions for buttons */}
						<div id="continue-description" className="sr-only">
							Continue to the next step of the registration process
						</div>
						<div id="submit-description" className="sr-only">
							Submit your information to complete the registration
						</div>
					</ModalFooter>
				)}

				{/* Instructions for screen reader users */}
				<div className="sr-only">
					<p>
						You are in a registration dialog for early access. Use Tab to
						navigate between form elements. Press Escape to close this dialog.
						{currentStep < 5 && ` This is step ${currentStep} of 5.`}
					</p>
				</div>
			</ModalContent>
		</Modal>
	);
};

export default EarlyAdoptersModal;
