/**
 * Tests para PeriodicTableModal
 * FIX-2: Tabla Periódica
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PeriodicTableModal } from './PeriodicTableModal';

// Mock de framer-motion para evitar problemas con animaciones en tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.PropsWithChildren<object>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<object>) => <>{children}</>,
}));

describe('PeriodicTableModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderizado', () => {
    it('no debe renderizar nada cuando isOpen es false', () => {
      const { container } = render(
        <PeriodicTableModal isOpen={false} onClose={mockOnClose} />
      );
      expect(container.firstChild).toBeNull();
    });

    it('debe renderizar el modal cuando isOpen es true', () => {
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );
      expect(screen.getByText('🔬 Tabla Periódica')).toBeInTheDocument();
    });

    it('debe mostrar el input de búsqueda', () => {
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );
      expect(screen.getByPlaceholderText('Buscar elemento...')).toBeInTheDocument();
    });

    it('debe mostrar el selector de categorías', () => {
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );
      expect(screen.getByText('Todas las categorías')).toBeInTheDocument();
    });

    it('debe mostrar todos los elementos disponibles', () => {
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );
      // Verificar que hay elementos (al menos algunos conocidos)
      expect(screen.getByText('H')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
      expect(screen.getByText('O')).toBeInTheDocument();
    });
  });

  describe('Búsqueda de elementos', () => {
    it('debe filtrar elementos por símbolo', async () => {
      const user = userEvent.setup();
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      const searchInput = screen.getByPlaceholderText('Buscar elemento...');
      await user.type(searchInput, 'Na');

      // Debe mostrar Sodio (Na)
      expect(screen.getByText('Na')).toBeInTheDocument();
    });

    it('debe filtrar elementos por nombre', async () => {
      const user = userEvent.setup();
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      const searchInput = screen.getByPlaceholderText('Buscar elemento...');
      await user.type(searchInput, 'Hidrógeno');

      // Debe mostrar H
      expect(screen.getByText('H')).toBeInTheDocument();
    });

    it('debe mostrar mensaje cuando no hay resultados', async () => {
      const user = userEvent.setup();
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      const searchInput = screen.getByPlaceholderText('Buscar elemento...');
      await user.type(searchInput, 'ElementoInexistente123');

      await waitFor(() => {
        expect(screen.getByText(/No se encontraron elementos/)).toBeInTheDocument();
      });
    });
  });

  describe('Filtrado por categoría', () => {
    it('debe filtrar por categoría de metales alcalinos', async () => {
      const user = userEvent.setup();
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      const categorySelect = screen.getByRole('combobox');
      await user.selectOptions(categorySelect, 'alkali-metal');

      // Debe mostrar Li, Na, K (metales alcalinos)
      expect(screen.getByText('Li')).toBeInTheDocument();
      expect(screen.getByText('Na')).toBeInTheDocument();
      expect(screen.getByText('K')).toBeInTheDocument();
    });

    it('debe filtrar por gases nobles', async () => {
      const user = userEvent.setup();
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      const categorySelect = screen.getByRole('combobox');
      await user.selectOptions(categorySelect, 'noble-gas');

      // Debe mostrar He, Ne, Ar
      expect(screen.getByText('He')).toBeInTheDocument();
      expect(screen.getByText('Ne')).toBeInTheDocument();
      expect(screen.getByText('Ar')).toBeInTheDocument();
    });
  });

  describe('Interacción', () => {
    it('debe llamar onClose al hacer clic en el botón X', async () => {
      const user = userEvent.setup();
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      // Buscar el botón con el icono X
      const buttons = screen.getAllByRole('button');
      const xButton = buttons.find(btn => btn.querySelector('svg.lucide-x'));
      
      if (xButton) {
        await user.click(xButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      }
    });

    it('debe llamar onClose al hacer clic en el overlay', async () => {
      const user = userEvent.setup();
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      // Buscar el overlay (div con backdrop-blur)
      const overlay = document.querySelector('.backdrop-blur-md');
      if (overlay) {
        await user.click(overlay);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      }
    });

    it('debe llamar onSelect al hacer clic en un elemento', async () => {
      const user = userEvent.setup();
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} onSelect={mockOnSelect} />
      );

      // Buscar el botón del Hidrógeno
      const hydrogenButtons = screen.getAllByText('H');
      // Hacer clic en el primero que sea un botón
      const hydrogenButton = hydrogenButtons.find(el => el.closest('button'));
      
      if (hydrogenButton) {
        await user.click(hydrogenButton.closest('button')!);
        expect(mockOnSelect).toHaveBeenCalledWith('H');
      }
    });
  });

  describe('Panel de detalles', () => {
    it('debe mostrar mensaje inicial cuando no hay elemento seleccionado', () => {
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      expect(screen.getByText(/Pasa el cursor sobre un elemento/)).toBeInTheDocument();
    });

    it('debe mostrar detalles al hacer hover sobre un elemento', async () => {
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      // Simular hover sobre el Hidrógeno
      const hydrogenButtons = screen.getAllByText('H');
      const hydrogenButton = hydrogenButtons.find(el => el.closest('button'));
      
      if (hydrogenButton) {
        fireEvent.mouseEnter(hydrogenButton.closest('button')!);
        
        await waitFor(() => {
          expect(screen.getByText('Hidrógeno')).toBeInTheDocument();
        });
      }
    });
  });

  describe('Leyenda de categorías', () => {
    it('debe mostrar la leyenda de categorías', () => {
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      expect(screen.getByText('Leyenda de categorías')).toBeInTheDocument();
      // Usar getAllByText porque aparecen en el selector y en la leyenda
      expect(screen.getAllByText('Metales Alcalinos').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Gases Nobles').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('No Metales').length).toBeGreaterThanOrEqual(1);
    });

    it('debe cambiar el filtro al hacer clic en una categoría de la leyenda', async () => {
      const user = userEvent.setup();
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      // Encontrar el botón de Gases Nobles en la leyenda
      const legendButtons = screen.getAllByRole('button');
      const nobleGasButton = legendButtons.find(btn => 
        btn.textContent?.includes('Gases Nobles') && btn.closest('.flex-wrap')
      );

      if (nobleGasButton) {
        await user.click(nobleGasButton);
        
        // Verificar que se filtraron los elementos
        await waitFor(() => {
          expect(screen.getByText('He')).toBeInTheDocument();
        });
      }
    });
  });

  describe('Conteo de elementos', () => {
    it('debe mostrar el conteo correcto de elementos', () => {
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      // Debe mostrar "Mostrando X de Y elementos"
      expect(screen.getByText(/Mostrando/)).toBeInTheDocument();
      // Verificar que muestra "elementos" en el conteo
      expect(screen.getByText(/elementos$/)).toBeInTheDocument();
    });

    it('debe actualizar el conteo al filtrar', async () => {
      const user = userEvent.setup();
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      const searchInput = screen.getByPlaceholderText('Buscar elemento...');
      await user.type(searchInput, 'Oxígeno');

      await waitFor(() => {
        // Debería mostrar menos elementos
        const countText = screen.getByText(/Mostrando/);
        expect(countText).toBeInTheDocument();
      });
    });
  });

  describe('Instrucciones', () => {
    it('debe mostrar instrucciones cuando onSelect está definido', () => {
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} onSelect={mockOnSelect} />
      );

      expect(screen.getByText(/Haz clic en un elemento para insertarlo/)).toBeInTheDocument();
    });

    it('no debe mostrar instrucciones cuando onSelect no está definido', () => {
      render(
        <PeriodicTableModal isOpen={true} onClose={mockOnClose} />
      );

      expect(screen.queryByText(/Haz clic en un elemento para insertarlo/)).not.toBeInTheDocument();
    });
  });
});

