# Consumo de APIs REST con JavaScript

## Unidad articulada con PWD: JavaScript, AJAX y APIs

---

# 🎯 Objetivos de Aprendizaje

* Comprender qué es una API REST
* Realizar peticiones HTTP desde JavaScript
* Consumir datos externos con `fetch()`
* Procesar respuestas JSON
* Mostrar información dinámica en el DOM
* Manejar errores y estados de carga
* Integrar APIs reales en proyectos propios

---
# ¿Qué es una API?

API significa:

**Application Programming Interface**

Es un intermediario que permite que dos sistemas se comuniquen.

Ejemplo cotidiano:

* Una app del clima
* Una app bancaria
* Una app de mapas

Todas consumen información desde APIs.

---

## Ejemplo real

Cuando abrís una app del clima:

1. La app envía una solicitud
2. Un servidor responde
3. La app muestra los datos

JavaScript hace exactamente eso.

---

# ¿Qué es una API REST?

REST es un estilo de arquitectura para intercambiar datos.

Utiliza HTTP.

## Métodos principales

### GET

Obtener datos

```http id="0jpc74"
GET /usuarios
```

---

### POST

Enviar datos

```http id="8f6p4y"
POST /usuarios
```

---

### PUT

Actualizar

---

### DELETE

Eliminar

---

# ¿Qué formato devuelve una API?

Generalmente devuelve:

## JSON

(JavaScript Object Notation)

Ejemplo:

```json id="n5r7ry"
{
  "nombre": "Ana",
  "edad": 22,
  "ciudad": "Necochea"
}
```

En JavaScript se transforma automáticamente en objeto.

---

# La función fetch()

Es la forma moderna de consumir APIs.

Sintaxis básica:

```js id="m8k6dv"
fetch("URL")
  .then(respuesta => respuesta.json())
  .then(datos => {
    console.log(datos);
  });
```

---

## ¿Qué ocurre internamente?

### Paso 1

Se hace la petición

### Paso 2

El servidor responde

### Paso 3

Convertimos a JSON

### Paso 4

Usamos los datos

---

# Ejemplo

Usaremos:

JSONPlaceholder

API pública gratuita para pruebas.

---

## Obtener usuarios

```js id="0n88fg"
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
```

---

## Analizando la respuesta

Cada usuario contiene:

* name
* email
* phone
* website
* address

---

# Mostrar datos en pantalla

## HTML

```html id="9zdrb8"
<button id="cargar">Cargar usuarios</button>
<ul id="lista"></ul>
```

---

## JavaScript

```js id="c68c4h"
const boton = document.getElementById("cargar");
const lista = document.getElementById("lista");

boton.addEventListener("click", () => {

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(usuarios => {

      lista.innerHTML = "";

      usuarios.forEach(usuario => {
        const li = document.createElement("li");
        li.textContent = usuario.name;
        lista.appendChild(li);
      });

    });

});
```

---

# Manejo de errores

Toda API puede fallar.

Buenas prácticas:

```js id="x7v5u7"
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => {
    if(!res.ok){
      throw new Error("Error en la petición");
    }
    return res.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log(error));
```

---

# Indicador de carga

UX profesional.

```js id="7qut0u"
lista.innerHTML = "<p>Cargando...</p>";
```

---

# async / await

Forma moderna y clara.

```js id="mfw0z5"
async function cargarUsuarios(){

  try{
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    console.log(data);

  }catch(error){
    console.log(error);
  }

}
```

---
