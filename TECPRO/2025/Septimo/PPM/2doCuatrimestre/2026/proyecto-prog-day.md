## **Proyecto Integrador (Ampliación): Quiz de Sombras Pokémon + IoT con ESP32**  

---

Al finalizar esta etapa serás capaz de:  

- Profundizar en el manejo de APIs realizando peticiones adicionales con `fetch`.  
- Utilizar `localStorage` para persistir datos entre sesiones del navegador.  
- Integrar sonidos con la Web Audio API (o elementos `<audio>`) para enriquecer la experiencia.  
- Parametrizar la carga de datos para crear selectores dinámicos (generaciones).  
- Conectar una aplicación web con un microcontrolador ESP32 a través de WiFi, enviando comandos mediante peticiones HTTP.  
- Programar un ESP32 para que actúe como servidor web y controle actuadores físicos (LEDs, zumbador) según la respuesta del juego.  

---

### 🧩 Descripción de las nuevas funcionalidades  

1. **Contador de aciertos y racha**  
   - Se mostrará en pantalla el número de aciertos totales y la racha actual (aciertos consecutivos).  
   - Al fallar, la racha se reinicia.  

2. **Selector de generación**  
   - Un `<select>` permitirá elegir entre las distintas generaciones de Pokémon.  
   - Al cambiar la selección se volverán a cargar los datos desde la API (cambiando `limit` y `offset`) y se reiniciará el juego.  

3. **Estadísticas del Pokémon revelado**  
   - Al descubrir la imagen (acierto o fallo), se mostrará información adicional del Pokémon: tipo(s), altura y peso.  
   - Para obtener estos datos se hará una segunda consulta `fetch` a la URL individual del Pokémon (ej. `https://pokeapi.co/api/v2/pokemon/{id}`).  

4. **Efectos sonoros**  
   - Sonidos distintos para acierto y error (pueden ser archivos de audio o generados con la Web Audio API).  
   - Se reproducirán inmediatamente al comprobar la respuesta.  

5. **Persistencia de la puntuación máxima**  
   - La máxima racha o puntuación se guardará en `localStorage` y se mostrará en la interfaz.  
   - Si se supera el récord, se actualizará automáticamente.  

6. **Interacción física con ESP32**  
   - El microcontrolador se conectará a la misma red WiFi que la computadora (o creará su propio punto de acceso).  
   - Ejecutará un pequeño servidor web con rutas como `/acierto` y `/fallo`.  
   - Cuando el jugador acierte o falle, la página web enviará una petición `fetch` a la IP del ESP32.  
   - El ESP32 reaccionará encendiendo LEDs de colores (verde/rojo), activando un zumbador, o mostrando un mensaje en una pantalla OLED.  

---

### 📋 Requisitos obligatorios  

- **Hardware**  
  - Placa ESP32.  
  - Protoboard, cables, LEDs (mínimo dos colores), resistencias.  
  - Opcional: buzzer pasivo, pantalla OLED SSD1306.  

- **Software**  
  - Front‑end: HTML, CSS y JS puros (sin frameworks).  
  - ESP32: programado con Arduino IDE, usando las bibliotecas `WiFi.h` y `WebServer.h` (o `ESPAsyncWebServer`).  

- **Funcionamiento**  
  - Al acertar, la página debe enviar una solicitud `GET` a `http://<IP_ESP32>/acierto`; al fallar, a `/fallo`.  
  - El ESP32 debe responder con un código de estado y activar los actuadores correspondientes.  
  - La comunicación debe ser inalámbrica (WiFi).  

---

### 🧠 Pasos sugeridos (¡a pensar y experimentar!)  

#### 🖥️ 1. Mejoras en el front‑end  

- **Contador y racha:** añade dos `span` en el HTML y actualiza sus valores desde JavaScript tras cada respuesta.  
- **Selector de generación:** utiliza la estructura de generaciones de la PokéAPI. Por ejemplo:  
  - 1ª gen: `?limit=151&offset=0`  
  - 2ª gen: `?limit=100&offset=151`  
  - etc.  
  Al cambiar el selector, vuelve a llamar a `cargarPokemon()` con los nuevos parámetros y reinicia la partida.  
