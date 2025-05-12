### 1.1 Pregunta inicial

> **¿Qué es el DOM y cómo interactuamos con él para modificar el contenido de una página web?**

* El **DOM** es una representación en memoria de la estructura de un documento HTML o XML como un árbol de nodos, donde cada elemento, atributo y texto es un objeto manipulable desde JavaScript.
* Interactuamos con él usando la API del navegador para **seleccionar** nodos y **ejecutar** operaciones de lectura o escritura en ellos.

### 1.2 Relevancia

* Permite crear interfaces dinámicas y reactivas sin recargar la página.
* Es la base de frameworks modernos (React, Vue, Angular) que abstraen estas operaciones.

---

## 2. Desarrollo (80 minutos)

### 2.1 Selección de Elementos (25 min)

#### Teoría

* `document.getElementById(id)`: devuelve el elemento cuyo atributo `id` coincide exactamente; es muy rápida y ampliamente soportada ([MDN Web Docs][3]).
* `document.querySelector(selector)`: devuelve el primer elemento que cumple la regla CSS indicada; permite selectores complejos ([MDN Web Docs][4]).
* `document.querySelectorAll(selector)`: devuelve una **NodeList** con todos los elementos que coinciden; para iterar usa `forEach` o convierte a array ([MDN Web Docs][10]).

#### Ejemplo de código

```html
<div id="app">
  <ul class="lista">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
  <button class="btn-accion">Haz clic</button>
</div>
<script>
  const app = document.getElementById('app');
  const primerLi = document.querySelector('.lista li');
  const todosLosLi = document.querySelectorAll('.lista li');
  const boton = document.querySelector('.btn-accion');
</script>
```

#### Ejercicio guiado (10 min)

1. Seleccionar el `<ul>` por `class`.
2. Mostrar en consola el texto de cada `<li>`.
3. Comentar diferencias de rendimiento entre métodos.

---

### 2.2 Manipulación del DOM (30 min)

#### Creación y adición

* **`document.createElement(tag)`** crea un nodo vacío del tipo indicado ([MDN Web Docs][5]).
* **`parent.appendChild(node)`** añade el nodo al final de `parent`.
* **`parent.insertBefore(node, referenceNode)`** inserta antes de `referenceNode`.

#### Eliminación

* **`parent.removeChild(child)`** elimina y devuelve el nodo eliminado ([MDN Web Docs][6]).
* **`node.remove()`** (alternativa moderna).

#### Atributos, clases y estilos

* **`element.setAttribute(name, value)`** añade o actualiza atributos HTML ([MDN Web Docs][11]).
* **`element.classList.add/remove/toggle()`** gestiona clases de forma cómoda ([MDN Web Docs][12]).
* **`element.style.prop = 'valor'`** modifica estilos en línea.

#### Ejemplo de código

```js
// Crear y añadir
const nuevoLi = document.createElement('li');
nuevoLi.textContent = 'Item 3';
document.querySelector('.lista').appendChild(nuevoLi);

// Eliminar
const liAEliminar = document.querySelector('.lista li:first-child');
liAEliminar.parentNode.removeChild(liAEliminar);

// Atributos y clases
nuevoLi.setAttribute('data-index', '3');
nuevoLi.classList.add('destacado');
nuevoLi.style.color = 'blue';
```

---

### 2.3 Ejemplos Prácticos en Vivo (15 min)

#### Ejemplo 1: Lista dinámica

1. Botón “Añadir item”: al pulsar crea un `<li>` y lo añade con `appendChild`.
2. Botón “Eliminar último”: elimina el último `<li>`.

#### Ejemplo 2: Galería de imágenes

* Cambiar `src` y `alt` de un `<img>` en respuesta a un evento `click` en miniaturas.

---

### 2.4 Buenas Prácticas y Rendimiento (10 min)

* **Organización del código**: encapsular lógica de DOM en funciones, evitar código inline en HTML.
* **Uso de `DocumentFragment`**: para agrupar múltiples inserciones y reducir reflows .
* **Minimizar tamaño del DOM inicial**: generar elementos solo cuando sean necesarios .
* **Cachear selectores**: almacenar referencias a nodos en variables si se reutilizan varias veces.
* **Evitar loops costosos**: no usar selectores complejos dentro de iteraciones.

---

## 3. Cierre (10 minutos)

* Recapitular comandos de **selección** (`getElementById`, `querySelector[All]`) y de **manipulación** (`createElement`, `removeChild`, `setAttribute`, `classList`, `style`).
* Subrayar la importancia de escribir código limpio y eficiente.
* Espacio abierto para **dudas** y comentarios finales.

---

## 4. Actividad Práctica (30 minutos)

**Nombre**: Manipulación Dinámica del DOM

* Los estudiantes, por parejas o individual, implementarán una pequeña aplicación web que permita:

  1. **Crear** nuevos cards de producto con imagen, título y descripción.
  2. **Editar** el título y la descripción existentes directamente sobre el card (inline editing).
  3. **Eliminar** cards mediante un botón “X” en cada uno.
* Deben documentar brevemente en un archivo `README.md` las funciones de JS empleadas y cómo afectan al DOM.
* Al final, cada grupo presentará su solución y explicará al resto las técnicas usadas.

---
