/**
 * Hook useMolarMass
 * Encapsula la lógica de cálculo de masa molar con historial
 */

import { useState, useCallback } from 'react';
import { calculateMolarMass, type MolarMassResult } from '../../utils/chemistryEngine';

type CalculationState = 'idle' | 'calculating' | 'success' | 'error';

export interface UseMolarMassReturn {
  // Estado de la fórmula
  formula: string;
  setFormula: (formula: string) => void;
  
  // Resultado del cálculo
  result: MolarMassResult | null;
  error: string | null;
  
  // Estado del cálculo
  state: CalculationState;
  isCalculating: boolean;
  
  // Acciones
  calculate: () => void;
  clear: () => void;
  
  // Historial
  history: MolarMassResult[];
  clearHistory: () => void;
}

const MAX_HISTORY_SIZE = 5;

export const useMolarMass = (): UseMolarMassReturn => {
  const [formula, setFormula] = useState<string>('');
  const [result, setResult] = useState<MolarMassResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<CalculationState>('idle');
  const [history, setHistory] = useState<MolarMassResult[]>([]);

  const calculate = useCallback(() => {
    // Validar que haya una fórmula
    if (!formula.trim()) {
      setError('Ingresa una fórmula química');
      setState('error');
      setResult(null);
      return;
    }

    setState('calculating');
    setError(null);

    // Cálculo inmediato (es instantáneo, no necesita delay)
    const calculationResult = calculateMolarMass(formula.trim());

    if (calculationResult.isValid) {
      setResult(calculationResult);
      setError(null);
      setState('success');

      // Agregar al historial evitando duplicados recientes
      setHistory(prev => {
        const exists = prev.some(
          h => h.formulaNormalized === calculationResult.formulaNormalized
        );
        
        if (exists) {
          // Mover al inicio si ya existe
          return [
            calculationResult,
            ...prev.filter(h => h.formulaNormalized !== calculationResult.formulaNormalized)
          ].slice(0, MAX_HISTORY_SIZE);
        }
        
        return [calculationResult, ...prev].slice(0, MAX_HISTORY_SIZE);
      });
    } else {
      setResult(null);
      setError(calculationResult.error || 'Error al calcular');
      setState('error');
    }
  }, [formula]);

  const clear = useCallback(() => {
    setFormula('');
    setResult(null);
    setError(null);
    setState('idle');
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    formula,
    setFormula,
    result,
    error,
    state,
    isCalculating: state === 'calculating',
    calculate,
    clear,
    history,
    clearHistory,
  };
};

export default useMolarMass;

