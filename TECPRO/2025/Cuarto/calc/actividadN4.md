# 📘 Actividad Avanzada: **“Simulador de Finanzas del Hogar”**

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

Nueva hoja: **Dashboard Hogar**

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

* **Edesur** → 10% descuento si supera \$300 semestrales.
* **Metrogas** → 15% si supera \$400 semestrales.
* **Seguro** → nunca cambia.
* **Tarjeta** → si supera \$2000 anuales, sugerir cambio de plan (`SI`).

💡 Usar `SI.CONJUNTO` para evaluar varios casos en una celda.

---

### 4️⃣ Dinámica de Juego – **“El Gestor Financiero del Año”**

Cada estudiante/equipo actúa como un **asesor financiero** que debe:

1. Analizar el dashboard para detectar **qué servicio impacta más en el presupuesto**.
2. Proponer **estrategias de ahorro**:

   * Reducir consumo eléctrico.
   * Negociar expensas.
   * Ajustar gastos varios.
3. Simular en una **columna editable “% Reducción”** cuánto bajan los costos.
4. El dashboard recalcula automáticamente el:

   * Nuevo total anual.
   * % de ahorro logrado.
   * Ranking de equipos.

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

Esto convierte el juego en una **simulación de finanzas personales**: no solo ahorrar, sino **decidir si ahorrar o invertir**.

---

## 🎨 Estilos profesionales

* Encabezado tipo “business dashboard” (azul oscuro + gris moderno).
* KPIs en tarjetas con íconos (💡 electricidad, 🔥 gas, 📞 teléfono, 🏠 alquiler).
* Uso de **gráficos combinados** para darle aspecto real de tablero corporativo.
* Formato condicional para alertas:

  * 🔴 Gastos que superan el promedio.
  * 🟢 Servicios que bajan dos meses seguidos.

---

## 📋 Evaluación

* **Nivel 1 (básico):** Completar los cálculos pedidos en el archivo original.
* **Nivel 2 (intermedio):** Construir dashboard con KPIs y gráficos.
* **Nivel 3 (avanzado):** Jugar al simulador: proponer un plan de ahorro + simular inversión.
* **Nivel 4 (desafío):** Preparar una **presentación breve en clase** con el análisis del dashboard (como si fueran consultores financieros).

---

## 🎓 Resultado esperado

Un **dashboard moderno y visual en Excel** que no solo muestra los gastos, sino que se convierte en:

* Una **herramienta analítica real**.
* Un **juego de simulación financiera**.
* Un **espacio de competencia en el aula** (ranking de asesores).

---