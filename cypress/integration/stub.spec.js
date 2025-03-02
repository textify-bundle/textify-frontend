describe('User Login and Project Creation', () => {
    it('should allow a user to log in and create a new project', () => {
      cy.visit('http://localhost:5173');
  
      cy.get('input[name="email"]', { timeout: 10000 }).type('test@example.com');
      cy.get('input[name="password"]', { timeout: 10000 }).type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/main');

      cy.contains('Новый проект', { timeout: 10000 }).click();
  
      cy.get('input[name="projectName"]').type('e2e project');
      cy.get('button[name="modalButtonCreateProject"]').click();
 
      cy.contains('e2e project', { timeout: 10000 }).should('exist');
    });
});

describe('Change project data', () => {
    it('should allow the user to change the text on the page', () => {
      cy.visit('http://localhost:5173');
      cy.get('input[name="email"]', { timeout: 10000 }).type('test@example.com');
      cy.get('input[name="password"]', { timeout: 10000 }).type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/main');
      cy.contains('Главная', { timeout: 10000 }).should('be.visible');
      
      // Ждем загрузки проектов и кликаем по первому
      cy.get('.project-card', { timeout: 15000 }).should('be.visible').eq(0).click();
      
      // Ждем загрузки страницы проекта
      cy.url().should('include', '/project/');
      
      // Ждем загрузки редактора и проверяем его видимость
      cy.get('[class*="ql-editor"]', { timeout: 30000 }).should('be.visible');
      
      // Вводим текст и проверяем его наличие
      cy.get('[class*="ql-editor"]').type('Simple Example text');
      cy.contains('Simple Example text', { timeout: 10000 }).should('be.visible');
    });
});

describe('Title checker', () => {
    it('Should log in and verify the presence of the title', () => {
        cy.visit('http://localhost:5173');
  
        cy.get('input[name="email"]', { timeout: 10000 }).type('test@example.com');
        cy.get('input[name="password"]', { timeout: 10000 }).type('password123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/main');    
        cy.contains('Последние проекты', { timeout: 10000 }).should('exist');  
        cy.contains('Ваши проекты', { timeout: 10000 }).should('exist'); 
        cy.wait(4000);
        cy.contains('Корзина', { timeout: 10000 }).click();
        cy.url().should('include', '/trash');
        cy.contains('Удаленные проекты', { timeout: 10000 }).should('be.visible');
    });
});