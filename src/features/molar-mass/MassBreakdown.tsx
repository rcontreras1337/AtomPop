/**
 * Componente MassBreakdown
 * Muestra el desglose paso a paso del cálculo de masa molar
 */

import React from 'react';
import { motion } from 'framer-motion';
import { type ElementBreakdown } from '../../utils/chemistryEngine';
import { SimpleElementBadge } from '../../components/ui/ElementBadge';

interface MassBreakdownProps {
  breakdown: ElementBreakdown[];
  totalMass: number;
  className?: string;
}

// Animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
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
    },
  },
};

const totalVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 10,
      delay: 0.4,
    },
  },
};

export const MassBreakdown: React.FC<MassBreakdownProps> = ({
  breakdown,
  totalMass,
  className = '',
}) => {
  if (breakdown.length === 0) {
    return null;
  }

  return (
    <motion.div
      className={`space-y-3 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex items-center justify-between text-sm text-slate-400 px-2 pb-2 border-b border-white/10">
        <span>Elemento</span>
        <span>Contribución</span>
      </div>

      {/* Elementos */}
      {breakdown.map((element, index) => (
        <motion.div
          key={`${element.symbol}-${index}`}
          className="flex items-center gap-4 p-3 rounded-xl bg-lab-surface/50 hover:bg-lab-surface transition-colors"
          variants={itemVariants}
        >
          {/* Badge del elemento */}
          <SimpleElementBadge
            symbol={element.symbol}
            count={element.count}
            color={element.color}
            size="md"
          />

          {/* Info del elemento */}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-white">
              {element.name}
            </div>
            <div className="text-sm text-slate-400">
              {element.atomicMass.toFixed(3)} g/mol × {element.count}
            </div>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <div className="font-bold text-lg text-neon-amber">
              {element.subtotal.toFixed(3)}
            </div>
            <div className="text-xs text-slate-500">g/mol</div>
          </div>
        </motion.div>
      ))}

      {/* Total */}
      <motion.div
        className="mt-4 pt-4 border-t-2 border-neon-green/30"
        variants={totalVariants}
      >
        <div className="flex items-center justify-between p-4 rounded-xl bg-neon-green/10 border border-neon-green/20">
          <span className="text-lg font-bold text-white">
            Masa Molar Total
          </span>
          <div className="text-right">
            <span className="text-3xl font-bold text-neon-green">
              {totalMass.toFixed(3)}
            </span>
            <span className="text-neon-green/70 ml-2">g/mol</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MassBreakdown;

