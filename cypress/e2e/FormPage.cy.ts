/// <reference types="cypress" />
describe('Form Page', () => {
  it('Have links', () => {
    cy.visit('/form');
    cy.contains('Home');
    cy.contains('About');
    cy.contains('Form');
  });

  it('Have text', () => {
    cy.visit('/form');
    cy.contains('Input known programmers');
  });

  it('On empty form shows errors', () => {
    cy.visit('/form');
    cy.get('button').click();
    cy.contains('Name shound contain only latin letters and start with capital');
    cy.contains('Date is required');
    cy.contains('Select sex');
    cy.contains('Please upload image');
  });
  it('Succesful form submit', () => {
    cy.visit('/form');
    cy.get('#name').type('Alexander');
    cy.get('#date').type('2009-12-12');
    cy.get('#check1').click();
    cy.get('#sexMale').click();
    cy.get('input[type=file]').selectFile('cypress/fixtures/photo.jpg');
    cy.wait(2000);

    cy.get('[alt="previewImage"]').should('have.attr', 'src');
    cy.get('button').click();
  });
});
