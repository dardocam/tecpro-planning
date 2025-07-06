## 📡 **Unidad 3: Comunicación IoT y Visualización Remota**

**🎯 Objetivo del módulo:**
Lograr que el estudiante conecte un microcontrolador a internet, pueda enviar y visualizar datos de sensores en tiempo real utilizando protocolos de comunicación, servicios en la nube y herramientas web.

---

### 📘 **Tema 13 – Fundamentos de la Comunicación IoT**

**🎓 Teoría**

* ¿Qué es el Internet de las Cosas (IoT)?
* Elementos de una arquitectura IoT:

  * Dispositivos físicos
  * Conectividad
  * Plataforma remota / Cloud
  * Interfaz de usuario
* Protocolos comunes:

  * HTTP / REST
  * MQTT (enfoque en mensajería ligera)

**🔧 Práctica**

* Análisis de un caso real (ej. riego automático, estación meteorológica).
* Simulación en papel de una arquitectura IoT simple con ESP32 + WiFi + Broker MQTT.

---

### 🔌 **Tema 14 – Envío de Datos a la Nube con HTTP**

**🎓 Teoría**

* ¿Qué es una API REST?
* Métodos principales: `GET`, `POST`
* Estructura de una petición HTTP desde microcontrolador.
* Servicios gratuitos para pruebas:

  * ThingSpeak
  * IFTTT Webhooks
  * MockAPI / JSONBin

**🔧 Práctica**

* Código para realizar un `POST` HTTP desde ESP32 a una API (ejemplo: ThingSpeak).
* Enviar datos de temperatura cada 10 segundos.

```cpp
HTTPClient http;
http.begin("https://api.thingspeak.com/update?api_key=XYZ&field1=25.6");
int httpResponseCode = http.GET();
```

---

### 📤 **Tema 15 – Publicación de Datos con MQTT**

**🎓 Teoría**

* Qué es MQTT y por qué se utiliza en IoT.
* Conceptos: Broker, Topic, Cliente, QoS
* Comparativa entre MQTT y HTTP.
* Plataformas: Mosquitto, HiveMQ, Adafruit IO

**🔧 Práctica**

* Conexión a un broker público (ej. `broker.hivemq.com`)
* Publicar un dato de sensor a un `topic` usando la librería `PubSubClient`.
* Visualización en una herramienta MQTT (MQTT Explorer o consola web).

---

### 💬 **Tema 16 – Suscripción y Visualización de Datos**

**🎓 Teoría**

* Estructura de suscripción MQTT
* Uso del monitor serial para mostrar datos recibidos.
* Visualización web con paneles:

  * Node-RED
  * ThingSpeak Charts
  * Google Sheets vía IFTTT

**🔧 Práctica**

* Microcontrolador escucha datos desde otro (ej: envío de temperatura).
* Suscripción a un topic MQTT y cambio de estado de un LED según mensaje.
* Crear un gráfico en tiempo real con los datos enviados.

---

### 🕸 **Tema 17 – Interfaz Web Simple con HTML**

**🎓 Teoría**

* Fundamentos básicos de HTML
* Servidor web en el microcontrolador ESP32
* Mostrar datos en una página alojada localmente

**🔧 Práctica**

* Crear un servidor web básico en ESP32
* Mostrar valor de sensor en una página HTML

```cpp
server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send(200, "text/html", "<h1>Temperatura: 25.3 °C</h1>");
});
```

---

### 📱 **Tema 18 – Integración con Aplicaciones Móviles**

**🎓 Teoría**

* Herramientas no-code / low-code para vincular datos:

  * Blynk
  * IFTTT con Google Sheets
* Aplicaciones móviles como front-end del IoT

**🔧 Práctica**

* Uso de Blynk para mostrar datos en el celular.
* Crear botones en la app para enviar comandos al microcontrolador.

---

## 📦 Materiales Necesarios por Clase

| Clase | Materiales                                                  |
| ----- | ----------------------------------------------------------- |
| 13    | Pizarras, casos de uso, simulación con tarjetas y papel     |
| 14    | Acceso a internet, APIs públicas, ESP32 con sensor          |
| 15    | Broker público MQTT, librerías MQTT, consola MQTT           |
| 16    | Dos ESP32, LED, herramientas de visualización como Node-RED |
| 17    | Librerías `ESPAsyncWebServer`, conexión WiFi                |
| 18    | Celulares con app Blynk, acceso a IFTTT o servicios no-code |

---

## 📊 Evaluación de Unidad

**✔️ Prácticas con rúbrica por clase:**

* Código funcional
* Conexión y envío de datos
* Capacidad de diagnóstico

**🧪 Mini-proyecto final:**

* Crear un sistema de monitoreo ambiental que:

  * Lea datos de un sensor
  * Envíe los datos a la nube (MQTT o HTTP)
  * Permita visualizarlos remotamente en una web o app móvil

---

