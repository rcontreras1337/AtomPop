/**
 * Tests para useMolarMass hook
 */

import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMolarMass } from './useMolarMass';

describe('useMolarMass', () => {
  it('debe inicializar con estado idle', () => {
    const { result } = renderHook(() => useMolarMass());

    expect(result.current.state).toBe('idle');
    expect(result.current.formula).toBe('');
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isCalculating).toBe(false);
    expect(result.current.history).toEqual([]);
  });

  it('debe actualizar formula al llamar setFormula', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('H2O');
    });

    expect(result.current.formula).toBe('H2O');
  });

  it('debe calcular masa molar correctamente para H2O', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('H2O');
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.state).toBe('success');
    expect(result.current.result).not.toBeNull();
    expect(result.current.result?.isValid).toBe(true);
    expect(result.current.result?.totalMass).toBeCloseTo(18.015, 2);
    expect(result.current.error).toBeNull();
  });

  it('debe calcular masa molar correctamente para NaCl', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('NaCl');
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.state).toBe('success');
    expect(result.current.result?.totalMass).toBeCloseTo(58.44, 1);
  });

  it('debe calcular masa molar correctamente para Ca(OH)2', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('Ca(OH)2');
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.state).toBe('success');
    expect(result.current.result?.totalMass).toBeCloseTo(74.093, 2);
  });

  it('debe calcular masa molar correctamente para C6H12O6 (glucosa)', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('C6H12O6');
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.state).toBe('success');
    expect(result.current.result?.totalMass).toBeCloseTo(180.156, 2);
  });

  it('debe manejar errores de fórmula inválida', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('XyZ123');
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.state).toBe('error');
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeTruthy();
  });

  it('debe mostrar error cuando la fórmula está vacía', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('');
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.state).toBe('error');
    expect(result.current.error).toBe('Ingresa una fórmula química');
  });

  it('debe mostrar error cuando la fórmula solo tiene espacios', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('   ');
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.state).toBe('error');
    expect(result.current.error).toBe('Ingresa una fórmula química');
  });

  it('debe guardar en historial tras cálculo exitoso', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('H2O');
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].formulaNormalized).toBe('H2O');
  });

  it('debe evitar duplicados en historial moviendo al inicio', () => {
    const { result } = renderHook(() => useMolarMass());

    // Primera fórmula
    act(() => {
      result.current.setFormula('H2O');
    });
    act(() => {
      result.current.calculate();
    });

    expect(result.current.history).toHaveLength(1);

    // Segunda fórmula
    act(() => {
      result.current.setFormula('NaCl');
    });
    act(() => {
      result.current.calculate();
    });

    expect(result.current.history).toHaveLength(2);

    // Repetir primera fórmula
    act(() => {
      result.current.setFormula('H2O');
    });
    act(() => {
      result.current.calculate();
    });

    // Debería seguir siendo 2, no 3
    expect(result.current.history).toHaveLength(2);
    // H2O debería estar al inicio
    expect(result.current.history[0].formulaNormalized).toBe('H2O');
    expect(result.current.history[1].formulaNormalized).toBe('NaCl');
  });

  it('debe limitar historial a 5 elementos', () => {
    const { result } = renderHook(() => useMolarMass());
    const formulas = ['H2O', 'NaCl', 'CO2', 'O2', 'N2', 'H2', 'He'];

    for (const formula of formulas) {
      act(() => {
        result.current.setFormula(formula);
      });
      act(() => {
        result.current.calculate();
      });
    }

    expect(result.current.history).toHaveLength(5);
    // El más reciente debería estar al inicio
    expect(result.current.history[0].formulaNormalized).toBe('He');
  });

  it('debe limpiar estado al llamar clear', () => {
    const { result } = renderHook(() => useMolarMass());

    // Primero calcular algo
    act(() => {
      result.current.setFormula('H2O');
    });
    act(() => {
      result.current.calculate();
    });

    expect(result.current.state).toBe('success');

    // Luego limpiar
    act(() => {
      result.current.clear();
    });

    expect(result.current.formula).toBe('');
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.state).toBe('idle');
    // El historial NO se borra con clear
    expect(result.current.history).toHaveLength(1);
  });

  it('debe limpiar historial al llamar clearHistory', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('H2O');
    });
    act(() => {
      result.current.calculate();
    });

    expect(result.current.history).toHaveLength(1);

    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.history).toHaveLength(0);
  });

  it('debe retornar breakdown con colores CPK', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('H2O');
    });
    act(() => {
      result.current.calculate();
    });

    expect(result.current.state).toBe('success');
    expect(result.current.result?.breakdown).toHaveLength(2);
    
    // Verificar estructura del breakdown
    const hydrogen = result.current.result?.breakdown.find(e => e.symbol === 'H');
    expect(hydrogen).toBeDefined();
    expect(hydrogen?.count).toBe(2);
    expect(hydrogen?.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    
    const oxygen = result.current.result?.breakdown.find(e => e.symbol === 'O');
    expect(oxygen).toBeDefined();
    expect(oxygen?.count).toBe(1);
  });

  it('debe calcular breakdown con subtotales correctos', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('H2O');
    });
    act(() => {
      result.current.calculate();
    });

    const breakdown = result.current.result?.breakdown;
    expect(breakdown).toBeDefined();

    const hydrogen = breakdown?.find(e => e.symbol === 'H');
    // H: 1.008 × 2 = 2.016
    expect(hydrogen?.subtotal).toBeCloseTo(2.016, 3);

    const oxygen = breakdown?.find(e => e.symbol === 'O');
    // O: 15.999 × 1 = 15.999
    expect(oxygen?.subtotal).toBeCloseTo(15.999, 3);
  });

  it('debe incluir nombre de elementos en breakdown', () => {
    const { result } = renderHook(() => useMolarMass());

    act(() => {
      result.current.setFormula('NaCl');
    });
    act(() => {
      result.current.calculate();
    });

    const sodium = result.current.result?.breakdown.find(e => e.symbol === 'Na');
    expect(sodium?.name).toBe('Sodio');

    const chlorine = result.current.result?.breakdown.find(e => e.symbol === 'Cl');
    expect(chlorine?.name).toBe('Cloro');
  });
});