- **Estadísticas:** en `comprobarRespuesta`, tras revelar la imagen, haz un `fetch` a la URL del Pokémon y extrae `types`, `height`, `weight`. Crea elementos para mostrarlos.  
- **Sonidos:** puedes usar `new Audio('sonido.mp3')` y llamar a `.play()`. Asegúrate de tener archivos de sonido breves y libres de derechos (o generarlos con `OscillatorNode`).  
- **localStorage:** al terminar cada ronda, compara la racha actual con la almacenada (`localStorage.getItem('maxRacha')`). Si es mayor, actualiza el valor. Muestra el récord en la pantalla.  

#### 🔌 2. Preparación del ESP32  

- **Conexión WiFi:** configura el ESP32 para que se conecte a tu red doméstica (o crea un punto de acceso con `WiFi.softAP`).  
- **Servidor web:** utiliza la clase `WebServer`. Define dos rutas:  
  ```cpp
  server.on("/acierto", []() {
    // encender LED verde, apagar rojo, activar buzzer con tono agudo
    server.send(200, "text/plain", "OK");
  });
  server.on("/fallo", []() {
    // encender LED rojo, apagar verde, tono grave
    server.send(200, "text/plain", "OK");
  });
  ```  
- **Circuito:** conecta un LED verde al pin GPIO (ej. 25) y uno rojo al pin 26, cada uno con su resistencia de 220 Ω. Si usas buzzer, conéctalo a otro pin con un transistor.  
- **Prueba inicial:** comprueba que al acceder desde el navegador a `http://<IP>/acierto` el LED verde se enciende.  

#### 🌐 3. Integración desde la página web  

