Claro. Este es el código completo, listo para copiar en el ESP32. Solo tenés que modificar el **nombre de la WiFi**, la **contraseña** y la **IP de la Raspberry Pi**.

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

// -------------------------
// CONFIGURACIÓN WiFi
// -------------------------
const char* ssid = "NOMBRE_WIFI";
const char* password = "CLAVE_WIFI";

// -------------------------
// CONFIGURACIÓN MQTT
// -------------------------
const char* mqtt_server = "192.168.10.50";
const int mqtt_port = 1883;

const char* topic = "laboratorio/esp32/mensaje";

// -------------------------
// OBJETOS
// -------------------------
WiFiClient espClient;
PubSubClient mqtt(espClient);

// -------------------------
// TEMPORIZADOR
// -------------------------
unsigned long anterior = 0;

// -------------------------
// CONEXIÓN WiFi
// -------------------------
void conectarWiFi() {

  Serial.print("Conectando a WiFi");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {

    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi conectado");

  Serial.print("IP del ESP32: ");
  Serial.println(WiFi.localIP());
}

// -------------------------
// MENSAJE RECIBIDO
// -------------------------
void mensajeRecibido(char* topic, byte* payload, unsigned int length) {

  Serial.print("Mensaje recibido: ");

  for (unsigned int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }

  Serial.println();
}

// -------------------------
// CONEXIÓN MQTT
// -------------------------
void conectarMQTT() {

  while (!mqtt.connected()) {

    Serial.print("Conectando al broker MQTT...");

    String clientId = "ESP32-";
    clientId += String(random(0xffff), HEX);

    if (mqtt.connect(clientId.c_str())) {

      Serial.println(" conectado");

      mqtt.subscribe(topic);

      Serial.print("Suscripto a: ");
      Serial.println(topic);

    } else {

      Serial.print("Error MQTT. Estado: ");
      Serial.println(mqtt.state());

      delay(2000);
    }
  }
}

// -------------------------
// PUBLICAR MENSAJE
// -------------------------
void publicarMensaje() {

  const char* mensaje = "Hola desde ESP32";

  mqtt.publish(topic, mensaje);

  Serial.print("Mensaje enviado: ");
  Serial.println(mensaje);
}

// -------------------------
// SETUP
// -------------------------
void setup() {

  Serial.begin(115200);

  delay(1000);

  Serial.println();
  Serial.println("===== ESP32 + MQTT =====");

  // Conectar WiFi
  conectarWiFi();

  // Configurar broker MQTT
  mqtt.setServer(mqtt_server, mqtt_port);

  // Configurar función para mensajes recibidos
  mqtt.setCallback(mensajeRecibido);
}

// -------------------------
// LOOP
// -------------------------
void loop() {

  // Verificar conexión MQTT
  if (!mqtt.connected()) {

    conectarMQTT();
  }

  // Mantener funcionando MQTT
  mqtt.loop();

  // Publicar cada 5 segundos
  if (millis() - anterior >= 5000) {

    anterior = millis();

    publicarMensaje();
  }
}
```

### Lo único que deben cambiar los estudiantes

```cpp
const char* ssid = "NOMBRE_WIFI";
const char* password = "CLAVE_WIFI";
const char* mqtt_server = "192.168.10.50";
```

Por ejemplo:

```cpp
const char* ssid = "Laboratorio";
const char* password = "12345678";
const char* mqtt_server = "192.168.10.20";
```

El Monitor Serial debería mostrar algo similar a:

```text
===== ESP32 + MQTT =====
Conectando a WiFi....
WiFi conectado
IP del ESP32: 192.168.10.101
Conectando al broker MQTT... conectado
Suscripto a: laboratorio/esp32/mensaje
Mensaje enviado: Hola desde ESP32
Mensaje recibido: Hola desde ESP32
Mensaje enviado: Hola desde ESP32
Mensaje recibido: Hola desde ESP32
```

Esto además permite que **dos o más ESP32 compartan el mismo topic** y observen los mensajes que circulan por el broker.
