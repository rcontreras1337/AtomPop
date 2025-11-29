import { describe, it, expect } from 'vitest';
import { 
  parseFormula, 
  normalizeFormula, 
  formatFormulaWithSubscripts,
  buildFormulaString 
} from './formulaParser';

describe('formulaParser', () => {
  
  // ═══════════════════════════════════════════════════════════════
  // TESTS: normalizeFormula
  // ═══════════════════════════════════════════════════════════════
  
  describe('normalizeFormula', () => {
    it('debe normalizar fórmulas con formato mixto', () => {
      expect(normalizeFormula('h2o')).toBe('H2O');
      expect(normalizeFormula('nacl')).toBe('NaCl');
    });

    it('debe mantener fórmulas ya correctamente formateadas', () => {
      expect(normalizeFormula('H2O')).toBe('H2O');
      expect(normalizeFormula('NaCl')).toBe('NaCl');
      expect(normalizeFormula('CO2')).toBe('CO2');
    });

    it('debe eliminar espacios', () => {
      expect(normalizeFormula(' H2O ')).toBe('H2O');
      expect(normalizeFormula('Na Cl')).toBe('NaCl');
    });

    it('debe manejar fórmulas básicas en minúsculas', () => {
      // La normalización es una ayuda, pero el parser es quien realmente
      // valida y procesa las fórmulas. Fórmulas complejas deben escribirse
      // correctamente para evitar ambigüedad (ej: 'so' = S+O o So?)
      const result = normalizeFormula('h2o');
      expect(result).toBe('H2O');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: parseFormula - Casos básicos
  // ═══════════════════════════════════════════════════════════════
  
  describe('parseFormula - Casos básicos', () => {
    it('debe parsear elementos simples sin subíndice', () => {
      const result = parseFormula('H');
      expect(result.isValid).toBe(true);
      expect(result.elements).toHaveLength(1);
      expect(result.elements[0]).toEqual({ symbol: 'H', count: 1 });
    });

    it('debe parsear elementos con subíndice', () => {
      const result = parseFormula('O2');
      expect(result.isValid).toBe(true);
      expect(result.elements).toHaveLength(1);
      expect(result.elements[0]).toEqual({ symbol: 'O', count: 2 });
    });

    it('debe parsear H2O correctamente', () => {
      const result = parseFormula('H2O');
      expect(result.isValid).toBe(true);
      expect(result.elements).toContainEqual({ symbol: 'H', count: 2 });
      expect(result.elements).toContainEqual({ symbol: 'O', count: 1 });
    });

    it('debe parsear NaCl correctamente', () => {
      const result = parseFormula('NaCl');
      expect(result.isValid).toBe(true);
      expect(result.elements).toContainEqual({ symbol: 'Na', count: 1 });
      expect(result.elements).toContainEqual({ symbol: 'Cl', count: 1 });
    });

    it('debe parsear CO2 correctamente', () => {
      const result = parseFormula('CO2');
      expect(result.isValid).toBe(true);
      expect(result.elements).toContainEqual({ symbol: 'C', count: 1 });
      expect(result.elements).toContainEqual({ symbol: 'O', count: 2 });
    });

    it('debe parsear H2SO4 correctamente', () => {
      const result = parseFormula('H2SO4');
      expect(result.isValid).toBe(true);
      expect(result.elements).toContainEqual({ symbol: 'H', count: 2 });
      expect(result.elements).toContainEqual({ symbol: 'S', count: 1 });
      expect(result.elements).toContainEqual({ symbol: 'O', count: 4 });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: parseFormula - Compuestos con paréntesis
  // ═══════════════════════════════════════════════════════════════
  
  describe('parseFormula - Compuestos con paréntesis', () => {
    it('debe parsear Ca(OH)2 correctamente', () => {
      const result = parseFormula('Ca(OH)2');
      expect(result.isValid).toBe(true);
      expect(result.elements).toContainEqual({ symbol: 'Ca', count: 1 });
      expect(result.elements).toContainEqual({ symbol: 'O', count: 2 });
      expect(result.elements).toContainEqual({ symbol: 'H', count: 2 });
    });

    it('debe parsear Al2(SO4)3 correctamente', () => {
      const result = parseFormula('Al2(SO4)3');
      expect(result.isValid).toBe(true);
      expect(result.elements).toContainEqual({ symbol: 'Al', count: 2 });
      expect(result.elements).toContainEqual({ symbol: 'S', count: 3 });
      expect(result.elements).toContainEqual({ symbol: 'O', count: 12 });
    });

    it('debe parsear Mg(NO3)2 correctamente', () => {
      const result = parseFormula('Mg(NO3)2');
      expect(result.isValid).toBe(true);
      expect(result.elements).toContainEqual({ symbol: 'Mg', count: 1 });
      expect(result.elements).toContainEqual({ symbol: 'N', count: 2 });
      expect(result.elements).toContainEqual({ symbol: 'O', count: 6 });
    });

    it('debe parsear Fe2(SO4)3 correctamente', () => {
      const result = parseFormula('Fe2(SO4)3');
      expect(result.isValid).toBe(true);
      expect(result.elements).toContainEqual({ symbol: 'Fe', count: 2 });
      expect(result.elements).toContainEqual({ symbol: 'S', count: 3 });
      expect(result.elements).toContainEqual({ symbol: 'O', count: 12 });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: parseFormula - Compuestos orgánicos comunes
  // ═══════════════════════════════════════════════════════════════
  
  describe('parseFormula - Compuestos orgánicos', () => {
    it('debe parsear glucosa C6H12O6 correctamente', () => {
      const result = parseFormula('C6H12O6');
      expect(result.isValid).toBe(true);
      expect(result.elements).toContainEqual({ symbol: 'C', count: 6 });
      expect(result.elements).toContainEqual({ symbol: 'H', count: 12 });
      expect(result.elements).toContainEqual({ symbol: 'O', count: 6 });
    });

    it('debe parsear etanol C2H5OH correctamente', () => {
      const result = parseFormula('C2H5OH');
      expect(result.isValid).toBe(true);
      // C2 + el C implícito del grupo = no, es C2H5OH = C2 + H5 + O + H = C2H6O
      // Pero nuestra implementación suma los H, así que:
      expect(result.elements).toContainEqual({ symbol: 'C', count: 2 });
      expect(result.elements).toContainEqual({ symbol: 'H', count: 6 });
      expect(result.elements).toContainEqual({ symbol: 'O', count: 1 });
    });

    it('debe parsear ácido acético CH3COOH correctamente', () => {
      const result = parseFormula('CH3COOH');
      expect(result.isValid).toBe(true);
      expect(result.elements).toContainEqual({ symbol: 'C', count: 2 });
      expect(result.elements).toContainEqual({ symbol: 'H', count: 4 });
      expect(result.elements).toContainEqual({ symbol: 'O', count: 2 });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: parseFormula - Casos de error
  // ═══════════════════════════════════════════════════════════════
  
  describe('parseFormula - Casos de error', () => {
    it('debe retornar error para fórmula vacía', () => {
      const result = parseFormula('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('debe retornar error para elemento inexistente', () => {
      const result = parseFormula('Xx');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('no existe');
    });

    it('debe retornar error para paréntesis sin cerrar', () => {
      const result = parseFormula('Ca(OH');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('debe retornar error para caracteres especiales', () => {
      const result = parseFormula('H2O@');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: Funciones auxiliares
  // ═══════════════════════════════════════════════════════════════
  
  describe('formatFormulaWithSubscripts', () => {
    it('debe convertir números a subíndices', () => {
      expect(formatFormulaWithSubscripts('H2O')).toBe('H₂O');
      expect(formatFormulaWithSubscripts('CO2')).toBe('CO₂');
      expect(formatFormulaWithSubscripts('C6H12O6')).toBe('C₆H₁₂O₆');
    });
  });

  describe('buildFormulaString', () => {
    it('debe construir string de fórmula desde elementos', () => {
      const elements = [
        { symbol: 'H', count: 2 },
        { symbol: 'O', count: 1 },
      ];
      expect(buildFormulaString(elements)).toBe('H2O');
    });

    it('debe omitir el 1 en conteos unitarios', () => {
      const elements = [
        { symbol: 'Na', count: 1 },
        { symbol: 'Cl', count: 1 },
      ];
      expect(buildFormulaString(elements)).toBe('NaCl');
    });
  });
});

