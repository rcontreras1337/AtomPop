# 📜 Changelog - AtomPop

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [Unreleased]

### Por Hacer
- HDU-1: Calculadora de Masa Molar (funcionalidad completa)
- HDU-2: Conversor Moles/Gramos/Átomos
- HDU-3: Composición Porcentual con gráficos
- HDU-4: Fórmula Empírica y Molecular

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
| 0.2.0 | HDU-1 | Calculadora de Masa Molar funcional |
| 0.3.0 | HDU-2 | Conversor Moles/Gramos/Átomos |
| 0.4.0 | HDU-3 | Composición Porcentual con gráficos |
| 0.5.0 | HDU-4 | Fórmula Empírica y Molecular |
| 1.0.0 | - | Primera versión estable |

