# 📜 Changelog - AtomPop

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [Unreleased]

### Por Hacer
- HDU-5: Balanceador de Ecuaciones Químicas
- HDU-6: Calculadora de pH
- HDU-7: Modo Oscuro/Claro
- HDU-8: PWA
- HDU-9: Exportar a PDF
- HDU-10: Tabla Periódica 118 elementos

---

## [0.6.2] - 2025-12-01

### 🎓 FIX-4: Claridad en Resultado de Fórmula Molecular

> **Tipo:** PATCH | **Rama:** `fix/molecular-clarity`

Mejora educativa: el resultado ahora muestra información contextual del compuesto.

### ✨ Agregado

#### Base de datos de compuestos conocidos
- **45+ compuestos** con nombres, IUPAC, categorías y descripciones
- Incluye: agua, sales, ácidos, bases, alcoholes, azúcares, óxidos
- Soporte para múltiples notaciones (CH2O = H2CO = HCHO)

#### Información del compuesto en resultado
- **Nombre común** (ej: "Formaldehído", "Glucosa")
- **Nombre IUPAC** cuando existe (ej: "Metanal")
- **Categoría** (ej: "Aldehído", "Azúcar", "Ácido Fuerte")
- **Descripción educativa** breve

#### Claridad en equivalencia de fórmulas
- **Nota de equivalencia** cuando el orden de la fórmula cambia
- **Tooltip explicativo** "¿Por qué cambió el orden?"
- **Fórmulas alternativas** mostradas (ej: "También: H₂CO, HCHO")

### 🧪 Testing

#### Tests Unitarios Nuevos (30)
- `compounds.test.ts` - Tests completos para la base de datos
- Tests para `getCompoundName`, `getCompoundInfo`, `areFormulasEquivalent`

#### Tests E2E Nuevos (6)
- Tests para mostrar nombre de Glucosa
- Tests para mostrar nombre de Formaldehído
- Tests para categoría y descripción
- Tests para fórmulas alternativas

### 📁 Archivos Creados/Modificados

```
src/
├── data/
│   ├── compounds.ts           # NUEVO - Base de datos de compuestos
│   └── compounds.test.ts      # NUEVO - 30 tests
└── pages/
    └── EmpiricalPage.tsx      # MODIFICADO - UI mejorada

cypress/e2e/
└── hdu-4-empirical.cy.ts      # MODIFICADO - 6 tests nuevos
```

### 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Compuestos en base de datos | 45+ |
| Tests unitarios nuevos | 30 |
| Tests E2E nuevos | 6 |
| **Tests totales** | **298 unitarios + 133 E2E = 431** |
| Archivos creados | 2 |
| Archivos modificados | 2 |

---

## [0.6.1] - 2025-12-01

### 🐛 FIX-3: UX Confusa y Lógica Incorrecta en Calculadora de Fórmula Molecular

> **Tipo:** PATCH | **Rama:** `fix/molecular-ux`

Corrección de bug de lógica y mejora de UX en la calculadora de fórmula molecular.

### 🔧 Corregido

#### Bug de Lógica Crítico
- **El multiplicador 0.93 ya no se redondea incorrectamente a 1**
- Agregada validación: el multiplicador debe ser >= 1 (la fórmula molecular no puede ser más pequeña que la empírica)
- Tolerancia más estricta: 5% en lugar de 0.1 absoluto

### ✨ Mejorado

#### Mensajes Educativos
- **Nuevo mensaje cuando masa < masa empírica**
  - Explica por qué no es válido
  - Muestra botones con valores sugeridos clickeables
  
- **Mensaje de error mejorado cuando multiplicador no es entero**
  - Explica qué es el multiplicador
  - Muestra el cálculo: `n = masa experimental ÷ masa empírica`
  - Sugiere las masas válidas más cercanas (n-1 y n+1)

#### Sección Educativa "¿Cómo funciona?"
- Siempre visible en modo "Desde Empírica"
- Explica el concepto de multiplicador
- Incluye ejemplo: CH₂O → C₆H₁₂O₆

#### Versión Dinámica en Footer
- La versión ahora se lee automáticamente desde `package.json`
- No más hardcoding de versión en `MainLayout.tsx`

### 🧪 Testing

#### Tests Unitarios Nuevos (15)
- `chemistryEngine.test.ts` - 9 tests para validación de multiplicador
- `useMolecularFormula.test.ts` - 6 tests para validationMessage y suggestedMasses

#### Tests E2E Nuevos (10)
- Tests para advertencia de masa inválida
- Tests para valores sugeridos clickeables
- Tests para mensajes educativos
- Test para versión en footer

### 📁 Archivos Modificados

