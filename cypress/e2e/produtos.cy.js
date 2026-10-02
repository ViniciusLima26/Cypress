describe('Vitrine de produtos', () => {
    beforeEach(() => {
    cy.login();
    cy.abrirVitrine();
  });

  it('exibe os 6 produtos', () => {
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('ordena por preço, do menor para o maior', () => {
    cy.getByTest('product-sort-container').select('lohi');

    cy.get('.inventory_item_price').then(($precos) => {
      const valores = [...$precos].map((el) => Number(el.innerText.replace('$', '')));
      const ordenados = [...valores].sort((a, b) => a - b);
      expect(valores).to.deep.equal(ordenados);
    });
  });

  it('ordena por nome, de Z para A', () => {
    cy.getByTest('product-sort-container').select('za');

    cy.get('.inventory_item_name').then(($nomes) => {
      const nomes = [...$nomes].map((el) => el.innerText);
      const ordenados = [...nomes].sort().reverse();
      expect(nomes).to.deep.equal(ordenados);
    });
  });
});