- **Obtener la IP del ESP32:** puede ser fija (si se conecta siempre a la misma red) o mostrarla en una pantalla OLED. El estudiante deberá ingresar la IP en un campo de configuración o guardarla en una variable.  
- **Envío de comandos:** dentro de `comprobarRespuesta`, después de mostrar el resultado, añade:  
  ```javascript
  if (esCorrecto) {
    fetch(`http://${ipESP32}/acierto`);
  } else {
    fetch(`http://${ipESP32}/fallo`);
  }
  ```  
  La variable `ipESP32` puede ser global y configurable.  

---

### 🚀 Desafíos extra   

- Hacer que el ESP32 envíe la respuesta correcta a una pantalla OLED antes de revelarla.  
- Implementar un modo “multijugador” donde dos ESP32 con pulsadores permitan contestar desde el dispositivo físico (usando WebSockets).  
- Usar la Web Serial API para comunicación por USB sin necesidad de WiFi.  

---

### 📦 Entregables  

- Código completo del front‑end (HTML, CSS, JS).  
- Sketch de Arduino (.ino) listo para compilar.  
- Diagrama de conexiones (puede ser una foto del prototipo o un esquema hecho con Fritzing).  
- Video demostrativo de máximo 2 minutos donde se vea el juego funcionando y el ESP32 reaccionando.  

---

Esta ampliación une desarrollo web, consumo de APIs y hardware en un solo proyecto, dándote una visión completa de cómo una aplicación puede interactuar con el mundo físico. Presentaremos el proyecto para el evento "Día del Programador"


---

## Rúbrica de Evaluación – ¿Quién es ese Pokémon? (Quiz de Sombras + IoT)

| Criterio | Insuficiente (1) | Aceptable (2) | Bueno (3) | Excelente (4) |
|----------|------------------|---------------|------------|---------------|
| **1. Consumo de la API y tratamiento de datos** | No se usa `fetch` o los datos no se cargan correctamente. | Se carga la lista, pero el array de Pokémon no está bien estructurado (falta el `id` o el nombre). | Se crea un array con `{id, nombre}`. Se extrae el `id` de la URL correctamente. | Además de lo anterior, se manejan errores de red (`try/catch`) y se muestra un mensaje si la API no responde. |
| **2. Lógica de selección aleatoria** | No se baraja el array o se usan métodos incorrectos que no garantizan aleatoriedad. | Se baraja con `sort` aleatorio (no verdaderamente aleatorio). | Se implementa Fisher‑Yates correctamente. Se eligen 4 opciones y un correcto. | Se evita que el mismo Pokémon se repita en rondas consecutivas (estado de la partida). |
| **3. Interfaz de usuario (HTML/CSS)** | No hay pantalla de inicio, no se ocultan/muestran secciones adecuadamente. | Las secciones se muestran/ocultan pero con poca estética. La silueta no funciona. | El diseño es limpio y funcional. La clase `.silueta` aplica `filter: brightness(0)` de forma correcta. | La interfaz es responsiva, visualmente atractiva, y el estado del juego es claro en todo momento. |
| **4. Dinámica del juego (eventos y DOM)** | Los botones no responden o no se evalúa la respuesta. | Se evalúa la respuesta, pero no se desactivan los botones tras hacer clic. | Se desactivan los botones, se revela la imagen y se muestra mensaje de acierto/fallo. | Además, se muestra el Pokémon correcto incluso si se falla, y se gestiona el botón “Siguiente” correctamente. |
| **5. Contador de aciertos y racha** | No implementado. | Muestra un contador de aciertos básico, pero no la racha o no se reinicia al fallar. | Muestra aciertos totales y racha actual; la racha se reinicia correctamente tras un fallo. | Incluye indicadores visuales (colores, animaciones) para la racha, y se persiste la máxima en `localStorage`. |
| **6. Selector de generación** | No implementado. | Intenta cambiar la generación, pero no se actualizan los datos correctamente o se rompe el juego. | Al cambiar el selector, se vuelven a cargar los Pokémon de la generación elegida y se reinicia la partida. | Ofrece un menú claro con nombres de generaciones (Kanto, Johto, etc.) y maneja correctamente los límites y offsets de la API. |
| **7. Estadísticas del Pokémon revelado** | No se muestran estadísticas. | Se intenta obtener datos pero no se maneja la segunda petición `fetch`. | Se realiza un `fetch` adicional a la URL del Pokémon y se muestran al menos tipo(s), altura y peso. | La información se presenta de forma ordenada, con los tipos formateados (posiblemente en español) y unidades (kg, m). |
| **8. Efectos sonoros** | Sin sonido. | Sonidos implementados pero se reproducen erróneamente (se solapan, no se cargan). | Sonidos de acierto y fallo funcionan con `Audio` o Web Audio API; se reproducen sin errores. | Los sonidos están sincronizados con las animaciones de revelado, y el volumen es controlado. |
| **9. Integración con ESP32 (hardware)** | El circuito no está montado o el ESP32 no responde. | El ESP32 se conecta a WiFi y ejecuta un servidor, pero no recibe comandos correctamente. | El ESP32 responde a `/acierto` y `/fallo` encendiendo LEDs de colores distintos. | Se añaden actuadores adicionales (zumbador, pantalla OLED) con comportamientos diferentes para cada resultado. |
| **10. Comunicación web ↔ ESP32** | No se envían peticiones desde la página. | Se intenta `fetch` pero la IP es incorrecta o no se manejan errores. | La página envía la petición a la IP configurada y reacciona sin bloquear el juego. | Se permite al usuario configurar la IP desde la interfaz (campo de texto) y se indica visualmente si la conexión con el ESP32 falla. |
| **11. Organización del código y buenas prácticas** | Código desordenado, sin comentarios, todo en una sola función. | Se usan funciones pero con nombres poco claros o lógica repetida. | Código modularizado, funciones con un solo propósito, variables bien nombradas. | Uso de constantes, comentarios explicativos, separación clara entre lógica y presentación (se evita `innerHTML` para construcción dinámica de gran tamaño). |
| **12. Persistencia de puntuación máxima** | No se usa `localStorage`. | Se intenta guardar pero se lee/escribe incorrectamente. | Se almacena la máxima racha/aciertos y se recupera al cargar la página; se actualiza al superarse. | Se muestra un mensaje especial (p. ej., “¡Nuevo récord!”) cuando se bate la marca. |

**Escala de puntuación**  
- Cada criterio se valora de 1 a 4.  
- Puntuación máxima: 48 puntos.  
- Para aprobar el proyecto ampliado se requiere un mínimo de 30 puntos, siempre que los criterios 1, 4 y 9 no estén en nivel Insuficiente.

---
