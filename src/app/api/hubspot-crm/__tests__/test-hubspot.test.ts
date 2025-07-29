// Mock the HubSpot client
const mockSearchApi = {
	doSearch: jest.fn().mockResolvedValue({ results: [] }),
};

const mockBasicApi = {
	create: jest.fn().mockResolvedValue({
		id: 'test-contact-id',
		properties: {},
	}),
	update: jest.fn().mockResolvedValue({
		id: 'test-contact-id',
		properties: {},
	}),
};

const mockDealsApi = {
	create: jest.fn().mockResolvedValue({
		id: 'test-deal-id',
		properties: {},
	}),
};

jest.mock('@hubspot/api-client', () => {
	return {
		Client: jest.fn().mockImplementation(() => ({
			crm: {
				contacts: {
					searchApi: mockSearchApi,
					basicApi: mockBasicApi,
				},
				deals: {
					basicApi: mockDealsApi,
				},
			},
		})),
	};
});

// Import after mocks are set up
import { POST, GET } from '../route';

describe('HubSpot CRM API', () => {
	const testEmail = `test.${Date.now()}@example.com`;

	const testData = {
		company_email_address: testEmail,
		role: 'Manager',
		team_size: '6-10', // This will be mapped to '6_10_people' in the API
		requestor_industry: 'Technology',
	};

	beforeEach(() => {
		// Clear all mocks before each test
		jest.clearAllMocks();
		// Reset default mock implementations
		mockSearchApi.doSearch.mockResolvedValue({ results: [] });
	});

	it('should create a new contact and deal', async () => {
		const request = new Request(
			process.env.NEXT_PUBLIC_API_URL + '/api/hubspot-crm',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(testData),
			}
		);

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.success).toBe(true);
		expect(data.data.contactId).toBe('test-contact-id');
		expect(data.data.dealId).toBe('test-deal-id');
		expect(data.data.isNewContact).toBe(true);

		// Verify the correct API calls were made
		expect(mockSearchApi.doSearch).toHaveBeenCalledTimes(1);
		expect(mockBasicApi.create).toHaveBeenCalledTimes(1);
		expect(mockDealsApi.create).toHaveBeenCalledTimes(1);

		// Verify the contact properties were mapped correctly
		expect(mockBasicApi.create).toHaveBeenCalledWith({
			properties: expect.objectContaining({
				email: testEmail,
				team_size: '6_10_people',
				lead_source: 'Early Access Program',
			}),
		});
	});

	it('should update existing contact and create new deal', async () => {
		// Mock finding an existing contact
		mockSearchApi.doSearch.mockResolvedValueOnce({
			results: [
				{
					id: 'existing-contact-id',
					properties: {},
				},
			],
		});

		const updatedData = {
			...testData,
			role: 'Director',
			team_size: '11-15', // This will be mapped to '11_15_people' in the API
		};

		const request = new Request(
			process.env.NEXT_PUBLIC_API_URL + '/api/hubspot-crm',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedData),
			}
		);

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.success).toBe(true);
		expect(data.data.contactId).toBe('test-contact-id');
		expect(data.data.dealId).toBe('test-deal-id');
		expect(data.data.isNewContact).toBe(false);

		// Verify the correct API calls were made
		expect(mockSearchApi.doSearch).toHaveBeenCalledTimes(1);
		expect(mockBasicApi.update).toHaveBeenCalledTimes(1);
		expect(mockDealsApi.create).toHaveBeenCalledTimes(1);

		// Verify the contact properties were mapped correctly
		expect(mockBasicApi.update).toHaveBeenCalledWith('existing-contact-id', {
			properties: expect.objectContaining({
				email: testEmail,
				team_size: '11_15_people',
				lead_source: 'Early Access Program',
			}),
		});
	});

	it('should handle missing email', async () => {
		const invalidData = {
			role: 'Manager',
			team_size: '6-10',
			requestor_industry: 'Technology',
		};

		const request = new Request(
			process.env.NEXT_PUBLIC_API_URL + '/api/hubspot-crm',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(invalidData),
			}
		);

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.error).toBe('Missing required fields');

		// Verify no API calls were made
		expect(mockSearchApi.doSearch).not.toHaveBeenCalled();
		expect(mockBasicApi.create).not.toHaveBeenCalled();
		expect(mockDealsApi.create).not.toHaveBeenCalled();
	});

	it('should handle GET requests with 405', async () => {
		const response = await GET();
		const data = await response.json();

		expect(response.status).toBe(405);
		expect(data.error).toBe('Method not allowed');

		// Verify no API calls were made
		expect(mockSearchApi.doSearch).not.toHaveBeenCalled();
		expect(mockBasicApi.create).not.toHaveBeenCalled();
		expect(mockDealsApi.create).not.toHaveBeenCalled();
	});
});
