/**
 * Tests unitarios para useConverter
 */

import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useConverter } from './useConverter';
import { AVOGADRO } from '../../utils/chemistryEngine';

describe('useConverter', () => {
  describe('Inicialización', () => {
    it('debe inicializar con valores vacíos', () => {
      const { result } = renderHook(() => useConverter());
      
      expect(result.current.formula).toBe('');
      expect(result.current.moles).toBe('');
      expect(result.current.grams).toBe('');
      expect(result.current.particles).toBe('');
      expect(result.current.molarMass).toBeNull();
      expect(result.current.activeField).toBeNull();
      expect(result.current.isValid).toBe(false);
      expect(result.current.hasValues).toBe(false);
    });
  });

  describe('Fórmula', () => {
    it('debe actualizar la fórmula', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      expect(result.current.formula).toBe('H2O');
      expect(result.current.isValid).toBe(true);
    });

    it('debe calcular masa molar correctamente para H2O', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      // H2O = 2(1.008) + 15.999 = 18.015
      expect(result.current.molarMass).toBeCloseTo(18.015, 2);
    });

    it('debe calcular masa molar correctamente para NaCl', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('NaCl');
      });
      
      // NaCl = 22.99 + 35.45 = 58.44
      expect(result.current.molarMass).toBeCloseTo(58.44, 1);
    });

    it('debe manejar fórmulas inválidas', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('XxYy');
      });
      
      expect(result.current.isValid).toBe(false);
      expect(result.current.formulaError).toBeTruthy();
    });

    it('debe manejar fórmula vacía', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('');
      });
      
      expect(result.current.isValid).toBe(false);
      expect(result.current.formulaError).toBeNull();
    });
  });

  describe('Conversión desde Moles', () => {
    it('debe calcular gramos desde moles correctamente', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setMoles('1');
      });
      
      // 1 mol H2O = 18.015 g
      expect(parseFloat(result.current.grams)).toBeCloseTo(18.015, 2);
      expect(result.current.activeField).toBe('moles');
    });

    it('debe calcular partículas desde moles correctamente', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setMoles('1');
      });
      
      // 1 mol = 6.022e23 partículas
      const particles = parseFloat(result.current.particles);
      expect(particles).toBeCloseTo(AVOGADRO, -20); // tolerancia para números grandes
    });

    it('debe actualizar gramos y partículas cuando cambian moles', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setMoles('2');
      });
      
      // 2 mol H2O = 36.03 g
      expect(parseFloat(result.current.grams)).toBeCloseTo(36.03, 1);
    });
  });

  describe('Conversión desde Gramos', () => {
    it('debe calcular moles desde gramos correctamente', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setGrams('18.015');
      });
      
      // 18.015 g H2O = 1 mol
      expect(parseFloat(result.current.moles)).toBeCloseTo(1, 2);
      expect(result.current.activeField).toBe('grams');
    });

    it('debe calcular partículas desde gramos', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setGrams('18.015');
      });
      
      const particles = parseFloat(result.current.particles);
      expect(particles).toBeCloseTo(AVOGADRO, -20);
    });
  });

  describe('Conversión desde Partículas', () => {
    it('debe calcular moles desde partículas correctamente', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setParticles('6.022e23');
      });
      
      // 6.022e23 partículas = ~1 mol
      expect(parseFloat(result.current.moles)).toBeCloseTo(1, 1);
      expect(result.current.activeField).toBe('particles');
    });

    it('debe calcular gramos desde partículas', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setParticles('6.022e23');
      });
      
      // 6.022e23 partículas de H2O = ~18.015 g
      expect(parseFloat(result.current.grams)).toBeCloseTo(18.015, 1);
    });
  });

  describe('Validaciones', () => {
    it('debe prevenir valores negativos', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setMoles('-5');
      });
      
      // El signo negativo debe ser eliminado
      expect(result.current.moles).toBe('5');
    });

    it('debe manejar input vacío', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setMoles('5');
      });
      
      act(() => {
        result.current.setMoles('');
      });
      
      expect(result.current.moles).toBe('');
      expect(result.current.grams).toBe('');
      expect(result.current.particles).toBe('');
    });

    it('debe aceptar notación científica', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setParticles('1e24');
      });
      
      // 1e24 partículas = ~1.66 mol
      expect(parseFloat(result.current.moles)).toBeCloseTo(1.66, 1);
    });
  });

  describe('Función Clear', () => {
    it('debe limpiar todos los valores', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setMoles('5');
      });
      
      expect(result.current.hasValues).toBe(true);
      
      act(() => {
        result.current.clear();
      });
      
      expect(result.current.moles).toBe('');
      expect(result.current.grams).toBe('');
      expect(result.current.particles).toBe('');
      expect(result.current.activeField).toBeNull();
      expect(result.current.hasValues).toBe(false);
    });

    it('no debe limpiar la fórmula al clear', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setMoles('5');
      });
      
      act(() => {
        result.current.clear();
      });
      
      expect(result.current.formula).toBe('H2O');
    });
  });

  describe('Estados derivados', () => {
    it('hasValues debe ser true cuando hay valores', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.setMoles('1');
      });
      
      expect(result.current.hasValues).toBe(true);
    });

    it('hasValues debe ser false sin valores', () => {
      const { result } = renderHook(() => useConverter());
      
      expect(result.current.hasValues).toBe(false);
    });

    it('isValid debe ser true con fórmula válida', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      expect(result.current.isValid).toBe(true);
    });

    it('isValid debe ser false con fórmula inválida', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('Xyz123');
      });
      
      expect(result.current.isValid).toBe(false);
    });
  });

  describe('Casos especiales', () => {
    it('debe manejar compuestos complejos como Ca(OH)2', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('Ca(OH)2');
      });
      
      // Ca(OH)2 = 40.078 + 2(15.999 + 1.008) = 74.093
      expect(result.current.molarMass).toBeCloseTo(74.093, 1);
    });

    it('debe manejar glucosa C6H12O6', () => {
      const { result } = renderHook(() => useConverter());
      
      act(() => {
        result.current.setFormula('C6H12O6');
      });
      
      // C6H12O6 = 6(12.011) + 12(1.008) + 6(15.999) = 180.156
      expect(result.current.molarMass).toBeCloseTo(180.156, 1);
      
      act(() => {
        result.current.setGrams('180.156');
      });
      
      expect(parseFloat(result.current.moles)).toBeCloseTo(1, 2);
    });
  });
});

