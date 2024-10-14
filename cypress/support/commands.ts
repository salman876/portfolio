/// <reference types="cypress" />
Cypress.Commands.add('depositAsset', (asset: string, amount: string) => {
    cy.intercept('GET', 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd').as('apiCall');
    cy.visit('/');
    cy.wait('@apiCall');
    cy.get('button[data-testid="manage-holdings-button"]').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('be.visible');
    cy.get('input[data-testid="deposit-coin-select-textfield"]').click();
    cy.get(`div[data-testid="deposit-${asset}-coin-select-option"]`).click();
    cy.get('input[data-testid="deposit-amount-textfield"]').clear().type(amount);
    cy.get('button[data-testid="deposit-submit-button"]').contains('Confirm Deposit').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('not.exist');
    cy.get(`tr[data-testid="${asset}-asset-table-row"]`).should('exist');
  });
  