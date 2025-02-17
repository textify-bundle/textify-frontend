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
  