import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true, // Grabar videos de los tests
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // Implementar eventos de node aquí si es necesario
    },
  },
  // NO usar headless por defecto para ver los tests
  // Se ejecutan con: npx cypress open
});

