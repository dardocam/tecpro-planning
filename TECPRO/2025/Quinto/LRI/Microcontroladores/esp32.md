## 🚦 Sketch: ESP32 Semáforo con MQTT

Este código:

* Controla un **semáforo (rojo, amarillo, verde)**.
* Se **conecta a WiFi y a un broker MQTT**.
* **Publica su estado** en un topic.
* **Recibe mensajes** para modificar el ciclo de tiempo (sincronización remota).

---

### 📦 Librerías necesarias

Asegurate de tener instaladas:

* **PubSubClient**
* **WiFi.h** (viene con ESP32 por defecto)

---

### ⚙️ Código completo

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

// ---------------------------
// CONFIGURACIÓN WIFI
// ---------------------------
const char* ssid = "TU_SSID";           // 🔹 Cambiar
const char* password = "TU_PASSWORD";   // 🔹 Cambiar

// ---------------------------
// CONFIGURACIÓN MQTT
// ---------------------------
const char* mqtt_server = "192.168.1.100";  // 🔹 Cambiar por la IP del broker (ej. Node-RED o Mosquitto)
const int mqtt_port = 1883;
const char* mqtt_client_id = "ESP32_Semaforo_1";
const char* mqtt_topic_pub = "semaforo/1/estado";
const char* mqtt_topic_sub = "semaforo/sync";

// ---------------------------
// OBJETOS
// ---------------------------
WiFiClient espClient;
PubSubClient client(espClient);

// ---------------------------
// PINES DEL SEMÁFORO
// ---------------------------
const int pinRojo = 25;
const int pinAmarillo = 26;
const int pinVerde = 27;

// ---------------------------
// VARIABLES FSM
// ---------------------------
unsigned long tiempoAnterior = 0;
unsigned long intervalo = 5000;  // tiempo por defecto
int estado = 0;  // 0=rojo, 1=verde, 2=amarillo

// ---------------------------
// FUNCIONES
// ---------------------------

// Conexión WiFi
void conectarWiFi() {
  Serial.print("Conectando a WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Conectado a WiFi");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

// Callback MQTT (recibe mensajes)
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("📩 Mensaje en tópico ");
  Serial.print(topic);
  Serial.print(": ");

  String msg;
  for (int i = 0; i < length; i++) {
    msg += (char)payload[i];
  }
  Serial.println(msg);

  // Ejemplo de mensaje: {"intervalo":7000}
  if (msg.indexOf("intervalo") >= 0) {
    int nuevo = msg.substring(msg.indexOf(":") + 1, msg.indexOf("}")).toInt();
    if (nuevo > 1000 && nuevo < 20000) {
      intervalo = nuevo;
      Serial.print("🔧 Intervalo actualizado a: ");
      Serial.println(intervalo);
    }
  }
}

// Reconexión al broker MQTT
void reconectarMQTT() {
  while (!client.connected()) {
    Serial.print("🔄 Conectando al broker MQTT...");
    if (client.connect(mqtt_client_id)) {
      Serial.println(" conectado ✅");
      client.subscribe(mqtt_topic_sub);
    } else {
      Serial.print("❌ Error (rc=");
      Serial.print(client.state());
      Serial.println("). Reintentando en 5s...");
      delay(5000);
    }
  }
}

// Publicar estado
void publicarEstado(String fase) {
  String mensaje = "{\"fase\":\"" + fase + "\"}";
  client.publish(mqtt_topic_pub, mensaje.c_str());
  Serial.print("📤 Estado publicado: ");
  Serial.println(mensaje);
}

// Cambiar de estado (FSM)
void cambiarEstado() {
  switch (estado) {
    case 0: // ROJO
      digitalWrite(pinRojo, HIGH);
      digitalWrite(pinAmarillo, LOW);
      digitalWrite(pinVerde, LOW);
      publicarEstado("rojo");
      estado = 1;
      intervalo = 5000;
      break;
    case 1: // VERDE
      digitalWrite(pinRojo, LOW);
      digitalWrite(pinAmarillo, LOW);
      digitalWrite(pinVerde, HIGH);
      publicarEstado("verde");
      estado = 2;
      intervalo = 5000;
      break;
    case 2: // AMARILLO
      digitalWrite(pinRojo, LOW);
      digitalWrite(pinAmarillo, HIGH);
      digitalWrite(pinVerde, LOW);
      publicarEstado("amarillo");
      estado = 0;
      intervalo = 2000;
      break;
  }
}

