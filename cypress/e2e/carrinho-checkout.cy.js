describe('Carrinho e checkout', () => {
    beforeEach(() => {
    cy.login();
    cy.abrirVitrine();
  });

  it('adiciona e remove um produto do carrinho', () => {
    cy.getByTest('add-to-cart-sauce-labs-backpack').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');

    cy.getByTest('remove-sauce-labs-backpack').click();
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('finaliza uma compra com dois produtos', () => {
    cy.getByTest('add-to-cart-sauce-labs-backpack').click();
    cy.getByTest('add-to-cart-sauce-labs-bike-light').click();
    cy.get('.shopping_cart_badge').should('have.text', '2');

    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 2);
    cy.getByTest('checkout').click();

    cy.fixture('checkout').then(({ comprador }) => {
      cy.getByTest('firstName').type(comprador.nome);
      cy.getByTest('lastName').type(comprador.sobrenome);
      cy.getByTest('postalCode').type(comprador.cep);
    });
    cy.getByTest('continue').click();

    cy.url().should('include', '/checkout-step-two.html');
    cy.getByTest('finish').click();

    cy.get('.complete-header').should('contain', 'Thank you for your order');
  });

  it('exige o CEP no checkout', () => {
    cy.getByTest('add-to-cart-sauce-labs-backpack').click();
    cy.get('.shopping_cart_link').click();
    cy.getByTest('checkout').click();

    cy.getByTest('firstName').type('Maria');
    cy.getByTest('lastName').type('Teste');
    cy.getByTest('continue').click();

    cy.getByTest('error').should('contain', 'Postal Code is required');
  });
});
