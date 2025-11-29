/**
 * Parser de Fórmulas Químicas
 * Convierte strings como "H2O", "Ca(OH)2", "Al2(SO4)3" en objetos estructurados
 */

import { isValidElement, getElement } from '../data/elements';

// Tipos
export interface ParsedElement {
  symbol: string;
  count: number;
}

export interface ParsedFormula {
  elements: ParsedElement[];
  isValid: boolean;
  error?: string;
  original: string;
  normalized: string;
}

/**
 * Normaliza una fórmula química
 * - Convierte a mayúsculas/minúsculas correctas
 * - Corrige errores comunes (h2o -> H2O)
 */
export const normalizeFormula = (formula: string): string => {
  // Eliminar espacios
  let normalized = formula.trim().replace(/\s+/g, '');
  
  // Si está todo en minúsculas o mayúsculas, intentar corregir
  if (normalized === normalized.toLowerCase() || normalized === normalized.toUpperCase()) {
    // Patrón para encontrar elementos: letra mayúscula seguida de minúscula opcional, luego número opcional
    normalized = normalized.replace(/([a-zA-Z])([a-z]?)(\d*)/g, (_, first, second, num) => {
      return first.toUpperCase() + second.toLowerCase() + num;
    });
  }
  
  return normalized;
};

/**
 * Tokeniza una fórmula química en sus componentes
 */
interface Token {
  type: 'element' | 'number' | 'open_paren' | 'close_paren';
  value: string;
}

const tokenize = (formula: string): Token[] => {
  const tokens: Token[] = [];
  let i = 0;
  
  while (i < formula.length) {
    const char = formula[i];
    
    // Elemento (mayúscula seguida opcionalmente de minúscula)
    if (/[A-Z]/.test(char)) {
      let element = char;
      if (i + 1 < formula.length && /[a-z]/.test(formula[i + 1])) {
        element += formula[i + 1];
        i++;
      }
      tokens.push({ type: 'element', value: element });
    }
    // Número
    else if (/\d/.test(char)) {
      let num = char;
      while (i + 1 < formula.length && /\d/.test(formula[i + 1])) {
        num += formula[i + 1];
        i++;
      }
      tokens.push({ type: 'number', value: num });
    }
    // Paréntesis
    else if (char === '(' || char === '[') {
      tokens.push({ type: 'open_paren', value: '(' });
    }
    else if (char === ')' || char === ']') {
      tokens.push({ type: 'close_paren', value: ')' });
    }
    // Caracter inválido
    else if (char !== ' ') {
      // Ignorar espacios, pero otros caracteres son errores que manejamos después
    }
    
    i++;
  }
  
  return tokens;
};

/**
 * Parsea los tokens en una estructura de elementos con sus cantidades
 */
const parseTokens = (tokens: Token[]): { elements: Map<string, number>; error?: string } => {
  const stack: Map<string, number>[] = [new Map()];
  let i = 0;
  
  while (i < tokens.length) {
    const token = tokens[i];
    
    if (token.type === 'element') {
      const element = token.value;
      
      // Verificar si el elemento existe
      if (!isValidElement(element)) {
        return { 
          elements: new Map(), 
          error: `El elemento "${element}" no existe en la tabla periódica` 
        };
      }
      
      // Obtener cantidad (siguiente token si es número, sino 1)
      let count = 1;
      if (i + 1 < tokens.length && tokens[i + 1].type === 'number') {
        count = parseInt(tokens[i + 1].value, 10);
        i++;
      }
      
      // Agregar al mapa actual
      const currentMap = stack[stack.length - 1];
      currentMap.set(element, (currentMap.get(element) || 0) + count);
    }
    else if (token.type === 'open_paren') {
      // Nuevo contexto para el grupo
      stack.push(new Map());
    }
    else if (token.type === 'close_paren') {
      if (stack.length < 2) {
        return { elements: new Map(), error: 'Paréntesis sin abrir' };
      }
      
      // Obtener multiplicador
      let multiplier = 1;
      if (i + 1 < tokens.length && tokens[i + 1].type === 'number') {
        multiplier = parseInt(tokens[i + 1].value, 10);
        i++;
      }
      
      // Sacar el grupo del stack y multiplicar
      const groupMap = stack.pop()!;
      const parentMap = stack[stack.length - 1];
      
      for (const [element, count] of groupMap) {
        parentMap.set(element, (parentMap.get(element) || 0) + count * multiplier);
      }
    }
    
    i++;
  }
  
  if (stack.length !== 1) {
    return { elements: new Map(), error: 'Paréntesis sin cerrar' };
  }
  
  return { elements: stack[0] };
};

/**
 * Función principal: Parsea una fórmula química
 * 
 * @param formula - String de la fórmula (ej: "H2O", "Ca(OH)2", "Al2(SO4)3")
 * @returns ParsedFormula con los elementos y sus cantidades
 * 
 * @example
 * parseFormula("H2O")
 * // { elements: [{symbol: "H", count: 2}, {symbol: "O", count: 1}], isValid: true, ... }
 * 
 * parseFormula("Ca(OH)2")
 * // { elements: [{symbol: "Ca", count: 1}, {symbol: "O", count: 2}, {symbol: "H", count: 2}], isValid: true, ... }
 */
export const parseFormula = (formula: string): ParsedFormula => {
  const original = formula;
  
  // Validar entrada vacía
  if (!formula || formula.trim() === '') {
    return {
      elements: [],
      isValid: false,
      error: 'Ingresa una fórmula química',
      original,
      normalized: '',
    };
  }
  
  // Normalizar
  const normalized = normalizeFormula(formula);
  
  // Validar caracteres permitidos
  if (!/^[A-Za-z0-9()[\]]+$/.test(normalized)) {
    return {
      elements: [],
      isValid: false,
      error: 'La fórmula contiene caracteres no válidos',
      original,
      normalized,
    };
  }
  
  // Tokenizar
  const tokens = tokenize(normalized);
  
  if (tokens.length === 0) {
    return {
      elements: [],
      isValid: false,
      error: 'Fórmula vacía o inválida',
      original,
      normalized,
    };
  }
  
  // Parsear tokens
  const { elements: elementMap, error } = parseTokens(tokens);
  
  if (error) {
    return {
      elements: [],
      isValid: false,
      error,
      original,
      normalized,
    };
  }
  
  // Convertir Map a array ordenado por número atómico
  const elements: ParsedElement[] = Array.from(elementMap.entries())
    .map(([symbol, count]) => ({ symbol, count }))
    .sort((a, b) => {
      const elA = getElement(a.symbol);
      const elB = getElement(b.symbol);
      return (elA?.atomicNumber || 0) - (elB?.atomicNumber || 0);
    });
  
  return {
    elements,
    isValid: true,
    original,
    normalized,
  };
};

/**
 * Formatea una fórmula con subíndices Unicode
 * @param formula - Fórmula como string (ej: "H2O")
 * @returns Fórmula con subíndices (ej: "H₂O")
 */
export const formatFormulaWithSubscripts = (formula: string): string => {
  const subscripts: { [key: string]: string } = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  };
  
  return formula.replace(/\d/g, (digit) => subscripts[digit] || digit);
};

/**
 * Construye una fórmula string desde elementos parseados
 */
export const buildFormulaString = (elements: ParsedElement[]): string => {
  return elements
    .map(({ symbol, count }) => count === 1 ? symbol : `${symbol}${count}`)
    .join('');
};

