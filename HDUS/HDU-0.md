# HDU-0: Infraestructura y Motor Químico

> **Prioridad:** 🔴 Crítica  
> **Estado:** ✅ Completado  
> **Dependencias:** Ninguna (Es la base)  
> **Estimación:** 4-6 horas  
> **Fecha Completado:** 29/11/2024

---

## 📖 Historia de Usuario

**Como** desarrollador del proyecto AtomPop,  
**Quiero** tener una base sólida con navegación, componentes reutilizables y el motor de cálculos químicos,  
**Para que** todas las calculadoras puedan funcionar correctamente sobre esta infraestructura.

---

## 🎯 Criterios de Aceptación

- [x] La aplicación tiene navegación funcional entre páginas
- [x] Existe un parser que convierte fórmulas químicas en objetos manipulables
- [x] La tabla periódica contiene al menos los 50 elementos más comunes
- [x] Los componentes UI base están creados y documentados
- [x] El motor químico está testeado con casos de uso reales

---

## 🎫 Tickets

### TICKET 0.1: Configurar React Router ✅
**Tipo:** Configuración  
**Archivo(s):** `src/router.tsx`, `src/main.tsx`, `src/pages/*.tsx`

**Tareas Completadas:**
- [x] Crear archivo de rutas `src/router.tsx`
- [x] Configurar `createBrowserRouter` en `router.tsx`
- [x] Crear páginas base:
  - [x] `src/pages/HomePage.tsx`
  - [x] `src/pages/MolarMassPage.tsx`
  - [x] `src/pages/ConverterPage.tsx`
  - [x] `src/pages/CompositionPage.tsx`
  - [x] `src/pages/EmpiricalPage.tsx`
- [x] Actualizar `main.tsx` para usar RouterProvider
- [x] Agregar links de navegación en `MainLayout.tsx`
- [x] Implementar menú móvil responsive

**Definición de Hecho:**
```
✓ Puedo navegar entre todas las páginas sin recargar
✓ La URL cambia correctamente
✓ El menú muestra la página activa
✓ Menú móvil funciona correctamente
```

---

### TICKET 0.2: Completar Tabla Periódica ✅
**Tipo:** Datos  
**Archivo(s):** `src/data/periodic-table.json`, `src/data/elements.ts`

**Tareas Completadas:**
- [x] Agregar elementos faltantes (74 elementos totales)
- [x] Verificar que cada elemento tenga:
  - [x] `atomicNumber`
  - [x] `symbol`
  - [x] `name`
  - [x] `atomicMass`
  - [x] `cpkHex` (color)
  - [x] `category` (nuevo campo)
- [x] Incluir elementos comunes en química educativa:
  - [x] Todos los del período 1-4
  - [x] Metales de transición comunes (Fe, Cu, Zn, Ag, Au, etc.)
  - [x] Halógenos y gases nobles
  - [x] Lantánidos comunes
- [x] Crear `elements.ts` con tipos y helpers

**Definición de Hecho:**
```
✓ JSON contiene 74 elementos (supera los 50 requeridos)
✓ No hay errores de sintaxis en el JSON
✓ Todos los elementos tienen masa atómica correcta
✓ Tests de usePeriodicTable pasan (22 tests)
```

---

### TICKET 0.3: Crear Parser de Fórmulas Químicas ✅
**Tipo:** Lógica Core  
**Archivo(s):** `src/utils/formulaParser.ts`

**Tareas Completadas:**
- [x] Crear función `parseFormula(formula: string): ParsedFormula`
- [x] Manejar casos:
  - [x] Elementos simples: `H`, `O`, `Na`
  - [x] Elementos con subíndice: `H2`, `O2`, `C6`
  - [x] Compuestos simples: `H2O`, `NaCl`, `CO2`
  - [x] Compuestos complejos: `H2SO4`, `Ca(OH)2`, `Al2(SO4)3`
- [x] Crear función `normalizeFormula(formula: string): string`
- [x] Crear función `formatFormulaWithSubscripts(formula: string): string`
- [x] Manejar errores con mensajes claros

**Tipos definidos:**
```typescript
interface ParsedFormula {
  elements: { symbol: string; count: number }[];
  isValid: boolean;
  error?: string;
  original: string;
  normalized: string;
}
```

**Definición de Hecho:**
```
✓ Todos los casos de prueba pasan (24 tests)
✓ Errores son descriptivos y útiles
✓ Función exportada y tipada correctamente
```

---

### TICKET 0.4: Crear Hook usePeriodicTable ✅
**Tipo:** Hook  
**Archivo(s):** `src/hooks/usePeriodicTable.ts`

**Tareas Completadas:**
- [x] Crear hook que exponga la tabla periódica
- [x] Funciones implementadas:
  - [x] `getElement(symbol: string): Element | undefined`
  - [x] `getElementByNumber(atomicNumber: number): Element | undefined`
  - [x] `elements: Element[]` (getter de todos los elementos)
  - [x] `searchElements(query: string): Element[]`
  - [x] `isValidElement(symbol: string): boolean`
  - [x] `totalElements: number`

