import { NextResponse } from 'next/server';

// Map our team size values to HubSpot's allowed options
const teamSizeMap: Record<string, string> = {
	'1-5': '1_5_people',
	'6-10': '6_10_people',
	'11-15': '11_15_people',
	'16+': '16_plus_people',
};

// Map our role values to HubSpot's allowed options
const roleMap: Record<string, string> = {
	'Chief X Officer': 'chief_officer',
	VP: 'vice_president',
	'Snr Director': 'senior_director',
	Director: 'director',
	'Snr Manager': 'senior_manager',
	Manager: 'manager',
	'Team Lead': 'team_lead',
	Other: 'other',
};

// Map our industry values to HubSpot's allowed options
const industryMap: Record<string, string> = {
	Technology: 'technology',
	'Financial Services': 'financial_services',
	Healthcare: 'healthcare',
	Manufacturing: 'manufacturing',
	'Retail & E-commerce': 'retail_ecommerce',
	'Professional Services': 'professional_services',
	Education: 'education',
	'Media & Entertainment': 'media_entertainment',
	Other: 'other',
};

interface FormSubmissionBody {
	email: string;
	role: string;
	team_size: string;
	requestor_industry: string;
	// Add other fields as needed
	first_name?: string;
	last_name?: string;
	company?: string;
	phone?: string;
	message?: string;
}

interface HubSpotFormField {
	name: string;
	value: string;
}

interface HubSpotFormsResponse {
	inlineMessage: string;
	redirectUri?: string;
}

export async function POST(request: Request) {
	try {
		const body: FormSubmissionBody = await request.json();

		console.log('Environment check:', {
			hasPortalId: !!process.env.HUBSPOT_PORTAL_ID,
			hasFormId: !!process.env.HUBSPOT_FORM_ID,
			portalIdLength: process.env.HUBSPOT_PORTAL_ID?.length,
			formIdLength: process.env.HUBSPOT_FORM_ID?.length,
		});

		console.log('Form submission details:', body);

		const {
			email,
			role,
			team_size,
			requestor_industry,
			first_name,
			last_name,
			company,
			phone,
			message,
		} = body;

		// Validate required fields
		if (!email) {
			return NextResponse.json(
				{
					error: 'Missing required fields',
					message: 'Company email address is required',
				},
				{ status: 400 }
			);
		}

		// Validate environment variables
		if (!process.env.HUBSPOT_PORTAL_ID || !process.env.HUBSPOT_FORM_ID) {
			console.error('Missing HubSpot configuration:', {
				portalId: !!process.env.HUBSPOT_PORTAL_ID,
				formId: !!process.env.HUBSPOT_FORM_ID,
			});
			return NextResponse.json(
				{
					error: 'Configuration error',
					message: 'HubSpot Portal ID and Form ID are required',
				},
				{ status: 500 }
			);
		}

		console.log('Submitting to HubSpot Forms API...');

		// Map values to HubSpot's allowed options
		const mappedTeamSize = teamSizeMap[team_size] || '1_5_people';
		const mappedRole = roleMap[role] || 'other';
		const mappedIndustry = industryMap[requestor_industry] || 'other';

		// Prepare form fields for HubSpot Forms API
		const formFields: HubSpotFormField[] = [
			{ name: 'email', value: email }, // Use 'email' as the standard field name
			{ name: 'email', value: email }, // Also send as custom field if needed
			{ name: 'role', value: mappedRole },
			{ name: 'team_size', value: mappedTeamSize },
			{ name: 'industry', value: mappedIndustry },
		];

		// Add optional fields if they exist
		if (first_name) {
			formFields.push({ name: 'firstname', value: first_name });
		}

		if (last_name) {
			formFields.push({ name: 'lastname', value: last_name });
		}

		if (company) {
			formFields.push({ name: 'company', value: company });
		}

		if (phone) {
			formFields.push({ name: 'phone', value: phone });
		}

		if (message) {
			formFields.push({ name: 'message', value: message });
		}

		// Filter out empty fields to avoid validation errors
		const validFields = formFields.filter(
			field => field.value && field.value.trim() !== ''
		);

		console.log('Sending fields to HubSpot:', validFields);

		// Submit to HubSpot Forms API
		const hubspotResponse = await fetch(
			`https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fields: validFields,
					context: {
						pageUri:
							request.headers.get('referer') ||
							process.env.NEXT_PUBLIC_SITE_URL ||
							'',
						pageName: 'Early Access Request Form',
						ipAddress:
							request.headers.get('x-forwarded-for') ||
							request.headers.get('x-real-ip') ||
							'unknown',
					},
					legalConsentOptions: {
						consent: {
							consentToProcess: true,
							text: 'I agree to allow this website to store and process my personal data for the purpose of this early access request.',
							communications: [
								{
									value: true,
									subscriptionTypeId: 999, // Replace with your actual subscription type ID
									text: 'I agree to receive communications about this early access program.',
								},
							],
						},
					},
				}),
			}
		);

		console.log('HubSpot response status:', hubspotResponse.status);

		if (hubspotResponse.ok) {
			const result: HubSpotFormsResponse = await hubspotResponse.json();
			console.log('HubSpot Forms API success:', result);

			return NextResponse.json({
				success: true,
				message: 'Early access request submitted successfully',
				data: {
					submissionId: result.inlineMessage,
					redirectUri: result.redirectUri || null,
					formSubmitted: true,
				},
			});
		} else {
			const errorText = await hubspotResponse.text();
			console.error('HubSpot Forms API Error:', {
				status: hubspotResponse.status,
				statusText: hubspotResponse.statusText,
				error: errorText,
			});

			// Try to parse error details
			let errorDetails;
			try {
				errorDetails = JSON.parse(errorText);
			} catch {
				errorDetails = { message: errorText };
			}

			return NextResponse.json(
				{
					success: false,
					message: 'Failed to submit early access request',
					error: errorDetails.message || 'Unknown error occurred',
					details:
						process.env.NODE_ENV === 'development' ? errorDetails : undefined,
				},
				{ status: 400 }
			);
		}
	} catch (error: unknown) {
		console.error('Server error:', error);

		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error occurred';

		return NextResponse.json(
			{
				success: false,
				error: 'Internal server error',
				message: 'Failed to process early access request',
				details:
					process.env.NODE_ENV === 'development' ? errorMessage : undefined,
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json(
		{
			error: 'Method not allowed',
			message: 'This endpoint only accepts POST requests',
		},
		{ status: 405 }
	);
}
