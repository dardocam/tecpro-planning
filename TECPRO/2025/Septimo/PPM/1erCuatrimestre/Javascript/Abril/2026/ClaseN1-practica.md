## 🧪 Actividad Práctica: “Mi primera interacción con JavaScript”

### 🎯 Objetivo

Que los estudiantes comprendan:

* Qué es JavaScript en la práctica
* Cómo interactuar con una página web
* Cómo ejecutar código básico

---

## 🧱 Parte 1: Preparación

1. Crear un archivo llamado:
   `index.html`

2. Copiar y pegar el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi primer JS</title>
</head>
<body>

  <h1>Hola Mundo con JavaScript</h1>

  <button onclick="saludar()">Haz clic aquí</button>

  <script>
    function saludar() {
      alert("¡Hola! Este es tu primer programa en JavaScript 🎉");
    }
  </script>

</body>
</html>
```

3. Abrir el archivo con el navegador (doble clic).

---

## ▶️ Parte 2: Experimentación

👉 Pedir a los estudiantes que:

* Hagan clic en el botón
* Observen qué sucede
* Identifiquen:

  * ¿Qué hace el botón?
  * ¿Qué hace `alert()`?

---

## 🧠 Parte 3: Modificación guiada

Modificar el código:

### ✏️ Ejercicio 1

Cambiar el mensaje del `alert` por algo personalizado:

```js
alert("Hola, soy Juan y estoy aprendiendo JavaScript");
```

---

### ✏️ Ejercicio 2

Agregar una segunda función:

```html
<button onclick="cambiarTexto()">Cambiar texto</button>

<p id="mensaje">Texto original</p>

<script>
  function cambiarTexto() {
    document.getElementById("mensaje").innerText = "Texto cambiado con JavaScript 🚀";
  }
</script>
```

👉 Objetivo: entender cómo JavaScript modifica el contenido HTML.

---

## 🚀 Parte 4: Desafío simple

💡 Consigna:

Crear un botón que:

* Pregunte el nombre del usuario (`prompt`)
* Muestre un saludo personalizado

Ejemplo esperado:

```js
function preguntarNombre() {
  let nombre = prompt("¿Cómo te llamas?");
  alert("Hola " + nombre + ", bienvenido/a 😄");
}
```

---

## 🧩 Parte 5: Reflexión

Responder:

* ¿Qué es una función?
* ¿Qué hace `onclick`?
* ¿Qué diferencia hay entre `alert` y modificar texto en la página?
* ¿Dónde se ejecuta JavaScript?

---
