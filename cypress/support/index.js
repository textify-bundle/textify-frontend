beforeEach(() => {
    cy.intercept('GET', '/api/user', {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com'
    }).as('getUser');
  });
  