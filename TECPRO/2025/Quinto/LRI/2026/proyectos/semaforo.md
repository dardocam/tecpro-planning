Claro, aquí tienes un firmware para ESP32 que implementa un **semáforo de tres colores** controlado por MQTT, **sin usar máquina de estados finitos**. Toda la lógica se maneja con variables simples, banderas booleanas y condicionales `if/else`, lo que hace el código más directo y fácil de entender.

## Características
- Controla tres LEDs (rojo, amarillo, verde) conectados a pines digitales.
- Funciona en **modo automático** (ciclo normal) por defecto.
- Puede recibir comandos MQTT para:
  - Forzar un color específico (modo manual).
  - Volver al modo automático.
  - Activar/desactivar parpadeo de emergencia.
- Publica el estado actual (color activo) cada vez que cambia.
- Reconexión automática a WiFi y al broker MQTT.

## Conexiones
| LED      | Pin ESP32 |
|----------|-----------|
| Rojo     | GPIO 25   |
| Amarillo | GPIO 26   |
| Verde    | GPIO 27   |

Cada LED con su resistencia limitadora (220 Ω) a GND.

## Código completo

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

// ------------------------- Configuración WiFi y MQTT -------------------------
const char* ssid = "TU_SSID";
const char* password = "TU_PASSWORD";
const char* mqtt_server = "192.168.1.100";  // IP del broker MQTT
const int mqtt_port = 1883;

// Tópicos MQTT
const char* TOPIC_CONTROL = "semaforo/control";   // Recibe comandos
const char* TOPIC_ESTADO  = "semaforo/estado";    // Publica estado
const char* TOPIC_MODO    = "semaforo/modo";      // Publica modo actual

// ------------------------- Pines de LEDs -------------------------
#define LED_ROJO     25
#define LED_AMARILLO 26
#define LED_VERDE    27

// ------------------------- Variables de control (sin FSM) -------------------------
int fase = 0;                 // 0 = rojo, 1 = amarillo, 2 = verde
bool modoManual = false;      // true si MQTT fija el color
bool parpadeo = false;        // true para modo intermitente

// Tiempos de cada fase (en milisegundos)
const unsigned long durRojo     = 5000;
const unsigned long durAmarillo = 2000;
const unsigned long durVerde    = 5000;
const unsigned long durParpadeo = 500;   // medio segundo encendido/apagado

// Temporizadores
unsigned long ultimoCambio = 0;        // para cambios automáticos
unsigned long ultimoParpadeo = 0;      // para alternar en parpadeo

// Variables para publicación MQTT
String ultimoColorPublicado = "";      // evita publicar repetido

// ------------------------- Cliente WiFi y MQTT -------------------------
WiFiClient espClient;
PubSubClient client(espClient);

// ------------------------- Prototipos de funciones -------------------------
void conectarWiFi();
void conectarMQTT();
void callback(char* topic, byte* payload, unsigned int length);
void actualizarLEDs();
void publicarEstado();
void publicarModo();

