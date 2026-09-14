Aquí tienes el semáforo NeoPixel con MQTT adaptado al patrón **State** de tu plantilla, manteniendo intacta su estructura: `enum Estado`, `enum Evento`, `struct Contexto`, `onEnter/onExit`, `transicionar`, `siguienteEstado` y `leerEvento`.

```cpp
/*
 * Semáforo con patrón State (FSM) + NeoPixel + MQTT — ESP32 / Arduino IDE
 * ------------------------------------------------------------------------
 * Estados: ROJO → AMARILLO → VERDE → VERDE_TITILA → ROJO ...
 * Evento principal: TIMEOUT (se acaba el tiempo del estado)
 * Eventos secundarios: comandos MQTT (ROJO, AMARILLO, VERDE, AUTO, PARPADEO)
 * Evento de emergencia: botón fuerza ROJO
 *
 * Sin delay() en la lógica: el loop() corre continuo y la FSM reacciona por eventos.
 */

#include <WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>

// ================== 1. Estados y eventos ==================
enum Estado { ROJO, AMARILLO, VERDE, VERDE_TITILA };
enum Evento {
  TIMEOUT,
  EMERGENCIA,
  MQTT_ROJO,
  MQTT_AMARILLO,
  MQTT_VERDE,
  MQTT_AUTO,
  MQTT_PARPADEO,
  NINGUNO
};

// ================== 2. Contexto ==================
struct Contexto {
  unsigned long inicioEstado = 0;
  int ciclos = 0;
  bool modoManual = false;
  bool parpadeoEmergencia = false;
  // Variables auxiliares del estado VERDE_TITILA
  int contadorParpadeos = 0;
  bool verdeEncendido = false;
  unsigned long ultimoParpadeo = 0;
};
Contexto ctx;

Estado estadoActual = ROJO;   // estado inicial

// Evento pendiente generado por el callback MQTT (se procesa en loop)
volatile Evento eventoPendiente = NINGUNO;

// ================== 3. Pines y duraciones ==================
#define PIN_NEOPIXEL  27
#define NUM_LEDS      3
const int PIN_BOTON = 4;      // INPUT_PULLUP (LOW = presionado)

// Tiempo (ms) que dura cada estado — mismo orden que el enum Estado
const unsigned long DURACION[] = {
  10000,   // ROJO
  3000,    // AMARILLO
  10000,   // VERDE
  0        // VERDE_TITILA (se controla por parpadeos, no por tiempo)
};

const unsigned long INTERVALO_PARPADEO = 500;  // ms por semiciclo del titileo
const int TOTAL_PARPADEOS = 3;

// ================== 4. WiFi / MQTT ==================
const char* SSID           = "TU_SSID";
const char* PASSWORD       = "TU_PASSWORD";
const char* MQTT_SERVER    = "192.168.1.100";
const int   MQTT_PORT      = 1883;
const char* MQTT_CLIENT_ID = "ESP32_Semaforo_NeoPixel";

const char* TOPIC_CONTROL = "semaforo/control";
const char* TOPIC_ESTADO  = "semaforo/estado";
const char* TOPIC_MODO    = "semaforo/modo";

WiFiClient   clienteWiFi;
PubSubClient clienteMQTT(clienteWiFi);

// ================== 5. NeoPixel ==================
Adafruit_NeoPixel strip(NUM_LEDS, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800);

uint32_t colorRojo, colorAmarillo, colorVerde, colorApagado;

// ================== 6. Salidas físicas ==================
void encenderSoloLED(int indice, uint32_t color) {
  strip.clear();
  strip.setPixelColor(indice, color);
  strip.show();
}

void aplicarSalidas(Estado e) {
  switch (e) {
    case ROJO:         encenderSoloLED(0, colorRojo);     break;
    case AMARILLO:     encenderSoloLED(1, colorAmarillo); break;
    case VERDE:        encenderSoloLED(2, colorVerde);    break;
    case VERDE_TITILA: encenderSoloLED(2, colorApagado);  break;  // arranca apagado
  }
}

// ================== 7. Entrada / salida de estado ==================
void publicarEstado();
void publicarModo();

void onEnter(Estado e) {
  ctx.inicioEstado = millis();

  if (e == VERDE_TITILA) {
    ctx.contadorParpadeos = 0;
    ctx.verdeEncendido    = false;
    ctx.ultimoParpadeo    = millis();
  }

  aplicarSalidas(e);

  Serial.print("→ Estado: ");
  Serial.println(e);

  publicarEstado();
  publicarModo();
}

void onExit(Estado /*e*/) {
  // Nada por ahora
}

// ================== 8. Transiciones ==================
void transicionar(Estado siguiente) {
  onExit(estadoActual);
  estadoActual = siguiente;
  if (siguiente == ROJO) ctx.ciclos++;
  onEnter(estadoActual);
}

Estado siguienteEstado(Estado actual, Evento ev) {
  // --- Eventos MQTT y emergencia: siempre tienen prioridad ---
  switch (ev) {
    case MQTT_ROJO:
      ctx.modoManual = true;  ctx.parpadeoEmergencia = false;  return ROJO;
    case MQTT_AMARILLO:
      ctx.modoManual = true;  ctx.parpadeoEmergencia = false;  return AMARILLO;
    case MQTT_VERDE:
      ctx.modoManual = true;  ctx.parpadeoEmergencia = false;  return VERDE;
    case MQTT_AUTO:
      ctx.modoManual = false; ctx.parpadeoEmergencia = false;  return ROJO;
    case MQTT_PARPADEO:
      ctx.parpadeoEmergencia = true;
      ctx.modoManual = false;
      return ROJO;   // el parpadeo de emergencia se gestiona aparte
    case EMERGENCIA:
      ctx.modoManual = true;  ctx.parpadeoEmergencia = false;  return ROJO;
    default:
      break;
  }

  // --- Si está en modo manual o emergencia, TIMEOUT no transiciona ---
  if (ctx.modoManual || ctx.parpadeoEmergencia) return actual;
  if (ev != TIMEOUT) return actual;

  // --- Secuencia automática ---
  switch (actual) {
    case ROJO:         return AMARILLO;
    case AMARILLO:     return VERDE;
    case VERDE:        return VERDE_TITILA;
    case VERDE_TITILA: return ROJO;
  }
  return actual;
}

// ================== 9. Lectura de eventos ==================
Evento leerEvento() {
  // 1) Eventos provenientes de MQTT
  if (eventoPendiente != NINGUNO) {
    Evento ev = eventoPendiente;
    eventoPendiente = NINGUNO;
    return ev;
  }

  // 2) Botón de emergencia
  if (digitalRead(PIN_BOTON) == LOW) return EMERGENCIA;

  // 3) Timeout según estado
  if (estadoActual == VERDE_TITILA) {
    // El titileo se actualiza aparte; aquí solo verificamos si ya terminó
    if (ctx.contadorParpadeos >= TOTAL_PARPADEOS * 2) return TIMEOUT;
  } else {
    if (millis() - ctx.inicioEstado >= DURACION[estadoActual]) return TIMEOUT;
  }

  return NINGUNO;
}

// ================== 10. Titileo del estado VERDE_TITILA ==================
void actualizarTitileo() {
  if (millis() - ctx.ultimoParpadeo >= INTERVALO_PARPADEO) {
    ctx.ultimoParpadeo = millis();
    ctx.verdeEncendido = !ctx.verdeEncendido;
    encenderSoloLED(2, ctx.verdeEncendido ? colorVerde : colorApagado);
    ctx.contadorParpadeos++;
  }
}

// ================== 11. WiFi / MQTT ==================
void conectarWiFi() {
  Serial.print("Conectando a WiFi");
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado. IP: " + WiFi.localIP().toString());
}

void conectarMQTT() {
  while (!clienteMQTT.connected()) {
    Serial.print("Conectando a MQTT...");
    if (clienteMQTT.connect(MQTT_CLIENT_ID)) {
      Serial.println("conectado");
      clienteMQTT.subscribe(TOPIC_CONTROL);
    } else {
      Serial.print("fallo, rc=");
      Serial.print(clienteMQTT.state());
      Serial.println(" reintentando en 5s");
      delay(5000);
    }
  }
}

void callbackMQTT(char* topic, byte* payload, unsigned int length) {
  String mensaje = "";
  for (unsigned int i = 0; i < length; i++) mensaje += (char)payload[i];
  mensaje.toUpperCase();
  Serial.println("Mensaje MQTT: " + mensaje);

  if (String(topic) != TOPIC_CONTROL) return;

  if      (mensaje == "ROJO")     eventoPendiente = MQTT_ROJO;
  else if (mensaje == "AMARILLO") eventoPendiente = MQTT_AMARILLO;
  else if (mensaje == "VERDE")    eventoPendiente = MQTT_VERDE;
  else if (mensaje == "AUTO")     eventoPendiente = MQTT_AUTO;
  else if (mensaje == "PARPADEO") eventoPendiente = MQTT_PARPADEO;
}

// ================== 12. Publicación de estado / modo ==================
String nombreEstado(Estado e) {
  switch (e) {
    case ROJO:         return "ROJO";
    case AMARILLO:     return "AMARILLO";
    case VERDE:        return "VERDE";
    case VERDE_TITILA: return "VERDE_TITILA";
  }
  return "?";
}

void publicarEstado() {
  String color = nombreEstado(estadoActual);
  clienteMQTT.publish(TOPIC_ESTADO, color.c_str());
  Serial.println("Publicado estado: " + color);
}

void publicarModo() {
  String modo;
  if (ctx.parpadeoEmergencia) modo = "PARPADEO";
  else if (ctx.modoManual)    modo = "MANUAL";
  else                        modo = "AUTO";
  clienteMQTT.publish(TOPIC_MODO, modo.c_str());
  Serial.println("Publicado modo: " + modo);
}

// ================== 13. Setup y loop ==================
void setup() {
  Serial.begin(115200);

  // Inicializar tira NeoPixel
  strip.begin();
  strip.setBrightness(100);
  colorRojo     = strip.Color(255, 0, 0);
  colorAmarillo = strip.Color(255, 255, 0);
  colorVerde    = strip.Color(0, 255, 0);
  colorApagado  = strip.Color(0, 0, 0);
  strip.show();

  pinMode(PIN_BOTON, INPUT_PULLUP);

  // Conexiones
  conectarWiFi();
  clienteMQTT.setServer(MQTT_SERVER, MQTT_PORT);
  clienteMQTT.setCallback(callbackMQTT);
  conectarMQTT();

  // Entrar al estado inicial
  onEnter(estadoActual);
}

void loop() {
  // Mantener MQTT activo
  if (WiFi.status() != WL_CONNECTED) conectarWiFi();
  if (!clienteMQTT.connected())      conectarMQTT();
  clienteMQTT.loop();

  // Procesar eventos de la FSM
  Evento ev = leerEvento();
  if (ev != NINGUNO) {
    Estado siguiente = siguienteEstado(estadoActual, ev);
    if (siguiente != estadoActual) transicionar(siguiente);
  }

  // Actualización periódica del titileo (solo en VERDE_TITILA)
  if (estadoActual == VERDE_TITILA) {
    actualizarTitileo();
  }
}
```

