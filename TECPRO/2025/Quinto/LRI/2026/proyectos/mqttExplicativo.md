Estas líneas configuran y establecen la conexión de un cliente MQTT (usando la librería `PubSubClient` en un entorno como Arduino para **ESP32** o **ESP8266**) con un servidor broker.

### 1. `mqtt.setServer(mqtt_server, 1883);`
Esta instrucción **configura los detalles del servidor broker** al que se conectará el dispositivo.
*   **`mqtt_server`**: Es la dirección IP o nombre de dominio del servidor MQTT (definida previamente como una variable constante).
*   **`1883`**: Es el **puerto estándar** para conexiones MQTT no encriptadas. Si se usara seguridad SSL/TLS, el puerto común sería el 8883.

### 2. `mqtt.setCallback(recibirMensaje);`
Esta línea **registra la función que manejará los mensajes entrantes**.
*   MQTT es asíncrono; cuando el broker envía un mensaje a un tópico suscrito, la librería llama automáticamente a esta función.
*   **`recibirMensaje`** es el nombre de la función definida en el código que procesará el contenido del mensaje, el tópico de origen y la longitud de los datos recibidos.

### 3. `mqtt.connect("ESP32_01");`
Esta instrucción **inicia la conexión real** con el broker MQTT.
*   **`"ESP32_01"`** es el **ID único del cliente**. El broker usa este identificador para distinguir entre múltiples dispositivos conectados.
*   Esta función bloquea la ejecución hasta que se establece la conexión o falla. Es fundamental llamarla después de `setServer` y `setCallback`.

### 4. `mqtt.subscribe("escuela/curso5/mensaje");`
Esta línea **suscribe al cliente al tópico específico** indicado.
*   Una vez conectado, el broker reenviará al ESP32 todos los mensajes publicados en el tópico `"escuela/curso5/mensaje"`.
*   Cada vez que llegue un mensaje a este tópico, se ejecutará la función `recibirMensaje` definida anteriormente.

**Estructura típica de uso:**
Estas llamadas suelen realizarse dentro de la función `setup()` o en una función de inicialización, asegurando que la conexión WiFi esté activa previamente. El ciclo principal (`loop()`) debe llamar regularmente a `mqtt.loop()` para mantener la comunicación activa y procesar los mensajes pendientes.