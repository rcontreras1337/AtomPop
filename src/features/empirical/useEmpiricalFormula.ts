/**
 * Hook para calcular Fórmula Empírica desde porcentajes
 */

import { useState, useCallback, useMemo } from 'react';
import { calculateEmpiricalFormula, type EmpiricalInput, type EmpiricalResult } from '../../utils/chemistryEngine';
import { isValidElement } from '../../data/elements';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

export interface ElementEntry {
  id: string;
  symbol: string;
  percentage: string;
}

export interface UseEmpiricalFormulaReturn {
  // Elementos
  elements: ElementEntry[];
  addElement: () => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, field: 'symbol' | 'percentage', value: string) => void;
  
  // Validación
  totalPercentage: number;
  isValidTotal: boolean;
  canCalculate: boolean;
  validationError: string | null;
  
  // Cálculo
  calculate: () => void;
  result: EmpiricalResult | null;
  isCalculated: boolean;
  
  // Acciones
  clear: () => void;
  loadExample: () => void;
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

const generateId = () => Math.random().toString(36).substring(2, 9);

const createEmptyElement = (): ElementEntry => ({
  id: generateId(),
  symbol: '',
  percentage: '',
});

// ═══════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════

export const useEmpiricalFormula = (): UseEmpiricalFormulaReturn => {
  // Estado de elementos
  const [elements, setElements] = useState<ElementEntry[]>([
    createEmptyElement(),
    createEmptyElement(),
  ]);
  
  // Estado de resultado
  const [result, setResult] = useState<EmpiricalResult | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);
  
  // Calcular total de porcentajes
  const totalPercentage = useMemo(() => {
    return elements.reduce((sum, el) => {
      const value = parseFloat(el.percentage);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  }, [elements]);
  
  // Validar total
  const isValidTotal = totalPercentage >= 99 && totalPercentage <= 101;
  
  // Validación completa - calculada directamente para evitar problemas con React Compiler
  const validElements = elements.filter(
    el => el.symbol && el.percentage && parseFloat(el.percentage) > 0
  );
  
  let canCalculate = false;
  let validationError: string | null = null;
  
  if (validElements.length < 2) {
    validationError = 'Ingresa al menos 2 elementos';
  } else {
    // Verificar símbolos válidos
    let invalidSymbol = '';
    for (const el of validElements) {
      if (!isValidElement(el.symbol)) {
        invalidSymbol = el.symbol;
        break;
      }
    }
    
    if (invalidSymbol) {
      validationError = `Elemento "${invalidSymbol}" no válido`;
    } else {
      // Verificar duplicados
      const symbols = validElements.map(el => el.symbol);
      const uniqueSymbols = new Set(symbols);
      
      if (uniqueSymbols.size !== symbols.length) {
        validationError = 'No repitas elementos';
      } else if (totalPercentage < 95) {
        validationError = `Los porcentajes suman ${totalPercentage.toFixed(1)}% (deben sumar ~100%)`;
      } else if (totalPercentage > 105) {
        validationError = `Los porcentajes suman ${totalPercentage.toFixed(1)}% (excede 100%)`;
      } else {
        canCalculate = true;
      }
    }
  }
  
  // Agregar elemento
  const addElement = useCallback(() => {
    if (elements.length >= 10) return;
    setElements(prev => [...prev, createEmptyElement()]);
    setIsCalculated(false);
  }, [elements.length]);
  
  // Eliminar elemento
  const removeElement = useCallback((id: string) => {
    if (elements.length <= 2) return;
    setElements(prev => prev.filter(el => el.id !== id));
    setIsCalculated(false);
  }, [elements.length]);
  
  // Actualizar elemento
  const updateElement = useCallback((id: string, field: 'symbol' | 'percentage', value: string) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, [field]: value } : el
    ));
    setIsCalculated(false);
    setResult(null);
  }, []);
  
  // Calcular
  const calculate = useCallback(() => {
    if (!canCalculate) return;
    
    const inputs: EmpiricalInput[] = elements
      .filter(el => el.symbol && el.percentage)
      .map(el => ({
        symbol: el.symbol,
        percentage: parseFloat(el.percentage),
      }));
    
    const empiricalResult = calculateEmpiricalFormula(inputs);
    setResult(empiricalResult);
    setIsCalculated(true);
  }, [canCalculate, elements]);
  
  // Limpiar
  const clear = useCallback(() => {
    setElements([createEmptyElement(), createEmptyElement()]);
    setResult(null);
    setIsCalculated(false);
  }, []);
  
  // Cargar ejemplo (CH2O - formaldehído)
  const loadExample = useCallback(() => {
    setElements([
      { id: generateId(), symbol: 'C', percentage: '40.0' },
      { id: generateId(), symbol: 'H', percentage: '6.7' },
      { id: generateId(), symbol: 'O', percentage: '53.3' },
    ]);
    setResult(null);
    setIsCalculated(false);
  }, []);
  
  return {
    elements,
    addElement,
    removeElement,
    updateElement,
    totalPercentage,
    isValidTotal,
    canCalculate,
    validationError,
    calculate,
    result,
    isCalculated,
    clear,
    loadExample,
  };
};

export default useEmpiricalFormula;

