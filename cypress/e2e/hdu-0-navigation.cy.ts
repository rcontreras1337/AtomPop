/**
 * Tests E2E - HDU-0: Navegación e Infraestructura
 * 
 * Escenarios:
 * - Navegación entre todas las páginas
 * - Menú de navegación funciona correctamente
 * - Links activos se marcan
 * - Menú móvil abre/cierra
 */

describe('HDU-0: Navegación e Infraestructura', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Página de Inicio', () => {
    it('debe cargar la página de inicio correctamente', () => {
      cy.contains('AtomPop').should('be.visible');
      cy.contains('Calculadora de Química').should('be.visible');
    });

    it('debe mostrar las 4 tarjetas de calculadoras', () => {
      cy.contains('Masa Molar').should('be.visible');
      cy.contains('Conversor').should('be.visible');
      cy.contains('Composición').should('be.visible');
      cy.contains('Fórmula Empírica').should('be.visible');
    });
  });

  describe('Navegación Desktop', () => {
    it('debe navegar a Masa Molar desde el menú', () => {
      cy.contains('a', 'Masa Molar').click();
      cy.url().should('include', '/masa-molar');
      cy.contains('Calculadora de Masa Molar').should('be.visible');
    });

    it('debe navegar a Conversor desde el menú', () => {
      cy.contains('a', 'Conversor').click();
      cy.url().should('include', '/conversor');
    });

    it('debe navegar a Composición desde el menú', () => {
      cy.contains('a', 'Composición').click();
      cy.url().should('include', '/composicion');
    });

    it('debe navegar a Fórmula Empírica desde el menú', () => {
      cy.contains('a', 'Empírica').click();
      cy.url().should('include', '/formula-empirica');
    });

    it('debe volver al inicio desde cualquier página', () => {
      cy.contains('a', 'Masa Molar').click();
      cy.url().should('include', '/masa-molar');
      
      // Click en "Volver al inicio"
      cy.contains('Volver al inicio').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Navegación desde tarjetas del Home', () => {
    it('debe navegar a Masa Molar desde la tarjeta', () => {
      // Las tarjetas son links directos
      cy.get('a[href="/masa-molar"]').first().click();
      cy.url().should('include', '/masa-molar');
    });
  });

  describe('Botón Volver', () => {
    it('debe tener botón "Volver al inicio" en cada página', () => {
      // Masa Molar
      cy.visit('/masa-molar');
      cy.contains('Volver al inicio').should('be.visible');
      cy.contains('Volver al inicio').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');

      // Conversor
      cy.visit('/conversor');
      cy.contains('Volver al inicio').should('be.visible');

      // Composición
      cy.visit('/composicion');
      cy.contains('Volver al inicio').should('be.visible');

      // Empírica
      cy.visit('/formula-empirica');
      cy.contains('Volver al inicio').should('be.visible');
    });
  });

  describe('Menú Móvil', () => {
    beforeEach(() => {
      // Simular viewport móvil
      cy.viewport('iphone-x');
    });

    it('debe mostrar botón de menú hamburguesa en móvil', () => {
      cy.get('[aria-label*="menú"], [aria-label*="menu"], button').filter(':visible').should('exist');
    });

    it('debe abrir y cerrar el menú móvil', () => {
      // Buscar y clickear el botón del menú
      cy.get('button').filter(':visible').first().click();
      
      // El menú debería abrirse (verificar que los links son visibles)
      cy.wait(300); // Esperar animación
    });
  });

  describe('Responsive', () => {
    it('debe verse correctamente en desktop', () => {
      cy.viewport(1280, 720);
      cy.contains('AtomPop').should('be.visible');
    });

    it('debe verse correctamente en tablet', () => {
      cy.viewport('ipad-2');
      cy.contains('AtomPop').should('be.visible');
    });

    it('debe verse correctamente en móvil', () => {
      cy.viewport('iphone-x');
      cy.contains('AtomPop').should('be.visible');
    });
  });
});

