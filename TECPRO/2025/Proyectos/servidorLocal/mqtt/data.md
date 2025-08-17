Perfecto, vamos a dividirlo en **dos partes**: primero configurar tu servidor Debian como **broker MQTT** y luego crear la **API REST en Fat-Free** que envíe mensajes a un Arduino suscriptor.

---

## **1️⃣ Configurar Debian como broker MQTT (Mosquitto)**

Vamos a usar **Eclipse Mosquitto**, que es liviano y perfecto para redes locales.

### Instalación

```bash
sudo apt update
sudo apt install -y mosquitto mosquitto-clients
sudo systemctl enable mosquitto
```

### Configuración básica para LAN

Archivo:

```bash
sudo nano /etc/mosquitto/conf.d/local.conf
```

Contenido mínimo:

```
listener 1883
allow_anonymous true
```

> Esto permite que cualquier dispositivo de la LAN publique/suscriba sin contraseña. Para producción, deberíamos añadir autenticación.

Reiniciar:

```bash
sudo systemctl restart mosquitto
```

---

### Probar que funciona

En el servidor:

```bash
# Terminal 1 - suscriptor
mosquitto_sub -h localhost -t test/topic

# Terminal 2 - publicador
mosquitto_pub -h localhost -t test/topic -m "hola"
```

Si ves "hola" en el suscriptor, el broker está funcionando.

---

## **2️⃣ API REST con Fat-Free Framework para enviar ON/OFF**

Queremos algo así:

* `GET /on` → envía `"on"` por MQTT
* `GET /off` → envía `"off"` por MQTT

Vamos a usar **PHP + librería MQTT** ([phpMQTT](https://github.com/bluerhinos/phpMQTT)).

---

### Instalar Fat-Free Framework y phpMQTT

```bash
cd /var/www/html
sudo wget https://github.com/bcosca/fatfree/archive/refs/heads/master.zip
sudo unzip master.zip && sudo mv fatfree-master lib && sudo rm master.zip
sudo chown -R www-data:www-data lib

# Descargar librería phpMQTT
sudo wget https://raw.githubusercontent.com/bluerhinos/phpMQTT/master/phpMQTT.php -P lib
```

---

### API REST: `index.php`

```php
<?php
require('lib/base.php');
require('lib/phpMQTT.php');

$broker = '127.0.0.1'; // Servidor MQTT (este mismo)
$port   = 1883;
$client_id = 'phpPublisher';

$f3 = \Base::instance();

$f3->route('GET /on', function() use ($broker, $port, $client_id) {
    publishMQTT($broker, $port, $client_id, "arduino/led", "on");
    echo json_encode(["status" => "LED ON enviado"]);
});

$f3->route('GET /off', function() use ($broker, $port, $client_id) {
    publishMQTT($broker, $port, $client_id, "arduino/led", "off");
    echo json_encode(["status" => "LED OFF enviado"]);
});

function publishMQTT($broker, $port, $client_id, $topic, $message) {
    $mqtt = new phpMQTT($broker, $port, $client_id);
    if ($mqtt->connect()) {
        $mqtt->publish($topic, $message, 0);
        $mqtt->close();
    } else {
        echo json_encode(["error" => "No se pudo conectar al broker"]);
    }
}

$f3->run();
```

---

### Probar la API

En el navegador o con `curl`:

```bash
curl http://192.168.1.100/on
curl http://192.168.1.100/off
```

(Usa la IP de tu servidor Debian)

---

## **3️⃣ Arduino suscriptor**

Código básico usando la librería **PubSubClient**:

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "TuWiFi";
const char* password = "TuClaveWiFi";
const char* mqtt_server = "192.168.1.100"; // IP de tu Debian

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* message, unsigned int length) {
  String msg;
  for (int i = 0; i < length; i++) {
    msg += (char)message[i];
  }
  if (msg == "on") {
    digitalWrite(2, HIGH);
  } else if (msg == "off") {
    digitalWrite(2, LOW);
  }
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("arduinoClient")) {
      client.subscribe("arduino/led");
    } else {
      delay(5000);
    }
  }
}

