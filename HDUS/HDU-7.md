# HDU-7: Modo Oscuro/Claro (Theme Toggle)

> **Prioridad:** 🟢 Baja  
> **Estado:** ⏳ Pendiente  
> **Dependencias:** Ninguna  
> **Estimación:** 3-4 horas  
> **Versión:** `0.8.0` (MINOR)

---

## 📖 Historia de Usuario

**Como** usuario de AtomPop,  
**Quiero** poder cambiar entre modo oscuro y claro,  
**Para que** pueda usar la aplicación cómodamente en diferentes condiciones de luz.

---

## 🎯 Criterios de Aceptación

### Funcionalidad Principal
- [ ] Toggle visible en navbar para cambiar tema
- [ ] Transición suave entre temas
- [ ] Persistencia en localStorage
- [ ] Respetar preferencia del sistema (prefers-color-scheme)
- [ ] Todos los componentes adaptados

### Temas
- [ ] **Modo Oscuro** (actual): Fondo oscuro, textos claros
- [ ] **Modo Claro**: Fondo claro, textos oscuros, colores ajustados

---

## 🎫 Tickets

### TICKET 7.1: Crear Sistema de Temas
**Tipo:** Infraestructura  
**Archivo(s):** `src/contexts/ThemeContext.tsx`, `src/hooks/useTheme.ts`

**Tareas:**
- [ ] Crear ThemeContext con Provider
- [ ] Hook useTheme para acceso fácil
- [ ] Persistencia en localStorage
- [ ] Detectar preferencia del sistema

**Implementación:**
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
}

const useTheme = (): ThemeContextType => {
  // Lógica del hook
};
```

---

### TICKET 7.2: Definir Variables CSS para Temas
**Tipo:** Estilos  
**Archivo(s):** `src/index.css`

**Variables a definir:**
```css
:root {
  /* Modo oscuro (default) */
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-bg-elevated: #334155;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-border: rgba(255, 255, 255, 0.1);
  /* ... más variables */
}

[data-theme="light"] {
  /* Modo claro */
  --color-bg-primary: #f8fafc;
  --color-bg-secondary: #e2e8f0;
  --color-bg-elevated: #ffffff;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-border: rgba(0, 0, 0, 0.1);
  /* ... más variables */
}
```

---

### TICKET 7.3: Crear Componente ThemeToggle
**Tipo:** UI  
**Archivo(s):** `src/components/ui/ThemeToggle.tsx`

**Diseño:**
```
┌─────────────────────┐
│  [🌙]  ←→  [☀️]    │  Toggle animado
└─────────────────────┘
```

**Funcionalidades:**
- [ ] Icono de sol/luna con animación
- [ ] Tooltip con tema actual
- [ ] Transición suave al cambiar

---

### TICKET 7.4: Adaptar Componentes Existentes
**Tipo:** Refactor  
**Archivo(s):** Múltiples

**Componentes a adaptar:**
- [ ] MainLayout (navbar, footer)
- [ ] Button (todas las variantes)
- [ ] ChemicalInput
- [ ] ResultCard
- [ ] ElementBadge
- [ ] Todas las páginas
- [ ] Cards glassmorphism
- [ ] Burbujas decorativas

---

### TICKET 7.5: Adaptar Colores Neón para Modo Claro
**Tipo:** Diseño  
**Archivo(s):** `src/index.css`

**Consideraciones:**
- Los colores neón (amber, cyan, green, purple) deben verse bien en ambos modos
- En modo claro, usar versiones más saturadas/oscuras
- Mantener la identidad visual "Flint Loco"

---

### TICKET 7.6: Tests
**Tipo:** Testing  
**Archivo(s):** `src/hooks/useTheme.test.ts`, `cypress/e2e/hdu-7-theme.cy.ts`

**Tests:**
```typescript
describe('useTheme', () => {
  it('debe inicializar con tema del sistema');
  it('debe cambiar entre light y dark');
  it('debe persistir en localStorage');
  it('debe aplicar clase al document');
});
```

---

## 📁 Estructura de Archivos

```
src/
├── contexts/
│   └── ThemeContext.tsx      # NUEVO
├── hooks/
│   ├── useTheme.ts           # NUEVO
│   └── useTheme.test.ts      # NUEVO
├── components/ui/
│   └── ThemeToggle.tsx       # NUEVO
└── index.css                 # MODIFICAR
```

---

## 🎨 Paleta de Colores

### Modo Oscuro (Actual)
| Elemento | Color |
|----------|-------|
| Fondo principal | `#0f172a` (slate-900) |
| Fondo secundario | `#1e293b` (slate-800) |
| Texto principal | `#f8fafc` (slate-50) |
| Texto secundario | `#94a3b8` (slate-400) |

### Modo Claro (Nuevo)
| Elemento | Color |
|----------|-------|
| Fondo principal | `#f8fafc` (slate-50) |
| Fondo secundario | `#e2e8f0` (slate-200) |
| Texto principal | `#0f172a` (slate-900) |
| Texto secundario | `#475569` (slate-600) |

---

## 📊 Métricas Esperadas

| Métrica | Valor |
|---------|-------|
| Tests unitarios | ~8 |
| Tests E2E | ~5 |
| Archivos nuevos | 4 |
| Archivos modificados | 10+ |

---

## ⚠️ Consideraciones

1. **Glassmorphism:** El efecto glass puede verse diferente en modo claro
2. **Burbujas:** Ajustar opacidad para modo claro
3. **Gráficos:** Los colores del PieChart deben funcionar en ambos modos
4. **Contraste:** Verificar accesibilidad WCAG en ambos temas

---

## ✅ Checklist Final

- [ ] TICKET 7.1 completado (Sistema de temas)
- [ ] TICKET 7.2 completado (Variables CSS)
- [ ] TICKET 7.3 completado (ThemeToggle)
- [ ] TICKET 7.4 completado (Adaptar componentes)
- [ ] TICKET 7.5 completado (Colores neón)
- [ ] TICKET 7.6 completado (Tests)
- [ ] Toggle visible en navbar
- [ ] Persistencia funciona
- [ ] Responsive verificado
- [ ] Accesibilidad verificada
- [ ] CHANGELOG actualizado
- [ ] README actualizado

