import { mount } from 'cypress/react';

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      depositAsset(asset: string, amount: string): Chainable<void>
    }
  }
}