void setup() {
  pinMode(2, OUTPUT);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
```

---

✅ **Con esto tendrás**:

* Servidor Debian como **broker MQTT**.
* API REST en **Fat-Free Framework** para enviar ON/OFF.
* Arduino que recibe y actúa.

---

Perfecto, vamos a adaptarlo para **Arduino UNO + Ethernet Shield W5100** (o W5500, similar) que se conectará a tu **broker MQTT Debian** y encenderá/apagará un LED según el mensaje recibido.

---

## **Código Arduino UNO + Ethernet Shield (MQTT Suscriptor)**

```cpp
#include <SPI.h>              // Librería para comunicación SPI (necesaria para Ethernet Shield)
#include <Ethernet.h>         // Librería para manejar la red con el Shield
#include <PubSubClient.h>     // Librería para MQTT (https://pubsubclient.knolleary.net/)

// =================== CONFIGURACIÓN DE RED ===================
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED }; // Dirección MAC ficticia para el shield
IPAddress ip(192, 168, 1, 177);   // IP fija del Arduino
IPAddress mqtt_server(192, 168, 1, 100); // IP del servidor Debian con broker Mosquitto

// =================== OBJETOS DE CONEXIÓN ===================
EthernetClient ethClient;         // Cliente Ethernet
PubSubClient client(ethClient);   // Cliente MQTT usando Ethernet

// =================== CONFIGURACIÓN DE HARDWARE ===================
#define LED_PIN 7 // Pin digital donde está conectado el LED

// =================== CALLBACK MQTT ===================
void callback(char* topic, byte* payload, unsigned int length) {
  String mensaje = "";

  for (unsigned int i = 0; i < length; i++) {
    mensaje += (char)payload[i]; // Construye el mensaje recibido
  }

  Serial.print("Mensaje recibido en el topic ");
  Serial.print(topic);
  Serial.print(": ");
  Serial.println(mensaje);

  if (mensaje == "on") {
    digitalWrite(LED_PIN, HIGH);
  } else if (mensaje == "off") {
    digitalWrite(LED_PIN, LOW);
  }
}

// =================== RECONEXIÓN MQTT ===================
void reconnect() {
  while (!client.connected()) {
    Serial.print("Intentando conexión MQTT...");
    if (client.connect("arduinoUNOClient")) { // ID único del cliente
      Serial.println("Conectado");
      client.subscribe("arduino/led"); // Suscribirse al topic
    } else {
      Serial.print("Fallo, rc=");
      Serial.print(client.state());
      Serial.println(" reintentando en 5 segundos");
      delay(5000);
    }
  }
}

// =================== SETUP ===================
void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);

  // Inicia la conexión Ethernet con IP fija
  Ethernet.begin(mac, ip);
  delay(1500); // Esperar un poco a que se estabilice la conexión

  // Configura el broker MQTT
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  Serial.println("Arduino listo y esperando mensajes MQTT...");
}

