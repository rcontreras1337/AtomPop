# FIX-3: UX Confusa y Lógica Incorrecta en Calculadora de Fórmula Molecular

> **Prioridad:** 🔴 Alta  
> **Estado:** ✅ Completado  
> **Tipo:** Bug / UX / Educativo  
> **Versión:** `0.6.1` (PATCH)  
> **Fecha Completado:** 2025-12-01

---

## 🐛 Descripción del Problema

La calculadora de Fórmula Molecular (modo "Desde Empírica") tiene **bugs de lógica** y **problemas de UX** que producen resultados incorrectos y confunden al usuario.

### Problema 1: Resultados INCORRECTOS con masas menores a la empírica

**Ejemplo reproducible:**
1. Cargar ejemplo CH2O (masa empírica = 30.026 g/mol)
2. Cambiar masa experimental a **28 g/mol**
3. Presionar "Calcular"
4. **Resultado incorrecto:** H₂CO con multiplicador n = 1

**Por qué es incorrecto:**
- El multiplicador real es `28 / 30.026 = 0.932`
- Un multiplicador < 1 significa que la fórmula molecular sería **más pequeña** que la empírica
- Esto es **químicamente imposible** - la fórmula molecular siempre es un múltiplo entero (≥1) de la empírica
- El código redondea 0.932 a 1 y acepta el resultado, produciendo un cálculo incorrecto

### Problema 2: Mensaje de error no educativo

Cuando el multiplicador no es un entero (ej: 101 / 30.026 = 3.36), aparece:
> "El multiplicador (3.36) no es un entero. Verifica la masa molar experimental."

Este mensaje **no explica**:
- ¿Qué es un multiplicador?
- ¿Por qué debe ser entero?
- ¿Cuáles valores SÍ funcionarían?

### Problema 3: Versión hardcodeada en el footer

En `MainLayout.tsx` la versión está escrita manualmente:
```typescript
<span>v0.6.0</span>
```
Cada vez que se actualiza la versión hay que cambiarla en dos lugares (package.json y MainLayout).

---

## 📍 Ubicación de los Bugs

| Archivo | Líneas | Descripción |
|---------|--------|-------------|
| `src/utils/chemistryEngine.ts` | 477-493 | Función `calculateMolecularFormula` - No valida que multiplicador >= 1 |
| `src/features/empirical/useMolecularFormula.ts` | 81-91 | Hook - Validación permisiva `mass < empiricalMass * 0.9` |
| `src/layouts/MainLayout.tsx` | 226 | Versión hardcodeada |

---

## 🔍 Causa Raíz

### En `chemistryEngine.ts`:
```typescript
// Línea 478-479
const rawMultiplier = experimentalMass / empiricalMass;
const multiplier = Math.round(rawMultiplier);

// Línea 482 - La tolerancia 0.1 es muy permisiva
if (Math.abs(rawMultiplier - multiplier) > 0.1) {
  return { isValid: false, error: ... };
}

// ⚠️ NO HAY VALIDACIÓN DE QUE multiplier >= 1
```

**Ejemplo del bug:**
- CH2O = 30.026 g/mol, experimental = 28 g/mol
- `rawMultiplier = 28 / 30.026 = 0.932`
- `Math.round(0.932) = 1`
- `|0.932 - 1| = 0.068 < 0.1` → **PASA** (incorrectamente)
- Devuelve multiplicador = 1, pero el cálculo es inválido

### En `useMolecularFormula.ts`:
```typescript
// Línea 88 - Validación muy permisiva (90% de la masa)
if (mass < empiricalMass * 0.9) return false;
```
Con 28 < 30.026 * 0.9 = 27.02, entonces 28 > 27.02 → **PASA** (no debería)

---

## ✅ Solución Propuesta

### TICKET FIX-3.1: Corregir lógica de validación del multiplicador

**Archivo:** `src/utils/chemistryEngine.ts`

