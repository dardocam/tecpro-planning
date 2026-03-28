# 📘 Clase 3: Tipos de datos + Funciones

## 🎯 Objetivo

* Identificar los **tipos de datos** en JavaScript
* Comprender cómo se almacenan y utilizan
* Entender qué es una **función** y cómo reutilizar código

---

# 🧠 Parte 1: Tipos de datos en JavaScript

Los **tipos de datos** definen qué tipo de información guarda una variable.

---

## 🔢 Tipos de datos primitivos

### 1. 🔹 Número (Number)

Representa valores numéricos:

```js
let edad = 18;
let precio = 99.99;
```

---

### 2. 🔤 Texto (String)

Cadenas de texto:

```js
let nombre = "Ana";
let mensaje = 'Hola mundo';
```

---

### 3. ✅ Booleano (Boolean)

Valores lógicos:

```js
let esMayor = true;
let tienePermiso = false;
```

---

### 4. ❌ Null

Representa un valor vacío intencional:

```js
let dato = null;
```

---

### 5. ❓ Undefined

Variable declarada pero sin valor:

```js
let variable;
```

---

## 🔍 Ver el tipo de dato

Se usa `typeof`:

```js
let numero = 10;
console.log(typeof numero); // number
```

---

# 🧩 Parte 2: ¿Qué es una función?

Una **función** es un bloque de código que se puede ejecutar cuando lo necesitamos.

👉 Sirve para:

* Reutilizar código
* Organizar mejor el programa
* Evitar repetir instrucciones

---

## 🔧 Crear una función

```js
function saludar() {
  alert("Hola!");
}
```

👉 Para ejecutarla:

```js
saludar();
```

---

## 📥 Funciones con parámetros

Permiten recibir datos:

```js
function saludar(nombre) {
  alert("Hola " + nombre);
}

saludar("Juan");
```

---

## 🔁 Funciones con retorno

Devuelven un valor:

```js
function sumar(a, b) {
  return a + b;
}

let resultado = sumar(2, 3);
console.log(resultado);
```

---

## ⚡ Funciones flecha (Arrow functions)

Forma moderna:

```js
const sumar = (a, b) => {
  return a + b;
};
```

👉 Versión simplificada:

```js
const sumar = (a, b) => a + b;
```

---

# 🔗 Relación entre tipos de datos y funciones

Las funciones:

* Reciben **datos** (parámetros)
* Procesan esos datos
* Devuelven resultados

Ejemplo:

```js
function esMayorDeEdad(edad) {
  return edad >= 18;
}

console.log(esMayorDeEdad(20)); // true
```

👉 Acá usamos:

* Número (`edad`)
* Booleano (`true/false`)
* Función

---

# ⚠️ Errores comunes

* No usar `return` cuando se necesita un resultado
* Confundir `=` con `==` o `===`
* Enviar datos incorrectos a una función

---

# 🚀 Conclusión

* JavaScript maneja distintos **tipos de datos** para representar información
* Las **funciones** permiten trabajar con esos datos de forma organizada
* Son la base de cualquier programa o aplicación

---

# 🧑‍🏫 Actividad breve sugerida

💡 Analizar:

```js
function prueba(valor) {
  return typeof valor;
}

console.log(prueba(10));
console.log(prueba("Hola"));
console.log(prueba(true));
```

👉 Pregunta:
¿Qué devuelve en cada caso y por qué?

---
