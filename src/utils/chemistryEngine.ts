/**
 * Motor de Cálculo Químico
 * Funciones para cálculos de masa molar, conversiones y composición
 */

import { getElement, AVOGADRO } from '../data/elements';
import { parseFormula } from './formulaParser';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

export interface ElementBreakdown {
  symbol: string;
  name: string;
  count: number;
  atomicMass: number;
  subtotal: number;
  color: string;
}

export interface MolarMassResult {
  formula: string;
  formulaNormalized: string;
  totalMass: number;
  breakdown: ElementBreakdown[];
  isValid: boolean;
  error?: string;
}

export interface ConversionResult {
  moles: number;
  grams: number;
  particles: number;
  molarMass: number;
  formula: string;
  isValid: boolean;
  error?: string;
}

export interface CompositionElement {
  symbol: string;
  name: string;
  count: number;
  massContribution: number;
  percentage: number;
  color: string;
}

export interface CompositionResult {
  formula: string;
  totalMass: number;
  elements: CompositionElement[];
  isValid: boolean;
  error?: string;
}

// ═══════════════════════════════════════════════════════════════
// MASA MOLAR
// ═══════════════════════════════════════════════════════════════

/**
 * Calcula la masa molar de una fórmula química
 * 
 * @param formula - Fórmula química (ej: "H2O", "NaCl", "Ca(OH)2")
 * @returns Resultado con masa total y desglose por elemento
 * 
 * @example
 * calculateMolarMass("H2O")
 * // { totalMass: 18.015, breakdown: [{symbol: "H", count: 2, subtotal: 2.016}, ...], ... }
 */
export const calculateMolarMass = (formula: string): MolarMassResult => {
  // Parsear la fórmula
  const parsed = parseFormula(formula);
  
  if (!parsed.isValid) {
    return {
      formula: parsed.original,
      formulaNormalized: parsed.normalized,
      totalMass: 0,
      breakdown: [],
      isValid: false,
      error: parsed.error,
    };
  }
  
  // Calcular masa de cada elemento
  const breakdown: ElementBreakdown[] = [];
  let totalMass = 0;
  
  for (const { symbol, count } of parsed.elements) {
    const element = getElement(symbol);
    
    if (!element) {
      return {
        formula: parsed.original,
        formulaNormalized: parsed.normalized,
        totalMass: 0,
        breakdown: [],
        isValid: false,
        error: `Elemento "${symbol}" no encontrado`,
      };
    }
    
    const subtotal = element.atomicMass * count;
    totalMass += subtotal;
    
    breakdown.push({
      symbol: element.symbol,
      name: element.name,
      count,
      atomicMass: element.atomicMass,
      subtotal,
      color: `#${element.cpkHex}`,
    });
  }
  
  return {
    formula: parsed.original,
    formulaNormalized: parsed.normalized,
    totalMass: roundTo(totalMass, 4),
    breakdown,
    isValid: true,
  };
};

// ═══════════════════════════════════════════════════════════════
// CONVERSIONES
// ═══════════════════════════════════════════════════════════════

/**
 * Convierte moles a gramos
 */
export const molesToGrams = (moles: number, molarMass: number): number => {
  return roundTo(moles * molarMass, 6);
};

/**
 * Convierte gramos a moles
 */
export const gramsToMoles = (grams: number, molarMass: number): number => {
  if (molarMass === 0) return 0;
  return roundTo(grams / molarMass, 6);
};

/**
 * Convierte moles a número de partículas (moléculas/átomos)
 */
export const molesToParticles = (moles: number): number => {
  return moles * AVOGADRO;
};

/**
 * Convierte número de partículas a moles
 */
export const particlesToMoles = (particles: number): number => {
  return particles / AVOGADRO;
};

/**
 * Conversión completa dado un compuesto y un valor
 * 
 * @param formula - Fórmula química
 * @param value - Valor numérico
 * @param fromUnit - Unidad de origen: 'moles' | 'grams' | 'particles'
 */
export const convertUnits = (
  formula: string,
  value: number,
  fromUnit: 'moles' | 'grams' | 'particles'
): ConversionResult => {
  // Calcular masa molar
  const massResult = calculateMolarMass(formula);
  
  if (!massResult.isValid) {
    return {
      moles: 0,
      grams: 0,
      particles: 0,
      molarMass: 0,
      formula,
      isValid: false,
      error: massResult.error,
    };
  }
  
  const molarMass = massResult.totalMass;
  let moles: number;
  let grams: number;
  let particles: number;
  
  // Calcular según la unidad de origen
  switch (fromUnit) {
    case 'moles':
      moles = value;
      grams = molesToGrams(moles, molarMass);
      particles = molesToParticles(moles);
      break;
      
    case 'grams':
      grams = value;
      moles = gramsToMoles(grams, molarMass);
      particles = molesToParticles(moles);
      break;
      
    case 'particles':
      particles = value;
      moles = particlesToMoles(particles);
      grams = molesToGrams(moles, molarMass);
      break;
  }
  
  return {
    moles: roundTo(moles, 6),
    grams: roundTo(grams, 6),
    particles,
    molarMass,
    formula: massResult.formulaNormalized,
    isValid: true,
  };
};

