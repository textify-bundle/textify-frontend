describe('User Login and Project Creation', () => {
    it('should allow a user to log in and create a new project', () => {
      cy.visit('http://localhost:5173');
  
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/main');

      cy.contains('Новый проект').click();
  
      cy.get('input[name="projectName"]').type('e2e project');
      cy.get('button[name="modalButtonCreateProject"]').click();
 
      cy.contains('e2e project').should('exist');
    });
});
describe('Change project data', () => {
    it('should allow the user to change the text on the page', () => {
      cy.visit('http://localhost:5173');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/main');
      cy.contains('Главная').should('be.visible');
      cy.get('.project-card').eq(0).click();
      cy.get('.text-editor').type('Simple Example text')
      cy.contains('Simple Example text').should('exist');
    });
});