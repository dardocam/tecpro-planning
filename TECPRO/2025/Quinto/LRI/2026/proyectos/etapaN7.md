# 🚦 Sincronización de semáforos vía MQTT + NTP

## ¿Qué cambia?
- Se agrega un **topic común** `semaforo/sync` al que **los 3 ESP32 están suscritos**.
- Cuando llega `PARPADEO` a ese topic, los 3 ESP32:
  1. Entran en **parpadeo amarillo**.
  2. Consultan la **hora NTP** (usando `configTime` del core ESP32, sin librerías extra).
  3. Calculan **el mismo instante de arranque** (alineado a múltiplos de `SYNC_PERIOD` segundos).
  4. Al llegar ese instante, **todos reinician la secuencia principal al mismo tiempo**.
- El topic `semaforo/i/set` sigue funcionando igual (solo afecta a ese semáforo).

## 📡 Topics

| Topic | Quién lo usa | Efecto |
|---|---|---|
| `semaforo/1/estado` | ESP32 → Broker | Estado actual del semáforo 1 |
| `semaforo/1/set` | Broker → ESP32 #1 | Comando individual |
| **`semaforo/sync`** | **Broker → los 3 ESP32** | **`PARPADEO` → todos parpadean y arrancan juntos** |

---

## 💻 Código

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>
#include <time.h>                       // <-- del core, para NTP

// ================= CONFIGURA ESTO =================
#define ID_SEMAFORO 1                   // <-- 1, 2 o 3

const char* WIFI_SSID   = "TU_WIFI";
const char* WIFI_PASS   = "TU_PASSWORD";
const char* MQTT_SERVER = "192.168.1.100";
const int   MQTT_PORT   = 1883;

const char* NTP_SERVER  = "pool.ntp.org";
const long  GMT_OFFSET  = -3 * 3600;    // Argentina (UTC-3)
const int   DST_OFFSET  = 0;

// ================= HARDWARE =================
#define PIN_LEDS 5
#define NUM_LEDS 3

// Tiempos (ms)
#define T_ROJO      5000
#define T_VERDE     5000
#define T_AMARILLO  2000
#define T_BLINK      400        // velocidad del parpadeo

// Sincronización
#define SYNC_PERIOD  10         // segundos (los arranques caen en múltiplos de esto)
#define T_PARPADEO   6          // segundos mínimos de parpadeo antes de arrancar

// ================= OBJETOS =================
WiFiClient   esp;
PubSubClient mqtt(esp);
Adafruit_NeoPixel tira(NUM_LEDS, PIN_LEDS, NEO_GRB + NEO_KHZ800);

// ================= ESTADOS =================
enum Estado { ROJO = 0, AMARILLO, VERDE, PARPADEO };

Estado        estado        = ROJO;
unsigned long ultimoCambio  = 0;
unsigned long ultimoBlink   = 0;
bool          ledEncendido  = true;

// Sincronización NTP
bool   sincronizando = false;
time_t epochArranque = 0;

uint32_t colorLed[3];

char topicEstado[25];
char topicComando[25];
const char* topicSync = "semaforo/sync";

// ================= AUXILIARES =================
const char* nombre(Estado e) {
  switch (e) {
    case ROJO:     return "ROJO";
    case AMARILLO: return "AMARILLO";
    case VERDE:    return "VERDE";
    case PARPADEO: return "PARPADEO";
  }
  return "?";
}

void pintar() {
  for (int j = 0; j < 3; j++)
    tira.setPixelColor(j, (j == (int)estado) ? colorLed[j] : 0);
  tira.show();
}

void pintarBlink() {
  tira.setPixelColor(0, 0);
  tira.setPixelColor(1, ledEncendido ? colorLed[1] : 0);
  tira.setPixelColor(2, 0);
  tira.show();
}

void publicar() {
  mqtt.publish(topicEstado, nombre(estado), true);
}

// Cambio de estado normal (sin sincronización)
void cambiar(Estado nuevo) {
  estado = nuevo;
  ultimoCambio = millis();
  pintar();
  publicar();
}

