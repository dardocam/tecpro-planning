## 🧾 Paso a Paso: Crear una Hoja de Cálculo tipo Factura (desde cero)

> Compatible con **Google Sheets**, **Excel**, y **LibreOffice Calc**

---

## 1️⃣ Estructura básica del documento

### 📌 Paso 1: Encabezado de la Factura

En la parte superior, deja espacio para los datos del emisor y cliente:

| A              | B                       |
| -------------- | ----------------------- |
| **Factura Nº** | `0001-000001`           |
| **Fecha**      | `=TODAY()` (automático) |
| **Cliente**    | `Nombre del cliente`    |
| **CUIT/DNI**   | `Documento del cliente` |

💡 Usa formato negrita y bordes para destacarlos.

---

## 2️⃣ Estructura de los ítems

### 📌 Paso 2: Encabezado de la tabla de productos

En fila 8, por ejemplo, escribe lo siguiente en cada columna:

| A            | B            | C                   | D            | E                |
| ------------ | ------------ | ------------------- | ------------ | ---------------- |
| **Producto** | **Cantidad** | **Precio Unitario** | **Subtotal** | **Impuesto (%)** |

---

### 📌 Paso 3: Cargar datos simulados

Debajo del encabezado (fila 9 en adelante), completa algunos ejemplos:

| Producto | Cantidad | Precio Unitario | Subtotal  | Impuesto (%) |
| -------- | -------- | --------------- | --------- | ------------ |
| Cuaderno | 2        | 500             | (Fórmula) | 21%          |
| Lápiz    | 10       | 50              | (Fórmula) | 10.5%        |
| Mochila  | 1        | 3000            | (Fórmula) | 21%          |

---

## 3️⃣ Fórmulas clave

### 📌 Paso 4: Calcular el Subtotal

En la celda **D9**, coloca la fórmula:

```excel
=B9*C9
```

Arrastra hacia abajo según la cantidad de filas de productos.

---

### 📌 Paso 5: Calcular el impuesto individual (columna F opcional)

Agrega una columna **F**: `Impuesto Total`
Coloca la fórmula en **F9**:

```excel
=D9*E9
```

➡️ Multiplica el subtotal por el porcentaje de impuesto.

💡 Si E9 tiene `21%`, se calculará el 21% del subtotal.

---

## 4️⃣ Cálculos finales (totales)

### 📌 Paso 6: Calcular totales generales

En una sección al final (por ejemplo, fila 20), agrega:

| C                       | D                                                         |
| ----------------------- | --------------------------------------------------------- |
| **Total sin impuestos** | `=SUM(D9:D11)`                                            |
| **Total de impuestos**  | `=SUM(F9:F11)` *(si se agregó columna de impuesto total)* |
| **TOTAL FINAL**         | `=D20 + D21` *(o `=SUM(D9:D11)*(1+IVA)` si es general)*   |

🎯 Si todos los productos tienen el mismo impuesto, puedes usar una celda separada para ingresar el % (Ej: en H1) y hacer:

```excel
=SUM(D9:D11)*(1+$H$1)
```

---

## 5️⃣ Estética y formato

### 📌 Paso 7: Dar formato profesional

* Usa **bordes** para la tabla principal.
* Aplica **formato moneda** (\$) en columnas de precios, subtotales y totales.
* Alineación **centrada** para cantidad y porcentaje.
* Colores sutiles para el encabezado (fondo gris claro o celeste).
* Aplica **formato condicional** para resaltar filas con impuestos mayores al 15%.

---

## 6️⃣ Mejora

### 🧩 Validaciones de datos

* En columna E (Impuesto), crea una **lista desplegable** con valores comunes:

  * 0%
  * 10.5%
  * 21%
* Así evitas errores de tipeo.

---

## 📂 Resultado final (ejemplo visual)

```
Factura Nº: 0001-000001
Fecha: =TODAY()

| Producto  | Cantidad | Precio Unitario | Subtotal | Impuesto (%) | Impuesto Total |
|-----------|----------|-----------------|----------|---------------|----------------|
| Cuaderno  |    2     |        500      |  1000    |      21%      |     210        |
| Lápiz     |   10     |         50      |   500    |    10.5%      |     52.5       |
| Mochila   |    1     |       3000      |  3000    |      21%      |     630        |

Total sin impuestos: 4500  
Total impuestos: 892.5  
**TOTAL FINAL: 5392.5**
```

---

## 🧩 ¿Qué se logra con este proyecto?

* Aplicar operaciones matemáticas simples (`*`, `+`, `SUM`)
* Usar referencias relativas y absolutas
* Validar el uso de porcentajes e impuestos
* Simular un caso real de facturación automatizada

---

