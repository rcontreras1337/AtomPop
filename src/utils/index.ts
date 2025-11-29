// Exportación centralizada de utilidades

// Parser de fórmulas
export {
  parseFormula,
  normalizeFormula,
  formatFormulaWithSubscripts,
  buildFormulaString,
  type ParsedFormula,
  type ParsedElement,
} from './formulaParser';

// Motor de cálculo químico
export {
  calculateMolarMass,
  calculateComposition,
  calculateEmpiricalFormula,
  calculateMolecularFormula,
  convertUnits,
  molesToGrams,
  gramsToMoles,
  molesToParticles,
  particlesToMoles,
  formatScientific,
  AVOGADRO,
  type MolarMassResult,
  type ElementBreakdown,
  type ConversionResult,
  type CompositionResult,
  type CompositionElement,
  type EmpiricalInput,
  type EmpiricalResult,
  type EmpiricalStep,
  type MolecularResult,
} from './chemistryEngine';

