# HDU-3: Composición Porcentual

> **Prioridad:** 🟡 Media  
> **Estado:** ✅ Completado  
> **Fecha Completado:** 2024-11-30  
> **Dependencias:** HDU-0 (completa), HDU-1 (recomendado)  
> **Estimación:** 2-3 horas  
> **Versión:** `0.4.0` (MINOR)

---

## 📖 Historia de Usuario

**Como** estudiante de química,  
**Quiero** ver la composición porcentual de un compuesto de forma visual,  
**Para que** pueda entender qué proporción de masa aporta cada elemento.

---

## 🎯 Criterios de Aceptación

- [ ] Puedo ingresar una fórmula química
- [ ] Veo un gráfico circular (pie chart) con los porcentajes
- [ ] Cada segmento tiene el color CPK del elemento
- [ ] Puedo ver los porcentajes también en formato lista
- [ ] Los porcentajes suman 100% (o muy cerca con redondeo)
- [ ] Hay animación al generar el gráfico

---

## 🎫 Tickets

### TICKET 3.1: Crear Página de Composición
**Tipo:** UI/Página  
**Archivo(s):** `src/pages/CompositionPage.tsx`

**Tareas:**
- [ ] Crear estructura base de la página
- [ ] Input de fórmula química
- [ ] Zona para el gráfico circular
- [ ] Zona para la lista de porcentajes
- [ ] Título y descripción explicativa

**Wireframe:**
```
┌─────────────────────────────────────┐
│      📊 Composición Porcentual      │
│   "¿Cuánto pesa cada elemento?"     │
├─────────────────────────────────────┤
│  Compuesto: [____H2SO4____]         │
├─────────────────────────────────────┤
│                                     │
│      ┌───────────────┐              │
│      │    ╭─────╮    │   H:  2.06%  │
│      │   ╱  S    ╲   │   S: 32.69%  │
│      │  │   32%   │  │   O: 65.25%  │
│      │  │    H    │  │   ────────── │
│      │   ╲  O    ╱   │   Total:100% │
│      │    ╰─────╯    │              │
│      └───────────────┘              │
│                                     │
└─────────────────────────────────────┘
```

**Definición de Hecho:**
```
✓ Página renderiza correctamente
✓ Layout divide espacio para gráfico y lista
✓ Responsive: en móvil, gráfico arriba y lista abajo
```

---

### TICKET 3.2: Implementar Cálculo de Porcentajes
**Tipo:** Lógica  
**Archivo(s):** `src/utils/chemistryEngine.ts`, `src/features/composition/useComposition.ts`

**Tareas:**
- [ ] Crear función `calculateComposition(formula: string): CompositionResult`
- [ ] Calcular % de masa de cada elemento
- [ ] Crear hook `useComposition` para la página
- [ ] Manejar errores de fórmula inválida

**Fórmula:**
```
% Elemento = (Masa_elemento_total / Masa_molar_compuesto) × 100

Donde:
Masa_elemento_total = Masa_atómica × Cantidad_en_fórmula
```

**Tipos:**
```typescript
interface ElementComposition {
  symbol: string;
  name: string;
  count: number;
  massContribution: number;  // En gramos
  percentage: number;        // 0-100
  color: string;            // Hex del CPK
}

interface CompositionResult {
  formula: string;
  totalMass: number;
  elements: ElementComposition[];
  isValid: boolean;
  error?: string;
}
```

**Ejemplo H2SO4:**
| Elemento | Masa Total | % |
|----------|-----------|---|
| H | 2 × 1.008 = 2.016 | 2.06% |
| S | 1 × 32.06 = 32.06 | 32.69% |
| O | 4 × 15.999 = 63.996 | 65.25% |
| **Total** | 98.072 g/mol | 100% |

**Definición de Hecho:**
```
✓ Porcentajes son correctos
✓ Suma total ≈ 100% (tolerancia de redondeo)
✓ Colores CPK se incluyen en el resultado
```

---

### TICKET 3.3: Crear Gráfico Circular Animado
**Tipo:** UI  
**Archivo(s):** `src/features/composition/PieChart.tsx`

**Tareas:**
- [ ] Crear componente de gráfico circular con SVG
- [ ] Usar colores CPK de cada elemento
- [ ] Animación de entrada (los segmentos "crecen" desde 0)
- [ ] Hover sobre segmento muestra tooltip con detalles
- [ ] Centro del gráfico muestra la fórmula o masa total

**Props:**
```typescript
interface PieChartProps {
  data: ElementComposition[];
  size?: number;
  showLabels?: boolean;
  onSegmentHover?: (element: ElementComposition | null) => void;
}
```

**Detalles de Implementación:**
```
- Usar SVG con elementos <path> para cada segmento
- Calcular arcos con funciones trigonométricas
- Framer Motion para animar el stroke-dasharray
- O usar librería ligera como recharts (si se aprueba)
```

