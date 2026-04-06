# 🌐 Fundamentos de Diseño Web Aplicado al Diseño Web

# 🎨 **Principios Básicos del Diseño Gráfico**

## 🎯 **Objetivos de la clase**

Al finalizar esta clase vas a poder:

* Comprender el uso del **color, la tipografía y el layout**
* Aplicar reglas básicas de diseño visual
* Entender cómo se representan los colores en la web (**HEX y RGB**)
* Evitar errores comunes de diseño
* Relacionar el diseño con **CSS**

---

# 🎨 **1. EL COLOR EN EL DISEÑO WEB**

## 🌈 ¿Por qué es importante el color?

El color permite:

* Transmitir emociones
* Llamar la atención
* Organizar la información
* Mejorar la legibilidad

---

## 🎡 Teoría básica del color

* 🔴 Colores primarios: rojo, azul, amarillo
* 🟠 Colores secundarios: mezcla de primarios
* 🎯 Colores complementarios: opuestos en la rueda (alto contraste)

---

## 🎨 Paleta de colores

Una paleta es un conjunto de colores que se usa en todo el diseño.

### ✅ Reglas básicas:

* Usar **2 o 3 colores principales**
* Mantener coherencia visual
* Usar contraste para destacar elementos

---

## 💻 Códigos de color en la web

En diseño web, los colores no se escriben como “rojo” o “azul”, sino mediante códigos.

---

### 🔷 Formato HEX (Hexadecimal)

Se escribe así:

```
#RRGGBB
```

Ejemplos:

* Blanco → `#FFFFFF`
* Negro → `#000000`
* Rojo → `#FF0000`
* Azul → `#0000FF`

👉 Cada par de letras/números representa la intensidad de:

* Rojo (RR)
* Verde (GG)
* Azul (BB)

Valores van de:
`00` (mínimo) a `FF` (máximo)

---

### 🔶 Formato RGB

Se escribe así:

```
rgb(rojo, verde, azul)
```

Ejemplos:

* Blanco → `rgb(255, 255, 255)`
* Negro → `rgb(0, 0, 0)`
* Rojo → `rgb(255, 0, 0)`

👉 Cada valor va de **0 a 255**

---

### 🔁 Relación HEX vs RGB

| Color  | HEX     | RGB              |
| ------ | ------- | ---------------- |
| Blanco | #FFFFFF | rgb(255,255,255) |
| Negro  | #000000 | rgb(0,0,0)       |
| Rojo   | #FF0000 | rgb(255,0,0)     |

---

## 🧪 Uso en CSS

```css
body {
  background-color: #f4f4f4;
  color: rgb(33, 33, 33);
}
```

---

## ❌ Errores comunes con el color

* Usar demasiados colores
* Bajo contraste (no se lee)
* Colores muy brillantes o molestos

---

## 💡 Ejemplo práctico

✔ Fondo blanco + texto negro → legible
❌ Fondo amarillo + texto blanco → ilegible

---

# 🔤 **2. TIPOGRAFÍA EN DISEÑO WEB**

---

## 📖 ¿Qué es la tipografía?

Es el estilo visual del texto.

---

## 📚 Conceptos clave

* **Legibilidad** → facilidad de lectura
* **Jerarquía** → títulos, subtítulos, párrafos
* **Espaciado** → separación entre letras y líneas

---

## 🛠️ Uso en web

Ejemplo en CSS:

```css
h1 {
  font-family: Arial, sans-serif;
  font-size: 32px;
}
```

---

## ✅ Buenas prácticas

* Usar máximo **2 fuentes**
* Diferenciar títulos y texto
* Mantener tamaños adecuados

---

## ❌ Errores comunes

* Muchas fuentes diferentes
* Texto muy pequeño
* Todo el texto igual

---

## 💡 Ejemplo

✔ Título grande + texto más chico
❌ Todo igual (confunde al usuario)

---

# 📐 **3. LAYOUT (DISEÑO Y DISTRIBUCIÓN)**

---

## 🧩 ¿Qué es el layout?

Es la forma en que se organizan los elementos en la pantalla.

---

## 📊 Conceptos clave

* **Grid (rejilla)** → estructura en filas y columnas
* **Equilibrio visual**
* **Espacios en blanco (white space)**

---

## 🧪 Ejemplo en CSS (simple)

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

---

## ✅ Buenas prácticas

* Mantener orden visual
* Separar elementos
* Guiar la mirada del usuario

---

## ❌ Errores comunes

