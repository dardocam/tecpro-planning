# 🚦 **Desafío Avanzado: Cruce Peatonal Inteligente con MQTT**

### 🎯 **Objetivo**

Diseñar un **sistema de semáforo vehicular + cruce peatonal** controlado por Arduino, donde:

* El **semáforo vehicular** maneja LEDs **rojo, amarillo y verde**.
* El **semáforo peatonal** maneja LEDs **rojo y verde**.
* Al presionar un **botón peatonal**, el Arduino envía un **mensaje MQTT** indicando que se solicitó cruce.
* Otro Arduino (o el mismo, en otra simulación) recibe el mensaje y **cambia el estado del semáforo**.
* Ambos microcontroladores reportan su estado en un **topic MQTT** (por ejemplo: `semaforo/estado` y `peatonal/estado`).

---

## 🔧 **Requerimientos**

### Hardware simulado (en Tinkercad o físico con MQTT real):

* 2 placas Arduino UNO (se puede simular la idea en Tinkercad y luego probar en hardware real con un broker).
* 5 LEDs (rojo, amarillo, verde vehicular + rojo y verde peatonal).
* 5 resistencias de 220 Ω.
* 1 botón pulsador (peatonal).
* Módulo de red (en físico: ESP8266/ESP32 o Ethernet Shield para MQTT).

### Software:

* Librería **PubSubClient** para MQTT.
* Broker MQTT (ejemplo: Mosquitto en local o servicio gratuito como `test.mosquitto.org`).

---

## 📡 **Esquema de Comunicación MQTT**

* **Topic publicado por el botón peatonal:**
  `peatonal/solicitud` → Mensaje: `"cruce"`

* **Topic publicado por el semáforo vehicular:**
  `semaforo/estado` → Mensajes: `"rojo"`, `"verde"`, `"amarillo"`

* **Topic publicado por el semáforo peatonal:**
  `peatonal/estado` → Mensajes: `"rojo"`, `"verde"`

* **Topic de control:**
  `cruce/control` → El semáforo vehicular lo escucha para saber cuándo dar paso a peatones.

---

## 💻 **Código Ejemplo – Nodo Peatonal (con botón)**

```cpp
#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>

// Configuración red (ejemplo con Ethernet Shield)
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress server(192, 168, 1, 100); // IP del broker MQTT

EthernetClient ethClient;
PubSubClient client(ethClient);

int boton = 2;
int ledVerde = 3;
int ledRojo = 4;

void setup() {
  pinMode(boton, INPUT_PULLUP);
  pinMode(ledVerde, OUTPUT);
  pinMode(ledRojo, OUTPUT);

  Ethernet.begin(mac);
  client.setServer(server, 1883);

  digitalWrite(ledRojo, HIGH); // peatón detenido
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Detectar pulsador
  if (digitalRead(boton) == LOW) {
    client.publish("peatonal/solicitud", "cruce");
    delay(500); // anti-rebote
  }
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("PeatonalNode")) {
      client.publish("peatonal/estado", "rojo");
    } else {
      delay(2000);
    }
  }
}
```

---

## 💻 **Código Ejemplo – Nodo Semáforo Vehicular**

```cpp
#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress server(192, 168, 1, 100); 

EthernetClient ethClient;
PubSubClient client(ethClient);

int rojo = 8;
int amarillo = 9;
int verde = 10;

void callback(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (int i = 0; i < length; i++) {
    msg += (char)payload[i];
  }

  if (msg == "cruce") {
    // Cambiar a rojo para vehículos y verde para peatones
    digitalWrite(verde, LOW);
    digitalWrite(rojo, HIGH);
    client.publish("semaforo/estado", "rojo");
    client.publish("peatonal/estado", "verde");
    delay(5000);
    digitalWrite(rojo, LOW);
    digitalWrite(verde, HIGH);
    client.publish("semaforo/estado", "verde");
    client.publish("peatonal/estado", "rojo");
  }
}

void setup() {
  pinMode(rojo, OUTPUT);
  pinMode(amarillo, OUTPUT);
  pinMode(verde, OUTPUT);

  Ethernet.begin(mac);
  client.setServer(server, 1883);
  client.setCallback(callback);

  digitalWrite(verde, HIGH); // inicio: vehículos en verde
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("SemaforoNode")) {
      client.subscribe("peatonal/solicitud");
      client.publish("semaforo/estado", "verde");
    } else {
      delay(2000);
    }
  }
}
```

## 🏗️ **Desafío**

1. Implementar en **Tinkercad** el semáforo vehicular + peatonal (sin MQTT, solo con lógica).
2. Luego migrar el código a un Arduino con conexión real a internet (Ethernet Shield o ESP8266/ESP32).
3. Usar un **broker MQTT local** (Mosquitto) o en la nube.
4. Monitorear los mensajes publicados con un **cliente MQTT** (ej. MQTT Explorer o Node-RED).

---

## 🤔 **Preguntas de reflexión**

* ¿Qué ventajas tiene usar MQTT frente a programar todo el semáforo en un solo Arduino?
* ¿Cómo podrías escalar este sistema a **múltiples cruces peatonales en una ciudad**?
* ¿Qué pasaría si el broker MQTT se cae? ¿Cómo lo resolverías?

---

📌 Esto conecta lo **educativo** con un proyecto de **IoT real**, mostrando cómo los microcontroladores pueden comunicarse para coordinar **infraestructura urbana inteligente**.