// ═══════════════════════════════════════════════════════════════
// COMPOSICIÓN PORCENTUAL
// ═══════════════════════════════════════════════════════════════

/**
 * Calcula la composición porcentual de un compuesto
 * 
 * @param formula - Fórmula química
 * @returns Resultado con porcentaje de cada elemento
 * 
 * @example
 * calculateComposition("H2O")
 * // { elements: [{symbol: "H", percentage: 11.19}, {symbol: "O", percentage: 88.81}], ... }
 */
export const calculateComposition = (formula: string): CompositionResult => {
  const massResult = calculateMolarMass(formula);
  
  if (!massResult.isValid) {
    return {
      formula,
      totalMass: 0,
      elements: [],
      isValid: false,
      error: massResult.error,
    };
  }
  
  const totalMass = massResult.totalMass;
  
  const elements: CompositionElement[] = massResult.breakdown.map(el => ({
    symbol: el.symbol,
    name: el.name,
    count: el.count,
    massContribution: el.subtotal,
    percentage: roundTo((el.subtotal / totalMass) * 100, 2),
    color: el.color,
  }));
  
  // Ordenar por porcentaje descendente
  elements.sort((a, b) => b.percentage - a.percentage);
  
  return {
    formula: massResult.formulaNormalized,
    totalMass,
    elements,
    isValid: true,
  };
};

// ═══════════════════════════════════════════════════════════════
// FÓRMULA EMPÍRICA Y MOLECULAR
// ═══════════════════════════════════════════════════════════════

export interface EmpiricalInput {
  symbol: string;
  percentage: number;
}

export interface EmpiricalStep {
  step: number;
  description: string;
  values: { symbol: string; value: number; display: string }[];
}

export interface EmpiricalResult {
  formula: string;
  formulaFormatted: string;
  steps: EmpiricalStep[];
  isValid: boolean;
  error?: string;
}

/**
 * Calcula la fórmula empírica desde porcentajes de masa
 * 
 * @param inputs - Array de elementos con sus porcentajes
 * @returns Fórmula empírica con pasos del cálculo
 */
export const calculateEmpiricalFormula = (inputs: EmpiricalInput[]): EmpiricalResult => {
  if (inputs.length < 2) {
    return {
      formula: '',
      formulaFormatted: '',
      steps: [],
      isValid: false,
      error: 'Se necesitan al menos 2 elementos',
    };
  }
  
  // Verificar que los porcentajes sumen ~100%
  const totalPercentage = inputs.reduce((sum, i) => sum + i.percentage, 0);
  if (totalPercentage < 95 || totalPercentage > 105) {
    return {
      formula: '',
      formulaFormatted: '',
      steps: [],
      isValid: false,
      error: `Los porcentajes suman ${totalPercentage.toFixed(1)}%, deberían sumar ~100%`,
    };
  }
  
  const steps: EmpiricalStep[] = [];
  
  // Paso 1: Convertir porcentajes a moles (asumiendo 100g de muestra)
  const molesData: { symbol: string; moles: number }[] = [];
  const step1Values: EmpiricalStep['values'] = [];
  
  for (const input of inputs) {
    const element = getElement(input.symbol);
    if (!element) {
      return {
        formula: '',
        formulaFormatted: '',
        steps: [],
        isValid: false,
        error: `Elemento "${input.symbol}" no válido`,
      };
    }
    
    const moles = input.percentage / element.atomicMass;
    molesData.push({ symbol: input.symbol, moles });
    step1Values.push({
      symbol: input.symbol,
      value: moles,
      display: `${input.percentage} ÷ ${element.atomicMass} = ${moles.toFixed(4)} mol`,
    });
  }
  
  steps.push({
    step: 1,
    description: 'Convertir porcentajes a moles (% ÷ masa atómica)',
    values: step1Values,
  });
  
  // Paso 2: Dividir por el menor valor
  const minMoles = Math.min(...molesData.map(d => d.moles));
  const ratiosData: { symbol: string; ratio: number }[] = [];
  const step2Values: EmpiricalStep['values'] = [];
  
  for (const data of molesData) {
    const ratio = data.moles / minMoles;
    ratiosData.push({ symbol: data.symbol, ratio });
    step2Values.push({
      symbol: data.symbol,
      value: ratio,
      display: `${data.moles.toFixed(4)} ÷ ${minMoles.toFixed(4)} = ${ratio.toFixed(2)}`,
    });
  }
  
  steps.push({
    step: 2,
    description: `Dividir todos por el menor (${minMoles.toFixed(4)})`,
    values: step2Values,
  });
  
  // Paso 3: Ajustar a enteros (multiplicar si es necesario)
  let multiplier = 1;
  const tolerance = 0.1;
  
  // Buscar un multiplicador que haga todos los ratios cercanos a enteros
  for (let m = 1; m <= 6; m++) {
    const allIntegers = ratiosData.every(d => {
      const scaled = d.ratio * m;
      return Math.abs(scaled - Math.round(scaled)) < tolerance;
    });
    
    if (allIntegers) {
      multiplier = m;
      break;
    }
  }
  
  const finalData: { symbol: string; count: number }[] = [];
  const step3Values: EmpiricalStep['values'] = [];
  
  for (const data of ratiosData) {
    const count = Math.round(data.ratio * multiplier);
    finalData.push({ symbol: data.symbol, count });
    step3Values.push({
      symbol: data.symbol,
      value: count,
      display: multiplier > 1 
        ? `${data.ratio.toFixed(2)} × ${multiplier} = ${count}`
        : `≈ ${count}`,
    });
  }
  
  if (multiplier > 1) {
    steps.push({
      step: 3,
      description: `Multiplicar por ${multiplier} para obtener enteros`,
      values: step3Values,
    });
  } else {
    steps.push({
      step: 3,
      description: 'Redondear a enteros más cercanos',
      values: step3Values,
    });
  }
  
  // Construir fórmula
  const formula = finalData
    .map(d => d.count === 1 ? d.symbol : `${d.symbol}${d.count}`)
    .join('');
  
  const formulaFormatted = finalData
    .map(d => d.count === 1 ? d.symbol : `${d.symbol}�${toSubscript(d.count)}`)
    .join('');
  
  return {
    formula,
    formulaFormatted,
    steps,
    isValid: true,
  };
};

