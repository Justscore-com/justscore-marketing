'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/core/RadioGroup';
import { Label } from '@/components/ui/core/Label';
import { Button } from '@/components/ui/core/Button';
import {
	useEarlyAdoptersStore,
	type TeamSize,
} from '@/store/early-adopters-store';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

const Step3TeamSizeForm: React.FC = () => {
	const {
		formData,
		validation,
		isSubmitting,
		updateTeamSize,
		validateCurrentStep,
		nextStep,
		previousStep,
	} = useEarlyAdoptersStore();

	// Refs for focus and announcement management
	const radioGroupRef = useRef<HTMLDivElement>(null);
	const errorAnnouncementRef = useRef<HTMLDivElement>(null);
	const previousErrorRef = useRef<string>('');

	const teamSizeOptions: Array<{
		value: TeamSize;
		label: string;
		description?: string;
	}> = [
		{
			value: '1-5',
			label: '1-5 people',
			description: 'Small team of 1 to 5 people',
		},
		{
			value: '6-10',
			label: '6-10 people',
			description: 'Medium team of 6 to 10 people',
		},
		{
			value: '11-15',
			label: '11-15 people',
			description: 'Large team of 11 to 15 people',
		},
		{
			value: '16+',
			label: '16+ people',
			description: 'Extra large team of 16 or more people',
		},
	];

	const handleTeamSizeChange = useCallback(
		(value: string) => {
			updateTeamSize(value as TeamSize);

			// Announce selection to screen readers
			const selectedOption = teamSizeOptions.find(
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
		[updateTeamSize, teamSizeOptions]
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			// Handle Enter key on focused radio group
			if (e.key === 'Enter' && formData.team_size) {
				handlePrimaryAction();
			}
		},
		[formData.team_size]
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
		await nextStep();
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
			validation.team_size.error &&
			validation.team_size.error !== previousErrorRef.current
		) {
			previousErrorRef.current = validation.team_size.error;

			// Create announcement for screen readers
			if (errorAnnouncementRef.current) {
				errorAnnouncementRef.current.textContent = `Error: ${validation.team_size.error}`;
			}

			// Also announce via temporary live region for immediate feedback
			const announcer = document.createElement('div');
			announcer.setAttribute('aria-live', 'assertive');
			announcer.setAttribute('aria-atomic', 'true');
			announcer.className = 'sr-only';
			announcer.textContent = `Team size selection error: ${validation.team_size.error}`;

			document.body.appendChild(announcer);

			setTimeout(() => {
				if (document.body.contains(announcer)) {
					document.body.removeChild(announcer);
				}
			}, 1000);
		} else if (!validation.team_size.error) {
			previousErrorRef.current = '';
			if (errorAnnouncementRef.current) {
				errorAnnouncementRef.current.textContent = '';
			}
		}
	}, [validation.team_size.error]);

	return (
		<div>
			{/* Title and Description - moved from modal header */}
			<div className="text-left space-y-1 pb-6">
				<h2 className="marketing-h5">Team size</h2>
				<p className="caption text-foreground-weak">
					How many people are in your team?
				</p>
			</div>

			{/* Form content */}
			<div className="space-y-6">
				{/* Hidden heading for screen readers */}
				<h3 id="team-size-heading" className="sr-only">
					Team Size Selection
				</h3>

				{/* Fieldset wrapper for radio group */}
				<fieldset
					className="space-y-2"
					aria-labelledby="team-size-heading"
					aria-describedby={
						validation.team_size.error ? 'team-size-error' : 'team-size-help'
					}
					aria-required="true"
				>
					<legend className="sr-only">Select your team size (required)</legend>

					<RadioGroup
						ref={radioGroupRef}
						value={formData.team_size || ''}
						onValueChange={handleTeamSizeChange}
						className="space-y-2"
						onKeyDown={handleKeyDown}
						aria-invalid={!!validation.team_size.error}
					>
						{teamSizeOptions.map(option => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem
									value={option.value}
									id={`team-size-${option.value}`}
									aria-describedby={`team-size-${option.value}-desc`}
								/>
								<Label
									htmlFor={`team-size-${option.value}`}
									className="marketing-list-item cursor-pointer flex-1"
								>
									{option.label}
								</Label>
								{/* Hidden description for screen readers */}
								<span id={`team-size-${option.value}-desc`} className="sr-only">
									{option.description}
								</span>
							</div>
						))}
					</RadioGroup>
				</fieldset>

				{/* Error message */}
				{validation.team_size.error && (
					<div
						id="team-size-error"
						className="flex items-center gap-2 text-sm text-destructive-600"
						role="alert"
						aria-live="polite"
					>
						<AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
						{validation.team_size.error}
					</div>
				)}

				{/* Success message for screen readers */}
				{formData.team_size && !validation.team_size.error && (
					<div className="sr-only" role="status" aria-live="polite">
						Team size selected:{' '}
						{
							teamSizeOptions.find(opt => opt.value === formData.team_size)
								?.label
						}
					</div>
				)}

				{/* Help text */}
				<div id="team-size-help" className="sr-only">
					Use arrow keys to navigate between team size options, or click to
					select your team size.
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
						aria-label="Go back to role selection step"
					>
						<ArrowLeft aria-hidden="true" />
						Back
					</Button>
				</div>

				{/* Primary action button */}
				<div className="flex-1 flex justify-end">
					<Button
						variant="primary"
						size="lg"
						onClick={handlePrimaryAction}
						disabled={isSubmitting}
						className="flex items-center gap-2 min-w-[140px]"
						aria-describedby="continue-button-help"
					>
						{isSubmitting ? (
							<>
								<div
									className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
									aria-hidden="true"
								/>
								<span className="sr-only">
									Processing your team size selection, please wait
								</span>
								Processing...
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
						Proceed to industry selection after choosing your team size
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
					Select your team size from the radio button options. Use arrow keys to
					navigate between choices, or click to select. Error messages will be
					announced automatically. Press Enter or click Continue to proceed to
					the next step.
				</p>
			</div>
		</div>
	);
};

export default Step3TeamSizeForm;
