# 📘 Actividad N4: **“Dashboard Hogareño – El Desafío de los Gastos”**

## 🎯 Objetivos de aprendizaje

* Aplicar funciones (`SUMA`, `PROMEDIO`, `MAX`, `MIN`, `SI`) en un contexto real.
* Construir **dashboards con estilo profesional** (KPIs + gráficos).
* Usar lógica de negocios: descuentos condicionales según consumos.
* Introducir un **juego de optimización**: descubrir cómo reducir gastos sin perder servicios clave.

---

## 🛠 Desarrollo de la actividad

### 1️⃣ Preparación de la base de datos

Cargar la planilla de gastos hogareños (enero a junio, luego completarla hasta diciembre).

| Servicio   | Enero | Febrero | Marzo | Abril | Mayo | Junio | … |
| ---------- | ----- | ------- | ----- | ----- | ---- | ----- | - |
| UPC     | 84,35 | 98,32   | 96,70 | …     | …    | …     | … |
| Cammuzi   | 20,65 | 21,37   | 39,35 | …     | …    | …     | … |
| Telefónica | 65,95 | 78,90   | 88,70 | …     | …    | …     | … |
| …          | …     | …       | …     | …     | …    | …     | … |

---

### 2️⃣ Construcción del Dashboard

En una nueva hoja llamada **Dashboard**, crear:

#### 📊 KPIs principales (tarjetas con formato atractivo)

* **Gasto total mensual** → `=SUMA(B2:B10)`
* **Servicio más caro del mes** → `=MAX(B2:B10)`
* **Servicio más barato del mes** → `=MIN(B2:B10)`
* **Promedio mensual** → `=PROMEDIO(B2:B10)`

Cada KPI debe tener colores diferenciados (verde, rojo, azul, naranja).

---

#### 📈 Gráficos

1. **Gráfico de sectores (circular):** Enero → participación de cada servicio en el gasto total.
2. **Gráfico de barras:** evolución del gasto de **Tarjeta** mes a mes.
3. **Gráfico de líneas:** evolución de **Expensas** a lo largo del semestre.

💡 Personalizar con títulos, etiquetas y colores modernos.

---

### 3️⃣ Funciones lógicas (juego de descuentos)

* **Edesur**: 10% de descuento si el gasto semestral > \$300.

  ```excel
  =SI(SUMA(B2:G2)>300,SUMA(B2:G2)*0,1,0)
  ```
* **Metrogas**: 15% de descuento si supera \$400 semestrales.

  ```excel
  =SI(SUMA(B3:G3)>400,SUMA(B3:G3)*0,15,0)
  ```

---

### 4️⃣ Dinámica de Juego: **“El Hogar más Eficiente”**


* **Proponer una estrategia de reducción de gastos** (ejemplo: bajar 10% “Varios”, negociar alquiler, usar menos tarjeta).
* En el Dashboard hay una **columna editable “Ahorro propuesto”**, donde ingresan el % de reducción.
* Excel recalcula automáticamente el **Total con ahorro**.

💡 Se asigna un **ranking** en el dashboard:



---

## 🎨 Estilos sugeridos

* Encabezado con fondo azul oscuro y fuente blanca.
* KPIs en tarjetas tipo “cards” con colores suaves.
* Gráficos con paleta corporativa moderna.
* Tabla de datos con **formato condicional**:

  * Rojo → gastos que aumentan más de 20% respecto al mes anterior.
  * Verde → gastos que se reducen.

---

## 🎓 Resultado esperado

Un **Dashboard de Excel atractivo y funcional**
* Desarrollo de habilidades analíticas.
* Refuerzo el uso de **funciones, gráficos y lógica en Excel**.

---

## 🎯 Objetivos ampliados

* Consolidar el dominio de **funciones de Excel**: `SUMA`, `PROMEDIO`, `MAX`, `MIN`, `SI`, `SI.CONJUNTO`, `SUMAR.SI`, `BUSCARV`.
* Diseñar un **Dashboard de control financiero** con estilo profesional.
* Implementar **análisis avanzado** con tablas dinámicas y gráficos combinados.
* Jugar a ser **gestores financieros**: tomar decisiones de ahorro, inversión y control de gastos.

---

## 🛠 Desarrollo perfeccionado

### 1️⃣ Base de datos completa

* Extender la tabla a **12 meses (Enero-Diciembre)**.
* Columnas:

  * **Servicio**
  * **Enero – Diciembre**
  * **Total anual** (fórmula `=SUMA(Enero:Diciembre)`)
  * **Promedio mensual** (`=PROMEDIO(Enero:Diciembre)`)

👉 Esto convierte la planilla en un **histórico anual de gastos**.

---

### 2️⃣ Dashboard mejorado


#### 📊 KPIs principales

* Total anual de gastos.
* Servicio con mayor gasto acumulado.
* Servicio con menor gasto acumulado.
* % del presupuesto que ocupa cada servicio.

#### 📈 Gráficos

1. **Circular dinámico** → distribución de gastos por servicio.
2. **Gráfico combinado** (columnas + línea) → evolución de tarjeta y comparación con promedio mensual.
3. **Mapa de calor** (formato condicional) → resaltar meses con gastos más altos por servicio.

---

### 3️⃣ Lógica avanzada de descuentos

* **UPC** → 10% descuento si supera \$300 semestrales.
* **Cammuzi** → 15% si supera \$400 semestrales.
* **Seguro** → nunca cambia.
* **Tarjeta** → si supera \$2000 anuales, sugerir cambio de plan (`SI`).

💡 Usar `SI.CONJUNTO` para evaluar varios casos en una celda.

---

### 5️⃣ Contenido adicional

👉 Para hacerlo más desafiante, se adiciona un **componente de inversión simulada**:

* Columna **“Ahorro invertido”**: los estudiantes deciden cuánto del ahorro anual se invierte.
* Fórmula de **rendimiento proyectado**:

  ```excel
  =Ahorro* (1+TASA)
  ```
* Se calcula cuánto capital tendrían al final del año.

💡 La TASA se coloca fija en una celda (ej: 8% anual).

Esto convierte la planilla en una **simulación de finanzas personales**: no solo ahorrar, sino **decidir si ahorrar o invertir**.

---

## 🎨 Estilos profesionales

* Encabezado tipo “business dashboard” (azul oscuro + gris moderno).
* KPIs en tarjetas con íconos (💡 electricidad, 🔥 gas, 📞 teléfono, 🏠 alquiler).
* Uso de **gráficos combinados** para darle aspecto real de tablero corporativo.
* Formato condicional para alertas:

  * 🔴 Gastos que superan el promedio.
  * 🟢 Servicios que bajan dos meses seguidos.

---

## 🎓 Resultado esperado

Un **dashboard moderno y visual en Excel** 

* Una **herramienta analítica real**.

---