```
src/
├── utils/
│   ├── chemistryEngine.ts          # Lógica de validación corregida
│   └── chemistryEngine.test.ts     # 9 tests nuevos
├── features/empirical/
│   ├── useMolecularFormula.ts      # validationMessage, suggestedMasses
│   └── useMolecularFormula.test.ts # 6 tests nuevos
├── pages/
│   └── EmpiricalPage.tsx           # Advertencia visual, sección educativa
├── layouts/
│   └── MainLayout.tsx              # Versión dinámica
├── config/
│   └── version.ts                  # NUEVO - Lee versión de package.json
└── tsconfig.app.json               # resolveJsonModule: true

cypress/e2e/
└── hdu-4-empirical.cy.ts           # 10 tests E2E nuevos
```

### 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Tests unitarios nuevos | 15 |
| Tests E2E nuevos | 10 |
| **Tests totales** | **268 unitarios + 127 E2E = 395** |
| Archivos creados | 1 |
| Archivos modificados | 7 |
| Tickets completados | 5 |

---

## [0.6.0] - 2025-12-01

### 🎉 FIX-2: Tabla Periódica Interactiva

> **Tipo:** MINOR | **Rama:** `fix/periodic-table`

Nueva página y modal de Tabla Periódica con funcionalidad completa.

### ✨ Agregado

#### Página de Tabla Periódica (`/tabla-periodica`)
- **Vista completa** de los 74 elementos disponibles
- **Modo grid/lista** con toggle de vista
- **Búsqueda** por nombre, símbolo o número atómico
- **Filtrado** por categoría (metales, no metales, etc.)
- **Panel de detalles** con información educativa al seleccionar
- **Leyenda de categorías** interactiva
- **Responsive** para móvil, tablet y desktop

#### Modal de Tabla Periódica (PeriodicTableModal)
- Modal reutilizable con overlay y blur
- Grid de elementos con colores CPK
- Hover para ver detalles rápidos
- Callback `onSelect` para insertar elementos
- Búsqueda y filtrado integrados

#### Botón en ChemicalInput
- Nueva prop `showPeriodicTableButton`
- Callback `onPeriodicTableClick`
- Integración con modal para insertar elementos

#### Navegación
- Nueva ruta `/tabla-periodica`
- Enlace "Tabla" en navbar (icono Grid)
- Accesible desde todas las páginas

### 🧪 Testing
- **67 tests nuevos** para los componentes de tabla periódica
  - `PeriodicTableModal.test.tsx` - 21 tests
  - `PeriodicTablePage.test.tsx` - 23 tests
  - `ChemicalInput.test.tsx` - 23 tests (actualizado con tests del botón)

### 📁 Archivos Creados/Modificados

```
src/
├── components/ui/
│   ├── PeriodicTableModal.tsx       # NUEVO
│   ├── PeriodicTableModal.test.tsx  # NUEVO
│   ├── ChemicalInput.tsx            # MODIFICADO (showPeriodicTableButton)
│   ├── ChemicalInput.test.tsx       # NUEVO
│   └── index.ts                     # MODIFICADO
├── pages/
│   ├── PeriodicTablePage.tsx        # NUEVO
│   ├── PeriodicTablePage.test.tsx   # NUEVO
│   └── index.ts                     # MODIFICADO
├── layouts/
│   └── MainLayout.tsx               # MODIFICADO (navbar)
└── router.tsx                       # MODIFICADO (ruta)
```

### 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Tests nuevos | 67 |
| **Tests totales** | **253 unitarios + 117 E2E = 370** |
| Archivos creados | 4 |
| Archivos modificados | 5 |
| Tickets completados | 4 |

---

## [0.5.1] - 2024-11-30

### 🐛 FIX-1: Botón "Limpiar valores" con icono mal posicionado

> **Tipo:** PATCH | **Rama:** `main`

Corrección de bugs menores de UI y mejora en CI/CD.

### 🔧 Corregido

- **Botón "Limpiar valores"** ahora muestra el icono al lado del texto (no sobre)
- Corregido en: ConverterPage, CompositionPage, EmpiricalPage (ambos modos)
- Todos los botones usan la prop `icon` del componente Button correctamente
- **Rutas SPA en Vercel:** Agregado `vercel.json` con rewrites para que las rutas directas funcionen (ej: `/conversor`, `/masa-molar`)

### ✨ Mejorado

- **CI/CD:** El workflow ahora solo se ejecuta en Pull Requests hacia main
- Esto permite trabajar en ramas feature sin activar el CI en cada push
- Los push directos a main no activan el workflow (solo merges vía PR)

### 📁 Archivos Modificados
- `.github/workflows/ci.yml` - Cambiado trigger de `push` a `pull_request`
- `src/pages/ConverterPage.tsx` - Botón limpiar corregido
- `src/pages/CompositionPage.tsx` - Botón limpiar corregido  
- `src/pages/EmpiricalPage.tsx` - Ambos botones limpiar corregidos
- `vercel.json` - **NUEVO** - Configuración de rewrites para SPA

