// Load environment variables
process.env.HUBSPOT_ACCESS_TOKEN = 'test-token';
process.env.NODE_ENV = 'test';

// Mock Next.js components/functions if needed
jest.mock('next/headers', () => ({
	headers: () => new Map(),
	cookies: () => new Map(),
}));
