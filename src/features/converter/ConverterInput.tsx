/**
 * Input especializado para el conversor
 * Muestra estados visuales claros para campo activo vs calculado
 */

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

export interface ConverterInputProps {
  label: string;
  value: string;
  unit: string;
  unitLong: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
  isActive: boolean;
  isCalculated: boolean;
  disabled?: boolean;
  color: 'cyan' | 'amber' | 'purple';
  placeholder?: string;
}

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE COLORES
// ═══════════════════════════════════════════════════════════════

const colorConfig = {
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-500',
    borderMuted: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    badge: 'bg-cyan-500/20 text-cyan-400',
  },
  amber: {
    text: 'text-amber-400',
    border: 'border-amber-500',
    borderMuted: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    badge: 'bg-amber-500/20 text-amber-400',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-500',
    borderMuted: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    badge: 'bg-purple-500/20 text-purple-400',
  },
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTE
// ═══════════════════════════════════════════════════════════════

export const ConverterInput: React.FC<ConverterInputProps> = ({
  label,
  value,
  unit,
  unitLong,
  icon,
  onChange,
  isActive,
  isCalculated,
  disabled = false,
  color,
  placeholder = '0',
}) => {
  const colors = colorConfig[color];
  
  // Formatear valor para mostrar (notación científica legible)
  const displayValue = formatDisplayValue(value);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'relative rounded-2xl p-6 transition-all duration-300',
        'bg-slate-800/50 backdrop-blur-sm',
        'border-2',
        isActive && [colors.border, colors.glow, colors.bg],
        isCalculated && !isActive && ['border-green-500/50', 'bg-green-500/5'],
        !isActive && !isCalculated && [colors.borderMuted, 'hover:border-opacity-50'],
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      {/* Badge de estado */}
      {isCalculated && !isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-2 right-3 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400"
        >
          calculado
        </motion.div>
      )}
      
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={clsx('absolute -top-2 right-3 px-2 py-0.5 rounded-full text-xs font-medium', colors.badge)}
        >
          editando
        </motion.div>
      )}
      
      {/* Icono y Label */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className={clsx(colors.text, 'text-2xl')}>
          {icon}
        </span>
        <label className={clsx('font-bold text-lg', colors.text)}>
          {label}
        </label>
      </div>
      
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'w-full bg-transparent text-center text-3xl font-bold text-white outline-none',
            'border-b-2 py-2 transition-colors',
            isActive ? colors.border : colors.borderMuted,
            disabled && 'cursor-not-allowed',
          )}
          data-testid={`converter-input-${color}`}
        />
        
        {/* Valor formateado (para notación científica) */}
        {displayValue !== value && value !== '' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-6 left-0 right-0 text-center text-xs text-slate-400"
          >
            = {displayValue}
          </motion.div>
        )}
      </div>
      
      {/* Unidad */}
      <div className="mt-4 text-center">
        <span className={clsx('text-lg font-mono', colors.text)}>{unit}</span>
        <span className="text-slate-500 text-sm ml-2">({unitLong})</span>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// HELPER: Formatear valor para display legible
// ═══════════════════════════════════════════════════════════════

const formatDisplayValue = (value: string): string => {
  if (!value || value === '') return '';
  
  // Si contiene 'e' o 'E', formatear notación científica
  if (value.toLowerCase().includes('e')) {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    const exp = Math.floor(Math.log10(Math.abs(num)));
    const mantissa = num / Math.pow(10, exp);
    
    // Usar superíndices Unicode
    const superscripts: { [key: string]: string } = {
      '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    };
    
    const expStr = exp.toString().split('').map(d => superscripts[d] || d).join('');
    return `${mantissa.toFixed(3)} × 10${expStr}`;
  }
  
  return value;
};

export default ConverterInput;

