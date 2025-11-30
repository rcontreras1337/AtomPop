/**
 * Tests unitarios para useEmpiricalFormula
 */

import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEmpiricalFormula } from './useEmpiricalFormula';

describe('useEmpiricalFormula', () => {
  describe('Inicialización', () => {
    it('debe inicializar con 2 elementos vacíos', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      expect(result.current.elements).toHaveLength(2);
      expect(result.current.elements[0].symbol).toBe('');
      expect(result.current.elements[0].percentage).toBe('');
      expect(result.current.result).toBeNull();
      expect(result.current.isCalculated).toBe(false);
    });

    it('debe tener totalPercentage en 0 inicialmente', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      expect(result.current.totalPercentage).toBe(0);
      expect(result.current.isValidTotal).toBe(false);
    });
  });

  describe('Agregar y eliminar elementos', () => {
    it('debe agregar un elemento', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      act(() => {
        result.current.addElement();
      });
      
      expect(result.current.elements).toHaveLength(3);
    });

    it('no debe agregar más de 10 elementos', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      // Agregar elementos uno por uno hasta llegar a 10
      for (let i = 0; i < 15; i++) {
        act(() => {
          result.current.addElement();
        });
      }
      
      expect(result.current.elements.length).toBeLessThanOrEqual(10);
    });

    it('debe eliminar un elemento', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      act(() => {
        result.current.addElement();
      });
      
      const idToRemove = result.current.elements[0].id;
      
      act(() => {
        result.current.removeElement(idToRemove);
      });
      
      expect(result.current.elements).toHaveLength(2);
      expect(result.current.elements.find(e => e.id === idToRemove)).toBeUndefined();
    });

    it('no debe eliminar si solo quedan 2 elementos', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      const idToRemove = result.current.elements[0].id;
      
      act(() => {
        result.current.removeElement(idToRemove);
      });
      
      expect(result.current.elements).toHaveLength(2);
    });
  });

  describe('Actualizar elementos', () => {
    it('debe actualizar el símbolo de un elemento', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      const id = result.current.elements[0].id;
      
      act(() => {
        result.current.updateElement(id, 'symbol', 'C');
      });
      
      expect(result.current.elements[0].symbol).toBe('C');
    });

    it('debe actualizar el porcentaje de un elemento', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      const id = result.current.elements[0].id;
      
      act(() => {
        result.current.updateElement(id, 'percentage', '40.0');
      });
      
      expect(result.current.elements[0].percentage).toBe('40.0');
    });

    it('debe calcular totalPercentage correctamente', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      act(() => {
        result.current.updateElement(result.current.elements[0].id, 'percentage', '40');
        result.current.updateElement(result.current.elements[1].id, 'percentage', '60');
      });
      
      expect(result.current.totalPercentage).toBe(100);
      expect(result.current.isValidTotal).toBe(true);
    });
  });

  describe('Validación', () => {
    it('no debe permitir calcular sin elementos válidos', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      expect(result.current.canCalculate).toBe(false);
      expect(result.current.validationError).toBeTruthy();
    });

    it('debe requerir al menos 2 elementos', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      act(() => {
        result.current.updateElement(result.current.elements[0].id, 'symbol', 'C');
        result.current.updateElement(result.current.elements[0].id, 'percentage', '100');
      });
      
      expect(result.current.canCalculate).toBe(false);
      expect(result.current.validationError).toContain('2 elementos');
    });

    it('debe validar que los porcentajes sumen ~100%', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      act(() => {
        result.current.updateElement(result.current.elements[0].id, 'symbol', 'C');
        result.current.updateElement(result.current.elements[0].id, 'percentage', '40');
        result.current.updateElement(result.current.elements[1].id, 'symbol', 'H');
        result.current.updateElement(result.current.elements[1].id, 'percentage', '10');
      });
      
      expect(result.current.canCalculate).toBe(false);
      expect(result.current.validationError).toContain('suman');
    });

    it('debe detectar elementos duplicados', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      act(() => {
        result.current.updateElement(result.current.elements[0].id, 'symbol', 'C');
        result.current.updateElement(result.current.elements[0].id, 'percentage', '50');
        result.current.updateElement(result.current.elements[1].id, 'symbol', 'C');
        result.current.updateElement(result.current.elements[1].id, 'percentage', '50');
      });
      
      expect(result.current.canCalculate).toBe(false);
      expect(result.current.validationError).toContain('repitas');
    });
  });

  describe('Cálculo de fórmula empírica', () => {
    it('debe calcular CH2O desde porcentajes correctos', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.isCalculated).toBe(true);
      expect(result.current.result).not.toBeNull();
      expect(result.current.result?.isValid).toBe(true);
      expect(result.current.result?.formula).toBe('CH2O');
    });

    it('debe generar pasos del cálculo', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.result?.steps).toBeDefined();
      expect(result.current.result?.steps.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Funciones de utilidad', () => {
    it('debe limpiar todos los valores', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      act(() => {
        result.current.calculate();
      });
      
      act(() => {
        result.current.clear();
      });
      
      expect(result.current.elements).toHaveLength(2);
      expect(result.current.elements[0].symbol).toBe('');
      expect(result.current.result).toBeNull();
      expect(result.current.isCalculated).toBe(false);
    });

    it('debe cargar ejemplo correctamente', () => {
      const { result } = renderHook(() => useEmpiricalFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      expect(result.current.elements).toHaveLength(3);
      expect(result.current.elements[0].symbol).toBe('C');
      expect(result.current.elements[0].percentage).toBe('40.0');
      expect(result.current.totalPercentage).toBe(100);
    });
  });
});

