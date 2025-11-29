// ***********************************************************
// Cypress E2E Support File
// Este archivo se ejecuta antes de cada test E2E
// ***********************************************************

// Importar comandos de testing-library
import '@testing-library/cypress/add-commands';

// Comando personalizado para visitar una página y esperar que cargue
Cypress.Commands.add('visitAndWait', (url: string) => {
  cy.visit(url);
  cy.get('body').should('be.visible');
});

// Comando para ingresar una fórmula química
Cypress.Commands.add('enterFormula', (formula: string) => {
  cy.get('input[placeholder*="H2O"]').clear().type(formula);
});

// Comando para clickear el botón de calcular
Cypress.Commands.add('clickCalculate', () => {
  cy.contains('button', 'Calcular').click();
});

// Declaraciones de tipos para los comandos personalizados
declare global {
  namespace Cypress {
    interface Chainable {
      visitAndWait(url: string): Chainable<void>;
      enterFormula(formula: string): Chainable<void>;
      clickCalculate(): Chainable<void>;
    }
  }
}

export {};