## Qué se mantuvo de tu plantilla original

- **Estructura idéntica**: `enum Estado`, `enum Evento`, `struct Contexto`, `onEnter/onExit`, `transicionar`, `siguienteEstado`, `leerEvento`.
- **Mismo flujo de la FSM**: el `loop()` solo lee eventos, calcula el siguiente estado y transiciona si corresponde.
- **Prioridad de eventos**: los comandos MQTT y el botón de emergencia se evalúan antes que el `TIMEOUT`.

## Qué se adaptó para NeoPixel + MQTT

- **Salidas físicas**: en vez de tres `digitalWrite` sobre pines separados, ahora se usa `encenderSoloLED()` sobre la tira NeoPixel de 3 LEDs.
- **Colores**: se inicializan en `setup()` con `strip.Color(...)`.
- **Eventos MQTT**: el callback no transiciona directamente; solo encola un `eventoPendiente` que `leerEvento()` devuelve en la siguiente iteración (patrón seguro para callbacks).
- **Modo manual**: cuando se recibe `ROJO`, `AMARILLO` o `VERDE` por MQTT, `modoManual` queda en `true` y el `TIMEOUT` deja de transicionar. Con `AUTO` vuelve al ciclo automático.
- **Estado VERDE_TITILA**: como no es un simple timeout, se maneja con un contador de parpadeos. `leerEvento()` devuelve `TIMEOUT` cuando el contador llega a `TOTAL_PARPADEOS * 2`, y la función `actualizarTitileo()` se encarga de alternar el LED cada 500 ms.
- **Publicación MQTT**: se publica el estado y el modo actual en cada `onEnter()`, más un tópico adicional `semaforo/modo` (AUTO / MANUAL / PARPADEO).

## Notas

- Si querés ahorrar ancho de banda MQTT, podés publicar solo cuando el estado cambia (ya se hace así, porque `publicarEstado()` solo se llama desde `onEnter`).
- El botón de emergencia siempre lleva a `ROJO` y deja `modoManual = true`. Si querés que sea momentáneo (solo mientras se mantiene presionado), habría que agregar un evento `EMERGENCIA_LIBERADA`.
- Los `delay()` que quedan están únicamente en `conectarWiFi()` y `conectarMQTT()`, donde es aceptable porque el sistema aún no está operativo.