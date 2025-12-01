# FIX-4: Claridad en Resultado de Fórmula Molecular

> **Prioridad:** 🟡 Media  
> **Estado:** ✅ Completado  
> **Tipo:** UX / Educativo  
> **Versión:** `0.6.2` (PATCH)  
> **Fecha Completado:** 2025-12-01

---

## 🐛 Descripción del Problema

Cuando el usuario ingresa `CH2O` y calcula con masa 30.026 g/mol (n=1), el resultado muestra `H₂CO` en lugar de `CH₂O`.

**Ambas fórmulas son químicamente correctas** (representan la misma molécula: Formaldehído), pero el cambio de orden confunde al usuario educativo.

### Confusión del Usuario
1. "¿Por qué cambió de CH₂O a H₂CO?"
2. "¿Hice algo mal?"
3. "¿Es un bug?"

### Problema de UX
La aplicación **no explica** que:
- El orden de escritura es solo una convención
- Ambas fórmulas son equivalentes
- La molécula tiene un nombre conocido (Formaldehído)

---

## 📍 Ubicación del Problema

| Archivo | Líneas | Descripción |
|---------|--------|-------------|
| `src/utils/chemistryEngine.ts` | 496-504 | `calculateMolecularFormula` - Orden de elementos |
| `src/pages/EmpiricalPage.tsx` | 370-378 | Resultado sin contexto educativo |

---

## 🔍 Causa Raíz

En `chemistryEngine.ts`, el parser devuelve los elementos en el orden que los encuentra:

```typescript
const parsed = parseFormula(empiricalFormula);
const molecularElements = parsed.elements.map(el => ({
  symbol: el.symbol,
  count: el.count * multiplier,
}));
```

El orden puede variar según cómo se parsea la fórmula. `CH2O` se parsea como `C, H, O` pero luego se reconstruye como `H2CO` por el orden de procesamiento.

---

## ✅ Solución Propuesta

### TICKET FIX-4.1: Mantener el orden original de la fórmula

**Archivo:** `src/utils/chemistryEngine.ts`

Preservar el orden de entrada del usuario:

```typescript
// ANTES: El orden puede cambiar
const molecularFormula = molecularElements
  .map(el => el.count === 1 ? el.symbol : `${el.symbol}${el.count}`)
  .join('');

// DESPUÉS: Preservar orden de entrada
// Ya debería estar en orden, pero asegurarnos de que 
// parsed.elements mantenga el orden original
```

---

### TICKET FIX-4.2: Mostrar equivalencia cuando el orden cambia

**Archivo:** `src/pages/EmpiricalPage.tsx`

Si la fórmula de salida difiere de la entrada, mostrar nota explicativa:

```tsx
{/* Resultado final */}
<div className="p-6 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-center">
  <p className="text-slate-400 mb-2">Fórmula Molecular</p>
  <p className="text-4xl font-bold text-white">
    {formatFormula(result.molecularFormula)}
  </p>
  
  {/* NUEVO: Nota de equivalencia si cambió el orden */}
  {result.molecularFormula !== result.empiricalFormula && result.multiplier === 1 && (
    <p className="text-sm text-slate-400 mt-2 flex items-center justify-center gap-2">
      <Info size={14} />
      Equivalente a {formatFormula(empiricalFormula)}
      <span className="text-slate-500">
        (mismo compuesto, diferente notación)
      </span>
    </p>
  )}
  
  {/* Nombre del compuesto si es conocido */}
  {getCompoundName(result.molecularFormula) && (
    <p className="text-sm text-slate-400 mt-2">
      ({getCompoundName(result.molecularFormula)})
    </p>
  )}
</div>
```

---

### TICKET FIX-4.3: Base de datos de compuestos conocidos

**Archivo nuevo:** `src/data/compounds.ts`

