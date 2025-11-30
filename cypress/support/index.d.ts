// Declaraciones de tipos para comandos personalizados de Cypress
declare namespace Cypress {
  interface Chainable {
    visitAndWait(url: string): Chainable<void>;
    enterFormula(formula: string): Chainable<void>;
    clickCalculate(): Chainable<void>;
  }
}

