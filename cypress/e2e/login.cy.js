describe('Login', () => {
  beforeEach(() => cy.visit('/'));

  it('entra com usuário e senha válidos', () => {
    cy.getByTest('username').type(Cypress.env('USUARIO'));
    cy.getByTest('password').type(Cypress.env('SENHA'), { log: false });
    cy.getByTest('login-button').click();

    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

  it('bloqueia o acesso de usuário bloqueado', () => {
    cy.fixture('checkout').then(({ usuarios }) => {
      cy.getByTest('username').type(usuarios.bloqueado);
    });
    cy.getByTest('password').type(Cypress.env('SENHA'), { log: false });
    cy.getByTest('login-button').click();

    cy.getByTest('error')
      .should('be.visible')
      .and('contain', 'locked out');
  });

  it('mostra erro com senha incorreta', () => {
    cy.getByTest('username').type(Cypress.env('USUARIO'));
    cy.getByTest('password').type('senha-errada');
    cy.getByTest('login-button').click();

    cy.getByTest('error').should('contain', 'do not match');
  });

  it('exige o preenchimento do usuário', () => {
    cy.getByTest('login-button').click();
    cy.getByTest('error').should('contain', 'Username is required');
  });

  it('impede acesso direto à vitrine sem login', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false });
    cy.getByTest('error').should('contain', 'when you are logged in');
  });
});
