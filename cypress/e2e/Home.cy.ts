/// <reference types="cypress" />
describe('Home Page', () => {
  it('Have links', () => {
    cy.visit('/');
    cy.contains('Home');
    cy.contains('About');
    cy.contains('Form');
  });

  it('Have text', () => {
    cy.visit('/about');
    cy.contains('About');
  });

  it('Have input', () => {
    cy.visit('/');
    cy.get('input').should('have.length', 1);
  });

  it('Show search result', () => {
    cy.visit('/');
    cy.get('input').should('have.text', '');
    cy.get('input').type('Morty').should('have.value', 'Morty');
    cy.contains('Search').click();
    cy.contains('Morty Smith');
  });

  it('Modal is opening', () => {
    cy.visit('/');
    cy.get('input').should('have.text', '');
    cy.get('input').type('Morty').should('have.value', 'Morty');
    cy.contains('Search').click();
    cy.contains('Morty Smith').click();
    cy.get('[data-testid=modal-bg]').should('have.length', 1);
    cy.get('button').contains('X').click();
    cy.get('[data-testid=modal-bg]').should('have.length', 0);
  });
});
