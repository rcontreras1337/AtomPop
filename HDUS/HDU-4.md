# HDU-4: Fórmula Empírica y Molecular

> **Prioridad:** 🟡 Media  
> **Estado:** ⏳ Pendiente  
> **Dependencias:** HDU-0 (completa)  
> **Estimación:** 3-4 horas

---

## 📖 Historia de Usuario

**Como** estudiante de química,  
**Quiero** calcular la fórmula empírica a partir de porcentajes y la fórmula molecular a partir de la empírica,  
**Para que** pueda resolver problemas de determinación de fórmulas en mis tareas.

---

## 🎯 Criterios de Aceptación

### Modo 1: Fórmula Empírica (desde %)
- [ ] Puedo agregar múltiples elementos con sus porcentajes
- [ ] Los porcentajes se validan (deben sumar ~100%)
- [ ] Obtengo la fórmula empírica resultante
- [ ] Veo el proceso paso a paso

### Modo 2: Fórmula Molecular (desde Empírica)
- [ ] Puedo ingresar una fórmula empírica
- [ ] Puedo ingresar la masa molar experimental
- [ ] Obtengo la fórmula molecular
- [ ] Veo el multiplicador usado

---

## 🎫 Tickets

### TICKET 4.1: Crear Página con Dos Modos
**Tipo:** UI/Página  
**Archivo(s):** `src/pages/EmpiricalPage.tsx`

**Tareas:**
- [ ] Crear estructura base de la página
- [ ] Implementar tabs o toggle para cambiar entre modos
- [ ] Modo 1: "Desde Porcentajes"
- [ ] Modo 2: "Desde Empírica"
- [ ] Animación suave al cambiar de modo

**Wireframe Modo 1:**
```
┌─────────────────────────────────────┐
│      🧬 Fórmula Empírica            │
├─────────────────────────────────────┤
│  [Desde %] | Desde Empírica         │
├─────────────────────────────────────┤
│                                     │
│  Elementos:                         │
│  ┌────────┬────────┬────────┐       │
│  │ Elem.  │   %    │        │       │
│  ├────────┼────────┼────────┤       │
│  │   C    │  40.0  │  [×]   │       │
│  │   H    │   6.7  │  [×]   │       │
│  │   O    │  53.3  │  [×]   │       │
│  └────────┴────────┴────────┘       │
│                                     │
│  [+ Agregar Elemento]               │
│                                     │
│  Total: 100% ✓                      │
│                                     │
│       [ Calcular Empírica ]         │
│                                     │
├─────────────────────────────────────┤
│  RESULTADO: CH₂O                    │
│  (Ver pasos del cálculo)            │
└─────────────────────────────────────┘
```

**Wireframe Modo 2:**
```
┌─────────────────────────────────────┐
│      🧬 Fórmula Molecular           │
├─────────────────────────────────────┤
│  Desde % | [Desde Empírica]         │
├─────────────────────────────────────┤
│                                     │
│  Fórmula Empírica: [___CH2O___]     │
│                                     │
│  Masa Molar Experimental: [__180__] │
│  (g/mol)                            │
│                                     │
│       [ Calcular Molecular ]        │
│                                     │
├─────────────────────────────────────┤
│  Masa Empírica: 30.03 g/mol         │
│  Multiplicador: 6                   │
│                                     │
│  RESULTADO: C₆H₁₂O₆                 │
│  (Glucosa)                          │
└─────────────────────────────────────┘
```

**Definición de Hecho:**
```
✓ Ambos modos funcionan
✓ Cambio de modo es suave
✓ Layout es claro y usable
```

---

### TICKET 4.2: Implementar Cálculo de Fórmula Empírica
**Tipo:** Lógica  
**Archivo(s):** `src/utils/chemistryEngine.ts`, `src/features/empirical/useEmpiricalFormula.ts`

**Tareas:**
- [ ] Crear función `calculateEmpiricalFormula(elements: ElementInput[]): EmpiricalResult`
- [ ] Implementar algoritmo:
  1. Convertir % a moles (% / masa atómica)
  2. Dividir todos por el menor valor
  3. Si no son enteros, multiplicar para obtener enteros
  4. Construir la fórmula

**Algoritmo Detallado:**
```
Entrada: C: 40%, H: 6.7%, O: 53.3%

Paso 1: Convertir a moles
  C: 40 / 12.011 = 3.33 mol
  H: 6.7 / 1.008 = 6.65 mol
  O: 53.3 / 15.999 = 3.33 mol

Paso 2: Dividir por el menor (3.33)
  C: 3.33 / 3.33 = 1
  H: 6.65 / 3.33 = 2
  O: 3.33 / 3.33 = 1

Paso 3: Ya son enteros ✓

Resultado: CH₂O
```

**Tipos:**
```typescript
interface ElementInput {
  symbol: string;
  percentage: number;
}

interface EmpiricalStep {
  step: number;
  description: string;
  values: { symbol: string; value: number }[];
}

interface EmpiricalResult {
  formula: string;
  steps: EmpiricalStep[];
  isValid: boolean;
  error?: string;
}
```

**Definición de Hecho:**
```
✓ CH₂O sale de C:40%, H:6.7%, O:53.3%
✓ Maneja casos que requieren multiplicar
✓ Pasos son claros y correctos
```

---

### TICKET 4.3: Implementar Cálculo de Fórmula Molecular
**Tipo:** Lógica  
**Archivo(s):** `src/utils/chemistryEngine.ts`, `src/features/empirical/useMolecularFormula.ts`

