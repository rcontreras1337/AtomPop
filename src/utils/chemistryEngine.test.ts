import { describe, it, expect } from 'vitest';
import {
  calculateMolarMass,
  molesToGrams,
  gramsToMoles,
  molesToParticles,
  particlesToMoles,
  convertUnits,
  calculateComposition,
  calculateEmpiricalFormula,
  calculateMolecularFormula,
  formatScientific,
  AVOGADRO,
} from './chemistryEngine';

describe('chemistryEngine', () => {
  
  // ═══════════════════════════════════════════════════════════════
  // TESTS: calculateMolarMass
  // ═══════════════════════════════════════════════════════════════
  
  describe('calculateMolarMass', () => {
    it('debe calcular masa molar de H2O = 18.015 g/mol', () => {
      const result = calculateMolarMass('H2O');
      expect(result.isValid).toBe(true);
      expect(result.totalMass).toBeCloseTo(18.015, 2);
    });

    it('debe calcular masa molar de NaCl = 58.44 g/mol', () => {
      const result = calculateMolarMass('NaCl');
      expect(result.isValid).toBe(true);
      expect(result.totalMass).toBeCloseTo(58.44, 1);
    });

    it('debe calcular masa molar de CO2 = 44.01 g/mol', () => {
      const result = calculateMolarMass('CO2');
      expect(result.isValid).toBe(true);
      expect(result.totalMass).toBeCloseTo(44.01, 1);
    });

    it('debe calcular masa molar de glucosa C6H12O6 = 180.156 g/mol', () => {
      const result = calculateMolarMass('C6H12O6');
      expect(result.isValid).toBe(true);
      expect(result.totalMass).toBeCloseTo(180.156, 1);
    });

    it('debe calcular masa molar de H2SO4 = 98.079 g/mol', () => {
      const result = calculateMolarMass('H2SO4');
      expect(result.isValid).toBe(true);
      expect(result.totalMass).toBeCloseTo(98.079, 1);
    });

    it('debe calcular masa molar de Ca(OH)2 = 74.093 g/mol', () => {
      const result = calculateMolarMass('Ca(OH)2');
      expect(result.isValid).toBe(true);
      expect(result.totalMass).toBeCloseTo(74.093, 1);
    });

    it('debe calcular masa molar de Al2(SO4)3 = 342.15 g/mol', () => {
      const result = calculateMolarMass('Al2(SO4)3');
      expect(result.isValid).toBe(true);
      expect(result.totalMass).toBeCloseTo(342.15, 0);
    });

    it('debe retornar desglose correcto', () => {
      const result = calculateMolarMass('H2O');
      expect(result.breakdown).toHaveLength(2);
      
      const hydrogen = result.breakdown.find(b => b.symbol === 'H');
      const oxygen = result.breakdown.find(b => b.symbol === 'O');
      
      expect(hydrogen?.count).toBe(2);
      expect(hydrogen?.subtotal).toBeCloseTo(2.016, 2);
      expect(oxygen?.count).toBe(1);
      expect(oxygen?.subtotal).toBeCloseTo(15.999, 2);
    });

    it('debe manejar fórmulas inválidas', () => {
      const result = calculateMolarMass('XYZ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: Conversiones básicas
  // ═══════════════════════════════════════════════════════════════
  
  describe('Conversiones básicas', () => {
    const molarMassWater = 18.015;

    it('molesToGrams debe convertir correctamente', () => {
      expect(molesToGrams(1, molarMassWater)).toBeCloseTo(18.015, 2);
      expect(molesToGrams(2, molarMassWater)).toBeCloseTo(36.03, 1);
      expect(molesToGrams(0.5, molarMassWater)).toBeCloseTo(9.0075, 2);
    });

    it('gramsToMoles debe convertir correctamente', () => {
      expect(gramsToMoles(18.015, molarMassWater)).toBeCloseTo(1, 3);
      expect(gramsToMoles(36.03, molarMassWater)).toBeCloseTo(2, 2);
      expect(gramsToMoles(9, molarMassWater)).toBeCloseTo(0.4996, 2);
    });

    it('molesToParticles debe usar Avogadro correctamente', () => {
      const particles = molesToParticles(1);
      expect(particles).toBeCloseTo(AVOGADRO, -18); // Tolerancia grande para números tan grandes
    });

    it('particlesToMoles debe ser inversa de molesToParticles', () => {
      const moles = particlesToMoles(AVOGADRO);
      expect(moles).toBeCloseTo(1, 5);
    });

    it('las conversiones deben ser inversas', () => {
      const originalMoles = 2.5;
      const grams = molesToGrams(originalMoles, molarMassWater);
      const backToMoles = gramsToMoles(grams, molarMassWater);
      expect(backToMoles).toBeCloseTo(originalMoles, 4);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: convertUnits
  // ═══════════════════════════════════════════════════════════════
  
  describe('convertUnits', () => {
    it('debe convertir desde moles correctamente', () => {
      const result = convertUnits('H2O', 1, 'moles');
      expect(result.isValid).toBe(true);
      expect(result.moles).toBe(1);
      expect(result.grams).toBeCloseTo(18.015, 2);
      expect(result.particles).toBeCloseTo(AVOGADRO, -18);
    });

    it('debe convertir desde gramos correctamente', () => {
      const result = convertUnits('H2O', 18.015, 'grams');
      expect(result.isValid).toBe(true);
      expect(result.grams).toBeCloseTo(18.015, 2);
      expect(result.moles).toBeCloseTo(1, 3);
    });

    it('debe convertir desde partículas correctamente', () => {
      const result = convertUnits('H2O', AVOGADRO, 'particles');
      expect(result.isValid).toBe(true);
      expect(result.moles).toBeCloseTo(1, 5);
      expect(result.grams).toBeCloseTo(18.015, 2);
    });

    it('debe incluir la masa molar en el resultado', () => {
      const result = convertUnits('NaCl', 1, 'moles');
      expect(result.molarMass).toBeCloseTo(58.44, 1);
    });

    it('debe manejar fórmulas inválidas', () => {
      const result = convertUnits('XYZ', 1, 'moles');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: calculateComposition
  // ═══════════════════════════════════════════════════════════════
  
  describe('calculateComposition', () => {
    it('debe calcular composición de H2O correctamente', () => {
      const result = calculateComposition('H2O');
      expect(result.isValid).toBe(true);
      
      const hydrogen = result.elements.find(e => e.symbol === 'H');
      const oxygen = result.elements.find(e => e.symbol === 'O');
      
      expect(hydrogen?.percentage).toBeCloseTo(11.19, 0);
      expect(oxygen?.percentage).toBeCloseTo(88.81, 0);
    });

    it('debe calcular composición de H2SO4 correctamente', () => {
      const result = calculateComposition('H2SO4');
      expect(result.isValid).toBe(true);
      
      const hydrogen = result.elements.find(e => e.symbol === 'H');
      const sulfur = result.elements.find(e => e.symbol === 'S');
      const oxygen = result.elements.find(e => e.symbol === 'O');
      
      expect(hydrogen?.percentage).toBeCloseTo(2.06, 0);
      expect(sulfur?.percentage).toBeCloseTo(32.69, 0);
      expect(oxygen?.percentage).toBeCloseTo(65.25, 0);
    });

    it('los porcentajes deben sumar ~100%', () => {
      const result = calculateComposition('C6H12O6');
      const totalPercentage = result.elements.reduce((sum, e) => sum + e.percentage, 0);
      expect(totalPercentage).toBeCloseTo(100, 0);
    });

    it('debe estar ordenado por porcentaje descendente', () => {
      const result = calculateComposition('H2O');
      expect(result.elements[0].percentage).toBeGreaterThan(result.elements[1].percentage);
    });

    it('debe incluir colores CPK', () => {
      const result = calculateComposition('H2O');
      result.elements.forEach(e => {
        expect(e.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: calculateEmpiricalFormula
  // ═══════════════════════════════════════════════════════════════
  
  describe('calculateEmpiricalFormula', () => {
    it('debe calcular CH2O desde porcentajes de glucosa', () => {
      // Glucosa C6H12O6: C=40%, H=6.7%, O=53.3%
      const result = calculateEmpiricalFormula([
        { symbol: 'C', percentage: 40 },
        { symbol: 'H', percentage: 6.7 },
        { symbol: 'O', percentage: 53.3 },
      ]);
      
      expect(result.isValid).toBe(true);
      expect(result.formula).toBe('CH2O');
    });

    it('debe incluir pasos del cálculo', () => {
      const result = calculateEmpiricalFormula([
        { symbol: 'C', percentage: 40 },
        { symbol: 'H', percentage: 6.7 },
        { symbol: 'O', percentage: 53.3 },
      ]);
      
      expect(result.steps.length).toBeGreaterThan(0);
      expect(result.steps[0].step).toBe(1);
    });

    it('debe validar que los porcentajes sumen ~100%', () => {
      const result = calculateEmpiricalFormula([
        { symbol: 'C', percentage: 20 },
        { symbol: 'H', percentage: 10 },
      ]);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('suman');
    });

    it('debe requerir al menos 2 elementos', () => {
      const result = calculateEmpiricalFormula([
        { symbol: 'C', percentage: 100 },
      ]);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('2 elementos');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: calculateMolecularFormula
  // ═══════════════════════════════════════════════════════════════
  
  describe('calculateMolecularFormula', () => {
    it('debe calcular fórmula molecular desde CH2O con masa 180', () => {
      const result = calculateMolecularFormula('CH2O', 180);
      
      expect(result.isValid).toBe(true);
      // La fórmula contiene los elementos correctos con las cantidades correctas
      expect(result.molecularFormula).toContain('C6');
      expect(result.molecularFormula).toContain('H12');
      expect(result.molecularFormula).toContain('O6');
      expect(result.multiplier).toBe(6);
    });

    it('debe incluir la masa de la fórmula empírica', () => {
      const result = calculateMolecularFormula('CH2O', 180);
      expect(result.empiricalMass).toBeCloseTo(30.026, 1);
    });

    it('debe manejar fórmulas empíricas inválidas', () => {
      const result = calculateMolecularFormula('XYZ', 100);
      expect(result.isValid).toBe(false);
    });

    it('debe advertir si el multiplicador no es entero', () => {
      const result = calculateMolecularFormula('CH2O', 100);
      // 100 / 30.026 ≈ 3.33 (no es entero)
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('multiplicador');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: formatScientific
  // ═══════════════════════════════════════════════════════════════
  
  describe('formatScientific', () => {
    it('debe formatear números normales sin notación científica', () => {
      expect(formatScientific(1500)).toContain('1');
      expect(formatScientific(0.5)).toBe('0,5');
    });

    it('debe usar notación científica para números muy grandes', () => {
      const result = formatScientific(AVOGADRO);
      expect(result).toContain('×');
      expect(result).toContain('10');
    });

    it('debe usar notación científica para números muy pequeños', () => {
      const result = formatScientific(0.0000001);
      expect(result).toContain('×');
      expect(result).toContain('10');
    });

    it('debe manejar cero', () => {
      expect(formatScientific(0)).toBe('0');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: Constante de Avogadro
  // ═══════════════════════════════════════════════════════════════
  
  describe('Constante de Avogadro', () => {
    it('debe tener el valor correcto', () => {
      expect(AVOGADRO).toBeCloseTo(6.02214076e23, 15);
    });
  });
});

