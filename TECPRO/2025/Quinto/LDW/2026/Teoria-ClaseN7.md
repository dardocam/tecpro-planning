# CSS Box Model (Modelo de Caja)

## Objetivos de la clase

Al finalizar esta clase, el estudiante será capaz de:

* Comprender cómo el navegador representa cada elemento HTML.
* Identificar las partes que componen una caja CSS.
* Diferenciar contenido, padding, border y margin.
* Calcular el tamaño real que ocupa un elemento.
* Aplicar correctamente espaciados internos y externos.
* Utilizar herramientas del navegador para inspeccionar cajas.

---

# 1. Introducción

En CSS, todos los elementos HTML son tratados como cajas rectangulares.

Cuando agregamos un `<div>`, un `<p>`, una imagen o un botón, el navegador crea una caja para ese elemento.

Por ejemplo:

```html
<div>Hola Mundo</div>
```

Visualmente podría verse como:

```
+------------------+
|   Hola Mundo     |
+------------------+
```

Todo lo que aparece en una página web está construido mediante cajas.

Por esta razón, uno de los conceptos más importantes de CSS es el **Box Model**.

---

# 2. ¿Qué es el Box Model?

El Box Model define cómo se calcula el tamaño y el espacio ocupado por un elemento HTML.

Cada elemento posee cuatro áreas principales:

```
+-----------------------+
|        Margin         |
|  +-----------------+  |
|  |     Border      |  |
|  | +-------------+ |  |
|  | |   Padding   | |  |
|  | | +---------+ | |  |
|  | | |Content  | | |  |
|  | | +---------+ | |  |
|  | +-------------+ |  |
|  +-----------------+  |
+-----------------------+
```

Estas áreas son:

1. Content
2. Padding
3. Border
4. Margin

---

# 3. Content (Contenido)

Es la zona donde aparece el contenido del elemento.

Puede contener:

* Texto
* Imágenes
* Formularios
* Videos
* Otros elementos HTML

Ejemplo:

```html
<div class="caja">
    Contenido
</div>
```

```css
.caja{
    width:200px;
    height:100px;
}
```

Resultado:

```
+--------------------+
|                    |
|     Contenido      |
|                    |
+--------------------+
```

El contenido tiene:

```css
width
height
```

---

# 4. Padding (Relleno)

Es el espacio interno entre el contenido y el borde.

Sin padding:

```
+------------------+
|Contenido         |
+------------------+
```

Con padding:

```
+------------------+
|                  |
|   Contenido      |
|                  |
+------------------+
```

CSS:

```css
.caja{
    padding:20px;
}
```

---

## Padding individual

```css
padding-top:20px;
padding-right:10px;
padding-bottom:20px;
padding-left:10px;
```

---

## Forma abreviada

### Un valor

```css
padding:20px;
```

Todos los lados iguales.

---

### Dos valores

```css
padding:20px 10px;
```

```
20px arriba y abajo
10px izquierda y derecha
```

---

### Cuatro valores

```css
padding:10px 20px 30px 40px;
```

Orden:

```
arriba
derecha
abajo
izquierda
```

Recordatorio:

```
TRBL

Top
Right
Bottom
Left
```

---

# 5. Border (Borde)

Es la línea que rodea al padding y al contenido.

Ejemplo:

```css
.caja{
    border:3px solid black;
}
```

Resultado:

```
+------------------+
|    Contenido     |
+------------------+
```

---

## Propiedades del borde

### Grosor

```css
border-width:5px;
```

### Estilo

```css
border-style:solid;
```

Tipos:

```css
solid
dashed
dotted
double
groove
ridge
```

---

### Color

```css
border-color:red;
```

---

### Forma abreviada

```css
border:5px solid red;
```

---

# 6. Margin (Margen)

Es el espacio exterior.

Sirve para separar elementos.

Ejemplo:

```css
.caja{
    margin:20px;
}
```

