import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      import('@cypress/grep').then((grep) => grep(config));
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
  },
});