export interface MolecularResult {
  empiricalFormula: string;
  molecularFormula: string;
  molecularFormulaFormatted: string;
  empiricalMass: number;
  experimentalMass: number;
  multiplier: number;
  isValid: boolean;
  error?: string;
}

/**
 * Calcula la fórmula molecular desde la empírica y masa molar experimental
 */
export const calculateMolecularFormula = (
  empiricalFormula: string,
  experimentalMass: number
): MolecularResult => {
  // Calcular masa de la fórmula empírica
  const empiricalResult = calculateMolarMass(empiricalFormula);
  
  if (!empiricalResult.isValid) {
    return {
      empiricalFormula,
      molecularFormula: '',
      molecularFormulaFormatted: '',
      empiricalMass: 0,
      experimentalMass,
      multiplier: 0,
      isValid: false,
      error: empiricalResult.error,
    };
  }
  
  const empiricalMass = empiricalResult.totalMass;
  
  // Calcular multiplicador
  const rawMultiplier = experimentalMass / empiricalMass;
  const multiplier = Math.round(rawMultiplier);
  
  // Verificar que el multiplicador sea razonable
  if (Math.abs(rawMultiplier - multiplier) > 0.1) {
    return {
      empiricalFormula: empiricalResult.formulaNormalized,
      molecularFormula: '',
      molecularFormulaFormatted: '',
      empiricalMass,
      experimentalMass,
      multiplier: rawMultiplier,
      isValid: false,
      error: `El multiplicador (${rawMultiplier.toFixed(2)}) no es un entero. Verifica la masa molar experimental.`,
    };
  }
  
  // Construir fórmula molecular
  const parsed = parseFormula(empiricalFormula);
  const molecularElements = parsed.elements.map(el => ({
    symbol: el.symbol,
    count: el.count * multiplier,
  }));
  
  const molecularFormula = molecularElements
    .map(el => el.count === 1 ? el.symbol : `${el.symbol}${el.count}`)
    .join('');
  
  const molecularFormulaFormatted = molecularElements
    .map(el => el.count === 1 ? el.symbol : `${el.symbol}${toSubscript(el.count)}`)
    .join('');
  
  return {
    empiricalFormula: empiricalResult.formulaNormalized,
    molecularFormula,
    molecularFormulaFormatted,
    empiricalMass,
    experimentalMass,
    multiplier,
    isValid: true,
  };
};

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Redondea un número a n decimales
 */
const roundTo = (num: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};

/**
 * Convierte un número a subíndice Unicode
 */
const toSubscript = (num: number): string => {
  const subscripts: { [key: string]: string } = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  };
  return num.toString().split('').map(d => subscripts[d] || d).join('');
};

/**
 * Formatea un número grande en notación científica legible
 */
export const formatScientific = (num: number, precision: number = 3): string => {
  if (num === 0) return '0';
  
  const absNum = Math.abs(num);
  
  // Usar notación científica para números muy grandes o muy pequeños
  if (absNum >= 1e6 || (absNum < 0.001 && absNum > 0)) {
    const exp = Math.floor(Math.log10(absNum));
    const mantissa = num / Math.pow(10, exp);
    return `${mantissa.toFixed(precision - 1)} × 10${toSuperscript(exp)}`;
  }
  
  // Formato normal con separadores de miles
  return num.toLocaleString('es-CL', { 
    maximumFractionDigits: precision,
    minimumFractionDigits: 0,
  });
};

/**
 * Convierte un número a superíndice Unicode
 */
const toSuperscript = (num: number): string => {
  const superscripts: { [key: string]: string } = {
    '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  };
  return num.toString().split('').map(d => superscripts[d] || d).join('');
};

// Re-exportar constante de Avogadro
export { AVOGADRO };

