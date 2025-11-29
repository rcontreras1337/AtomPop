# HDU-2: Conversor Moles/Gramos/Átomos

> **Prioridad:** 🔴 Alta  
> **Estado:** ⏳ Pendiente  
> **Dependencias:** HDU-0 (completa)  
> **Estimación:** 3-4 horas  
> **Versión:** `0.3.0` (MINOR)

---

## 📖 Historia de Usuario

**Como** estudiante de química,  
**Quiero** convertir entre moles, gramos y número de partículas de forma interactiva,  
**Para que** pueda resolver problemas de estequiometría sin hacer cálculos manuales.

---

## 🎯 Criterios de Aceptación

- [ ] Puedo ingresar una fórmula química como referencia
- [ ] Puedo escribir en cualquiera de los 3 campos (moles, gramos, átomos)
- [ ] Los otros 2 campos se calculan automáticamente al escribir
- [ ] Los números muy grandes se muestran en notación científica
- [ ] Veo la masa molar del compuesto como referencia
- [ ] No se permiten valores negativos
- [ ] La interfaz es clara sobre qué unidad estoy ingresando

---

## 🎫 Tickets

### TICKET 2.1: Crear Página del Conversor
**Tipo:** UI/Página  
**Archivo(s):** `src/pages/ConverterPage.tsx`

**Tareas:**
- [ ] Crear estructura base de la página
- [ ] Sección superior: Input de fórmula química
- [ ] Sección media: 3 inputs conectados visualmente
- [ ] Indicadores de unidad claros (mol, g, partículas)
- [ ] Visualización de la masa molar calculada

**Wireframe:**
```
┌─────────────────────────────────────┐
│         🔄 Conversor                │
│   "Convierte entre moles, gramos    │
│         y partículas"               │
├─────────────────────────────────────┤
│  Compuesto: [____H2O____]           │
│  Masa Molar: 18.015 g/mol           │
├─────────────────────────────────────┤
│                                     │
│   ┌─────────┐                       │
│   │  MOLES  │ ←──────┐              │
│   │  1.5    │        │              │
│   │   mol   │        │              │
│   └─────────┘        │              │
│        │             │              │
│        ▼             │              │
│   ┌─────────┐        │              │
│   │ GRAMOS  │ ◄──────┼──────┐       │
│   │  27.02  │        │      │       │
│   │    g    │        │      │       │
│   └─────────┘        │      │       │
│        │             │      │       │
│        ▼             │      │       │
│   ┌─────────┐        │      │       │
│   │ ÁTOMOS  │ ◄──────┘      │       │
│   │ 9.03×10²³│ ─────────────┘       │
│   │partículas│                      │
│   └─────────┘                       │
│                                     │
└─────────────────────────────────────┘
```

**Definición de Hecho:**
```
✓ Página renderiza correctamente
✓ Los 3 campos son visibles y accesibles
✓ La relación visual entre campos es clara
```

---

### TICKET 2.2: Implementar Lógica de Conversión Reactiva
**Tipo:** Lógica  
**Archivo(s):** `src/features/converter/useConverter.ts`

**Tareas:**
- [ ] Crear hook `useConverter`
- [ ] Implementar conversiones bidireccionales:
  - Moles → Gramos → Átomos
  - Gramos → Moles → Átomos
  - Átomos → Moles → Gramos
- [ ] Detectar cuál campo está siendo editado
- [ ] Calcular los otros 2 campos automáticamente
- [ ] Manejar el estado de la fórmula
- [ ] Usar debounce de 150ms para evitar recálculos excesivos

**Hook Interface:**
```typescript
type ConverterField = 'moles' | 'grams' | 'particles';

interface UseConverterReturn {
  formula: string;
  setFormula: (f: string) => void;
  molarMass: number | null;
  
  moles: string;
  grams: string;
  particles: string;
  
  activeField: ConverterField | null;
  
  setMoles: (value: string) => void;
  setGrams: (value: string) => void;
  setParticles: (value: string) => void;
  
  clear: () => void;
  isValid: boolean;
  error: string | null;
}
```

**Fórmulas de Conversión:**
```
Gramos = Moles × Masa_Molar
Moles = Gramos / Masa_Molar
Partículas = Moles × Avogadro
Moles = Partículas / Avogadro
```

**Definición de Hecho:**
```
✓ Escribir en un campo actualiza los otros
✓ Los cálculos son precisos
✓ No hay loops infinitos de actualización
```

---

### TICKET 2.3: Crear Inputs Conectados Visualmente
**Tipo:** UI  
**Archivo(s):** `src/features/converter/ConverterInput.tsx`

**Tareas:**
- [ ] Crear componente de input especializado
- [ ] Mostrar icono/emoji representativo de cada unidad
- [ ] Indicador visual de "campo activo" vs "campo calculado"
- [ ] Animación suave cuando el valor cambia
- [ ] Manejo de notación científica para números grandes

**Props:**
```typescript
interface ConverterInputProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
  isActive: boolean;
  isCalculated: boolean;
}
```

**Indicadores Visuales:**
| Estado | Estilo |
|--------|--------|
| Activo (escribiendo) | Borde cyan brillante, fondo ligeramente iluminado |
| Calculado | Borde verde sutil, badge "calculado" |
| Error | Borde rojo, input deshabilitado |

**Definición de Hecho:**
```
✓ Es claro cuál campo está siendo editado
✓ Los valores calculados se ven diferentes
✓ Transiciones son suaves
```

---

### TICKET 2.4: Manejar Notación Científica
**Tipo:** Lógica/UI  
**Archivo(s):** `src/utils/formatters.ts`, `src/features/converter/ConverterInput.tsx`

