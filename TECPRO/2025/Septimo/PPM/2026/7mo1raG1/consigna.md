# 🎮 JAVASCRIPT CHALLENGE

## Construí tu propio juego interactivo

### 👥 Modalidad

* Trabajo en grupos de **1 o 2 estudiantes**.
* Cada grupo deberá diseñar y desarrollar **su propio proyecto**.
* La temática es libre, pero deberá ser aprobada antes de comenzar.
* El proyecto deberá ser desarrollado utilizando **HTML + CSS + JavaScript**.
* JavaScript deberá ser el componente principal de la lógica y comportamiento de la aplicación.

---

# 🎯 Desafío

Cada grupo deberá crear un **juego, simulador o aplicación interactiva** basada en una temática elegida por ustedes.

La propuesta debe permitir que el usuario **interactúe, tome decisiones, reciba información, cometa errores y obtenga algún tipo de resultado**.

No se busca solamente realizar una página web bonita.

> **El desafío consiste en demostrar que pueden utilizar JavaScript para construir una aplicación interactiva completa.**

---

# 💡 Algunas ideas de proyectos

Pueden utilizar una de estas ideas.

### 🎮 Juegos

* Trivia sobre películas
* Trivia sobre videojuegos
* Preguntas sobre fútbol
* Piedra, papel o tijera
* Memoria de cartas
* Batalla de personajes
* Juego de preguntas con vidas
* Escape Room virtual
* Blackjack simplificado
* Simulador de combate
* Simulador de sistema solar
* Simulador de cajero automático

---

# 🧩 REQUISITOS TÉCNICOS

El proyecto deberá demostrar el uso de los siguientes conceptos.

## 1. JavaScript

El proyecto deberá utilizar JavaScript para controlar la lógica de la aplicación.

No será suficiente utilizar JavaScript únicamente para cambiar colores o mostrar mensajes.

Deberá existir una **lógica de programación real**.

---

## 2. Variables y alcance

El proyecto deberá utilizar correctamente:

* `let`
* `const`
* variables locales
* variables globales cuando realmente sean necesarias
* parámetros de funciones

Se deberá demostrar que los estudiantes comprenden el **alcance de las variables**.

---

## 3. Tipos de datos

El proyecto deberá utilizar diferentes tipos de datos:

* `string`
* `number`
* `boolean`
* `array`
* `object`

Deberán utilizar cada tipo de acuerdo con la información que representa.

---

# ⚙️ 4. Funciones

La aplicación deberá estar organizada mediante funciones.

Por ejemplo:

```javascript
iniciarJuego()
mostrarPregunta()
verificarRespuesta()
actualizarPuntaje()
finalizarJuego()
reiniciarJuego()
```

No se deberá desarrollar toda la aplicación dentro de un único bloque de código.

---

# 🐞 5. Debugging y manejo de errores

El proyecto deberá contemplar situaciones en las que algo pueda salir mal.

Deberán utilizar herramientas de debugging:

* `console.log()`
* `console.error()`
* herramientas de desarrollador del navegador
* puntos de interrupción cuando sea necesario

Además, deberán contemplar errores producidos por entradas incorrectas del usuario.

Ejemplo:

```javascript
if (!respuesta) {
    console.error("El usuario no ingresó una respuesta");
}
```

---

# 🌐 6. Manipulación del DOM

La interfaz deberá modificarse dinámicamente mediante JavaScript.

Deberán utilizar métodos y propiedades como:

```javascript
document.querySelector()
document.getElementById()
textContent
innerHTML
classList
createElement()
appendChild()
```

También deberán utilizar eventos:

```javascript
click
submit
input
change
```

La interacción del usuario deberá producir cambios visibles en la interfaz.

---

# 🗃️ 7. Estructuras de datos

El proyecto deberá utilizar estructuras de datos para almacenar información.

Como mínimo deberán utilizar:

### Arrays

```javascript
const preguntas = [
    "¿Cuál es la capital de Argentina?",
    "¿Cuál es el planeta más grande?"
];
```

### Objetos

```javascript
const jugador = {
    nombre: "Juan",
    puntos: 100,
    vidas: 3
};
```

Preferentemente deberán utilizar **arrays de objetos**:

```javascript
const personajes = [
    {
        nombre: "Personaje 1",
        vida: 100,
        ataque: 20
    },
    {
        nombre: "Personaje 2",
        vida: 80,
        ataque: 30
    }
];
```

---

# 🔌 8. Consumo de una API REST

El proyecto deberá consumir **al menos una API REST** utilizando JavaScript.

Deberán utilizar:

```javascript
fetch()
```

y trabajar con:

```javascript
async
await
```

Ejemplo:

```javascript
async function obtenerDatos() {

    try {

        const respuesta = await fetch(URL);

        const datos = await respuesta.json();

        console.log(datos);

    } catch (error) {

        console.error("Error:", error);

    }
}
```

Los datos obtenidos deberán tener **alguna utilidad dentro del proyecto**.

No se aceptará consumir una API solamente para mostrar que se utilizó `fetch()`.

---

# 🧠 NIVEL AVANZADO — REGLA DEL PROYECTO

El proyecto deberá combinar los conceptos.

Por ejemplo:

