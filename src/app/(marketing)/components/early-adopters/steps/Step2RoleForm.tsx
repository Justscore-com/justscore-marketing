'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/core/RadioGroup';
import { Label } from '@/components/ui/core/Label';
import { Button } from '@/components/ui/core/Button';
import {
	useEarlyAdoptersStore,
	type UserRole,
} from '@/store/early-adopters-store';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

const Step2RoleForm: React.FC = () => {
	const {
		formData,
		validation,
		isSubmitting,
		updateRole,
		validateCurrentStep,
		nextStep,
		previousStep,
	} = useEarlyAdoptersStore();

	// Refs for focus and announcement management
	const radioGroupRef = useRef<HTMLDivElement>(null);
	const errorAnnouncementRef = useRef<HTMLDivElement>(null);
	const previousErrorRef = useRef<string>('');

	const roleOptions: Array<{
		value: UserRole;
		label: string;
		description?: string;
	}> = [
		{
			value: 'Chief X Officer',
			label: 'Chief X Officer',
			description: 'C-level executive position',
		},
		{
			value: 'VP',
			label: 'Vice President',
			description: 'Senior leadership role',
		},
		{
			value: 'Snr Director',
			label: 'Director',
			description: 'Senior management position',
		},
		{
			value: 'Director',
			label: 'Head of Dept',
			description: 'Dept Management position',
		},
		{
			value: 'Snr Manager',
			label: 'Senior Manager',
			description: 'Senior management role',
		},
		{
			value: 'Manager',
			label: 'Manager',
			description: 'Team management position',
		},
		{
			value: 'Team Lead',
			label: 'Team Lead',
			description: 'Team leadership role',
		},
		{
			value: 'Other',
			label: 'Other',
			description: 'Different role not listed above',
		},
	];

	const handleRoleChange = useCallback(
		(value: string) => {
			updateRole(value as UserRole);

			// Announce selection to screen readers
			const selectedOption = roleOptions.find(option => option.value === value);
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
		[updateRole, roleOptions]
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			// Handle Enter key on focused radio group
			if (e.key === 'Enter' && formData.role) {
				handlePrimaryAction();
			}
		},
		[formData.role]
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
			validation.role.error &&
			validation.role.error !== previousErrorRef.current
		) {
			previousErrorRef.current = validation.role.error;

			// Create announcement for screen readers
			if (errorAnnouncementRef.current) {
				errorAnnouncementRef.current.textContent = `Error: ${validation.role.error}`;
			}

			// Also announce via temporary live region for immediate feedback
			const announcer = document.createElement('div');
			announcer.setAttribute('aria-live', 'assertive');
			announcer.setAttribute('aria-atomic', 'true');
			announcer.className = 'sr-only';
			announcer.textContent = `Role selection error: ${validation.role.error}`;

			document.body.appendChild(announcer);

			setTimeout(() => {
				if (document.body.contains(announcer)) {
					document.body.removeChild(announcer);
				}
			}, 1000);
		} else if (!validation.role.error) {
			previousErrorRef.current = '';
			if (errorAnnouncementRef.current) {
				errorAnnouncementRef.current.textContent = '';
			}
		}
	}, [validation.role.error]);

	return (
		<div>
			{/* Title and Description - moved from modal header */}
			<div className="text-left space-y-1 pb-6">
				<h1 className="marketing-h5">What&apos;s your role?</h1>
				<p className="caption text-foreground-weak">
					Help us understand your position in your organization
				</p>
			</div>

			{/* Form content */}
			<div className="space-y-6">
				{/* Hidden heading for screen readers */}
				<h3 id="role-selection-heading" className="sr-only">
					Role Selection
				</h3>

				{/* Fieldset wrapper for radio group */}
				<fieldset
					className="space-y-2"
					aria-labelledby="role-selection-heading"
					aria-describedby={validation.role.error ? 'role-error' : 'role-help'}
					aria-required="true"
				>
					<legend className="sr-only">
						Select your role in the organization (required)
					</legend>

					<RadioGroup
						ref={radioGroupRef}
						value={formData.role || ''}
						onValueChange={handleRoleChange}
						className="space-y-2"
						onKeyDown={handleKeyDown}
						aria-invalid={!!validation.role.error}
					>
						{roleOptions.map(option => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem
									value={option.value}
									id={`role-${option.value}`}
									aria-describedby={`role-${option.value}-desc`}
								/>
								<Label
									htmlFor={`role-${option.value}`}
									className="marketing-list-item cursor-pointer flex-1"
								>
									{option.label}
								</Label>
								{/* Hidden description for screen readers */}
								<span id={`role-${option.value}-desc`} className="sr-only">
									{option.description}
								</span>
							</div>
						))}
					</RadioGroup>
				</fieldset>

				{/* Error message */}
				{validation.role.error && (
					<div
						id="role-error"
						className="flex items-center gap-2 text-sm text-destructive-600"
						role="alert"
						aria-live="polite"
					>
						<AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
						{validation.role.error}
					</div>
				)}

				{/* Success message for screen readers */}
				{formData.role && !validation.role.error && (
					<div className="sr-only" role="status" aria-live="polite">
						Role selected:{' '}
						{roleOptions.find(opt => opt.value === formData.role)?.label}
					</div>
				)}

				{/* Help text */}
				<div id="role-help" className="sr-only">
					Use arrow keys to navigate between options, or click to select your
					role.
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
						aria-label="Go back to email step"
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
									Processing your role selection, please wait
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
						Proceed to team size selection after choosing your role
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
					Select your role from the radio button options. Use arrow keys to
					navigate between choices, or click to select. Error messages will be
					announced automatically. Press Enter or click Continue to proceed to
					the next step.
				</p>
			</div>
		</div>
	);
};

export default Step2RoleForm;