**Tareas:**
- [ ] Crear función `calculateMolecularFormula(empirical: string, experimentalMass: number): MolecularResult`
- [ ] Implementar algoritmo:
  1. Calcular masa molar de la fórmula empírica
  2. Dividir masa experimental / masa empírica = n
  3. Multiplicar subíndices de empírica × n

**Algoritmo Detallado:**
```
Entrada: Empírica = CH₂O, Masa Experimental = 180 g/mol

Paso 1: Masa de CH₂O
  C: 12.011 × 1 = 12.011
  H: 1.008 × 2 = 2.016
  O: 15.999 × 1 = 15.999
  Total: 30.026 g/mol

Paso 2: Multiplicador
  n = 180 / 30.026 = 5.99 ≈ 6

Paso 3: Fórmula Molecular
  C: 1 × 6 = 6
  H: 2 × 6 = 12
  O: 1 × 6 = 6
  
Resultado: C₆H₁₂O₆
```

**Tipos:**
```typescript
interface MolecularResult {
  empiricalFormula: string;
  molecularFormula: string;
  empiricalMass: number;
  experimentalMass: number;
  multiplier: number;
  isValid: boolean;
  error?: string;
}
```

**Definición de Hecho:**
```
✓ C₆H₁₂O₆ sale de CH₂O con 180 g/mol
✓ Redondea correctamente el multiplicador
✓ Maneja multiplicadores no enteros con tolerancia
```

---

### TICKET 4.4: Crear Formulario de Elementos Dinámico
**Tipo:** UI  
**Archivo(s):** `src/features/empirical/ElementInputList.tsx`

**Tareas:**
- [ ] Crear componente para lista de elementos editable
- [ ] Botón "Agregar elemento"
- [ ] Botón "Eliminar" en cada fila
- [ ] Dropdown para seleccionar elemento (con búsqueda)
- [ ] Input numérico para porcentaje
- [ ] Validación en tiempo real (suma de %)
- [ ] Indicador visual si suma ≠ 100%

**Props:**
```typescript
interface ElementInputListProps {
  elements: ElementInput[];
  onChange: (elements: ElementInput[]) => void;
  totalPercentage: number;
}
```

**Validaciones:**
- Mínimo 2 elementos
- Máximo 10 elementos
- No repetir elementos
- Porcentajes entre 0.01 y 99.99
- Advertencia si suma < 99% o > 101%

**Definición de Hecho:**
```
✓ Puedo agregar y eliminar elementos
✓ Búsqueda de elementos funciona
✓ Validaciones son claras
```

---

### TICKET 4.5: Mostrar Proceso Paso a Paso
**Tipo:** UI  
**Archivo(s):** `src/features/empirical/StepsDisplay.tsx`

**Tareas:**
- [ ] Crear componente que muestre los pasos del cálculo
- [ ] Cada paso expandible/colapsable
- [ ] Mostrar valores intermedios con precisión
- [ ] Animación de revelación progresiva
- [ ] Formato matemático legible

**Visual:**
```
┌─────────────────────────────────────┐
│ Paso 1: Convertir % a moles     [▼]│
├─────────────────────────────────────┤
│   C: 40.0 ÷ 12.011 = 3.33 mol      │
│   H: 6.7 ÷ 1.008 = 6.65 mol        │
│   O: 53.3 ÷ 15.999 = 3.33 mol      │
├─────────────────────────────────────┤
│ Paso 2: Dividir por el menor    [▼]│
├─────────────────────────────────────┤
│   Menor valor: 3.33                 │
│   C: 3.33 ÷ 3.33 = 1.00            │
│   H: 6.65 ÷ 3.33 = 2.00            │
│   O: 3.33 ÷ 3.33 = 1.00            │
├─────────────────────────────────────┤
│ Paso 3: Resultado               [▼]│
├─────────────────────────────────────┤
│   Fórmula Empírica: CH₂O           │
└─────────────────────────────────────┘
```

**Definición de Hecho:**
```
✓ Pasos son matemáticamente correctos
✓ Expandir/colapsar funciona
✓ Animaciones son suaves
```

---

## 🎨 Guía de Estilo Específica

### Tabs de Modo
```tsx
// Estilo de tabs
const tabStyles = {
  active: "bg-amber-500 text-slate-900 font-bold",
  inactive: "bg-slate-700 text-slate-300 hover:bg-slate-600"
};
```

### Formulario de Elementos
- Inputs en grid de 3 columnas
- Dropdown con búsqueda tipo "combobox"
- Botón de eliminar rojo al hover de la fila

### Pasos del Cálculo
- Fondo diferenciado para cada paso
- Iconos de número en círculos
- Transición accordion suave

---

## 📁 Estructura de Archivos

```
src/features/empirical/
├── useEmpiricalFormula.ts  # Hook para modo 1
├── useMolecularFormula.ts  # Hook para modo 2
├── ElementInputList.tsx    # Lista de inputs
├── StepsDisplay.tsx        # Pasos del cálculo
├── FormulaDisplay.tsx      # Resultado con subíndices
└── index.ts                # Exports
```

---

## ✅ Checklist Final HDU-4

- [ ] TICKET 4.1 completado
- [ ] TICKET 4.2 completado
- [ ] TICKET 4.3 completado
- [ ] TICKET 4.4 completado
- [ ] TICKET 4.5 completado
- [ ] Modo 1 (Empírica) funciona correctamente
- [ ] Modo 2 (Molecular) funciona correctamente
- [ ] Pasos son educativos y correctos
- [ ] Página accesible desde navegación
- [ ] Funciona en móvil
- [ ] Sin errores en consola
- [ ] Commit realizado