// Inicia un parpadeo con arranque sincronizado por NTP
void iniciarSincronizacion() {
  time_t ahora = time(nullptr);
  if (ahora < 100000) {                 // aún sin hora válida
    Serial.println("Sin hora NTP, no se puede sincronizar");
    return;
  }

  // Próximo múltiplo de SYNC_PERIOD, con al menos T_PARPADEO segundos por delante
  time_t arranque = ((ahora / SYNC_PERIOD) + 1) * SYNC_PERIOD;
  while (arranque - ahora < T_PARPADEO + 1) arranque += SYNC_PERIOD;

  epochArranque = arranque;
  sincronizando = true;
  estado        = PARPADEO;
  ledEncendido  = true;
  ultimoBlink   = millis();
  pintarBlink();
  publicar();

  Serial.printf("Sincronizando: arranque en epoch %ld (en %ld s)\n",
                (long)arranque, (long)(arranque - ahora));
}

// ================= MQTT =================
void alRecibir(char* topic, byte* payload, unsigned int len) {
  String msg;
  for (unsigned int i = 0; i < len; i++) msg += (char)payload[i];
  msg.toUpperCase();
  msg.trim();

  Serial.printf("[%s] -> %s\n", topic, msg.c_str());

  // Topic común: sincroniza los 3 ESP32
  if (String(topic) == topicSync) {
    if (msg == "PARPADEO" || msg == "BLINK" || msg == "SYNC") {
      iniciarSincronizacion();
    }
    return;
  }

  // Topic individual: solo afecta a este semáforo
  if (msg == "PARPADEO" || msg == "BLINK") {
    iniciarSincronizacion();           // también dispara parpadeo + NTP
  } else if (msg == "ROJO"     || msg == "RED")    cambiar(ROJO);
  else if (msg == "AMARILLO" || msg == "YELLOW")   cambiar(AMARILLO);
  else if (msg == "VERDE"    || msg == "GREEN")    cambiar(VERDE);
  else Serial.println("Comando no reconocido");
}

