# HDU-10: Ampliar Tabla Periódica (118 Elementos)

> **Prioridad:** 🟢 Baja  
> **Estado:** ⏳ Pendiente  
> **Dependencias:** Ninguna  
> **Estimación:** 2-3 horas  
> **Versión:** `0.11.0` (MINOR)

---

## 📖 Historia de Usuario

**Como** estudiante de química,  
**Quiero** tener acceso a todos los 118 elementos de la tabla periódica,  
**Para que** pueda realizar cálculos con cualquier elemento, incluyendo los sintéticos.

---

## 🎯 Criterios de Aceptación

### Funcionalidad Principal
- [ ] La tabla periódica incluye los 118 elementos
- [ ] Cada elemento tiene masa atómica correcta
- [ ] Los elementos sintéticos están marcados
- [ ] Los colores CPK están asignados correctamente
- [ ] Todos los tests existentes siguen pasando

### Elementos a Agregar
- [ ] Lantánidos (57-71): La, Ce, Pr, Nd, Pm, Sm, Eu, Gd, Tb, Dy, Ho, Er, Tm, Yb, Lu
- [ ] Actínidos (89-103): Ac, Th, Pa, U, Np, Pu, Am, Cm, Bk, Cf, Es, Fm, Md, No, Lr
- [ ] Período 6 completo: Hf, Ta, W, Re, Os, Ir, Pt, Au, Hg, Tl, Pb, Bi, Po, At, Rn
- [ ] Período 7 completo: Fr, Ra, Rf, Db, Sg, Bh, Hs, Mt, Ds, Rg, Cn, Nh, Fl, Mc, Lv, Ts, Og

---

## 🎫 Tickets

### TICKET 10.1: Investigar Datos Faltantes
**Tipo:** Investigación  
**Archivo(s):** N/A

**Tareas:**
- [ ] Verificar elementos actuales (74)
- [ ] Listar elementos faltantes (44)
- [ ] Obtener masas atómicas oficiales (IUPAC)
- [ ] Determinar colores CPK estándar
- [ ] Clasificar por categoría

**Fuentes confiables:**
- IUPAC: https://iupac.org/what-we-do/periodic-table-of-elements/
- PubChem: https://pubchem.ncbi.nlm.nih.gov/
- WebElements: https://www.webelements.com/

---

### TICKET 10.2: Actualizar periodic-table.json
**Tipo:** Data  
**Archivo(s):** `src/data/periodic-table.json`

**Formato de cada elemento:**
```json
{
  "atomicNumber": 118,
  "symbol": "Og",
  "name": "Oganesón",
  "atomicMass": 294,
  "category": "gas-noble",
  "cpkColor": "#FFFFFF",
  "electronegativity": null,
  "electronConfiguration": "[Rn] 5f14 6d10 7s2 7p6",
  "isSynthetic": true
}
```

**Campos nuevos a considerar:**
- `isSynthetic`: boolean - Para elementos artificiales
- `isRadioactive`: boolean - Para elementos radiactivos
- `discoveryYear`: number - Año de descubrimiento

---

### TICKET 10.3: Agregar Categorías Faltantes
**Tipo:** Data  
**Archivo(s):** `src/data/elements.ts`

**Categorías completas:**
```typescript
type ElementCategory =
  | 'nonmetal'
  | 'noble-gas'
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'metalloid'
  | 'halogen'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'lanthanide'        // NUEVO
  | 'actinide'          // NUEVO
  | 'unknown';          // NUEVO (para elementos sintéticos)
```

**Colores por categoría:**
```typescript
const categoryColors = {
  'lanthanide': '#ffbf00',      // Dorado
  'actinide': '#ff99cc',        // Rosa
  'unknown': '#cccccc',         // Gris
  // ... existentes
};
```

---

### TICKET 10.4: Validar y Testear
**Tipo:** Testing  
**Archivo(s):** `src/data/*.test.ts`, `src/utils/*.test.ts`

**Validaciones:**
- [ ] 118 elementos en total
- [ ] Ningún número atómico duplicado
- [ ] Ningún símbolo duplicado
- [ ] Todas las masas atómicas son números positivos
- [ ] Todos los elementos tienen categoría válida
- [ ] Colores CPK en formato hexadecimal

**Tests nuevos:**
```typescript
describe('periodic-table extended', () => {
  it('debe tener 118 elementos');
  it('debe incluir todos los lantánidos');
  it('debe incluir todos los actínidos');
  it('debe marcar elementos sintéticos');
  it('elementos existentes no deben cambiar');
});
```

---

### TICKET 10.5: Actualizar Documentación
**Tipo:** Documentación  
**Archivo(s):** `README.md`