```typescript
// ANTES (buggy)
const rawMultiplier = experimentalMass / empiricalMass;
const multiplier = Math.round(rawMultiplier);

if (Math.abs(rawMultiplier - multiplier) > 0.1) {
  return { isValid: false, error: `El multiplicador (${rawMultiplier.toFixed(2)}) no es un entero...` };
}

// DESPUÉS (corregido)
const rawMultiplier = experimentalMass / empiricalMass;

// El multiplicador debe ser >= 1 (la molecular no puede ser menor que la empírica)
if (rawMultiplier < 0.95) {
  const minMass = empiricalMass;
  const suggestions = [1, 2, 3, 4, 5, 6].map(n => (empiricalMass * n).toFixed(2));
  return {
    empiricalFormula: empiricalResult.formulaNormalized,
    molecularFormula: '',
    molecularFormulaFormatted: '',
    empiricalMass,
    experimentalMass,
    multiplier: rawMultiplier,
    isValid: false,
    error: `La masa molar experimental (${experimentalMass} g/mol) es menor que la masa de la fórmula empírica (${empiricalMass.toFixed(2)} g/mol).

La fórmula molecular no puede ser más pequeña que la fórmula empírica.

💡 Masas válidas: ${suggestions.join(', ')} g/mol`,
  };
}

const multiplier = Math.round(rawMultiplier);

// Verificar que el multiplicador redondeado sea cercano al valor real
// Tolerancia más estricta: 5% en lugar de 0.1 absoluto
if (Math.abs(rawMultiplier - multiplier) > 0.05) {
  const lowerMass = (Math.floor(rawMultiplier) * empiricalMass).toFixed(2);
  const upperMass = (Math.ceil(rawMultiplier) * empiricalMass).toFixed(2);
  
  return {
    // ... otros campos ...
    isValid: false,
    error: `El multiplicador n = ${experimentalMass} ÷ ${empiricalMass.toFixed(2)} = ${rawMultiplier.toFixed(2)}

Para obtener una fórmula molecular válida, el multiplicador (n) debe ser un número entero (1, 2, 3...).

💡 ¿Qué es el multiplicador?
El multiplicador indica cuántas veces se repite la fórmula empírica en la molecular.
Ejemplo: Si la empírica es CH₂O y n = 6, la molecular es C₆H₁₂O₆ (glucosa).

💡 Masas válidas cercanas:
• ${lowerMass} g/mol → n = ${Math.floor(rawMultiplier)}
• ${upperMass} g/mol → n = ${Math.ceil(rawMultiplier)}`,
  };
}
```

---

### TICKET FIX-3.2: Mejorar validación en el hook

**Archivo:** `src/features/empirical/useMolecularFormula.ts`

```typescript
// NUEVO: Estado con mensaje de validación
const { canCalculate, validationMessage, suggestedMasses } = useMemo(() => {
  if (!isValidFormula || empiricalMass === null) {
    return { canCalculate: false, validationMessage: null, suggestedMasses: [] };
  }
  
  const mass = parseFloat(experimentalMass);
  
  if (isNaN(mass) || mass <= 0) {
    return { canCalculate: false, validationMessage: null, suggestedMasses: [] };
  }
  
  // Calcular sugerencias siempre
  const suggestions = [1, 2, 3, 4, 5, 6].map(n => ({
    n,
    mass: (empiricalMass * n).toFixed(2)
  }));
  
  // La masa experimental debe ser >= masa empírica
  if (mass < empiricalMass) {
    return { 
      canCalculate: false, 
      validationMessage: `La masa experimental (${mass} g/mol) debe ser igual o mayor que la masa empírica (${empiricalMass.toFixed(2)} g/mol).`,
      suggestedMasses: suggestions
    };
  }
  
  return { canCalculate: true, validationMessage: null, suggestedMasses: suggestions };
}, [isValidFormula, empiricalMass, experimentalMass]);
```

**Agregar al return del hook:**
```typescript
return {
  // ... existente ...
  validationMessage,    // NUEVO
  suggestedMasses,      // NUEVO
};
```

---

### TICKET FIX-3.3: Mostrar advertencia en la UI

**Archivo:** `src/pages/EmpiricalPage.tsx`

Agregar debajo del input de masa experimental:

```tsx
{/* Advertencia cuando la masa es inválida */}
{experimentalMass && !canCalculate && validationMessage && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
  >
    <div className="flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div className="space-y-2">
        <p className="text-amber-300 text-sm font-medium">
          {validationMessage}
        </p>
        {suggestedMasses.length > 0 && (
          <div className="text-amber-400/80 text-sm">
            <span className="font-medium">💡 Valores válidos:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {suggestedMasses.slice(0, 4).map(({ n, mass }) => (
                <button
                  key={n}
                  onClick={() => setExperimentalMass(mass)}
                  className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 
                             text-amber-300 text-xs transition-colors"
                >
                  {mass} g/mol (n={n})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </motion.div>
)}
```

