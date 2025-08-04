'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/core/Input';
import { Label } from '@/components/ui/core/Label';
import { Button } from '@/components/ui/core/Button';
import { useEarlyAdoptersStore } from '@/store/early-adopters-store';
import { Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Step1EmailForm: React.FC = () => {
	const {
		formData,
		validation,
		isSubmitting,
		isCheckingDuplicate,
		duplicateCheckResult,
		submitError,
		updateEmail,
		validateEmail,
		validateCurrentStep,
		nextStep,
		checkDuplicateEmail,
	} = useEarlyAdoptersStore();

	// Refs for focus and announcement management
	const emailInputRef = useRef<HTMLInputElement>(null);
	const errorAnnouncementRef = useRef<HTMLDivElement>(null);
	const previousErrorRef = useRef<string>('');

	const handleEmailChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const email = e.target.value;
			updateEmail(email);

			// Clear error state when user starts typing
			if (validation.email.error && email.length > 0) {
				// This will be handled by the store, but we ensure good UX
			}
		},
		[updateEmail, validation.email.error]
	);

	const handleEmailBlur = useCallback(() => {
		// Only validate if user has entered something
		if (formData.email.trim()) {
			validateEmail();
		}
	}, [formData.email, validateEmail]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				e.preventDefault(); // Prevent form submission if within a form
				handlePrimaryAction();
			}
		},
		[]
	);

	const handlePrimaryAction = async () => {
		// Validate current step before proceeding
		if (!validateCurrentStep()) {
			// Focus the email input if validation fails
			if (emailInputRef.current) {
				emailInputRef.current.focus();
			}
			return;
		}

		// Check for duplicate email registration
		const canProceed = await checkDuplicateEmail(formData.email);

		if (canProceed) {
			// Email is available, proceed to next step
			nextStep();
		}
		// If canProceed is false, the duplicate check result will be shown in the UI
	};

	// Auto-focus the email input when component mounts
	useEffect(() => {
		if (emailInputRef.current) {
			// Small delay to ensure modal is fully rendered
			const timer = setTimeout(() => {
				emailInputRef.current?.focus();
			}, 100);

			return () => clearTimeout(timer);
		}
	}, []);

	// Announce validation errors and duplicate check results to screen readers
	useEffect(() => {
		let announcementText = '';

		if (validation.email.error) {
			announcementText = `Email validation error: ${validation.email.error}`;
		} else if (duplicateCheckResult?.alreadyRegistered) {
			announcementText = `Email already registered: You joined our Early Access Program${
				duplicateCheckResult.registrationDate
					? ` on ${duplicateCheckResult.registrationDate}`
					: ''
			}. We'll notify you when early access is available.`;
		} else if (submitError) {
			announcementText = `Error: ${submitError}`;
		}

		if (announcementText && announcementText !== previousErrorRef.current) {
			previousErrorRef.current = announcementText;

			// Create announcement for screen readers
			if (errorAnnouncementRef.current) {
				errorAnnouncementRef.current.textContent = announcementText;
			}

			// Also announce via temporary live region for immediate feedback
			const announcer = document.createElement('div');
			announcer.setAttribute('aria-live', 'assertive');
			announcer.setAttribute('aria-atomic', 'true');
			announcer.className = 'sr-only';
			announcer.textContent = announcementText;

			document.body.appendChild(announcer);

			setTimeout(() => {
				if (document.body.contains(announcer)) {
					document.body.removeChild(announcer);
				}
			}, 1000);
		} else if (
			!validation.email.error &&
			!duplicateCheckResult?.alreadyRegistered &&
			!submitError
		) {
			previousErrorRef.current = '';
			if (errorAnnouncementRef.current) {
				errorAnnouncementRef.current.textContent = '';
			}
		}
	}, [validation.email.error, duplicateCheckResult, submitError]);

	return (
		<div>
			{/* Title and Description - moved from modal header */}
			<div className="space-y-2 pb-6">
				<h2 className="marketing-h4">Get early access</h2>
				<p className="marketing-body text-foreground-weak">
					You&apos;ll get priority access when we launch, plus exclusive updates
					on new features and early beta invitations.
				</p>
			</div>

			{/* Form content */}
			<div className="space-y-1.5 pb-6">
				{/* Hidden heading for screen readers */}
				<h3 id="email-section-heading" className="sr-only">
					Email Address Registration
				</h3>

				{/* Email input */}
				<div className="space-y-2">
					<Label htmlFor="early-adopter-email">Company Email Address *</Label>

					<div className="relative">
						<Input
							ref={emailInputRef}
							id="early-adopter-email"
							type="email"
							inputSize="lg"
							placeholder="your.email@company.com"
							value={formData.email}
							onChange={handleEmailChange}
							onBlur={handleEmailBlur}
							onKeyDown={handleKeyDown}
							className={cn(
								'pl-12',
								validation.email.error
									? 'border-destructive-400 focus-visible:ring-destructive-400'
									: validation.email.isValid
										? 'border-primary-400 focus-visible:ring-primary-400'
										: ''
							)}
							aria-invalid={!!validation.email.error}
							aria-describedby={`${
								validation.email.error ? 'email-error' : ''
							} email-help`.trim()}
							aria-required="true"
							autoComplete="email"
							spellCheck={false}
							autoCapitalize="none"
						/>

						{/* Email icon */}
						<div className="absolute left-4 top-1/2 -translate-y-1/2">
							<Mail
								className="size-5 text-foreground-muted"
								aria-hidden="true"
							/>
						</div>

						{/* Validation status icon */}
						{validation.email.error && (
							<div className="absolute right-4 top-1/2 -translate-y-1/2">
								<AlertCircle
									className="size-5 text-destructive-500"
									aria-hidden="true"
								/>
							</div>
						)}
					</div>

					{/* Error message */}
					{validation.email.error && (
						<div
							id="email-error"
							className="flex items-center gap-2 text-sm text-destructive-600"
							role="alert"
							aria-live="polite"
						>
							<AlertCircle
								className="w-4 h-4 flex-shrink-0"
								aria-hidden="true"
							/>
							{validation.email.error}
						</div>
					)}

					{/* Duplicate registration message */}
					{duplicateCheckResult?.alreadyRegistered && (
						<div
							className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3"
							role="alert"
							aria-live="polite"
						>
							<AlertCircle
								className="w-4 h-4 flex-shrink-0 mt-0.5"
								aria-hidden="true"
							/>
							<div className="flex-1">
								<p className="font-medium">You are already registered!</p>
								<p className="text-amber-600 mt-1">
									You joined our Early Access Program{' '}
									{duplicateCheckResult.registrationDate && (
										<>on {duplicateCheckResult.registrationDate}</>
									)}
									{duplicateCheckResult.contactName && (
										<> as {duplicateCheckResult.contactName}</>
									)}
									. We will notify you as soon as early access is available.
								</p>
								<button
									type="button"
									onClick={() => {
										// Reset duplicate check result and focus email input
										useEarlyAdoptersStore.setState({
											duplicateCheckResult: null,
										});
										if (emailInputRef.current) {
											emailInputRef.current.focus();
											emailInputRef.current.select();
										}
									}}
									className="text-amber-800 underline hover:no-underline mt-2 text-xs"
								>
									Try a different email
								</button>
							</div>
						</div>
					)}

					{/* General submit error */}
					{submitError &&
						!validation.email.error &&
						!duplicateCheckResult?.alreadyRegistered && (
							<div
								className="flex items-center gap-2 text-sm text-destructive-600"
								role="alert"
								aria-live="polite"
							>
								<AlertCircle
									className="w-4 h-4 flex-shrink-0"
									aria-hidden="true"
								/>
								{submitError}
							</div>
						)}

					{/* Success message for screen readers */}
					{validation.email.isValid &&
						!validation.email.error &&
						formData.email && (
							<div className="sr-only" role="status" aria-live="polite">
								Email address is valid
							</div>
						)}
				</div>

				{/* Helper text */}
				<p id="email-help" className="text-xs text-foreground-weak pt-4">
					We respect your privacy. No spam, ever.
				</p>
			</div>

			{/* Primary action button - moved from modal footer */}
			<div className="flex justify-end pt-4">
				<Button
					variant="primary"
					size="lg"
					onClick={handlePrimaryAction}
					disabled={
						isSubmitting ||
						isCheckingDuplicate ||
						duplicateCheckResult?.alreadyRegistered
					}
					className="flex items-center gap-2 min-w-[140px]"
					aria-describedby="continue-button-help"
				>
					{isSubmitting || isCheckingDuplicate ? (
						<>
							<div
								className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
								aria-hidden="true"
							/>
							<span className="sr-only">
								{isCheckingDuplicate
									? 'Checking if email is already registered, please wait'
									: 'Processing your email address, please wait'}
							</span>
							{isCheckingDuplicate ? 'Checking...' : 'Processing...'}
						</>
					) : duplicateCheckResult?.alreadyRegistered ? (
						<>
							Already Registered
							<AlertCircle aria-hidden="true" className="w-4 h-4" />
						</>
					) : (
						<>
							Continue
							<ArrowRight aria-hidden="true" />
						</>
					)}
				</Button>

				{/* Button help text */}
				<div id="continue-button-help" className="sr-only">
					{duplicateCheckResult?.alreadyRegistered
						? 'You are already registered for the Early Access Program'
						: 'Proceed to role selection after validating your email address'}
				</div>
			</div>

			{/* Live region for error announcements */}
			<div
				ref={errorAnnouncementRef}
				aria-live="assertive"
				aria-atomic="true"
				className="sr-only"
				role="status"
			/>

			{/* Form instructions for screen readers */}
			<div className="sr-only">
				<p>
					This form requires a valid company email address. Error messages will
					be announced automatically. Press Enter or click Continue to proceed
					to the next step.
				</p>
			</div>
		</div>
	);
};

export default Step1EmailForm;
