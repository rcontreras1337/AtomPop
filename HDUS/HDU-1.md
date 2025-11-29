# HDU-1: Calculadora de Masa Molar

> **Prioridad:** 🔴 Alta  
> **Estado:** ✅ Completado  
> **Dependencias:** HDU-0 (completa)  
> **Estimación:** 3-4 horas  
> **Versión:** `0.2.0` (MINOR)  
> **Fecha Completado:** 2024-11-29

---

## 📖 Historia de Usuario

**Como** estudiante de química,  
**Quiero** ingresar una fórmula química y obtener su masa molar con el desglose de cada elemento,  
**Para que** pueda entender cómo se calcula y verificar mis ejercicios de clase.

---

## 🎯 Criterios de Aceptación

- [x] Puedo escribir una fórmula química en un campo de texto
- [x] La fórmula se valida en tiempo real
- [x] Si la fórmula es inválida, veo un mensaje de error claro
- [x] Si la fórmula es válida, veo:
  - La masa molar total en g/mol
  - El desglose elemento por elemento
  - Una animación atractiva al mostrar el resultado
- [x] Puedo copiar el resultado al portapapeles
- [x] La interfaz es responsive (funciona en móvil)

---

## 🎫 Tickets

### TICKET 1.1: Crear Página de Masa Molar ✅
**Tipo:** UI/Página  
**Archivo(s):** `src/pages/MolarMassPage.tsx`

**Tareas:**
- [x] Crear estructura base de la página
- [x] Agregar título y descripción explicativa
- [x] Incluir el componente `ChemicalInput` para la fórmula
- [x] Agregar botón "Calcular"
- [x] Zona de resultados (inicialmente vacía)

**Wireframe:**
```
┌─────────────────────────────────────┐
│         🧪 Masa Molar               │
│   "Calcula el peso de cualquier     │
│         molécula"                   │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  Ingresa tu fórmula: H2O    │    │
│  └─────────────────────────────┘    │
│         [ 🔬 Calcular ]             │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │     RESULTADO               │    │
│  │     18.015 g/mol            │    │
│  │  ─────────────────────────  │    │
│  │  H × 2 = 2.016 g/mol        │    │
│  │  O × 1 = 15.999 g/mol       │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Definición de Hecho:**
```
✓ Página renderiza sin errores
✓ Navegación funciona desde el menú
✓ Layout responsive
```

---

### TICKET 1.2: Implementar Lógica de Cálculo ✅
**Tipo:** Integración  
**Archivo(s):** `src/pages/MolarMassPage.tsx`, `src/features/molar-mass/useMolarMass.ts`

**Tareas:**
- [x] Crear hook `useMolarMass` que encapsule la lógica
- [x] Conectar input con el parser de fórmulas
- [x] Llamar a `calculateMolarMass` del engine
- [x] Manejar estados: `idle`, `calculating`, `success`, `error`
- [x] Guardar historial de cálculos en estado local (últimos 5)

**Hook Interface:**
```typescript
interface UseMolarMassReturn {
  formula: string;
  setFormula: (f: string) => void;
  result: MolarMassResult | null;
  error: string | null;
  isCalculating: boolean;
  calculate: () => void;
  clear: () => void;
  history: MolarMassResult[];
}
```

**Definición de Hecho:**
```
✓ H2O retorna 18.015 g/mol
✓ Fórmulas inválidas muestran error
✓ Historial se mantiene entre cálculos
```

---

### TICKET 1.3: Crear Componente de Desglose ✅
**Tipo:** UI  
**Archivo(s):** `src/features/molar-mass/MassBreakdown.tsx`

**Tareas:**
- [x] Crear componente que muestre el desglose paso a paso
- [x] Cada elemento muestra:
  - Badge con símbolo y color
  - Cantidad (subíndice en fórmula)
  - Masa atómica individual
  - Subtotal (masa × cantidad)
- [x] Línea final con el total
- [x] Animación de entrada escalonada (stagger)

**Ejemplo Visual:**
```
┌────────────────────────────────────┐
│  [H]  Hidrógeno                    │
│       1.008 g/mol × 2 = 2.016      │
├────────────────────────────────────┤
│  [O]  Oxígeno                      │
│       15.999 g/mol × 1 = 15.999    │
├────────────────────────────────────┤
│  TOTAL           =    18.015 g/mol │
└────────────────────────────────────┘
```

**Definición de Hecho:**
```
✓ Componente muestra todos los elementos
✓ Animaciones funcionan correctamente
✓ Colores CPK se muestran correctamente
```

---

### TICKET 1.4: Agregar Validación Visual ✅
**Tipo:** UX  
**Archivo(s):** `src/pages/MolarMassPage.tsx`, `src/components/ui/ChemicalInput.tsx`

**Tareas:**
- [x] Validar fórmula mientras el usuario escribe (debounce 300ms)
- [x] Mostrar indicador de estado:
  - 🟢 Verde: Fórmula válida
  - 🔴 Rojo: Fórmula inválida
  - ⚪ Neutro: Campo vacío
- [x] Animación de "shake" cuando hay error
- [x] Tooltip con mensaje de error específico

**Mensajes de Error:**
| Caso | Mensaje |
|------|---------|
| Elemento no existe | "El elemento 'Xx' no existe en la tabla periódica" |
| Formato inválido | "Formato inválido. Ejemplo: H2O, NaCl, Ca(OH)2" |
| Paréntesis sin cerrar | "Falta cerrar paréntesis" |
| Campo vacío | "Ingresa una fórmula química" |

**Definición de Hecho:**
```
✓ Feedback visual inmediato
✓ Mensajes son claros y útiles
✓ Animaciones no son molestas
```

---

### TICKET 1.5: Agregar Funcionalidades Extra ✅
**Tipo:** UX/Feature  
**Archivo(s):** `src/pages/MolarMassPage.tsx`

**Tareas:**
- [x] Botón "Copiar resultado" con feedback visual
- [x] Botón "Limpiar" para resetear
- [x] Mostrar fórmulas de ejemplo clickeables:
  - H₂O (Agua)
  - NaCl (Sal)
  - C₆H₁₂O₆ (Glucosa)
  - H₂SO₄ (Ácido Sulfúrico)
- [x] Al clickear un ejemplo, se llena el input automáticamente
- [x] Historial de últimos 5 cálculos (clickeables)

**Definición de Hecho:**
```
✓ Copiar funciona y muestra confirmación
✓ Ejemplos llenan el input correctamente
✓ Historial persiste durante la sesión
```

---

## 🎨 Guía de Estilo Específica

### Colores de la Página
- **Fondo de tarjeta:** `bg-slate-800/50` con `backdrop-blur`
- **Borde resultado:** `border-amber-500/30`
- **Texto resultado:** `text-amber-400` para el número grande
- **Texto secundario:** `text-slate-400`

### Animaciones
```tsx
// Entrada del resultado
const resultAnimation = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: "spring", damping: 15 }
};

