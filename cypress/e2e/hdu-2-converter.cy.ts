/**
 * Tests E2E para HDU-2: Conversor de Moles/Gramos/Partículas
 */

describe('HDU-2: Conversor de Unidades', () => {
  beforeEach(() => {
    cy.visit('/conversor');
  });

  describe('Carga de página', () => {
    it('debe cargar la página correctamente', () => {
      cy.contains('h1', 'Conversor').should('be.visible');
      cy.contains('Convierte entre moles, gramos y partículas').should('be.visible');
    });

    it('debe mostrar mensaje inicial sin fórmula', () => {
      cy.contains('Ingresa un compuesto para comenzar').should('be.visible');
    });

    it('debe mostrar ejemplos de fórmulas', () => {
      cy.contains('Ejemplos:').should('be.visible');
      cy.contains('button', 'H2O').should('be.visible');
      cy.contains('button', 'NaCl').should('be.visible');
      cy.contains('button', 'C6H12O6').should('be.visible');
    });

    it('debe mostrar el número de Avogadro', () => {
      cy.contains('Número de Avogadro').should('be.visible');
      cy.contains('10²³').should('be.visible');
    });
  });

  describe('Input de fórmula', () => {
    it('debe mostrar masa molar al ingresar fórmula válida', () => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('Masa Molar:').should('be.visible');
      cy.contains('18.015 g/mol').should('be.visible');
    });

    it('debe mostrar los 3 inputs de conversión con fórmula válida', () => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('MOLES').should('be.visible');
      cy.contains('GRAMOS').should('be.visible');
      cy.contains('PARTÍCULAS').should('be.visible');
    });

    it('debe mostrar error para fórmula inválida', () => {
      cy.get('input[placeholder*="H2O"]').type('Xyz');
      // Debe mostrar indicador de error (el input mostrará el error)
      cy.wait(400); // Esperar debounce
      // Los inputs de conversión NO deben aparecer
      cy.get('[data-testid="converter-input-cyan"]').should('not.exist');
    });

    it('debe usar ejemplo al hacer click', () => {
      cy.contains('button', 'NaCl').click();
      cy.get('input[placeholder*="H2O"]').should('have.value', 'NaCl');
      cy.contains('58.44').should('be.visible');
    });
  });

  describe('Conversión desde Moles', () => {
    beforeEach(() => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
    });

    it('debe calcular gramos al ingresar moles', () => {
      cy.get('[data-testid="converter-input-cyan"]').type('1');
      
      // 1 mol H2O = 18.015 g
      cy.get('[data-testid="converter-input-amber"]')
        .invoke('val')
        .should('not.be.empty');
    });

    it('debe calcular partículas al ingresar moles', () => {
      cy.get('[data-testid="converter-input-cyan"]').type('1');
      
      // 1 mol = 6.022e23 partículas
      cy.get('[data-testid="converter-input-purple"]')
        .invoke('val')
        .should('not.be.empty');
    });

    it('debe mostrar badge "editando" en campo activo', () => {
      cy.get('[data-testid="converter-input-cyan"]').type('1');
      cy.contains('editando').should('be.visible');
    });

    it('debe mostrar badge "calculado" en campos calculados', () => {
      cy.get('[data-testid="converter-input-cyan"]').type('1');
      cy.contains('calculado').should('be.visible');
    });
  });

  describe('Conversión desde Gramos', () => {
    beforeEach(() => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
    });

    it('debe calcular moles al ingresar gramos', () => {
      cy.get('[data-testid="converter-input-amber"]').type('18.015');
      
      // 18.015 g H2O = 1 mol
      cy.get('[data-testid="converter-input-cyan"]')
        .invoke('val')
        .should('not.be.empty');
    });

    it('debe calcular partículas al ingresar gramos', () => {
      cy.get('[data-testid="converter-input-amber"]').type('18.015');
      
      cy.get('[data-testid="converter-input-purple"]')
        .invoke('val')
        .should('not.be.empty');
    });
  });

  describe('Conversión desde Partículas', () => {
    beforeEach(() => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
    });

    it('debe calcular moles al ingresar partículas', () => {
      cy.get('[data-testid="converter-input-purple"]').type('6.022e23');
      
      // 6.022e23 partículas = 1 mol
      cy.get('[data-testid="converter-input-cyan"]')
        .invoke('val')
        .should('not.be.empty');
    });

    it('debe aceptar notación científica', () => {
      cy.get('[data-testid="converter-input-purple"]').type('1e24');
      
      // No debe haber error
      cy.get('[data-testid="converter-input-cyan"]')
        .invoke('val')
        .should('not.be.empty');
    });
  });

  describe('Validaciones', () => {
    beforeEach(() => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
    });

    it('no debe aceptar valores negativos', () => {
      cy.get('[data-testid="converter-input-cyan"]').type('-5');
      
      // El valor debe ser positivo
      cy.get('[data-testid="converter-input-cyan"]')
        .invoke('val')
        .should('not.include', '-');
    });

    it('debe limpiar campos al hacer click en Limpiar', () => {
      cy.get('[data-testid="converter-input-cyan"]').type('5');
      
      // Esperar que aparezca el botón
      cy.contains('Limpiar valores').should('be.visible').click();
      
      cy.get('[data-testid="converter-input-cyan"]').should('have.value', '');
      cy.get('[data-testid="converter-input-amber"]').should('have.value', '');
      cy.get('[data-testid="converter-input-purple"]').should('have.value', '');
    });
  });

  describe('Fórmulas de referencia', () => {
    it('debe mostrar las fórmulas de conversión', () => {
      cy.contains('Fórmulas de Conversión').should('be.visible');
      cy.contains('moles × masa molar').should('be.visible');
      cy.contains('gramos ÷ masa molar').should('be.visible');
      cy.contains('moles × N').should('be.visible');
    });
  });

  describe('Responsive', () => {
    it('debe funcionar en móvil', () => {
      cy.viewport('iphone-x');
      
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('18.015 g/mol').should('be.visible');
      
      cy.get('[data-testid="converter-input-cyan"]').type('1');
      cy.get('[data-testid="converter-input-amber"]')
        .invoke('val')
        .should('not.be.empty');
    });

    it('debe funcionar en tablet', () => {
      cy.viewport('ipad-2');
      
      cy.get('input[placeholder*="H2O"]').type('NaCl');
      cy.contains('58.44').should('be.visible');
      
      cy.get('[data-testid="converter-input-amber"]').type('58.44');
      cy.get('[data-testid="converter-input-cyan"]')
        .invoke('val')
        .should('not.be.empty');
    });
  });

  describe('Navegación', () => {
    it('debe volver al inicio al hacer click en el botón', () => {
      cy.contains('Volver al inicio').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Compuestos complejos', () => {
    it('debe manejar Ca(OH)2 correctamente', () => {
      cy.get('input[placeholder*="H2O"]').type('Ca(OH)2');
      cy.contains('74.09').should('be.visible');
    });

    it('debe manejar glucosa C6H12O6', () => {
      cy.contains('button', 'C6H12O6').click();
      cy.contains('180.1').should('be.visible');
      
      // Los 3 inputs deben estar visibles
      cy.get('[data-testid="converter-input-amber"]').should('exist');
    });
  });
});

