/**
 * Tests unitarios para useMolecularFormula
 */

import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMolecularFormula } from './useMolecularFormula';

describe('useMolecularFormula', () => {
  describe('Inicialización', () => {
    it('debe inicializar con valores vacíos', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      expect(result.current.empiricalFormula).toBe('');
      expect(result.current.experimentalMass).toBe('');
      expect(result.current.result).toBeNull();
      expect(result.current.isCalculated).toBe(false);
    });

    it('debe tener canCalculate en false inicialmente', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      expect(result.current.canCalculate).toBe(false);
    });
  });

  describe('Validación de fórmula empírica', () => {
    it('debe validar CH2O como fórmula válida', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('CH2O');
      });
      
      expect(result.current.isValidFormula).toBe(true);
      expect(result.current.formulaError).toBeNull();
    });

    it('debe calcular masa de fórmula empírica', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('CH2O');
      });
      
      // CH2O = 12.011 + 2(1.008) + 15.999 = 30.026
      expect(result.current.empiricalMass).toBeCloseTo(30.026, 1);
    });

    it('debe marcar como inválida una fórmula incorrecta', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('Xyz');
      });
      
      expect(result.current.isValidFormula).toBe(false);
      expect(result.current.formulaError).toBeTruthy();
    });

    it('debe manejar fórmula vacía sin error', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('');
      });
      
      expect(result.current.isValidFormula).toBe(false);
      expect(result.current.formulaError).toBeNull();
    });
  });

  describe('Input de masa experimental', () => {
    it('debe aceptar masa experimental válida', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setExperimentalMass('180');
      });
      
      expect(result.current.experimentalMass).toBe('180');
    });

    it('debe filtrar caracteres no numéricos', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setExperimentalMass('180abc');
      });
      
      expect(result.current.experimentalMass).toBe('180');
    });
  });

  describe('Validación para cálculo', () => {
    it('debe permitir calcular con fórmula y masa válidas', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('CH2O');
        result.current.setExperimentalMass('180');
      });
      
      expect(result.current.canCalculate).toBe(true);
    });

    it('no debe permitir calcular sin masa experimental', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('CH2O');
      });
      
      expect(result.current.canCalculate).toBe(false);
    });

    it('no debe permitir calcular con fórmula inválida', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('Xyz');
        result.current.setExperimentalMass('180');
      });
      
      expect(result.current.canCalculate).toBe(false);
    });
  });

  describe('Cálculo de fórmula molecular', () => {
    it('debe calcular fórmula molecular desde CH2O con 180 g/mol', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.isCalculated).toBe(true);
      expect(result.current.result).not.toBeNull();
      expect(result.current.result?.isValid).toBe(true);
      // La fórmula puede tener diferente orden (C6H12O6 o H12C6O6) pero los valores son correctos
      const formula = result.current.result?.molecularFormula || '';
      expect(formula).toMatch(/C6|H12|O6/);
      expect(formula.includes('C6') || formula.includes('6C')).toBe(true);
      expect(formula.includes('H12') || formula.includes('12H')).toBe(true);
      expect(formula.includes('O6') || formula.includes('6O')).toBe(true);
    });

    it('debe calcular multiplicador correctamente', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.result?.multiplier).toBe(6);
    });

    it('debe incluir masa empírica en el resultado', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.result?.empiricalMass).toBeCloseTo(30.026, 1);
      expect(result.current.result?.experimentalMass).toBe(180);
    });

    it('debe manejar multiplicador 1 (molecular = empírica)', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('H2O');
        result.current.setExperimentalMass('18.015');
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.result?.multiplier).toBe(1);
      expect(result.current.result?.molecularFormula).toBe('H2O');
    });
  });

  describe('Funciones de utilidad', () => {
    it('debe limpiar todos los valores', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      act(() => {
        result.current.calculate();
      });
      
      act(() => {
        result.current.clear();
      });
      
      expect(result.current.empiricalFormula).toBe('');
      expect(result.current.experimentalMass).toBe('');
      expect(result.current.result).toBeNull();
      expect(result.current.isCalculated).toBe(false);
    });

    it('debe cargar ejemplo correctamente', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      expect(result.current.empiricalFormula).toBe('CH2O');
      expect(result.current.experimentalMass).toBe('180');
    });
  });

  describe('Reset al cambiar inputs', () => {
    it('debe resetear resultado al cambiar fórmula', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      act(() => {
        result.current.calculate();
      });
      
      expect(result.current.isCalculated).toBe(true);
      
      act(() => {
        result.current.setEmpiricalFormula('H2O');
      });
      
      expect(result.current.isCalculated).toBe(false);
      expect(result.current.result).toBeNull();
    });

    it('debe resetear resultado al cambiar masa', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.loadExample();
      });
      
      act(() => {
        result.current.calculate();
      });
      
      act(() => {
        result.current.setExperimentalMass('90');
      });
      
      expect(result.current.isCalculated).toBe(false);
      expect(result.current.result).toBeNull();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS FIX-3: Validación mejorada y mensajes educativos
  // ═══════════════════════════════════════════════════════════════

  describe('FIX-3: Validación y sugerencias', () => {
    it('debe mostrar validationMessage cuando masa < masa empírica', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('CH2O');
        result.current.setExperimentalMass('28');
      });
      
      expect(result.current.canCalculate).toBe(false);
      expect(result.current.validationMessage).toBeTruthy();
      expect(result.current.validationMessage).toContain('igual o mayor');
    });

    it('debe sugerir masas válidas', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('CH2O');
      });
      
      expect(result.current.suggestedMasses).toHaveLength(6);
      // Primer múltiplo: n=1 → 30.03 g/mol
      expect(parseFloat(result.current.suggestedMasses[0].mass)).toBeCloseTo(30.026, 1);
      expect(result.current.suggestedMasses[0].n).toBe(1);
      // Segundo múltiplo: n=2 → 60.05 g/mol
      expect(result.current.suggestedMasses[1].n).toBe(2);
    });

    it('no debe permitir calcular con masa muy pequeña', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('CH2O');
        result.current.setExperimentalMass('10');
      });
      
      expect(result.current.canCalculate).toBe(false);
      expect(result.current.validationMessage).toBeTruthy();
    });

    it('no debe mostrar validationMessage con masa válida', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('CH2O');
        result.current.setExperimentalMass('180');
      });
      
      expect(result.current.canCalculate).toBe(true);
      expect(result.current.validationMessage).toBeNull();
    });

    it('debe habilitar cálculo cuando masa >= masa empírica', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      act(() => {
        result.current.setEmpiricalFormula('CH2O');
        result.current.setExperimentalMass('30.03');
      });
      
      expect(result.current.canCalculate).toBe(true);
    });

    it('suggestedMasses debe estar vacío sin fórmula válida', () => {
      const { result } = renderHook(() => useMolecularFormula());
      
      expect(result.current.suggestedMasses).toHaveLength(0);
      
      act(() => {
        result.current.setEmpiricalFormula('InvalidFormula');
      });
      
      expect(result.current.suggestedMasses).toHaveLength(0);
    });
  });
});

