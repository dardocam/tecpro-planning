
## 📡 Topics
| Topic | Para qué |
|---|---|
| `semaforo/1/estado` | El ESP32 **publica** el estado actual |
| `semaforo/1/set` | Tú **envías** el estado que quieras |

(Sustituye `1` por `2` o `3` para los otros semáforos).

---

## 💻 Código

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>

// ---------- CONFIGURA ESTO ----------
const char* WIFI_SSID   = "TU_WIFI";
const char* WIFI_PASS   = "TU_PASSWORD";
const char* MQTT_SERVER = "192.168.1.100";
const int   MQTT_PORT   = 1883;

// ---------- HARDWARE ----------
#define PIN_LEDS 5
#define NUM_LEDS 9   // 3 semáforos x 3 LEDs

// Tiempos del ciclo (milisegundos)
#define T_ROJO     5000
#define T_VERDE    5000
#define T_AMARILLO 2000

// ---------- OBJETOS ----------
WiFiClient   esp;
PubSubClient mqtt(esp);
Adafruit_NeoPixel tira(NUM_LEDS, PIN_LEDS, NEO_GRB + NEO_KHZ800);

// ---------- ESTADO ----------
// 0 = ROJO, 1 = AMARILLO, 2 = VERDE
int           estado[3]      = {0, 0, 0};
unsigned long ultimoCambio[3] = {0, 0, 0};

// Colores de cada LED dentro de un semáforo
uint32_t colorLed[3];

// ---------- FUNCIONES AUXILIARES ----------
const char* nombre(int e) {
  if (e == 0) return "ROJO";
  if (e == 1) return "AMARILLO";
  return "VERDE";
}

// Enciende el LED correspondiente al estado y apaga los otros dos
void pintar(int i) {
  int base = i * 3;
  for (int j = 0; j < 3; j++) {
    tira.setPixelColor(base + j, (j == estado[i]) ? colorLed[j] : 0);
  }
  tira.show();
}

// Publica por MQTT el estado actual del semáforo i
void publicar(int i) {
  char topic[30];
  sprintf(topic, "semaforo/%d/estado", i + 1);
  mqtt.publish(topic, nombre(estado[i]), true);
}

// Cambia el estado del semáforo i y avisa por MQTT
void cambiar(int i, int nuevo) {
  estado[i] = nuevo;
  ultimoCambio[i] = millis();
  pintar(i);
  publicar(i);
}

// ---------- MQTT ----------
void alRecibir(char* topic, byte* payload, unsigned int len) {
  String msg;
  for (unsigned int i = 0; i < len; i++) msg += (char)payload[i];
  msg.toUpperCase();
  Serial.print("Recibido en "); Serial.print(topic);
  Serial.print(" -> "); Serial.println(msg);

  // Detecta a qué semáforo va dirigido (último carácter del topic)
  int i = String(topic).charAt(9) - '1';
  if (i < 0 || i > 2) return;

  if (msg == "ROJO" || msg == "RED")          cambiar(i, 0);
  else if (msg == "AMARILLO" || msg == "YELLOW") cambiar(i, 1);
  else if (msg == "VERDE" || msg == "GREEN")  cambiar(i, 2);
}

void conectarWiFi() {
  Serial.print("Conectando WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println(" OK -> " + WiFi.localIP().toString());
}

void conectarMQTT() {
  while (!mqtt.connected()) {
    Serial.print("Conectando MQTT...");
    String id = "ESP32-Semaforos-" + String(random(1000, 9999));
    if (mqtt.connect(id.c_str())) {
      Serial.println(" OK");
      // Se suscribe a los 3 topics de comando
      mqtt.subscribe("semaforo/1/set");
      mqtt.subscribe("semaforo/2/set");
      mqtt.subscribe("semaforo/3/set");
      // Publica el estado actual al conectarse
      for (int i = 0; i < 3; i++) publicar(i);
    } else {
      Serial.println(" falló, reintento en 2s");
      delay(2000);
    }
  }
}

// ---------- SETUP ----------
void setup() {
  Serial.begin(115200);

  tira.begin();
  tira.setBrightness(80);
  tira.clear();
  tira.show();

  colorLed[0] = tira.Color(255,   0, 0);  // Rojo
  colorLed[1] = tira.Color(255, 180, 0);  // Amarillo
  colorLed[2] = tira.Color(  0, 255, 0);  // Verde

  // Arranca cada semáforo en un momento distinto para que no vayan sincronizados
  for (int i = 0; i < 3; i++) {
    estado[i] = 0;
    ultimoCambio[i] = millis() - (i * 3000);
    pintar(i);
  }

  conectarWiFi();
  mqtt.setServer(MQTT_SERVER, MQTT_PORT);
  mqtt.setCallback(alRecibir);
  conectarMQTT();
}

// ---------- LOOP ----------
void loop() {
  if (WiFi.status() != WL_CONNECTED) conectarWiFi();
  if (!mqtt.connected())             conectarMQTT();
  mqtt.loop();

  unsigned long ahora = millis();

  for (int i = 0; i < 3; i++) {
    unsigned long t = ahora - ultimoCambio[i];

    if (estado[i] == 0 && t >= T_ROJO)     cambiar(i, 2); // ROJO -> VERDE
    if (estado[i] == 2 && t >= T_VERDE)    cambiar(i, 1); // VERDE -> AMARILLO
    if (estado[i] == 1 && t >= T_AMARILLO) cambiar(i, 0); // AMARILLO -> ROJO
  }
}
```

---

## 🔧 Resumen 

| Parte | Qué hace |
|---|---|
| `pintar(i)` | Enciende el LED correcto del semáforo `i` |
| `publicar(i)` | Manda el estado por MQTT (topic `semaforo/i/estado`) |
| `cambiar(i, nuevo)` | Cambia estado + pinta + publica (todo junto) |
| `alRecibir(...)` | Escucha los comandos `semaforo/i/set` |
| `loop()` | Cambia de color según el tiempo transcurrido |



## ✅ Por qué funciona bien
- Si se cae el WiFi o el broker, se reconecta solo.
- Al reconectar, republica el estado actual (`retain = true`) → el panel siempre muestra algo real.
- Los 3 semáforos van desfasados 3 segundos para que se note que son independientes.
- Código corto (~120 líneas) y con nombres en español para exponerlo fácil.