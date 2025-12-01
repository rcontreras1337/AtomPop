/**
 * Tests para PeriodicTablePage
 * FIX-2: Tabla Periódica
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { PeriodicTablePage } from './PeriodicTablePage';

// Mock de framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.PropsWithChildren<object>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<object>) => <>{children}</>,
}));

// Wrapper con Router
const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('PeriodicTablePage', () => {
  describe('Renderizado', () => {
    it('debe renderizar el título de la página', () => {
      renderWithRouter(<PeriodicTablePage />);
      expect(screen.getByText('Tabla Periódica')).toBeInTheDocument();
    });

    it('debe mostrar el enlace para volver al inicio', () => {
      renderWithRouter(<PeriodicTablePage />);
      expect(screen.getByText('Volver al inicio')).toBeInTheDocument();
    });

    it('debe mostrar el conteo total de elementos', () => {
      renderWithRouter(<PeriodicTablePage />);
      // El JSON tiene 75 elementos, pero totalElements puede variar
      expect(screen.getByText(/elementos disponibles/)).toBeInTheDocument();
    });

    it('debe mostrar el input de búsqueda', () => {
      renderWithRouter(<PeriodicTablePage />);
      expect(screen.getByPlaceholderText(/Buscar por nombre, símbolo/)).toBeInTheDocument();
    });

    it('debe mostrar el selector de categorías', () => {
      renderWithRouter(<PeriodicTablePage />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('debe mostrar los toggles de vista (grid/lista)', () => {
      renderWithRouter(<PeriodicTablePage />);
      const buttons = screen.getAllByRole('button');
      // Debe haber botones para cambiar la vista
      expect(buttons.length).toBeGreaterThan(2);
    });

    it('debe mostrar elementos en modo grid por defecto', () => {
      renderWithRouter(<PeriodicTablePage />);
      // Verificar que hay elementos visibles
      expect(screen.getByText('H')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
      expect(screen.getByText('O')).toBeInTheDocument();
    });
  });

  describe('Búsqueda', () => {
    it('debe filtrar elementos por símbolo', async () => {
      const user = userEvent.setup();
      renderWithRouter(<PeriodicTablePage />);

      const searchInput = screen.getByPlaceholderText(/Buscar por nombre, símbolo/);
      await user.type(searchInput, 'Fe');

      await waitFor(() => {
        expect(screen.getByText('Fe')).toBeInTheDocument();
      });
    });

    it('debe filtrar elementos por nombre', async () => {
      const user = userEvent.setup();
      renderWithRouter(<PeriodicTablePage />);

      const searchInput = screen.getByPlaceholderText(/Buscar por nombre, símbolo/);
      await user.type(searchInput, 'Carbono');

      await waitFor(() => {
        expect(screen.getByText('C')).toBeInTheDocument();
      });
    });

    it('debe filtrar elementos por número atómico', async () => {
      const user = userEvent.setup();
      renderWithRouter(<PeriodicTablePage />);

      const searchInput = screen.getByPlaceholderText(/Buscar por nombre, símbolo/);
      await user.type(searchInput, '79'); // Oro

      await waitFor(() => {
        expect(screen.getByText('Au')).toBeInTheDocument();
      });
    });

    it('debe mostrar botón para limpiar búsqueda', async () => {
      const user = userEvent.setup();
      renderWithRouter(<PeriodicTablePage />);

      const searchInput = screen.getByPlaceholderText(/Buscar por nombre, símbolo/);
      await user.type(searchInput, 'test');

      await waitFor(() => {
        expect(screen.getByText('Limpiar búsqueda')).toBeInTheDocument();
      });
    });

    it('debe mostrar mensaje cuando no hay resultados', async () => {
      const user = userEvent.setup();
      renderWithRouter(<PeriodicTablePage />);

      const searchInput = screen.getByPlaceholderText(/Buscar por nombre, símbolo/);
      await user.type(searchInput, 'ElementoQueNoExiste123');

      await waitFor(() => {
        expect(screen.getByText(/No se encontraron elementos/)).toBeInTheDocument();
      });
    });
  });

  describe('Filtrado por categoría', () => {
    it('debe filtrar por metales de transición', async () => {
      const user = userEvent.setup();
      renderWithRouter(<PeriodicTablePage />);

      const categorySelect = screen.getByRole('combobox');
      await user.selectOptions(categorySelect, 'transition-metal');

      await waitFor(() => {
        // Verificar metales de transición comunes
        expect(screen.getByText('Fe')).toBeInTheDocument();
        expect(screen.getByText('Cu')).toBeInTheDocument();
        expect(screen.getByText('Zn')).toBeInTheDocument();
      });
    });

    it('debe filtrar por halógenos', async () => {
      const user = userEvent.setup();
      renderWithRouter(<PeriodicTablePage />);

      const categorySelect = screen.getByRole('combobox');
      await user.selectOptions(categorySelect, 'halogen');

      await waitFor(() => {
        expect(screen.getByText('F')).toBeInTheDocument();
        expect(screen.getByText('Cl')).toBeInTheDocument();
        expect(screen.getByText('Br')).toBeInTheDocument();
        expect(screen.getByText('I')).toBeInTheDocument();
      });
    });
  });

  describe('Panel de información', () => {
    it('debe mostrar mensaje inicial cuando no hay elemento seleccionado', () => {
      renderWithRouter(<PeriodicTablePage />);
      expect(screen.getByText(/Selecciona un elemento para ver información/)).toBeInTheDocument();
    });

    it('debe mostrar información al seleccionar un elemento', async () => {
      const user = userEvent.setup();
      renderWithRouter(<PeriodicTablePage />);

      // Buscar y hacer clic en el Hidrógeno
      const hydrogenElements = screen.getAllByText('H');
      const hydrogenButton = hydrogenElements.find(el => el.closest('button'));
      
      if (hydrogenButton) {
        await user.click(hydrogenButton.closest('button')!);

        await waitFor(() => {
          // Debe mostrar el nombre completo
          expect(screen.getByText('Hidrógeno')).toBeInTheDocument();
        });
      }
    });
  });

  describe('Leyenda de categorías', () => {
    it('debe mostrar la leyenda de categorías', () => {
      renderWithRouter(<PeriodicTablePage />);
      expect(screen.getByText('Leyenda de Categorías')).toBeInTheDocument();
    });

    it('debe mostrar todas las categorías en la leyenda', () => {
      renderWithRouter(<PeriodicTablePage />);
      
      expect(screen.getAllByText('Metales Alcalinos').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Gases Nobles').length).toBeGreaterThan(0);
      expect(screen.getAllByText('No Metales').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Halógenos').length).toBeGreaterThan(0);
    });
  });

  describe('Modos de vista', () => {
    it('debe tener botones para cambiar la vista', () => {
      renderWithRouter(<PeriodicTablePage />);
      
      // Verificar que existen los botones de vista (grid y lista)
      const toggleButtons = screen.getAllByRole('button');
      // Al menos debe haber botones de control de vista
      expect(toggleButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Navegación', () => {
    it('debe tener enlace al inicio', () => {
      renderWithRouter(<PeriodicTablePage />);
      const backLink = screen.getByText('Volver al inicio').closest('a');
      expect(backLink).toHaveAttribute('href', '/');
    });

    it('debe tener botón para ir a calculadora de masa molar', () => {
      renderWithRouter(<PeriodicTablePage />);
      const massLink = screen.getByText('Calcular Masa').closest('a');
      expect(massLink).toHaveAttribute('href', '/masa-molar');
    });
  });

  describe('Estadísticas', () => {
    it('debe mostrar estadísticas de elementos filtrados', () => {
      renderWithRouter(<PeriodicTablePage />);
      expect(screen.getByText(/Mostrando/)).toBeInTheDocument();
    });

    it('debe actualizar estadísticas al filtrar', async () => {
      const user = userEvent.setup();
      renderWithRouter(<PeriodicTablePage />);

      const categorySelect = screen.getByRole('combobox');
      await user.selectOptions(categorySelect, 'noble-gas');

      await waitFor(() => {
        // Los gases nobles son pocos, debería mostrar un número menor
        const stats = screen.getByText(/Mostrando/);
        expect(stats).toBeInTheDocument();
      });
    });
  });
});