Visualmente:

```
Caja 1

<---20px--->

Caja 2
```

---

## Margen individual

```css
margin-top:20px;
margin-right:10px;
margin-bottom:20px;
margin-left:10px;
```

---

## Forma abreviada

```css
margin:20px;
```

o

```css
margin:20px 10px;
```

o

```css
margin:10px 20px 30px 40px;
```

---

# 7. Ejemplo Completo

HTML

```html
<div class="caja">
    CSS Box Model
</div>
```

CSS

```css
.caja{
    width:200px;
    height:100px;

    padding:20px;

    border:5px solid blue;

    margin:30px;

    background:lightblue;
}
```

Representación:

```
Margin
┌─────────────────────┐
│      Border         │
│ ┌───────────────┐   │
│ │    Padding    │   │
│ │ ┌───────────┐ │   │
│ │ │ Content   │ │   │
│ │ └───────────┘ │   │
│ └───────────────┘   │
└─────────────────────┘
```

---

# 8. Cálculo del tamaño real

Supongamos:

```css
.caja{
    width:200px;

    padding:20px;

    border:5px solid;

    margin:10px;
}
```

El ancho visible será:

```
200
+20
+20
+5
+5
-----
250px
```

Si consideramos márgenes:

```
250
+10
+10
-----
270px
```

---

## Fórmula

```
Ancho total =
width
+ padding izquierdo
+ padding derecho
+ border izquierdo
+ border derecho
+ margin izquierdo
+ margin derecho
```

---

# 9. Problema común

Muchos principiantes escriben:

```css
.caja{
    width:300px;
    padding:20px;
}
```

Esperan:

```
300px
```

Pero obtienen:

```
340px
```

Porque:

```
300 + 20 + 20
```

---

# 10. box-sizing

Para resolver este problema existe:

```css
box-sizing:border-box;
```

Ejemplo:

```css
.caja{
    width:300px;
    padding:20px;

    box-sizing:border-box;
}
```

Ahora:

```
Ancho total = 300px
```

El padding se descuenta del contenido.

---

## Configuración profesional

Actualmente casi todos los proyectos comienzan con:

```css
*{
    box-sizing:border-box;
}
```

Esto hace que todos los elementos calculen su tamaño de manera más intuitiva.

---

# 11. Inspeccionando el Box Model

Abrir:

```
F12
```

o

```
Click derecho → Inspeccionar
```

En Chrome o Firefox se puede visualizar:

```
Margin
Border
Padding
Content
```

con colores diferentes:

* Naranja → Margin
* Amarillo → Border
* Verde → Padding
* Azul → Content

---

# Actividad Práctica 1

Crear una caja de:

* Ancho: 300px
* Alto: 150px
* Padding: 20px
* Borde: 3px negro
* Margen: 30px

---

# Actividad Práctica 2

Construir tres cajas separadas utilizando únicamente:

```css
margin
padding
border
```

Ejemplo:

```
+--------+
| Caja 1 |
+--------+

+--------+
| Caja 2 |
+--------+

+--------+
| Caja 3 |
+--------+
```

---

# Actividad Práctica 3

Recrear la siguiente estructura:

```
┌──────────────────────────┐
│          Header          │
└──────────────────────────┘

┌────────┐  ┌─────────────┐
│ Menu   │  │  Contenido  │
└────────┘  └─────────────┘

┌──────────────────────────┐
│          Footer          │
└──────────────────────────┘
```

Utilizando únicamente:

* width
* height
* margin
* padding
* border

---

# Resumen

Todo elemento HTML está formado por:

```
Margin
 └── Border
      └── Padding
           └── Content
```

Propiedades fundamentales:

```css
width
height

padding

border

margin

box-sizing:border-box;
```

Dominar el **Box Model** es la base para comprender posteriormente temas más avanzados como posicionamiento, Flexbox, CSS Grid, diseño responsive y layouts profesionales.
