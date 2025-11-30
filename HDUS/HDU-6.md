# HDU-6: Calculadora de pH

> **Prioridad:** 🟡 Media  
> **Estado:** ⏳ Pendiente  
> **Dependencias:** HDU-0 (completa)  
> **Estimación:** 4-6 horas  
> **Versión:** `0.7.0` (MINOR)

---

## 📖 Historia de Usuario

**Como** estudiante de química,  
**Quiero** calcular el pH de soluciones ácidas y básicas,  
**Para que** pueda entender la acidez/basicidad y resolver problemas de equilibrio.

---

## 🎯 Criterios de Aceptación

### Funcionalidad Principal
- [ ] Calcular pH desde concentración de H⁺ o [OH⁻]
- [ ] Calcular pOH y relación pH + pOH = 14
- [ ] Conversión bidireccional (pH ↔ [H⁺])
- [ ] Escala visual de pH (0-14)
- [ ] Indicador de ácido/neutro/base

### Modos de Cálculo
- [ ] Modo 1: Desde concentración [H⁺]
- [ ] Modo 2: Desde concentración [OH⁻]
- [ ] Modo 3: Desde pH/pOH conocido

---

## 🎫 Tickets

### TICKET 6.1: Crear Página de pH
**Tipo:** UI/Página  
**Archivo(s):** `src/pages/PHCalculatorPage.tsx`

**Wireframe:**
```
┌─────────────────────────────────────────────────┐
│      🧪 Calculadora de pH                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  Modo: [Desde [H⁺]] | Desde [OH⁻] | Desde pH   │
│                                                 │
│  Concentración [H⁺]:                            │
│  ┌────────────────────────────────┐             │
│  │  1e-7                     M    │             │
│  └────────────────────────────────┘             │
│                                                 │
│           [ Calcular ]                          │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ 0  1  2  3  4  5  6 [7] 8  9 10 11 12 14│   │
│  │ ████████████████████▓░░░░░░░░░░░░░░░░░░│   │
│  │ ÁCIDO        NEUTRO        BASE         │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  pH = 7.00       (Neutro)                       │
│  pOH = 7.00                                     │
│  [H⁺] = 1.0 × 10⁻⁷ M                           │
│  [OH⁻] = 1.0 × 10⁻⁷ M                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### TICKET 6.2: Implementar Lógica de pH
**Tipo:** Lógica  
**Archivo(s):** `src/utils/chemistryEngine.ts`, `src/features/ph/usePHCalculator.ts`

**Fórmulas:**
```
pH = -log₁₀[H⁺]
pOH = -log₁₀[OH⁻]
pH + pOH = 14 (a 25°C)
[H⁺] × [OH⁻] = 1 × 10⁻¹⁴ (Kw)
```

**Tipos:**
```typescript
interface PHResult {
  pH: number;
  pOH: number;
  hydrogenConcentration: number;    // [H⁺]
  hydroxideConcentration: number;   // [OH⁻]
  classification: 'acidic' | 'neutral' | 'basic';
  isValid: boolean;
  error?: string;
}

type PHInputMode = 'hydrogen' | 'hydroxide' | 'ph' | 'poh';
```

---

### TICKET 6.3: Crear Componente de Escala Visual
**Tipo:** UI  
**Archivo(s):** `src/features/ph/PHScale.tsx`

**Funcionalidades:**
- [ ] Barra de gradiente de colores (rojo → verde → azul)
- [ ] Marcador de posición actual
- [ ] Etiquetas de valores comunes
- [ ] Ejemplos de sustancias (limón, agua, lejía)
- [ ] Animación al cambiar valor

**Colores sugeridos:**
```css
/* pH 0-3: Rojo intenso */
/* pH 4-6: Naranja/Amarillo */
/* pH 7: Verde */
/* pH 8-10: Azul claro */
/* pH 11-14: Azul/Púrpura */
```

---

### TICKET 6.4: Agregar Ejemplos Comunes
**Tipo:** Data  
**Archivo(s):** `src/data/ph-examples.ts`

```typescript
const PH_EXAMPLES = [
  { name: 'Ácido de batería', ph: 0, emoji: '🔋' },
  { name: 'Jugo gástrico', ph: 1.5, emoji: '🫃' },
  { name: 'Limón', ph: 2.4, emoji: '🍋' },
  { name: 'Vinagre', ph: 2.9, emoji: '🫗' },
  { name: 'Café', ph: 5, emoji: '☕' },
  { name: 'Leche', ph: 6.5, emoji: '🥛' },
  { name: 'Agua pura', ph: 7, emoji: '💧' },
  { name: 'Sangre', ph: 7.4, emoji: '🩸' },
  { name: 'Agua de mar', ph: 8, emoji: '🌊' },
  { name: 'Jabón', ph: 9.5, emoji: '🧼' },
  { name: 'Amoníaco', ph: 11, emoji: '🧴' },
  { name: 'Lejía', ph: 13, emoji: '🧪' },
];
```

---

### TICKET 6.5: Tests
**Tipo:** Testing  
**Archivo(s):** `src/features/ph/*.test.ts`, `cypress/e2e/hdu-6-ph.cy.ts`

**Tests unitarios:**
```typescript
describe('usePHCalculator', () => {
  it('debe calcular pH desde [H⁺]');
  it('debe calcular pH desde [OH⁻]');
  it('debe validar pH + pOH = 14');
  it('debe clasificar ácido/neutro/base');
  it('debe manejar concentraciones inválidas');
});
```

---

## 📁 Estructura de Archivos

```
src/features/ph/
├── usePHCalculator.ts       # Hook principal
├── usePHCalculator.test.ts  # Tests
├── PHScale.tsx              # Escala visual
├── PHResult.tsx             # Display de resultados
├── PHExamples.tsx           # Ejemplos interactivos
└── index.ts                 # Exports

src/data/
└── ph-examples.ts           # Datos de ejemplos
```

---

## 🎨 Guía de Estilo

- **Color principal:** Gradiente multicolor (escala pH)
- **Icono:** 🧪 o Droplet
- **Animación:** El marcador se desliza suavemente

---

## 📊 Métricas Esperadas

| Métrica | Valor |
|---------|-------|
| Tests unitarios | ~15 |
| Tests E2E | ~8 |
| Archivos nuevos | 6+ |

---

## ✅ Checklist Final

- [ ] TICKET 6.1 completado
- [ ] TICKET 6.2 completado
- [ ] TICKET 6.3 completado
- [ ] TICKET 6.4 completado
- [ ] TICKET 6.5 completado (Tests)
- [ ] Página accesible desde navegación
- [ ] Responsive verificado
- [ ] CHANGELOG actualizado
- [ ] README actualizado

