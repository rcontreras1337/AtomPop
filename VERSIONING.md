# 📋 Directrices de Versionamiento - AtomPop

> Este documento define las reglas para el versionamiento semántico del proyecto AtomPop.

---

## 🏷️ Formato de Versión

Seguimos el estándar **Semantic Versioning (SemVer)**:

```
MAJOR.MINOR.PATCH
  │      │     │
  │      │     └── 🔧 PATCH: Correcciones y ajustes menores
  │      │
  │      └──────── ✨ MINOR: Nueva funcionalidad (compatible hacia atrás)
  │
  └─────────────── 💥 MAJOR: Cambios que rompen compatibilidad
```

**Ejemplo:** `v1.2.3`
- **1** = Major
- **2** = Minor
- **3** = Patch

---

## 🔧 PATCH (0.0.X) - Cambios Pequeños

**Incrementar PATCH cuando:**

- ✅ Corrección de bugs menores
- ✅ Corrección de errores tipográficos
- ✅ Ajustes de estilos CSS (colores, espaciados)
- ✅ Mejoras de rendimiento sin cambio funcional
- ✅ Actualización de dependencias de seguridad
- ✅ Corrección de tests existentes
- ✅ Ajustes en documentación existente
- ✅ Refactoring menor sin cambio de API

**Ejemplos:**
```
v0.1.0 → v0.1.1: "Fix: Corregir cálculo de masa molar para elementos con decimales"
v0.2.3 → v0.2.4: "Style: Ajustar colores de badges en modo oscuro"
```

---

## ✨ MINOR (0.X.0) - Nueva Funcionalidad

**Incrementar MINOR cuando:**

- ✅ Nueva calculadora o módulo completo (HDU completa)
- ✅ Nueva función en el motor químico
- ✅ Nuevo componente UI reutilizable
- ✅ Nueva página o vista
- ✅ Nuevos elementos en la tabla periódica
- ✅ Nueva integración o característica
- ✅ Mejoras significativas de UX
- ✅ Nuevos tests para funcionalidad existente

**Ejemplos:**
```
v0.1.3 → v0.2.0: "Feat: Implementar calculadora de Masa Molar (HDU-1)"
v0.3.1 → v0.4.0: "Feat: Agregar gráfico circular en Composición Porcentual"
```

---

## 💥 MAJOR (X.0.0) - Cambios Mayores

**Incrementar MAJOR cuando:**

- ✅ Cambios que rompen la API existente
- ✅ Rediseño completo de la aplicación
- ✅ Migración a nueva tecnología core
- ✅ Cambios en la estructura de datos que afectan usuarios
- ✅ Eliminación de funcionalidades deprecadas
- ✅ Primera versión estable (1.0.0)

**Ejemplos:**
```
v0.9.0 → v1.0.0: "Release: Primera versión estable de AtomPop"
v1.5.2 → v2.0.0: "Breaking: Migración a nueva arquitectura de estado"
```

---

## 📝 Relación HDU → Versión

| Tipo de HDU | Versión Sugerida | Descripción |
|-------------|------------------|-------------|
| **HDU-0** (Infraestructura) | `0.1.0` | Base del proyecto |
| **HDU-1** (Feature) | `0.2.0` | Nueva calculadora |
| **HDU-2** (Feature) | `0.3.0` | Nueva calculadora |
| **HDU-3** (Feature) | `0.4.0` | Nueva calculadora |
| **HDU-4** (Feature) | `0.5.0` | Nueva calculadora |
| **Bugfixes** | `0.X.1` | Correcciones |
| **Release Final** | `1.0.0` | Producto completo |

---

## 🏷️ Formato de Tags Git

```bash
# Crear tag de versión
git tag -a v0.2.0 -m "Feat: HDU-1 - Calculadora de Masa Molar"

# Subir tag
git push origin v0.2.0

# Ver tags
git tag -l
```

---

## 📋 Formato de Commits

Seguir el estándar **Conventional Commits**:

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos de Commit

| Tipo | Emoji | Descripción | Versión |
|------|-------|-------------|---------|
| `feat` | ✨ | Nueva funcionalidad | MINOR |
| `fix` | 🐛 | Corrección de bug | PATCH |
| `docs` | 📚 | Documentación | PATCH |
| `style` | 🎨 | Estilos (sin cambio lógico) | PATCH |
| `refactor` | ♻️ | Refactoring | PATCH |
| `test` | 🧪 | Tests | PATCH |
| `chore` | 🔧 | Tareas de mantenimiento | PATCH |
| `perf` | ⚡ | Mejora de rendimiento | PATCH |
| `breaking` | 💥 | Cambio que rompe compatibilidad | MAJOR |

### Ejemplos de Commits

```bash
# PATCH
git commit -m "fix(parser): corregir parsing de paréntesis anidados"
git commit -m "docs(readme): actualizar instrucciones de instalación"
git commit -m "style(button): ajustar padding en botón primario"

# MINOR
git commit -m "feat(masa-molar): implementar desglose paso a paso"
git commit -m "feat(conversor): agregar conversión de partículas"

# MAJOR
git commit -m "breaking(api): cambiar estructura de MolarMassResult"
```

---

## 📅 Proceso de Release

### 1. Antes del Release
- [ ] Todos los tests pasan (`npm run test:run`)
- [ ] No hay errores de lint (`npm run lint`)
- [ ] Build exitoso (`npm run build`)
- [ ] CHANGELOG.md actualizado
- [ ] README.md actualizado si hay nuevas features

### 2. Crear Release
```bash
# 1. Actualizar versión en package.json
npm version minor  # o patch o major

# 2. Commit de cambios
git add .
git commit -m "chore(release): v0.2.0"

# 3. Crear tag
git tag -a v0.2.0 -m "Feat: HDU-1 - Calculadora de Masa Molar"

# 4. Push
git push origin main --tags
```

### 3. Después del Release
- [ ] Verificar que el tag existe en GitHub
- [ ] Crear Release en GitHub con notas
- [ ] Notificar cambios si es necesario

---

## 🚀 Versiones Pre-release

Para versiones de desarrollo:

```
0.2.0-alpha.1   # Primera alpha
0.2.0-beta.1    # Primera beta
0.2.0-rc.1      # Release candidate
0.2.0           # Versión final
```

---

## 📌 Decisiones Rápidas

| Pregunta | Respuesta |
|----------|-----------|
| ¿Agregué una nueva página? | **MINOR** |
| ¿Corregí un bug? | **PATCH** |
| ¿Agregué un nuevo componente? | **MINOR** |
| ¿Cambié estilos visuales? | **PATCH** |
| ¿Completé una HDU? | **MINOR** |
| ¿Rompí algo que funcionaba antes? | **MAJOR** |
| ¿Agregué tests? | **PATCH** |
| ¿Actualicé documentación? | **PATCH** |

---

## 📄 Referencias

- [Semantic Versioning 2.0.0](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)

