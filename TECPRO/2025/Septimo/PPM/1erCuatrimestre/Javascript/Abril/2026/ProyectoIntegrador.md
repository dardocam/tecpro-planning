# 🧩 Proyecto Integrador: ¿Quién es ese Pokémon? (Quiz de Sombras)

### 🎯 Objetivos de aprendizaje

Al finalizar este proyecto serás capaz de:
- Consumir una API externa con `fetch` y manejar respuestas asíncronas (`async/await` o `.then()`).
- Manipular el **DOM** de forma dinámica: crear elementos, modificar clases, mostrar/ocultar secciones.
- Trabajar con **variables**, **arrays** y **objetos** para almacenar y procesar datos del juego.
- Implementar lógica de juego con control de flujo (`if`, `for`, funciones).
- Diseñar una experiencia de usuario sencilla con HTML y CSS.
- *(Opcional)* Construir un backend básico con Node.js y Express para guardar puntuaciones.

---

### 📖 Descripción del juego

El jugador ve la **silueta negra** de un Pokémon (elegido aleatoriamente entre los 151 originales) y debe adivinar su nombre haciendo clic en una de las cuatro opciones.  
- Si acierta, la silueta se revela y se muestra un mensaje de victoria.  
- Si falla, se le indica cuál era el Pokémon correcto.  
Luego puede pasar a la siguiente ronda.  