---

### TICKET FIX-3.4: Agregar sección educativa "¿Cómo funciona?"

**Archivo:** `src/pages/EmpiricalPage.tsx`

Agregar sección informativa visible siempre en el modo "Desde Empírica":

```tsx
{/* Sección educativa */}
<div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
  <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
    <Lightbulb size={16} className="text-neon-amber" />
    ¿Cómo funciona?
  </h4>
  <div className="text-sm text-slate-400 space-y-2">
    <p>
      La <strong className="text-white">fórmula molecular</strong> es un múltiplo entero 
      de la <strong className="text-white">fórmula empírica</strong>.
    </p>
    <p className="font-mono bg-lab-surface/50 px-2 py-1 rounded inline-block">
      n = Masa experimental ÷ Masa empírica
    </p>
    <p>
      El multiplicador <strong className="text-white">n</strong> debe ser un número 
      entero (1, 2, 3, 4...).
    </p>
    <div className="mt-2 p-2 bg-lab-surface/30 rounded-lg">
      <span className="text-slate-500">Ejemplo:</span>{' '}
      <span className="text-slate-300">
        CH₂O (30 g/mol) con 180 g/mol → n = 6 → C₆H₁₂O₆ (glucosa)
      </span>
    </div>
  </div>
</div>
```

---

### TICKET FIX-3.5: Leer versión desde package.json automáticamente

**Archivo nuevo:** `src/config/version.ts`

```typescript
// Importar versión desde package.json usando Vite
import packageJson from '../../package.json';

export const APP_VERSION = packageJson.version;
```

**Archivo:** `vite.config.ts` - Agregar configuración:

```typescript
// Agregar al resolve.alias o agregar json import
export default defineConfig({
  // ...
  json: {
    stringify: true // permite importar JSON
  }
});
```

**Archivo:** `src/layouts/MainLayout.tsx`

```typescript
// ANTES
<span className="text-slate-400 text-sm font-mono">
  v0.6.0
</span>

// DESPUÉS
import { APP_VERSION } from '../config/version';

// En el JSX:
<span className="text-slate-400 text-sm font-mono">
  v{APP_VERSION}
</span>
```

---

## 🧪 Tests Requeridos

### Tests Unitarios (Vitest)

```typescript
// src/utils/chemistryEngine.test.ts
describe('calculateMolecularFormula', () => {
  describe('validación de multiplicador', () => {
    it('debe rechazar masa experimental menor a la empírica', () => {
      const result = calculateMolecularFormula('CH2O', 28); // 28 < 30.026
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('menor que la masa');
    });

    it('debe rechazar multiplicador no entero (3.36)', () => {
      const result = calculateMolecularFormula('CH2O', 101);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('número entero');
    });

    it('debe aceptar multiplicador exacto (n=6)', () => {
      const result = calculateMolecularFormula('CH2O', 180.156);
      expect(result.isValid).toBe(true);
      expect(result.multiplier).toBe(6);
      expect(result.molecularFormula).toBe('C6H12O6');
    });

    it('debe sugerir masas válidas en el mensaje de error', () => {
      const result = calculateMolecularFormula('CH2O', 101);
      expect(result.error).toContain('Masas válidas');
    });
  });
});

// src/features/empirical/useMolecularFormula.test.ts
describe('useMolecularFormula', () => {
  it('debe mostrar validationMessage cuando masa < empírica', () => {
    // ...
  });

  it('debe sugerir masas válidas', () => {
    // ...
  });

  it('no debe permitir calcular con masa inválida', () => {
    // ...
  });
});
```

### Tests E2E (Cypress)

