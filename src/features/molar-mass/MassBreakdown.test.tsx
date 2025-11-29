/**
 * Tests para MassBreakdown componente
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MassBreakdown } from './MassBreakdown';
import { type ElementBreakdown } from '../../utils/chemistryEngine';

// Mock data para tests
const mockBreakdownH2O: ElementBreakdown[] = [
  {
    symbol: 'H',
    name: 'Hidrógeno',
    count: 2,
    atomicMass: 1.008,
    subtotal: 2.016,
    color: '#FFFFFF',
  },
  {
    symbol: 'O',
    name: 'Oxígeno',
    count: 1,
    atomicMass: 15.999,
    subtotal: 15.999,
    color: '#FF0D0D',
  },
];

const mockBreakdownNaCl: ElementBreakdown[] = [
  {
    symbol: 'Na',
    name: 'Sodio',
    count: 1,
    atomicMass: 22.99,
    subtotal: 22.99,
    color: '#AB5CF2',
  },
  {
    symbol: 'Cl',
    name: 'Cloro',
    count: 1,
    atomicMass: 35.45,
    subtotal: 35.45,
    color: '#1FF01F',
  },
];

describe('MassBreakdown', () => {
  it('debe renderizar todos los elementos del breakdown', () => {
    render(
      <MassBreakdown 
        breakdown={mockBreakdownH2O} 
        totalMass={18.015} 
      />
    );

    // Verificar que ambos elementos se muestran
    expect(screen.getByText('Hidrógeno')).toBeInTheDocument();
    expect(screen.getByText('Oxígeno')).toBeInTheDocument();
  });

  it('debe mostrar los nombres de los elementos', () => {
    render(
      <MassBreakdown 
        breakdown={mockBreakdownNaCl} 
        totalMass={58.44} 
      />
    );

    expect(screen.getByText('Sodio')).toBeInTheDocument();
    expect(screen.getByText('Cloro')).toBeInTheDocument();
  });

  it('debe mostrar el cálculo de cada elemento correctamente', () => {
    render(
      <MassBreakdown 
        breakdown={mockBreakdownH2O} 
        totalMass={18.015} 
      />
    );

    // Verificar fórmula de cálculo para Hidrógeno (1.008 × 2)
    expect(screen.getByText('1.008 g/mol × 2')).toBeInTheDocument();
    
    // Verificar fórmula de cálculo para Oxígeno (15.999 × 1)
    expect(screen.getByText('15.999 g/mol × 1')).toBeInTheDocument();
  });

  it('debe mostrar los subtotales correctamente', () => {
    render(
      <MassBreakdown 
        breakdown={mockBreakdownH2O} 
        totalMass={18.015} 
      />
    );

    // Subtotal de H (2.016)
    expect(screen.getByText('2.016')).toBeInTheDocument();
    
    // Subtotal de O (15.999)
    expect(screen.getByText('15.999')).toBeInTheDocument();
  });

  it('debe mostrar el total correctamente', () => {
    render(
      <MassBreakdown 
        breakdown={mockBreakdownH2O} 
        totalMass={18.015} 
      />
    );

    // Total
    expect(screen.getByText('Masa Molar Total')).toBeInTheDocument();
    expect(screen.getByText('18.015')).toBeInTheDocument();
  });

  it('debe manejar breakdown vacío retornando null', () => {
    const { container } = render(
      <MassBreakdown 
        breakdown={[]} 
        totalMass={0} 
      />
    );

    // El componente no debe renderizar nada
    expect(container.firstChild).toBeNull();
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(
      <MassBreakdown 
        breakdown={mockBreakdownH2O} 
        totalMass={18.015}
        className="custom-test-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-test-class');
  });

  it('debe renderizar breakdown con un solo elemento', () => {
    const singleElement: ElementBreakdown[] = [
      {
        symbol: 'He',
        name: 'Helio',
        count: 1,
        atomicMass: 4.003,
        subtotal: 4.003,
        color: '#D9FFFF',
      },
    ];

    render(
      <MassBreakdown 
        breakdown={singleElement} 
        totalMass={4.003} 
      />
    );

    expect(screen.getByText('Helio')).toBeInTheDocument();
    expect(screen.getByText('4.003 g/mol × 1')).toBeInTheDocument();
  });

  it('debe mostrar header con etiquetas correctas', () => {
    render(
      <MassBreakdown 
        breakdown={mockBreakdownH2O} 
        totalMass={18.015} 
      />
    );

    expect(screen.getByText('Elemento')).toBeInTheDocument();
    expect(screen.getByText('Contribución')).toBeInTheDocument();
  });

  it('debe renderizar breakdown con elementos de alto conteo', () => {
    const complexBreakdown: ElementBreakdown[] = [
      {
        symbol: 'C',
        name: 'Carbono',
        count: 6,
        atomicMass: 12.011,
        subtotal: 72.066,
        color: '#909090',
      },
      {
        symbol: 'H',
        name: 'Hidrógeno',
        count: 12,
        atomicMass: 1.008,
        subtotal: 12.096,
        color: '#FFFFFF',
      },
      {
        symbol: 'O',
        name: 'Oxígeno',
        count: 6,
        atomicMass: 15.999,
        subtotal: 95.994,
        color: '#FF0D0D',
      },
    ];

    render(
      <MassBreakdown 
        breakdown={complexBreakdown} 
        totalMass={180.156} 
      />
    );

    // Verificar glucosa C6H12O6
    expect(screen.getByText('Carbono')).toBeInTheDocument();
    expect(screen.getByText('12.011 g/mol × 6')).toBeInTheDocument();
    expect(screen.getByText('1.008 g/mol × 12')).toBeInTheDocument();
    expect(screen.getByText('15.999 g/mol × 6')).toBeInTheDocument();
    expect(screen.getByText('180.156')).toBeInTheDocument();
  });

  it('debe tener unidades g/mol en cada subtotal', () => {
    render(
      <MassBreakdown 
        breakdown={mockBreakdownH2O} 
        totalMass={18.015} 
      />
    );

    // Debe haber múltiples instancias de "g/mol"
    const gMolTexts = screen.getAllByText('g/mol');
    expect(gMolTexts.length).toBeGreaterThanOrEqual(2);
  });
});

