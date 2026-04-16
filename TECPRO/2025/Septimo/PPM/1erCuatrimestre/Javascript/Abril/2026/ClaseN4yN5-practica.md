# 🧪💻 Trabajo Práctico Integrador

## 🎯 “Gestor de Lista Interactiva con JavaScript”

## 🎯 Objetivos del TP

Los estudiantes deberán:

* Usar **arrays y objetos** para almacenar datos
* Manipular el **DOM** para mostrar información
* Implementar **eventos** (click)
* Crear, mostrar y eliminar elementos dinámicamente

---

# 🧩 Descripción del Proyecto

Se desarrollará una aplicación web que permita gestionar una lista de elementos (puede ser):

👉 📚 Libros
👉 🛒 Productos
👉 🎓 Alumnos

💡 Recomendado: **Lista de productos**

Cada producto tendrá:

```js
{
  nombre: "Producto",
  precio: 1000
}
```

---

# 🏗️ Parte 1: Estructura HTML

Los estudiantes deben crear:

```html
<h1>Lista de Productos</h1>

<input type="text" id="nombre" placeholder="Nombre del producto">
<input type="number" id="precio" placeholder="Precio">

<button id="agregar">Agregar</button>

<ul id="lista"></ul>
```

---

# ⚙️ Parte 2: Lógica en JavaScript

---

## 🧠 1. Crear estructura de datos

```js
let productos = [];
```

---

## ➕ 2. Agregar productos (evento + array)

```js
let boton = document.getElementById("agregar");

boton.addEventListener("click", function() {
  let nombre = document.getElementById("nombre").value;
  let precio = document.getElementById("precio").value;

  let producto = {
    nombre: nombre,
    precio: precio
  };

  productos.push(producto);

  mostrarProductos();
});
```

---

## 🔄 3. Mostrar productos en pantalla (DOM + recorrido)

```js
function mostrarProductos() {
  let lista = document.getElementById("lista");

  lista.innerHTML = "";

  for (let i = 0; i < productos.length; i++) {
    let item = document.createElement("li");

    item.innerText = productos[i].nombre + " - $" + productos[i].precio;

    lista.appendChild(item);
  }
}
```

---

## ❌ 4. (Nivel medio) Eliminar productos

👉 Agregar botón dentro de cada elemento:

```js
let botonEliminar = document.createElement("button");
botonEliminar.innerText = "Eliminar";

botonEliminar.addEventListener("click", function() {
  productos.splice(i, 1);
  mostrarProductos();
});

item.appendChild(botonEliminar);
```

---

# 🎨 Parte 3: Mejora visual (opcional)

* Cambiar colores con `.style`
* Resaltar productos caros
* Agregar títulos dinámicos

---

# 🧠 Conceptos que se integran

| Concepto      | Aplicación          |
| ------------- | ------------------- |
| Array         | Lista de productos  |
| Objetos       | Cada producto       |
| For           | Recorrer datos      |
| DOM           | Mostrar en pantalla |
| Eventos       | Click en botones    |
| createElement | Crear elementos     |
| innerHTML     | Limpiar lista       |

---

# 🧑‍🏫 Consignas para los estudiantes

### ✅ Nivel básico

* Agregar productos a la lista
* Mostrar productos en pantalla

---

### ⚙️ Nivel medio

* Permitir eliminar productos
* Validar que los campos no estén vacíos

---

### 🚀 Nivel avanzado

* Mostrar total de precios
* Ordenar productos por precio
* Cambiar color si el precio supera cierto valor

---

# ❓ Preguntas de reflexión

* ¿Dónde se almacenan los datos?
* ¿Qué función cumple el array?
* ¿Qué hace `createElement`?
* ¿Por qué es necesario recorrer el array?

---

# 🧪 Desafío final

👉 Modificar el proyecto para que:

* En lugar de productos, sea una **lista de alumnos con notas**
* Mostrar si el alumno está:

  * ✅ Aprobado (nota ≥ 6)
  * ❌ Desaprobado

---

# 🏁 Cierre pedagógico

Este TP conecta dos pilares fundamentales:

* 🧠 **Estructuras de datos → organizan la información**
* 🌐 **DOM → muestra e interactúa con el usuario**

👉 Juntos permiten construir aplicaciones reales.

---
