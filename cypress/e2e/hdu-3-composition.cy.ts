/**
 * Tests E2E para HDU-3: Composición Porcentual
 */

describe('HDU-3: Composición Porcentual', () => {
  beforeEach(() => {
    cy.visit('/composicion');
  });

  describe('Carga de página', () => {
    it('debe cargar la página correctamente', () => {
      cy.contains('h1', 'Composición').should('be.visible');
      cy.contains('Visualiza el porcentaje de masa').should('be.visible');
    });

    it('debe mostrar el input de fórmula', () => {
      cy.get('input[placeholder*="H2SO4"]').should('be.visible');
    });

    it('debe mostrar ejemplos de fórmulas', () => {
      cy.contains('Ejemplos:').should('be.visible');
      cy.contains('button', 'H2O').should('be.visible');
      cy.contains('button', 'H2SO4').should('be.visible');
    });

    it('debe mostrar mensaje inicial', () => {
      cy.contains('Ingresa una fórmula').should('be.visible');
    });

    it('debe mostrar botón Analizar deshabilitado inicialmente', () => {
      cy.contains('button', 'Analizar').should('be.disabled');
    });
  });

  describe('Análisis de fórmulas', () => {
    it('debe habilitar el botón al ingresar fórmula válida', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2O');
      cy.contains('button', 'Analizar').should('not.be.disabled');
    });

    it('debe mostrar resultados al analizar H2O', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2O');
      cy.contains('button', 'Analizar').click();
      
      // Debe mostrar el gráfico
      cy.contains('Distribución Visual').should('be.visible');
      
      // Debe mostrar la lista
      cy.contains('Desglose por Elemento').should('be.visible');
    });

    it('debe mostrar porcentajes correctos para H2O', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2O');
      cy.contains('button', 'Analizar').click();
      
      // H: ~11.19%, O: ~88.81%
      cy.contains('Hidrógeno').should('be.visible');
      cy.contains('Oxígeno').should('be.visible');
      cy.contains('11.').should('be.visible'); // 11.19%
      cy.contains('88.').should('be.visible'); // 88.81%
    });

    it('debe mostrar masa molar total', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2O');
      cy.contains('button', 'Analizar').click();
      
      cy.contains('Masa Molar Total').should('be.visible');
      cy.contains('18.0').should('be.visible'); // 18.015 g/mol
    });
  });

  describe('Gráfico circular', () => {
    it('debe renderizar el gráfico con segmentos', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2O');
      cy.contains('button', 'Analizar').click();
      
      // Debe haber segmentos SVG
      cy.get('[data-testid="pie-segment-H"]').should('exist');
      cy.get('[data-testid="pie-segment-O"]').should('exist');
    });

    it('debe mostrar leyenda con elementos', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2SO4');
      cy.contains('button', 'Analizar').click();
      
      // Leyenda debe mostrar H, S, O
      cy.contains('H').should('be.visible');
      cy.contains('S').should('be.visible');
      cy.contains('O').should('be.visible');
    });
  });

  describe('Lista de composición', () => {
    it('debe mostrar barras de progreso', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2O');
      cy.contains('button', 'Analizar').click();
      
      cy.get('[data-testid="composition-item-H"]').should('exist');
      cy.get('[data-testid="composition-item-O"]').should('exist');
    });

    it('debe mostrar suma de porcentajes cercana a 100%', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2SO4');
      cy.contains('button', 'Analizar').click();
      
      cy.contains('Suma de porcentajes').should('be.visible');
      cy.contains('100.00%').should('be.visible');
    });

    it('debe mostrar detalles de cada elemento', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2O');
      cy.contains('button', 'Analizar').click();
      
      // Debe mostrar "2 átomos" para hidrógeno
      cy.contains('2 átomos').should('be.visible');
    });
  });

  describe('Ejemplos clickeables', () => {
    it('debe llenar el input al clickear H2O', () => {
      cy.contains('button', 'H2O').click();
      cy.get('input[placeholder*="H2SO4"]').should('have.value', 'H2O');
    });

    it('debe llenar el input al clickear H2SO4', () => {
      cy.contains('button', 'H2SO4').click();
      cy.get('input[placeholder*="H2SO4"]').should('have.value', 'H2SO4');
    });

    it('debe llenar el input al clickear C6H12O6', () => {
      cy.contains('button', 'C6H12O6').click();
      cy.get('input[placeholder*="H2SO4"]').should('have.value', 'C6H12O6');
    });
  });

  describe('Funcionalidad de limpiar', () => {
    it('debe limpiar resultados al cambiar fórmula', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2O');
      cy.contains('button', 'Analizar').click();
      
      cy.contains('Distribución Visual').should('be.visible');
      
      // Limpiar y escribir otra
      cy.get('input[placeholder*="H2SO4"]').clear().type('NaCl');
      
      // Los resultados anteriores deben desaparecer
      cy.contains('Distribución Visual').should('not.exist');
    });
  });

  describe('Información educativa', () => {
    it('debe mostrar la sección de cómo se calcula', () => {
      cy.contains('¿Cómo se calcula?').should('be.visible');
      cy.contains('% Elemento').should('be.visible');
    });
  });

  describe('Compuestos complejos', () => {
    it('debe manejar Ca(OH)2 correctamente', () => {
      cy.contains('button', 'Ca(OH)2').click();
      cy.contains('button', 'Analizar').click();
      
      // Debe mostrar 3 elementos: Ca, O, H
      cy.get('[data-testid="composition-item-Ca"]').should('exist');
      cy.get('[data-testid="composition-item-O"]').should('exist');
      cy.get('[data-testid="composition-item-H"]').should('exist');
    });

    it('debe manejar glucosa C6H12O6', () => {
      cy.contains('button', 'C6H12O6').click();
      cy.contains('button', 'Analizar').click();
      
      // Masa molar de glucosa: 180.156 g/mol
      cy.contains('180.').should('be.visible');
    });
  });

  describe('Responsive', () => {
    it('debe funcionar en móvil', () => {
      cy.viewport('iphone-x');
      
      cy.get('input[placeholder*="H2SO4"]').type('H2O');
      cy.contains('button', 'Analizar').click();
      
      cy.contains('Distribución Visual').should('be.visible');
      cy.contains('Desglose por Elemento').should('be.visible');
    });

    it('debe funcionar en tablet', () => {
      cy.viewport('ipad-2');
      
      cy.get('input[placeholder*="H2SO4"]').type('NaCl');
      cy.contains('button', 'Analizar').click();
      
      cy.contains('Na').should('be.visible');
      cy.contains('Cl').should('be.visible');
    });
  });

  describe('Navegación', () => {
    it('debe volver al inicio al hacer click en el botón', () => {
      cy.contains('Volver al inicio').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Tecla Enter', () => {
    it('debe analizar al presionar Enter', () => {
      cy.get('input[placeholder*="H2SO4"]').type('H2O{enter}');
      cy.contains('Distribución Visual').should('be.visible');
    });
  });
});

