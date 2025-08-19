# 📖 Contenido Teórico: *Flexbox, Grid y Diseño Responsivo*

## 1. ¿Qué es un diseño responsivo?

El **diseño responsivo** consiste en crear páginas web que se adapten automáticamente al tamaño de la pantalla del dispositivo (computadora, tablet o celular).
Esto se logra con **layouts flexibles** y el uso de **media queries**, evitando que el usuario tenga que hacer zoom o desplazarse horizontalmente.

👉 Ventajas:

* Mejor experiencia de usuario.
* Una sola web funciona en múltiples dispositivos.
* Facilita el mantenimiento y escalabilidad.

---

## 2. Flexbox: alineación en una dimensión

**Flexbox (Flexible Box Layout)** es un sistema de diseño en CSS que organiza los elementos en **una fila o columna**.

📌 Propiedades clave del contenedor (`display: flex`):

* `justify-content`: alinea elementos en el eje horizontal (inicio, centro, final, espacio entre ellos).
* `align-items`: alinea elementos en el eje vertical.
* `flex-direction`: define si los elementos se ordenan en fila (`row`) o en columna (`column`).
* `gap`: agrega espacio uniforme entre elementos.

📌 Casos de uso:

* Cabeceras con logo + menú.
* Secciones de presentación con imagen y texto.

Ejemplo:

```css
.header {
  display: flex;
  justify-content: space-between; /* Logo a la izquierda, menú a la derecha */
  align-items: center;
}
```

---

## 3. CSS Grid: organización en dos dimensiones

**CSS Grid** es un sistema de diseño bidimensional que permite organizar elementos en **filas y columnas**.

📌 Propiedades clave:

* `display: grid`: activa el sistema Grid.
* `grid-template-columns`: define cuántas columnas tendrá la grilla.
* `grid-template-rows`: define las filas (opcional).
* `gap`: espacio entre filas y columnas.
* `repeat(n, 1fr)`: crea columnas flexibles iguales.

Ejemplo:

```css
.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas iguales */
  gap: 20px;
}
```

👉 Caso de uso:

* Galerías de proyectos.
* Secciones de productos o servicios.

---

## 4. Media Queries: adaptación a pantallas

Las **media queries** permiten aplicar estilos diferentes según el ancho de pantalla.

📌 Ejemplo:

```css
@media (max-width: 768px) {
  .presentacion {
    flex-direction: column; /* Imagen arriba, texto abajo */
  }
  .galeria {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en tablets */
  }
}

@media (max-width: 480px) {
  .galeria {
    grid-template-columns: 1fr; /* Una sola columna en móviles */
  }
}
```

👉 De esta forma:

* En escritorio: se ven **3 columnas** de proyectos.
* En tablets: se reducen a **2 columnas**.
* En móviles: se adapta a **1 columna**.

---

## 5. Diferencias clave entre Flexbox y Grid

| Característica | **Flexbox**                                 | **Grid**                                |
| -------------- | ------------------------------------------- | --------------------------------------- |
| Dimensión      | Una dimensión (fila **o** columna)          | Dos dimensiones (filas **y** columnas)  |
| Mejor uso      | Cabeceras, menús, bloques de texto + imagen | Galerías, dashboards, layouts complejos |
| Control        | Orden y alineación de elementos             | Estructura global del diseño            |

👉 Lo importante es **combinarlos**, ya que se complementan en un mismo sitio web.

---

## 6. Buenas prácticas en diseño responsivo

1. Usar unidades relativas (`%`, `fr`, `em`, `rem`) en lugar de solo píxeles.
2. Probar siempre en distintos dispositivos (o en el inspector del navegador).
3. Aplicar **Mobile First**: diseñar primero para pantallas pequeñas y luego ampliar.
4. Usar `minmax()` y `auto-fit` en Grid para grillas más flexibles.

   ```css
   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
   ```

---

# 🔎 Comparación: Flexbox vs Grid

## 1. Flexbox (alineación en una sola fila/columna)

El contenedor organiza los elementos en **una fila** y los alinea de forma flexible.

```html
<section class="flexbox-demo">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</section>
```

```css
.flexbox-demo {
  display: flex;
  justify-content: space-around; /* Espaciados horizontales */
  align-items: center; /* Alineados verticalmente */
  background: #e0f7fa;
  height: 150px;
}

.flexbox-demo .item {
  background: #00796b;
  color: white;
  padding: 20px;
  border-radius: 8px;
}
```

📌 **Resultado esperado (fila con flexibilidad horizontal):**

```
[  1   ]    [  2   ]    [  3   ]
```

👉 Uso típico: cabeceras con logo y menú, secciones de presentación con texto + imagen.

---

## 2. Grid (organización en filas y columnas)

El contenedor organiza los elementos en **una grilla bidimensional**.

```html
<section class="grid-demo">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</section>
```

```css
.grid-demo {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas iguales */
  gap: 10px;
  background: #f3e5f5;
  padding: 10px;
}

.grid-demo .item {
  background: #6a1b9a;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
```

📌 **Resultado esperado (rejilla con 2D controlado):**

```
[ 1 ] [ 2 ] [ 3 ]
[ 4 ] [ 5 ] [ 6 ]
```

👉 Uso típico: galerías de proyectos, dashboards, layouts de secciones.

---

## 3. Visualización rápida

| **Flexbox**                         | **Grid**                                        |
| ----------------------------------- | ----------------------------------------------- |
| 🔹 Una fila/columna flexible        | 🔹 Múltiples filas y columnas                   |
| 🔹 Ideal para **alinear elementos** | 🔹 Ideal para **estructurar layouts completos** |
| 🔹 Ej: header con logo y menú       | 🔹 Ej: galería de proyectos                     |

---
