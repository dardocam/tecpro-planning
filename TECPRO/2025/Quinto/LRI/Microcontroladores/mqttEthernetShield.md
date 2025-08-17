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

# Comunicación bidireccional MQTT


Vamos a mejorar el script para que **el Arduino UNO + Ethernet Shield** no solo reciba mensajes (`on`/`off`) para controlar el LED, sino que también **publique su estado y la lectura de un sensor** (en este ejemplo, simularemos un sensor de temperatura usando `analogRead`).


---

## **Código Arduino UNO + Ethernet Shield (Suscriptor + Publicador MQTT)**

```cpp
#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>

// =================== CONFIGURACIÓN DE RED ===================
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 1, 177);      // IP fija del Arduino
IPAddress mqtt_server(192, 168, 1, 100); // IP del servidor Debian con broker Mosquitto

EthernetClient ethClient;
PubSubClient client(ethClient);

// =================== CONFIGURACIÓN HARDWARE ===================
#define LED_PIN 7
#define SENSOR_PIN A0 // Simulación de temperatura con un potenciómetro o sensor

unsigned long lastMsg = 0; // Para controlar cada cuánto publica
char msg[50];              // Buffer para mensaje

// =================== CALLBACK MQTT ===================
void callback(char* topic, byte* payload, unsigned int length) {
  String mensaje = "";
  for (unsigned int i = 0; i < length; i++) {
    mensaje += (char)payload[i];
  }

  Serial.print("Mensaje recibido en topic [");
  Serial.print(topic);
  Serial.print("]: ");
  Serial.println(mensaje);

  if (mensaje == "on") {
    digitalWrite(LED_PIN, HIGH);
    client.publish("arduino/estado", "LED encendido");
  } 
  else if (mensaje == "off") {
    digitalWrite(LED_PIN, LOW);
    client.publish("arduino/estado", "LED apagado");
  }
}

// =================== RECONEXIÓN MQTT ===================
void reconnect() {
  while (!client.connected()) {
    Serial.print("Intentando conexión MQTT...");
    if (client.connect("arduinoUNOClient")) {
      Serial.println("Conectado");
      client.subscribe("arduino/led");
      client.publish("arduino/estado", "Arduino conectado y listo");
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
  pinMode(SENSOR_PIN, INPUT);
  Serial.begin(9600);

  Ethernet.begin(mac, ip);
  delay(1500);

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  Serial.println("Arduino listo para MQTT bidireccional");
}

// =================== LOOP ===================
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > 5000) { // Cada 5 segundos
    lastMsg = now;

    int lectura = analogRead(SENSOR_PIN); 
    float temperatura = (lectura / 1023.0) * 100.0; // Simulación 0-100°C

    dtostrf(temperatura, 4, 2, msg);
    client.publish("arduino/temperatura", msg);

    Serial.print("Temperatura publicada: ");
    Serial.println(msg);
  }
}
```

---

## **Qué añadimos respecto al anterior**

1. **Publicación de mensajes**:

   * Cuando recibe un comando `on` o `off`, responde publicando en `arduino/estado`.
   * Cada 5 segundos envía un valor de "temperatura" en `arduino/temperatura`.

2. **Sensor simulado**:

   * Pin analógico `A0` se usa como entrada de un potenciómetro o sensor (por ejemplo LM35).
   * Convierte el valor leído en una temperatura ficticia de 0 a 100 °C.

3. **Publicación inicial**:

   * Cuando se conecta al broker, envía un mensaje anunciando que está listo.

---

## **Flujo de comunicación**

* **API Fat-Free** → Publica en `arduino/led` → Arduino enciende/apaga el LED.
* **Arduino**:

  * Publica en `arduino/estado` el estado del LED.
  * Publica cada 5 segundos la temperatura en `arduino/temperatura`.
* **Cualquier cliente MQTT** en la red local puede suscribirse a esos topics y ver la información.

---

