# 🚦 Un semáforo por ESP32 + MQTT + NeoPixel

## ¿Qué cambia?
- Cada ESP32 controla **solo 1 semáforo** (3 LEDs NeoPixel).
- Se flashea el **mismo código** en los 3 ESP32, cambiando únicamente el `ID_SEMAFORO` (1, 2 o 3).
- Los topics ahora se generan solos según ese ID.

## 📡 Topics (según `ID_SEMAFORO`)
| Topic | Para qué |
|---|---|
| `semaforo/1/estado` | El ESP32 **publica** su estado actual |
| `semaforo/1/set` | Tú **envías** el estado que quieras |

(Si cambias `ID_SEMAFORO` a 2 o 3, los topics cambian solos.)

---

## 💻 Código

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>

// ================= CONFIGURA ESTO =================
#define ID_SEMAFORO 1        // <-- 1, 2 o 3 (uno distinto por cada ESP32)

const char* WIFI_SSID   = "TU_WIFI";
const char* WIFI_PASS   = "TU_PASSWORD";
const char* MQTT_SERVER = "192.168.1.100";
const int   MQTT_PORT   = 1883;

// ================= HARDWARE =================
#define PIN_LEDS 5
#define NUM_LEDS 3          // 3 LEDs: rojo, amarillo, verde

// Tiempos del ciclo (milisegundos)
#define T_ROJO     5000
#define T_VERDE    5000
#define T_AMARILLO 2000

// ================= OBJETOS =================
WiFiClient   esp;
PubSubClient mqtt(esp);
Adafruit_NeoPixel tira(NUM_LEDS, PIN_LEDS, NEO_GRB + NEO_KHZ800);

// ================= ESTADO =================
// 0 = ROJO, 1 = AMARILLO, 2 = VERDE
int           estado       = 0;
unsigned long ultimoCambio = 0;

uint32_t colorLed[3];

// Topics generados automáticamente según el ID
char topicEstado[25];
char topicComando[25];

// ================= FUNCIONES AUXILIARES =================
const char* nombre(int e) {
  if (e == 0) return "ROJO";
  if (e == 1) return "AMARILLO";
  return "VERDE";
}

// Enciende el LED del estado actual y apaga los otros dos
void pintar() {
  for (int j = 0; j < 3; j++) {
    tira.setPixelColor(j, (j == estado) ? colorLed[j] : 0);
  }
  tira.show();
}

// Publica el estado por MQTT
void publicar() {
  mqtt.publish(topicEstado, nombre(estado), true);
}

// Cambia el estado, pinta y avisa por MQTT
void cambiar(int nuevo) {
  estado = nuevo;
  ultimoCambio = millis();
  pintar();
  publicar();
}

// ================= MQTT =================
void alRecibir(char* topic, byte* payload, unsigned int len) {
  String msg;
  for (unsigned int i = 0; i < len; i++) msg += (char)payload[i];
  msg.toUpperCase();
  Serial.print("Recibido -> ");
  Serial.println(msg);

  if      (msg == "ROJO"     || msg == "RED")    cambiar(0);
  else if (msg == "AMARILLO" || msg == "YELLOW") cambiar(1);
  else if (msg == "VERDE"    || msg == "GREEN")  cambiar(2);
  else Serial.println("Comando no reconocido");
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
    String id = "ESP32-Semaforo-" + String(ID_SEMAFORO);
    if (mqtt.connect(id.c_str())) {
      Serial.println(" OK");
      mqtt.subscribe(topicComando);
      publicar();   // reporta el estado actual al conectar
    } else {
      Serial.println(" falló, reintento en 2s");
      delay(2000);
    }
  }
}

// ================= SETUP =================
void setup() {
  Serial.begin(115200);

  // Arma los topics según el ID del semáforo
  sprintf(topicEstado,  "semaforo/%d/estado", ID_SEMAFORO);
  sprintf(topicComando, "semaforo/%d/set",    ID_SEMAFORO);
  Serial.print("Estado:  "); Serial.println(topicEstado);
  Serial.print("Comando: "); Serial.println(topicComando);

  tira.begin();
  tira.setBrightness(80);
  tira.clear();
  tira.show();

  colorLed[0] = tira.Color(255,   0, 0);  // Rojo
  colorLed[1] = tira.Color(255, 180, 0);  // Amarillo
  colorLed[2] = tira.Color(  0, 255, 0);  // Verde

  // Desfase inicial según ID para que no cambien todos a la vez
  estado = 0;
  ultimoCambio = millis() - ((ID_SEMAFORO - 1) * 3000);
  pintar();

  conectarWiFi();
  mqtt.setServer(MQTT_SERVER, MQTT_PORT);
  mqtt.setCallback(alRecibir);
  conectarMQTT();
}

// ================= LOOP =================
void loop() {
  if (WiFi.status() != WL_CONNECTED) conectarWiFi();
  if (!mqtt.connected())             conectarMQTT();
  mqtt.loop();

  unsigned long t = millis() - ultimoCambio;

  if (estado == 0 && t >= T_ROJO)     cambiar(2); // ROJO -> VERDE
  if (estado == 2 && t >= T_VERDE)    cambiar(1); // VERDE -> AMARILLO
  if (estado == 1 && t >= T_AMARILLO) cambiar(0); // AMARILLO -> ROJO
}
```

---

## 🔧 Cómo usarlo con 3 ESP32

1. Flashea el **mismo código** en los 3 ESP32.
2. Cambia solo esta línea en cada uno:
   - ESP32 #1 → `#define ID_SEMAFORO 1`
   - ESP32 #2 → `#define ID_SEMAFORO 2`
   - ESP32 #3 → `#define ID_SEMAFORO 3`
3. Cablea en cada placa: `VCC → 5V`, `GND → GND`, `DIN → GPIO 5`, y los 3 LEDs en cadena.

## 🧪 Pruebas

Ver los 3 estados en vivo:
```
mosquitto_sub -h 192.168.1.100 -t "semaforo/+/estado" -v
```

Forzar un color desde otro cliente:
```
mosquitto_pub -h 192.168.1.100 -t "semaforo/2/set" -m "VERDE"
```

## ✅ Por qué funciona bien
- **Un solo código** para los 3 ESP32 → si arreglas algo, se arregla en todos.
- Los **topics se generan solos** a partir del `ID_SEMAFORO` → sin errores de tipeo.
- Al reconectar se **republica con `retain = true`** → el panel siempre muestra el estado real.
- Cada uno arranca **desfasado 3 s** según su ID → se ve que son independientes.
- Código corto (~110 líneas) y en español, fácil de explicar.