void conectarWiFi() {
  Serial.print("Conectando WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println(" OK -> " + WiFi.localIP().toString());
}

void sincronizarNTP() {
  Serial.print("Sincronizando hora NTP");
  configTime(GMT_OFFSET, DST_OFFSET, NTP_SERVER);
  struct tm info;
  while (!getLocalTime(&info)) { delay(500); Serial.print("."); }
  Serial.printf(" OK -> %02d:%02d:%02d\n", info.tm_hour, info.tm_min, info.tm_sec);
}

void conectarMQTT() {
  while (!mqtt.connected()) {
    Serial.print("Conectando MQTT...");
    String id = "ESP32-Semaforo-" + String(ID_SEMAFORO);
    if (mqtt.connect(id.c_str())) {
      Serial.println(" OK");
      mqtt.subscribe(topicComando);
      mqtt.subscribe(topicSync);        // <-- suscripción al topic común
      publicar();
    } else {
      Serial.println(" falló, reintento en 2s");
      delay(2000);
    }
  }
}

// ================= SETUP =================
void setup() {
  Serial.begin(115200);

  sprintf(topicEstado,  "semaforo/%d/estado", ID_SEMAFORO);
  sprintf(topicComando, "semaforo/%d/set",    ID_SEMAFORO);

  tira.begin();
  tira.setBrightness(80);
  tira.clear();
  tira.show();

  colorLed[0] = tira.Color(255,   0, 0);
  colorLed[1] = tira.Color(255, 180, 0);
  colorLed[2] = tira.Color(  0, 255, 0);

  estado       = ROJO;
  ultimoCambio = millis();
  pintar();

  conectarWiFi();
  sincronizarNTP();                     // <-- hora correcta antes de MQTT

  mqtt.setServer(MQTT_SERVER, MQTT_PORT);
  mqtt.setCallback(alRecibir);
  conectarMQTT();
}

// ================= LOOP =================
void loop() {
  if (WiFi.status() != WL_CONNECTED) conectarWiFi();
  if (!mqtt.connected())             conectarMQTT();
  mqtt.loop();

  unsigned long ahora = millis();

  // ---------- Modo PARPADEO + sincronización NTP ----------
  if (estado == PARPADEO) {
    if (ahora - ultimoBlink >= T_BLINK) {
      ultimoBlink  = ahora;
      ledEncendido = !ledEncendido;
      pintarBlink();
    }

    // ¿Llegó el instante acordado?
    if (sincronizando && time(nullptr) >= epochArranque) {
      sincronizando = false;
      Serial.println(">>> Arranque sincronizado");
      cambiar(ROJO);                    // todos arrancan en ROJO a la vez
    }
    return;
  }

  // ---------- Secuencia principal ----------
  unsigned long t = ahora - ultimoCambio;
  if (estado == ROJO     && t >= T_ROJO)     cambiar(VERDE);
  if (estado == VERDE    && t >= T_VERDE)    cambiar(AMARILLO);
  if (estado == AMARILLO && t >= T_AMARILLO) cambiar(ROJO);
}
```

---

## 🔁 Flujo de la sincronización

1. Desde cualquier cliente MQTT publicas:
   ```
   mosquitto_pub -h 192.168.1.100 -t "semaforo/sync" -m "PARPADEO"
   ```
2. Los 3 ESP32 reciben el mensaje casi al mismo tiempo.
3. Cada uno consulta NTP y calcula:
   ```
   arranque = próximo múltiplo de SYNC_PERIOD (10 s)
              que deje al menos T_PARPADEO (6 s) de margen
   ```
   → **los 3 llegan al mismo número** (por ejemplo epoch `1696800000`).
4. Los 3 parpadean en amarillo hasta que `time() >= arranque`.
5. En ese segundo, los 3 pasan a **ROJO** y arrancan la secuencia principal **perfectamente alineados**.

---

## 🧪 Pruebas

**Monitorear los 3 estados:**
```
mosquitto_sub -h 192.168.1.100 -t "semaforo/+/estado" -v
```

**Disparar la sincronización global:**
```
mosquitto_pub -h 192.168.1.100 -t "semaforo/sync" -m "PARPADEO"
```

Verás en el monitor serie de cada ESP32 algo como:
```
[Semaforo/sync] -> PARPADEO
Sincronizando: arranque en epoch 1728563400 (en 13 s)
>>> Arranque sincronizado
```

Y en el MQTT:
```
semaforo/1/estado PARPADEO
semaforo/2/estado PARPADEO
semaforo/3/estado PARPADEO
semaforo/1/estado ROJO      <-- los 3 al mismo tiempo
semaforo/2/estado ROJO
semaforo/3/estado ROJO
```

---

## ⚙️ Ajustes rápidos

| Macro | Qué controla |
|---|---|
| `SYNC_PERIOD` | Cada cuántos segundos caen los arranques sincronizados (10 s) |
| `T_PARPADEO` | Tiempo mínimo de parpadeo antes de arrancar (6 s) |
| `T_BLINK` | Velocidad del parpadeo (400 ms) |
| `NTP_SERVER` | Servidor NTP (podés usar `time.google.com` si falla) |
| `GMT_OFFSET` | Huso horario (ajustá según tu país) |

## ✅ Por qué funciona bien
- **NTP** garantiza que los 3 ESP32 tengan la misma hora exacta (diferencia < 50 ms).
- **Alineación a múltiplos** de `SYNC_PERIOD` garantiza que todos calculen el **mismo instante** aunque el mensaje MQTT llegue con pequeños retardos.
- **`T_PARPADEO`** da margen para que todos reciban el mensaje antes de arrancar.
- El parpadeo **no bloquea** el loop → el `mqtt.loop()` sigue corriendo y no se pierde WiFi.
- **Solo se agregó `time.h`** (del core ESP32) → se respetan las 3 librerías pedidas.