// =================== LOOP ===================
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop(); // Mantiene la conexión y procesa mensajes
}
```

---

## **Explicación línea por línea**

### **Librerías**

```cpp
#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>
```

* **`SPI.h`**: Maneja la comunicación SPI necesaria para el shield Ethernet.
* **`Ethernet.h`**: Permite configurar la IP, MAC y conexión de red.
* **`PubSubClient.h`**: Implementa cliente MQTT para suscribirse y publicar mensajes.

---

### **Configuración de red**

```cpp
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 1, 177);
IPAddress mqtt_server(192, 168, 1, 100);
```

* **`mac[]`**: Dirección MAC ficticia (no importa que no sea real, pero debe ser única en tu red).
* **`ip`**: IP fija que tendrá el Arduino.
* **`mqtt_server`**: IP de tu servidor Debian donde corre Mosquitto.

---

### **Objetos de conexión**

```cpp
EthernetClient ethClient;
PubSubClient client(ethClient);
```

* **`EthernetClient`**: Cliente TCP/IP que maneja la conexión Ethernet.
* **`PubSubClient`**: Cliente MQTT que usará el `ethClient` para comunicarse.

---

### **Configuración del hardware**

```cpp
#define LED_PIN 7
```

* **`LED_PIN`**: Pin donde conectamos el LED (puedes cambiarlo).

---

### **Callback de MQTT**

```cpp
void callback(char* topic, byte* payload, unsigned int length) {
  String mensaje = "";
  for (unsigned int i = 0; i < length; i++) {
    mensaje += (char)payload[i];
  }
  ...
}
```

* **`callback`**: Función que se ejecuta automáticamente cuando llega un mensaje en un topic suscrito.
* **`payload`**: Contenido del mensaje.
* **`length`**: Longitud del mensaje.

---

### **Reconexión**

```cpp
void reconnect() {
  while (!client.connected()) {
    ...
  }
}
```

* Intenta reconectarse al broker si se pierde la conexión.
* Se suscribe al topic `arduino/led` después de conectarse.

---

### **Setup**

```cpp
Ethernet.begin(mac, ip);
client.setServer(mqtt_server, 1883);
client.setCallback(callback);
```

* Inicia Ethernet con la MAC e IP especificadas.
* Configura el broker MQTT y el puerto (1883).
* Define qué función manejará los mensajes recibidos.

---

### **Loop**

```cpp
if (!client.connected()) {
    reconnect();
}
client.loop();
```

* Comprueba si el cliente sigue conectado.
* Mantiene viva la conexión y procesa los mensajes.

---

## **Flujo de funcionamiento**

1. Arduino arranca, configura la red y se conecta al broker.
2. Se suscribe al topic `arduino/led`.
3. Si desde tu **API Fat-Free** envías `"on"` → LED se enciende.
4. Si envías `"off"` → LED se apaga.
5. Si se pierde conexión → intenta reconectarse.

---
Perfecto.
Vamos a hacer que tu **servidor Debian con Apache + PHP 8.3 + Fat-Free Framework** funcione como **API REST** que hable con tu broker MQTT (Mosquitto) en la red local.

Esta API será capaz de:

* Enviar el comando `on` o `off` al **topic** `arduino/led`.
* Consultar el último valor de temperatura publicado en `arduino/temperatura`.

---

## **1️⃣ Instalar dependencias en Debian**

Instala **Mosquitto client tools** y PHP con soporte para procesos externos:

```bash
sudo apt update
sudo apt install mosquitto mosquitto-clients php php-cli php-mbstring unzip
```

Descarga **Fat-Free Framework** y colócalo en `/var/www/html/api`:

```bash
cd /var/www/html
sudo mkdir api && cd api
sudo wget https://fatfreeframework.com/beta-fatfree-master.zip
sudo unzip beta-fatfree-master.zip -d .
sudo mv fatfree-master/lib . && rm -rf fatfree-master beta-fatfree-master.zip
```

---

## **2️⃣ Estructura de la API**

```
/var/www/html/api
 ├── index.php
 ├── lib/          # Fat-Free Framework
 └── mqtt.sh       # Script para publicar/suscribir
```

---

## **3️⃣ Script para publicar MQTT (`mqtt.sh`)**

```bash
#!/bin/bash
# Uso: ./mqtt.sh publish topic message
#      ./mqtt.sh subscribe topic

BROKER="192.168.1.100"   # Cambia por la IP de tu servidor Mosquitto

if [ "$1" == "publish" ]; then
    mosquitto_pub -h $BROKER -t "$2" -m "$3"
elif [ "$1" == "subscribe" ]; then
    mosquitto_sub -h $BROKER -t "$2" -C 1
else
    echo "Uso: $0 publish <topic> <mensaje> | subscribe <topic>"
fi
```

Dar permisos de ejecución:

```bash
chmod +x /var/www/html/api/mqtt.sh
```

---

## **4️⃣ API REST con Fat-Free (`index.php`)**

```php
<?php
require 'lib/base.php';

$f3 = \Base::instance();

// Configuración MQTT
$broker = "192.168.1.100"; // Cambia por tu IP Mosquitto
$mqttScript = __DIR__ . "/mqtt.sh";

// ======== RUTAS ========

// Encender LED
$f3->route('POST /led/on', function() use ($mqttScript) {
    shell_exec("$mqttScript publish arduino/led on");
    echo json_encode(["status" => "ok", "message" => "LED encendido"]);
});

// Apagar LED
$f3->route('POST /led/off', function() use ($mqttScript) {
    shell_exec("$mqttScript publish arduino/led off");
    echo json_encode(["status" => "ok", "message" => "LED apagado"]);
});

// Consultar temperatura
$f3->route('GET /temperatura', function() use ($mqttScript) {
    $temp = trim(shell_exec("$mqttScript subscribe arduino/temperatura"));
    echo json_encode(["temperatura" => $temp]);
});