```typescript
// cypress/e2e/hdu-4-empirical.cy.ts - Agregar casos
describe('Fórmula Molecular - Validaciones', () => {
  beforeEach(() => {
    cy.visit('/formula-empirica');
    cy.contains('Desde Empírica').click();
    cy.contains('Cargar ejemplo').click();
  });

  it('debe mostrar advertencia cuando masa < masa empírica', () => {
    cy.get('input[type="number"]').clear().type('28');
    cy.contains('debe ser igual o mayor').should('be.visible');
    cy.contains('Valores válidos').should('be.visible');
  });

  it('debe permitir seleccionar masa sugerida', () => {
    cy.get('input[type="number"]').clear().type('28');
    cy.contains('60.05 g/mol').click();
    cy.get('input[type="number"]').should('have.value', '60.05');
  });

  it('debe mostrar error educativo con multiplicador no entero', () => {
    cy.get('input[type="number"]').clear().type('101');
    cy.contains('CALCULAR').click();
    cy.contains('número entero').should('be.visible');
    cy.contains('¿Qué es el multiplicador?').should('be.visible');
  });

  it('debe mostrar sección educativa "¿Cómo funciona?"', () => {
    cy.contains('¿Cómo funciona?').should('be.visible');
    cy.contains('múltiplo entero').should('be.visible');
  });
});

describe('Footer - Versión dinámica', () => {
  it('debe mostrar la versión desde package.json', () => {
    cy.visit('/');
    cy.get('footer').should('contain', 'v0.6.1');
  });
});
```

---

## 🎨 Diseño Visual Propuesto

### Estado: Masa menor a la empírica
```
┌─────────────────────────────────────────────────────────────────┐
│  Masa Molar Experimental                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                        28                           g/mol │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ⚠️ La masa experimental (28 g/mol) debe ser igual o     │  │
│  │    mayor que la masa empírica (30.03 g/mol).             │  │
│  │                                                           │  │
│  │    💡 Valores válidos:                                   │  │
│  │    ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │  │
│  │    │30.03 n=1 │ │60.05 n=2 │ │90.08 n=3 │ │120.1 n=4 │  │  │
│  │    └──────────┘ └──────────┘ └──────────┘ └──────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [ CALCULAR FÓRMULA MOLECULAR ] ← Deshabilitado                │
└─────────────────────────────────────────────────────────────────┘
```

### Estado: Multiplicador no entero (error educativo)
```
┌─────────────────────────────────────────────────────────────────┐
│  ❌ El resultado no es válido                                   │
│                                                                 │
│  El multiplicador n = 101 ÷ 30.03 = 3.36                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 💡 ¿Qué es el multiplicador?                             │  │
│  │                                                           │  │
│  │ El multiplicador (n) indica cuántas veces se repite      │  │
│  │ la fórmula empírica en la molecular.                     │  │
│  │                                                           │  │
│  │ Para que la fórmula sea válida, n debe ser un número     │  │
│  │ entero (1, 2, 3, 4...).                                  │  │
│  │                                                           │  │
│  │ Ejemplo: CH₂O con n = 6 → C₆H₁₂O₆ (glucosa)             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  💡 Masas válidas cercanas:                                    │
│     • 90.08 g/mol → n = 3 → C₃H₆O₃                            │
│     • 120.10 g/mol → n = 4 → C₄H₈O₄                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Checklist

### Desarrollo
- [x] FIX-3.1: Corregir lógica de validación del multiplicador
- [x] FIX-3.2: Mejorar validación en el hook con mensajes claros
- [x] FIX-3.3: Mostrar advertencia visual en la UI
- [x] FIX-3.4: Agregar sección educativa "¿Cómo funciona?"
- [x] FIX-3.5: Leer versión desde package.json automáticamente

### Testing
- [x] Tests unitarios para chemistryEngine (multiplicador)
- [x] Tests unitarios para useMolecularFormula (validación)
- [x] Actualizar tests E2E de hdu-4-empirical.cy.ts
- [x] Test E2E para versión en footer

### Verificación
- [x] Caso: CH2O con masa 28 → Muestra advertencia clara
- [x] Caso: CH2O con masa 101 → Error educativo con sugerencias
- [x] Caso: CH2O con masa 180 → Calcula correctamente C₆H₁₂O₆
- [x] Footer muestra versión correcta desde package.json

---

## 📚 Referencias

- PRD.md: "Feedback visual inmediato", "Mensajes de ayuda tipo globo de diálogo"
- PRD.md: "Mostrar el paso a paso para que entiendas el proceso"
- HDU-4: Especificación original de la calculadora

---

## 💡 Mejoras Futuras

1. Agregar tooltip hover al botón deshabilitado explicando por qué
2. Auto-sugerir el valor válido más cercano cuando el usuario escribe
3. Agregar animación "shake" cuando se intenta calcular con valor inválido
4. Permitir ver el cálculo aunque sea inválido con advertencia visual
