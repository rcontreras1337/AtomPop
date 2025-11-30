/**
 * Tests unitarios para useComposition
 */

import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useComposition } from './useComposition';

describe('useComposition', () => {
  describe('Inicialización', () => {
    it('debe inicializar con valores vacíos', () => {
      const { result } = renderHook(() => useComposition());
      
      expect(result.current.formula).toBe('');
      expect(result.current.result).toBeNull();
      expect(result.current.isValid).toBe(false);
      expect(result.current.isCalculated).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('Validación de fórmula', () => {
    it('debe validar H2O como válida', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      expect(result.current.isValid).toBe(true);
      expect(result.current.error).toBeNull();
    });

    it('debe marcar como inválida una fórmula incorrecta', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('Xyz');
      });
      
      expect(result.current.isValid).toBe(false);
      expect(result.current.error).toBeTruthy();
    });

    it('debe marcar como inválida una fórmula vacía', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('');
      });
      
      expect(result.current.isValid).toBe(false);
      expect(result.current.error).toBeNull(); // Sin error, solo inválida
    });
  });

  describe('Cálculo de composición', () => {
    it('debe calcular composición de H2O correctamente', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.isCalculated).toBe(true);
      expect(result.current.result).not.toBeNull();
      expect(result.current.result?.isValid).toBe(true);
      expect(result.current.result?.elements).toHaveLength(2);
    });

    it('debe calcular porcentajes que suman ~100%', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('H2SO4');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      const total = result.current.result?.elements.reduce(
        (sum, el) => sum + el.percentage, 
        0
      ) || 0;
      
      // Debe sumar cerca de 100% (tolerancia de redondeo)
      expect(total).toBeGreaterThan(99.5);
      expect(total).toBeLessThan(100.5);
    });

    it('debe ordenar elementos por porcentaje descendente', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('H2SO4');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      const elements = result.current.result?.elements || [];
      
      // Verificar que están ordenados (O > S > H)
      for (let i = 1; i < elements.length; i++) {
        expect(elements[i - 1].percentage).toBeGreaterThanOrEqual(elements[i].percentage);
      }
    });

    it('debe incluir colores CPK en los elementos', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      const elements = result.current.result?.elements || [];
      
      elements.forEach(el => {
        expect(el.color).toBeTruthy();
        expect(el.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it('debe calcular H2O con porcentajes específicos', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      const hydrogen = result.current.result?.elements.find(e => e.symbol === 'H');
      const oxygen = result.current.result?.elements.find(e => e.symbol === 'O');
      
      // H2O: H = 11.19%, O = 88.81%
      expect(hydrogen?.percentage).toBeCloseTo(11.19, 1);
      expect(oxygen?.percentage).toBeCloseTo(88.81, 1);
    });

    it('debe calcular NaCl con porcentajes específicos', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('NaCl');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      const sodium = result.current.result?.elements.find(e => e.symbol === 'Na');
      const chlorine = result.current.result?.elements.find(e => e.symbol === 'Cl');
      
      // NaCl: Na ≈ 39.34%, Cl ≈ 60.66%
      expect(sodium?.percentage).toBeCloseTo(39.34, 1);
      expect(chlorine?.percentage).toBeCloseTo(60.66, 1);
    });

    it('no debe calcular si la fórmula es inválida', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('XYZ');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.isCalculated).toBe(false);
      expect(result.current.result).toBeNull();
    });
  });

  describe('Función clear', () => {
    it('debe limpiar todos los valores', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.isCalculated).toBe(true);
      
      act(() => {
        result.current.clear();
      });
      
      expect(result.current.formula).toBe('');
      expect(result.current.result).toBeNull();
      expect(result.current.isCalculated).toBe(false);
    });
  });

  describe('Casos especiales', () => {
    it('debe manejar compuestos con paréntesis como Ca(OH)2', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('Ca(OH)2');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.result?.isValid).toBe(true);
      expect(result.current.result?.elements).toHaveLength(3); // Ca, O, H
    });

    it('debe manejar glucosa C6H12O6', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('C6H12O6');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.result?.isValid).toBe(true);
      // C6H12O6 = 180.156 g/mol
      expect(result.current.result?.totalMass).toBeCloseTo(180.156, 1);
    });

    it('debe cambiar isCalculated a false al cambiar fórmula', () => {
      const { result } = renderHook(() => useComposition());
      
      act(() => {
        result.current.setFormula('H2O');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.isCalculated).toBe(true);
      
      act(() => {
        result.current.setFormula('NaCl');
      });
      
      expect(result.current.isCalculated).toBe(false);
      expect(result.current.result).toBeNull();
    });
  });
});