// Estado LED
$f3->route('GET /estado', function() use ($mqttScript) {
    $estado = trim(shell_exec("$mqttScript subscribe arduino/estado"));
    echo json_encode(["estado" => $estado]);
});

$f3->run();
```

---

## **5️⃣ Probar API en la red local**

Encender LED:

```bash
curl -X POST http://192.168.1.100/api/led/on
```

Apagar LED:

```bash
curl -X POST http://192.168.1.100/api/led/off
```

Consultar temperatura:

```bash
curl http://192.168.1.100/api/temperatura
```

Consultar estado del LED:

```bash
curl http://192.168.1.100/api/estado
```

---

## **Cómo funciona**

* La API usa `mosquitto_pub` y `mosquitto_sub` para interactuar con MQTT.
* `mosquitto_sub -C 1` asegura que solo tome el **último mensaje** y termine (ideal para REST).
* Fat-Free Framework maneja las rutas limpias y la respuesta en JSON.
* Esto permite que cualquier **Arduino, ESP32 o Raspberry Pi** que hable MQTT pueda interactuar con el servidor vía HTTP.

---

Si quieres, puedo **optimizar esto** para que la API no llame a `mosquitto_sub` cada vez, sino que **guarde los últimos valores en memoria o en Redis**, evitando latencia y consumo innecesario.
Así la API respondería **instantáneamente**.

¿Quieres que lo prepare optimizado?

---

Perfecto.
Voy a prepararte un **componente funcional para React Native** que consuma la API REST que hicimos en Fat-Free Framework y permita encender y apagar el LED del Arduino.

Este componente usará **fetch** para enviar solicitudes `POST` a las rutas `/led/on` y `/led/off` del servidor.

---

## **Componente `LedControl.js`**

```javascript
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

export default function LedControl() {
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState(null);

  // Cambia esta IP por la de tu servidor Debian
  const API_URL = "http://192.168.1.100/api";

  const encenderLed = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/led/on`, { method: "POST" });
      const data = await res.json();
      setEstado("Encendido");
    } catch (err) {
      console.error("Error encendiendo LED:", err);
    } finally {
      setLoading(false);
    }
  };

  const apagarLed = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/led/off`, { method: "POST" });
      const data = await res.json();
      setEstado("Apagado");
    } catch (err) {
      console.error("Error apagando LED:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de LED</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <TouchableOpacity style={[styles.button, styles.on]} onPress={encenderLed}>
            <Text style={styles.buttonText}>Encender LED</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.off]} onPress={apagarLed}>
            <Text style={styles.buttonText}>Apagar LED</Text>
          </TouchableOpacity>

          {estado && <Text style={styles.status}>Estado: {estado}</Text>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  on: {
    backgroundColor: "#4CAF50",
  },
  off: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  status: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "500",
  },
});
```

---

## **Cómo usarlo en tu App**

1. Guarda el archivo como `LedControl.js` en tu proyecto.
2. En tu `App.js`:

```javascript
import React from "react";
import LedControl from "./LedControl";

