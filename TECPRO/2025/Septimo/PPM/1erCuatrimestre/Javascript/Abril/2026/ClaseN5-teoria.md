# 📘 Clase 5: Estructuras de datos en JavaScript

## 🎯 Objetivo

* Comprender qué son las **estructuras de datos**
* Conocer las principales en JavaScript
* Aprender a organizar y manipular información

---

# 🧠 ¿Qué es una estructura de datos?

Una **estructura de datos** es una forma de **organizar y almacenar información** para poder usarla de manera eficiente.

👉 Hasta ahora vimos variables simples:

```js
let nombre = "Juan";
```

Pero… ¿qué pasa si queremos guardar **muchos datos juntos**?
Ahí entran las estructuras de datos.

---

# 🧩 Tipos principales de estructuras en JavaScript

---

## 📦 1. Arrays (Arreglos / Listas)

Permiten guardar **varios valores en una sola variable**.

```js
let frutas = ["manzana", "banana", "naranja"];
```

### 🔍 Acceder a elementos

```js
console.log(frutas[0]); // manzana
```

👉 Los índices comienzan en **0**

---

### ➕ Agregar elementos

```js
frutas.push("pera");
```

---

### ❌ Eliminar elementos

```js
frutas.pop(); // elimina el último
```

---

## 🧱 2. Objetos (Objects)

Permiten guardar información en formato **clave → valor**

```js
let persona = {
  nombre: "Ana",
  edad: 25,
  ciudad: "Necochea"
};
```

---

### 🔍 Acceder a propiedades

```js
console.log(persona.nombre);
console.log(persona["edad"]);
```

---

### ✏️ Modificar valores

```js
persona.edad = 26;
```

---

## 🔗 3. Arrays de objetos (muy importante)

Combinan ambas estructuras:

```js
let alumnos = [
  { nombre: "Juan", nota: 8 },
  { nombre: "Ana", nota: 9 }
];
```

👉 Acceso:

```js
console.log(alumnos[0].nombre); // Juan
```

---

# 🔁 Recorrer estructuras de datos

---

## 🔄 Recorrer un array

```js
let numeros = [1, 2, 3];

for (let i = 0; i < numeros.length; i++) {
  console.log(numeros[i]);
}
```

---

## 🔄 Recorrer un array de objetos

```js
let alumnos = [
  { nombre: "Juan", nota: 8 },
  { nombre: "Ana", nota: 9 }
];

for (let i = 0; i < alumnos.length; i++) {
  console.log(alumnos[i].nombre);
}
```

---

# 💡 ¿Para qué sirven en la vida real?

Las estructuras de datos se usan en:

* 📋 Listas de usuarios
* 🛒 Carritos de compras
* 📊 Datos de aplicaciones
* 🎮 Juegos (inventarios, personajes)

---

# ⚠️ Errores comunes

* Olvidar que los arrays empiezan en índice **0**
* Intentar acceder a posiciones inexistentes
* Confundir objetos con arrays

---

# 🚀 Conclusión

* Los **arrays** permiten guardar listas
* Los **objetos** organizan datos con propiedades
* Juntos permiten modelar información del mundo real

👉 Son fundamentales para cualquier aplicación web.

---

# 🧑‍🏫 Actividad breve sugerida

💡 Analizar:

```js
let productos = [
  { nombre: "Mouse", precio: 1500 },
  { nombre: "Teclado", precio: 3000 }
];

console.log(productos[1].nombre);
```

👉 Pregunta:

* ¿Qué muestra en pantalla?
* ¿Por qué?

---