// Stagger de elementos
const containerAnimation = {
  animate: { transition: { staggerChildren: 0.1 } }
};
```

---

## 📁 Estructura de Archivos

```
src/features/molar-mass/
├── useMolarMass.ts        # Hook principal
├── MassBreakdown.tsx      # Componente de desglose
└── index.ts               # Exports
```

---

---

## 🧪 Tests Requeridos

### TICKET 1.6: Tests Unitarios ✅
**Tipo:** Testing  
**Archivo(s):** `src/features/molar-mass/useMolarMass.test.ts`, `src/features/molar-mass/MassBreakdown.test.tsx`

---

### TICKET 1.7: Tests E2E de Masa Molar ✅
**Tipo:** Testing E2E  
**Archivo(s):** `cypress/e2e/hdu-1-molar-mass.cy.ts`

**Escenarios probados:**
- [x] Página carga correctamente
- [x] Calcular fórmulas válidas (H2O, NaCl, Ca(OH)2, etc.)
- [x] Mostrar desglose por elemento
- [x] Manejo de errores (fórmulas inválidas)
- [x] Ejemplos clickeables funcionan
- [x] Botón limpiar funciona
- [x] Copiar resultado muestra feedback
- [x] Historial de cálculos funciona
- [x] Tecla Enter calcula
- [x] Responsive en móvil y tablet

**Ejecución:**
```bash
npm run e2e  # Abre Cypress UI (no headless)
```

**Definición de Hecho:**
```
✓ Todos los tests E2E de masa molar pasan
✓ La calculadora funciona en todos los viewports
```

**Tests a crear:**

#### Hook `useMolarMass`
```typescript
describe('useMolarMass', () => {
  it('debe inicializar con estado idle');
  it('debe actualizar formula al llamar setFormula');
  it('debe calcular masa molar correctamente');
  it('debe manejar errores de fórmula inválida');
  it('debe guardar en historial tras cálculo exitoso');
  it('debe limpiar estado al llamar clear');
  it('debe limitar historial a 5 elementos');
});
```

#### Componente `MassBreakdown`
```typescript
describe('MassBreakdown', () => {
  it('debe renderizar todos los elementos del breakdown');
  it('debe mostrar colores CPK correctos');
  it('debe mostrar el total correctamente');
  it('debe manejar breakdown vacío');
});
```

**Definición de Hecho:**
```
✓ Mínimo 10 tests creados
✓ Todos los tests pasan
✓ Cobertura > 80% para archivos nuevos
```

---

## ✅ Checklist Final HDU-1

- [x] TICKET 1.1 completado
- [x] TICKET 1.2 completado
- [x] TICKET 1.3 completado
- [x] TICKET 1.4 completado
- [x] TICKET 1.5 completado
- [x] **TICKET 1.6 completado (Tests)**
- [x] Página accesible desde navegación
- [x] Funciona en móvil
- [x] Sin errores en consola
- [x] Todos los tests pasan (`npm run test:run`)
- [x] CHANGELOG.md actualizado
- [x] Versión actualizada a `0.2.0`
- [x] Commit realizado con tag `v0.2.0`

---

## 📊 Métricas Finales

| Métrica | Valor |
|---------|-------|
| Tests nuevos | 28 |
| Tests totales | 111 |
| Archivos creados | 5 |
| Tickets completados | 6/6 |

