describe('Example Test Suite', () => {
  it('should visit the homepage', () => {
    cy.visit('http://localhost:5173/0');
    cy.contains('h1', 'Test mock e2e');
  });
});