```typescript
/**
 * Base de datos de compuestos químicos conocidos
 * Mapea fórmulas a nombres comunes
 */

export interface Compound {
  formulas: string[];  // Diferentes formas de escribir la misma fórmula
  name: string;        // Nombre común
  iupac?: string;      // Nombre IUPAC (opcional)
  category?: string;   // Categoría (orgánico, inorgánico, etc.)
}

export const KNOWN_COMPOUNDS: Compound[] = [
  // Agua y compuestos simples
  { formulas: ['H2O'], name: 'Agua' },
  { formulas: ['CO2'], name: 'Dióxido de Carbono' },
  { formulas: ['NaCl'], name: 'Sal de Mesa', iupac: 'Cloruro de Sodio' },
  
  // Formaldehído y variantes
  { formulas: ['CH2O', 'H2CO', 'HCHO'], name: 'Formaldehído', iupac: 'Metanal' },
  
  // Glucosa y azúcares
  { formulas: ['C6H12O6'], name: 'Glucosa', category: 'Azúcar' },
  { formulas: ['C12H22O11'], name: 'Sacarosa', category: 'Azúcar' },
  
  // Ácidos comunes
  { formulas: ['H2SO4'], name: 'Ácido Sulfúrico' },
  { formulas: ['HCl'], name: 'Ácido Clorhídrico' },
  { formulas: ['HNO3'], name: 'Ácido Nítrico' },
  { formulas: ['H3PO4'], name: 'Ácido Fosfórico' },
  { formulas: ['CH3COOH', 'C2H4O2'], name: 'Ácido Acético', iupac: 'Ácido Etanoico' },
  
  // Bases
  { formulas: ['NaOH'], name: 'Soda Cáustica', iupac: 'Hidróxido de Sodio' },
  { formulas: ['Ca(OH)2', 'CaO2H2'], name: 'Cal Apagada', iupac: 'Hidróxido de Calcio' },
  { formulas: ['NH3'], name: 'Amoníaco' },
  
  // Alcoholes
  { formulas: ['CH3OH', 'CH4O'], name: 'Metanol', category: 'Alcohol' },
  { formulas: ['C2H5OH', 'C2H6O'], name: 'Etanol', category: 'Alcohol' },
  
  // Otros compuestos educativos
  { formulas: ['CaCO3'], name: 'Carbonato de Calcio', category: 'Sal' },
  { formulas: ['NaHCO3'], name: 'Bicarbonato de Sodio', category: 'Sal' },
  { formulas: ['Fe2O3'], name: 'Óxido de Hierro III', category: 'Óxido' },
];

/**
 * Busca el nombre de un compuesto por su fórmula
 */
export function getCompoundName(formula: string): string | null {
  // Normalizar fórmula (quitar espacios, etc.)
  const normalized = formula.replace(/\s/g, '');
  
  const compound = KNOWN_COMPOUNDS.find(c => 
    c.formulas.some(f => f === normalized)
  );
  
  return compound?.name ?? null;
}

/**
 * Busca información completa de un compuesto
 */
export function getCompoundInfo(formula: string): Compound | null {
  const normalized = formula.replace(/\s/g, '');
  
  return KNOWN_COMPOUNDS.find(c => 
    c.formulas.some(f => f === normalized)
  ) ?? null;
}
```

---

### TICKET FIX-4.4: Mostrar información del compuesto en el resultado

**Archivo:** `src/pages/EmpiricalPage.tsx`

Agregar tarjeta informativa cuando el compuesto es conocido:

```tsx
{/* Información del compuesto si es conocido */}
{result.isValid && getCompoundInfo(result.molecularFormula) && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50"
  >
    <div className="flex items-start gap-3">
      <Beaker className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-white">
          {getCompoundInfo(result.molecularFormula)?.name}
        </h4>
        {getCompoundInfo(result.molecularFormula)?.iupac && (
          <p className="text-sm text-slate-400">
            IUPAC: {getCompoundInfo(result.molecularFormula)?.iupac}
          </p>
        )}
        {getCompoundInfo(result.molecularFormula)?.category && (
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
            {getCompoundInfo(result.molecularFormula)?.category}
          </span>
        )}
      </div>
    </div>
  </motion.div>
)}
```

---

### TICKET FIX-4.5: Tooltip explicativo para equivalencia de fórmulas

**Archivo:** `src/pages/EmpiricalPage.tsx`

