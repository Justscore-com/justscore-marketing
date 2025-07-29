import { Client as HubspotClient } from '@hubspot/api-client';
import { NextResponse } from 'next/server';

const hubspotClient = new HubspotClient({
	accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const { company_email_address, role, team_size, requestor_industry } = body;

		// Validate required fields
		if (!company_email_address) {
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
									operator: 'EQ' as any, // Using type assertion since the enum is not exported
									value: company_email_address,
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

		// Prepare contact properties
		const contactProperties = {
			email: company_email_address,
			jobtitle: role || '',
			team_size: team_size || '',
			industry: requestor_industry || '',
			lifecyclestage: 'marketingqualifiedlead',
			hs_lead_source: 'Early Access Program',
			last_early_access_request_date: new Date().toISOString(),
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
				deal_description: `Early Access Request\nRole: ${role}\nTeam Size: ${team_size}\nIndustry: ${requestor_industry}`,
				hs_deal_source: 'Early Access Program',
			};

			deal = await hubspotClient.crm.deals.basicApi.create({
				properties: dealProperties,
				associations: [
					{
						to: { id: contact.id },
						types: [
							{
								associationCategory: 'HUBSPOT_DEFINED' as any, // Using type assertion since the enum is not exported
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