**Tareas:**
- [ ] Crear función `formatScientific(num: number): string`
  - Números < 0.001 → Notación científica
  - Números > 1,000,000 → Notación científica
  - Otros → Formato normal con separadores
- [ ] Mostrar exponente con superscript HTML (`6.02 × 10²³`)
- [ ] Permitir input en notación científica (`1e23`, `1E23`)
- [ ] Tooltip que muestra el número completo al hover

**Ejemplos:**
| Input | Display |
|-------|---------|
| 0.000001 | 1 × 10⁻⁶ |
| 6.022e23 | 6.02 × 10²³ |
| 1500 | 1,500 |
| 0.5 | 0.5 |

**Definición de Hecho:**
```
✓ Números de Avogadro se muestran legibles
✓ El usuario puede ingresar "6e23" o "6E23"
✓ Los números pequeños también se formatean bien
```

---

### TICKET 2.5: Agregar Validaciones y UX
**Tipo:** UX  
**Archivo(s):** `src/features/converter/useConverter.ts`, `src/pages/ConverterPage.tsx`

**Tareas:**
- [ ] No permitir valores negativos (ignorar el signo menos)
- [ ] Validar que la fórmula exista antes de permitir conversiones
- [ ] Mostrar mensaje si no hay fórmula ingresada
- [ ] Botón "Intercambiar valores" (opcional, nice-to-have)
- [ ] Botón "Limpiar todo"
- [ ] Mostrar compuestos de ejemplo para probar

**Mensajes de Estado:**
| Estado | Mensaje |
|--------|---------|
| Sin fórmula | "Ingresa un compuesto para comenzar" |
| Fórmula inválida | "Fórmula no reconocida" |
| Todo vacío | "Escribe en cualquier campo" |
| Cálculo exitoso | (Sin mensaje, solo los valores) |

**Definición de Hecho:**
```
✓ No se pueden ingresar negativos
✓ Estados vacíos tienen guía clara
✓ Ejemplos funcionan correctamente
```

---

## 🎨 Guía de Estilo Específica

### Diseño de los Conectores
```
Los 3 inputs deben estar conectados visualmente por líneas/flechas
que indiquen el flujo de la conversión.

Usar SVG o CSS para crear las líneas de conexión.
Color: cyan-500/30 para las líneas
Puntas de flecha bidireccionales
```

### Colores por Tipo de Campo
- **Moles:** Cyan (`text-cyan-400`, `border-cyan-500`)
- **Gramos:** Amber (`text-amber-400`, `border-amber-500`)
- **Partículas:** Purple (`text-purple-400`, `border-purple-500`)

### Animación de Actualización
```tsx
// Cuando un valor calculado cambia
const valueAnimation = {
  initial: { opacity: 0.5, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2 }
};
```

---

## 📁 Estructura de Archivos

```
src/features/converter/
├── useConverter.ts        # Hook principal
├── ConverterInput.tsx     # Input especializado
├── ConverterConnector.tsx # Líneas de conexión visual
└── index.ts               # Exports
```

---

---

## 🧪 Tests Requeridos

### TICKET 2.6: Tests Unitarios
**Tipo:** Testing  
**Archivo(s):** `src/features/converter/useConverter.test.ts`

**Tests a crear:**
```typescript
describe('useConverter', () => {
  it('debe inicializar con valores vacíos');
  it('debe calcular moles desde gramos correctamente');
  it('debe calcular gramos desde moles correctamente');
  it('debe calcular partículas desde moles');
  it('debe actualizar campos relacionados automáticamente');
  it('debe manejar fórmulas inválidas');
  it('debe formatear notación científica correctamente');
  it('debe prevenir valores negativos');
});
```

**Definición de Hecho:**
```
✓ Mínimo 8 tests creados
✓ Todos los tests pasan
✓ Cobertura > 80% para archivos nuevos
```

---

### TICKET 2.7: Tests E2E del Conversor
**Tipo:** Testing E2E  
**Archivo(s):** `cypress/e2e/hdu-2-converter.cy.ts`

**Escenarios a probar:**
- [ ] Página carga correctamente
- [ ] Ingresar fórmula válida muestra masa molar
- [ ] Escribir en moles actualiza gramos y partículas
- [ ] Escribir en gramos actualiza moles y partículas
- [ ] Escribir en partículas actualiza moles y gramos
- [ ] Notación científica se muestra correctamente
- [ ] No permite valores negativos
- [ ] Limpiar campos funciona
- [ ] Responsive en móvil y tablet

**Ejecución:**
```bash
npm run e2e  # Abre Cypress UI (no headless)
```

**Definición de Hecho:**
```
✓ Todos los tests E2E del conversor pasan
✓ El conversor funciona en todos los viewports
```

---

## ✅ Checklist Final HDU-2

- [ ] TICKET 2.1 completado
- [ ] TICKET 2.2 completado
- [ ] TICKET 2.3 completado
- [ ] TICKET 2.4 completado
- [ ] TICKET 2.5 completado
- [ ] **TICKET 2.6 completado (Tests Unitarios)**
- [ ] **TICKET 2.7 completado (Tests E2E)**
- [ ] Conversiones son precisas (verificar con calculadora)
- [ ] Notación científica funciona correctamente
- [ ] Página accesible desde navegación
- [ ] Funciona en móvil
- [ ] Sin errores en consola
- [ ] Todos los tests pasan (`npm run test:run`)
- [ ] Tests E2E pasan (`npm run e2e`)
- [ ] CHANGELOG.md actualizado
- [ ] Versión actualizada a `0.3.0`
- [ ] Commit realizado con tag `v0.3.0`