// =============================== SETUP ===============================
void setup() {
  Serial.begin(115200);
  
  // Configurar pines como salida
  pinMode(LED_ROJO, OUTPUT);
  pinMode(LED_AMARILLO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
  
  // Inicialmente apagar todos los LEDs
  digitalWrite(LED_ROJO, LOW);
  digitalWrite(LED_AMARILLO, LOW);
  digitalWrite(LED_VERDE, LOW);
  
  // Conectar WiFi y MQTT
  conectarWiFi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  
  ultimoCambio = millis();  // iniciar temporizador
  Serial.println("Semáforo listo (sin máquina de estados)");
}

// =============================== LOOP ===============================
void loop() {
  // Mantener conexión MQTT
  if (!client.connected()) {
    conectarMQTT();
  }
  client.loop();  // procesar mensajes entrantes

  unsigned long ahora = millis();

  // ------------------------- LÓGICA PRINCIPAL -------------------------
  if (parpadeo) {
    // Modo intermitente: alternar el color activo entre amarillo y apagado
    if (ahora - ultimoParpadeo >= durParpadeo) {
      ultimoParpadeo = ahora;
      // Alternar entre amarillo encendido y apagado
      static bool amarilloEncendido = false;
      amarilloEncendido = !amarilloEncendido;
      digitalWrite(LED_ROJO, LOW);
      digitalWrite(LED_VERDE, LOW);
      digitalWrite(LED_AMARILLO, amarilloEncendido ? HIGH : LOW);
      // Publicar estado "PARPADEO"
      if (ultimoColorPublicado != "PARPADEO") {
        client.publish(TOPIC_ESTADO, "PARPADEO");
        ultimoColorPublicado = "PARPADEO";
        publicarModo();
      }
    }
    // No hay cambios automáticos de fase mientras parpadea
  }
  else if (modoManual) {
    // Modo manual: el color ya fue fijado por MQTT
    // Solo actualizar LEDs y publicar si es necesario
    actualizarLEDs();
    if (ultimoColorPublicado != String(fase)) {
      publicarEstado();
      publicarModo();
    }
  }
  else {
    // Modo automático: ciclo normal basado en tiempo
    if (fase == 0 && ahora - ultimoCambio >= durRojo) {
      fase = 1;  // pasar a amarillo
      ultimoCambio = ahora;
      actualizarLEDs();
      publicarEstado();
    }
    else if (fase == 1 && ahora - ultimoCambio >= durAmarillo) {
      fase = 2;  // pasar a verde
      ultimoCambio = ahora;
      actualizarLEDs();
      publicarEstado();
    }
    else if (fase == 2 && ahora - ultimoCambio >= durVerde) {
      fase = 0;  // pasar a rojo
      ultimoCambio = ahora;
      actualizarLEDs();
      publicarEstado();
    }
  }
}

// =============================== FUNCIONES ===============================

// Conectar a WiFi
void conectarWiFi() {
  Serial.print("Conectando a WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado. IP: " + WiFi.localIP().toString());
}

// Conectar al broker MQTT
void conectarMQTT() {
  while (!client.connected()) {
    Serial.print("Conectando a MQTT...");
    if (client.connect("ESP32_Semaforo")) {
      Serial.println("conectado");
      client.subscribe(TOPIC_CONTROL);  // suscribirse a comandos
      publicarModo();  // publicar modo inicial
    } else {
      Serial.print("fallo, rc=");
      Serial.print(client.state());
      Serial.println(" reintentando en 5s");
      delay(5000);
    }
  }
}

// Callback MQTT: se ejecuta al recibir un mensaje
void callback(char* topic, byte* payload, unsigned int length) {
  // Convertir payload a String
  String mensaje = "";
  for (unsigned int i = 0; i < length; i++) {
    mensaje += (char)payload[i];
  }
  mensaje.toUpperCase();  // normalizar a mayúsculas
  
  Serial.print("Mensaje recibido [");
  Serial.print(topic);
  Serial.print("]: ");
  Serial.println(mensaje);
  
  // Solo procesar tópico de control
  if (String(topic) == TOPIC_CONTROL) {
    if (mensaje == "ROJO") {
      fase = 0;
      modoManual = true;
      parpadeo = false;
      actualizarLEDs();
      publicarEstado();
      publicarModo();
    }
    else if (mensaje == "AMARILLO") {
      fase = 1;
      modoManual = true;
      parpadeo = false;
      actualizarLEDs();
      publicarEstado();
      publicarModo();
    }
    else if (mensaje == "VERDE") {
      fase = 2;
      modoManual = true;
      parpadeo = false;
      actualizarLEDs();
      publicarEstado();
      publicarModo();
    }
    else if (mensaje == "AUTO") {
      modoManual = false;
      parpadeo = false;
      ultimoCambio = millis();  // reiniciar temporizador
      actualizarLEDs();
      publicarEstado();
      publicarModo();
    }
    else if (mensaje == "PARPADEO") {
      parpadeo = !parpadeo;  // alternar modo parpadeo
      modoManual = false;    // el parpadeo tiene prioridad
      if (parpadeo) {
        // Al activar, apagar todos y encender amarillo al primer parpadeo
        ultimoParpadeo = millis();
        digitalWrite(LED_ROJO, LOW);
        digitalWrite(LED_VERDE, LOW);
        digitalWrite(LED_AMARILLO, HIGH);
        ultimoColorPublicado = "";
      } else {
        // Al desactivar, volver a modo automático
        ultimoCambio = millis();
        actualizarLEDs();
        publicarEstado();
        publicarModo();
      }
    }
  }
}

// Encender LEDs según la fase actual
void actualizarLEDs() {
  digitalWrite(LED_ROJO,    fase == 0 ? HIGH : LOW);
  digitalWrite(LED_AMARILLO, fase == 1 ? HIGH : LOW);
  digitalWrite(LED_VERDE,   fase == 2 ? HIGH : LOW);
}

// Publicar el color activo en el tópico de estado
void publicarEstado() {
  String color;
  if (fase == 0) color = "ROJO";
  else if (fase == 1) color = "AMARILLO";
  else color = "VERDE";
  
  client.publish(TOPIC_ESTADO, color.c_str());
  ultimoColorPublicado = color;
  Serial.println("Publicado estado: " + color);
}

// Publicar el modo actual (MANUAL, AUTO, PARPADEO)
void publicarModo() {
  String modo;
  if (parpadeo) modo = "PARPADEO";
  else if (modoManual) modo = "MANUAL";
  else modo = "AUTO";
  
  client.publish(TOPIC_MODO, modo.c_str());
  Serial.println("Publicado modo: " + modo);
}
```

## Explicación de la lógica sin máquina de estados

- **Variables globales** (`fase`, `modoManual`, `parpadeo`) almacenan el estado actual.
- **Condicionales `if/else`** deciden qué hacer en cada iteración del `loop()`, sin necesidad de un `enum` con `switch`.
- **Temporizadores** con `millis()` controlan los cambios de fase en modo automático.
- **Callback MQTT** actualiza directamente las variables, y el `loop()` reacciona en consecuencia.
- **Funciones auxiliares** (`actualizarLEDs`, `publicarEstado`, `publicarModo`) encapsulan acciones repetitivas.

## Prueba

1. Configurá tus credenciales WiFi y la IP del broker MQTT.
2. Cargá el firmware en tu ESP32.
3. Desde cualquier cliente MQTT (ej. MQTT Explorer, mosquitto_pub) podés enviar:
   - `semaforo/control` ← `ROJO`, `AMARILLO`, `VERDE`, `AUTO`, `PARPADEO`
4. Observá los tópicos `semaforo/estado` y `semaforo/modo` para ver las publicaciones.

Este enfoque es perfecto para proyectos de tamaño moderado, y si luego necesitás más funcionalidades, podés refactorizar a una máquina de estados sin mucho esfuerzo. ¡Listo para usar!



----
# PLANTILLA

Aquí tienes una **plantilla/framework base para ESP32** diseñada con buenas prácticas, totalmente no bloqueante (basada en `millis()`), modular y lista para expandir. Incluye:

- Programador de tareas simple (tareas periódicas con diferentes intervalos)
- Manejo de botones con antirrebote
- Control de LEDs con temporizadores
- Conexión WiFi y MQTT con reconexión automática
- Máquina de estados opcional para el modo de operación
- Separación de responsabilidades en funciones y variables globales claras
- Comentarios detallados para que sirva de punto de partida en cualquier proyecto

## Estructura conceptual

```
setup()
  ├── Inicializar Serial
  ├── Inicializar pines
  ├── Conectar WiFi
  ├── Configurar MQTT
  └── Inicializar tareas

loop()
  ├── Verificar conexiones (WiFi/MQTT)
  ├── Procesar MQTT
  ├── Scheduler: ejecutar tareas si toca
  └── Otras lógicas (máquina de estados)
```

## Código completo (archivo único .ino)

```cpp
// ============================================================
//  PLANTILLA FRAMEWORK PARA ESP32
//  - No bloqueante (usa millis())
//  - Scheduler de tareas simple
//  - WiFi + MQTT con reconexión automática
//  - Manejo de botones con antirrebote
//  - Máquina de estados para modo de operación
//  - LEDs de ejemplo
// ============================================================

#include <WiFi.h>
#include <PubSubClient.h>

// ------------------------- CONFIGURACIÓN GENERAL -------------------------
#define DEBUG_SERIAL 115200   // Velocidad del monitor serie

// Pines
const int LED_ROJO      = 25;
const int LED_AMARILLO  = 26;
const int LED_VERDE     = 27;
const int BOTON_1       = 13;

// ------------------------- CONFIGURACIÓN WiFi -------------------------
const char* WIFI_SSID     = "TU_SSID";
const char* WIFI_PASSWORD = "TU_PASSWORD";

// ------------------------- CONFIGURACIÓN MQTT -------------------------
const char* MQTT_SERVER   = "192.168.1.100";
const int   MQTT_PORT     = 1883;
const char* MQTT_CLIENT_ID = "ESP32_Plantilla";

// Tópicos
const char* TOPIC_ENTRADA = "plantilla/entrada";
const char* TOPIC_SALIDA  = "plantilla/salida";

// ------------------------- CLIENTES WiFi/MQTT -------------------------
WiFiClient   clienteWifi;
PubSubClient clienteMqtt(clienteWifi);

// ------------------------- VARIABLES GLOBALES -------------------------
// Máquina de estados (modo de operación)
enum ModoOperacion {
  MODO_AUTOMATICO,
  MODO_MANUAL,
  MODO_EMERGENCIA
};
ModoOperacion modoActual = MODO_AUTOMATICO;

// Control de tiempo para tareas
unsigned long tareaLEDRojo_Ultimo   = 0;
const unsigned long INTERVALO_ROJO  = 5000;
unsigned long tareaLEDAmar_Ultimo   = 0;
const unsigned long INTERVALO_AMAR  = 2000;
unsigned long tareaLEDVerde_Ultimo  = 0;
const unsigned long INTERVALO_VERDE = 5000;

// Tarea de publicación MQTT
unsigned long tareaPublicar_Ultimo  = 0;
const unsigned long INTERVALO_PUBLICAR = 10000;

// Botón (antirrebote)
bool botonEstadoAnterior = HIGH;
bool botonEstadoActual   = HIGH;
unsigned long botonUltimoRebote = 0;
const unsigned long DEBOUNCE_DELAY = 50;

// Función de callback MQTT (se ejecuta al recibir mensaje)
void callbackMqtt(char* topic, byte* payload, unsigned int length) {
  String mensaje = "";
  for (unsigned int i = 0; i < length; i++) {
    mensaje += (char)payload[i];
  }
  Serial.print("Mensaje MQTT recibido en [");
  Serial.print(topic);
  Serial.print("]: ");
  Serial.println(mensaje);

  // Procesar comandos simples
  if (String(topic) == TOPIC_ENTRADA) {
    if (mensaje == "AUTO") {
      modoActual = MODO_AUTOMATICO;
      Serial.println("Modo automático activado");
    } else if (mensaje == "MANUAL") {
      modoActual = MODO_MANUAL;
      Serial.println("Modo manual activado");
    } else if (mensaje == "EMERGENCIA") {
      modoActual = MODO_EMERGENCIA;
      Serial.println("Modo emergencia activado");
    }
  }
}

// ------------------------- CONEXIÓN WiFi -------------------------
void conectarWiFi() {
  Serial.print("Conectando a WiFi ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado. IP: " + WiFi.localIP().toString());
}

// ------------------------- CONEXIÓN MQTT -------------------------
void conectarMqtt() {
  while (!clienteMqtt.connected()) {
    Serial.print("Conectando a MQTT...");
    if (clienteMqtt.connect(MQTT_CLIENT_ID)) {
      Serial.println("conectado");
      clienteMqtt.subscribe(TOPIC_ENTRADA);
      // Publicar mensaje inicial
      clienteMqtt.publish(TOPIC_SALIDA, "Arranque completo");
    } else {
      Serial.print("fallo, rc=");
      Serial.print(clienteMqtt.state());
      Serial.println(" reintentando en 5 segundos");
      delay(5000);
    }
  }
}

// ------------------------- FUNCIONES DE TAREAS -------------------------
// Tarea: cambiar a rojo (solo en modo automático)
void tareaLEDRojo() {
  if (modoActual == MODO_AUTOMATICO) {
    digitalWrite(LED_ROJO, HIGH);
    digitalWrite(LED_AMARILLO, LOW);
    digitalWrite(LED_VERDE, LOW);
  }
}

void tareaLEDAmarillo() {
  if (modoActual == MODO_AUTOMATICO) {
    digitalWrite(LED_ROJO, LOW);
    digitalWrite(LED_AMARILLO, HIGH);
    digitalWrite(LED_VERDE, LOW);
  }
}

void tareaLEDVerde() {
  if (modoActual == MODO_AUTOMATICO) {
    digitalWrite(LED_ROJO, LOW);
    digitalWrite(LED_AMARILLO, LOW);
    digitalWrite(LED_VERDE, HIGH);
  }
}

// Tarea: publicar estado por MQTT
void tareaPublicarEstado() {
  String estado = "";
  if (modoActual == MODO_AUTOMATICO) estado = "AUTOMATICO";
  else if (modoActual == MODO_MANUAL) estado = "MANUAL";
  else if (modoActual == MODO_EMERGENCIA) estado = "EMERGENCIA";
  clienteMqtt.publish(TOPIC_SALIDA, estado.c_str());
  Serial.print("Publicado estado: ");
  Serial.println(estado);
}

// ------------------------- SCHEDULER (ejecuta tareas por intervalo) -------------------------
void ejecutarScheduler() {
  unsigned long ahora = millis();

  // Tarea LED Rojo
  if (ahora - tareaLEDRojo_Ultimo >= INTERVALO_ROJO) {
    tareaLEDRojo_Ultimo = ahora;
    tareaLEDRojo();
  }

  // Tarea LED Amarillo
  if (ahora - tareaLEDAmar_Ultimo >= INTERVALO_AMAR) {
    tareaLEDAmar_Ultimo = ahora;
    tareaLEDAmarillo();
  }

  // Tarea LED Verde
  if (ahora - tareaLEDVerde_Ultimo >= INTERVALO_VERDE) {
    tareaLEDVerde_Ultimo = ahora;
    tareaLEDVerde();
  }

  // Tarea publicación MQTT
  if (ahora - tareaPublicar_Ultimo >= INTERVALO_PUBLICAR) {
    tareaPublicar_Ultimo = ahora;
    tareaPublicarEstado();
  }
}

// ------------------------- MANEJO DE BOTONES -------------------------
void leerBotones() {
  bool lectura = digitalRead(BOTON_1);
  if (lectura != botonEstadoAnterior) {
    botonUltimoRebote = millis();
  }
  if ((millis() - botonUltimoRebote) > DEBOUNCE_DELAY) {
    if (lectura != botonEstadoActual) {
      botonEstadoActual = lectura;
      if (botonEstadoActual == LOW) {  // Pulsación detectada (flanco de bajada)
        // Alternar entre modo manual y automático
        if (modoActual == MODO_AUTOMATICO) {
          modoActual = MODO_MANUAL;
          Serial.println("Botón: pasando a MANUAL");
          // Apagar todos los LEDs
          digitalWrite(LED_ROJO, LOW);
          digitalWrite(LED_AMARILLO, LOW);
          digitalWrite(LED_VERDE, LOW);
        } else if (modoActual == MODO_MANUAL) {
          modoActual = MODO_AUTOMATICO;
          Serial.println("Botón: pasando a AUTOMATICO");
          // Reiniciar temporizadores para que arranque en fase correcta
          tareaLEDRojo_Ultimo = millis();
          tareaLEDAmar_Ultimo = millis();
          tareaLEDVerde_Ultimo = millis();
        }
      }
    }
  }
  botonEstadoAnterior = lectura;
}

// ------------------------- SETUP -------------------------
void setup() {
  Serial.begin(DEBUG_SERIAL);
  Serial.println("Iniciando plantilla ESP32...");

  // Configurar pines
  pinMode(LED_ROJO, OUTPUT);
  pinMode(LED_AMARILLO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(BOTON_1, INPUT_PULLUP);

  // Inicialmente apagar LEDs
  digitalWrite(LED_ROJO, LOW);
  digitalWrite(LED_AMARILLO, LOW);
  digitalWrite(LED_VERDE, LOW);

  // Conexiones
  conectarWiFi();
  clienteMqtt.setServer(MQTT_SERVER, MQTT_PORT);
  clienteMqtt.setCallback(callbackMqtt);
  conectarMqtt();

  // Inicializar temporizadores (para que las tareas comiencen a contar)
  tareaLEDRojo_Ultimo   = millis();
  tareaLEDAmar_Ultimo   = millis();
  tareaLEDVerde_Ultimo  = millis();
  tareaPublicar_Ultimo  = millis();

  Serial.println("Plantilla lista.");
}

// ------------------------- LOOP PRINCIPAL -------------------------
void loop() {
  // Mantener conexión WiFi y MQTT
  if (WiFi.status() != WL_CONNECTED) {
    conectarWiFi();
  }
  if (!clienteMqtt.connected()) {
    conectarMqtt();
  }
  clienteMqtt.loop();   // Procesar mensajes MQTT entrantes

  // Leer botones
  leerBotones();

  // Ejecutar tareas programadas
  ejecutarScheduler();

  // Otras lógicas no periódicas pueden ir aquí (ej. modos especiales)
  if (modoActual == MODO_EMERGENCIA) {
    // Parpadeo de emergencia
    static unsigned long ultimoParpadeo = 0;
    static bool parpadeoEstado = false;
    if (millis() - ultimoParpadeo >= 500) {
      ultimoParpadeo = millis();
      parpadeoEstado = !parpadeoEstado;
      digitalWrite(LED_ROJO, parpadeoEstado);
      digitalWrite(LED_AMARILLO, !parpadeoEstado);
      digitalWrite(LED_VERDE, parpadeoEstado);
    }
  }
}
```

## Cómo usar esta plantilla

1. **Copiá el código** en un nuevo sketch de Arduino IDE.
2. **Configurá** los parámetros de WiFi y MQTT.
3. **Adaptá los pines** y los tópicos a tu proyecto.
4. **Añadí o quitá tareas** en el scheduler según necesites.
5. **Expandí la máquina de estados** (`ModoOperacion`) si tu proyecto crece.

## Ventajas de esta plantilla

- ✅ **No bloqueante:** nunca usa `delay()` dentro del `loop()`, excepto en las funciones de conexión inicial (es aceptable porque el dispositivo aún no está operativo).
- ✅ **Modular:** cada tarea es una función independiente, fácil de modificar o eliminar.
- ✅ **Escalable:** podés agregar más tareas simplemente añadiendo variables de tiempo y condicionales en `ejecutarScheduler()`.
- ✅ **Manejo de conexiones robusto:** reconexión automática a WiFi y MQTT.
- ✅ **Botones con antirrebote:** listo para integrar entrada de usuario.
- ✅ **Máquina de estados opcional:** muestra cómo organizar modos de operación de manera clara.

## Posibles mejoras futuras

- Dividir en múltiples archivos (`.h`, `.cpp`) para proyectos grandes.
- Implementar un scheduler basado en lista de tareas con callback.
- Usar `Preferences` para guardar configuración en flash.
- Añadir OTA (actualización por WiFi).

Esta plantilla te da una base sólida y profesional para comenzar cualquier proyecto con ESP32. ¡Adaptala a tus necesidades!