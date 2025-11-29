import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePeriodicTable } from './usePeriodicTable';

describe('usePeriodicTable', () => {
  
  // ═══════════════════════════════════════════════════════════════
  // TESTS: Inicialización
  // ═══════════════════════════════════════════════════════════════
  
  describe('Inicialización', () => {
    it('debe cargar la tabla periódica', () => {
      const { result } = renderHook(() => usePeriodicTable());
      expect(result.current.elements.length).toBeGreaterThan(0);
    });

    it('debe tener al menos 50 elementos', () => {
      const { result } = renderHook(() => usePeriodicTable());
      expect(result.current.totalElements).toBeGreaterThanOrEqual(50);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: getElement
  // ═══════════════════════════════════════════════════════════════
  
  describe('getElement', () => {
    it('debe encontrar Hidrógeno por símbolo', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const hydrogen = result.current.getElement('H');
      
      expect(hydrogen).toBeDefined();
      expect(hydrogen?.name).toBe('Hidrógeno');
      expect(hydrogen?.atomicNumber).toBe(1);
      expect(hydrogen?.atomicMass).toBeCloseTo(1.008, 2);
    });

    it('debe encontrar Oxígeno por símbolo', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const oxygen = result.current.getElement('O');
      
      expect(oxygen).toBeDefined();
      expect(oxygen?.name).toBe('Oxígeno');
      expect(oxygen?.atomicNumber).toBe(8);
    });

    it('debe encontrar Sodio por símbolo de dos letras', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const sodium = result.current.getElement('Na');
      
      expect(sodium).toBeDefined();
      expect(sodium?.name).toBe('Sodio');
    });

    it('debe ser case-insensitive', () => {
      const { result } = renderHook(() => usePeriodicTable());
      
      const h1 = result.current.getElement('H');
      const h2 = result.current.getElement('h');
      const na1 = result.current.getElement('Na');
      const na2 = result.current.getElement('NA');
      const na3 = result.current.getElement('na');
      
      expect(h1).toEqual(h2);
      expect(na1).toEqual(na2);
      expect(na1).toEqual(na3);
    });

    it('debe retornar undefined para elementos inexistentes', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const unknown = result.current.getElement('Xx');
      
      expect(unknown).toBeUndefined();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: getElementByNumber
  // ═══════════════════════════════════════════════════════════════
  
  describe('getElementByNumber', () => {
    it('debe encontrar Hidrógeno por número atómico 1', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const hydrogen = result.current.getElementByNumber(1);
      
      expect(hydrogen).toBeDefined();
      expect(hydrogen?.symbol).toBe('H');
    });

    it('debe encontrar Carbono por número atómico 6', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const carbon = result.current.getElementByNumber(6);
      
      expect(carbon).toBeDefined();
      expect(carbon?.symbol).toBe('C');
      expect(carbon?.name).toBe('Carbono');
    });

    it('debe encontrar Oro por número atómico 79', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const gold = result.current.getElementByNumber(79);
      
      expect(gold).toBeDefined();
      expect(gold?.symbol).toBe('Au');
      expect(gold?.name).toBe('Oro');
    });

    it('debe retornar undefined para números inválidos', () => {
      const { result } = renderHook(() => usePeriodicTable());
      
      expect(result.current.getElementByNumber(0)).toBeUndefined();
      expect(result.current.getElementByNumber(-1)).toBeUndefined();
      expect(result.current.getElementByNumber(999)).toBeUndefined();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: searchElements
  // ═══════════════════════════════════════════════════════════════
  
  describe('searchElements', () => {
    it('debe buscar por símbolo', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const results = result.current.searchElements('H');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(e => e.symbol === 'H')).toBe(true);
    });

    it('debe buscar por nombre parcial', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const results = result.current.searchElements('car');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(e => e.name.toLowerCase().includes('car'))).toBe(true);
    });

    it('debe ser case-insensitive en búsqueda', () => {
      const { result } = renderHook(() => usePeriodicTable());
      
      const results1 = result.current.searchElements('HIDRO');
      const results2 = result.current.searchElements('hidro');
      
      expect(results1.length).toBe(results2.length);
    });

    it('debe retornar array vacío para búsqueda vacía', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const results = result.current.searchElements('');
      
      expect(results).toEqual([]);
    });

    it('debe retornar array vacío para búsqueda sin coincidencias', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const results = result.current.searchElements('xyz123');
      
      expect(results).toEqual([]);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: isValidElement
  // ═══════════════════════════════════════════════════════════════
  
  describe('isValidElement', () => {
    it('debe validar elementos existentes', () => {
      const { result } = renderHook(() => usePeriodicTable());
      
      expect(result.current.isValidElement('H')).toBe(true);
      expect(result.current.isValidElement('O')).toBe(true);
      expect(result.current.isValidElement('Na')).toBe(true);
      expect(result.current.isValidElement('Fe')).toBe(true);
      expect(result.current.isValidElement('Au')).toBe(true);
    });

    it('debe rechazar elementos inexistentes', () => {
      const { result } = renderHook(() => usePeriodicTable());
      
      expect(result.current.isValidElement('Xx')).toBe(false);
      expect(result.current.isValidElement('Zy')).toBe(false);
      expect(result.current.isValidElement('123')).toBe(false);
    });

    it('debe ser case-insensitive', () => {
      const { result } = renderHook(() => usePeriodicTable());
      
      expect(result.current.isValidElement('h')).toBe(true);
      expect(result.current.isValidElement('NA')).toBe(true);
      expect(result.current.isValidElement('fe')).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // TESTS: Datos de elementos
  // ═══════════════════════════════════════════════════════════════
  
  describe('Datos de elementos', () => {
    it('cada elemento debe tener todas las propiedades requeridas', () => {
      const { result } = renderHook(() => usePeriodicTable());
      
      result.current.elements.forEach(element => {
        expect(element.atomicNumber).toBeGreaterThan(0);
        expect(element.symbol).toBeTruthy();
        expect(element.name).toBeTruthy();
        expect(element.atomicMass).toBeGreaterThan(0);
        expect(element.cpkHex).toBeTruthy();
      });
    });

    it('los colores CPK deben ser hexadecimales válidos', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const hexRegex = /^[0-9a-fA-F]{6}$/;
      
      result.current.elements.forEach(element => {
        expect(element.cpkHex).toMatch(hexRegex);
      });
    });

    it('debe tener elementos comunes de química educativa', () => {
      const { result } = renderHook(() => usePeriodicTable());
      const commonElements = ['H', 'C', 'N', 'O', 'Na', 'Cl', 'Ca', 'Fe', 'Cu', 'Zn', 'Ag', 'Au'];
      
      commonElements.forEach(symbol => {
        expect(result.current.isValidElement(symbol)).toBe(true);
      });
    });
  });
});

