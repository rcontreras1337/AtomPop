/**
 * Gráfico circular animado para composición porcentual
 * Usa SVG y Framer Motion para animaciones
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CompositionElement } from '../../utils/chemistryEngine';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

interface PieChartProps {
  data: CompositionElement[];
  size?: number;
  onSegmentHover?: (element: CompositionElement | null) => void;
  centerLabel?: string;
  centerValue?: string;
}

interface Segment {
  element: CompositionElement;
  startAngle: number;
  endAngle: number;
  path: string;
  color: string;
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  // Caso especial: círculo completo (un solo elemento al 100%)
  if (endAngle - startAngle >= 359.99) {
    return `
      M ${cx} ${cy - radius}
      A ${radius} ${radius} 0 1 1 ${cx - 0.001} ${cy - radius}
      Z
    `;
  }
  
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `
    M ${cx} ${cy}
    L ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
    Z
  `;
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTE
// ═══════════════════════════════════════════════════════════════

export const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 280,
  onSegmentHover,
  centerLabel,
  centerValue,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 10; // Margen para efectos de hover
  const innerRadius = radius * 0.55; // Radio interior para el donut
  
  // Calcular segmentos
  const segments = useMemo((): Segment[] => {
    if (!data || data.length === 0) return [];
    
    let currentAngle = 0;
    
    return data.map((element) => {
      const angleSize = (element.percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angleSize;
      currentAngle = endAngle;
      
      return {
        element,
        startAngle,
        endAngle,
        path: describeArc(cx, cy, radius, startAngle, endAngle),
        color: element.color || '#6b7280',
      };
    });
  }, [data, cx, cy, radius]);
  
  // Manejar hover
  const handleMouseEnter = (index: number, element: CompositionElement) => {
    setHoveredIndex(index);
    onSegmentHover?.(element);
  };
  
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    onSegmentHover?.(null);
  };
  
  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center text-slate-500"
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <div className="w-32 h-32 rounded-full border-4 border-dashed border-slate-600 mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">📊</span>
          </div>
          <p className="text-sm">Ingresa una fórmula</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Segmentos */}
        {segments.map((segment, index) => (
          <motion.path
            key={segment.element.symbol}
            d={segment.path}
            fill={segment.color}
            stroke="rgba(15, 23, 42, 0.8)"
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: hoveredIndex === index ? 1.05 : 1, 
              opacity: 1,
            }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: 'spring',
              damping: 15,
            }}
            style={{ 
              transformOrigin: `${cx}px ${cy}px`,
              filter: hoveredIndex === index ? 'brightness(1.2)' : 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={() => handleMouseEnter(index, segment.element)}
            onMouseLeave={handleMouseLeave}
            data-testid={`pie-segment-${segment.element.symbol}`}
          />
        ))}
        
        {/* Círculo interior (donut hole) */}
        <circle
          cx={cx}
          cy={cy}
          r={innerRadius}
          fill="rgba(15, 23, 42, 0.95)"
          className="pointer-events-none"
        />
      </svg>
      
      {/* Centro del gráfico */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ transform: 'rotate(0deg)' }}
      >
        {hoveredIndex !== null ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div 
              className="text-3xl font-bold"
              style={{ color: segments[hoveredIndex].color }}
            >
              {segments[hoveredIndex].element.percentage.toFixed(1)}%
            </div>
            <div className="text-sm text-slate-400">
              {segments[hoveredIndex].element.name}
            </div>
          </motion.div>
        ) : (
          <div className="text-center">
            <div className="text-xl font-bold text-white">
              {centerValue || '100%'}
            </div>
            <div className="text-xs text-slate-400">
              {centerLabel || 'Total'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;

