# 📝 Práctica Guiada: “Hoja de Cálculo Multi-Funciones en Excel”

**Objetivo:** Crear desde cero una hoja que aplique diferentes funciones de Excel para obtener una visión general de su potencial.

---

## 1️⃣ Preparar la hoja

1. Abre **Microsoft Excel** y crea un libro nuevo.
2. Renombra la hoja como **Actividad N°2**.
3. Configura el ancho de columnas para que la información se vea clara (Columna A a E → 18 px aprox.).
4. Usa **negrita** para títulos y agrega un color suave de fondo en los encabezados.

---

## 2️⃣ Funciones básicas de resumen

### **Paso 1 – PROMEDIO**

* En la columna **B** escribe números del **B6 al B13**.
* En **G9** coloca:

```excel
=PROMEDIO(B6:B13)
```

💡 Muestra el promedio de esos valores.

---

### **Paso 2 – MAX**

* En **B17\:B24** coloca números aleatorios.
* En **G20** escribe:

```excel
=MAX(B17:B24)
```

💡 Devuelve el número mayor del rango.

---

### **Paso 3 – PRODUCTO**

* En **B28\:B35** coloca números.
* En **G31** escribe:

```excel
=PRODUCTO(B28:B35)
```

💡 Multiplica todos los valores del rango.

---

### **Paso 4 – CONTAR**

* En **B39\:B46** coloca una mezcla de números y textos.
* En **G42** escribe:

```excel
=CONTAR(B39:B46)
```

💡 Cuenta solo las celdas con números.

---

### **Paso 5 – CONTAR.BLANCO**

* En **B50\:B57** deja algunas celdas vacías.
* En **G53**:

```excel
=CONTAR.BLANCO(B50:B57)
```

💡 Cuenta cuántas celdas están vacías.

---

## 3️⃣ Funciones condicionales con texto

### **Paso 6 – CONTAR.SI con criterios**

En **B65\:B72** escribe palabras variadas.
En:

* **G66**:

```excel
=CONTAR.SI(B65:B72;"o*")
```

Cuenta las que empiezan con “o”.

* **G68**:

```excel
=CONTAR.SI(B65:B72;"*o")
```

Cuenta las que terminan en “o”.

* **G70**:

```excel
=CONTAR.SI(B65:B72;"*at*")
```

Cuenta las que contienen “at”.

* **G72**:

```excel
=CONTAR.SI(B65:B72;"p*")+CONTAR.SI(B65:B72;"c*")
```

Cuenta las que empiezan con “p” o “c”.

---

## 4️⃣ Funciones especiales

### **Paso 7 – ESPAR y CONTAR.SI**

* En **A76\:A83** coloca números variados.
* En **D76**:

```excel
=ESPAR(A76)
```

* Copia hacia abajo.
* En **H79**:

```excel
=CONTAR.SI(D76:D83;VERDADERO)
```

💡 Cuenta cuántos son pares.

---

### **Paso 8 – Funciones trigonométricas**

* En **C88\:C100** coloca ángulos en grados.
* En **D88**:

```excel
=COS(C88*2*PI()/360)
```

💡 Convierte a radianes antes de aplicar la función.

Repite en otras columnas con `SENO` y `TAN`.

---

### **Paso 9 – ÁRABE**

* En **D105** coloca números romanos (Ej: XV, XX, XL).
* En **E105**:

```excel
=ARABE(D105)
```

---

### **Paso 10 – DÍAS**

* En **D127** coloca fecha inicial.
* En **E127** fecha final.
* En **F127**:

```excel
=DIAS(E127;D127)
```

---

### **Paso 11 – Referencias absolutas**

* En **A135\:A141** y **B135\:B141** coloca números.
* En **C135**:

```excel
=A135+B135
```

* Copia hacia abajo (referencias relativas).
* En **F135** coloca un valor fijo.
* En **H135**:

```excel
=$F$135+G135
```

* Copia hacia abajo (referencia absoluta a F135).

---

### **Paso 12 – ALEATORIO y ALEATORIO.ENTRE**

* En **F145**:

```excel
=ALEATORIO()
```

* En **F149**:

```excel
=ALEATORIO.ENTRE(0;99999)
```

---

### **Paso 13 – AHORA**

* En **F153**:

```excel
=AHORA()
```

💡 Muestra fecha y hora actual.

---

### **Paso 14 – BDCONTAR**

1. En **B161\:C168** crea tabla con encabezado “CAMPO1” y valores.
2. En **G161\:G162** crea tabla de criterios con encabezado “CAMPO1” y criterio `>100`.
3. En **F172**:

```excel
=BDCONTAR(B161:C168;"CAMPO1";G161:G162)
```

---

## 🎯 Resultado final

Obtendrás una hoja con múltiples secciones, cada una aplicando una función diferente de Excel, que permite:

* Resumir datos numéricos.
* Contar y filtrar valores.
* Trabajar con texto y condiciones.
* Usar referencias absolutas.
* Aplicar funciones especiales (trigonométricas, fechas, aleatorias, bases de datos).


