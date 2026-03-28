# 📘 Clase 5: Manipulación del DOM

## 🎯 Objetivo

* Comprender qué es el **DOM**
* Aprender a **seleccionar elementos HTML**
* Modificar contenido, estilos y comportamiento con JavaScript

---

# 🧠 ¿Qué es el DOM?

El **DOM (Document Object Model)** es una representación en forma de **árbol** de una página web.

👉 JavaScript usa el DOM para:

* Leer el contenido de la página
* Modificarlo
* Responder a eventos del usuario

---

## 🌳 Ejemplo visual (idea)

HTML:

```html
<h1>Hola</h1>
<p>Texto</p>
```

👉 El navegador lo interpreta como una estructura tipo árbol:

* document

  * h1
  * p

---

# 🔍 Seleccionar elementos

Para manipular el DOM primero hay que **seleccionar elementos**.

---

## 🎯 Por ID

```js
let titulo = document.getElementById("miTitulo");
```

---

## 🎯 Por clase

```js
let elementos = document.getElementsByClassName("miClase");
```

---

## 🎯 Selector moderno (recomendado)

```js
let elemento = document.querySelector("#miTitulo");
```

👉 También permite:

```js
document.querySelector(".clase");
document.querySelector("p");
```

---

# ✏️ Modificar contenido

---

## 📝 Cambiar texto

```js
elemento.innerText = "Nuevo texto";
```

---

## 🧾 Cambiar HTML

```js
elemento.innerHTML = "<b>Texto en negrita</b>";
```

---

# 🎨 Modificar estilos

```js
elemento.style.color = "red";
elemento.style.backgroundColor = "yellow";
```

---

# 🔘 Eventos (interacción)

Permiten que la página responda a acciones del usuario.

---

## 🖱️ Click

```js
elemento.onclick = function() {
  alert("Hiciste clic");
};
```

---

## 🧠 Forma moderna (recomendada)

```js
elemento.addEventListener("click", function() {
  alert("Evento moderno");
});
```

---

# 🔧 Ejemplo completo

```html id="6t8tvu"
<h1 id="titulo">Hola Mundo</h1>
<button id="boton">Cambiar texto</button>

<script>
  let titulo = document.getElementById("titulo");
  let boton = document.getElementById("boton");

  boton.addEventListener("click", function() {
    titulo.innerText = "Texto cambiado 🚀";
  });
</script>
```

👉 ¿Qué hace?

* Detecta el click
* Cambia el texto del título

---

# 🔄 Crear y eliminar elementos

---

## ➕ Crear elemento

```js
let nuevo = document.createElement("p");
nuevo.innerText = "Nuevo párrafo";
document.body.appendChild(nuevo);
```

---

## ❌ Eliminar elemento

```js
elemento.remove();
```

---

# 💡 ¿Para qué sirve en la vida real?

La manipulación del DOM permite crear:

* Formularios interactivos
* Juegos web
* Aplicaciones dinámicas
* Interfaces modernas (botones, menús, etc.)

---

# ⚠️ Errores comunes

* No seleccionar bien el elemento
* Ejecutar JS antes de que cargue el HTML
* Confundir `innerText` con `innerHTML`

---

# 🚀 Conclusión

* El DOM conecta **HTML + JavaScript**
* Permite crear páginas **dinámicas e interactivas**
* Es una de las habilidades más importantes del desarrollo web

---

# 🧑‍🏫 Actividad breve sugerida

💡 Analizar:

```html id="3lfmbx"
<p id="texto">Original</p>
<button onclick="cambiar()">Cambiar</button>

<script>
function cambiar() {
  document.getElementById("texto").innerText = "Modificado";
}
</script>
```

👉 Pregunta:

* ¿Qué sucede al hacer clic?
* ¿Qué parte del código produce el cambio?

---

