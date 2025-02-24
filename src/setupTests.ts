import '@testing-library/jest-dom';
import './__mocks__/workerMock';
import { vi } from 'vitest';

// Mock environment variables
vi.mock('./utils/client', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          data: [],
          error: null
        })
      })
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: { id: '1' } }, error: null })
    }
  }
}));

// Mock Web Worker
class MockWorker {
  addEventListener() {}
  removeEventListener() {}
  postMessage() {}
}

vi.stubGlobal('Worker', MockWorker);

// Set environment variables
process.env.VITE_SUPABASE_URL = 'https://test.supabase.co';
process.env.VITE_SUPABASE_KEY = 'test-key';