// ---------------------------
// SETUP
// ---------------------------
void setup() {
  Serial.begin(115200);

  // Pines del semáforo
  pinMode(pinRojo, OUTPUT);
  pinMode(pinAmarillo, OUTPUT);
  pinMode(pinVerde, OUTPUT);

  // Conexión WiFi
  conectarWiFi();

  // Configuración MQTT
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

// ---------------------------
// LOOP PRINCIPAL
// ---------------------------
void loop() {
  if (!client.connected()) {
    reconectarMQTT();
  }
  client.loop();

  unsigned long ahora = millis();
  if (ahora - tiempoAnterior > intervalo) {
    tiempoAnterior = ahora;
    cambiarEstado();
  }
}
```

---

## 🧠 Explicación técnica

| Componente                    | Función                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| **ESP32**                     | Microcontrolador principal con WiFi integrado.                                                     |
| **FSM (máquina de estados)**  | Controla el ciclo rojo → verde → amarillo.                                                         |
| **MQTT**                      | Permite sincronizar o supervisar el estado del semáforo desde otro dispositivo o servidor central. |
| **Topic `semaforo/1/estado`** | Publica la fase actual del semáforo.                                                               |
| **Topic `semaforo/sync`**     | Recibe órdenes del servidor (por ejemplo, cambiar el intervalo).                                   |

---

## 🌐 Ejemplo de mensaje desde el servidor (para sincronizar tiempos)

Enviar al topic `semaforo/sync`:

```json
{"intervalo":7000}
```

Esto cambia el tiempo de cada fase a **7 segundos**.
Puedes enviar el mensaje desde **Node-RED**, **MQTT Explorer** o **mosquitto_pub**.

---

## 💡 Ideas para ampliación

* Agregar un **botón peatonal** que envíe `{"modo":"peatonal"}` al broker.
* Agregar otro ESP32 que reciba sincronización y forme parte del sistema de tráfico coordinado.
* Registrar en un servidor los cambios de estado para **telemetría o dashboard IoT**.

---


## 🧩 ¿Qué es una Máquina de Estados Finitos (FSM)?

Una **Máquina de Estados Finitos (Finite State Machine)** es un **modelo lógico de comportamiento** muy utilizado en electrónica, programación y automatización.
Sirve para representar **sistemas que cambian de estado según ciertas condiciones** o eventos.

---

### 🔹 Concepto básico

Una FSM está formada por:

| Elemento         | Descripción                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| **Estados**      | Situaciones posibles en las que puede estar el sistema.                                         |
| **Transiciones** | Reglas o condiciones que determinan cuándo pasar de un estado a otro.                           |
| **Eventos**      | Sucesos que provocan un cambio de estado (por tiempo, entrada de sensor, comando remoto, etc.). |
| **Acciones**     | Tareas que se ejecutan cuando se entra o se sale de un estado.                                  |

---

### 💡 Ejemplo cotidiano

Imaginemos una **luz de semáforo**:

* Estado 1: 🔴 *Rojo* → “Los autos deben detenerse”.
* Estado 2: 🟢 *Verde* → “Los autos pueden avanzar”.
* Estado 3: 🟡 *Amarillo* → “Precaución, va a cambiar a rojo”.

El semáforo **pasa de un estado a otro con el tiempo**, siguiendo una secuencia lógica.

---

## ⚙️ FSM aplicada al proyecto del semáforo con ESP32

En el proyecto, el ESP32 **usa una FSM para controlar el orden y duración de los LEDs** (rojo, verde, amarillo).

---

### 🔸 Estados definidos en el código

| Estado | Nombre       | Acción                                     |
| ------ | ------------ | ------------------------------------------ |
| 0      | **ROJO**     | Enciende el LED rojo, apaga los otros.     |
| 1      | **VERDE**    | Enciende el LED verde, apaga los otros.    |
| 2      | **AMARILLO** | Enciende el LED amarillo, apaga los otros. |

---

### 🔸 Transiciones automáticas

El paso de un estado al siguiente depende del **tiempo transcurrido** (`millis()`):

```cpp
if (millis() - tiempoAnterior > intervalo) {
  cambiarEstado();
  tiempoAnterior = millis();
}
```

De esta forma:

* Si pasaron 5 segundos → pasa de ROJO a VERDE.
* Si pasaron otros 5 segundos → pasa de VERDE a AMARILLO.
* Si pasaron 2 segundos → vuelve a ROJO.

---

### 🔸 Estructura típica de una FSM en código

```cpp
switch (estado) {
  case 0: // ROJO
    // acciones
    estado = 1; // próxima transición
    break;
  case 1: // VERDE
    // acciones
    estado = 2;
    break;
  case 2: // AMARILLO
    // acciones
    estado = 0;
    break;
}
```

---

## 🌐 FSM + MQTT = Sincronización Inteligente

La FSM **controla la lógica local** del semáforo, pero además, en este proyecto:

* El **ESP32 publica su estado actual** por MQTT → `semaforo/1/estado`
* Un **servidor central o Node-RED** puede enviar mensajes al topic → `semaforo/sync`
* Estos mensajes pueden **modificar el tiempo de cada fase o sincronizar** varios semáforos.

Por ejemplo:

```json
{"intervalo":7000}
```

Hace que **todas las fases duren 7 segundos**, sincronizando los nodos sin modificar el código.

---

## 🧠 ¿Por qué usamos una FSM?

| Ventaja                        | Explicación                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------- |
| **Organización lógica**        | Permite estructurar el código en etapas claras.                               |
| **Facilidad de mantenimiento** | Si se cambia un estado, no afecta todo el sistema.                            |
| **Escalabilidad**              | Se pueden agregar más estados (por ejemplo, cruce peatonal, modo emergencia). |
| **Sincronización sencilla**    | Facilita conectar varios semáforos entre sí.                                  |

---

## 🚦 En resumen

| Concepto         | Aplicación en el proyecto                           |
| ---------------- | --------------------------------------------------- |
| **FSM**          | Controla el flujo lógico de las luces del semáforo. |
| **Estados**      | Rojo, Verde, Amarillo.                              |
| **Transiciones** | Basadas en tiempo (`millis()`) o mensajes MQTT.     |
| **Acciones**     | Encender/apagar LEDs y publicar el estado.          |
| **Beneficio**    | Permite comportamiento autónomo y sincronizable.    |

---

## 💬 Preguntas para reflexión grupal

1. ¿Qué ventajas tiene usar una FSM en lugar de condicionales `if` simples?
2. ¿Cómo podrías agregar un **estado peatonal** dentro de esta máquina de estados?
3. ¿Qué sucedería si un mensaje MQTT interrumpe una transición?
4. ¿Cómo se podría aplicar una FSM en otros sistemas del entorno (por ejemplo, una barrera ferroviaria o ascensor)?

---

