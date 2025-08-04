import { Client as HubspotClient } from '@hubspot/api-client';
import { NextResponse } from 'next/server';

const hubspotClient = new HubspotClient({
	accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

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

export async function POST(request: Request) {
	try {
		const body = await request.json();

		console.log('Environment check:', {
			hasToken: !!process.env.HUBSPOT_ACCESS_TOKEN,
			tokenLength: process.env.HUBSPOT_ACCESS_TOKEN?.length,
		});

		console.log('form_details', body);

		const { email, role, team_size, requestor_industry } = body;

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

		console.log('Creating contact in HubSpot CRM...');

		// Check if contact already exists
		let existingContact = null;
		try {
			const searchResponse =
				await hubspotClient.crm.contacts.searchApi.doSearch({
					filterGroups: [
						{
							filters: [
								{
									propertyName: 'email',
									operator: 'EQ' as any,
									value: email,
								},
							],
						},
					],
					properties: ['email', 'hs_object_id'],
					limit: 100,
					after: '0',
				});

			if (searchResponse.results && searchResponse.results.length > 0) {
				existingContact = searchResponse.results[0];
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('No existing contact found:', error.message);
			}
		}

		// Map values to HubSpot's allowed options
		const mappedTeamSize = teamSizeMap[team_size] || '1_5_people';
		const mappedRole = roleMap[role] || 'other';
		const mappedIndustry = industryMap[requestor_industry] || 'other';

		// Prepare contact properties
		const contactProperties = {
			email: email,
			role: mappedRole,
			team_size: mappedTeamSize,
			industry: mappedIndustry,
			lifecyclestage: 'marketingqualifiedlead',
		};

		let contact;
		if (existingContact) {
			contact = await hubspotClient.crm.contacts.basicApi.update(
				existingContact.id,
				{ properties: contactProperties }
			);
		} else {
			contact = await hubspotClient.crm.contacts.basicApi.create({
				properties: contactProperties,
			});
		}

		// Create deal for early access request
		let deal = null;
		try {
			const dealProperties = {
				dealname: `Early Access Request - ${role}`,
				dealstage: 'qualifiedtobuy',
				pipeline: 'default',
				amount: '0',
				dealtype: 'newbusiness',
				closedate: new Date(
					Date.now() + 30 * 24 * 60 * 60 * 1000
				).toISOString(), // 30 days from now
				description: `Early Access Request\nRole: ${role}\nTeam Size: ${team_size}\nIndustry: ${requestor_industry}`,
			};

			deal = await hubspotClient.crm.deals.basicApi.create({
				properties: dealProperties,
				associations: [
					{
						to: { id: contact.id },
						types: [
							{
								associationCategory: 'HUBSPOT_DEFINED' as any,
								associationTypeId: 3,
							},
						],
					},
				],
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error creating deal:', error.message);
			}
		}

		return NextResponse.json({
			success: true,
			message: 'Early access request submitted successfully to HubSpot',
			data: {
				contactId: contact.id,
				dealId: deal?.id || null,
				isNewContact: !existingContact,
			},
		});
	} catch (error: unknown) {
		console.error(
			'HubSpot CRM API Error:',
			error instanceof Error ? error.message : 'Unknown error'
		);

		return NextResponse.json(
			{
				error: 'Internal server error',
				message: 'Failed to submit to HubSpot CRM',
				details:
					process.env.NODE_ENV === 'development'
						? error instanceof Error
							? error.message
							: 'Unknown error'
						: undefined,
			},
			{ status: 500 }
		);
	}
}

// GET method is not needed for this implementation
export async function GET() {
	return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
