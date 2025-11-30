/**
 * Hook para el Conversor de Moles/Gramos/Partículas
 * Permite conversiones bidireccionales en tiempo real
 */

import { useState, useCallback, useMemo } from 'react';
import { calculateMolarMass, AVOGADRO } from '../../utils/chemistryEngine';
import { parseFormula } from '../../utils/formulaParser';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

export type ConverterField = 'moles' | 'grams' | 'particles';

export interface UseConverterReturn {
  // Fórmula
  formula: string;
  setFormula: (f: string) => void;
  molarMass: number | null;
  formulaError: string | null;
  
  // Valores
  moles: string;
  grams: string;
  particles: string;
  
  // Campo activo
  activeField: ConverterField | null;
  
  // Setters
  setMoles: (value: string) => void;
  setGrams: (value: string) => void;
  setParticles: (value: string) => void;
  
  // Acciones
  clear: () => void;
  
  // Estados
  isValid: boolean;
  hasValues: boolean;
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Sanitiza un input numérico (elimina negativos y caracteres inválidos)
 */
const sanitizeNumericInput = (value: string): string => {
  // Permitir notación científica (e, E)
  // Eliminar caracteres no válidos excepto números, punto, e, E
  let sanitized = value.replace(/[^0-9.eE]/g, '');
  
  // Solo permitir un punto decimal
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = parts[0] + '.' + parts.slice(1).join('');
  }
  
  return sanitized;
};

/**
 * Parsea un string a número, soportando notación científica
 */
const parseNumber = (value: string): number | null => {
  if (!value || value === '') return null;
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return null;
  return num;
};

/**
 * Formatea un número para display
 */
const formatForDisplay = (num: number, isParticles: boolean = false): string => {
  if (num === 0) return '0';
  
  // Para partículas, siempre usar notación científica si es grande
  if (isParticles && num >= 1000) {
    const exp = Math.floor(Math.log10(num));
    const mantissa = num / Math.pow(10, exp);
    return `${mantissa.toFixed(4)}e${exp}`;
  }
  
  // Para números muy grandes o muy pequeños
  if (num >= 1e9 || (num < 0.0001 && num > 0)) {
    return num.toExponential(4);
  }
  
  // Números normales
  return num.toPrecision(6).replace(/\.?0+$/, '');
};

// ═══════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════

export const useConverter = (): UseConverterReturn => {
  // Estado de la fórmula
  const [formula, setFormulaState] = useState('');
  
  // Estados de los campos
  const [moles, setMolesState] = useState('');
  const [grams, setGramsState] = useState('');
  const [particles, setParticlesState] = useState('');
  
  // Campo que está siendo editado
  const [activeField, setActiveField] = useState<ConverterField | null>(null);
  
  // Calcular masa molar cuando cambia la fórmula
  const { molarMass, formulaError } = useMemo(() => {
    if (!formula.trim()) {
      return { molarMass: null, formulaError: null };
    }
    
    const parsed = parseFormula(formula);
    if (!parsed.isValid) {
      return { molarMass: null, formulaError: parsed.error || 'Fórmula inválida' };
    }
    
    const result = calculateMolarMass(formula);
    if (!result.isValid) {
      return { molarMass: null, formulaError: result.error || 'Error de cálculo' };
    }
    
    return { molarMass: result.totalMass, formulaError: null };
  }, [formula]);
  
  // Setter de fórmula (limpia valores si la fórmula cambia)
  const setFormula = useCallback((newFormula: string) => {
    setFormulaState(newFormula);
  }, []);
  
  // Conversión desde moles
  const setMoles = useCallback((value: string) => {
    const sanitized = sanitizeNumericInput(value);
    setMolesState(sanitized);
    setActiveField('moles');
    
    const numValue = parseNumber(sanitized);
    if (numValue === null || molarMass === null) {
      setGramsState('');
      setParticlesState('');
      return;
    }
    
    // Calcular gramos y partículas
    const newGrams = numValue * molarMass;
    const newParticles = numValue * AVOGADRO;
    
    setGramsState(formatForDisplay(newGrams));
    setParticlesState(formatForDisplay(newParticles, true));
  }, [molarMass]);
  
  // Conversión desde gramos
  const setGrams = useCallback((value: string) => {
    const sanitized = sanitizeNumericInput(value);
    setGramsState(sanitized);
    setActiveField('grams');
    
    const numValue = parseNumber(sanitized);
    if (numValue === null || molarMass === null || molarMass === 0) {
      setMolesState('');
      setParticlesState('');
      return;
    }
    
    // Calcular moles y partículas
    const newMoles = numValue / molarMass;
    const newParticles = newMoles * AVOGADRO;
    
    setMolesState(formatForDisplay(newMoles));
    setParticlesState(formatForDisplay(newParticles, true));
  }, [molarMass]);
  
  // Conversión desde partículas
  const setParticles = useCallback((value: string) => {
    const sanitized = sanitizeNumericInput(value);
    setParticlesState(sanitized);
    setActiveField('particles');
    
    const numValue = parseNumber(sanitized);
    if (numValue === null || molarMass === null) {
      setMolesState('');
      setGramsState('');
      return;
    }
    
    // Calcular moles y gramos
    const newMoles = numValue / AVOGADRO;
    const newGrams = newMoles * molarMass;
    
    setMolesState(formatForDisplay(newMoles));
    setGramsState(formatForDisplay(newGrams));
  }, [molarMass]);
  
  // Limpiar todo
  const clear = useCallback(() => {
    setMolesState('');
    setGramsState('');
    setParticlesState('');
    setActiveField(null);
  }, []);
  
  // Estados derivados
  const isValid = molarMass !== null && formulaError === null;
  const hasValues = moles !== '' || grams !== '' || particles !== '';
  
  return {
    formula,
    setFormula,
    molarMass,
    formulaError,
    moles,
    grams,
    particles,
    activeField,
    setMoles,
    setGrams,
    setParticles,
    clear,
    isValid,
    hasValues,
  };
};

export default useConverter;

