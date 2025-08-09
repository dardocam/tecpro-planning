Perfecto ✅
Te preparo la versión para **Arduino Uno + Ethernet Shield W5100/W5500** para enviar la temperatura vía **MQTT**.

---

## 🛠 Material necesario

* Arduino Uno
* Ethernet Shield W5100 o W5500
* Sensor de temperatura DHT11 o DHT22
* Resistencia 10kΩ para el DHT
* Cable Ethernet RJ45

---

## 📦 Librerías necesarias

Instalar desde el **Library Manager** en Arduino IDE:

* `PubSubClient` (Nick O’Leary)
* `DHT sensor library` (Adafruit)
* `Adafruit Unified Sensor` (dependencia del DHT)

---

## 💻 Código Arduino Uno + Ethernet Shield + MQTT

```cpp
#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>
#include "DHT.h"

// ==== CONFIGURACIÓN DHT ====
#define DHTPIN 2         // Pin digital para datos del DHT
#define DHTTYPE DHT22    // Cambiar a DHT11 si es necesario
DHT dht(DHTPIN, DHTTYPE);

// ==== CONFIGURACIÓN RED ====
byte mac[]    = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED }; // Dirección MAC ficticia
IPAddress ip(192, 168, 1, 50);  // IP fija para el Arduino
IPAddress mqtt_server(192, 168, 1, 100); // IP del broker MQTT

// ==== CONFIGURACIÓN MQTT ====
const int mqtt_port = 1883;
const char* mqtt_user = "usuario_mqtt";
const char* mqtt_pass = "clave_mqtt";
const char* topic_temp = "casa/sala/temperatura";

// ==== OBJETOS ====
EthernetClient ethClient;
PubSubClient client(ethClient);

void setup() {
  Serial.begin(9600);
  dht.begin();

  // Iniciar Ethernet
  Ethernet.begin(mac, ip);
  delay(1500); // Esperar a que inicie

  Serial.print("IP del Arduino: ");
  Serial.println(Ethernet.localIP());

  client.setServer(mqtt_server, mqtt_port);
  reconnect();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Leer temperatura
  float temp = dht.readTemperature();

  if (!isnan(temp)) {
    Serial.print("Temperatura: ");
    Serial.println(temp);

    char msg[10];
    dtostrf(temp, 4, 2, msg);
    client.publish(topic_temp, msg);
  } else {
    Serial.println("Error leyendo el sensor");
  }

  delay(5000); // cada 5 segundos
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando a MQTT...");
    if (client.connect("ArduinoUnoEthernet", mqtt_user, mqtt_pass)) {
      Serial.println("Conectado");
    } else {
      Serial.print("Error, rc=");
      Serial.print(client.state());
      Serial.println(" Reintentando en 5 segundos");
      delay(5000);
    }
  }
}
```

---

## 📡 Funcionamiento

1. Arduino obtiene la temperatura del DHT.
2. Envía los datos vía **Ethernet** al broker MQTT (ej: Mosquitto).
3. Publica el valor en el **topic** `casa/sala/temperatura` cada 5 segundos.
4. Puedes suscribirte a ese topic desde `mqtt-explorer`, `mosquitto_sub`, Node-RED o Home Assistant.

---

Si querés, puedo dejarte **un diagrama de conexiones** para Arduino Uno + Ethernet Shield + DHT22 listo para cablear sin errores.
Así lo podés montar sin riesgos de conexión incorrecta.
¿Te lo preparo?
