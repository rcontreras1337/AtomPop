# HDU-0: Infraestructura y Motor Químico

> **Prioridad:** 🔴 Crítica  
> **Estado:** ⏳ Pendiente  
> **Dependencias:** Ninguna (Es la base)  
> **Estimación:** 4-6 horas

---

## 📖 Historia de Usuario

**Como** desarrollador del proyecto AtomPop,  
**Quiero** tener una base sólida con navegación, componentes reutilizables y el motor de cálculos químicos,  
**Para que** todas las calculadoras puedan funcionar correctamente sobre esta infraestructura.

---

## 🎯 Criterios de Aceptación

- [ ] La aplicación tiene navegación funcional entre páginas
- [ ] Existe un parser que convierte fórmulas químicas en objetos manipulables
- [ ] La tabla periódica contiene al menos los 50 elementos más comunes
- [ ] Los componentes UI base están creados y documentados
- [ ] El motor químico está testeado con casos de uso reales

---

## 🎫 Tickets

### TICKET 0.1: Configurar React Router
**Tipo:** Configuración  
**Archivo(s):** `src/main.tsx`, `src/App.tsx`, `src/pages/*.tsx`

**Tareas:**
- [ ] Crear archivo de rutas `src/routes.tsx`
- [ ] Configurar `BrowserRouter` en `main.tsx`
- [ ] Crear páginas base:
  - [ ] `src/pages/HomePage.tsx` (mover contenido actual de App.tsx)
  - [ ] `src/pages/MolarMassPage.tsx` (placeholder)
  - [ ] `src/pages/ConverterPage.tsx` (placeholder)
  - [ ] `src/pages/CompositionPage.tsx` (placeholder)
  - [ ] `src/pages/EmpiricalPage.tsx` (placeholder)
- [ ] Actualizar `App.tsx` para usar el Router
- [ ] Agregar links de navegación en `MainLayout.tsx`

**Definición de Hecho:**
```
✓ Puedo navegar entre todas las páginas sin recargar
✓ La URL cambia correctamente
✓ El menú muestra la página activa
```

---

### TICKET 0.2: Completar Tabla Periódica
**Tipo:** Datos  
**Archivo(s):** `src/data/periodic-table.json`

**Tareas:**
- [ ] Agregar elementos faltantes (mínimo 50 elementos)
- [ ] Verificar que cada elemento tenga:
  - `atomicNumber`
  - `symbol`
  - `name`
  - `atomicMass`
  - `cpkHex` (color)
- [ ] Incluir elementos comunes en química educativa:
  - Todos los del período 1-4
  - Metales de transición comunes (Fe, Cu, Zn, Ag, Au, etc.)
  - Halógenos y gases nobles

**Definición de Hecho:**
```
✓ JSON contiene mínimo 50 elementos
✓ No hay errores de sintaxis en el JSON
✓ Todos los elementos tienen masa atómica correcta
```

---

### TICKET 0.3: Crear Parser de Fórmulas Químicas
**Tipo:** Lógica Core  
**Archivo(s):** `src/utils/formulaParser.ts`

**Tareas:**
- [ ] Crear función `parseFormula(formula: string): ParsedFormula`
- [ ] Manejar casos:
  - Elementos simples: `H`, `O`, `Na`
  - Elementos con subíndice: `H2`, `O2`, `C6`
  - Compuestos simples: `H2O`, `NaCl`, `CO2`
  - Compuestos complejos: `H2SO4`, `Ca(OH)2`, `Al2(SO4)3`
- [ ] Crear función `normalizeFormula(formula: string): string`
  - Convertir `h2o` → `H2O`
  - Manejar números como letras: `H20` → `H2O` (si es posible detectar)
- [ ] Manejar errores con mensajes claros

**Tipos a definir:**
```typescript
interface ParsedFormula {
  elements: { symbol: string; count: number }[];
  isValid: boolean;
  error?: string;
  original: string;
  normalized: string;
}
```

**Casos de prueba:**
| Input | Output Esperado |
|-------|-----------------|
| `H2O` | `{H: 2, O: 1}` |
| `NaCl` | `{Na: 1, Cl: 1}` |
| `H2SO4` | `{H: 2, S: 1, O: 4}` |
| `Ca(OH)2` | `{Ca: 1, O: 2, H: 2}` |
| `XYZ` | `{isValid: false, error: "Elemento 'XYZ' no existe"}` |

