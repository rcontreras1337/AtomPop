# 📋 Índice de Historias de Usuario - AtomPop

> **Proyecto:** AtomPop - Calculadora Educativa de Química  
> **Metodología:** Desarrollo por fases (HDUs)  
> **Estado General:** ✅ v0.5.0 Completado | 🔄 Mejoras en progreso

---

## 🗂️ Resumen de HDUs

### ✅ HDUs Completadas (v0.5.0)

| HDU | Nombre | Prioridad | Estado | Versión |
|-----|--------|-----------|--------|---------|
| [HDU-0](./HDU-0.md) | Infraestructura y Motor Químico | 🔴 Crítica | ✅ Completado | 0.1.0 |
| [HDU-1](./HDU-1.md) | Calculadora de Masa Molar | 🔴 Alta | ✅ Completado | 0.2.0 |
| [HDU-2](./HDU-2.md) | Conversor Moles/Gramos/Átomos | 🔴 Alta | ✅ Completado | 0.3.0 |
| [HDU-3](./HDU-3.md) | Composición Porcentual | 🟡 Media | ✅ Completado | 0.4.0 |
| [HDU-4](./HDU-4.md) | Fórmula Empírica y Molecular | 🟡 Media | ✅ Completado | 0.5.0 |

### ⏳ HDUs Futuras (Roadmap)

| HDU | Nombre | Prioridad | Estado | Versión Target |
|-----|--------|-----------|--------|----------------|
| [HDU-5](./HDU-5.md) | Balanceador de Ecuaciones Químicas | 🔴 Alta | ⏳ Pendiente | 0.6.0 |
| [HDU-6](./HDU-6.md) | Calculadora de pH | 🟡 Media | ⏳ Pendiente | 0.7.0 |
| [HDU-7](./HDU-7.md) | Modo Oscuro/Claro (Theme Toggle) | 🟢 Baja | ⏳ Pendiente | 0.8.0 |
| [HDU-8](./HDU-8.md) | PWA (Progressive Web App) | 🟡 Media | ⏳ Pendiente | 0.9.0 |
| [HDU-9](./HDU-9.md) | Exportar Resultados a PDF | 🟢 Baja | ⏳ Pendiente | 0.10.0 |
| [HDU-10](./HDU-10.md) | Ampliar Tabla Periódica (118 elementos) | 🟢 Baja | ⏳ Pendiente | 0.11.0 |

### 🐛 Corrección de Bugs

| Fix | Nombre | Prioridad | Estado | Versión |
|-----|--------|-----------|--------|---------|
| [FIX-1](./fixes/FIX-1.md) | Botón "Limpiar valores" con icono mal posicionado | 🟡 Media | ✅ Completado | 0.5.1 |
| [FIX-2](./fixes/FIX-2.md) | Botón de Tabla Periódica sin Funcionalidad | 🔴 Alta | ⏳ Pendiente | 0.6.0 |

Ver [índice de fixes](./fixes/INDEX.md) para más detalles.

---

## 📊 Diagrama de Dependencias

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  HDU-0 (Infraestructura) ← Base obligatoria para todo              │
│         │                                                           │
│         ▼                                                           │
│    ┌─────────┬─────────┬─────────┬─────────┐                       │
│    │         │         │         │         │                       │
│    ▼         ▼         ▼         ▼         ▼                       │
│  HDU-1    HDU-2     HDU-3     HDU-4     HDU-5                      │
│  (Masa    (Conversor)(Composición)(Fórmula (Balanceador)           │
│  Molar)              Porcentual)  Empírica)                        │
│    ✅        ✅         ✅         ✅       ⏳                      │
│                                                                     │
│    ┌─────────────────────────────────────────────────────┐         │
│    │              FEATURES INDEPENDIENTES                │         │
│    ├─────────┬─────────┬─────────┬─────────┬─────────┐  │         │
│    │ HDU-6   │ HDU-7   │ HDU-8   │ HDU-9   │ HDU-10  │  │         │
│    │ (pH)    │ (Theme) │ (PWA)   │ (PDF)   │ (Tabla) │  │         │
│    │  ⏳     │   ⏳    │   ⏳    │   ⏳    │   ⏳    │  │         │
│    └─────────┴─────────┴─────────┴─────────┴─────────┘  │         │
│    └─────────────────────────────────────────────────────┘         │
│                                                                     │
│                         🎉 v1.0.0 RELEASE                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🏷️ Leyenda de Estados

| Símbolo | Significado |
|---------|-------------|
| ⏳ | Pendiente |
| 🔄 | En Progreso |
| ✅ | Completado |
| ❌ | Bloqueado/Descartado |
| 🔴 | Prioridad Crítica/Alta |
| 🟡 | Prioridad Media |
| 🟢 | Prioridad Baja |

---

## 📅 Orden de Ejecución Recomendado

### Fase 1: Calculadoras Core ✅ COMPLETADA
1. **HDU-0:** Infraestructura base ✅
2. **HDU-1 → HDU-4:** Calculadoras principales ✅

### Fase 2: Fixes Críticos ⏳
3. **FIX-1:** Corregir botones de limpiar
4. **FIX-2:** Agregar funcionalidad tabla periódica

### Fase 3: Nuevas Features ⏳
5. **HDU-5:** Balanceador de ecuaciones (muy solicitado)
6. **HDU-6:** Calculadora de pH
7. **HDU-10:** Completar tabla periódica (118 elementos)

### Fase 4: Mejoras UX ⏳
8. **HDU-7:** Modo oscuro/claro
9. **HDU-8:** PWA (instalable)
10. **HDU-9:** Exportar a PDF

### Fase 5: Release 1.0.0 🎯
- Todas las HDUs completadas
- Todos los fixes resueltos
- Documentación completa
- Tests > 95% cobertura

---

## 📊 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| HDUs completadas | 5/10 |
| Fixes pendientes | 2 |
| Tests unitarios | 186 |
| Tests E2E | 117 |
| **Tests totales** | **303** |
| Elementos en tabla | 74 (→ 118) |
| Calculadoras funcionales | 4 |

---

## 📝 Notas

- Cada HDU debe completarse **en orden** de sus tickets
- Los tickets marcados como `[BLOQUEADOR]` deben resolverse antes de continuar
- Realizar commits después de cada ticket completado
- Los fixes pueden realizarse en paralelo con HDUs
- Actualizar CHANGELOG.md después de cada versión

---

## 📁 Estructura de la Carpeta HDUS

```
HDUS/
├── INDEX.md           # Este archivo
├── HDU-0.md           # ✅ Infraestructura
├── HDU-1.md           # ✅ Masa Molar
├── HDU-2.md           # ✅ Conversor
├── HDU-3.md           # ✅ Composición
├── HDU-4.md           # ✅ Fórmula Empírica
├── HDU-5.md           # ⏳ Balanceador
├── HDU-6.md           # ⏳ pH
├── HDU-7.md           # ⏳ Theme Toggle
├── HDU-8.md           # ⏳ PWA
├── HDU-9.md           # ⏳ PDF Export
├── HDU-10.md          # ⏳ Tabla Periódica 118
└── fixes/
    ├── INDEX.md       # Índice de fixes
    ├── FIX-1.md       # Botón Limpiar
    └── FIX-2.md       # Tabla Periódica
```

---

## 🔗 Links Útiles

- [README.md](../README.md) - Documentación principal
- [CHANGELOG.md](../CHANGELOG.md) - Historial de versiones
- [VERSIONING.md](../VERSIONING.md) - Reglas de versionamiento
- [PRD.md](../PRD.md) - Especificaciones del producto
