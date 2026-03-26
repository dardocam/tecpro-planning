# 📘 Clase 2: Variables y alcance

## 🎯 Objetivo

Comprender:

* Cómo declarar variables en JavaScript (`var`, `let`, `const`)
* Qué diferencias existen entre ellas
* Qué es el **alcance (scope)** y cómo afecta al código

---

## 🧠 ¿Qué es una variable?

Una **variable** es un espacio en memoria donde guardamos información para usarla más adelante.

Ejemplo:

```js
let nombre = "Juan";
```

👉 En este caso:

* `nombre` → es la variable
* `"Juan"` → es el valor almacenado

---

## 🧩 Tipos de declaración de variables

En JavaScript existen **tres formas principales** de declarar variables:

---

### 🔵 `var` (forma antigua)

```js
var edad = 25;
```

📌 Características:

* Se puede redeclarar
* Tiene alcance **global o de función**
* Puede generar errores difíciles de detectar

⚠️ Hoy en día **NO se recomienda su uso**

---

### 🟢 `let` (moderna y flexible)

```js
let ciudad = "Necochea";
```

📌 Características:

* Se puede modificar su valor
* Tiene alcance de **bloque** (`{ }`)
* Más segura que `var`

👉 Es la opción más usada en la mayoría de los casos

---

### 🔴 `const` (constante)

```js
const PI = 3.14;
```

📌 Características:

* **No se puede reasignar**
* Tiene alcance de **bloque**
* Ideal para valores que no cambian

⚠️ Importante:

```js
const numero = 10;
numero = 20; // ❌ ERROR
```

---

## 🔍 Comparación rápida

| Tipo  | ¿Se puede cambiar? | Alcance | ¿Recomendado? |
| ----- | ------------------ | ------- | ------------- |
| var   | ✔️ Sí              | Función | ❌ No          |
| let   | ✔️ Sí              | Bloque  | ✅ Sí          |
| const | ❌ No               | Bloque  | ✅ Sí          |

---

## 🌍 ¿Qué es el alcance (scope)?

El **alcance** define **dónde podemos usar una variable dentro del programa**.

---

### 🌐 Alcance global

```js
let mensaje = "Hola";

function saludar() {
  console.log(mensaje);
}
```

👉 Se puede usar desde cualquier parte del código.

---

### 🔒 Alcance local (de función)

```js
function prueba() {
  let numero = 10;
  console.log(numero);
}

console.log(numero); // ❌ ERROR
```

👉 La variable solo existe dentro de la función.

---

### 📦 Alcance de bloque

```js
if (true) {
  let saludo = "Hola";
  console.log(saludo); // ✔️
}

console.log(saludo); // ❌ ERROR
```

👉 Solo existe dentro de `{ }`

---

## ⚠️ Ejemplo clave: diferencia entre `var` y `let`

```js
if (true) {
  var a = 1;
  let b = 2;
}

console.log(a); // ✔️ funciona
console.log(b); // ❌ error
```

👉 Esto muestra por qué `let` es más seguro.

---

## 🚀 Conclusión

* Usar `let` para variables que cambian
* Usar `const` para valores fijos
* Evitar `var`
* Entender el alcance evita errores comunes

---

## 🧑‍🏫 Actividad rápida sugerida

💡 Pregunta a los estudiantes:

¿Qué ocurre aquí?

```js
const nombre = "Ana";

if (true) {
  const nombre = "Luis";
  console.log(nombre);
}

console.log(nombre);
```

👉 Resultado esperado:

* Dentro del bloque → "Luis"
* Fuera del bloque → "Ana"

---

