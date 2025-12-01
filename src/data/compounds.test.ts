/**
 * Tests unitarios para compounds.ts
 */

import { describe, it, expect } from 'vitest';
import {
  getCompoundName,
  getCompoundInfo,
  areFormulasEquivalent,
  getAlternativeFormulas,
  KNOWN_COMPOUNDS,
} from './compounds';

describe('compounds', () => {
  
  // ═══════════════════════════════════════════════════════════════
  // TESTS: getCompoundName
  // ═══════════════════════════════════════════════════════════════
  
  describe('getCompoundName', () => {
    it('debe encontrar Agua por H2O', () => {
      expect(getCompoundName('H2O')).toBe('Agua');
    });

    it('debe encontrar Formaldehído por CH2O', () => {
      expect(getCompoundName('CH2O')).toBe('Formaldehído');
    });

    it('debe encontrar Formaldehído por H2CO', () => {
      expect(getCompoundName('H2CO')).toBe('Formaldehído');
    });

    it('debe encontrar Formaldehído por HCHO', () => {
      expect(getCompoundName('HCHO')).toBe('Formaldehído');
    });

    it('debe encontrar Glucosa por C6H12O6', () => {
      expect(getCompoundName('C6H12O6')).toBe('Glucosa');
    });

    it('debe encontrar Sal de Mesa por NaCl', () => {
      expect(getCompoundName('NaCl')).toBe('Sal de Mesa');
    });

    it('debe retornar null para fórmulas desconocidas', () => {
      expect(getCompoundName('XYZ')).toBeNull();
    });

    it('debe retornar null para fórmula vacía', () => {
      expect(getCompoundName('')).toBeNull();
    });

    it('debe manejar espacios en la fórmula', () => {
      expect(getCompoundName('H2 O')).toBe('Agua');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: getCompoundInfo
  // ═══════════════════════════════════════════════════════════════
  
  describe('getCompoundInfo', () => {
    it('debe retornar información completa del agua', () => {
      const info = getCompoundInfo('H2O');
      expect(info).not.toBeNull();
      expect(info?.name).toBe('Agua');
      expect(info?.category).toBe('Inorgánico');
    });

    it('debe retornar información completa de la glucosa', () => {
      const info = getCompoundInfo('C6H12O6');
      expect(info?.name).toBe('Glucosa');
      expect(info?.category).toBe('Azúcar');
      expect(info?.description).toBeTruthy();
    });

    it('debe retornar información con IUPAC cuando existe', () => {
      const info = getCompoundInfo('CH2O');
      expect(info?.name).toBe('Formaldehído');
      expect(info?.iupac).toBe('Metanal');
    });

    it('debe retornar null para fórmulas desconocidas', () => {
      expect(getCompoundInfo('ABC123')).toBeNull();
    });

    it('debe incluir categoría cuando existe', () => {
      const info = getCompoundInfo('H2SO4');
      expect(info?.category).toBe('Ácido Fuerte');
    });

    it('debe incluir descripción educativa', () => {
      const info = getCompoundInfo('NaCl');
      expect(info?.description).toContain('Condimento');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: areFormulasEquivalent
  // ═══════════════════════════════════════════════════════════════
  
  describe('areFormulasEquivalent', () => {
    it('debe detectar CH2O y H2CO como equivalentes', () => {
      expect(areFormulasEquivalent('CH2O', 'H2CO')).toBe(true);
    });

    it('debe detectar CH2O y HCHO como equivalentes', () => {
      expect(areFormulasEquivalent('CH2O', 'HCHO')).toBe(true);
    });

    it('debe detectar fórmulas idénticas como equivalentes', () => {
      expect(areFormulasEquivalent('H2O', 'H2O')).toBe(true);
    });

    it('debe detectar fórmulas diferentes como no equivalentes', () => {
      expect(areFormulasEquivalent('H2O', 'CO2')).toBe(false);
    });

    it('debe detectar etanol en diferentes notaciones', () => {
      expect(areFormulasEquivalent('C2H5OH', 'C2H6O')).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: getAlternativeFormulas
  // ═══════════════════════════════════════════════════════════════
  
  describe('getAlternativeFormulas', () => {
    it('debe retornar alternativas para CH2O', () => {
      const alternatives = getAlternativeFormulas('CH2O');
      expect(alternatives).toContain('H2CO');
      expect(alternatives).toContain('HCHO');
      expect(alternatives).not.toContain('CH2O'); // No debe incluir la original
    });

    it('debe retornar alternativas para H2CO', () => {
      const alternatives = getAlternativeFormulas('H2CO');
      expect(alternatives).toContain('CH2O');
      expect(alternatives).toContain('HCHO');
    });

    it('debe retornar array vacío para fórmulas sin alternativas', () => {
      const alternatives = getAlternativeFormulas('H2O');
      expect(alternatives).toHaveLength(0);
    });

    it('debe retornar array vacío para fórmulas desconocidas', () => {
      const alternatives = getAlternativeFormulas('XYZ');
      expect(alternatives).toHaveLength(0);
    });

    it('debe retornar alternativas para etanol', () => {
      const alternatives = getAlternativeFormulas('C2H5OH');
      expect(alternatives.length).toBeGreaterThan(0);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: Base de datos de compuestos
  // ═══════════════════════════════════════════════════════════════
  
  describe('KNOWN_COMPOUNDS', () => {
    it('debe tener al menos 30 compuestos', () => {
      expect(KNOWN_COMPOUNDS.length).toBeGreaterThanOrEqual(30);
    });

    it('cada compuesto debe tener al menos una fórmula', () => {
      KNOWN_COMPOUNDS.forEach(compound => {
        expect(compound.formulas.length).toBeGreaterThan(0);
      });
    });

    it('cada compuesto debe tener un nombre', () => {
      KNOWN_COMPOUNDS.forEach(compound => {
        expect(compound.name).toBeTruthy();
      });
    });

    it('debe incluir compuestos educativos comunes', () => {
      const names = KNOWN_COMPOUNDS.map(c => c.name);
      expect(names).toContain('Agua');
      expect(names).toContain('Glucosa');
      expect(names).toContain('Sal de Mesa');
      expect(names).toContain('Formaldehído');
    });

    it('debe incluir categorías en la mayoría de compuestos', () => {
      const withCategory = KNOWN_COMPOUNDS.filter(c => c.category);
      expect(withCategory.length).toBeGreaterThan(KNOWN_COMPOUNDS.length * 0.8);
    });
  });
});

