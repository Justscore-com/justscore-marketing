// store/early-adopters-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Types for our form data
export type UserRole =
	| 'Chief X Officer'
	| 'VP'
	| 'Snr Director'
	| 'Director'
	| 'Snr Manager'
	| 'Manager'
	| 'Team Lead'
	| 'Other';

export type TeamSize = '1-5' | '6-10' | '11-15' | '16+';

export type Industry =
	| 'Technology'
	| 'Financial Services'
	| 'Healthcare'
	| 'Manufacturing'
	| 'Retail & E-commerce'
	| 'Professional Services'
	| 'Education'
	| 'Media & Entertainment'
	| 'Other';

export type EarlyAdopterStep = 1 | 2 | 3 | 4 | 5;

export interface EarlyAdopterFormData {
	role: UserRole | null;
	team_size: TeamSize | null;
	requestor_industry: Industry | null;
	email: string;
}

export interface EarlyAdopterValidation {
	email: {
		isValid: boolean;
		error: string | null;
	};
	role: {
		isValid: boolean;
		error: string | null;
	};
	team_size: {
		isValid: boolean;
		error: string | null;
	};
	requestor_industry: {
		isValid: boolean;
		error: string | null;
	};
}

interface EarlyAdoptersState {
	// Modal state
	isModalOpen: boolean;
	currentStep: EarlyAdopterStep;

	// Form data
	formData: EarlyAdopterFormData;

	// Validation
	validation: EarlyAdopterValidation;

	// Submission state
	isSubmitting: boolean;
	isSubmitted: boolean;
	submitError: string | null;

	// Duplicate email check state
	isCheckingDuplicate: boolean;
	duplicateCheckResult: {
		alreadyRegistered: boolean;
		registrationDate?: string;
		contactName?: string;
	} | null;

	// Social sharing
	hasShared: boolean;

	// Actions
	openModal: () => void;
	closeModal: () => void;
	nextStep: () => void;
	previousStep: () => void;
	goToStep: (step: EarlyAdopterStep) => void;

	// Form actions
	updateEmail: (email: string) => void;
	updateRole: (role: UserRole) => void;
	updateTeamSize: (teamSize: TeamSize) => void;
	updateIndustry: (industry: Industry) => void;

	// Validation actions
	validateEmail: () => boolean;
	validateRole: () => boolean;
	validateTeamSize: () => boolean;
	validateIndustry: () => boolean;
	validateCurrentStep: () => boolean;

	// Submission actions test
	submitForm: () => Promise<void>;

	// Duplicate email check
	checkDuplicateEmail: (email: string) => Promise<boolean>;

	// Social sharing
	markAsShared: () => void;

	// Reset
	resetForm: () => void;
	resetModal: () => void;
}

// Initial state values
const initialFormData: EarlyAdopterFormData = {
	role: null,
	team_size: null,
	requestor_industry: null,
	email: '',
};

const initialValidation: EarlyAdopterValidation = {
	email: { isValid: false, error: null },
	role: { isValid: false, error: null },
	team_size: { isValid: false, error: null },
	requestor_industry: { isValid: false, error: null },
};

// Email validation helper
const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email.trim());
};

