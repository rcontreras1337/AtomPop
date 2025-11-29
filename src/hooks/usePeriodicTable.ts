/**
 * Hook usePeriodicTable
 * Proporciona acceso a los datos de la tabla periódica
 */

import { useMemo } from 'react';
import { 
  elements, 
  elementsBySymbol, 
  elementsByNumber,
  getElement,
  isValidElement,
  type Element 
} from '../data/elements';

export interface UsePeriodicTableReturn {
  /** Lista completa de elementos */
  elements: Element[];
  
  /** Obtiene un elemento por su símbolo */
  getElement: (symbol: string) => Element | undefined;
  
  /** Obtiene un elemento por su número atómico */
  getElementByNumber: (atomicNumber: number) => Element | undefined;
  
  /** Busca elementos por nombre o símbolo */
  searchElements: (query: string) => Element[];
  
  /** Verifica si un símbolo es válido */
  isValidElement: (symbol: string) => boolean;
  
  /** Total de elementos en la tabla */
  totalElements: number;
}

/**
 * Hook para acceder a la tabla periódica
 * 
 * @example
 * const { getElement, searchElements } = usePeriodicTable();
 * 
 * const hydrogen = getElement('H');
 * // { symbol: 'H', name: 'Hidrógeno', atomicMass: 1.008, ... }
 * 
 * const results = searchElements('car');
 * // [{ symbol: 'C', name: 'Carbono', ... }]
 */
export const usePeriodicTable = (): UsePeriodicTableReturn => {
  
  const getElementByNumber = (atomicNumber: number): Element | undefined => {
    return elementsByNumber.get(atomicNumber);
  };
  
  const searchElements = useMemo(() => {
    return (query: string): Element[] => {
      if (!query || query.trim() === '') {
        return [];
      }
      
      const normalizedQuery = query.toLowerCase().trim();
      
      return elements.filter(element => 
        element.symbol.toLowerCase().includes(normalizedQuery) ||
        element.name.toLowerCase().includes(normalizedQuery)
      );
    };
  }, []);
  
  return {
    elements,
    getElement,
    getElementByNumber,
    searchElements,
    isValidElement,
    totalElements: elements.length,
  };
};

export default usePeriodicTable;

// Re-exportar tipos para conveniencia
export type { Element };

