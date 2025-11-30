/**
 * Lista de composición porcentual con barras de progreso
 */

import React from 'react';
import { motion } from 'framer-motion';
import type { CompositionElement } from '../../utils/chemistryEngine';
import { ElementBadge } from '../../components/ui/ElementBadge';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

interface CompositionListProps {
  data: CompositionElement[];
  totalMass: number;
  onItemHover?: (element: CompositionElement | null) => void;
  highlightedSymbol?: string | null;
}

// ═══════════════════════════════════════════════════════════════
// ANIMACIONES
// ═══════════════════════════════════════════════════════════════

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    } as const,
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
    } as const,
  },
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTE
// ═══════════════════════════════════════════════════════════════

export const CompositionList: React.FC<CompositionListProps> = ({
  data,
  totalMass,
  onItemHover,
  highlightedSymbol,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p>No hay datos para mostrar</p>
      </div>
    );
  }
  
  // Ordenar por porcentaje descendente
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage);
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {sortedData.map((element, index) => {
        const isHighlighted = highlightedSymbol === element.symbol;
        
        return (
          <motion.div
            key={element.symbol}
            variants={itemVariants}
            className={`
              p-4 rounded-xl transition-all duration-200
              ${isHighlighted 
                ? 'bg-white/10 scale-[1.02]' 
                : 'bg-slate-800/30 hover:bg-slate-800/50'}
            `}
            onMouseEnter={() => onItemHover?.(element)}
            onMouseLeave={() => onItemHover?.(null)}
            data-testid={`composition-item-${element.symbol}`}
          >
            <div className="flex items-center gap-4">
              {/* Badge del elemento */}
              <ElementBadge
                symbol={element.symbol}
                size="lg"
              />
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-medium text-white">
                    {element.name}
                  </span>
                  <span 
                    className="text-lg font-bold"
                    style={{ color: element.color }}
                  >
                    {element.percentage.toFixed(2)}%
                  </span>
                </div>
                
                {/* Barra de progreso */}
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: element.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${element.percentage}%` }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1,
                      ease: 'easeOut',
                    }}
                  />
                </div>
                
                {/* Detalle */}
                <div className="mt-2 text-xs text-slate-500 flex justify-between">
                  <span>
                    {element.count} átomo{element.count > 1 ? 's' : ''} × {getAtomicMass(element)} g/mol
                  </span>
                  <span>
                    = {element.massContribution.toFixed(3)} g/mol
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
      
      {/* Total */}
      <motion.div
        variants={itemVariants}
        className="mt-6 pt-4 border-t border-white/10"
      >
        <div className="flex justify-between items-center text-lg">
          <span className="text-slate-300 font-medium">Masa Molar Total</span>
          <span className="text-white font-bold">
            {totalMass.toFixed(3)} g/mol
          </span>
        </div>
        
        <div className="mt-2 flex justify-between items-center text-sm">
          <span className="text-slate-500">Suma de porcentajes</span>
          <span className="text-green-400 font-mono">
            {data.reduce((sum, el) => sum + el.percentage, 0).toFixed(2)}%
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Helper para obtener masa atómica
const getAtomicMass = (element: CompositionElement): string => {
  const mass = element.massContribution / element.count;
  return mass.toFixed(3);
};

export default CompositionList;

