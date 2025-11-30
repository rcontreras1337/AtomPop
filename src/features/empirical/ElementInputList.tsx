/**
 * Lista dinámica de elementos para calcular fórmula empírica
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { elements as allElements } from '../../data/elements';
import type { ElementEntry } from './useEmpiricalFormula';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

interface ElementInputListProps {
  elements: ElementEntry[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: 'symbol' | 'percentage', value: string) => void;
  totalPercentage: number;
  isValidTotal: boolean;
  canRemove: boolean;
}

// ═══════════════════════════════════════════════════════════════
// ELEMENTOS COMUNES (ordenados por frecuencia de uso)
// ═══════════════════════════════════════════════════════════════

const COMMON_ELEMENTS = ['C', 'H', 'O', 'N', 'S', 'P', 'Cl', 'Br', 'F', 'I', 'Na', 'K', 'Ca', 'Mg', 'Fe', 'Cu', 'Zn', 'Al'];

// ═══════════════════════════════════════════════════════════════
// COMPONENTE
// ═══════════════════════════════════════════════════════════════

export const ElementInputList: React.FC<ElementInputListProps> = ({
  elements,
  onAdd,
  onRemove,
  onUpdate,
  totalPercentage,
  isValidTotal,
  canRemove,
}) => {
  // Obtener elementos disponibles (no usados)
  const usedSymbols = new Set(elements.map(e => e.symbol).filter(Boolean));
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 text-sm font-medium text-slate-400 px-2">
        <div className="col-span-5">Elemento</div>
        <div className="col-span-5 text-right">Porcentaje</div>
        <div className="col-span-2"></div>
      </div>
      
      {/* Lista de elementos */}
      <AnimatePresence mode="popLayout">
        {elements.map((element, index) => (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-12 gap-4 items-center"
            data-testid={`element-row-${index}`}
          >
            {/* Select de elemento */}
            <div className="col-span-5">
              <select
                value={element.symbol}
                onChange={(e) => onUpdate(element.id, 'symbol', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 
                         text-white outline-none focus:border-purple-500 transition-colors
                         appearance-none cursor-pointer"
                data-testid={`element-select-${index}`}
              >
                <option value="">Seleccionar...</option>
                <optgroup label="Elementos comunes">
                  {COMMON_ELEMENTS.map(symbol => {
                    const el = allElements.find(e => e.symbol === symbol);
                    if (!el) return null;
                    const isUsed = usedSymbols.has(symbol) && element.symbol !== symbol;
                    return (
                      <option 
                        key={symbol} 
                        value={symbol}
                        disabled={isUsed}
                      >
                        {symbol} - {el.name} {isUsed ? '(usado)' : ''}
                      </option>
                    );
                  })}
                </optgroup>
                <optgroup label="Todos los elementos">
                  {allElements
                    .filter(el => !COMMON_ELEMENTS.includes(el.symbol))
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(el => {
                      const isUsed = usedSymbols.has(el.symbol) && element.symbol !== el.symbol;
                      return (
                        <option 
                          key={el.symbol} 
                          value={el.symbol}
                          disabled={isUsed}
                        >
                          {el.symbol} - {el.name} {isUsed ? '(usado)' : ''}
                        </option>
                      );
                    })}
                </optgroup>
              </select>
            </div>
            
            {/* Input de porcentaje */}
            <div className="col-span-5 relative">
              <input
                type="number"
                step="0.01"
                min="0.01"
                max="99.99"
                value={element.percentage}
                onChange={(e) => onUpdate(element.id, 'percentage', e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl 
                         px-4 py-3 text-white outline-none focus:border-purple-500 
                         text-right pr-10 transition-colors"
                data-testid={`element-percentage-${index}`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
            </div>
            
            {/* Botón eliminar */}
            <div className="col-span-2 flex justify-center">
              <button
                onClick={() => onRemove(element.id)}
                disabled={!canRemove}
                className={`p-3 rounded-xl transition-colors ${
                  canRemove 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                    : 'bg-slate-700/20 text-slate-600 cursor-not-allowed'
                }`}
                data-testid={`element-remove-${index}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Botón agregar */}
      {elements.length < 10 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onAdd}
          className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl 
                   text-slate-400 hover:border-purple-500 hover:text-purple-400 
                   transition-colors flex items-center justify-center gap-2"
          data-testid="add-element-button"
        >
          <Plus size={18} />
          Agregar elemento
        </motion.button>
      )}
      
      {/* Total de porcentajes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`mt-6 p-4 rounded-xl flex justify-between items-center ${
          isValidTotal 
            ? 'bg-green-500/10 border border-green-500/30' 
            : totalPercentage > 0
              ? 'bg-amber-500/10 border border-amber-500/30'
              : 'bg-slate-800/50 border border-slate-700'
        }`}
        data-testid="total-percentage"
      >
        <div className="flex items-center gap-2">
          {totalPercentage > 0 && (
            isValidTotal ? (
              <CheckCircle size={18} className="text-green-400" />
            ) : (
              <AlertCircle size={18} className="text-amber-400" />
            )
          )}
          <span className="text-slate-400">Total:</span>
        </div>
        <span className={`text-2xl font-bold ${
          isValidTotal 
            ? 'text-green-400' 
            : totalPercentage > 0 
              ? 'text-amber-400' 
              : 'text-slate-500'
        }`}>
          {totalPercentage.toFixed(2)}%
        </span>
      </motion.div>
      
      {/* Mensaje de ayuda */}
      {!isValidTotal && totalPercentage > 0 && (
        <p className="text-sm text-amber-400 text-center">
          {totalPercentage < 99 
            ? 'Los porcentajes deben sumar aproximadamente 100%' 
            : 'Los porcentajes exceden el 100%'}
        </p>
      )}
    </div>
  );
};

export default ElementInputList;

