describe('Porfolio page', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'My Portfolio');
  });
});

describe('Deposit an asset', () => {
  it('Should wait for API to load before clicking button', () => {
    cy.intercept('GET', 'https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd').as('apiCall');
    cy.visit('/');
    cy.wait('@apiCall');
    cy.get('button[data-testid="manage-holdings-button"]').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('be.visible');
  });

  it('Sould error on invalid amount', () => {
    cy.intercept('GET', 'https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd').as('apiCall');
    cy.visit('/');
    cy.wait('@apiCall');
    cy.get('button[data-testid="manage-holdings-button"]').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('be.visible');
    cy.get('input[data-testid="deposit-coin-select-textfield"]').click();
    cy.get('div[data-testid="deposit-bitcoin-coin-select-option"]').click();
    cy.get('input[data-testid="deposit-amount-textfield"]').clear().type('-0.1');
    cy.contains('p', 'Amount must be greater than 0.0001');
  });

  it('Sould deposit asset', () => {
    cy.intercept('GET', 'https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd').as('apiCall');
    cy.visit('/');
    cy.wait('@apiCall');
    cy.get('button[data-testid="manage-holdings-button"]').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('be.visible');
    cy.get('input[data-testid="deposit-coin-select-textfield"]').click();
    cy.get('div[data-testid="deposit-bitcoin-coin-select-option"]').click();
    cy.get('input[data-testid="deposit-amount-textfield"]').clear().type('1');
    cy.get('button[data-testid="deposit-submit-button"]').contains('Confirm Deposit').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('not.exist');
    cy.get('tr[data-testid="bitcoin-asset-table-row"]').should('to.exist');
  });
});

describe('Withdraw an asset', () => {
  beforeEach(() => {
    cy.depositAsset('bitcoin', '1');
  });

  it('Should not find asset if attempting to withdraw an asset you do not have', () => {
    cy.intercept('GET', 'https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd').as('apiCall');
    cy.visit('/');
    cy.wait('@apiCall');
    cy.get('button[data-testid="manage-holdings-button"]').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('be.visible');
    cy.get('button[data-testid="asset-withdrawal-tab"]').click();
    cy.get('input[data-testid="withdrawal-coin-select-textfield"]').clear().type('tether');
    cy.contains('p', 'Coin not found');
  });

  it('Should not allow withdrawal of maount greater than hold amount', () => {
    cy.intercept('GET', 'https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd').as('apiCall');
    cy.visit('/');
    cy.wait('@apiCall');
    cy.get('button[data-testid="manage-holdings-button"]').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('be.visible');
    cy.get('button[data-testid="asset-withdrawal-tab"]').click();
    cy.get('input[data-testid="withdrawal-coin-select-textfield"]').click();
    cy.get('div[data-testid="withdrawal-bitcoin-coin-select-option"]').click();
    cy.get('input[data-testid="hold-amount-textfield"]').should('have.value', '1');
    cy.get('input[data-testid="withdrawal-amount-textfield"]').clear().type('2');
    cy.contains('p', 'Amount must be less than or equal to hodl amount');
  });

  it('Should not allow withdrawal of maount greater than hold amount', () => {
    cy.intercept('GET', 'https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd').as('apiCall');
    cy.visit('/');
    cy.wait('@apiCall');
    cy.get('button[data-testid="manage-holdings-button"]').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('be.visible');
    cy.get('button[data-testid="asset-withdrawal-tab"]').click();
    cy.get('input[data-testid="withdrawal-coin-select-textfield"]').click();
    cy.get('div[data-testid="withdrawal-bitcoin-coin-select-option"]').click();
    cy.get('input[data-testid="hold-amount-textfield"]').should('have.value', '1');
    cy.get('input[data-testid="withdrawal-amount-textfield"]').clear().type('2');
    cy.contains('p', 'Amount must be less than or equal to hodl amount');
  });

  it('Should withdraw the asset', () => {
    cy.intercept('GET', 'https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd').as('apiCall');
    cy.visit('/');
    cy.wait('@apiCall');
    cy.get('button[data-testid="manage-holdings-button"]').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('be.visible');
    cy.get('button[data-testid="asset-withdrawal-tab"]').click();
    cy.get('input[data-testid="withdrawal-coin-select-textfield"]').click();
    cy.get('div[data-testid="withdrawal-bitcoin-coin-select-option"]').click();
    cy.get('input[data-testid="hold-amount-textfield"]').should('have.value', '1');
    cy.get('input[data-testid="withdrawal-amount-textfield"]').clear().type('1');
    cy.get('button[data-testid="withdrawal-submit-button"]').contains('Confirm Withdrawal').click();
    cy.get('div[data-testid="manage-holdings-modal"]').should('not.exist');
    cy.get('tr[data-testid="bitcoin-asset-table-row"]').should('not.exist');
  });

});

describe('Asset Details page', () => {
  beforeEach(() => {
    cy.depositAsset('bitcoin', '1');
  });

  it('Move to asset detail page', () => {
    cy.get('tr[data-testid="bitcoin-asset-table-row"]').click();
    cy.contains('h1', 'Bitcoin');
  });
});