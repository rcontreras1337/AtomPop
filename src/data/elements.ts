// Tipos para los elementos de la tabla periódica
export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  cpkHex: string;
  category: string;
}

// Importar datos JSON
import periodicTableData from './periodic-table.json';

// Exportar como array tipado
export const elements: Element[] = periodicTableData as Element[];

// Crear un mapa para búsqueda rápida por símbolo
export const elementsBySymbol: Map<string, Element> = new Map(
  elements.map(el => [el.symbol.toUpperCase(), el])
);

// Crear un mapa para búsqueda por número atómico
export const elementsByNumber: Map<number, Element> = new Map(
  elements.map(el => [el.atomicNumber, el])
);

// Función helper para obtener un elemento por símbolo
export const getElement = (symbol: string): Element | undefined => {
  return elementsBySymbol.get(symbol.toUpperCase());
};

// Función helper para verificar si un símbolo existe
export const isValidElement = (symbol: string): boolean => {
  return elementsBySymbol.has(symbol.toUpperCase());
};

// Número de Avogadro
export const AVOGADRO = 6.02214076e23;