**Definición de Hecho:**
```
✓ Todos los casos de prueba pasan
✓ Errores son descriptivos y útiles
✓ Función exportada y tipada correctamente
```

---

### TICKET 0.4: Crear Hook usePeriodicTable
**Tipo:** Hook  
**Archivo(s):** `src/hooks/usePeriodicTable.ts`

**Tareas:**
- [ ] Crear hook que cargue y exponga la tabla periódica
- [ ] Funciones a incluir:
  - `getElement(symbol: string): Element | undefined`
  - `getElementByNumber(atomicNumber: number): Element | undefined`
  - `getAllElements(): Element[]`
  - `searchElements(query: string): Element[]`

**Tipos a definir:**
```typescript
interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  cpkHex: string;
}

interface UsePeriodicTableReturn {
  elements: Element[];
  getElement: (symbol: string) => Element | undefined;
  getElementByNumber: (num: number) => Element | undefined;
  searchElements: (query: string) => Element[];
  isLoading: boolean;
}
```

**Definición de Hecho:**
```
✓ Hook funciona en cualquier componente
✓ Búsqueda es case-insensitive
✓ Retorna undefined para elementos inexistentes (no lanza error)
```

---

### TICKET 0.5: Crear Componentes UI Base
**Tipo:** UI  
**Archivo(s):** `src/components/ui/*.tsx`

**Componentes a crear:**

#### 5.1 Input Químico (`ChemicalInput.tsx`)
- Input estilizado como tubo de ensayo/cápsula
- Props: `value`, `onChange`, `placeholder`, `error`, `label`
- Animación de error (vibración)

#### 5.2 Botón AtomPop (`Button.tsx`)
- Estilo 3D con sombra (ya existe en HomePage, extraer)
- Variantes: `primary`, `secondary`, `danger`
- Props: `variant`, `size`, `loading`, `disabled`

#### 5.3 Tarjeta de Resultado (`ResultCard.tsx`)
- Contenedor glassmorphism para mostrar resultados
- Props: `title`, `children`, `variant`

#### 5.4 Badge de Elemento (`ElementBadge.tsx`)
- Muestra símbolo de elemento con su color CPK
- Props: `symbol`, `showName`, `size`

**Definición de Hecho:**
```
✓ Todos los componentes tienen TypeScript types
✓ Componentes son reutilizables
✓ Estilos consistentes con el tema AtomPop
```

---

### TICKET 0.6: Crear Motor de Cálculo Químico
**Tipo:** Lógica Core  
**Archivo(s):** `src/utils/chemistryEngine.ts`

**Tareas:**
- [ ] Crear función `calculateMolarMass(formula: string): MolarMassResult`
- [ ] Crear función `molesToGrams(moles: number, molarMass: number): number`
- [ ] Crear función `gramsToMoles(grams: number, molarMass: number): number`
- [ ] Crear función `molesToParticles(moles: number): number`
- [ ] Crear función `particlesToMoles(particles: number): number`
- [ ] Definir constante `AVOGADRO = 6.02214076e23`

**Tipos a definir:**
```typescript
interface MolarMassResult {
  totalMass: number;
  breakdown: {
    element: string;
    count: number;
    atomicMass: number;
    subtotal: number;
  }[];
  formula: string;
  isValid: boolean;
  error?: string;
}
```

**Definición de Hecho:**
```
✓ Cálculos son precisos (verificar con ejemplos conocidos)
✓ H2O = 18.015 g/mol
✓ NaCl = 58.44 g/mol
✓ C6H12O6 = 180.156 g/mol
```

---

## 📁 Estructura Final Esperada

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── ChemicalInput.tsx
│       ├── ResultCard.tsx
│       └── ElementBadge.tsx
├── data/
│   └── periodic-table.json (ampliado)
├── hooks/
│   └── usePeriodicTable.ts
├── pages/
│   ├── HomePage.tsx
│   ├── MolarMassPage.tsx
│   ├── ConverterPage.tsx
│   ├── CompositionPage.tsx
│   └── EmpiricalPage.tsx
├── utils/
│   ├── formulaParser.ts
│   └── chemistryEngine.ts
└── routes.tsx
```

---

## ✅ Checklist Final HDU-0

- [ ] TICKET 0.1 completado
- [ ] TICKET 0.2 completado
- [ ] TICKET 0.3 completado
- [ ] TICKET 0.4 completado
- [ ] TICKET 0.5 completado
- [ ] TICKET 0.6 completado
- [ ] Todos los archivos commiteados
- [ ] App funciona sin errores en consola