**Definición de Hecho:**
```
✓ Hook funciona en cualquier componente (22 tests pasan)
✓ Búsqueda es case-insensitive
✓ Retorna undefined para elementos inexistentes (no lanza error)
```

---

### TICKET 0.5: Crear Componentes UI Base ✅
**Tipo:** UI  
**Archivo(s):** `src/components/ui/*.tsx`

**Componentes Creados:**

#### 5.1 Button (`Button.tsx`) ✅
- Variantes: `primary`, `secondary`, `danger`, `ghost`
- Props: `variant`, `size`, `loading`, `disabled`, `icon`, `iconPosition`
- Animaciones con Framer Motion

#### 5.2 ChemicalInput (`ChemicalInput.tsx`) ✅
- Input estilizado como tubo de ensayo/cápsula
- Props: `value`, `onChange`, `placeholder`, `error`, `success`, `label`
- Animación de error (shake)
- Iconos de estado (check/error)

#### 5.3 ResultCard (`ResultCard.tsx`) ✅
- Contenedor glassmorphism para resultados
- Variantes: `default`, `success`, `amber`, `cyan`
- Componente `ResultValue` para valores destacados

#### 5.4 ElementBadge (`ElementBadge.tsx`) ✅
- Muestra símbolo de elemento con color CPK
- Props: `symbol`, `count`, `showName`, `showMass`, `size`
- Versión simple `SimpleElementBadge` sin lookup

**Definición de Hecho:**
```
✓ Todos los componentes tienen TypeScript types
✓ Componentes son reutilizables
✓ Estilos consistentes con el tema AtomPop
```

---

### TICKET 0.6: Crear Motor de Cálculo Químico ✅
**Tipo:** Lógica Core  
**Archivo(s):** `src/utils/chemistryEngine.ts`

**Tareas Completadas:**
- [x] `calculateMolarMass(formula: string): MolarMassResult`
- [x] `molesToGrams(moles: number, molarMass: number): number`
- [x] `gramsToMoles(grams: number, molarMass: number): number`
- [x] `molesToParticles(moles: number): number`
- [x] `particlesToMoles(particles: number): number`
- [x] `convertUnits(formula, value, fromUnit): ConversionResult`
- [x] `calculateComposition(formula): CompositionResult`
- [x] `calculateEmpiricalFormula(inputs): EmpiricalResult`
- [x] `calculateMolecularFormula(empirical, mass): MolecularResult`
- [x] `formatScientific(num): string`
- [x] Constante `AVOGADRO = 6.02214076e23`

**Definición de Hecho:**
```
✓ Cálculos son precisos (37 tests pasan)
✓ H2O = 18.015 g/mol ✓
✓ NaCl = 58.44 g/mol ✓
✓ C6H12O6 = 180.156 g/mol ✓
```

---

## 📁 Estructura Final

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ChemicalInput.tsx
│   │   ├── ElementBadge.tsx
│   │   ├── ResultCard.tsx
│   │   └── index.ts
│   └── index.ts
├── data/
│   ├── elements.ts
│   └── periodic-table.json (74 elementos)
├── hooks/
│   ├── usePeriodicTable.ts
│   ├── usePeriodicTable.test.ts
│   └── index.ts
├── layouts/
│   └── MainLayout.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── MolarMassPage.tsx
│   ├── ConverterPage.tsx
│   ├── CompositionPage.tsx
│   ├── EmpiricalPage.tsx
│   └── index.ts
├── test/
│   └── setup.ts
├── utils/
│   ├── formulaParser.ts
│   ├── formulaParser.test.ts
│   ├── chemistryEngine.ts
│   ├── chemistryEngine.test.ts
│   └── index.ts
├── router.tsx
├── main.tsx
└── index.css
```

---

## ✅ Checklist Final HDU-0

- [x] TICKET 0.1 completado (React Router)
- [x] TICKET 0.2 completado (Tabla Periódica 74 elementos)
- [x] TICKET 0.3 completado (Parser de Fórmulas)
- [x] TICKET 0.4 completado (Hook usePeriodicTable)
- [x] TICKET 0.5 completado (Componentes UI)
- [x] TICKET 0.6 completado (Motor de Cálculo)
- [x] Tests unitarios creados (83 tests)
- [x] Todos los tests pasan
- [x] Todos los archivos commiteados
- [x] App funciona sin errores en consola
- [x] README.md actualizado

---

## 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Archivos creados | 23 |
| Líneas de código | ~2,700 |
| Tests unitarios | 83 |
| Tests pasando | 100% |
| Elementos en tabla | 74 |
| Componentes UI | 4 |
| Páginas | 5 |
