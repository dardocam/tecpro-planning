# Etapa N3: Enviar y recibir mensajes mediante el protocolo MQTT

## 🎯 Objetivo

Aprender a utilizar **MQTT** para que un ESP32 pueda:

* Conectarse a un **broker MQTT**.
* Enviar mensajes (**Publish**).
* Recibir mensajes (**Subscribe**).
* Trabajar con **Topics**.

---

## 1. ¿Cómo funciona MQTT?

MQTT utiliza un modelo de comunicación basado en:

```text
ESP32 ──► Broker MQTT ◄── ESP32
           │
           └── Topic
```

Un dispositivo **publica** mensajes en un `topic`.

Otro dispositivo puede **suscribirse** a ese mismo `topic` para recibirlos.

Por ejemplo:

```text
Topic: escuela/curso5/led

Mensaje: ON
```

---

# 2. Biblioteca

Utilizaremos la biblioteca:

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
```

El ESP32 primero debe conectarse a WiFi y luego al broker MQTT.

---

# 3. Configuración

```cpp
const char* mqtt_server = "broker.hivemq.com";
```

Creamos los objetos:

```cpp
WiFiClient espClient;
PubSubClient mqtt(espClient);
```

---

# 4. Conectarse al broker

```cpp
mqtt.setServer(mqtt_server, 1883);
```

Después podemos conectarnos:

```cpp
mqtt.connect("ESP32_01");
```

El nombre del cliente debe ser **único** si hay varios ESP32 conectados al mismo broker.

---

# 5. Publicar un mensaje

Para enviar un mensaje:

```cpp
mqtt.publish("escuela/curso5/mensaje", "Hola MQTT");
```

Esto significa:

> Enviar `"Hola MQTT"` al topic `escuela/curso5/mensaje`.

---

# 6. Recibir un mensaje

Primero nos suscribimos:

```cpp
mqtt.subscribe("escuela/curso5/mensaje");
```

Necesitamos además una función que se ejecute cuando llegue un mensaje:

```cpp
void recibirMensaje(char* topic, byte* payload, unsigned int length) {

  Serial.print("Mensaje recibido: ");

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }

  Serial.println();
}
```

Y la asociamos:

```cpp
mqtt.setCallback(recibirMensaje);
```

---

# 7. Programa completo

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "NOMBRE_RED";
const char* password = "CONTRASEÑA";

const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient mqtt(espClient);

void recibirMensaje(char* topic, byte* payload, unsigned int length) {

  Serial.print("Mensaje recibido: ");

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }

  Serial.println();
}

void setup() {

  Serial.begin(115200);

  // WiFi
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi conectado");

  // MQTT
  mqtt.setServer(mqtt_server, 1883);
  mqtt.setCallback(recibirMensaje);

  mqtt.connect("ESP32_01");

  mqtt.subscribe("escuela/curso5/mensaje");

  Serial.println("MQTT conectado");
}

void loop() {

  mqtt.loop();

  mqtt.publish("escuela/curso5/mensaje", "Hola desde ESP32");

  delay(5000);
}
```

---

# 🧪 Actividad

Modificar el programa para que:

1. El ESP32 se conecte a WiFi.
2. Se conecte al broker MQTT.
3. Se suscriba al topic:

```text
escuela/curso5/led
```

4. Publique cada 5 segundos un mensaje:

```text
ESP32 funcionando
```

5. Muestre por el Monitor Serial los mensajes recibidos.

---

## 💡 Desafío

Utilizar dos ESP32:

```text
ESP32 A
   │
   │ PUBLICA
   ▼
Broker MQTT
   │
   │ ENTREGA
   ▼
ESP32 B
   │
   ▼
Monitor Serial
```

El **ESP32 A** debe enviar:

```text
Hola desde ESP32 A
```

y el **ESP32 B** debe recibirlo y mostrarlo por Serial.

### Preguntas

**1.** ¿Qué función permite publicar un mensaje?

**2.** ¿Qué función permite suscribirse a un topic?

**3.** ¿Qué función se ejecuta cuando llega un mensaje?

**4.** ¿Qué función debe ejecutarse continuamente para mantener funcionando MQTT?

**5.** ¿Qué ventaja tiene MQTT frente a enviar directamente información de un ESP32 a otro?

**Nota docente:** para una primera clase conviene que los estudiantes trabajen primero con **un único topic y mensajes de texto**, sin introducir todavía QoS, retained messages, autenticación ni estructuras JSON.
