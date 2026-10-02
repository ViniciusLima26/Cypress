// Atalho para buscar elementos pelo atributo data-test usado no Swag Labs
// Uso: cy.getByTest('login-button')
Cypress.Commands.add('getByTest', (valor) => cy.get(`[data-test="${valor}"]`));

// Login com cache de sessão: o login pela tela acontece uma vez e as
// próximas chamadas reaproveitam a sessão, deixando a suíte mais rápida.
Cypress.Commands.add('login', (
  usuario = Cypress.env('USUARIO'),
  senha = Cypress.env('SENHA'),
) => {
  cy.session(
    [usuario],
    () => {
      cy.visit('/');
      cy.getByTest('username').type(usuario);
      cy.getByTest('password').type(senha, { log: false });
      cy.getByTest('login-button').click();
      cy.url().should('include', '/inventory.html');
    },
    {
      validate: () => cy.getCookie('session-username').should('exist'),
    },
  );
});
