/**
 * Configuración de versión de la aplicación
 * Se lee automáticamente desde package.json
 */

// Vite permite importar JSON directamente
import packageJson from '../../package.json';

export const APP_VERSION = packageJson.version;
export const APP_NAME = packageJson.name;