export const useEarlyAdoptersStore = create<EarlyAdoptersState>()(
	devtools(
		(set, get) => ({
			// Initial state
			isModalOpen: false,
			currentStep: 1,
			formData: initialFormData,
			validation: initialValidation,
			isSubmitting: false,
			isSubmitted: false,
			submitError: null,
			isCheckingDuplicate: false,
			duplicateCheckResult: null,
			hasShared: false,

			// Modal actions
			openModal: () => {
				set(
					state => ({
						isModalOpen: true,
						currentStep: 1,
						// Reset form when opening modal
						formData: initialFormData,
						validation: initialValidation,
						isSubmitted: false,
						submitError: null,
						isCheckingDuplicate: false,
						duplicateCheckResult: null,
						hasShared: false,
					}),
					false,
					'openModal'
				);
			},

			closeModal: () => {
				set(
					state => ({
						isModalOpen: false,
					}),
					false,
					'closeModal'
				);
			},

			nextStep: () => {
				const { currentStep, validateCurrentStep } = get();

				// Validate current step before proceeding
				if (validateCurrentStep() && currentStep < 5) {
					set(
						state => ({
							currentStep: (state.currentStep + 1) as EarlyAdopterStep,
						}),
						false,
						'nextStep'
					);
				}
			},

			previousStep: () => {
				set(
					state => ({
						currentStep: Math.max(1, state.currentStep - 1) as EarlyAdopterStep,
					}),
					false,
					'previousStep'
				);
			},

			goToStep: step => {
				set(
					() => ({
						currentStep: step,
					}),
					false,
					'goToStep'
				);
			},

			// Form data actions
			updateEmail: email => {
				set(
					state => ({
						formData: { ...state.formData, email: email },
						// Clear validation error when user starts typing
						validation: {
							...state.validation,
							email: { isValid: false, error: null },
						},
					}),
					false,
					'updateEmail'
				);
			},

			updateRole: role => {
				set(
					state => ({
						formData: { ...state.formData, role },
						validation: {
							...state.validation,
							role: { isValid: true, error: null },
						},
					}),
					false,
					'updateRole'
				);
			},

			updateTeamSize: teamSize => {
				set(
					state => ({
						formData: { ...state.formData, team_size: teamSize },
						validation: {
							...state.validation,
							team_size: { isValid: true, error: null },
						},
					}),
					false,
					'updateTeamSize'
				);
			},

			updateIndustry: industry => {
				set(
					state => ({
						formData: { ...state.formData, requestor_industry: industry },
						validation: {
							...state.validation,
							requestor_industry: { isValid: true, error: null },
						},
					}),
					false,
					'updateIndustry'
				);
			},

			// Validation actions
			validateEmail: () => {
				const { formData } = get();
				const email = formData.email.trim();

				let isValid = false;
				let error: string | null = null;

				if (!email) {
					error = 'Email is required';
				} else if (!isValidEmail(email)) {
					error = 'Please enter a valid email address';
				} else {
					isValid = true;
				}

				set(
					state => ({
						validation: {
							...state.validation,
							email: { isValid, error },
						},
					}),
					false,
					'validateEmail'
				);

				return isValid;
			},

			validateRole: () => {
				const { formData } = get();
				const isValid = formData.role !== null;
				const error = isValid ? null : 'Please select your role';

				set(
					state => ({
						validation: {
							...state.validation,
							role: { isValid, error },
						},
					}),
					false,
					'validateRole'
				);

				return isValid;
			},

			validateTeamSize: () => {
				const { formData } = get();
				const isValid = formData.team_size !== null;
				const error = isValid ? null : 'Please select your team size';

				set(
					state => ({
						validation: {
							...state.validation,
							team_size: { isValid, error },
						},
					}),
					false,
					'validateTeamSize'
				);

				return isValid;
			},

			validateIndustry: () => {
				const { formData } = get();
				const isValid = formData.requestor_industry !== null;
				const error = isValid ? null : 'Please select your industry';

				set(
					state => ({
						validation: {
							...state.validation,
							requestor_industry: { isValid, error },
						},
					}),
					false,
					'validateIndustry'
				);

				return isValid;
			},

			validateCurrentStep: () => {
				const {
					currentStep,
					validateEmail,
					validateRole,
					validateTeamSize,
					validateIndustry,
				} = get();

				switch (currentStep) {
					case 1:
						return validateEmail();
					case 2:
						return validateRole();
					case 3:
						return validateTeamSize();
					case 4:
						return validateIndustry();
					case 5:
						return true; // Success step, always valid
					default:
						return false;
				}
			},

			// Duplicate email check (validation only, no form submission)
			checkDuplicateEmail: async (email: string) => {
				set(
					() => ({
						isCheckingDuplicate: true,
						duplicateCheckResult: null,
						submitError: null,
					}),
					false,
					'checkDuplicateEmail:start'
				);

				try {
					// Call the email validation endpoint (NOT the form submission endpoint)
					const response = await fetch('/api/hubspot-crm/check-email', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email }),
					});

					const result = await response.json();

					if (result.alreadyRegistered) {
						// User is already registered
						set(
							() => ({
								isCheckingDuplicate: false,
								duplicateCheckResult: {
									alreadyRegistered: true,
									registrationDate: result.details?.registrationDate,
									contactName: result.details?.contactName,
								},
							}),
							false,
							'checkDuplicateEmail:already_registered'
						);
						return false; // Cannot proceed
					} else {
						// Email is available, proceed to next step
						set(
							() => ({
								isCheckingDuplicate: false,
								duplicateCheckResult: {
									alreadyRegistered: false,
								},
							}),
							false,
							'checkDuplicateEmail:available'
						);
						return true; // Can proceed
					}
				} catch (error) {
					console.error('Error checking duplicate email:', error);

					// If duplicate check fails, allow them to proceed
					// (better UX than blocking the user)
					set(
						() => ({
							isCheckingDuplicate: false,
							duplicateCheckResult: null,
							submitError: 'Unable to verify email. Please try again.',
						}),
						false,
						'checkDuplicateEmail:error'
					);
					return true; // Allow to proceed despite error
				}
			},

			// Submission action (placeholder for now)
			submitForm: async () => {
				const {
					formData,
					validateEmail,
					validateRole,
					validateTeamSize,
					validateIndustry,
				} = get();

				// Validate all steps
				const isEmailValid = validateEmail();
				const isRoleValid = validateRole();
				const isTeamSizeValid = validateTeamSize();
				const isIndustryValid = validateIndustry();

				if (
					!isEmailValid ||
					!isRoleValid ||
					!isTeamSizeValid ||
					!isIndustryValid
				) {
					return;
				}

				set(
					() => ({ isSubmitting: true, submitError: null }),
					false,
					'submitForm:start'
				);

				try {
					// Simulate API call for now
					await new Promise(resolve => setTimeout(resolve, 1500));

					// For prototype phase, we'll just log the data
					console.log('Early adopter signup:', formData);

					const response = await fetch('/api/hubspot-crm', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(formData),
					});

					const result = await response.json();
					console.log('API Response:', result);

					set(
						() => ({
							isSubmitting: false,
							isSubmitted: true,
							currentStep: 5,
						}),
						false,
						'submitForm:success'
					);
				} catch (error) {
					set(
						() => ({
							isSubmitting: false,
							submitError: 'Something went wrong. Please try again.',
						}),
						false,
						'submitForm:error'
					);
				}
			},

			// Social sharing
			markAsShared: () => {
				set(() => ({ hasShared: true }), false, 'markAsShared');
			},

			// Reset actions
			resetForm: () => {
				set(
					() => ({
						formData: initialFormData,
						validation: initialValidation,
						isSubmitted: false,
						submitError: null,
						isCheckingDuplicate: false,
						duplicateCheckResult: null,
						hasShared: false,
					}),
					false,
					'resetForm'
				);
			},

			resetModal: () => {
				set(
					() => ({
						isModalOpen: false,
						currentStep: 1,
						formData: initialFormData,
						validation: initialValidation,
						isSubmitting: false,
						isSubmitted: false,
						submitError: null,
						isCheckingDuplicate: false,
						duplicateCheckResult: null,
						hasShared: false,
					}),
					false,
					'resetModal'
				);
			},
		}),
		{
			name: 'early-adopters-store',
		}
	)
);
