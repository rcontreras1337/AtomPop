/**
 * Base de datos de compuestos químicos conocidos
 * Mapea fórmulas a nombres comunes para contexto educativo
 */

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

export interface Compound {
  formulas: string[];  // Diferentes formas de escribir la misma fórmula
  name: string;        // Nombre común
  iupac?: string;      // Nombre IUPAC (opcional)
  category?: string;   // Categoría (orgánico, inorgánico, etc.)
  description?: string; // Descripción breve educativa
}

// ═══════════════════════════════════════════════════════════════
// BASE DE DATOS DE COMPUESTOS
// ═══════════════════════════════════════════════════════════════

export const KNOWN_COMPOUNDS: Compound[] = [
  // ─────────────────────────────────────────────────────────────
  // AGUA Y COMPUESTOS SIMPLES
  // ─────────────────────────────────────────────────────────────
  { 
    formulas: ['H2O'], 
    name: 'Agua',
    category: 'Inorgánico',
    description: 'El líquido esencial para la vida'
  },
  { 
    formulas: ['CO2'], 
    name: 'Dióxido de Carbono',
    category: 'Óxido',
    description: 'Gas de la respiración y efecto invernadero'
  },
  { 
    formulas: ['CO'], 
    name: 'Monóxido de Carbono',
    category: 'Óxido',
    description: 'Gas tóxico incoloro e inodoro'
  },
  { 
    formulas: ['O2'], 
    name: 'Oxígeno',
    category: 'Elemento',
    description: 'Gas esencial para la respiración'
  },
  { 
    formulas: ['N2'], 
    name: 'Nitrógeno',
    category: 'Elemento',
    description: 'Principal componente del aire (78%)'
  },
  { 
    formulas: ['H2'], 
    name: 'Hidrógeno',
    category: 'Elemento',
    description: 'El elemento más ligero del universo'
  },

  // ─────────────────────────────────────────────────────────────
  // SALES COMUNES
  // ─────────────────────────────────────────────────────────────
  { 
    formulas: ['NaCl'], 
    name: 'Sal de Mesa', 
    iupac: 'Cloruro de Sodio',
    category: 'Sal',
    description: 'Condimento y conservante universal'
  },
  { 
    formulas: ['CaCO3'], 
    name: 'Carbonato de Calcio',
    category: 'Sal',
    description: 'Componente de piedra caliza y conchas'
  },
  { 
    formulas: ['NaHCO3'], 
    name: 'Bicarbonato de Sodio',
    category: 'Sal',
    description: 'Usado en cocina y como antiácido'
  },
  { 
    formulas: ['Na2CO3'], 
    name: 'Carbonato de Sodio',
    iupac: 'Carbonato de Sodio',
    category: 'Sal',
    description: 'Soda de lavado, usado en limpieza'
  },
  { 
    formulas: ['KCl'], 
    name: 'Cloruro de Potasio',
    category: 'Sal',
    description: 'Sustituto de sal y fertilizante'
  },

  // ─────────────────────────────────────────────────────────────
  // ALDEHÍDOS Y FORMALDEHÍDO
  // ─────────────────────────────────────────────────────────────
  { 
    formulas: ['CH2O', 'H2CO', 'HCHO'], 
    name: 'Formaldehído', 
    iupac: 'Metanal',
    category: 'Aldehído',
    description: 'Conservante y desinfectante'
  },
  { 
    formulas: ['C2H4O', 'CH3CHO'], 
    name: 'Acetaldehído', 
    iupac: 'Etanal',
    category: 'Aldehído',
    description: 'Producto del metabolismo del alcohol'
  },

  // ─────────────────────────────────────────────────────────────
  // AZÚCARES
  // ─────────────────────────────────────────────────────────────
  { 
    formulas: ['C6H12O6'], 
    name: 'Glucosa', 
    category: 'Azúcar',
    description: 'Fuente principal de energía celular'
  },
  { 
    formulas: ['C12H22O11'], 
    name: 'Sacarosa', 
    category: 'Azúcar',
    description: 'Azúcar de mesa común'
  },
  { 
    formulas: ['C6H12O6'], 
    name: 'Fructosa', 
    category: 'Azúcar',
    description: 'Azúcar de las frutas (isómero de glucosa)'
  },

  // ─────────────────────────────────────────────────────────────
  // ÁCIDOS
  // ─────────────────────────────────────────────────────────────
  { 
    formulas: ['H2SO4'], 
    name: 'Ácido Sulfúrico',
    category: 'Ácido Fuerte',
    description: 'Uno de los ácidos más usados industrialmente'
  },
  { 
    formulas: ['HCl'], 
    name: 'Ácido Clorhídrico',
    category: 'Ácido Fuerte',
    description: 'Presente en el jugo gástrico'
  },
  { 
    formulas: ['HNO3'], 
    name: 'Ácido Nítrico',
    category: 'Ácido Fuerte',
    description: 'Usado en fertilizantes y explosivos'
  },
  { 
    formulas: ['H3PO4'], 
    name: 'Ácido Fosfórico',
    category: 'Ácido',
    description: 'Usado en refrescos y fertilizantes'
  },
  { 
    formulas: ['CH3COOH', 'C2H4O2', 'C2H4O2'], 
    name: 'Ácido Acético', 
    iupac: 'Ácido Etanoico',
    category: 'Ácido Orgánico',
    description: 'Componente principal del vinagre'
  },
  { 
    formulas: ['H2CO3'], 
    name: 'Ácido Carbónico',
    category: 'Ácido Débil',
    description: 'Se forma al disolver CO₂ en agua'
  },

  // ─────────────────────────────────────────────────────────────
  // BASES / HIDRÓXIDOS
  // ─────────────────────────────────────────────────────────────
  { 
    formulas: ['NaOH'], 
    name: 'Hidróxido de Sodio',
    iupac: 'Hidróxido de Sodio',
    category: 'Base Fuerte',
    description: 'Soda cáustica, usado en jabones'
  },
  { 
    formulas: ['Ca(OH)2', 'CaO2H2', 'CaH2O2'], 
    name: 'Hidróxido de Calcio',
    iupac: 'Hidróxido de Calcio',
    category: 'Base',
    description: 'Cal apagada, usado en construcción'
  },
  { 
    formulas: ['KOH'], 
    name: 'Hidróxido de Potasio',
    category: 'Base Fuerte',
    description: 'Potasa cáustica'
  },
  { 
    formulas: ['NH3'], 
    name: 'Amoníaco',
    category: 'Base',
    description: 'Gas con olor fuerte, usado en limpieza'
  },
  { 
    formulas: ['NH4OH'], 
    name: 'Hidróxido de Amonio',
    category: 'Base Débil',
    description: 'Amoníaco en solución acuosa'
  },

  // ─────────────────────────────────────────────────────────────
  // ALCOHOLES
  // ─────────────────────────────────────────────────────────────
  { 
    formulas: ['CH3OH', 'CH4O'], 
    name: 'Metanol', 
    iupac: 'Metanol',
    category: 'Alcohol',
    description: 'Alcohol de madera, tóxico'
  },
  { 
    formulas: ['C2H5OH', 'C2H6O', 'CH3CH2OH'], 
    name: 'Etanol', 
    iupac: 'Etanol',
    category: 'Alcohol',
    description: 'Alcohol de bebidas y combustible'
  },
  { 
    formulas: ['C3H7OH', 'C3H8O'], 
    name: 'Propanol', 
    iupac: 'Propan-1-ol',
    category: 'Alcohol',
    description: 'Solvente industrial'
  },

  // ─────────────────────────────────────────────────────────────
  // ÓXIDOS METÁLICOS
  // ─────────────────────────────────────────────────────────────
  { 
    formulas: ['Fe2O3'], 
    name: 'Óxido de Hierro III',
    category: 'Óxido',
    description: 'Herrumbre, óxido rojo'
  },
  { 
    formulas: ['FeO'], 
    name: 'Óxido de Hierro II',
    category: 'Óxido',
    description: 'Óxido ferroso'
  },
  { 
    formulas: ['CaO'], 
    name: 'Óxido de Calcio',
    category: 'Óxido',
    description: 'Cal viva'
  },
  { 
    formulas: ['MgO'], 
    name: 'Óxido de Magnesio',
    category: 'Óxido',
    description: 'Magnesia, antiácido'
  },
  { 
    formulas: ['Al2O3'], 
    name: 'Óxido de Aluminio',
    category: 'Óxido',
    description: 'Alúmina, material abrasivo'
  },

  // ─────────────────────────────────────────────────────────────
  // HIDROCARBUROS SIMPLES
  // ─────────────────────────────────────────────────────────────
  { 
    formulas: ['CH4'], 
    name: 'Metano',
    category: 'Hidrocarburo',
    description: 'Principal componente del gas natural'
  },
  { 
    formulas: ['C2H6'], 
    name: 'Etano',
    category: 'Hidrocarburo',
    description: 'Gas combustible'
  },
  { 
    formulas: ['C3H8'], 
    name: 'Propano',
    category: 'Hidrocarburo',
    description: 'Gas LP para cocinas y calefacción'
  },
  { 
    formulas: ['C4H10'], 
    name: 'Butano',
    category: 'Hidrocarburo',
    description: 'Gas de encendedores'
  },
  { 
    formulas: ['C6H6'], 
    name: 'Benceno',
    category: 'Hidrocarburo Aromático',
    description: 'Solvente, base de muchos compuestos'
  },

  // ─────────────────────────────────────────────────────────────
  // OTROS COMPUESTOS EDUCATIVOS
  // ─────────────────────────────────────────────────────────────
  { 
    formulas: ['H2O2'], 
    name: 'Peróxido de Hidrógeno',
    category: 'Peróxido',
    description: 'Agua oxigenada, desinfectante'
  },
  { 
    formulas: ['SO2'], 
    name: 'Dióxido de Azufre',
    category: 'Óxido',
    description: 'Contaminante, preservante de alimentos'
  },
  { 
    formulas: ['SO3'], 
    name: 'Trióxido de Azufre',
    category: 'Óxido',
    description: 'Precursor del ácido sulfúrico'
  },
  { 
    formulas: ['NO2'], 
    name: 'Dióxido de Nitrógeno',
    category: 'Óxido',
    description: 'Gas contaminante marrón-rojizo'
  },
  { 
    formulas: ['N2O'], 
    name: 'Óxido Nitroso',
    category: 'Óxido',
    description: 'Gas de la risa, anestésico'
  },
];

