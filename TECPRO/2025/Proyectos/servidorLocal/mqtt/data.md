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

Si querés, puedo **integrar esta API REST en el mismo script de creación de hosting** que hicimos antes,
así cada sitio podría tener su propio endpoint MQTT para manejar dispositivos en la red local.
De esa manera tendrías un **hosting compartido con control IoT integrado**.
