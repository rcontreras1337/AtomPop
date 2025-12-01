import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Grid } from 'lucide-react';

type InputStatus = 'idle' | 'valid' | 'error';

interface ChemicalInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
  showStatusIcon?: boolean;
  /** Mostrar botón para abrir tabla periódica */
  showPeriodicTableButton?: boolean;
  /** Callback cuando se hace clic en el botón de tabla periódica */
  onPeriodicTableClick?: () => void;
}

export const ChemicalInput = forwardRef<HTMLInputElement, ChemicalInputProps>(({
  label,
  error,
  success,
  helperText,
  onChange,
  showStatusIcon = true,
  showPeriodicTableButton = false,
  onPeriodicTableClick,
  className = '',
  value,
  ...props
}, ref) => {
  // Determinar estado
  const status: InputStatus = error ? 'error' : success ? 'valid' : 'idle';
  
  // Clases según estado
  const statusClasses = {
    idle: '',
    valid: 'success',
    error: 'error',
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };
  
  // Calcular padding derecho según los elementos presentes
  const getRightPadding = () => {
    let padding = 16; // Base padding (1rem)
    if (showStatusIcon && status !== 'idle') padding += 32; // 2rem para el icono
    if (showPeriodicTableButton) padding += 40; // 2.5rem para el botón
    return `${padding}px`;
  };
  
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      
      {/* Input container */}
      <div className="relative">
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          className={`
            input-tube
            ${statusClasses[status]}
            ${className}
          `}
          style={{ paddingRight: getRightPadding() }}
          {...props}
        />
        
        {/* Contenedor de iconos a la derecha */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {/* Botón de tabla periódica */}
          {showPeriodicTableButton && (
            <motion.button
              type="button"
              onClick={onPeriodicTableClick}
              className="p-1.5 rounded-lg bg-lab-elevated/50 hover:bg-neon-purple/20 
                       text-slate-400 hover:text-neon-purple transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Abrir Tabla Periódica"
            >
              <Grid className="w-4 h-4" />
            </motion.button>
          )}
          
          {/* Status icon */}
          {showStatusIcon && (
            <AnimatePresence>
              {status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {status === 'valid' && (
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                  )}
                  {status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-danger" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-danger flex items-center gap-1"
          >
            <AlertCircle size={14} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      
      {/* Helper text */}
      {helperText && !error && (
        <p className="mt-2 text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

ChemicalInput.displayName = 'ChemicalInput';

export default ChemicalInput;
