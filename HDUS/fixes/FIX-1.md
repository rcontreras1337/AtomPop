# FIX-1: Botón "Limpiar valores" con icono mal posicionado

> **Prioridad:** 🟡 Media  
> **Estado:** ✅ Completado  
> **Fecha Completado:** 2024-11-30  
> **Tipo:** Bug Fix / UI  
> **Versión:** `0.5.1` (PATCH)

---

## 🐛 Descripción del Bug

El botón "Limpiar valores" en varias páginas muestra el icono de basurero **sobre** el texto en lugar de **al lado** (inline). Esto causa inconsistencia visual con otros botones de la aplicación.

---

## 📍 Ubicaciones Afectadas

| Página | Archivo | Líneas | Estado |
|--------|---------|--------|--------|
| Conversor | `src/pages/ConverterPage.tsx` | 211-218 | ⚠️ Icono como hijo |
| Composición | `src/pages/CompositionPage.tsx` | 111-117 | ⚠️ Solo icono, sin texto |
| Fórmula Empírica | `src/pages/EmpiricalPage.tsx` | 173-181, 317-325 | ⚠️ Icono como hijo |
| Masa Molar | `src/pages/MolarMassPage.tsx` | 178-186 | ✅ Usa prop `icon` |

---

## 🔍 Causa Raíz

El componente `Button` tiene una prop `icon` que posiciona correctamente el icono:

```tsx
// ✅ Correcto - usa la prop icon
<Button variant="ghost" onClick={clear} icon={<Trash2 size={18} />}>
  Limpiar
</Button>

// ❌ Incorrecto - icono como hijo directo
<Button variant="ghost" onClick={clear} className="flex items-center gap-2">
  <Trash2 size={16} />
  Limpiar valores
</Button>
```

Cuando el icono se pasa como hijo directo junto con `className="flex items-center gap-2"`, esto puede causar conflictos con los estilos internos del Button que ya tiene `inline-flex items-center gap-2`.

---

## ✅ Solución

### TICKET FIX-1.1: Corregir ConverterPage

**Archivo:** `src/pages/ConverterPage.tsx`

**Antes:**
```tsx
<Button
  variant="ghost"
  onClick={clear}
  className="flex items-center gap-2"
>
  <Trash2 size={16} />
  Limpiar valores
</Button>
```

**Después:**
```tsx
<Button
  variant="ghost"
  onClick={clear}
  icon={<Trash2 size={16} />}
>
  Limpiar valores
</Button>
```

---

### TICKET FIX-1.2: Corregir CompositionPage

**Archivo:** `src/pages/CompositionPage.tsx`

**Antes:**
```tsx
<Button
  variant="ghost"
  onClick={clear}
  className="flex items-center gap-2"
>
  <Trash2 size={18} />
</Button>
```

**Después:**
```tsx
<Button
  variant="ghost"
  onClick={clear}
  icon={<Trash2 size={18} />}
>
  Limpiar
</Button>
```

---

### TICKET FIX-1.3: Corregir EmpiricalPage (Modo Empírica)

**Archivo:** `src/pages/EmpiricalPage.tsx` (líneas 173-181)

**Antes:**
```tsx
<Button
  variant="ghost"
  onClick={clear}
  className="flex items-center gap-2"
>
  <Trash2 size={16} />
  Limpiar
</Button>
```

**Después:**
```tsx
<Button
  variant="ghost"
  onClick={clear}
  icon={<Trash2 size={16} />}
>
  Limpiar
</Button>
```

---

### TICKET FIX-1.4: Corregir EmpiricalPage (Modo Molecular)

**Archivo:** `src/pages/EmpiricalPage.tsx` (líneas 317-325)

Misma corrección que FIX-1.3.

---

## 🧪 Tests de Verificación

```typescript
describe('FIX-1: Botón Limpiar', () => {
  it('debe mostrar icono al lado del texto en ConverterPage');
  it('debe mostrar icono al lado del texto en CompositionPage');
  it('debe mostrar icono al lado del texto en EmpiricalPage');
  it('todos los botones deben tener el mismo estilo visual');
});
```

---

## 📊 Checklist

- [x] FIX-1.1: ConverterPage corregido
- [x] FIX-1.2: CompositionPage corregido
- [x] FIX-1.3: EmpiricalPage (Empírica) corregido
- [x] FIX-1.4: EmpiricalPage (Molecular) corregido
- [x] Verificación visual en todas las páginas
- [ ] Tests E2E pasan

---

## 📸 Screenshots

### Antes (Bug)
```
┌─────────────────────┐
│  🗑️                 │
│  Limpiar valores    │  ← Icono sobre el texto
└─────────────────────┘
```

### Después (Correcto)
```
┌─────────────────────────────┐
│  🗑️ Limpiar valores        │  ← Icono al lado del texto
└─────────────────────────────┘
```