**Definición de Hecho:**
```
✓ Gráfico se renderiza correctamente
✓ Colores corresponden a los elementos
✓ Animación es fluida
✓ Funciona con 1 elemento (círculo completo)
✓ Funciona con muchos elementos (10+)
```

---

### TICKET 3.4: Crear Lista de Porcentajes
**Tipo:** UI  
**Archivo(s):** `src/features/composition/CompositionList.tsx`

**Tareas:**
- [ ] Crear componente de lista con barras de progreso
- [ ] Cada fila muestra:
  - Badge del elemento con color
  - Nombre del elemento
  - Barra de progreso visual
  - Porcentaje numérico
- [ ] Ordenar por porcentaje (mayor primero)
- [ ] Animación de entrada escalonada

**Visual:**
```
┌─────────────────────────────────────┐
│ [O]  Oxígeno                        │
│ ████████████████████████░░  65.25%  │
├─────────────────────────────────────┤
│ [S]  Azufre                         │
│ ████████████░░░░░░░░░░░░░░  32.69%  │
├─────────────────────────────────────┤
│ [H]  Hidrógeno                      │
│ █░░░░░░░░░░░░░░░░░░░░░░░░░   2.06%  │
└─────────────────────────────────────┘
```

**Definición de Hecho:**
```
✓ Barras de progreso son proporcionales
✓ Colores coinciden con el gráfico
✓ Orden es correcto (mayor a menor)
```

---

## 🎨 Guía de Estilo Específica

### Colores del Gráfico
- Usar colores CPK de cada elemento
- Si el color CPK es muy claro, agregar borde oscuro
- Segmento en hover: aumentar brillo 20%

### Animaciones
```tsx
// Animación del gráfico (cada segmento)
const segmentAnimation = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

// Animación de las barras de la lista
const barAnimation = {
  initial: { width: 0 },
  animate: { width: "var(--percentage)" },
  transition: { duration: 0.5, delay: index * 0.1 }
};
```

### Responsive
```
Desktop: Gráfico a la izquierda, lista a la derecha
Tablet: Gráfico arriba, lista abajo
Móvil: Gráfico más pequeño, lista completa abajo
```

---

## 📁 Estructura de Archivos

```
src/features/composition/
├── useComposition.ts      # Hook principal
├── PieChart.tsx           # Gráfico circular SVG
├── CompositionList.tsx    # Lista con barras
└── index.ts               # Exports
```

---

---

## 🧪 Tests Requeridos

### TICKET 3.5: Tests Unitarios
**Tipo:** Testing  
**Archivo(s):** `src/features/composition/useComposition.test.ts`, `src/features/composition/PieChart.test.tsx`

**Tests a crear:**
```typescript
describe('useComposition', () => {
  it('debe calcular porcentajes correctamente');
  it('debe sumar 100% (con tolerancia de redondeo)');
  it('debe ordenar por porcentaje descendente');
  it('debe incluir colores CPK');
  it('debe manejar fórmulas inválidas');
});

describe('PieChart', () => {
  it('debe renderizar segmentos para cada elemento');
  it('debe aplicar colores correctos');
  it('debe manejar datos vacíos');
});
```

**Definición de Hecho:**
```
✓ Mínimo 8 tests creados
✓ Todos los tests pasan
✓ Cobertura > 80% para archivos nuevos
```

---

### TICKET 3.6: Tests E2E de Composición
**Tipo:** Testing E2E  
**Archivo(s):** `cypress/e2e/hdu-3-composition.cy.ts`

**Escenarios a probar:**
- [ ] Página carga correctamente
- [ ] Ingresar fórmula muestra composición porcentual
- [ ] Gráfico de torta se renderiza
- [ ] Porcentajes suman 100%
- [ ] Lista de elementos muestra datos correctos
- [ ] Animaciones funcionan
- [ ] Responsive en móvil y tablet

**Ejecución:**
```bash
npm run e2e  # Abre Cypress UI (no headless)
```

**Definición de Hecho:**
```
✓ Todos los tests E2E de composición pasan
✓ El gráfico se ve correctamente en todos los viewports
```

---

## ✅ Checklist Final HDU-3

- [ ] TICKET 3.1 completado
- [ ] TICKET 3.2 completado
- [ ] TICKET 3.3 completado
- [ ] TICKET 3.4 completado
- [ ] **TICKET 3.5 completado (Tests Unitarios)**
- [ ] **TICKET 3.6 completado (Tests E2E)**
- [ ] Porcentajes son matemáticamente correctos
- [ ] Gráfico es visualmente atractivo
- [ ] Animaciones funcionan bien
- [ ] Página accesible desde navegación
- [ ] Funciona en móvil
- [ ] Sin errores en consola
- [ ] Todos los tests pasan (`npm run test:run`)
- [ ] Tests E2E pasan (`npm run e2e`)
- [ ] CHANGELOG.md actualizado
- [ ] Versión actualizada a `0.4.0`
- [ ] Commit realizado con tag `v0.4.0`

