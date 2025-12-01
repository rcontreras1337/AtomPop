/**
 * PeriodicTableModal - Modal de Tabla Periódica Interactiva
 * FIX-2.1: Modal con grid de elementos, búsqueda y filtros
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Filter } from 'lucide-react';
import { usePeriodicTable, type Element } from '../../hooks/usePeriodicTable';

// Categorías de elementos con colores y nombres en español
const CATEGORIES = {
  'alkali-metal': { name: 'Metales Alcalinos', color: 'bg-purple-500', textColor: 'text-purple-500' },
  'alkaline-earth': { name: 'Alcalinotérreos', color: 'bg-lime-500', textColor: 'text-lime-500' },
  'transition-metal': { name: 'Metales de Transición', color: 'bg-orange-400', textColor: 'text-orange-400' },
  'post-transition': { name: 'Metales Post-Transición', color: 'bg-teal-400', textColor: 'text-teal-400' },
  'metalloid': { name: 'Metaloides', color: 'bg-cyan-400', textColor: 'text-cyan-400' },
  'nonmetal': { name: 'No Metales', color: 'bg-green-400', textColor: 'text-green-400' },
  'halogen': { name: 'Halógenos', color: 'bg-yellow-400', textColor: 'text-yellow-400' },
  'noble-gas': { name: 'Gases Nobles', color: 'bg-blue-400', textColor: 'text-blue-400' },
  'lanthanide': { name: 'Lantánidos', color: 'bg-pink-400', textColor: 'text-pink-400' },
  'actinide': { name: 'Actínidos', color: 'bg-rose-500', textColor: 'text-rose-500' },
} as const;

type CategoryKey = keyof typeof CATEGORIES;

interface PeriodicTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (symbol: string) => void;
}

// Componente para cada elemento de la tabla
const ElementCell: React.FC<{
  element: Element;
  isSelected: boolean;
  onSelect?: (symbol: string) => void;
  onHover: (element: Element | null) => void;
}> = ({ element, isSelected, onSelect, onHover }) => {
  const category = CATEGORIES[element.category as CategoryKey];
  
  return (
    <motion.button
      onClick={() => onSelect?.(element.symbol)}
      onMouseEnter={() => onHover(element)}
      onMouseLeave={() => onHover(null)}
      className={`
        relative w-12 h-14 sm:w-14 sm:h-16 rounded-lg flex flex-col items-center justify-center
        transition-all duration-200 cursor-pointer
        border-2 hover:scale-110 hover:z-10
        ${isSelected ? 'ring-2 ring-neon-amber ring-offset-2 ring-offset-lab-dark' : ''}
        ${category ? category.color : 'bg-slate-600'}
      `}
      style={{
        backgroundColor: `#${element.cpkHex}`,
        borderColor: `#${element.cpkHex}`,
      }}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-[10px] font-medium text-lab-dark/70 absolute top-0.5 left-1">
        {element.atomicNumber}
      </span>
      <span className="text-lg sm:text-xl font-bold text-lab-dark">
        {element.symbol}
      </span>
      <span className="text-[8px] sm:text-[9px] text-lab-dark/80 truncate max-w-full px-0.5">
        {element.name.slice(0, 6)}
      </span>
    </motion.button>
  );
};

// Panel de detalles del elemento
const ElementDetails: React.FC<{ element: Element | null }> = ({ element }) => {
  if (!element) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500 text-sm">
        Pasa el cursor sobre un elemento para ver sus detalles
      </div>
    );
  }

  const category = CATEGORIES[element.category as CategoryKey];

  return (
    <motion.div
      key={element.symbol}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 items-center"
    >
      <div
        className="w-20 h-24 rounded-xl flex flex-col items-center justify-center shadow-lg"
        style={{ backgroundColor: `#${element.cpkHex}` }}
      >
        <span className="text-xs font-medium text-lab-dark/70">{element.atomicNumber}</span>
        <span className="text-3xl font-bold text-lab-dark">{element.symbol}</span>
        <span className="text-[10px] text-lab-dark/80">{element.atomicMass.toFixed(2)}</span>
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-white">{element.name}</h3>
        <p className="text-slate-400 text-sm">
          Masa atómica: <span className="text-neon-cyan font-mono">{element.atomicMass.toFixed(4)}</span> g/mol
        </p>
        <p className="text-slate-400 text-sm">
          Número atómico: <span className="text-neon-green font-mono">{element.atomicNumber}</span>
        </p>
        {category && (
          <span className={`text-xs ${category.textColor} font-medium`}>
            {category.name}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export const PeriodicTableModal: React.FC<PeriodicTableModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { elements } = usePeriodicTable();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>('all');
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);

  // Filtrar elementos por búsqueda y categoría
  const filteredElements = useMemo(() => {
    return elements.filter((element) => {
      const matchesSearch = 
        searchQuery === '' ||
        element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || 
        element.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [elements, searchQuery, selectedCategory]);

  // Manejar selección de elemento
  const handleSelect = useCallback((symbol: string) => {
    onSelect?.(symbol);
  }, [onSelect]);

  // Cerrar con Escape
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-lab-dark/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-auto rounded-2xl 
                       bg-gradient-to-b from-lab-surface to-lab-base 
                       border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-lab-surface/95 backdrop-blur-sm 
                          border-b border-white/10 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-neon-purple/20">
                    <Filter className="w-5 h-5 text-neon-purple" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    🔬 Tabla Periódica
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-lab-elevated hover:bg-danger/20 
                           text-slate-400 hover:text-danger transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Búsqueda y filtros */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Input de búsqueda */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar elemento..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-lab-dark/50 
                             border border-white/10 text-white placeholder:text-slate-500
                             focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  />
                </div>

                {/* Filtro por categoría */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as CategoryKey | 'all')}
                  className="px-4 py-2.5 rounded-xl bg-lab-dark/50 border border-white/10 
                           text-white focus:outline-none focus:border-neon-cyan/50 
                           transition-colors cursor-pointer"
                >
                  <option value="all">Todas las categorías</option>
                  {Object.entries(CATEGORIES).map(([key, { name }]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>

              {/* Conteo de resultados */}
              <p className="text-slate-500 text-sm mt-3">
                Mostrando <span className="text-neon-cyan font-mono">{filteredElements.length}</span> de{' '}
                <span className="font-mono">{elements.length}</span> elementos
              </p>
            </div>

            {/* Contenido */}
            <div className="p-4 sm:p-6">
              {/* Panel de detalles del elemento */}
              <div className="mb-6 p-4 rounded-xl bg-lab-dark/50 border border-white/5 min-h-[100px]">
                <ElementDetails element={hoveredElement} />
              </div>

              {/* Grid de elementos */}
              {filteredElements.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1.5 sm:gap-2"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredElements.map((element) => (
                      <motion.div
                        key={element.symbol}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ElementCell
                          element={element}
                          isSelected={false}
                          onSelect={handleSelect}
                          onHover={setHoveredElement}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-lg">
                    No se encontraron elementos con "{searchQuery}"
                  </p>
                </div>
              )}

              {/* Leyenda de categorías */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-sm font-medium text-slate-400 mb-3">Leyenda de categorías</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(CATEGORIES).map(([key, { name, color }]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key as CategoryKey)}
                      className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs
                        transition-all hover:scale-105
                        ${selectedCategory === key 
                          ? 'ring-2 ring-white/30 bg-lab-elevated' 
                          : 'bg-lab-dark/30 hover:bg-lab-dark/50'}
                      `}
                    >
                      <span className={`w-3 h-3 rounded ${color}`} />
                      <span className="text-slate-300">{name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instrucciones */}
              {onSelect && (
                <p className="text-center text-slate-500 text-sm mt-6">
                  💡 Haz clic en un elemento para insertarlo en la fórmula
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PeriodicTableModal;

