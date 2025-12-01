/**
 * PeriodicTablePage - Página de Tabla Periódica Interactiva
 * FIX-2.2: Vista completa de la tabla periódica con información educativa
 */

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Grid, Info, Atom, Beaker } from 'lucide-react';
import { usePeriodicTable, type Element } from '../hooks/usePeriodicTable';
import { Button } from '../components';

// Categorías de elementos con colores y nombres en español
const CATEGORIES = {
  'alkali-metal': { name: 'Metales Alcalinos', color: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-400' },
  'alkaline-earth': { name: 'Alcalinotérreos', color: 'bg-lime-500', border: 'border-lime-500', text: 'text-lime-400' },
  'transition-metal': { name: 'Metales de Transición', color: 'bg-orange-400', border: 'border-orange-400', text: 'text-orange-400' },
  'post-transition': { name: 'Metales Post-Transición', color: 'bg-teal-400', border: 'border-teal-400', text: 'text-teal-400' },
  'metalloid': { name: 'Metaloides', color: 'bg-cyan-400', border: 'border-cyan-400', text: 'text-cyan-400' },
  'nonmetal': { name: 'No Metales', color: 'bg-green-400', border: 'border-green-400', text: 'text-green-400' },
  'halogen': { name: 'Halógenos', color: 'bg-yellow-400', border: 'border-yellow-400', text: 'text-yellow-400' },
  'noble-gas': { name: 'Gases Nobles', color: 'bg-blue-400', border: 'border-blue-400', text: 'text-blue-400' },
  'lanthanide': { name: 'Lantánidos', color: 'bg-pink-400', border: 'border-pink-400', text: 'text-pink-400' },
  'actinide': { name: 'Actínidos', color: 'bg-rose-500', border: 'border-rose-500', text: 'text-rose-400' },
} as const;

type CategoryKey = keyof typeof CATEGORIES;

// Componente para cada elemento de la tabla
const ElementCard: React.FC<{
  element: Element;
  isSelected: boolean;
  onClick: () => void;
  viewMode: 'grid' | 'list';
}> = ({ element, isSelected, onClick, viewMode }) => {
  const category = CATEGORIES[element.category as CategoryKey];

  if (viewMode === 'list') {
    return (
      <motion.button
        onClick={onClick}
        className={`
          w-full flex items-center gap-4 p-3 rounded-xl
          transition-all duration-200 text-left
          bg-lab-surface/50 hover:bg-lab-elevated border border-white/5
          ${isSelected ? 'ring-2 ring-neon-amber border-neon-amber/30' : 'hover:border-white/10'}
        `}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div
          className="w-12 h-14 rounded-lg flex flex-col items-center justify-center shrink-0"
          style={{ backgroundColor: `#${element.cpkHex}` }}
        >
          <span className="text-[10px] text-lab-dark/70">{element.atomicNumber}</span>
          <span className="text-lg font-bold text-lab-dark">{element.symbol}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{element.name}</h3>
          <p className="text-sm text-slate-400">
            Masa: <span className="font-mono text-neon-cyan">{element.atomicMass.toFixed(4)}</span> g/mol
          </p>
        </div>
        {category && (
          <span className={`px-2 py-1 rounded-md text-xs ${category.text} bg-lab-dark/50 hidden sm:block`}>
            {category.name}
          </span>
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full aspect-square rounded-xl flex flex-col items-center justify-center
        transition-all duration-200 cursor-pointer p-1
        border-2 hover:z-10
        ${isSelected ? 'ring-2 ring-neon-amber ring-offset-2 ring-offset-lab-dark' : ''}
      `}
      style={{
        backgroundColor: `#${element.cpkHex}`,
        borderColor: `#${element.cpkHex}`,
      }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-[9px] sm:text-[10px] font-medium text-lab-dark/70 absolute top-1 left-1.5">
        {element.atomicNumber}
      </span>
      <span className="text-xl sm:text-2xl font-bold text-lab-dark">
        {element.symbol}
      </span>
      <span className="text-[8px] sm:text-[10px] text-lab-dark/80 truncate max-w-full px-1">
        {element.name.length > 8 ? element.name.slice(0, 7) + '.' : element.name}
      </span>
      <span className="text-[7px] sm:text-[8px] text-lab-dark/60">
        {element.atomicMass.toFixed(2)}
      </span>
    </motion.button>
  );
};

// Panel de información detallada del elemento
const ElementInfoPanel: React.FC<{ element: Element | null }> = ({ element }) => {
  if (!element) {
    return (
      <div className="card-glass-cyan p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
        <Atom className="w-12 h-12 text-neon-cyan/30 mb-4" />
        <p className="text-slate-500">
          Selecciona un elemento para ver información detallada
        </p>
      </div>
    );
  }

  const category = CATEGORIES[element.category as CategoryKey];

  return (
    <motion.div
      key={element.symbol}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glass-cyan p-6"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Tarjeta del elemento grande */}
        <div
          className="w-32 h-40 rounded-2xl flex flex-col items-center justify-center shadow-xl shrink-0 mx-auto sm:mx-0"
          style={{ backgroundColor: `#${element.cpkHex}` }}
        >
          <span className="text-sm font-medium text-lab-dark/70">{element.atomicNumber}</span>
          <span className="text-5xl font-bold text-lab-dark">{element.symbol}</span>
          <span className="text-sm text-lab-dark/80">{element.atomicMass.toFixed(3)}</span>
        </div>

        {/* Información */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">{element.name}</h2>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-lab-dark/30 rounded-xl p-3">
              <p className="text-slate-500 text-xs uppercase tracking-wider">Símbolo</p>
              <p className="text-2xl font-bold text-neon-cyan font-mono">{element.symbol}</p>
            </div>
            <div className="bg-lab-dark/30 rounded-xl p-3">
              <p className="text-slate-500 text-xs uppercase tracking-wider">Número Atómico</p>
              <p className="text-2xl font-bold text-neon-green font-mono">{element.atomicNumber}</p>
            </div>
            <div className="bg-lab-dark/30 rounded-xl p-3 col-span-2">
              <p className="text-slate-500 text-xs uppercase tracking-wider">Masa Atómica</p>
              <p className="text-2xl font-bold text-neon-amber font-mono">
                {element.atomicMass.toFixed(6)} <span className="text-sm text-slate-400">g/mol</span>
              </p>
            </div>
          </div>

          {category && (
            <div className="mt-4 flex items-center gap-2">
              <span className={`w-4 h-4 rounded ${category.color}`} />
              <span className={`${category.text} font-medium`}>{category.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-neon-purple" />
          <h4 className="text-sm font-medium text-slate-300">Información Educativa</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-lab-dark/20 rounded-lg p-3">
            <span className="text-slate-500">Color CPK:</span>
            <span 
              className="ml-2 inline-block w-4 h-4 rounded align-middle" 
              style={{ backgroundColor: `#${element.cpkHex}` }}
            />
            <span className="ml-1 font-mono text-slate-300">#{element.cpkHex}</span>
          </div>
          <div className="bg-lab-dark/20 rounded-lg p-3">
            <span className="text-slate-500">Categoría:</span>
            <span className="ml-2 text-white">{category?.name || element.category}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const PeriodicTablePage = () => {
  const { elements, totalElements } = usePeriodicTable();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>('all');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtrar elementos
  const filteredElements = useMemo(() => {
    return elements.filter((element) => {
      const matchesSearch = 
        searchQuery === '' ||
        element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.atomicNumber.toString().includes(searchQuery);
      
      const matchesCategory = 
        selectedCategory === 'all' || 
        element.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [elements, searchQuery, selectedCategory]);

  const handleElementClick = useCallback((element: Element) => {
    setSelectedElement(element);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          <span>Volver al inicio</span>
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-neon-purple/20 text-neon-purple">
              <Grid className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                <span className="text-gradient-ocean">Tabla Periódica</span>
              </h1>
              <p className="text-slate-400 mt-1">
                {totalElements} elementos disponibles
              </p>
            </div>
          </div>
          
          {/* Acciones rápidas */}
          <div className="flex gap-2 sm:ml-auto">
            <Link to="/masa-molar">
              <Button variant="ghost" size="sm" icon={<Beaker size={16} />}>
                Calcular Masa
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Controles de búsqueda y filtrado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-glass p-4 sm:p-6 mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Búsqueda */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, símbolo o número atómico..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-lab-dark/50 
                       border border-white/10 text-white placeholder:text-slate-500
                       focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
          </div>

          {/* Filtro de categoría */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as CategoryKey | 'all')}
            className="px-4 py-3 rounded-xl bg-lab-dark/50 border border-white/10 
                     text-white focus:outline-none focus:border-neon-cyan/50 
                     transition-colors cursor-pointer min-w-[200px]"
          >
            <option value="all">Todas las categorías</option>
            {Object.entries(CATEGORIES).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>

          {/* Toggle de vista */}
          <div className="flex rounded-xl bg-lab-dark/50 border border-white/10 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-neon-purple/20 text-neon-purple' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'list' 
                  ? 'bg-neon-purple/20 text-neon-purple' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <p className="text-slate-500 text-sm">
            Mostrando <span className="text-neon-cyan font-mono font-bold">{filteredElements.length}</span> de{' '}
            <span className="font-mono">{totalElements}</span> elementos
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      </motion.div>

      {/* Layout principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Grid/Lista de elementos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2"
        >
          <div className="card-glass p-4 sm:p-6">
            {filteredElements.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5 sm:gap-2">
                  <AnimatePresence mode="popLayout">
                    {filteredElements.map((element) => (
                      <motion.div
                        key={element.symbol}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <ElementCard
                          element={element}
                          isSelected={selectedElement?.symbol === element.symbol}
                          onClick={() => handleElementClick(element)}
                          viewMode="grid"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <AnimatePresence mode="popLayout">
                    {filteredElements.map((element) => (
                      <motion.div
                        key={element.symbol}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.15 }}
                      >
                        <ElementCard
                          element={element}
                          isSelected={selectedElement?.symbol === element.symbol}
                          onClick={() => handleElementClick(element)}
                          viewMode="list"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )
            ) : (
              <div className="text-center py-16">
                <Atom className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">
                  No se encontraron elementos con "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 text-neon-cyan hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Panel de información */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-1"
        >
          <div className="sticky top-24">
            <ElementInfoPanel element={selectedElement} />

            {/* Leyenda */}
            <div className="card-glass p-4 sm:p-6 mt-6">
              <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-500 to-blue-500" />
                Leyenda de Categorías
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(CATEGORIES).map(([key, { name, color }]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as CategoryKey)}
                    className={`
                      flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs
                      transition-all hover:bg-lab-elevated
                      ${selectedCategory === key ? 'bg-lab-elevated ring-1 ring-white/20' : ''}
                    `}
                  >
                    <span className={`w-3 h-3 rounded ${color} shrink-0`} />
                    <span className="text-slate-400 truncate">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PeriodicTablePage;

