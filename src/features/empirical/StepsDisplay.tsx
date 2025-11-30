/**
 * Componente para mostrar los pasos del cálculo de fórmula empírica
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { EmpiricalStep } from '../../utils/chemistryEngine';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

interface StepsDisplayProps {
  steps: EmpiricalStep[];
  finalFormula: string;
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTE
// ═══════════════════════════════════════════════════════════════

export const StepsDisplay: React.FC<StepsDisplayProps> = ({ steps, finalFormula }) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([0, 1, 2]));
  
  const toggleStep = (stepNumber: number) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepNumber)) {
        newSet.delete(stepNumber);
      } else {
        newSet.add(stepNumber);
      }
      return newSet;
    });
  };
  
  const stepColors = [
    { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
    { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
    { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h4 className="text-lg font-bold text-white flex items-center gap-2">
        📝 Pasos del cálculo
      </h4>
      
      {steps.map((step, index) => {
        const colors = stepColors[index % stepColors.length];
        const isExpanded = expandedSteps.has(step.step);
        
        return (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl border ${colors.border} overflow-hidden`}
          >
            {/* Header del paso */}
            <button
              onClick={() => toggleStep(step.step)}
              className={`w-full flex items-center justify-between p-4 ${colors.bg} hover:brightness-110 transition-all`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${colors.text} bg-slate-800`}>
                  {step.step}
                </span>
                <span className="text-white font-medium">{step.description}</span>
              </div>
              {isExpanded ? (
                <ChevronUp className="text-slate-400" size={20} />
              ) : (
                <ChevronDown className="text-slate-400" size={20} />
              )}
            </button>
            
            {/* Contenido del paso */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-slate-800/50 space-y-2">
                    {step.values.map((value, vIndex) => (
                      <motion.div
                        key={value.symbol}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: vIndex * 0.05 }}
                        className="flex items-center justify-between font-mono text-sm"
                      >
                        <span className={`font-bold ${colors.text}`}>{value.symbol}:</span>
                        <span className="text-slate-300">{value.display}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
      
      {/* Resultado final */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: steps.length * 0.1 }}
        className="mt-6 p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-center"
      >
        <p className="text-slate-400 mb-2">Fórmula Empírica</p>
        <p className="text-4xl font-bold text-white" data-testid="empirical-result">
          {formatFormula(finalFormula)}
        </p>
      </motion.div>
    </motion.div>
  );
};

// Helper para formatear fórmula con subíndices
const formatFormula = (formula: string): string => {
  const subscripts: { [key: string]: string } = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  };
  
  return formula.replace(/\d/g, (d) => subscripts[d] || d);
};

export default StepsDisplay;

