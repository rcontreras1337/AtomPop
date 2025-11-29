import React from 'react';
import { motion } from 'framer-motion';

type ResultCardVariant = 'default' | 'success' | 'amber' | 'cyan';

interface ResultCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: ResultCardVariant;
  className?: string;
  animate?: boolean;
}

const variantStyles: Record<ResultCardVariant, string> = {
  default: 'card-glass',
  success: `
    result-display
    border-2 border-neon-green/30
    shadow-[0_0_40px_rgba(34,197,94,0.15),inset_0_0_60px_rgba(34,197,94,0.05)]
  `,
  amber: 'card-glass-amber',
  cyan: 'card-glass-cyan',
};

export const ResultCard: React.FC<ResultCardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  className = '',
  animate = true,
}) => {
  const Wrapper = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring' as const, damping: 15, stiffness: 100 },
  } : {};
  
  return (
    <Wrapper
      className={`${variantStyles[variant]} p-6 ${className}`}
      {...animationProps}
    >
      {(title || subtitle) && (
        <div className="mb-4 text-center">
          {subtitle && (
            <p className="text-slate-500 text-sm uppercase tracking-wider mb-1">
              {subtitle}
            </p>
          )}
          {title && (
            <h3 className="text-xl font-bold text-white">{title}</h3>
          )}
        </div>
      )}
      {children}
    </Wrapper>
  );
};

// Componente para el valor del resultado
interface ResultValueProps {
  value: string | number;
  unit?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ResultValue: React.FC<ResultValueProps> = ({
  value,
  unit,
  size = 'lg',
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl md:text-6xl',
    xl: 'text-6xl md:text-7xl',
  };
  
  return (
    <div className="text-center">
      <motion.span
        className={`result-value ${sizeClasses[size]}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring' as const, damping: 10 }}
      >
        {value}
      </motion.span>
      {unit && (
        <span className="text-neon-green text-xl ml-2">{unit}</span>
      )}
    </div>
  );
};

export default ResultCard;