* Diseño desordenado
* Elementos muy juntos
* Pantallas saturadas

---

## 💡 Ejemplo

✔ Diseño limpio
❌ Todo junto sin espacio

---

# 🧠 **Regla de oro del diseño**

👉 Para empezar bien:

* 🎨 Máximo 3 colores
* 🔤 Máximo 2 tipografías
* ⬜ Usar espacios

---

# ⚠️ **Errores comunes en diseño gráfico**

* Demasiados colores
* Muchas tipografías
* Mala legibilidad
* Falta de orden
* No pensar en el usuario

---

# 🧠 **Analogía para entender el diseño**

👉 Diseñar es como organizar una habitación:

* Color → decoración
* Tipografía → carteles
* Layout → ubicación de muebles

---

# 🚀 **Conclusión**

El diseño gráfico en la web no es solo estética.

👉 Es lograr:

* Claridad
* Orden
* Buena experiencia

---

# ❓ **Preguntas para pensar**

* ¿Por qué es importante el contraste?
* ¿Qué colores usarías para una app educativa?
* ¿Qué errores ves en páginas que usás?

---
---
---
---
---

# 🎨 **Actividad Práctica N°2: Diseño Visual Web**

## 🧩 Colores + Tipografía + Layout

---

## 🎯 **Objetivo**

En esta actividad vas a:

* Aplicar correctamente **colores (HEX / RGB)**
* Seleccionar y combinar **tipografías**
* Diseñar un **layout ordenado**
* Crear un diseño visual pensado para el usuario

---

## 👥 **Modalidad**

* Trabajo **individual** (o en pareja si el docente lo indica)
* Actividad **práctica y creativa**
* Se puede realizar en:

  * Papel ✏️
  * Canva
  * Figma

---

## 🧠 **Consigna general**

Vas a diseñar la **interfaz de una página web simple**, aplicando los principios de diseño vistos en clase.

👉 Puede ser:

* Página personal
* Página de una app
* Página de un negocio
* Página educativa

---

# 📋 **Desarrollo de la Actividad**

---

## 🔹 **Parte 1: Paleta de colores 🎨**

1. Elegir **3 colores principales**
2. Indicar sus códigos en:

* Formato HEX
* Formato RGB

📌 Ejemplo:

* Azul → #0000FF → rgb(0,0,255)

---

### ✍️ Responder:

* ¿Por qué elegiste esos colores?
* ¿Qué sensación transmiten?

---

## 🔹 **Parte 2: Tipografía 🔤**

1. Elegir:

* 1 fuente para títulos
* 1 fuente para texto

👉 Usar Google Fonts o similar

---

### ✍️ Responder:

* ¿Por qué elegiste esas fuentes?
* ¿Cuál se usa para títulos y cuál para texto?

---

## 🔹 **Parte 3: Diseño del Layout 📐**

Diseñar un esquema (wireframe visual simple) de la página:

Debe incluir:

* Header (encabezado)
* Menú de navegación
* Contenido principal
* Imagen o sección destacada
* Footer (pie de página)

---

📌 Puede ser:

* Dibujo en hoja
* Diseño en Canva/Figma

---

## 🔹 **Parte 4: Aplicación del Diseño 🧩**

En el diseño creado, indicar:

* Dónde se aplican los colores
* Dónde se usa cada tipografía
* Cómo organizaste los elementos

---

## 🔹 **Parte 5: Reflexión 🧠**

Responder:

* ¿Tu diseño es fácil de entender? ¿Por qué?
* ¿Qué parte te resultó más difícil?
* ¿Qué mejorarías?

---

# 📦 **Formato de Entrega**

Elegir una opción:

* 📄 Documento (Word o PDF con imágenes)
* 🎞️ Presentación (Canva / PowerPoint)
* 📸 Foto del diseño en papel + explicación

---

# 📊 **Criterios de Evaluación**

* Uso correcto del color (HEX/RGB)
* Elección de tipografía
* Organización del layout
* Claridad del diseño
* Creatividad
* Justificación de decisiones

---

# ⚠️ **Importante**

* No usar más de **3 colores principales**
* No usar más de **2 tipografías**
* Mantener orden y espacios
* Pensar siempre en el usuario

---

# 💡 **Consejo**

👉 Antes de diseñar, pensá:

* ¿Quién va a usar esta página?
* ¿Qué quiero que vea primero?

---

# 🚀 **Desafío Extra (opcional)**

Agregar:

* Versión mobile (cómo se vería en celular)
* Botones o secciones interactivas

---