Los datos de los Pokémon se obtienen en tiempo real desde la [PokéAPI](https://pokeapi.co/).

---

### 📋 Requisitos obligatorios

1. **Vanilla JavaScript**: sin frameworks ni librerías externas (salvo lo que necesites para el backend opcional).
2. **HTML, CSS y JS en archivos separados** (o al menos código bien organizado).
3. **Uso de `fetch`** para obtener la lista de Pokémon de la PokéAPI.
4. **Almacenar los datos en un array de objetos** (cada objeto con al menos `id` y `nombre`).
5. **Barajar** el array para seleccionar 4 Pokémon al azar; uno de ellos será el correcto.
6. **Mostrar la imagen del Pokémon misterioso** con un filtro CSS que la convierta en sombra.
7. **Generar botones dinámicamente** con los nombres de los 4 Pokémon.
8. **Manejar eventos de clic** para evaluar la respuesta del usuario.
9. **Indicar visualmente** si acertó o falló, revelar la imagen y permitir siguiente ronda.

---

### 🧠 Pasos sugeridos (sin código completo, ¡a pensar!)

#### 🔎 1. Explora la API  
Visita `https://pokeapi.co/api/v2/pokemon?limit=151` en el navegador y analiza la respuesta JSON. Identifica:
- ¿Dónde está la lista de Pokémon?
- ¿Qué datos vienen en cada elemento?
- ¿Cómo extraer el `id` de un Pokémon a partir de su `url`?
- ¿Dónde obtener la imagen del Pokémon? (pista: `raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`)

#### 📥 2. Carga los datos con `fetch`
Crea una función asíncrona que:
- Haga `fetch` a la URL anterior.
- Transforme la respuesta en un **array de objetos** con la forma `{ id: número, nombre: string }`.
- Guarde ese array en una variable global (`let listaPokemon = []`).

#### 🔀 3. Lógica de selección aleatoria
- Crea una función para barajar un array (investiga el algoritmo Fisher‑Yates, no uses solo `.sort(() => Math.random() - 0.5)` ).
- Toma los primeros 4 Pokémon del array barajado → serán las opciones.
- De esos 4, selecciona uno al azar para que sea el **Pokémon misterioso**.

#### 🖼️ 4. Interfaz de usuario
Diseña un HTML simple con:
- Una pantalla de inicio (título + botón "Empezar").
- Una zona de juego (inicialmente oculta) que contenga:
  - Una imagen (`<img>`) para el Pokémon misterioso.
  - Un contenedor (`<div>`) para los botones de opciones.
  - Un párrafo para el mensaje de resultado.
  - Un botón "Siguiente Pokémon" (oculto hasta que el jugador responda).

En el CSS, crea una clase `.silueta` que aplique `filter: brightness(0);` para ocultar los colores.

#### 🎨 5. Dinámica del juego (JavaScript)
- Al hacer clic en "Empezar":
  - Oculta la pantalla de inicio.
  - Muestra la zona de juego.
  - Ejecuta la función que inicia una ronda.
- En cada ronda:
  - Limpia los botones anteriores y el mensaje.
  - Vuelve a aplicar la clase `.silueta` a la imagen.
  - Coloca la URL de la imagen del Pokémon misterioso (recuerda que necesitas su `id` para construir la ruta).
  - Crea un botón por cada Pokémon opción. A cada botón asígnale un `eventListener` que llame a una función `comprobarRespuesta`.
  - La función `comprobarRespuesta` debe:
    1. Desactivar todos los botones.
    2. Quitar la clase `.silueta` de la imagen.
    3. Comparar el `id` del Pokémon elegido con el `id` del Pokémon correcto.
    4. Mostrar un mensaje adecuado y el botón "Siguiente Pokémon".

#### 🔁 6. Siguiente ronda
El botón "Siguiente Pokémon" simplemente llama a la función que inicia una nueva ronda.

---

### 🚀 Ampliaciones (front‑end)

- **Contador de aciertos** y racha.
- **Selector de generación** (cambiar el parámetro `limit` en la URL).
- **Mostrar estadísticas** del Pokémon al revelarlo (tipo, altura, peso) haciendo otro `fetch` a la URL individual.
- **Efectos sonoros** con la Web Audio API.
- **Guardar la puntuación máxima** en `localStorage`.

---

### 🖥️ Extensión a backend (Node.js + Express)

Cuando el juego base esté completo, puedes añadir un servidor que permita:

1. **Registrar usuarios** (nombre o email).
2. **Guardar la puntuación** de cada partida (por ejemplo, número de aciertos consecutivos).
3. **Mostrar un ranking** de los mejores jugadores.

Sugerencias técnicas:
- Crea una API REST con Express.
- Endpoints mínimos:
  - `POST /api/usuarios` (recibe nombre, devuelve id).
  - `POST /api/partidas` (recibe `userId` y `puntuacion`).
  - `GET /api/ranking` (devuelve top 10).
- Puedes guardar los datos en un archivo JSON o en memoria (más adelante usar una base de datos como SQLite o MongoDB).
- El front‑end hará `fetch` a tu servidor local (por ejemplo `http://localhost:3000`).
- Añade validaciones básicas y manejo de errores.

**Importante**: el backend debe integrarse con el juego de forma que el usuario vea su puntuación final y pueda guardarla al terminar.

---

### 📊 Rúbrica de evaluación

| Criterio                     | Insuficiente | Aceptable | Excelente |
|------------------------------|--------------|-----------|-----------|
| Consumo de la API con fetch  | No funciona  | Funciona pero sin manejo de errores | Maneja estados de carga y errores |
| Uso de arrays y objetos      | Datos mal estructurados | Array de objetos correcto pero sin transformación | Extrae y normaliza datos de forma eficiente |
| Lógica de juego (aleatorio)  | No es aleatorio o injusto | Aleatoriedad simple (sort) | Algoritmo de barajado Fisher‑Yates |
| Manipulación del DOM         | Mínima interacción | Crea/elimina elementos correctamente | Animaciones suaves y retroalimentación visual |
| Experiencia de usuario       | Confusa o rota | Funcional pero sin estética | Diseño cuidado, responsive y accesible |
| Código limpio y comentado    | Incomprensible | Legible pero sin organización | Funciones pequeñas, nombres claros, sin repetición |
| Extensión backend (opcional) | No implementada | Endpoints funcionando con datos en memoria | API documentada, manejo de errores y front integrado |

---

### 📚 Recursos

- [Documentación de PokéAPI](https://pokeapi.co/docs/v2)
- [Algoritmo Fisher‑Yates (explicación)](https://bost.ocks.org/mike/shuffle/)
- [MDN: fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [MDN: Manipulación del DOM](https://developer.mozilla.org/es/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

---
