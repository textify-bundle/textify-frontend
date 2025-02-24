import '@testing-library/jest-dom';
import './__mocks__/workerMock';

// Mock environment variables
(global as any).import = {
  meta: {
    env: {
      VITE_SUPABASE_URL: 'https://test.supabase.co',
      VITE_SUPABASE_KEY: 'test-key'
    }
  }
};