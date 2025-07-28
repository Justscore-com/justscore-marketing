'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/core/RadioGroup';
import { Label } from '@/components/ui/core/Label';
import { Button } from '@/components/ui/core/Button';
import {
	useEarlyAdoptersStore,
	type Industry,
} from '@/store/early-adopters-store';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

const Step4IndustryForm: React.FC = () => {
	const {
		formData,
		validation,
		isSubmitting,
		updateIndustry,
		validateCurrentStep,
		submitForm,
		previousStep,
	} = useEarlyAdoptersStore();

	// Refs for focus and announcement management
	const radioGroupRef = useRef<HTMLDivElement>(null);
	const errorAnnouncementRef = useRef<HTMLDivElement>(null);
	const previousErrorRef = useRef<string>('');

	const industryOptions: Array<{
		value: Industry;
		label: string;
		description?: string;
	}> = [
		{
			value: 'Technology',
			label: 'Technology',
			description: 'Software, hardware, and tech services',
		},
		{
			value: 'Financial Services',
			label: 'Financial Services',
			description: 'Banking, insurance, and financial institutions',
		},
		{
			value: 'Healthcare',
			label: 'Healthcare',
			description: 'Medical, pharmaceutical, and health services',
		},
		{
			value: 'Manufacturing',
			label: 'Manufacturing',
			description: 'Production and industrial manufacturing',
		},
		{
			value: 'Retail & E-commerce',
			label: 'Retail & E-commerce',
			description: 'Retail stores and online commerce',
		},
		{
			value: 'Professional Services',
			label: 'Professional Services',
			description: 'Consulting, legal, and business services',
		},
		{
			value: 'Education',
			label: 'Education',
			description: 'Schools, universities, and educational institutions',
		},
		{
			value: 'Media & Entertainment',
			label: 'Media & Entertainment',
			description: 'Media, publishing, and entertainment industry',
		},
		{
			value: 'Other',
			label: 'Other',
			description: 'Industry not listed above',
		},
	];

	const handleIndustryChange = useCallback(
		(value: string) => {
			updateIndustry(value as Industry);

			// Announce selection to screen readers
			const selectedOption = industryOptions.find(
				option => option.value === value
			);
			if (selectedOption) {
				const announcer = document.createElement('div');
				announcer.setAttribute('aria-live', 'polite');
				announcer.setAttribute('aria-atomic', 'true');
				announcer.className = 'sr-only';
				announcer.textContent = `Selected: ${selectedOption.label}`;

				document.body.appendChild(announcer);

				setTimeout(() => {
					if (document.body.contains(announcer)) {
						document.body.removeChild(announcer);
					}
				}, 1000);
			}
		},
		[updateIndustry, industryOptions]
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			// Handle Enter key on focused radio group
			if (e.key === 'Enter' && formData.industry) {
				handlePrimaryAction();
			}
		},
		[formData.industry]
	);

	const handlePrimaryAction = async () => {
		// Validate current step before proceeding
		if (!validateCurrentStep()) {
			// Focus the radio group if validation fails
			if (radioGroupRef.current) {
				const firstRadio = radioGroupRef.current.querySelector(
					'button[role="radio"]'
				) as HTMLElement;
				if (firstRadio) {
					firstRadio.focus();
				}
			}
			return;
		}

		// Announce submission start
		const announcer = document.createElement('div');
		announcer.setAttribute('aria-live', 'polite');
		announcer.setAttribute('aria-atomic', 'true');
		announcer.className = 'sr-only';
		announcer.textContent = 'Submitting your registration information...';

		document.body.appendChild(announcer);

		setTimeout(() => {
			if (document.body.contains(announcer)) {
				document.body.removeChild(announcer);
			}
		}, 2000);

		await submitForm();
	};

	// Auto-focus the radio group when component mounts
	useEffect(() => {
		if (radioGroupRef.current) {
			// Small delay to ensure modal is fully rendered
			const timer = setTimeout(() => {
				// Focus the selected radio or first radio
				const selectedRadio = radioGroupRef.current?.querySelector(
					'button[role="radio"][aria-checked="true"]'
				) as HTMLElement;
				const firstRadio = radioGroupRef.current?.querySelector(
					'button[role="radio"]'
				) as HTMLElement;

				if (selectedRadio) {
					selectedRadio.focus();
				} else if (firstRadio) {
					firstRadio.focus();
				}
			}, 100);

			return () => clearTimeout(timer);
		}
	}, []);

	// Announce validation errors to screen readers
	useEffect(() => {
		if (
			validation.industry.error &&
			validation.industry.error !== previousErrorRef.current
		) {
			previousErrorRef.current = validation.industry.error;

			// Create announcement for screen readers
			if (errorAnnouncementRef.current) {
				errorAnnouncementRef.current.textContent = `Error: ${validation.industry.error}`;
			}

			// Also announce via temporary live region for immediate feedback
			const announcer = document.createElement('div');
			announcer.setAttribute('aria-live', 'assertive');
			announcer.setAttribute('aria-atomic', 'true');
			announcer.className = 'sr-only';
			announcer.textContent = `Industry selection error: ${validation.industry.error}`;

			document.body.appendChild(announcer);

			setTimeout(() => {
				if (document.body.contains(announcer)) {
					document.body.removeChild(announcer);
				}
			}, 1000);
		} else if (!validation.industry.error) {
			previousErrorRef.current = '';
			if (errorAnnouncementRef.current) {
				errorAnnouncementRef.current.textContent = '';
			}
		}
	}, [validation.industry.error]);

	return (
		<div>
			{/* Title and Description - moved from modal header */}
			<div className="text-left space-y-1 pb-6">
				<h2 className="marketing-h5">What industry are you in?</h2>
				<p className="caption text-foreground-weak">
					Help us understand your business sector
				</p>
			</div>

			{/* Form content */}
			<div className="space-y-6">
				{/* Hidden heading for screen readers */}
				<h3 id="industry-selection-heading" className="sr-only">
					Industry Selection
				</h3>

				{/* Fieldset wrapper for radio group */}
				<fieldset
					className="space-y-2"
					aria-labelledby="industry-selection-heading"
					aria-describedby={
						validation.industry.error ? 'industry-error' : 'industry-help'
					}
					aria-required="true"
				>
					<legend className="sr-only">Select your industry (required)</legend>

					<RadioGroup
						ref={radioGroupRef}
						value={formData.industry || ''}
						onValueChange={handleIndustryChange}
						className="space-y-2"
						onKeyDown={handleKeyDown}
						aria-invalid={!!validation.industry.error}
					>
						{industryOptions.map(option => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem
									value={option.value}
									id={`industry-${option.value}`}
									aria-describedby={`industry-${option.value}-desc`}
								/>
								<Label
									htmlFor={`industry-${option.value}`}
									className="marketing-list-item cursor-pointer flex-1"
								>
									{option.label}
								</Label>
								{/* Hidden description for screen readers */}
								<span id={`industry-${option.value}-desc`} className="sr-only">
									{option.description}
								</span>
							</div>
						))}
					</RadioGroup>
				</fieldset>

				{/* Error message */}
				{validation.industry.error && (
					<div
						id="industry-error"
						className="flex items-center gap-2 text-sm text-destructive-600"
						role="alert"
						aria-live="polite"
					>
						<AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
						{validation.industry.error}
					</div>
				)}

				{/* Success message for screen readers */}
				{formData.industry && !validation.industry.error && (
					<div className="sr-only" role="status" aria-live="polite">
						Industry selected:{' '}
						{
							industryOptions.find(opt => opt.value === formData.industry)
								?.label
						}
					</div>
				)}

				{/* Help text */}
				<div id="industry-help" className="sr-only">
					Use arrow keys to navigate between industry options, or click to
					select your industry. This is the final step.
				</div>
			</div>

			{/* Buttons - moved from modal footer */}
			<div className="flex justify-between items-center pt-4">
				{/* Back button */}
				<div className="flex-1">
					<Button
						size="lg"
						variant="ghost"
						onClick={previousStep}
						disabled={isSubmitting}
						className="flex items-center gap-2"
						aria-label="Go back to team size selection step"
					>
						<ArrowLeft aria-hidden="true" />
						Back
					</Button>
				</div>

				{/* Primary action button - Final submission */}
				<div className="flex-1 flex justify-end">
					<Button
						variant="primary"
						size="lg"
						onClick={handlePrimaryAction}
						disabled={isSubmitting}
						className="flex items-center gap-2 min-w-[140px]"
						aria-describedby="submit-button-help"
					>
						{isSubmitting ? (
							<>
								<div
									className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
									aria-hidden="true"
								/>
								<span className="sr-only">
									Submitting your registration information, please wait
								</span>
								Submitting...
							</>
						) : (
							<>Complete request</>
						)}
					</Button>

					{/* Button help text */}
					<div id="submit-button-help" className="sr-only">
						Submit your registration information to complete the early access
						signup
					</div>
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
					Select your industry from the radio button options. Use arrow keys to
					navigate between choices, or click to select. This is the final step
					of the registration process. Error messages will be announced
					automatically. Press Enter or click &quot;Get early access&quot; to
					submit your registration.
				</p>
			</div>
		</div>
	);
};

export default Step4IndustryForm;
