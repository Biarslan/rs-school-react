/// <reference types="cypress" />
describe('404 Page', () => {
  it('Generate response', () => {
    cy.visit('/testingNotFound');
    cy.contains('Page Not Found');
  });
});