```text
API REST
   ↓
datos obtenidos
   ↓
Array de objetos
   ↓
funciones
   ↓
procesamiento de datos
   ↓
DOM
   ↓
interacción del usuario
   ↓
resultado del juego
```

La aplicación deberá funcionar como un sistema integrado.

---

# 🎯 MECÁNICA DEL JUEGO

Cada grupo deberá definir:

### 1. Objetivo

¿Qué debe conseguir el jugador/usuario?

### 2. Reglas

¿Qué puede hacer?

¿Qué no puede hacer?

### 3. Estado

¿Qué información debe mantener el programa?

Por ejemplo:

```javascript
let puntos = 0;
let vidas = 3;
let nivel = 1;
```

### 4. Acciones

¿Qué puede hacer el usuario?

### 5. Resultado

¿Qué sucede cuando gana?

¿Qué sucede cuando pierde?

### 6. Reinicio

El usuario deberá poder comenzar nuevamente sin recargar obligatoriamente la página.

---

# 🏆 SISTEMA DE PUNTUACIÓN

El proyecto deberá implementar algún mecanismo de puntuación.

Por ejemplo:

```text
+10 puntos → respuesta correcta
-5 puntos  → respuesta incorrecta
-1 vida    → error
+20 puntos → completar desafío
```

También podrán implementar:

* niveles
* vidas
* tiempo
* ranking
* monedas
* experiencia
* logros
* combos
* dificultad progresiva

---

# 🧪 MODO DESAFÍO

Una vez terminado el proyecto, cada grupo deberá permitir que otro grupo lo pruebe.

El grupo visitante deberá intentar:

1. Utilizar correctamente la aplicación.
2. Encontrar errores.
3. Introducir datos inesperados.
4. Intentar romper la lógica del juego.
5. Verificar qué sucede cuando una API no responde.
6. Revisar la consola del navegador.
7. Proponer mejoras.

---

# 📦 ENTREGABLE

Cada grupo deberá entregar:

```text
proyecto/
│
├── index.html
├── css/
│   └── estilos.css
│
├── js/
│   └── app.js
│
└── README.md
```

El `README.md` deberá explicar:

* Nombre del proyecto.
* Integrantes.
* Temática.
* Objetivo.
* Reglas.
* Cómo jugar/utilizarlo.
* API utilizada.
* Estructuras de datos utilizadas.
* Funciones principales.
* Problemas encontrados.
* Errores solucionados.
* Mejoras futuras.

---

# 🎤 DEFENSA DEL PROYECTO

Cada grupo deberá realizar una breve presentación.

Deberán poder explicar:

### JavaScript

* ¿Dónde está la lógica principal?
* ¿Qué variables utilizan?
* ¿Qué funciones crearon?
* ¿Qué alcance tienen sus variables?

### DOM

* ¿Qué elementos modifican mediante JavaScript?
* ¿Qué eventos utilizan?

### Datos

* ¿Qué arrays utilizan?
* ¿Qué objetos utilizan?
* ¿Por qué eligieron esas estructuras?

### Debugging

* ¿Qué errores encontraron?
* ¿Cómo los solucionaron?

### API

* ¿Qué API utilizaron?
* ¿Qué información obtienen?
* ¿Cómo transforman esos datos?
* ¿Dónde los muestran?

---

# 🚨 CONDICIÓN IMPORTANTE

No alcanza con que el proyecto **funcione**.

Los integrantes deberán poder **explicar el código que desarrollaron**.

Durante la defensa el docente podrá solicitar modificaciones simples, por ejemplo:

> "Cambien la cantidad de vidas de 3 a 5."

> "Agreguen un nuevo nivel."

> "¿Qué sucede si la API devuelve un error?"

> "Muéstrenme dónde se modifica el DOM."

> "¿Qué ocurriría si esta variable fuera declarada con `const`?"

> "Agreguen una nueva propiedad al objeto jugador."

El objetivo es comprobar que el código fue comprendido y no solamente obtenido o generado externamente.

---

# 🏁 CONDICIÓN DE VICTORIA

El proyecto será considerado completo cuando:

* [ ] La aplicación funciona.
* [ ] Existe interacción con el usuario.
* [ ] JavaScript controla la lógica.
* [ ] Se utilizan variables correctamente.
* [ ] Se utilizan diferentes tipos de datos.
* [ ] Se utilizan funciones.
* [ ] Se utilizan arrays.
* [ ] Se utilizan objetos.
* [ ] Se manipula el DOM.
* [ ] Se utilizan eventos.
* [ ] Se contempla el manejo de errores.
* [ ] Se utilizaron herramientas de debugging.
* [ ] Se consume una API REST.
* [ ] Los datos de la API tienen utilidad real.
* [ ] Existe un sistema de puntuación, estado o progreso.
* [ ] Existe una condición de finalización.
* [ ] El proyecto puede reiniciarse.
* [ ] El grupo puede explicar su código.

---

## 🧩 MISIÓN FINAL

> **No construyan solamente una página web.**
>
> Construyan una pequeña aplicación capaz de **recibir información, procesarla, tomar decisiones, modificar su estado y responder a las acciones del usuario.**
>
> **El desafío es demostrar cuánto pueden hacer con JavaScript.**
