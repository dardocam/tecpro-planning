# 📘 Actividad N3 en Excel

## 🎮 Dashboard Interactivo: **“El Juego de Ventas”**

## 🎯 Objetivo de la actividad

* Aprender a **diseñar dashboards** con estilos profesionales en Excel.
* Utilizar funciones como `SUMAR.SI`, `MAX`, `PROMEDIO` y referencias absolutas.
* Implementar **gráficos dinámicos** y **formato condicional**.
* Introducir un **minijuego de predicción y ranking** para reforzar el aprendizaje.

---

## 🧠 Contexto

La empresa ficticia **TechStore** quiere analizar sus ventas mensuales por vendedor.
El objetivo es crear un dashboard que muestre:

* Ventas por vendedor.
* Total, promedio y mejor venta.
* Un **juego de predicción** donde los estudiantes deben adivinar quién será el “Top Seller” del mes.

---

## 🛠 Paso a paso de la actividad

### 1️⃣ Preparar los datos

En la hoja **Datos**, crear una tabla así:

| Vendedor | Mes     | Ventas |
| -------- | ------- | ------ |
| Ana      | Enero   | 1200   |
| Juan     | Enero   | 800    |
| Sofía    | Enero   | 1500   |
| Pedro    | Enero   | 950    |
| Ana      | Febrero | 1700   |
| Juan     | Febrero | 1200   |
| Sofía    | Febrero | 1800   |
| Pedro    | Febrero | 1600   |

👉 Pueden completar con valores aleatorios o se entrega precargado.

---

### 2️⃣ Crear el Dashboard

En una nueva hoja llamada **Dashboard**:

* **Título:** Combinar celdas A1\:E1 → “📊 Dashboard de Ventas TechStore”

  * Fondo azul oscuro.
  * Fuente blanca, tamaño 16.

* **Indicadores Clave (KPI):**
  En fila 4, crear tarjetas con estilo:

  * Total de Ventas → `=SUMA(Datos!C2:C9)`
  * Promedio de Ventas → `=PROMEDIO(Datos!C2:C9)`
  * Mejor Venta → `=MAX(Datos!C2:C9)`

* **Gráfico dinámico:**
  Insertar un gráfico de columnas agrupadas con Ventas por Vendedor.
  Estilo profesional: colores suaves, título encima y sin líneas de cuadrícula.

---

### 3️⃣ Gamificación – El Juego del “Top Seller”

En la parte baja del dashboard:

* **Zona de predicción:**

  * Celda **H15:** “Tu predicción de Top Seller es:”
  * Celda **I15:** Validación de datos → Lista desplegable con nombres de vendedores.

* **Zona de resultado real:**

  * Celda **H17:** “Top Seller real es:”
  * Celda **I17:** Fórmula:

    ```excel
    =INDICE(Datos!A2:A9,COINCIDIR(MAX(Datos!C2:C9),Datos!C2:C9,0))
    ```

    👉 Esto devuelve el vendedor con mayor venta.

* **Validación del juego:**

  * Celda **H19:** “Resultado del juego:”
  * Celda **I19:**

    ```excel
    =SI(I15=I17,"✔ Ganaste","✘ Intenta otra vez")
    ```

* **Formato condicional en I19:**

  * Si contiene “✔ Ganaste” → Fondo verde, texto blanco.
  * Si contiene “✘” → Fondo rojo, texto blanco.

---

### 4️⃣ Ranking de predicciones (opcional avanzado)

* Agregar una tabla con la lista de alumnos (A21\:A30).
* En B21\:B30 ingresan su predicción.
* En C21\:C30 fórmula para validar si acertaron:

  ```excel
  =SI(B21=$I$17,"✔","✘")
  ```
* Crear un **contador de aciertos** por alumno → `=CONTAR.SI(C21:C30,"✔")`
* Insertar gráfico de barras con “Ranking de Aciertos”.

---

## 🎨 Estilos recomendados

* Encabezados: azul oscuro (#1F4E78), fuente blanca.
* Tarjetas KPI: fondo gris claro, bordes redondeados.
* Gráfico: colores corporativos suaves (azul, verde, naranja).
* Juego: celdas amarillas para entradas, verdes/rojas para resultados.

---

## 📋 Evaluación

* El dashboard tiene título, KPIs y gráfico.
* Se implementa el juego con validación de predicciones.
* Se aplica formato condicional para feedback visual.
* Opcional: Ranking de predicciones entre estudiantes.

---

## 🎓 Resultado esperado

Un dashboard profesional y atractivo en Excel que no solo analiza datos, sino que incluye un **componente de juego interactivo** para fomentar la participación.

---
