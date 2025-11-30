# HDU-5: Balanceador de Ecuaciones Químicas

> **Prioridad:** 🔴 Alta  
> **Estado:** ⏳ Pendiente  
> **Dependencias:** HDU-0 (completa)  
> **Estimación:** 6-8 horas  
> **Versión:** `0.6.0` (MINOR)

---

## 📖 Historia de Usuario

**Como** estudiante de química,  
**Quiero** balancear ecuaciones químicas automáticamente,  
**Para que** pueda verificar mis cálculos de estequiometría y aprender el proceso.

---

## 🎯 Criterios de Aceptación

### Funcionalidad Principal
- [ ] Puedo ingresar reactivos y productos separados
- [ ] El sistema balancea la ecuación automáticamente
- [ ] Veo los coeficientes estequiométricos resultantes
- [ ] Puedo ver el proceso paso a paso (opcional)
- [ ] Maneja ecuaciones simples y medianamente complejas

### Validaciones
- [ ] Detecta ecuaciones imposibles de balancear
- [ ] Verifica conservación de masa
- [ ] Muestra errores claros si la ecuación es inválida

---

## 🎫 Tickets

### TICKET 5.1: Crear Página del Balanceador
**Tipo:** UI/Página  
**Archivo(s):** `src/pages/BalancerPage.tsx`

**Tareas:**
- [ ] Crear estructura base de la página
- [ ] Input para lado izquierdo (reactivos)
- [ ] Input para lado derecho (productos)
- [ ] Botón "Balancear"
- [ ] Área de resultado

**Wireframe:**
```
┌─────────────────────────────────────────────────┐
│      ⚖️ Balanceador de Ecuaciones               │
├─────────────────────────────────────────────────┤
│                                                 │
│  Reactivos:                 Productos:          │
│  ┌─────────────────┐  →    ┌─────────────────┐ │
│  │ H2 + O2         │       │ H2O             │ │
│  └─────────────────┘       └─────────────────┘ │
│                                                 │
│           [ Balancear Ecuación ]                │
│                                                 │
├─────────────────────────────────────────────────┤
│  RESULTADO:                                     │
│                                                 │
│     2 H₂ + 1 O₂  →  2 H₂O                      │
│                                                 │
│  ✓ Masa conservada: 36.032 g = 36.032 g        │
└─────────────────────────────────────────────────┘
```

---

### TICKET 5.2: Implementar Algoritmo de Balanceo
**Tipo:** Lógica  
**Archivo(s):** `src/utils/chemistryEngine.ts`, `src/features/balancer/useBalancer.ts`

**Tareas:**
- [ ] Parsear ecuación en reactivos y productos
- [ ] Construir matriz de elementos
- [ ] Implementar método de eliminación gaussiana o algebraico
- [ ] Encontrar coeficientes mínimos enteros
- [ ] Verificar conservación de masa

**Algoritmo (simplificado):**
```
1. Parsear: "H2 + O2 -> H2O"
   → Reactivos: [{H: 2}, {O: 2}]
   → Productos: [{H: 2, O: 1}]

2. Construir sistema de ecuaciones:
   H: 2a = 2c
   O: 2b = c

3. Resolver para coeficientes mínimos:
   a=2, b=1, c=2

4. Resultado: 2H₂ + O₂ → 2H₂O
```

**Tipos:**
```typescript
interface BalanceResult {
  isBalanced: boolean;
  reactants: { formula: string; coefficient: number }[];
  products: { formula: string; coefficient: number }[];
  equation: string;  // Ecuación formateada
  steps?: BalanceStep[];
  error?: string;
}

interface BalanceStep {
  step: number;
  description: string;
  equation: string;
}
```

---

### TICKET 5.3: Crear Componentes de UI
**Tipo:** UI  
**Archivo(s):** `src/features/balancer/`

**Componentes:**
- [ ] `EquationInput.tsx` - Input para fórmulas múltiples
- [ ] `BalancedEquation.tsx` - Display del resultado
- [ ] `MassVerification.tsx` - Verificación de conservación
- [ ] `BalanceSteps.tsx` - Proceso paso a paso (opcional)

---

### TICKET 5.4: Tests Unitarios
**Tipo:** Testing  
**Archivo(s):** `src/features/balancer/*.test.ts`

**Tests a crear:**
```typescript
describe('useBalancer', () => {
  it('debe balancear H2 + O2 -> H2O correctamente');
  it('debe balancear Fe + O2 -> Fe2O3');
  it('debe balancear CH4 + O2 -> CO2 + H2O');
  it('debe detectar ecuaciones ya balanceadas');
  it('debe manejar ecuaciones inválidas');
  it('debe verificar conservación de masa');
});
```

---

### TICKET 5.5: Tests E2E
**Tipo:** Testing E2E  
**Archivo(s):** `cypress/e2e/hdu-5-balancer.cy.ts`

**Escenarios:**
- [ ] Página carga correctamente
- [ ] Balancear ecuación simple (H2 + O2)
- [ ] Balancear ecuación media (combustión)
- [ ] Mostrar error en ecuación inválida
- [ ] Responsive

---

## 📁 Estructura de Archivos

```
src/features/balancer/
├── useBalancer.ts           # Hook principal
├── useBalancer.test.ts      # Tests
├── EquationInput.tsx        # Input de ecuación
├── BalancedEquation.tsx     # Display resultado
├── MassVerification.tsx     # Verificación masa
├── BalanceSteps.tsx         # Pasos opcionales
└── index.ts                 # Exports
```

---

## 🎨 Guía de Estilo

- **Color principal:** Naranja/Amber (para equilibrio)
- **Icono:** ⚖️ o Scale
- **Animación:** Los coeficientes aparecen con efecto "pop"

---

## 📊 Métricas Esperadas

| Métrica | Valor |
|---------|-------|
| Tests unitarios | ~20 |
| Tests E2E | ~10 |
| Archivos nuevos | 7+ |

---

## ⚠️ Limitaciones Conocidas

1. Ecuaciones redox complejas pueden no balancearse correctamente
2. No soporta estados de agregación (g), (l), (s), (aq)
3. Máximo ~10 especies químicas por ecuación

---

## ✅ Checklist Final

- [ ] TICKET 5.1 completado
- [ ] TICKET 5.2 completado
- [ ] TICKET 5.3 completado
- [ ] TICKET 5.4 completado (Tests unitarios)
- [ ] TICKET 5.5 completado (Tests E2E)
- [ ] Página accesible desde navegación
- [ ] Responsive verificado
- [ ] CHANGELOG actualizado
- [ ] README actualizado

