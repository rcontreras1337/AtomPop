/**
 * Tests E2E para HDU-4: Fórmula Empírica y Molecular
 */

describe('HDU-4: Fórmula Empírica y Molecular', () => {
  beforeEach(() => {
    cy.visit('/formula-empirica');
  });

  describe('Carga de página', () => {
    it('debe cargar la página correctamente', () => {
      cy.contains('h1', 'Fórmula').should('be.visible');
      cy.contains('Empírica').should('be.visible');
      cy.contains('Molecular').should('be.visible');
    });

    it('debe mostrar los dos tabs de modo', () => {
      cy.get('[data-testid="tab-empirical"]').should('be.visible');
      cy.get('[data-testid="tab-molecular"]').should('be.visible');
    });

    it('debe iniciar en modo Empírica por defecto', () => {
      cy.contains('Ingresa los elementos y sus porcentajes').should('be.visible');
    });
  });

  describe('Cambio de modo', () => {
    it('debe cambiar a modo Molecular', () => {
      cy.get('[data-testid="tab-molecular"]').click();
      cy.contains('Calcula la fórmula molecular').should('be.visible');
    });

    it('debe cambiar de vuelta a modo Empírica', () => {
      cy.get('[data-testid="tab-molecular"]').click();
      cy.get('[data-testid="tab-empirical"]').click();
      cy.contains('Ingresa los elementos y sus porcentajes').should('be.visible');
    });
  });

  describe('Modo Empírica - Lista de elementos', () => {
    it('debe mostrar 2 filas de elementos iniciales', () => {
      cy.get('[data-testid^="element-row-"]').should('have.length', 2);
    });

    it('debe agregar un elemento', () => {
      cy.get('[data-testid="add-element-button"]').click();
      cy.get('[data-testid^="element-row-"]').should('have.length', 3);
    });

    it('debe eliminar un elemento', () => {
      cy.get('[data-testid="add-element-button"]').click();
      cy.get('[data-testid="element-remove-2"]').click();
      cy.get('[data-testid^="element-row-"]').should('have.length', 2);
    });

    it('debe seleccionar un elemento', () => {
      cy.get('[data-testid="element-select-0"]').select('C');
      cy.get('[data-testid="element-select-0"]').should('have.value', 'C');
    });

    it('debe ingresar un porcentaje', () => {
      cy.get('[data-testid="element-percentage-0"]').type('40');
      cy.get('[data-testid="element-percentage-0"]').should('have.value', '40');
    });

    it('debe calcular el total de porcentajes', () => {
      cy.get('[data-testid="element-percentage-0"]').type('40');
      cy.get('[data-testid="element-percentage-1"]').type('60');
      cy.get('[data-testid="total-percentage"]').should('contain', '100.00%');
    });
  });

  describe('Modo Empírica - Cálculo', () => {
    beforeEach(() => {
      // Cargar ejemplo CH2O
      cy.contains('Cargar ejemplo').click();
    });

    it('debe cargar el ejemplo correctamente', () => {
      cy.get('[data-testid="element-select-0"]').should('have.value', 'C');
      cy.get('[data-testid="element-percentage-0"]').should('have.value', '40.0');
    });

    it('debe calcular fórmula empírica', () => {
      cy.contains('button', 'Calcular Fórmula Empírica').click();
      cy.get('[data-testid="empirical-result"]').should('be.visible');
    });

    it('debe mostrar pasos del cálculo', () => {
      cy.contains('button', 'Calcular Fórmula Empírica').click();
      cy.contains('Pasos del cálculo').should('be.visible');
      // Los pasos se muestran como números en círculos
      cy.get('[class*="rounded-full"]').should('exist');
    });

    it('debe mostrar CH₂O como resultado', () => {
      cy.contains('button', 'Calcular Fórmula Empírica').click();
      cy.get('[data-testid="empirical-result"]').should('contain', 'CH');
    });

    it('debe limpiar resultados al presionar Limpiar', () => {
      cy.contains('button', 'Calcular Fórmula Empírica').click();
      cy.contains('button', 'Limpiar').click();
      cy.get('[data-testid="empirical-result"]').should('not.exist');
    });
  });

  describe('Modo Molecular - Inputs', () => {
    beforeEach(() => {
      cy.get('[data-testid="tab-molecular"]').click();
    });

    it('debe mostrar input de fórmula empírica', () => {
      cy.get('input[placeholder*="CH2O"]').should('be.visible');
    });

    it('debe mostrar input de masa experimental', () => {
      cy.get('[data-testid="experimental-mass-input"]').should('be.visible');
    });

    it('debe cargar ejemplo', () => {
      cy.contains('Cargar ejemplo').click();
      cy.get('input[placeholder*="CH2O"]').should('have.value', 'CH2O');
      cy.get('[data-testid="experimental-mass-input"]').should('have.value', '180');
    });

    it('debe mostrar masa de fórmula empírica', () => {
      cy.get('input[placeholder*="CH2O"]').type('CH2O');
      cy.contains('Masa de fórmula empírica').should('be.visible');
      cy.contains('30.0').should('be.visible');
    });
  });

  describe('Modo Molecular - Cálculo', () => {
    beforeEach(() => {
      cy.get('[data-testid="tab-molecular"]').click();
      cy.contains('Cargar ejemplo').click();
    });

    it('debe calcular fórmula molecular', () => {
      cy.contains('button', 'Calcular Fórmula Molecular').click();
      cy.get('[data-testid="molecular-result"]').should('be.visible');
    });

    it('debe mostrar multiplicador', () => {
      cy.contains('button', 'Calcular Fórmula Molecular').click();
      cy.contains('Multiplicador').should('be.visible');
      cy.contains('6').should('be.visible');
    });

    it('debe mostrar masas en el resultado', () => {
      cy.contains('button', 'Calcular Fórmula Molecular').click();
      cy.contains('Masa Empírica').should('be.visible');
      cy.contains('Masa Experimental').should('be.visible');
    });

    it('debe mostrar fórmula molecular correcta', () => {
      cy.contains('button', 'Calcular Fórmula Molecular').click();
      // La fórmula debe contener C6, H12, O6
      cy.get('[data-testid="molecular-result"]').should('be.visible');
    });
  });

  describe('Validaciones', () => {
    it('no debe calcular empírica sin elementos válidos', () => {
      cy.contains('button', 'Calcular Fórmula Empírica').should('be.disabled');
    });

    it('debe mostrar error si porcentajes no suman 100%', () => {
      cy.get('[data-testid="element-select-0"]').select('C');
      cy.get('[data-testid="element-percentage-0"]').type('30');
      cy.get('[data-testid="element-select-1"]').select('H');
      cy.get('[data-testid="element-percentage-1"]').type('30');
      cy.contains('suman').should('be.visible');
    });

    it('no debe calcular molecular sin fórmula válida', () => {
      cy.get('[data-testid="tab-molecular"]').click();
      cy.get('[data-testid="experimental-mass-input"]').type('180');
      cy.contains('button', 'Calcular Fórmula Molecular').should('be.disabled');
    });
  });

  describe('Responsive', () => {
    it('debe funcionar en móvil - modo empírica', () => {
      cy.viewport('iphone-x');
      cy.contains('Cargar ejemplo').click();
      cy.contains('button', 'Calcular Fórmula Empírica').click();
      cy.get('[data-testid="empirical-result"]').should('be.visible');
    });

    it('debe funcionar en móvil - modo molecular', () => {
      cy.viewport('iphone-x');
      cy.get('[data-testid="tab-molecular"]').click();
      cy.contains('Cargar ejemplo').click();
      cy.contains('button', 'Calcular Fórmula Molecular').click();
      cy.get('[data-testid="molecular-result"]').should('be.visible');
    });

    it('debe funcionar en tablet', () => {
      cy.viewport('ipad-2');
      cy.contains('Cargar ejemplo').click();
      cy.contains('button', 'Calcular Fórmula Empírica').click();
      cy.get('[data-testid="empirical-result"]').should('be.visible');
    });
  });

  describe('Navegación', () => {
    it('debe volver al inicio', () => {
      cy.contains('Volver al inicio').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });
});

