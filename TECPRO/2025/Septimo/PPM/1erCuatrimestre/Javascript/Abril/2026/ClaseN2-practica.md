# 🧪 Actividad Práctica: “Jugando con variables y alcance”

## 🎯 Objetivo

* Usar `let`, `const` y `var`
* Comprender el alcance (global, local y de bloque)
* Detectar errores comunes

---

## 🧱 Parte 1: Configuración inicial

Crear un archivo `index.html` con este contenido:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Variables en JS</title>
</head>
<body>

  <h1>Práctica de Variables</h1>
  <button onclick="probarVariables()">Probar</button>

  <script src="script.js"></script>

</body>
</html>
```

Luego crear un archivo `script.js`.

---

## ▶️ Parte 2: Primer contacto

Agregar en `script.js`:

```js
function probarVariables() {
  let nombre = "Juan";
  const edad = 20;

  alert("Nombre: " + nombre + " - Edad: " + edad);
}
```

👉 Ejecutar y observar el resultado.

---

## 🧠 Parte 3: Modificación guiada

### ✏️ Ejercicio 1: Cambiar valores

* Cambiar el nombre por el propio
* Cambiar la edad

👉 Pregunta:
¿Se puede cambiar `edad` después? ¿Por qué?

---

### ✏️ Ejercicio 2: Error intencional

Agregar esto:

```js
function errorConst() {
  const numero = 10;
  numero = 20;
}
```

👉 Ejecutar la función desde consola.

💡 Pregunta:
¿Qué error aparece? ¿Por qué ocurre?

---

## 🔍 Parte 4: Alcance de variables

### ✏️ Ejercicio 3: Alcance de bloque

```js
function alcanceBloque() {
  if (true) {
    let mensaje = "Hola desde el bloque";
    console.log(mensaje);
  }

  console.log(mensaje);
}
```

👉 Ejecutar y observar.

💡 Pregunta:
¿Por qué falla?

---

### ✏️ Ejercicio 4: Comparación con `var`

```js
function alcanceVar() {
  if (true) {
    var saludo = "Hola con var";
  }

  console.log(saludo);
}
```

👉 Ejecutar.

💡 Pregunta:
¿Por qué este sí funciona?

---

## 🚀 Parte 5: Desafío integrador

💡 Consigna:

Crear una función que:

1. Pida el nombre del usuario (`prompt`)
2. Declare:

   * Una variable `let` para el nombre
   * Una constante `const` para el país
3. Muestre un mensaje en consola y en pantalla

### 🧩 Ejemplo esperado:

```js
function desafio() {
  let nombre = prompt("Ingresa tu nombre:");
  const pais = "Argentina";

  if (nombre) {
    let mensaje = "Hola " + nombre + " desde " + pais;
    console.log(mensaje);
    alert(mensaje);
  }
}
```

---

## 🧩 Parte 6: Reflexión

Responder en el cuaderno:

1. ¿Cuál es la diferencia entre `let` y `const`?
2. ¿Qué es el alcance de bloque?
3. ¿Por qué `var` puede ser peligroso?
4. ¿Dónde conviene usar `const`?

---

## 🧑‍🏫 Sugerencias

* Rompan el código a propósito
* Intenten acceder a variables fuera de su alcance
* Expliquen el error con sus propias palabras

👉 Esto fortalece mucho la comprensión real del concepto.

---


