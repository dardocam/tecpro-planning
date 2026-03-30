# 📘 Clase Especial N1: Debugging en JavaScript

## 🎯 Objetivo

* Comprender qué es un **error (bug)**
* Aprender a **detectar y corregir errores**
* Utilizar herramientas básicas de debugging

---

# 🧠 ¿Qué es debugging?

El **debugging** es el proceso de:
👉 **encontrar, entender y corregir errores** en un programa.

💡 Un error (bug) puede hacer que:

* El programa no funcione
* Dé resultados incorrectos
* Se rompa completamente

---

# 🐞 Tipos de errores

---

## ❌ 1. Errores de sintaxis

Código mal escrito:

```js
let nombre = "Juan
```

👉 Falta cerrar comillas → el programa no corre

---

## ⚠️ 2. Errores lógicos

El código funciona, pero da mal resultado:

```js
let resultado = 10 - 5; // quería sumar
```

---

## 💥 3. Errores de ejecución

Ocurren mientras corre el programa:

```js
console.log(variableNoDefinida);
```

---

# 🛠️ Herramientas de debugging

---

## 🧾 1. console.log()

La herramienta más básica y poderosa:

```js
let nombre = "Ana";
console.log(nombre);
```

👉 Permite ver valores en la consola del navegador

---

## 🔍 2. Inspeccionar (DevTools)

En el navegador:

* Click derecho → **Inspeccionar**
* Ir a la pestaña **Console**

👉 Permite ver errores y mensajes

---

## ⛔ 3. breakpoints (nivel inicial)

Se pueden pausar líneas de código para analizar paso a paso.

👉 (opcional para esta clase, pero podés mencionarlo)

---

# 🧩 Actividad Práctica: “Detectives de errores” 🕵️‍♂️

## 🎯 Objetivo

Encontrar y corregir errores en distintos ejemplos.

---

## 🧪 Parte 1: Error de sintaxis

```js
function saludar() {
  alert("Hola mundo);
}
```

👉 Consigna:

* Ejecutar el código
* Detectar el error
* Corregirlo

💡 Pista: mirar la consola

---

## 🧪 Parte 2: Error lógico

```js
function calcular() {
  let numero1 = 10;
  let numero2 = 5;

  let resultado = numero1 - numero2;

  console.log("Resultado:", resultado);
}
```

👉 Consigna:

* ¿Qué debería hacer?
* ¿Qué está haciendo realmente?
* Corregirlo

---

## 🧪 Parte 3: Variable incorrecta

```js
function mostrarNombre() {
  let nombre = "Juan";
  console.log(nombres);
}
```

👉 Consigna:

* Ejecutar
* Leer el error en consola
* Explicar qué pasó

---

## 🧪 Parte 4: DOM con error

```html
<p id="texto">Hola</p>
<button onclick="cambiar()">Cambiar</button>

<script>
function cambiar() {
  document.getElementById("txt").innerText = "Nuevo texto";
}
</script>
```

👉 Consigna:

* Hacer clic
* ¿Por qué no funciona?
* Corregir

---

## 🧪 Parte 5: Debug con console.log

```js
function suma(a, b) {
  let resultado = a + b;
}

let total = suma(2, 3);
console.log(total);
```

👉 Consigna:

* Agregar `console.log` para investigar
* ¿Por qué da `undefined`?
* Solucionar

---

# 🚀 Parte 6: Desafío final

💡 Consigna:

El siguiente código tiene **varios errores**. Encontrarlos y corregirlos.

```js
let tareas = []

function agregarTarea() {
  let input = document.getElementById("tareaInput")
  let texto = input.value

  if (texto = "") {
    alert("Escribe algo")
  }

  tareas.push(texto)

  mostrarTarea()
}

function mostrarTareas() {
  let lista = document.getElementById("lista")
  lista.innerHTML = ""

  for (let i = 0; i <= tareas.length; i++) {
    let item = document.createElement("li")
    item.innerText = tareas[i]

    lista.appendChild(item)
  }
}
```

👉 Pistas:

* Comparación incorrecta
* Nombre de función
* Error en el `for`

---

# 🧩 Reflexión final

Responder:

1. ¿Qué herramienta usaste más?
2. ¿Qué tipo de error fue más difícil?
3. ¿Por qué es importante leer la consola?
4. ¿Qué aprendiste sobre tus propios errores?

---

# 🏁 Conclusión

* Los errores son parte normal de programar
* Saber **encontrarlos es más importante que evitarlos**
* `console.log()` y la consola son tus mejores aliados

---
