import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

type InputStatus = 'idle' | 'valid' | 'error';

interface ChemicalInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
  showStatusIcon?: boolean;
}

export const ChemicalInput = forwardRef<HTMLInputElement, ChemicalInputProps>(({
  label,
  error,
  success,
  helperText,
  onChange,
  showStatusIcon = true,
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
            ${showStatusIcon && status !== 'idle' ? 'pr-12' : ''}
            ${className}
          `}
          {...props}
        />
        
        {/* Status icon */}
        {showStatusIcon && (
          <AnimatePresence>
            {status !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
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

