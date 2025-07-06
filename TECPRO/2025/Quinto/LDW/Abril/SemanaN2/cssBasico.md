# Introducción a CSS3

CSS3 es la versión más moderna de CSS (Cascading Style Sheets) y se utiliza para dar estilo y formato a las páginas web. Dos conceptos fundamentales en CSS3 son:

- **Los selectores:** permiten seleccionar elementos HTML para aplicarles estilos específicos.
- **El Box Model:** es el modelo que define cómo se disponen y se representan visualmente los elementos en una página.

---

## 2. Selectores en CSS

Los selectores son patrones que se utilizan para "seleccionar" los elementos HTML a los que se aplicarán las reglas de estilo. Se pueden clasificar en varios tipos:

### a) Selector de Elemento
Selecciona todos los elementos de un determinado tipo.  
**Ejemplo:**  
```css
p {
  color: blue;
}
```
Este selector aplica el color azul a todos los párrafos `<p>`.

### b) Selector de Clase
Selecciona los elementos que tienen asignada una clase específica. Las clases se definen en el HTML con el atributo `class` y en CSS se preceden con un punto `.`.  
**Ejemplo HTML:**  
```html
<div class="destacado">Contenido importante</div>
```
**Ejemplo CSS:**  
```css
.destacado {
  background-color: yellow;
}
```
Este selector aplica un fondo amarillo a todos los elementos que tengan la clase `destacado`.

### c) Selector de ID
Selecciona un elemento único en la página que tenga asignado un identificador único. Los IDs se definen en el HTML con el atributo `id` y en CSS se preceden con una almohadilla `#`.  
**Ejemplo HTML:**  
```html
<div id="principal">Contenido principal</div>
```
**Ejemplo CSS:**  
```css
#principal {
  font-size: 18px;
}
```
Este selector aplica un tamaño de fuente de 18 píxeles solo al elemento con el ID `principal`.

*Nota:*  
- Los **selectores de clase** pueden aplicarse a múltiples elementos, mientras que los **selectores de ID** deben ser únicos en una misma página.
- Se pueden combinar selectores para aplicar estilos de manera más específica, por ejemplo, `div.destacado` selecciona únicamente los `<div>` que tienen la clase `destacado`.

---

## 3. El Box Model en CSS

El **Box Model** es un concepto fundamental que explica cómo se representa cada elemento en la página web. Cada elemento se entiende como una caja compuesta de las siguientes partes:

### a) Contenido (Content)
Es el área donde se muestra el contenido real (texto, imágenes, etc.).  
- **Propiedades relacionadas:** `width`, `height`.

### b) Relleno (Padding)
Es el espacio interno que se crea entre el contenido y el borde.  
- **Propiedades relacionadas:** `padding-top`, `padding-right`, `padding-bottom`, `padding-left` o simplemente `padding`.

### c) Borde (Border)
Es la línea que envuelve al contenido y al relleno.  
- **Propiedades relacionadas:** `border-width`, `border-style`, `border-color`.

### d) Margen (Margin)
Es el espacio externo que separa el elemento de otros elementos adyacentes.  
- **Propiedades relacionadas:** `margin-top`, `margin-right`, `margin-bottom`, `margin-left` o simplemente `margin`.

### Representación Visual del Box Model

![boxModel](box_model.png)

*Importancia:*  
Conocer el Box Model es esencial para controlar el espacio y la disposición de los elementos en el diseño de la página web, ya que cualquier cambio en el padding, border o margin puede afectar el layout global.

---

## 4. Ejemplo Básico: Clase ".contenedor"

El siguiente ejemplo de código CSS muestra cómo aplicar estilos a un elemento utilizando una clase y cómo se integran propiedades del Box Model:

```css
.contenedor {
  width: 80%;
  padding: 20px;
  margin: auto;
  border: 1px solid #ccc;
}
```

### Análisis del Ejemplo

- **Selector:**  
  Se usa la clase `.contenedor` para seleccionar el elemento o elementos HTML que tengan `class="contenedor"`.

- **width: 80%;**  
  Define que el ancho del elemento será el 80% respecto al contenedor padre. Esto permite que el elemento sea responsivo.

- **padding: 20px;**  
  Crea un espacio interno de 20 píxeles entre el contenido del elemento y su borde.  
  *En el Box Model, este es el relleno que asegura que el contenido no esté pegado al borde.*

- **margin: auto;**  
  Centra horizontalmente el elemento dentro de su contenedor. Esto es especialmente útil cuando se tiene un ancho definido (en este caso, el 80%).

- **border: 1px solid #ccc;**  
  Define un borde de 1 píxel, de estilo sólido y de color gris claro (#ccc) alrededor del elemento.  
  *Este borde se sitúa entre el padding y el margen en el Box Model.*

### Uso Práctico en HTML

Para ver el efecto de este CSS, se puede aplicar en un documento HTML como el siguiente:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejemplo de Contenedor</title>
  <style>
    .contenedor {
      width: 80%;
      padding: 20px;
      margin: auto;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <div class="contenedor">
    <h1>Bienvenido a CSS3</h1>
    <p>Este es un ejemplo práctico que demuestra cómo se utiliza el Box Model y los selectores de CSS.</p>
  </div>
</body>
</html>
```

En este ejemplo, el `<div>` con la clase `contenedor` se estiliza aplicando las propiedades descritas, lo que genera un bloque centrado con un espacio interno (padding) y un borde definido.

---

## 5. Conclusión

- **Selectores:** Permiten seleccionar elementos HTML de diversas maneras (por tipo, clase o ID) para aplicar estilos específicos.
- **Box Model:** Es esencial para comprender cómo se estructura visualmente cada elemento en una página, abarcando el contenido, el padding, el borde y el margen.
- **Ejemplo práctico:** La clase `.contenedor` muestra cómo combinar estas propiedades para crear un layout centrado y estéticamente agradable.