**Actualizar:**
- Mencionar 118 elementos (en lugar de 74)
- Lista de elementos sintéticos soportados
- Notas sobre precisión de masas atómicas

---

## 📁 Estructura de Archivos

```
src/data/
├── periodic-table.json    # MODIFICAR (de 74 a 118 elementos)
├── elements.ts            # MODIFICAR (nuevas categorías)
└── elements.test.ts       # MODIFICAR (nuevos tests)
```

---

## 📊 Elementos por Período

| Período | Elementos | Estado Actual |
|---------|-----------|---------------|
| 1 | H, He | ✅ Completo (2) |
| 2 | Li-Ne | ✅ Completo (8) |
| 3 | Na-Ar | ✅ Completo (8) |
| 4 | K-Kr | ✅ Completo (18) |
| 5 | Rb-Xe | ✅ Parcial |
| 6 | Cs-Rn + Lantánidos | ⚠️ Incompleto |
| 7 | Fr-Og + Actínidos | ⚠️ Incompleto |

---

## 📊 Métricas Esperadas

| Métrica | Antes | Después |
|---------|-------|---------|
| Elementos totales | 74 | 118 |
| Lantánidos | 0 | 15 |
| Actínidos | 0 | 15 |
| Tests | N | N + 10 |

---

## ⚠️ Consideraciones

1. **Masas atómicas:** Los elementos sintéticos tienen masas aproximadas
2. **Estabilidad:** Algunos elementos no tienen isótopos estables
3. **Nombres:** Algunos elementos tienen nombres recientes (2016)
4. **Retrocompatibilidad:** No debe romper cálculos existentes

---

## 📋 Lista de Elementos Faltantes (44)

### Lantánidos (15)
| Z | Símbolo | Nombre | Masa |
|---|---------|--------|------|
| 57 | La | Lantano | 138.91 |
| 58 | Ce | Cerio | 140.12 |
| 59 | Pr | Praseodimio | 140.91 |
| 60 | Nd | Neodimio | 144.24 |
| 61 | Pm | Prometio | 145 |
| 62 | Sm | Samario | 150.36 |
| 63 | Eu | Europio | 151.96 |
| 64 | Gd | Gadolinio | 157.25 |
| 65 | Tb | Terbio | 158.93 |
| 66 | Dy | Disprosio | 162.50 |
| 67 | Ho | Holmio | 164.93 |
| 68 | Er | Erbio | 167.26 |
| 69 | Tm | Tulio | 168.93 |
| 70 | Yb | Iterbio | 173.05 |
| 71 | Lu | Lutecio | 174.97 |

### Actínidos (15)
| Z | Símbolo | Nombre | Masa |
|---|---------|--------|------|
| 89 | Ac | Actinio | 227 |
| 90 | Th | Torio | 232.04 |
| 91 | Pa | Protactinio | 231.04 |
| 92 | U | Uranio | 238.03 |
| 93 | Np | Neptunio | 237 |
| 94 | Pu | Plutonio | 244 |
| 95 | Am | Americio | 243 |
| 96 | Cm | Curio | 247 |
| 97 | Bk | Berkelio | 247 |
| 98 | Cf | Californio | 251 |
| 99 | Es | Einstenio | 252 |
| 100 | Fm | Fermio | 257 |
| 101 | Md | Mendelevio | 258 |
| 102 | No | Nobelio | 259 |
| 103 | Lr | Lawrencio | 266 |

### Período 7 (14 faltantes)
| Z | Símbolo | Nombre | Masa |
|---|---------|--------|------|
| 104 | Rf | Rutherfordio | 267 |
| 105 | Db | Dubnio | 270 |
| 106 | Sg | Seaborgio | 271 |
| 107 | Bh | Bohrio | 270 |
| 108 | Hs | Hasio | 277 |
| 109 | Mt | Meitnerio | 278 |
| 110 | Ds | Darmstatio | 281 |
| 111 | Rg | Roentgenio | 282 |
| 112 | Cn | Copernicio | 285 |
| 113 | Nh | Nihonio | 286 |
| 114 | Fl | Flerovio | 289 |
| 115 | Mc | Moscovio | 290 |
| 116 | Lv | Livermorio | 293 |
| 117 | Ts | Teneso | 294 |
| 118 | Og | Oganesón | 294 |

---

## ✅ Checklist Final

- [ ] TICKET 10.1 completado (Investigación)
- [ ] TICKET 10.2 completado (periodic-table.json)
- [ ] TICKET 10.3 completado (Categorías)
- [ ] TICKET 10.4 completado (Tests)
- [ ] TICKET 10.5 completado (Documentación)
- [ ] 118 elementos en tabla
- [ ] Tests existentes pasan
- [ ] Tests nuevos pasan
- [ ] CHANGELOG actualizado
- [ ] README actualizado

