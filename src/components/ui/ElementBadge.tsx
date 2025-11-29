import React from 'react';
import { motion } from 'framer-motion';
import { usePeriodicTable } from '../../hooks/usePeriodicTable';

type BadgeSize = 'sm' | 'md' | 'lg';

interface ElementBadgeProps {
  symbol: string;
  count?: number;
  size?: BadgeSize;
  showName?: boolean;
  showMass?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

const sizeClasses: Record<BadgeSize, { badge: string; text: string; count: string }> = {
  sm: {
    badge: 'w-8 h-8 rounded-lg text-sm',
    text: 'text-xs',
    count: 'text-[10px]',
  },
  md: {
    badge: 'w-12 h-12 rounded-xl text-lg',
    text: 'text-sm',
    count: 'text-xs',
  },
  lg: {
    badge: 'w-16 h-16 rounded-2xl text-2xl',
    text: 'text-base',
    count: 'text-sm',
  },
};

/**
 * Determina si un color es claro (para texto oscuro) o oscuro (para texto claro)
 */
const isLightColor = (hex: string): boolean => {
  // Quitar # si existe
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

export const ElementBadge: React.FC<ElementBadgeProps> = ({
  symbol,
  count,
  size = 'md',
  showName = false,
  showMass = false,
  interactive = true,
  onClick,
}) => {
  const { getElement } = usePeriodicTable();
  const element = getElement(symbol);
  
  if (!element) {
    return (
      <div className={`element-badge ${sizeClasses[size].badge} bg-slate-700 text-slate-400`}>
        ?
      </div>
    );
  }
  
  const bgColor = `#${element.cpkHex}`;
  const textColor = isLightColor(element.cpkHex) ? '#0f172a' : '#ffffff';
  
  const Wrapper = interactive ? motion.div : 'div';
  const motionProps = interactive ? {
    whileHover: { scale: 1.1, rotate: [0, -5, 5, 0] },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.3 },
  } : {};
  
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <Wrapper
        className={`
          element-badge ${sizeClasses[size].badge}
          ${interactive ? 'cursor-pointer' : ''}
        `}
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={onClick}
        {...motionProps}
      >
        <span className="font-bold">{element.symbol}</span>
        {count && count > 1 && (
          <sub className={`${sizeClasses[size].count} opacity-80 ml-0.5`}>
            {count}
          </sub>
        )}
      </Wrapper>
      
      {showName && (
        <span className={`${sizeClasses[size].text} text-slate-400`}>
          {element.name}
        </span>
      )}
      
      {showMass && (
        <span className={`${sizeClasses[size].count} text-slate-500`}>
          {element.atomicMass} u
        </span>
      )}
    </div>
  );
};

// Versión simplificada para usar con colores directos (sin lookup)
interface SimpleElementBadgeProps {
  symbol: string;
  count?: number;
  color: string;
  size?: BadgeSize;
}

export const SimpleElementBadge: React.FC<SimpleElementBadgeProps> = ({
  symbol,
  count,
  color,
  size = 'md',
}) => {
  const textColor = isLightColor(color.replace('#', '')) ? '#0f172a' : '#ffffff';
  
  return (
    <motion.div
      className={`element-badge ${sizeClasses[size].badge}`}
      style={{ backgroundColor: color, color: textColor }}
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.3 }}
    >
      <span className="font-bold">{symbol}</span>
      {count && count > 1 && (
        <sub className={`${sizeClasses[size].count} opacity-80 ml-0.5`}>
          {count}
        </sub>
      )}
    </motion.div>
  );
};

export default ElementBadge;

