# 📋 Índice de Historias de Usuario - AtomPop

> **Proyecto:** AtomPop - Calculadora Educativa de Química  
> **Metodología:** Desarrollo por fases (HDUs)  
> **Estado General:** 🟡 En Desarrollo

---

## 🗂️ Resumen de HDUs

| HDU | Nombre | Prioridad | Estado | Progreso |
|-----|--------|-----------|--------|----------|
| [HDU-0](./HDU-0.md) | Infraestructura y Motor Químico | 🔴 Crítica | ⏳ Pendiente | 0/6 |
| [HDU-1](./HDU-1.md) | Calculadora de Masa Molar | 🔴 Alta | ⏳ Pendiente | 0/5 |
| [HDU-2](./HDU-2.md) | Conversor Moles/Gramos/Átomos | 🔴 Alta | ⏳ Pendiente | 0/5 |
| [HDU-3](./HDU-3.md) | Composición Porcentual | 🟡 Media | ⏳ Pendiente | 0/4 |
| [HDU-4](./HDU-4.md) | Fórmula Empírica y Molecular | 🟡 Media | ⏳ Pendiente | 0/5 |

---

## 📊 Diagrama de Dependencias

```
HDU-0 (Infraestructura) ─────────────────────────────────┐
         │                                                │
         ▼                                                │
    ┌─────────┬─────────┬─────────┐                      │
    │         │         │         │                      │
    ▼         ▼         ▼         ▼                      │
  HDU-1    HDU-2     HDU-3     HDU-4                     │
  (Masa    (Conversor)(Composición)(Fórmula             │
  Molar)              Porcentual)  Empírica)            │
    │         │         │         │                      │
    └─────────┴─────────┴─────────┘                      │
                    │                                     │
                    ▼                                     │
            🎉 PRODUCTO FINAL ◄──────────────────────────┘
```

---

## 🏷️ Leyenda de Estados

| Símbolo | Significado |
|---------|-------------|
| ⏳ | Pendiente |
| 🔄 | En Progreso |
| ✅ | Completado |
| ❌ | Bloqueado |
| 🔴 | Prioridad Crítica/Alta |
| 🟡 | Prioridad Media |
| 🟢 | Prioridad Baja |

---

## 📅 Orden de Ejecución Recomendado

1. **Fase 1:** HDU-0 (Base obligatoria)
2. **Fase 2:** HDU-1 → HDU-2 (Features principales)
3. **Fase 3:** HDU-3 → HDU-4 (Features avanzadas)

---

## 📝 Notas

- Cada HDU debe completarse **en orden** de sus tickets
- Los tickets marcados como `[BLOQUEADOR]` deben resolverse antes de continuar
- Realizar commits después de cada ticket completado

