# Informe de Trabajo Aplicado

## Relaciones de Masa y Fórmula Empírica y Molecular

**Aplicación:** AtomPop - Calculadora de Química Educativa

---

## Información del Grupo

| Campo | Detalle |
|-------|---------|
| **Asignatura** | Química General |
| **Tema** | Relaciones de masa y fórmula empírica y molecular |
| **Encargado de Grupo** | Rubén Contreras |

### Integrantes

1. Rubén Contreras
2. Fabián Soto
3. Juan Contreras
4. Patricio Aro
5. Jonathan Rojas
6. César Araya

---

## 1. Descripción del Proyecto

**AtomPop** es una aplicación web educativa diseñada para facilitar el aprendizaje y resolución de problemas relacionados con estequiometría y relaciones de masa en química. La aplicación permite realizar cálculos de manera interactiva, mostrando el proceso paso a paso para fines educativos.

### 1.1 Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| React 19 | Framework de interfaz |
| TypeScript | Tipado estático |
| Vite 7 | Entorno de desarrollo |
| Tailwind CSS | Estilos |
| Vitest | Testing (186 tests) |

### 1.2 URL de Producción

🔗 **https://atompop.info**

---

## 2. Funcionalidades Implementadas

La aplicación cubre todos los temas solicitados:

| Funcionalidad | Descripción | Estado |
|---------------|-------------|--------|
| **Moles** | Conversión y cálculo de cantidad de sustancia | ✅ |
| **N° de Avogadro** | Cálculo de átomos y moléculas (6.022 × 10²³) | ✅ |
| **Masa Molar** | Cálculo con desglose por elemento | ✅ |
| **Composición Porcentual** | Porcentaje de masa de cada elemento | ✅ |
| **Fórmula Empírica** | Desde porcentajes de composición | ✅ |
| **Fórmula Molecular** | Desde fórmula empírica y masa experimental | ✅ |

---

## 3. Ejemplos de Cálculo

### 3.1 Masa Molar - Ácido Sulfúrico (H₂SO₄)

| Elemento | Cantidad | Masa Atómica | Subtotal |
|----------|----------|--------------|----------|
| H | 2 | 1.008 g/mol | 2.016 g/mol |
| S | 1 | 32.06 g/mol | 32.06 g/mol |
| O | 4 | 15.999 g/mol | 63.996 g/mol |
| **Total** | | | **98.079 g/mol** |

### 3.2 Conversión de Unidades - Glucosa (C₆H₁₂O₆)

**Dado:** 1 mol de glucosa

| Propiedad | Valor | Fórmula |
|-----------|-------|---------|
| Moles | 1 mol | (dato) |
| Masa | 180.156 g | moles × masa molar |
| Partículas | 6.022 × 10²³ | moles × N_A |

### 3.3 Fórmula Empírica - Ejemplo

**Datos de composición:** C: 40%, H: 6.7%, O: 53.3%

| Paso | C | H | O |
|------|---|---|---|
| 1. % ÷ masa atómica | 40 ÷ 12 = 3.33 | 6.7 ÷ 1 = 6.7 | 53.3 ÷ 16 = 3.33 |
| 2. Dividir por menor | 3.33 ÷ 3.33 = 1 | 6.7 ÷ 3.33 = 2 | 3.33 ÷ 3.33 = 1 |
| 3. Fórmula | **CH₂O** |

### 3.4 Fórmula Molecular

**Datos:** Fórmula empírica CH₂O, Masa experimental: 180 g/mol

- Masa empírica: 30.03 g/mol
- Multiplicador: 180 ÷ 30.03 = **6**
- **Fórmula Molecular: C₆H₁₂O₆** (Glucosa)

---

## 4. Carta Gantt - Desarrollo del Proyecto

El desarrollo se organizó en **Historias de Usuario (HDUs)**, cada una representando una fase del proyecto. El progreso se puede verificar en los commits de GitHub.

| HDU | Nombre | Fecha | Commits | Estado |
|-----|--------|-------|---------|--------|
| HDU-0 | Infraestructura y Motor Químico | Nov 2024 | 83 tests | ✅ |
| HDU-1 | Calculadora de Masa Molar | Nov 2024 | 28 tests | ✅ |
| HDU-2 | Conversor Moles/Gramos/Partículas | Nov 2024 | 49 tests | ✅ |
| HDU-3 | Composición Porcentual | Nov 2024 | 40 tests | ✅ |
| HDU-4 | Fórmula Empírica y Molecular | Nov 2024 | 67 tests | ✅ |

**Repositorio:** https://github.com/rcontreras1337/AtomPop

### 4.1 Diagrama de Fases

```
Semana 1    Semana 2    Semana 3    Semana 4
────────────────────────────────────────────────
[HDU-0: Infraestructura]
            [HDU-1: Masa Molar]
                        [HDU-2: Conversor]
                        [HDU-3: Composición]
                                    [HDU-4: Fórmulas]
────────────────────────────────────────────────
                                    ✅ ENTREGA
```

---

## 5. Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| Tests Unitarios | 186 |
| Tests E2E | 117 |
| **Tests Totales** | **303** |
| Elementos en Tabla Periódica | 74 |
| Páginas/Calculadoras | 4 |
| Líneas de Código | ~5,000 |

---

## 6. Conclusiones

AtomPop cumple con todos los requerimientos solicitados para el cálculo de relaciones de masa y fórmulas químicas:

1. ✅ **Moles:** Conversión bidireccional implementada
2. ✅ **N° Avogadro:** Constante 6.02214076 × 10²³ utilizada para cálculos de partículas
3. ✅ **Masa Molar:** Cálculo con desglose detallado por elemento
4. ✅ **Composición Porcentual:** Visualización con gráfico circular interactivo
5. ✅ **Fórmula Empírica:** Cálculo paso a paso desde porcentajes
6. ✅ **Fórmula Molecular:** Cálculo desde empírica y masa experimental

La aplicación es **accesible públicamente** en https://atompop.info y puede resolver cualquier ejercicio relacionado con los temas mencionados para diferentes compuestos y átomos.

---

## 7. Referencias

- Repositorio GitHub: https://github.com/rcontreras1337/AtomPop
- Aplicación en producción: https://atompop.info
- Documentación técnica: Ver carpeta `/HDUS` en el repositorio

---

*Documento generado el 1 de diciembre de 2024*

