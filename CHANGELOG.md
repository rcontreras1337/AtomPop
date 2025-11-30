# 📜 Changelog - AtomPop

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [Unreleased]

### Por Hacer
- HDU-3: Composición Porcentual con gráficos
- HDU-4: Fórmula Empírica y Molecular

---

## [0.3.0] - 2024-11-30

### 🎉 HDU-2: Conversor Moles/Gramos/Partículas

> **Tipo:** MINOR | **Rama:** `feature/hdu-2`

Segunda calculadora funcional: conversión entre unidades químicas.

### ✨ Agregado

#### Funcionalidad Principal
- **Conversor bidireccional** completamente funcional
  - Escribir en cualquier campo actualiza los otros automáticamente
  - Soporta Moles ↔ Gramos ↔ Partículas
  - Validación de fórmula en tiempo real
  - Masa molar visible como referencia

#### Nueva Carpeta `src/features/converter/`
- **`useConverter.ts`** - Hook principal con:
  - Conversiones bidireccionales
  - Sanitización de inputs (sin negativos)
  - Soporte para notación científica (1e23)
  - Estados: activeField, isValid, hasValues

- **`ConverterInput.tsx`** - Input especializado:
  - Estados visuales: "editando" vs "calculado"
  - Colores por tipo (cyan, amber, purple)
  - Animaciones Framer Motion
  - Display de notación científica legible

#### Mejoras en UI
- Indicadores visuales claros de campo activo
- Badges "editando" y "calculado"
- Ejemplos clickeables (H2O, NaCl, C6H12O6, etc.)
- Sección de fórmulas de referencia
- Diseño responsive (móvil/tablet/desktop)

#### Testing
- **24 tests unitarios** para useConverter
- **24 tests E2E** para el conversor
- Total proyecto: **159 tests unitarios + 61 E2E**

### 📁 Estructura de Archivos Nuevos

```
src/features/converter/
├── useConverter.ts           # Hook principal
├── useConverter.test.ts      # 24 tests
├── ConverterInput.tsx        # Input especializado
└── index.ts                  # Exports
```

### 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Tests unitarios nuevos | 24 |
| Tests E2E nuevos | 24 |
| Tests totales | 159 + 61 E2E |
| Archivos creados | 4 |
| Tickets completados | 7 |

---

## [0.2.1] - 2024-11-30

### 🔧 CI/CD, Testing E2E y Git Hooks

> **Tipo:** PATCH | **Rama:** `main`

Configuración de infraestructura de CI/CD y testing E2E.

### ✨ Agregado

#### CI/CD (GitHub Actions + Vercel)
- **GitHub Action** para CI en push a main
  - Lint (ESLint)
  - Tests unitarios (Vitest)
  - Build de producción
