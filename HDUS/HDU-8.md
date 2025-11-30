# HDU-8: PWA (Progressive Web App)

> **Prioridad:** 🟡 Media  
> **Estado:** ⏳ Pendiente  
> **Dependencias:** Ninguna  
> **Estimación:** 4-5 horas  
> **Versión:** `0.9.0` (MINOR)

---

## 📖 Historia de Usuario

**Como** estudiante de química,  
**Quiero** instalar AtomPop como una aplicación en mi dispositivo,  
**Para que** pueda usarla offline y acceder rápidamente sin abrir el navegador.

---

## 🎯 Criterios de Aceptación

### Funcionalidad Principal
- [ ] La app puede instalarse en dispositivos móviles y desktop
- [ ] Funciona offline (al menos las funcionalidades básicas)
- [ ] Icono y splash screen personalizados
- [ ] Se actualiza automáticamente cuando hay nueva versión

### Requisitos PWA
- [ ] Manifest.json válido
- [ ] Service Worker registrado
- [ ] HTTPS (ya cumplido con Vercel)
- [ ] Responsive design (ya cumplido)

---

## 🎫 Tickets

### TICKET 8.1: Configurar Vite PWA Plugin
**Tipo:** Configuración  
**Archivo(s):** `vite.config.ts`, `package.json`

**Tareas:**
- [ ] Instalar `vite-plugin-pwa`
- [ ] Configurar plugin en vite.config.ts
- [ ] Definir estrategia de cache

**Configuración:**
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'AtomPop - Calculadora de Química',
        short_name: 'AtomPop',
        description: 'Calculadora educativa de química',
        theme_color: '#f59e0b',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

---

### TICKET 8.2: Crear Iconos y Assets
**Tipo:** Diseño  
**Archivo(s):** `public/`

**Assets necesarios:**
- [ ] `favicon.ico` - 32x32
- [ ] `favicon-16x16.png` - 16x16
- [ ] `favicon-32x32.png` - 32x32
- [ ] `apple-touch-icon.png` - 180x180
- [ ] `pwa-192x192.png` - 192x192
- [ ] `pwa-512x512.png` - 512x512
- [ ] `mask-icon.svg` - Safari pinned tab

**Diseño del icono:**
```
┌─────────────────┐
│                 │
│    🧪 + ⚛️      │  Combinación flask + átomo
│   "AtomPop"     │  Estilo Flint Loco
│                 │
└─────────────────┘
```

Colores:
- Fondo: `#0f172a` (slate-900)
- Flask: `#f59e0b` (amber-500)
- Átomo: `#06b6d4` (cyan-500)

---

### TICKET 8.3: Configurar Manifest.json
**Tipo:** Configuración  
**Archivo(s):** Auto-generado por vite-plugin-pwa

**Propiedades importantes:**
```json
{
  "name": "AtomPop - Calculadora de Química",
  "short_name": "AtomPop",
  "description": "Calculadora educativa de química con estilo Flint Loco",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#f59e0b",
  "orientation": "any",
  "categories": ["education", "utilities"],
  "lang": "es"
}
```

---

### TICKET 8.4: Implementar Estrategia de Cache
**Tipo:** Configuración  
**Archivo(s):** `vite.config.ts`

**Estrategia:**
- **Cache First:** Para assets estáticos (CSS, JS, imágenes)
- **Network First:** Para datos dinámicos (si hubiera API)
- **Stale While Revalidate:** Para HTML

```typescript
workbox: {
  globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
        }
      }
    }
  ]
}
```

---

### TICKET 8.5: Agregar Prompt de Instalación
**Tipo:** UI  
**Archivo(s):** `src/components/ui/InstallPrompt.tsx`

**Funcionalidades:**
- [ ] Detectar si la app puede instalarse
- [ ] Mostrar banner/modal de instalación
- [ ] Botón "Instalar" que trigger el prompt nativo
- [ ] Opción "Recordar más tarde"
- [ ] No mostrar si ya está instalada

**Diseño:**
```
┌─────────────────────────────────────────────────┐
│ 📲 ¡Instala AtomPop!                       [X] │
│                                                 │
│ Accede más rápido y usa la app offline.        │
│                                                 │
│ [ Instalar ]  [ Ahora no ]                     │
└─────────────────────────────────────────────────┘
```

---

### TICKET 8.6: Notificación de Actualización
**Tipo:** UI  
**Archivo(s):** `src/components/ui/UpdatePrompt.tsx`

**Funcionalidades:**
- [ ] Detectar cuando hay nueva versión
- [ ] Mostrar toast/banner de actualización
- [ ] Botón "Actualizar ahora"
- [ ] Recargar la app para aplicar cambios

---

### TICKET 8.7: Tests y Verificación
**Tipo:** Testing  
**Archivo(s):** Lighthouse, manual testing

**Verificaciones:**
- [ ] Lighthouse PWA score > 90
- [ ] Instalable en Chrome Android
- [ ] Instalable en Safari iOS
- [ ] Instalable en Chrome Desktop
- [ ] Funciona offline (calculadoras básicas)
- [ ] Service Worker registrado correctamente

---

## 📁 Estructura de Archivos

```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── pwa-192x192.png
├── pwa-512x512.png
└── mask-icon.svg

src/components/ui/
├── InstallPrompt.tsx         # NUEVO
└── UpdatePrompt.tsx          # NUEVO

vite.config.ts                # MODIFICAR
```

---

## 📊 Métricas Esperadas

| Métrica | Valor |
|---------|-------|
| Lighthouse PWA | > 90 |
| Tiempo de carga offline | < 1s |
| Tamaño del cache | < 5MB |
| Archivos nuevos | 3 |
| Assets nuevos | 7 |

---

## ⚠️ Consideraciones

1. **Service Worker:** Puede causar problemas de cache durante desarrollo
2. **iOS:** Safari tiene limitaciones con PWAs
3. **Actualizaciones:** Los usuarios deben recargar para ver cambios
4. **Offline:** Solo funcionalidades que no requieren servidor

---

## ✅ Checklist Final

- [ ] TICKET 8.1 completado (Vite PWA Plugin)
- [ ] TICKET 8.2 completado (Iconos)
- [ ] TICKET 8.3 completado (Manifest)
- [ ] TICKET 8.4 completado (Cache)
- [ ] TICKET 8.5 completado (Install Prompt)
- [ ] TICKET 8.6 completado (Update Prompt)
- [ ] TICKET 8.7 completado (Verificación)
- [ ] Lighthouse PWA > 90
- [ ] Funciona offline
- [ ] CHANGELOG actualizado
- [ ] README actualizado

