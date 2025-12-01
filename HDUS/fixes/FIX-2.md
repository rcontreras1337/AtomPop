# FIX-2: Botón de Tabla Periódica sin Funcionalidad

> **Prioridad:** 🔴 Alta  
> **Estado:** ✅ Completado  
> **Fecha Completado:** 2024-12-01  
> **Tipo:** Feature Missing / UI  
> **Versión:** `0.6.0` (MINOR)

---

## 🐛 Descripción del Bug

El botón de "Tabla Periódica" no existe actualmente en la navegación o páginas. Debería existir un acceso rápido a la tabla periódica que permita:

1. Ver todos los elementos disponibles
2. Buscar elementos por nombre/símbolo
3. Ver propiedades de cada elemento
4. Posiblemente insertar elementos en los inputs de fórmulas

---

## 📍 Ubicaciones Sugeridas

| Ubicación | Tipo | Prioridad |
|-----------|------|-----------|
| Navbar | Botón/Link | 🔴 Alta |
| Páginas de calculadora | Botón auxiliar cerca de inputs | 🟡 Media |
| HomePage | Acceso rápido | 🟢 Baja |

---

## ✅ Solución Propuesta

### TICKET FIX-2.1: Crear Componente PeriodicTableModal

**Archivo:** `src/components/ui/PeriodicTableModal.tsx`

```typescript
interface PeriodicTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (symbol: string) => void;  // Opcional: para insertar en inputs
}
```

**Funcionalidades:**
- Modal overlay con fondo blur
- Grid de elementos con colores CPK
- Hover para ver detalles (nombre, masa, número atómico)
- Búsqueda por nombre o símbolo
- Filtro por categoría (metales, no metales, etc.)
- Click para seleccionar (si `onSelect` está definido)

---

### TICKET FIX-2.2: Crear Página /tabla-periodica

**Archivo:** `src/pages/PeriodicTablePage.tsx`

**Funcionalidades:**
- Vista completa de la tabla periódica
- Información educativa sobre cada elemento
- Responsive: en móvil mostrar como lista scrolleable
- Accesible desde navbar

---

### TICKET FIX-2.3: Agregar a Navbar

**Archivo:** `src/layouts/MainLayout.tsx`

```tsx
const navItems = [
  // ... items existentes ...
  { path: routes.periodicTable, label: 'Tabla', icon: Grid, color: 'text-slate-400' },
];
```

**O como botón especial:**
```tsx
<Button variant="ghost" onClick={() => setTableModalOpen(true)}>
  <Grid size={18} />
  <span className="hidden sm:inline">Tabla Periódica</span>
</Button>
```

---

### TICKET FIX-2.4: Agregar Botón a Inputs de Fórmula

**Archivo:** `src/components/ui/ChemicalInput.tsx`

Agregar un botón opcional de "tabla periódica" al lado del input:

```tsx
interface ChemicalInputProps {
  // ... props existentes ...
  showPeriodicTableButton?: boolean;
  onPeriodicTableClick?: () => void;
}
```

---

## 📁 Archivos a Crear/Modificar

```
src/
├── components/ui/
│   ├── PeriodicTableModal.tsx    # NUEVO
│   └── ChemicalInput.tsx         # MODIFICAR
├── pages/
│   └── PeriodicTablePage.tsx     # NUEVO
├── layouts/
│   └── MainLayout.tsx            # MODIFICAR
└── router.tsx                    # MODIFICAR (agregar ruta)
```

---

## 🎨 Diseño Visual

### Modal de Tabla Periódica
```
┌─────────────────────────────────────────────────┐
│  🔬 Tabla Periódica                       [X]   │
├─────────────────────────────────────────────────┤
│  🔍 Buscar elemento...                          │
│                                                 │
│  ┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐              │
│  │H │  │  │  │  │  │  │  │  │He│              │
│  ├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤              │
│  │Li│Be│  │  │  │  │  │  │B │C │              │
│  │  │  │  │  │  │  │  │  │  │  │              │
│  │... grid completo ...                        │
│  └──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘              │
│                                                 │
│  Elemento seleccionado:                         │
│  ┌────────────────────────────────────────────┐│
│  │ 12  Mg  Magnesio                           ││
│  │ Masa: 24.305 g/mol                         ││
│  │ Categoría: Metal alcalinotérreo            ││
│  └────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

---

## 🧪 Tests Requeridos

```typescript
describe('FIX-2: Tabla Periódica', () => {
  describe('PeriodicTableModal', () => {
    it('debe abrir y cerrar el modal');
    it('debe mostrar todos los elementos disponibles');
    it('debe filtrar por búsqueda');
    it('debe mostrar detalles al hover');
    it('debe llamar onSelect al hacer click');
  });
  
  describe('PeriodicTablePage', () => {
    it('debe cargar la página correctamente');
    it('debe ser responsive');
    it('debe mostrar información educativa');
  });
  
  describe('Navegación', () => {
    it('debe tener acceso desde navbar');
    it('debe mostrar botón en inputs de fórmula');
  });
});
```

---

## 📊 Checklist

- [x] FIX-2.1: PeriodicTableModal creado ✅
- [x] FIX-2.2: PeriodicTablePage creado ✅
- [x] FIX-2.3: Agregado a Navbar ✅
- [x] FIX-2.4: Botón en ChemicalInput ✅
- [x] Tests unitarios (67 nuevos) ✅
- [ ] Tests E2E (pendiente)
- [x] Responsive verificado ✅
- [x] Documentación actualizada ✅

---

## 🔗 Dependencias

- Hook `usePeriodicTable` (ya existe)
- Datos de `periodic-table.json` (74 elementos)
- Colores CPK por categoría

---

## 💡 Mejoras Futuras

1. Agregar más elementos (hasta 118)
2. Animaciones de transición entre elementos
3. Modo "quiz" para aprender elementos
4. Información de configuración electrónica

