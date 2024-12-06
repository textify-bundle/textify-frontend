describe('E2E Tests with Mocks', () => {
    beforeEach(() => {
      cy.mockApi('example.json');
    });
  
    it('should display data from the mock', () => {
      cy.visit('/');
      cy.contains('Using fixtures to represent data').should('be.visible');
      cy.contains('hello@cypress.io').should('be.visible');
      cy.contains('Fixtures are a great way to mock data for responses to routes').should('be.visible');
    });
  });