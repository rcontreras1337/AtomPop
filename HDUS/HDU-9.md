# HDU-9: Exportar Resultados a PDF

> **Prioridad:** 🟢 Baja  
> **Estado:** ⏳ Pendiente  
> **Dependencias:** HDU-0 a HDU-4 (completas)  
> **Estimación:** 4-5 horas  
> **Versión:** `0.10.0` (MINOR)

---

## 📖 Historia de Usuario

**Como** estudiante de química,  
**Quiero** exportar mis cálculos a PDF,  
**Para que** pueda incluirlos en mis tareas, informes de laboratorio o estudiar offline.

---

## 🎯 Criterios de Aceptación

### Funcionalidad Principal
- [ ] Botón "Exportar PDF" en cada calculadora
- [ ] PDF incluye: fórmula, resultado, desglose, fecha
- [ ] Diseño limpio y profesional
- [ ] Branding de AtomPop (logo, colores)
- [ ] Funciona en todos los navegadores

### Contenido del PDF por Calculadora
- [ ] **Masa Molar:** Fórmula, masa total, desglose por elemento
- [ ] **Conversor:** Compuesto, valores (moles, gramos, partículas)
- [ ] **Composición:** Fórmula, porcentajes, gráfico (opcional)
- [ ] **Fórmula Empírica:** Datos de entrada, pasos, resultado

---

## 🎫 Tickets

### TICKET 9.1: Seleccionar e Instalar Librería
**Tipo:** Configuración  
**Archivo(s):** `package.json`

**Opciones evaluadas:**
| Librería | Pros | Contras |
|----------|------|---------|
| `jspdf` | Popular, ligero | Sin HTML directo |
| `html2canvas + jspdf` | Captura exacta | Pesado, calidad variable |
| `react-pdf` | React-native | Más complejo |
| `pdfmake` | Declarativo, tablas | Learning curve |

**Recomendación:** `jspdf` + `jspdf-autotable` para tablas

```bash
npm install jspdf jspdf-autotable
npm install -D @types/jspdf
```

---

### TICKET 9.2: Crear Servicio de Generación PDF
**Tipo:** Lógica  
**Archivo(s):** `src/services/pdfExport.ts`

**API:**
```typescript
interface PDFExportOptions {
  title: string;
  subtitle?: string;
  content: PDFContent[];
  includeTimestamp?: boolean;
  includeWatermark?: boolean;
}

interface PDFContent {
  type: 'text' | 'table' | 'formula' | 'divider';
  data: any;
}

// Funciones
export const generatePDF = (options: PDFExportOptions): void;
export const generateMolarMassPDF = (result: MolarMassResult): void;
export const generateConverterPDF = (result: ConverterResult): void;
export const generateCompositionPDF = (result: CompositionResult): void;
export const generateEmpiricalPDF = (result: EmpiricalResult): void;
```

---

### TICKET 9.3: Diseño de Template PDF
**Tipo:** Diseño  
**Archivo(s):** `src/services/pdfExport.ts`

**Estructura del PDF:**
```
┌─────────────────────────────────────────────────┐
│  🧪 AtomPop - Calculadora de Química           │
│  ───────────────────────────────────────────── │
│                                                 │
│  CÁLCULO DE MASA MOLAR                         │
│                                                 │
│  Fórmula: H₂SO₄                                │
│  Masa Molar: 98.079 g/mol                      │
│                                                 │
│  ┌────────┬────────┬───────────┬──────────┐   │
│  │Elemento│Cantidad│Masa Atóm. │ Subtotal │   │
│  ├────────┼────────┼───────────┼──────────┤   │
│  │   H    │   2    │  1.008    │   2.016  │   │
│  │   S    │   1    │ 32.060    │  32.060  │   │
│  │   O    │   4    │ 15.999    │  63.996  │   │
│  ├────────┼────────┼───────────┼──────────┤   │
│  │        │        │   TOTAL   │  98.079  │   │
│  └────────┴────────┴───────────┴──────────┘   │
│                                                 │
│  ───────────────────────────────────────────── │
│  Generado: 30/11/2024 15:30                    │
│  https://atompop.info                          │
└─────────────────────────────────────────────────┘
```

**Estilos:**
- Fuente: Helvetica (estándar PDF)
- Colores: Amber (#f59e0b) para headers
- Logo: Versión simplificada en esquina

---

### TICKET 9.4: Botón de Exportar en Calculadoras
**Tipo:** UI  
**Archivo(s):** Múltiples páginas

**Diseño del botón:**
```tsx
<Button
  variant="secondary"
  onClick={handleExportPDF}
  icon={<FileDown size={18} />}
  disabled={!hasResult}
>
  Exportar PDF
</Button>
```

**Ubicación:** Junto al resultado o en sección de acciones

---

### TICKET 9.5: Formatear Fórmulas con Subíndices
**Tipo:** Lógica  
**Archivo(s):** `src/services/pdfExport.ts`

**Desafío:** jsPDF no soporta subíndices nativos

**Soluciones:**
1. Usar caracteres Unicode de subíndice (₀₁₂₃₄₅₆₇₈₉)
2. Dibujar texto en dos líneas con offset
3. Usar imagen renderizada

**Implementación recomendada:**
```typescript
const formatFormulaForPDF = (formula: string): string => {
  const subscripts: { [key: string]: string } = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  };
  return formula.replace(/\d/g, d => subscripts[d] || d);
};
```

---

### TICKET 9.6: Tests
**Tipo:** Testing  
**Archivo(s):** `src/services/pdfExport.test.ts`

**Tests:**
```typescript
describe('pdfExport', () => {
  it('debe generar PDF de masa molar');
  it('debe incluir desglose en tabla');
  it('debe formatear fórmulas con subíndices');
  it('debe incluir timestamp');
  it('debe manejar fórmulas complejas');
});
```

---

## 📁 Estructura de Archivos

```
src/
├── services/
│   ├── pdfExport.ts          # NUEVO
│   └── pdfExport.test.ts     # NUEVO
├── assets/
│   └── logo-pdf.png          # NUEVO (logo para PDF)
└── pages/
    ├── MolarMassPage.tsx     # MODIFICAR
    ├── ConverterPage.tsx     # MODIFICAR
    ├── CompositionPage.tsx   # MODIFICAR
    └── EmpiricalPage.tsx     # MODIFICAR
```

---

## 📊 Métricas Esperadas

| Métrica | Valor |
|---------|-------|
| Tests unitarios | ~10 |
| Tamaño PDF típico | < 50KB |
| Archivos nuevos | 3 |
| Archivos modificados | 4 |

---

## ⚠️ Consideraciones

1. **Tamaño bundle:** jspdf añade ~200KB al bundle
2. **Fonts:** Los caracteres especiales pueden no renderizar bien
3. **Gráficos:** Incluir el PieChart requiere html2canvas
4. **Mobile:** La descarga puede comportarse diferente en iOS

---

## ✅ Checklist Final

- [ ] TICKET 9.1 completado (Librería)
- [ ] TICKET 9.2 completado (Servicio)
- [ ] TICKET 9.3 completado (Template)
- [ ] TICKET 9.4 completado (Botones)
- [ ] TICKET 9.5 completado (Fórmulas)
- [ ] TICKET 9.6 completado (Tests)
- [ ] PDF generado correctamente
- [ ] Funciona en todos los navegadores
- [ ] CHANGELOG actualizado
- [ ] README actualizado

