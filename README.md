# 🧪 AtomPop - Calculadora de Química Educativa

![AtomPop Logo](https://img.shields.io/badge/AtomPop-v0.5.1-amber?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![Tests](https://img.shields.io/badge/Tests-303%20passing-22c55e?style=flat-square)

> **Una calculadora web de química amigable, visualmente atractiva y accesible para estudiantes**, inspirada en el estilo visual de "Lluvia de Hamburguesas" (Cloudy with a Chance of Meatballs).

---

## 📸 Vista Previa

La aplicación presenta una interfaz de "laboratorio divertido" con:
- 🎨 Paleta de colores neón sobre fondo oscuro
- 🔘 Botones estilo "emergencia" con efecto 3D
- 🧪 Inputs tipo "tubo de ensayo"
- 🫧 Burbujas y moléculas animadas flotantes
- ✨ Efectos glassmorphism en tarjetas

---

## 🚀 Características

### Calculadoras Disponibles

| Módulo | Descripción | Estado |
|--------|-------------|--------|
| **Masa Molar** | Calcula la masa molar de cualquier compuesto con desglose | ✅ Funcional |
| **Conversor** | Convierte entre moles, gramos y partículas | ✅ Funcional |
| **Composición %** | Gráfico circular con porcentajes de masa | ✅ Funcional |
| **Fórmula Empírica** | Calcula fórmulas empírica y molecular | ✅ Funcional |

### Motor de Cálculo

- ✅ Parser de fórmulas químicas (soporta paréntesis: `Ca(OH)2`, `Al2(SO4)3`)
- ✅ Cálculo de masa molar con desglose por elemento
- ✅ Conversiones moles ↔ gramos ↔ partículas
- ✅ Composición porcentual
- ✅ Cálculo de fórmula empírica desde porcentajes
- ✅ Cálculo de fórmula molecular desde empírica
- ✅ Tabla periódica con 74 elementos

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|------------|-----|
| **React 19** | Framework de UI |
| **TypeScript** | Tipado estático |
| **Vite 7** | Build tool y dev server |
| **Tailwind CSS 4** | Estilos utilitarios |
| **Framer Motion** | Animaciones |
| **React Router 7** | Navegación SPA |
| **Vitest** | Testing unitario |
| **Cypress** | Testing E2E |
| **Lucide React** | Iconografía |

---

## 📦 Instalación

### Prerrequisitos

- Node.js >= 18.x
- npm >= 9.x

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/rcontreras1337/AtomPop.git
cd AtomPop

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🧪 Testing

El proyecto incluye tests unitarios y tests E2E (end-to-end).

### Tests Unitarios (Vitest)

```bash
# Ejecutar tests una vez
npm run test:run

# Ejecutar tests en modo watch
npm test

# Ejecutar tests con cobertura
npm run test:coverage
```

### Tests E2E (Cypress)

```bash
# Abrir Cypress UI (recomendado - NO headless)
npm run e2e

# Ejecutar en modo headless (para CI)
npm run e2e:headless
```

> **Nota:** Los tests E2E requieren que el servidor de desarrollo esté corriendo (`npm run dev`)

### Cobertura de Tests

#### Tests Unitarios (Vitest)

| Archivo | Tests | Estado |
|---------|-------|--------|
| `formulaParser.ts` | 24 | ✅ |
| `chemistryEngine.ts` | 37 | ✅ |
| `usePeriodicTable.ts` | 22 | ✅ |
| `useMolarMass.ts` | 17 | ✅ |
| `MassBreakdown.tsx` | 11 | ✅ |
| `useConverter.ts` | 24 | ✅ |
| `useComposition.ts` | 15 | ✅ |
| `useEmpiricalFormula.ts` | 18 | ✅ |
| `useMolecularFormula.ts` | 18 | ✅ |
| **Total Unitarios** | **186** | ✅ |

#### Tests E2E (Cypress)

| Suite | Escenarios | Estado |
|-------|------------|--------|
| `hdu-0-navigation.cy.ts` | Navegación, responsive, menú | ✅ |
| `hdu-1-molar-mass.cy.ts` | Calculadora masa molar | ✅ |
| `hdu-2-converter.cy.ts` | Conversor de unidades | ✅ |
| `hdu-3-composition.cy.ts` | Composición porcentual | ✅ |
| `hdu-4-empirical.cy.ts` | Fórmulas empírica/molecular | ✅ |
| **Total E2E** | **117** | ✅ |

---

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── ui/
│       ├── Button.tsx
│       ├── ChemicalInput.tsx
│       ├── ElementBadge.tsx
│       └── ResultCard.tsx
├── data/
│   ├── elements.ts      # Tipos y helpers de elementos
│   └── periodic-table.json  # Datos de 74 elementos
├── hooks/
│   └── usePeriodicTable.ts  # Hook de acceso a tabla periódica
├── layouts/
│   └── MainLayout.tsx   # Layout principal con navbar
├── pages/
│   ├── HomePage.tsx
│   ├── MolarMassPage.tsx      # ✅ Funcional
│   ├── ConverterPage.tsx      # ✅ Funcional
│   ├── CompositionPage.tsx    # ✅ Funcional
│   └── EmpiricalPage.tsx      # ✅ Funcional
├── features/
│   ├── molar-mass/            # HDU-1
│   ├── converter/             # HDU-2
│   ├── composition/           # HDU-3
│   └── empirical/             # HDU-4
├── utils/
│   ├── formulaParser.ts     # Parser de fórmulas químicas
│   ├── chemistryEngine.ts   # Motor de cálculos
│   └── *.test.ts            # Tests unitarios
├── router.tsx           # Configuración de rutas
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales AtomPop
```

---

## 🎮 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm test` | Ejecuta tests en modo watch |
| `npm run test:run` | Ejecuta tests una vez |
| `npm run test:coverage` | Tests con reporte de cobertura |
| `npm run e2e` | Abre Cypress UI para tests E2E |
| `npm run e2e:headless` | Ejecuta tests E2E en modo headless |
| `npm run verify` | **Lint + Tests + Build** (verificación completa) |

---

## 🔒 Git Hooks (Husky)

El proyecto utiliza **Husky** para ejecutar verificaciones automáticas antes de commits y pushes:

| Hook | Verificaciones |
|------|----------------|
| **pre-commit** | Lint (ESLint) |
| **pre-push** | Lint + Tests unitarios + Build de producción |

Esto asegura que:
- ✅ No se hagan commits con errores de lint
- ✅ No se haga push de código que no compile
- ✅ No se haga push si los tests unitarios fallan

> **Nota:** Los tests E2E **NO** se ejecutan en los hooks (son lentos). Ejecuta `npm run e2e` manualmente cuando necesites verificar la UI.

---

## 🧬 Uso del Motor Químico

### Calcular Masa Molar

```typescript
import { calculateMolarMass } from './utils/chemistryEngine';

const result = calculateMolarMass('H2SO4');
// result.totalMass = 98.079
// result.breakdown = [
//   { symbol: 'H', count: 2, subtotal: 2.016 },
//   { symbol: 'S', count: 1, subtotal: 32.06 },
//   { symbol: 'O', count: 4, subtotal: 63.996 }
// ]
```

### Convertir Unidades

```typescript
import { convertUnits } from './utils/chemistryEngine';

const result = convertUnits('H2O', 1, 'moles');
// result.moles = 1
// result.grams = 18.015
// result.particles = 6.022e23
```

### Parsear Fórmulas

```typescript
import { parseFormula } from './utils/formulaParser';

const result = parseFormula('Ca(OH)2');
// result.elements = [
//   { symbol: 'Ca', count: 1 },
//   { symbol: 'O', count: 2 },
//   { symbol: 'H', count: 2 }
// ]
```

---

## 📋 Roadmap

### ✅ Completado (v0.5.0)

- [x] **HDU-0:** Infraestructura y Motor Químico
- [x] **HDU-1:** Calculadora de Masa Molar
- [x] **HDU-2:** Conversor Moles/Gramos/Átomos
- [x] **HDU-3:** Composición Porcentual con gráficos
- [x] **HDU-4:** Fórmula Empírica y Molecular

### 🐛 Fixes

- [x] **FIX-1:** Botón "Limpiar valores" con icono mal posicionado ✅ (v0.5.1)
- [ ] **FIX-2:** Botón de Tabla Periódica sin funcionalidad (v0.6.0)

### 🔮 Mejoras Futuras

- [ ] **HDU-5:** Balanceador de Ecuaciones Químicas (v0.6.0)
- [ ] **HDU-6:** Calculadora de pH (v0.7.0)
- [ ] **HDU-7:** Modo Oscuro/Claro toggle (v0.8.0)
- [ ] **HDU-8:** PWA - App instalable (v0.9.0)
- [ ] **HDU-9:** Exportar resultados a PDF (v0.10.0)
- [ ] **HDU-10:** Ampliar tabla periódica a 118 elementos (v0.11.0)

Ver carpeta `HDUS/` para detalles de cada historia de usuario y `HDUS/fixes/` para correcciones de bugs.

---

## 📜 Historial de Versiones

| Versión | Fecha | HDU | Descripción |
|---------|-------|-----|-------------|
| `0.5.1` | 2024-11-30 | FIX-1 | Botón limpiar corregido, CI solo en PR |
| `0.5.0` | 2024-11-30 | HDU-4 | Fórmula Empírica y Molecular, 186+117 tests |
| `0.4.0` | 2024-11-30 | HDU-3 | Composición Porcentual con gráfico, 165+86 tests |
| `0.3.0` | 2024-11-30 | HDU-2 | Conversor Moles/Gramos/Partículas, 159+61 tests |
| `0.2.1` | 2024-11-30 | - | CI/CD, Cypress E2E (37 tests), Husky hooks |
| `0.2.0` | 2024-11-29 | HDU-1 | Calculadora de Masa Molar funcional, 111 tests |
| `0.1.0` | 2024-11-29 | HDU-0 | Infraestructura base, motor químico, 83 tests |
| `0.0.0` | 2024-11-29 | - | Init del proyecto con Vite + React + TS |

Para ver el historial completo de cambios, consulta [CHANGELOG.md](./CHANGELOG.md).

Para entender el sistema de versionamiento, consulta [VERSIONING.md](./VERSIONING.md).

---

## 📊 Estado del Proyecto

| Métrica | Valor |
|---------|-------|
| Calculadoras funcionales | 4/4 ✅ |
| Tests unitarios | 186 |
| Tests E2E | 117 |
| **Tests totales** | **303** |
| HDUs completadas | 5/10 |
| Fixes pendientes | 1 |
| Versión actual | 0.5.1 |
| Elementos en tabla | 74 (→ 118) |

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de uso educativo.

---

## 👨‍🔬 Autor: Rubén Contreras

Desarrollado con 🧪 y ☕ para estudiantes de química.

*Inspirado en el laboratorio del Dr. Flint Lockwood*
