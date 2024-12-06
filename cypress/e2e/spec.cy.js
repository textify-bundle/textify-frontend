describe('template spec', () => {
  it('passes', () => {
    cy.intercept('GET', 'https://example.com/api/data', { fixture: 'mockData.json' }).as('getData');
    cy.visit('https://example.cypress.io');
    cy.wait('@getData').then((interception) => {
      expect(interception.response.body.data.name).to.eq('Mock Item');
    });
  });
});