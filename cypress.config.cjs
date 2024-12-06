const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      require('@cypress/grep')(config);
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    fixturesFolder: 'cypress/fixtures',
    integrationFolder: 'cypress/e2e',
    supportFile: 'cypress/support/e2e.js',
  },
});