// ═══════════════════════════════════════════════════════════════
// FUNCIONES DE BÚSQUEDA
// ═══════════════════════════════════════════════════════════════

/**
 * Normaliza una fórmula para comparación
 * - Quita espacios
 * - Convierte a mayúsculas/minúsculas apropiadas
 */
function normalizeFormula(formula: string): string {
  return formula.replace(/\s/g, '');
}

/**
 * Busca el nombre de un compuesto por su fórmula
 * @param formula - Fórmula química (ej: "H2O", "CH2O")
 * @returns Nombre del compuesto o null si no se encuentra
 */
export function getCompoundName(formula: string): string | null {
  const normalized = normalizeFormula(formula);
  
  const compound = KNOWN_COMPOUNDS.find(c => 
    c.formulas.some(f => normalizeFormula(f) === normalized)
  );
  
  return compound?.name ?? null;
}

/**
 * Busca información completa de un compuesto
 * @param formula - Fórmula química
 * @returns Información completa del compuesto o null
 */
export function getCompoundInfo(formula: string): Compound | null {
  const normalized = normalizeFormula(formula);
  
  return KNOWN_COMPOUNDS.find(c => 
    c.formulas.some(f => normalizeFormula(f) === normalized)
  ) ?? null;
}

/**
 * Verifica si dos fórmulas representan el mismo compuesto
 * @param formula1 - Primera fórmula
 * @param formula2 - Segunda fórmula
 * @returns true si son equivalentes
 */
export function areFormulasEquivalent(formula1: string, formula2: string): boolean {
  const info1 = getCompoundInfo(formula1);
  const info2 = getCompoundInfo(formula2);
  
  // Si ambas están en la base de datos y son el mismo compuesto
  if (info1 && info2 && info1.name === info2.name) {
    return true;
  }
  
  // Si las fórmulas son idénticas (después de normalizar)
  if (normalizeFormula(formula1) === normalizeFormula(formula2)) {
    return true;
  }
  
  return false;
}

/**
 * Busca todas las formas alternativas de escribir una fórmula
 * @param formula - Fórmula química
 * @returns Array de fórmulas alternativas o array vacío
 */
export function getAlternativeFormulas(formula: string): string[] {
  const info = getCompoundInfo(formula);
  if (!info) return [];
  
  const normalized = normalizeFormula(formula);
  return info.formulas.filter(f => normalizeFormula(f) !== normalized);
}

