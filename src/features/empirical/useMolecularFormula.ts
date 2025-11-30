/**
 * Hook para calcular Fórmula Molecular desde Empírica
 */

import { useState, useCallback, useMemo } from 'react';
import { calculateMolecularFormula, calculateMolarMass, type MolecularResult } from '../../utils/chemistryEngine';
import { parseFormula } from '../../utils/formulaParser';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

export interface UseMolecularFormulaReturn {
  // Inputs
  empiricalFormula: string;
  setEmpiricalFormula: (f: string) => void;
  experimentalMass: string;
  setExperimentalMass: (m: string) => void;
  
  // Validación
  isValidFormula: boolean;
  formulaError: string | null;
  empiricalMass: number | null;
  canCalculate: boolean;
  
  // Cálculo
  calculate: () => void;
  result: MolecularResult | null;
  isCalculated: boolean;
  
  // Acciones
  clear: () => void;
  loadExample: () => void;
}

// ═══════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════

export const useMolecularFormula = (): UseMolecularFormulaReturn => {
  // Estados de inputs
  const [empiricalFormula, setEmpiricalFormulaState] = useState('');
  const [experimentalMass, setExperimentalMassState] = useState('');
  
  // Estado de resultado
  const [result, setResult] = useState<MolecularResult | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);
  
  // Validar fórmula empírica y calcular su masa
  const { isValidFormula, formulaError, empiricalMass } = useMemo(() => {
    if (!empiricalFormula.trim()) {
      return { isValidFormula: false, formulaError: null, empiricalMass: null };
    }
    
    const parsed = parseFormula(empiricalFormula);
    if (!parsed.isValid) {
      return { 
        isValidFormula: false, 
        formulaError: parsed.error || 'Fórmula inválida', 
        empiricalMass: null 
      };
    }
    
    const massResult = calculateMolarMass(empiricalFormula);
    if (!massResult.isValid) {
      return { 
        isValidFormula: false, 
        formulaError: massResult.error || 'Error de cálculo', 
        empiricalMass: null 
      };
    }
    
    return { 
      isValidFormula: true, 
      formulaError: null, 
      empiricalMass: massResult.totalMass 
    };
  }, [empiricalFormula]);
  
  // Verificar si se puede calcular
  const canCalculate = useMemo(() => {
    if (!isValidFormula || empiricalMass === null) return false;
    
    const mass = parseFloat(experimentalMass);
    if (isNaN(mass) || mass <= 0) return false;
    
    // La masa experimental debe ser mayor o igual a la empírica
    if (mass < empiricalMass * 0.9) return false;
    
    return true;
  }, [isValidFormula, empiricalMass, experimentalMass]);
  
  // Setters con reset de resultado
  const setEmpiricalFormula = useCallback((f: string) => {
    setEmpiricalFormulaState(f);
    setResult(null);
    setIsCalculated(false);
  }, []);
  
  const setExperimentalMass = useCallback((m: string) => {
    // Solo permitir números positivos
    const cleaned = m.replace(/[^0-9.]/g, '');
    setExperimentalMassState(cleaned);
    setResult(null);
    setIsCalculated(false);
  }, []);
  
  // Calcular
  const calculate = useCallback(() => {
    if (!canCalculate) return;
    
    const mass = parseFloat(experimentalMass);
    const molecularResult = calculateMolecularFormula(empiricalFormula, mass);
    setResult(molecularResult);
    setIsCalculated(true);
  }, [canCalculate, empiricalFormula, experimentalMass]);
  
  // Limpiar
  const clear = useCallback(() => {
    setEmpiricalFormulaState('');
    setExperimentalMassState('');
    setResult(null);
    setIsCalculated(false);
  }, []);
  
  // Cargar ejemplo (CH2O → C6H12O6 con 180 g/mol)
  const loadExample = useCallback(() => {
    setEmpiricalFormulaState('CH2O');
    setExperimentalMassState('180');
    setResult(null);
    setIsCalculated(false);
  }, []);
  
  return {
    empiricalFormula,
    setEmpiricalFormula,
    experimentalMass,
    setExperimentalMass,
    isValidFormula,
    formulaError,
    empiricalMass,
    canCalculate,
    calculate,
    result,
    isCalculated,
    clear,
    loadExample,
  };
};

export default useMolecularFormula;

