/**
 * Hook para la Composición Porcentual
 * Calcula el porcentaje de masa de cada elemento en un compuesto
 */

import { useState, useMemo, useCallback } from 'react';
import { calculateComposition, type CompositionResult } from '../../utils/chemistryEngine';
import { parseFormula } from '../../utils/formulaParser';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

export interface UseCompositionReturn {
  // Fórmula
  formula: string;
  setFormula: (f: string) => void;
  
  // Resultado
  result: CompositionResult | null;
  
  // Estados
  isValid: boolean;
  isCalculated: boolean;
  error: string | null;
  
  // Acciones
  calculate: () => void;
  clear: () => void;
}

// ═══════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════

export const useComposition = (): UseCompositionReturn => {
  const [formula, setFormulaState] = useState('');
  const [result, setResult] = useState<CompositionResult | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);
  
  // Validar fórmula en tiempo real
  const { isValid, error } = useMemo(() => {
    if (!formula.trim()) {
      return { isValid: false, error: null };
    }
    
    const parsed = parseFormula(formula);
    if (!parsed.isValid) {
      return { isValid: false, error: parsed.error || 'Fórmula inválida' };
    }
    
    return { isValid: true, error: null };
  }, [formula]);
  
  // Setter de fórmula
  const setFormula = useCallback((newFormula: string) => {
    setFormulaState(newFormula);
    setIsCalculated(false);
    setResult(null);
  }, []);
  
  // Calcular composición
  const calculate = useCallback(() => {
    if (!isValid) return;
    
    const compositionResult = calculateComposition(formula);
    setResult(compositionResult);
    setIsCalculated(true);
  }, [formula, isValid]);
  
  // Limpiar
  const clear = useCallback(() => {
    setFormulaState('');
    setResult(null);
    setIsCalculated(false);
  }, []);
  
  return {
    formula,
    setFormula,
    result,
    isValid,
    isCalculated,
    error,
    calculate,
    clear,
  };
};

export default useComposition;

