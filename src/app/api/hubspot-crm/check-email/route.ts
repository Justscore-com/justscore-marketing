import { NextResponse } from 'next/server';

/**
 * HubSpot Email Validation API
 *
 * This endpoint ONLY checks if an email already exists in HubSpot
 * It does NOT submit any form data or create new contacts
 *
 * Required Environment Variables:
 * - HUBSPOT_ACCESS_TOKEN: Private app access token for contact search
 */

interface HubSpotContact {
	id: string;
	properties: {
		email: string;
		firstname?: string;
		lastname?: string;
		createdate: string;
		[key: string]: any;
	};
}

interface HubSpotSearchResponse {
	total: number;
	results: HubSpotContact[];
}

/**
 * Check if a contact already exists in HubSpot by email
 */
async function checkExistingContact(
	email: string
): Promise<HubSpotContact | null> {
	try {
		// Validate environment variables
		if (!process.env.HUBSPOT_ACCESS_TOKEN) {
			console.error('Missing HubSpot access token for contact search');
			return null;
		}

		console.log(`Checking if contact exists for email: ${email}`);

		const searchResponse = await fetch(
			`https://api.hubapi.com/crm/v3/objects/contacts/search`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
				},
				body: JSON.stringify({
					filterGroups: [
						{
							filters: [
								{
									propertyName: 'email',
									operator: 'EQ',
									value: email,
								},
							],
						},
					],
					properties: [
						'email',
						'firstname',
						'lastname',
						'createdate',
						'role',
						'team_size',
						'industry',
					],
					limit: 1,
				}),
			}
		);

		if (!searchResponse.ok) {
			const errorText = await searchResponse.text();
			console.error('HubSpot contact search failed:', {
				status: searchResponse.status,
				error: errorText,
			});
			return null;
		}

		const searchResult: HubSpotSearchResponse = await searchResponse.json();

		if (searchResult.total > 0 && searchResult.results.length > 0) {
			console.log(`Found existing contact: ${searchResult.results[0].id}`);
			return searchResult.results[0];
		}

		console.log('No existing contact found');
		return null;
	} catch (error) {
		console.error('Error checking existing contact:', error);
		return null;
	}
}

export async function POST(request: Request) {
	try {
		const { email } = await request.json();

		console.log('Email validation check for:', email);

		// Validate required fields
		if (!email) {
			return NextResponse.json(
				{
					error: 'Missing required fields',
					message: 'Email address is required',
				},
				{ status: 400 }
			);
		}

		// Validate environment variables
		if (!process.env.HUBSPOT_ACCESS_TOKEN) {
			console.error('Missing HubSpot access token');
			return NextResponse.json(
				{
					error: 'Configuration error',
					message: 'HubSpot access token is required',
				},
				{ status: 500 }
			);
		}

		// Check if user is already registered
		console.log('Checking for existing registration...');
		const existingContact = await checkExistingContact(email);

		if (existingContact) {
			const registrationDate = new Date(
				existingContact.properties.createdate
			).toLocaleDateString();
			const contactName = existingContact.properties.firstname
				? `${existingContact.properties.firstname} ${existingContact.properties.lastname || ''}`.trim()
				: email;

			console.log(
				`User already registered: ${existingContact.id} on ${registrationDate}`
			);

			return NextResponse.json(
				{
					success: false,
					alreadyRegistered: true,
					message: `You're already registered for our Early Access Program!`,
					details: {
						registrationDate,
						contactName,
						email: existingContact.properties.email,
						contactId: existingContact.id,
					},
				},
				{ status: 200 }
			);
		}

		// Email is available for registration
		console.log('Email is available for registration');
		return NextResponse.json(
			{
				success: true,
				alreadyRegistered: false,
				message: 'Email is available for registration',
				data: {
					email,
					available: true,
				},
			},
			{ status: 200 }
		);
	} catch (error: unknown) {
		console.error('Server error:', error);

		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error occurred';

		return NextResponse.json(
			{
				success: false,
				error: 'Internal server error',
				message: 'Failed to validate email',
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