export default function App() {
  return <LedControl />;
}
```

3. Ejecuta la app:

```bash
npx expo start
```

---

## **Funcionamiento**

* Al presionar "Encender LED" o "Apagar LED", el componente hace un `fetch` POST a la API en Debian.
* El Arduino recibe el mensaje MQTT desde el servidor.
* El estado (`Encendido` / `Apagado`) se actualiza en pantalla.
* Tiene un indicador de carga para evitar toques múltiples.

---

Si quieres, puedo **mejorarlo** para que también **lea en tiempo real el estado y la temperatura** del Arduino usando `setInterval()` o **WebSockets** y así no dependa solo de pulsar botones.
¿Quieres que lo haga con **estado en vivo**?

---

Perfecto ✅
Vamos a rehacer el **código suscriptor MQTT**, pero esta vez para **ESP32** en lugar de Arduino UNO con Ethernet Shield.

Ventajas con el ESP32:

* WiFi integrado (no necesitas shield).
* Mucho más rápido y con más memoria.
* Compatible con el mismo protocolo MQTT que tu broker Debian.

---

## **Código: ESP32 como Suscriptor MQTT para encender/apagar LED**

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

// ==========================
// CONFIGURACIÓN DE RED WIFI
// ==========================
const char* ssid = "TU_SSID";         // Cambia por el nombre de tu red WiFi
const char* password = "TU_PASSWORD"; // Cambia por la contraseña de tu red

// ==========================
// CONFIGURACIÓN DEL BROKER MQTT
// ==========================
const char* mqtt_server = "192.168.1.100"; // IP del servidor Debian
const int mqtt_port = 1883;                // Puerto por defecto de Mosquitto
const char* mqtt_topic = "casa/led";       // Tópico para encender/apagar

WiFiClient espClient;
PubSubClient client(espClient);

// Pin del LED (puedes usar el LED interno 2)
const int ledPin = 2;

// ==========================
// Función: Callback MQTT
// ==========================
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensaje recibido en tópico: ");
  Serial.println(topic);

  String mensaje;
  for (int i = 0; i < length; i++) {
    mensaje += (char)payload[i];
  }
  mensaje.trim();

  Serial.print("Contenido: ");
  Serial.println(mensaje);

  if (mensaje.equalsIgnoreCase("on")) {
    digitalWrite(ledPin, HIGH);
    Serial.println("LED ENCENDIDO");
  }
  else if (mensaje.equalsIgnoreCase("off")) {
    digitalWrite(ledPin, LOW);
    Serial.println("LED APAGADO");
  }
}

// ==========================
// Conexión al WiFi
// ==========================
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

// ==========================
// Reconexión al Broker MQTT
// ==========================
void reconnect() {
  while (!client.connected()) {
    Serial.print("Intentando conexión MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("Conectado!");
      client.subscribe(mqtt_topic);
    } else {
      Serial.print("Error, rc=");
      Serial.print(client.state());
      Serial.println(" Reintentando en 5 segundos");
      delay(5000);
    }
  }
}

// ==========================
// SETUP
// ==========================
void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

// ==========================
// LOOP
// ==========================
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
```

---

## **Explicación línea por línea**

1. **`#include <WiFi.h>` y `<PubSubClient.h>`**
   Librerías necesarias para conectarse al WiFi y al broker MQTT.
2. **Configuración WiFi (`ssid`, `password`)**
   Cambia por tu red local.
3. **Configuración del broker**

   * IP = servidor Debian con Mosquitto.
   * Puerto = normalmente 1883.
   * `mqtt_topic` = nombre del canal donde publicará la API REST.
4. **`callback()`**
   Función que se ejecuta cuando llega un mensaje MQTT al tópico suscrito.
   Convierte el mensaje a texto y enciende o apaga el LED.
5. **`setup_wifi()`**
   Conecta el ESP32 a la red WiFi y muestra la IP en consola.
6. **`reconnect()`**
   Si el ESP32 pierde conexión con el broker, intenta reconectarse automáticamente y vuelve a suscribirse.
7. **`setup()`**
   Configura el LED, inicia el puerto serie, conecta al WiFi, configura el broker MQTT y el `callback`.
8. **`loop()`**
   Mantiene la conexión MQTT y procesa mensajes entrantes.

---

## **Librerías necesarias en Arduino IDE**

Antes de compilar:

1. Ve a **Herramientas → Placa** y selecciona **ESP32 Dev Module** (debes tener el core de ESP32 instalado).
2. Instala las librerías:

   * **PubSubClient** (Nick O’Leary)
   * **WiFi** (ya incluida con ESP32)

---

Si quieres, puedo hacer que el **ESP32 también envíe el estado actual del LED al servidor** cada vez que cambie, así tu app React Native pueda mostrar el estado en tiempo real.
¿Quieres que lo prepare así?


especialmente útil si estás usando Arduino IDE, es utilizar la función esp_wifi_get_mac() con el parámetro WIFI_IF_STA para obtener la dirección MAC de la interfaz de la estación Wi-Fi.
 Este método requiere que inicialices el monitor serie con Serial.begin(115200) y que configures el modo Wi-Fi, por ejemplo, con WiFi.mode(WIFI_STA) antes de intentar leer la dirección MAC.
 Algunos usuarios han reportado que agregar un delay(1000) después de Serial.begin puede ayudar a asegurar que el puerto serie esté completamente listo para la comunicación.


 Autenticación por MAC: Configurar el MikroTik para permitir el acceso basado en la dirección MAC del ESP32. Esto se puede hacer en IP > Hotspot > IP Bindings en MikroTik, creando una entrada estática que asocie la MAC del ESP32 con una dirección IP y permita su acceso sin necesidad de autenticación web.