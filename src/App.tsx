// Este archivo ya no se usa directamente.
// La aplicación ahora usa React Router con el archivo router.tsx
// y el punto de entrada es main.tsx

// Mantener este archivo por compatibilidad, pero redirige al router
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
