import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('HubSpot CRM API', () => {
	const testEmail = `test.${Date.now()}@example.com`;

	const testData = {
		company_email_address: testEmail,
		role: 'Manager',
		team_size: '6-10',
		requestor_industry: 'Technology',
	};

	it('should create a new contact and deal', async () => {
		const response = await fetch('/api/hubspot-crm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(testData),
		});

		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.success).toBe(true);
		expect(data.data.contactId).toBeDefined();
		expect(data.data.dealId).toBeDefined();
		expect(data.data.isNewContact).toBe(true);
	});

	it('should update existing contact and create new deal', async () => {
		const updatedData = {
			...testData,
			role: 'Director',
			team_size: '11-15',
		};

		const response = await fetch('/api/hubspot-crm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedData),
		});

		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.success).toBe(true);
		expect(data.data.contactId).toBeDefined();
		expect(data.data.dealId).toBeDefined();
		expect(data.data.isNewContact).toBe(false);
	});

	it('should handle missing email', async () => {
		const invalidData = {
			role: 'Manager',
			team_size: '6-10',
			requestor_industry: 'Technology',
		};

		const response = await fetch('/api/hubspot-crm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(invalidData),
		});

		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.error).toBe('Missing required fields');
	});

	it('should handle GET requests with 405', async () => {
		const response = await fetch('/api/hubspot-crm');
		const data = await response.json();

		expect(response.status).toBe(405);
		expect(data.error).toBe('Method not allowed');
	});
});
