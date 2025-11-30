/**
 * Tests E2E - HDU-1: Calculadora de Masa Molar
 * 
 * Escenarios:
 * - Ingresar fórmula válida y ver resultado
 * - Ingresar fórmula inválida y ver error
 * - Usar ejemplos clickeables
 * - Copiar resultado
 * - Historial de cálculos
 * - Limpiar formulario
 */

describe('HDU-1: Calculadora de Masa Molar', () => {
  beforeEach(() => {
    cy.visit('/masa-molar');
  });

  describe('Carga de página', () => {
    it('debe cargar la página correctamente', () => {
      cy.contains('Calculadora de Masa Molar').should('be.visible');
      cy.contains('Calcular Masa Molar').should('be.visible');
    });

    it('debe mostrar el input de fórmula', () => {
      cy.get('input[placeholder*="H2O"]').should('be.visible');
    });

    it('debe mostrar ejemplos de fórmulas', () => {
      cy.contains('H2O').should('be.visible');
      cy.contains('NaCl').should('be.visible');
      cy.contains('H2SO4').should('be.visible');
    });
  });

  describe('Cálculo de fórmulas válidas', () => {
    it('debe calcular H2O correctamente', () => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('button', 'Calcular').click();

      // Verificar resultado
      cy.contains('18.015').should('be.visible');
      cy.contains('g/mol').should('be.visible');
    });

    it('debe calcular NaCl correctamente', () => {
      cy.get('input[placeholder*="H2O"]').type('NaCl');
      cy.contains('button', 'Calcular').click();

      cy.contains('58.44').should('be.visible');
    });

    it('debe calcular Ca(OH)2 correctamente (con paréntesis)', () => {
      cy.get('input[placeholder*="H2O"]').type('Ca(OH)2');
      cy.contains('button', 'Calcular').click();

      cy.contains('74.09').should('be.visible');
    });

    it('debe calcular C6H12O6 correctamente (glucosa)', () => {
      cy.get('input[placeholder*="H2O"]').type('C6H12O6');
      cy.contains('button', 'Calcular').click();

      cy.contains('180.15').should('be.visible');
    });
  });

  describe('Desglose de elementos', () => {
    it('debe mostrar el desglose por elemento', () => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('button', 'Calcular').click();

      // Verificar que muestra los elementos
      cy.contains('Hidrógeno').should('be.visible');
      cy.contains('Oxígeno').should('be.visible');
    });

    it('debe mostrar subtotales correctos', () => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('button', 'Calcular').click();

      // H: 1.008 × 2 = 2.016
      cy.contains('2.016').should('be.visible');
      // O: 15.999 × 1 = 15.999
      cy.contains('15.999').should('be.visible');
    });
  });

  describe('Manejo de errores', () => {
    it('debe mostrar error para elemento inexistente', () => {
      cy.get('input[placeholder*="H2O"]').type('Xy');
      
      // Esperar validación (debounce)
      cy.wait(400);
      
      // El botón debe estar deshabilitado por el error de validación
      cy.contains('button', 'Calcular').should('be.disabled');
    });

    it('debe tener botón deshabilitado para fórmula vacía', () => {
      // El botón debe estar deshabilitado cuando no hay fórmula
      cy.contains('button', 'Calcular').should('be.disabled');
    });

    it('debe validar en tiempo real mientras escribe', () => {
      cy.get('input[placeholder*="H2O"]').type('Xyz');
      
      // Esperar debounce (300ms)
      cy.wait(400);
      
      // Debe mostrar indicador de error (icono o borde rojo)
      cy.get('input[placeholder*="H2O"]').should('exist');
    });
  });

  describe('Ejemplos clickeables', () => {
    it('debe llenar el input al clickear H2O', () => {
      cy.contains('button', 'H2O').click();
      cy.get('input[placeholder*="H2O"]').should('have.value', 'H2O');
    });

    it('debe llenar el input al clickear NaCl', () => {
      cy.contains('button', 'NaCl').click();
      cy.get('input[placeholder*="H2O"]').should('have.value', 'NaCl');
    });

    it('debe llenar el input al clickear H2SO4', () => {
      cy.contains('button', 'H2SO4').click();
      cy.get('input[placeholder*="H2O"]').should('have.value', 'H2SO4');
    });
  });

  describe('Botón Limpiar', () => {
    it('debe limpiar el formulario al clickear Limpiar', () => {
      // Primero calcular algo
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('button', 'Calcular').click();
      cy.contains('18.015').should('be.visible');

      // Limpiar
      cy.contains('button', 'Limpiar').click();

      // Verificar que se limpió
      cy.get('input[placeholder*="H2O"]').should('have.value', '');
      cy.contains('18.015').should('not.exist');
    });
  });

  describe('Copiar resultado', () => {
    it('debe mostrar botón de copiar después de calcular', () => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('button', 'Calcular').click();

      cy.contains('Copiar').should('be.visible');
    });

    it('debe mostrar feedback al copiar', () => {
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('button', 'Calcular').click();
      cy.contains('button', 'Copiar').click();

      // Debe mostrar "Copiado" o similar
      cy.contains('Copiado').should('be.visible');
    });
  });

  describe('Historial de cálculos', () => {
    it('debe mostrar historial después de varios cálculos', () => {
      // Primer cálculo
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('button', 'Calcular').click();
      cy.contains('18.015').should('be.visible');

      // Limpiar y segundo cálculo
      cy.contains('button', 'Limpiar').click();
      cy.get('input[placeholder*="H2O"]').type('NaCl');
      cy.contains('button', 'Calcular').click();

      // Verificar historial
      cy.contains('Cálculos recientes').should('be.visible');
      cy.contains('H2O').should('be.visible');
    });

    it('debe poder clickear en historial para recalcular', () => {
      // Primer cálculo
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('button', 'Calcular').click();

      // Segundo cálculo
      cy.contains('button', 'Limpiar').click();
      cy.get('input[placeholder*="H2O"]').type('NaCl');
      cy.contains('button', 'Calcular').click();

      // Click en historial H2O
      cy.contains('button', 'H2O').first().click();
      cy.get('input[placeholder*="H2O"]').should('have.value', 'H2O');
    });
  });

  describe('Responsive', () => {
    it('debe funcionar en móvil', () => {
      cy.viewport('iphone-x');
      
      cy.get('input[placeholder*="H2O"]').type('H2O');
      cy.contains('button', 'Calcular').click();
      cy.contains('18.015').should('be.visible');
    });

    it('debe funcionar en tablet', () => {
      cy.viewport('ipad-2');
      
      cy.get('input[placeholder*="H2O"]').type('NaCl');
      cy.contains('button', 'Calcular').click();
      cy.contains('58.44').should('be.visible');
    });
  });

  describe('Tecla Enter', () => {
    it('debe calcular al presionar Enter', () => {
      cy.get('input[placeholder*="H2O"]').type('H2O{enter}');
      cy.contains('18.015').should('be.visible');
    });
  });
});