### 📋 Nueva Estructura HDUS
- Creada carpeta `HDUS/fixes/` para tracking de bugs
- Agregadas HDUs futuras (HDU-5 a HDU-10)
- Actualizado roadmap en README.md

---

## [0.5.0] - 2024-11-30

### 🎉 HDU-4: Fórmula Empírica y Molecular

> **Tipo:** MINOR | **Rama:** `feature/hdu-4`

**¡ÚLTIMA HDU COMPLETADA!** Cuarta y última calculadora funcional: determinación de fórmulas empírica y molecular.

### ✨ Agregado

#### Funcionalidad Principal - Modo Empírica (desde %)
- Lista dinámica de elementos (agregar/eliminar)
- Selector de elementos con grupos organizados
- Input de porcentajes con validación en tiempo real
- Cálculo de total con indicador visual (99-101%)
- Visualización paso a paso del cálculo
- Resultado con fórmula formateada (subíndices)

#### Funcionalidad Principal - Modo Molecular (desde Empírica)
- Input de fórmula empírica con validación
- Cálculo automático de masa de fórmula empírica
- Input de masa molar experimental
- Cálculo de multiplicador
- Resultado con fórmula molecular

#### Nueva Carpeta `src/features/empirical/`
- **`useEmpiricalFormula.ts`** - Hook para modo 1:
  - Gestión de lista de elementos dinámica
  - Validación de porcentajes (~100%)
  - Detección de duplicados
  - Integración con calculateEmpiricalFormula

- **`useMolecularFormula.ts`** - Hook para modo 2:
  - Validación de fórmula empírica
  - Cálculo de masa automático
  - Integración con calculateMolecularFormula

- **`ElementInputList.tsx`** - Lista de elementos:
  - Selector con búsqueda
  - Inputs de porcentaje
  - Botones agregar/eliminar
  - Total con validación visual

- **`StepsDisplay.tsx`** - Visualización de pasos:
  - Pasos expandibles/colapsables
  - Animaciones de revelación
  - Valores intermedios formatados

#### Testing
- **36 tests unitarios** para hooks de fórmula empírica/molecular
- **31 tests E2E** para ambos modos

### 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Tests unitarios nuevos | 36 |
| Tests E2E nuevos | 31 |
| **Tests totales** | **186 + 117 = 303** |
| Archivos creados | 7 |

### 🏆 Proyecto Completado

¡AtomPop tiene ahora **4 calculadoras funcionales**!
1. ✅ Masa Molar
2. ✅ Conversor Moles/Gramos/Partículas
3. ✅ Composición Porcentual
4. ✅ Fórmula Empírica y Molecular

---

## [0.4.0] - 2024-11-30

### 🎉 HDU-3: Composición Porcentual

> **Tipo:** MINOR | **Rama:** `feature/hdu-3`

Tercera calculadora funcional: visualización de composición porcentual con gráfico circular.

### ✨ Agregado

#### Funcionalidad Principal
- **Composición Porcentual** con gráfico interactivo
  - Gráfico circular (donut chart) con colores CPK
  - Lista de elementos con barras de progreso
  - Hover interactivo entre gráfico y lista
  - Porcentajes precisos que suman 100%

#### Nueva Carpeta `src/features/composition/`
- **`useComposition.ts`** - Hook principal con:
  - Validación de fórmula en tiempo real
  - Cálculo de composición porcentual
  - Estados: isValid, isCalculated, error

- **`PieChart.tsx`** - Gráfico circular SVG:
  - Segmentos animados con Framer Motion
  - Hover para destacar elementos
  - Centro con información dinámica
  - Leyenda compacta

- **`CompositionList.tsx`** - Lista detallada:
  - Barras de progreso animadas
  - Badge de elemento con color CPK
  - Detalles de masa atómica
  - Suma total de porcentajes

#### Mejoras en UI
- Animaciones de entrada escalonadas
- Sincronización hover gráfico ↔ lista
- Sección educativa "¿Cómo se calcula?"
- Diseño responsive

#### Testing
- **15 tests unitarios** para useComposition
- **25 tests E2E** para composición
- Total proyecto: **165 tests unitarios + 86 E2E**

### 📁 Estructura de Archivos Nuevos

```
src/features/composition/
├── useComposition.ts         # Hook principal
├── useComposition.test.ts    # 15 tests
├── PieChart.tsx              # Gráfico circular
├── CompositionList.tsx       # Lista con barras
└── index.ts                  # Exports
```

### 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Tests unitarios nuevos | 15 |
| Tests E2E nuevos | 25 |
| Tests totales | 165 + 86 E2E |
| Archivos creados | 5 |
| Tickets completados | 6 |

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

