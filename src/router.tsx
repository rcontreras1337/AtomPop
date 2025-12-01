import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { 
  HomePage, 
  MolarMassPage, 
  ConverterPage, 
  CompositionPage, 
  EmpiricalPage,
  PeriodicTablePage,
} from './pages';

// Definición de rutas de la aplicación
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'masa-molar',
        element: <MolarMassPage />,
      },
      {
        path: 'conversor',
        element: <ConverterPage />,
      },
      {
        path: 'composicion',
        element: <CompositionPage />,
      },
      {
        path: 'formula-empirica',
        element: <EmpiricalPage />,
      },
      {
        path: 'tabla-periodica',
        element: <PeriodicTablePage />,
      },
    ],
  },
]);

// Mapa de rutas para navegación
export const routes = {
  home: '/',
  molarMass: '/masa-molar',
  converter: '/conversor',
  composition: '/composicion',
  empirical: '/formula-empirica',
  periodicTable: '/tabla-periodica',
} as const;

// Información de cada ruta para el menú
export const navItems = [
  { path: routes.molarMass, label: 'Masa Molar', icon: 'beaker' },
  { path: routes.converter, label: 'Conversor', icon: 'test-tubes' },
  { path: routes.composition, label: 'Composición', icon: 'sparkles' },
  { path: routes.empirical, label: 'Fórmulas', icon: 'atom' },
  { path: routes.periodicTable, label: 'Tabla', icon: 'grid' },
] as const;