Agregar ícono de información con tooltip:

```tsx
{/* Tooltip de equivalencia */}
<div className="relative group inline-block ml-2">
  <Info size={14} className="text-slate-500 cursor-help" />
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 
                  bg-slate-800 rounded-lg text-sm text-slate-300 
                  opacity-0 group-hover:opacity-100 transition-opacity
                  w-64 text-left pointer-events-none z-10">
    <p className="font-medium text-white mb-1">¿Por qué el orden cambió?</p>
    <p>Las fórmulas <strong>CH₂O</strong> y <strong>H₂CO</strong> representan 
    la misma molécula. El orden de las letras es solo una convención de escritura.</p>
  </div>
</div>
```

---

## 🎨 Diseño Visual Propuesto

### Estado: Resultado con información del compuesto
```
┌─────────────────────────────────────────────────────────────────┐
│                    Fórmula Molecular                            │
│                                                                 │
│                       H₂CO                                      │
│                                                                 │
│              ℹ️ Equivalente a CH₂O                              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🧪 Formaldehído                                          │  │
│  │    IUPAC: Metanal                                        │  │
│  │    ┌─────────────┐                                       │  │
│  │    │  Aldehído   │                                       │  │
│  │    └─────────────┘                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧪 Tests Requeridos

### Tests Unitarios

```typescript
describe('compounds.ts', () => {
  it('debe encontrar Formaldehído por CH2O', () => {
    expect(getCompoundName('CH2O')).toBe('Formaldehído');
  });

  it('debe encontrar Formaldehído por H2CO', () => {
    expect(getCompoundName('H2CO')).toBe('Formaldehído');
  });

  it('debe retornar null para fórmulas desconocidas', () => {
    expect(getCompoundName('XYZ')).toBeNull();
  });

  it('debe retornar información completa del compuesto', () => {
    const info = getCompoundInfo('C6H12O6');
    expect(info?.name).toBe('Glucosa');
    expect(info?.category).toBe('Azúcar');
  });
});
```

### Tests E2E

```typescript
describe('FIX-4: Claridad en resultado molecular', () => {
  it('debe mostrar el nombre del compuesto si es conocido', () => {
    // Cargar ejemplo CH2O con n=1
    cy.visit('/formula-empirica');
    cy.contains('Desde Empírica').click();
    cy.get('input[placeholder*="CH2O"]').type('CH2O');
    cy.get('[data-testid="experimental-mass-input"]').type('30.026');
    cy.contains('CALCULAR').click();
    cy.contains('Formaldehído').should('be.visible');
  });

  it('debe mostrar equivalencia si el orden cambió', () => {
    // Si resultado es H2CO pero entrada fue CH2O
    cy.contains('Equivalente a').should('be.visible');
  });
});
```

---

## 📊 Checklist

### Desarrollo
- [ ] FIX-4.1: Verificar/mantener orden original de fórmula
- [ ] FIX-4.2: Mostrar nota de equivalencia cuando orden cambia
- [ ] FIX-4.3: Crear base de datos de compuestos conocidos
- [ ] FIX-4.4: Mostrar información del compuesto en resultado
- [ ] FIX-4.5: Agregar tooltip explicativo

### Testing
- [ ] Tests unitarios para compounds.ts
- [ ] Tests E2E para UI mejorada

### Verificación
- [ ] CH2O con n=1 muestra "Formaldehído"
- [ ] Tooltip explica equivalencia de fórmulas
- [ ] Glucosa C6H12O6 muestra nombre y categoría

---

## 📚 Referencias

- PRD.md: "Mensajes de ayuda tipo globo de diálogo"
- PRD.md: "Los resultados deben tener contexto educativo"
- Nomenclatura química: Sistema Hill vs IUPAC

---

## 💡 Mejoras Futuras

1. **Estructura molecular visual** - Mostrar estructura de Lewis o modelo 3D
2. **Modo "Aprender más"** - Link a más información sobre el compuesto
3. **Detectar isómeros** - Explicar cuando fórmulas iguales pueden ser compuestos diferentes
4. **Ampliar base de datos** - Agregar más compuestos comunes

