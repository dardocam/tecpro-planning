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