- **Deploy automático** con Vercel
- **Dominio personalizado**: [atompop.info](https://atompop.info)

#### Testing E2E (Cypress)
- **Cypress 15** configurado
- **37 tests E2E** implementados:
  - `hdu-0-navigation.cy.ts` - 14 tests (navegación, responsive, menú)
  - `hdu-1-molar-mass.cy.ts` - 23 tests (calculadora completa)
- Fixtures con fórmulas de prueba
- Comandos custom: `visitAndWait`, `enterFormula`, `clickCalculate`

#### Git Hooks (Husky)
- **pre-commit**: Ejecuta lint
- **pre-push**: Ejecuta lint + tests unitarios + build
- Previene push de código que no compile o con tests fallando

#### Scripts Nuevos
- `npm run verify` - Lint + Tests + Build (verificación completa)
- `npm run e2e` - Abre Cypress UI
- `npm run e2e:headless` - Cypress en modo headless

#### Tickets E2E agregados a HDUs
- Todos los HDU (0-4) ahora incluyen tickets de tests E2E

### 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Tests E2E nuevos | 37 |
| Tests totales (unitarios + E2E) | 148 |
| Archivos de configuración | 5 |

---

## [0.2.0] - 2024-11-29

### 🎉 HDU-1: Calculadora de Masa Molar

> **Tipo:** MINOR | **Rama:** `feature/hdu-1`

Primera calculadora completamente funcional del proyecto.

### ✨ Agregado

#### Funcionalidad Principal
- **Calculadora de Masa Molar** completamente funcional
  - Input de fórmulas con validación en tiempo real (debounce 300ms)
  - Cálculo instantáneo con desglose por elemento
  - Historial de últimos 5 cálculos
  - Copiar resultado al portapapeles
  - Fórmulas de ejemplo clickeables

#### Nueva Carpeta `src/features/molar-mass/`
- **`useMolarMass.ts`** - Hook principal con:
  - Estados: idle, calculating, success, error
  - Gestión de historial (máximo 5 entradas, sin duplicados)
  - Funciones: calculate, clear, clearHistory
  
- **`MassBreakdown.tsx`** - Componente de desglose:
  - Muestra cada elemento con badge de color CPK
  - Animaciones escalonadas (stagger) con Framer Motion
  - Cálculo detallado: masa atómica × cantidad = subtotal
  - Total con estilo destacado

#### Mejoras en UI
- Validación visual con indicadores verde/rojo
- Animación shake en errores
- Animaciones de entrada para resultados
- Feedback visual al copiar

#### Testing
- **28 tests nuevos** (17 para hook + 11 para componente)
- Tests cubren: cálculos, errores, historial, breakdown
- Total proyecto: **111 tests** (100% pasando)

### 📁 Estructura de Archivos Nuevos

```
src/features/molar-mass/
├── useMolarMass.ts           # Hook principal
├── useMolarMass.test.ts      # 17 tests
├── MassBreakdown.tsx         # Componente desglose
├── MassBreakdown.test.tsx    # 11 tests
└── index.ts                  # Exports
```

### 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Tests nuevos | 28 |
| Tests totales | 111 |
| Archivos creados | 5 |
| Tickets completados | 6 |

### 🔗 Links

- **Rama:** [feature/hdu-1](https://github.com/rcontreras1337/AtomPop/tree/feature/hdu-1)

---

## [0.1.0] - 2024-11-29

### 🎉 HDU-0: Infraestructura y Motor Químico

> **Tipo:** MINOR | **Rama:** `feature/hdu-0`

Primera versión del proyecto con toda la infraestructura base.

### ✨ Agregado

#### Navegación y Páginas
- React Router configurado con rutas anidadas
- 5 páginas creadas: Home, Masa Molar, Conversor, Composición, Empírica
- Layout principal con navbar responsive
- Menú móvil funcional

#### Motor de Cálculo Químico
- **Parser de fórmulas** (`formulaParser.ts`)
  - Soporta fórmulas simples: `H2O`, `NaCl`, `CO2`
  - Soporta paréntesis: `Ca(OH)2`, `Al2(SO4)3`
  - Normalización de mayúsculas/minúsculas
  - Mensajes de error descriptivos

- **Motor químico** (`chemistryEngine.ts`)
  - `calculateMolarMass()` - Calcula masa molar con desglose
  - `convertUnits()` - Convierte entre moles, gramos y partículas
  - `calculateComposition()` - Composición porcentual
  - `calculateEmpiricalFormula()` - Fórmula empírica desde %
  - `calculateMolecularFormula()` - Fórmula molecular desde empírica
  - Constante de Avogadro: `6.02214076e23`

#### Datos
- Tabla periódica con **74 elementos**
- Cada elemento incluye: número atómico, símbolo, nombre, masa, color CPK, categoría
- Hook `usePeriodicTable` para acceso fácil

#### Componentes UI
- `Button` - 4 variantes (primary, secondary, danger, ghost)
- `ChemicalInput` - Input estilo tubo de ensayo
- `ResultCard` - Tarjeta glassmorphism para resultados
- `ElementBadge` - Badge de elemento con color CPK

#### Diseño Visual "Flint Loco"
- Paleta de colores neón (amber, cyan, green, purple)
- Tipografía Fredoka (cartoon científico)
- Efectos glassmorphism
- Burbujas y moléculas animadas
- Botones 3D estilo "emergencia"
- Scrollbar personalizado

#### Testing
- Vitest configurado
- **83 tests unitarios** (100% pasando)
  - formulaParser.ts: 24 tests
  - chemistryEngine.ts: 37 tests
  - usePeriodicTable.ts: 22 tests

#### Documentación
- README.md completo
- PRD.md con especificaciones
- 5 archivos HDU detallados
- VERSIONING.md con directrices
- CHANGELOG.md (este archivo)

### 📁 Estructura de Archivos

```
src/
├── components/ui/     # 4 componentes
├── data/              # Tabla periódica (74 elementos)
├── hooks/             # usePeriodicTable
├── layouts/           # MainLayout
├── pages/             # 5 páginas
├── utils/             # Parser + Engine + Tests
└── router.tsx         # Configuración de rutas
```

### 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Archivos creados | 30+ |
| Líneas de código | ~5,000 |
| Tests unitarios | 83 |
| Cobertura tests | 100% |
| Elementos tabla | 74 |
| Componentes UI | 4 |
| Páginas | 5 |

### 🔗 Links

- **Commits:** [feature/hdu-0](https://github.com/rcontreras1337/AtomPop/tree/feature/hdu-0)
- **PR:** Pendiente de merge a main

---

## [0.0.0] - 2024-11-29

### 🚀 Init: Proyecto Base

> **Tipo:** Inicial | **Rama:** `main`

Inicialización del proyecto con Vite + React + TypeScript.

### ✨ Agregado
- Proyecto Vite inicializado
- Configuración TypeScript
- Tailwind CSS v4 configurado
- Dependencias base instaladas:
  - react, react-dom
  - framer-motion
  - react-router-dom
  - lucide-react
  - tailwindcss, postcss

### 🔗 Links
- **Repositorio:** https://github.com/rcontreras1337/AtomPop

---

## Formato de Entradas

Cada versión incluye:

- **Fecha** en formato ISO (YYYY-MM-DD)
- **Nombre de HDU** si aplica
- **Tipo de versión** (MAJOR/MINOR/PATCH)
- **Rama** de desarrollo

### Categorías de Cambios

- ✨ **Agregado** - Nuevas características
- 🔄 **Cambiado** - Cambios en funcionalidad existente
- 🗑️ **Deprecado** - Funcionalidades que serán eliminadas
- 🗑️ **Eliminado** - Funcionalidades eliminadas
- 🐛 **Corregido** - Corrección de bugs
- 🔒 **Seguridad** - Vulnerabilidades corregidas

---

## Próximas Versiones Planificadas

| Versión | HDU | Descripción |
|---------|-----|-------------|
| 0.3.0 | HDU-2 | Conversor Moles/Gramos/Átomos |
| 0.4.0 | HDU-3 | Composición Porcentual con gráficos |
| 0.5.0 | HDU-4 | Fórmula Empírica y Molecular |
| 1.0.0 | - | Primera versión estable |

