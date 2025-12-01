/**
 * Tests para ChemicalInput
 * Incluye tests para la nueva funcionalidad del botón de tabla periódica (FIX-2.4)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChemicalInput } from './ChemicalInput';

// Mock de framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.PropsWithChildren<object>) => <button {...props}>{children}</button>,
    p: ({ children, ...props }: React.PropsWithChildren<object>) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<object>) => <>{children}</>,
}));

describe('ChemicalInput', () => {
  describe('Renderizado básico', () => {
    it('debe renderizar el input', () => {
      render(<ChemicalInput />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('debe renderizar el label cuando se proporciona', () => {
      render(<ChemicalInput label="Fórmula Química" />);
      expect(screen.getByText('Fórmula Química')).toBeInTheDocument();
    });

    it('debe renderizar el placeholder', () => {
      render(<ChemicalInput placeholder="Ej: H2O" />);
      expect(screen.getByPlaceholderText('Ej: H2O')).toBeInTheDocument();
    });

    it('debe renderizar el helper text', () => {
      render(<ChemicalInput helperText="Ingrese una fórmula válida" />);
      expect(screen.getByText('Ingrese una fórmula válida')).toBeInTheDocument();
    });
  });

  describe('Estados de validación', () => {
    it('debe mostrar estado de error con icono', () => {
      render(<ChemicalInput error="Fórmula inválida" />);
      expect(screen.getByText('Fórmula inválida')).toBeInTheDocument();
    });

    it('debe mostrar estado de éxito con icono', () => {
      const { container } = render(<ChemicalInput success={true} />);
      // Verificar que hay un icono de check (CheckCircle)
      const successIcon = container.querySelector('.text-neon-green');
      expect(successIcon).toBeInTheDocument();
    });

    it('no debe mostrar helper text cuando hay error', () => {
      render(
        <ChemicalInput 
          error="Error" 
          helperText="Este texto no debe aparecer" 
        />
      );
      expect(screen.queryByText('Este texto no debe aparecer')).not.toBeInTheDocument();
    });
  });

  describe('Interacción', () => {
    it('debe llamar onChange con el valor del input', async () => {
      const mockOnChange = vi.fn();
      const user = userEvent.setup();
      
      render(<ChemicalInput onChange={mockOnChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'H2O');
      
      // Se llama una vez por cada caracter
      expect(mockOnChange).toHaveBeenCalledTimes(3);
      expect(mockOnChange).toHaveBeenLastCalledWith('H2O');
    });

    it('debe mostrar el valor controlado', () => {
      render(<ChemicalInput value="NaCl" onChange={() => {}} />);
      expect(screen.getByDisplayValue('NaCl')).toBeInTheDocument();
    });
  });

  describe('Botón de Tabla Periódica (FIX-2.4)', () => {
    const mockOnPeriodicTableClick = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('no debe mostrar botón por defecto', () => {
      render(<ChemicalInput />);
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBe(0);
    });

    it('debe mostrar botón cuando showPeriodicTableButton es true', () => {
      render(
        <ChemicalInput 
          showPeriodicTableButton={true}
          onPeriodicTableClick={mockOnPeriodicTableClick}
        />
      );
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('title', 'Abrir Tabla Periódica');
    });

    it('debe llamar onPeriodicTableClick al hacer clic', async () => {
      const user = userEvent.setup();
      
      render(
        <ChemicalInput 
          showPeriodicTableButton={true}
          onPeriodicTableClick={mockOnPeriodicTableClick}
        />
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(mockOnPeriodicTableClick).toHaveBeenCalledTimes(1);
    });

    it('debe mostrar botón junto con icono de estado', () => {
      render(
        <ChemicalInput 
          showPeriodicTableButton={true}
          onPeriodicTableClick={mockOnPeriodicTableClick}
          success={true}
        />
      );
      
      // Debe haber un botón
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      
      // Y también el icono de éxito
      const { container } = render(
        <ChemicalInput success={true} />
      );
      const successIcon = container.querySelector('.text-neon-green');
      expect(successIcon).toBeInTheDocument();
    });

    it('no debe interferir con el typing del input', async () => {
      const mockOnChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <ChemicalInput 
          showPeriodicTableButton={true}
          onPeriodicTableClick={mockOnPeriodicTableClick}
          onChange={mockOnChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'Ca');
      
      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnPeriodicTableClick).not.toHaveBeenCalled();
    });

    it('debe tener el tipo button para no hacer submit', () => {
      render(
        <ChemicalInput 
          showPeriodicTableButton={true}
          onPeriodicTableClick={mockOnPeriodicTableClick}
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Accesibilidad', () => {
    it('debe asociar label con input', () => {
      render(<ChemicalInput label="Test Label" />);
      const label = screen.getByText('Test Label');
      const input = screen.getByRole('textbox');
      
      // El label debe estar antes del input en el DOM
      expect(label.compareDocumentPosition(input)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });

    it('debe poder recibir foco', () => {
      render(<ChemicalInput />);
      const input = screen.getByRole('textbox');
      
      input.focus();
      expect(document.activeElement).toBe(input);
    });

    it('debe soportar ref forwarding', () => {
      const ref = vi.fn();
      render(<ChemicalInput ref={ref} />);
      
      // El ref debe haber sido llamado con el elemento input
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Clases CSS', () => {
    it('debe aplicar clase de error cuando hay error', () => {
      render(<ChemicalInput error="Error" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('error');
    });

    it('debe aplicar clase de success cuando success es true', () => {
      render(<ChemicalInput success={true} />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('success');
    });

    it('debe aceptar className personalizado', () => {
      render(<ChemicalInput className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('custom-class');
    });
  });

  describe('Props adicionales', () => {
    it('debe pasar props adicionales al input', () => {
      render(
        <ChemicalInput 
          disabled={true}
          maxLength={10}
          autoComplete="off"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('maxLength', '10');
      expect(input).toHaveAttribute('autoComplete', 'off');
    });

    it('debe manejar eventos de teclado', () => {
      const mockOnKeyDown = vi.fn();
      render(<ChemicalInput onKeyDown={mockOnKeyDown} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(mockOnKeyDown).toHaveBeenCalled();
    });
  });
});

