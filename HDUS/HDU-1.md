# HDU-1: Calculadora de Masa Molar

> **Prioridad:** 🔴 Alta  
> **Estado:** ⏳ Pendiente  
> **Dependencias:** HDU-0 (completa)  
> **Estimación:** 3-4 horas  
> **Versión:** `0.2.0` (MINOR)

---

## 📖 Historia de Usuario

**Como** estudiante de química,  
**Quiero** ingresar una fórmula química y obtener su masa molar con el desglose de cada elemento,  
**Para que** pueda entender cómo se calcula y verificar mis ejercicios de clase.

---

## 🎯 Criterios de Aceptación

- [ ] Puedo escribir una fórmula química en un campo de texto
- [ ] La fórmula se valida en tiempo real
- [ ] Si la fórmula es inválida, veo un mensaje de error claro
- [ ] Si la fórmula es válida, veo:
  - La masa molar total en g/mol
  - El desglose elemento por elemento
  - Una animación atractiva al mostrar el resultado
- [ ] Puedo copiar el resultado al portapapeles
- [ ] La interfaz es responsive (funciona en móvil)

---

## 🎫 Tickets

### TICKET 1.1: Crear Página de Masa Molar
**Tipo:** UI/Página  
**Archivo(s):** `src/pages/MolarMassPage.tsx`

**Tareas:**
- [ ] Crear estructura base de la página
- [ ] Agregar título y descripción explicativa
- [ ] Incluir el componente `ChemicalInput` para la fórmula
- [ ] Agregar botón "Calcular"
- [ ] Zona de resultados (inicialmente vacía)

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

### TICKET 1.2: Implementar Lógica de Cálculo
**Tipo:** Integración  
**Archivo(s):** `src/pages/MolarMassPage.tsx`, `src/features/molar-mass/useMolarMass.ts`

**Tareas:**
- [ ] Crear hook `useMolarMass` que encapsule la lógica
- [ ] Conectar input con el parser de fórmulas
- [ ] Llamar a `calculateMolarMass` del engine
- [ ] Manejar estados: `idle`, `calculating`, `success`, `error`
- [ ] Guardar historial de cálculos en estado local (últimos 5)

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

### TICKET 1.3: Crear Componente de Desglose
**Tipo:** UI  
**Archivo(s):** `src/features/molar-mass/MassBreakdown.tsx`

**Tareas:**
- [ ] Crear componente que muestre el desglose paso a paso
- [ ] Cada elemento muestra:
  - Badge con símbolo y color
  - Cantidad (subíndice en fórmula)
  - Masa atómica individual
  - Subtotal (masa × cantidad)
- [ ] Línea final con el total
- [ ] Animación de entrada escalonada (stagger)

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

### TICKET 1.4: Agregar Validación Visual
**Tipo:** UX  
**Archivo(s):** `src/pages/MolarMassPage.tsx`, `src/components/ui/ChemicalInput.tsx`

**Tareas:**
- [ ] Validar fórmula mientras el usuario escribe (debounce 300ms)
- [ ] Mostrar indicador de estado:
  - 🟢 Verde: Fórmula válida
  - 🔴 Rojo: Fórmula inválida
  - ⚪ Neutro: Campo vacío
- [ ] Animación de "shake" cuando hay error
- [ ] Tooltip con mensaje de error específico

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

### TICKET 1.5: Agregar Funcionalidades Extra
**Tipo:** UX/Feature  
**Archivo(s):** `src/pages/MolarMassPage.tsx`

**Tareas:**
- [ ] Botón "Copiar resultado" con feedback visual
- [ ] Botón "Limpiar" para resetear
- [ ] Mostrar fórmulas de ejemplo clickeables:
  - H₂O (Agua)
  - NaCl (Sal)
  - C₆H₁₂O₆ (Glucosa)
  - H₂SO₄ (Ácido Sulfúrico)
- [ ] Al clickear un ejemplo, se llena el input automáticamente
- [ ] Historial de últimos 5 cálculos (clickeables)

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

### TICKET 1.6: Tests Unitarios
**Tipo:** Testing  
**Archivo(s):** `src/features/molar-mass/useMolarMass.test.ts`, `src/features/molar-mass/MassBreakdown.test.tsx`

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

- [ ] TICKET 1.1 completado
- [ ] TICKET 1.2 completado
- [ ] TICKET 1.3 completado
- [ ] TICKET 1.4 completado
- [ ] TICKET 1.5 completado
- [ ] **TICKET 1.6 completado (Tests)**
- [ ] Página accesible desde navegación
- [ ] Funciona en móvil
- [ ] Sin errores en consola
- [ ] Todos los tests pasan (`npm run test:run`)
- [ ] CHANGELOG.md actualizado
- [ ] Versión actualizada a `0.2.0`
- [ ] Commit realizado con tag `v0.2.0`

