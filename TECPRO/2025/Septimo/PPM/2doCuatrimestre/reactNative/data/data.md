# 📝 Consigna del Proyecto Personalizado – Unidad 1

**Objetivo:** Poner en práctica todos los conocimientos adquiridos en la Unidad 1 mediante la creación de una aplicación móvil personalizada desarrollada con **React Native (Expo)**.

---

## Enunciado

Cada grupo deberá **diseñar y desarrollar su propia aplicación móvil simple**, integrando los conceptos aprendidos:

* Estructura básica de un proyecto con Expo.
* Uso de **JSX** y **componentes funcionales**.
* Comunicación entre componentes mediante **props**.
* Manejo de **estado local** con `useState`.
* Implementación de **efectos secundarios** con `useEffect`.
* **Estilizado responsivo** con `StyleSheet` y **Flexbox**.
* Uso de componentes básicos: `View`, `Text`, `Image`, `ScrollView`.
* Integración de imágenes y assets.

---

## 🔹 Requisitos mínimos del proyecto

1. **Pantalla principal personalizada**: debe mostrar un título, una imagen y un mensaje de bienvenida.
2. **Al menos 3 componentes propios**: creados en archivos separados y reutilizados en la app.
3. **Uso de props**: pasar información desde el componente principal hacia los componentes secundarios.
4. **Estado local (`useState`)**: implementar al menos una funcionalidad interactiva, como un contador, lista de tareas, favoritos o likes.
5. **Efectos (`useEffect`)**: incluir una acción secundaria, como mostrar un mensaje en consola al cargar la app o actualizar un dato dinámico.
6. **Estilizado**: aplicar estilos con `StyleSheet` y diseñar un layout responsivo usando Flexbox.
7. **Uso de ScrollView**: si hay contenido extenso, permitir desplazamiento vertical.
8. **Pantalla de integración**: que combine componentes, estado y estilos.

---

## 🔹 Ejemplos de posibles proyectos

* 📚 **App de notas personales** (crear, listar y marcar notas como importantes).
* 🎵 **App de canciones favoritas** (mostrar lista con opción de “me gusta”).
* 🧘 **App de rutinas de ejercicio** (listar rutinas con imágenes y botones de completado).
* 🎮 **Mini app de puntaje** (contador de puntos para un juego o actividad).
* 🍔 **App de recetas** (mostrar recetas con imágenes y descripción).

---

## 🔹 Entregables

* Carpeta del proyecto Expo completa.
* Archivo `README.md` con:

  * Nombre del proyecto.
  * Breve descripción de la app.
  * Instrucciones de instalación y ejecución.
* Capturas de pantalla o grabación en video mostrando el funcionamiento.

---

## 🔹 Evaluación

El proyecto será evaluado según los siguientes criterios:

* ✅ **Funcionalidad** (que cumpla los requisitos mínimos).
* ✅ **Uso correcto de props, estado y efectos**.
* ✅ **Creatividad y personalización**.
* ✅ **Organización del código** (componentes separados, comentarios claros).
* ✅ **Diseño y experiencia de usuario** (uso adecuado de estilos y disposición visual).
* ✅ **Exposición y presentación**
  
---
# CERRADURA ELECTRONICA BLE

Para realizar el código del ESP32 que integre BLE para controlar una cerradura y WiFi para enviar logs, aquí tienes la implementación completa. Este código permite recibir un código de acceso via BLE, verificar si es válido para activar un relay (simulando la cerradura), y enviar logs a un servidor web via WiFi cuando se reciben comandos o ocurren eventos.

---

## Código Completo para ESP32

```cpp
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Configuración de WiFi
const char* SSID = "TU_SSID";           // Reemplaza con tu SSID
const char* PASSWORD = "TU_PASSWORD";   // Reemplaza con tu contraseña
const char* SERVER_URL = "http://tuserver.com/logs";  // URL del servidor de logs

// Configuración de BLE
#define SERVICE_UUID        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // Servicio UART
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E" // Característica para recibir datos
#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E" // Característica para enviar datos

// Pin para el relay que controla la cerradura
const int relayPin = 25;  // Cambia al GPIO que uses

// Variables globales
BLECharacteristic *pCharacteristicTX;
bool deviceConnected = false;
String allowedCode = "123456";  // Código de acceso válido

// Clases de callbacks para BLE
class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      Serial.println("Dispositivo conectado");
    };
    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      Serial.println("Dispositivo desconectado");
      // Reiniciar advertising para permitir reconexiones
      BLEDevice::startAdvertising();
    }
};

class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string value = pCharacteristic->getValue();
      if (value.length() > 0) {
        String receivedCode = String(value.c_str());
        Serial.println("Código recibido: " + receivedCode);
        
        // Verificar el código recibido
        if (receivedCode == allowedCode) {
          activateLock();
          sendLog("Código correcto. Cerradura activada", "success");
          pCharacteristicTX->setValue("Acceso concedido");
        } else {
          Serial.println("Código incorrecto");
          sendLog("Intento de acceso con código incorrecto: " + receivedCode, "error");
          pCharacteristicTX->setValue("Acceso denegado");
        }
        pCharacteristicTX->notify();
      }
    }
};

// Función para activar la cerradura
void activateLock() {
  digitalWrite(relayPin, HIGH);
  Serial.println("Cerradura activada");
  delay(5000);  // Mantener activado por 5 segundos
  digitalWrite(relayPin, LOW);
  Serial.println("Cerradura desactivada");
}

// Función para enviar logs al servidor
void sendLog(String message, String level) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(SERVER_URL);
    http.addHeader("Content-Type", "application/json");
    
    // Crear objeto JSON para el log
    StaticJsonDocument<200> doc;
    doc["device_id"] = "ESP32_Cerradura";
    doc["message"] = message;
    doc["level"] = level;
    doc["timestamp"] = millis();
    
    String jsonString;
    serializeJson(doc, jsonString);
    
    int httpResponseCode = http.POST(jsonString);
    if (httpResponseCode > 0) {
      Serial.println("Log enviado: " + message);
    } else {
      Serial.println("Error enviando log: " + String(httpResponseCode));
    }
    http.end();
  } else {
    Serial.println("WiFi no conectado. Log no enviado: " + message);
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, LOW);

  // Conectar a WiFi
  WiFi.begin(SSID, PASSWORD);
  Serial.print("Conectando a WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" Conectado");
  sendLog("ESP32 iniciado y conectado a WiFi", "info");

  // Configurar BLE
  BLEDevice::init("ESP32_Cerradura");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  
  BLEService *pService = pServer->createService(SERVICE_UUID);
  
  // Característica para TX (notificaciones)
  pCharacteristicTX = pService->createCharacteristic(
                      CHARACTERISTIC_UUID_TX,
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
  pCharacteristicTX->addDescriptor(new BLE2902());
  
  // Característica para RX (escritura)
  BLECharacteristic *pCharacteristicRX = pService->createCharacteristic(
                      CHARACTERISTIC_UUID_RX,
                      BLECharacteristic::PROPERTY_WRITE
                    );
  pCharacteristicRX->setCallbacks(new MyCallbacks());
  
  pService->start();
  pServer->getAdvertising()->start();
  Serial.println("BLE iniciado. Esperando conexiones...");
}

void loop() {
  // Mantener la conexión WiFi y manejar reconexiones si es necesario
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi desconectado. Reconectando...");
    WiFi.reconnect();
    delay(5000);
  }
  // Aquí puedes añadir más lógica si es necesario
  delay(1000);
}
```

---

## 📝 Explicación del Código

### 1. **Configuración de BLE**
- **Servicio y Características UUID**: Se utilizan los UUID estándar para el servicio UART, con características separadas para TX (notificaciones) y RX (escritura) .
- **Callbacks**: `MyServerCallbacks` maneja eventos de conexión/desconexión, y `MyCallbacks` procesa los datos recibidos via BLE.
- **Manejo de Conexiones**: Cuando un dispositivo se conecta o desconecta, se actualiza el estado `deviceConnected` y se reinicia el advertising si es necesario .

### 2. **Control de la Cerradura**
- **Verificación de Código**: Al recibir un código via BLE, se compara con `allowedCode`. Si coincide, se activa el relay (cerradura) por 5 segundos.
- **Notificación al Cliente**: Se envía una notificación BLE ("Acceso concedido" o "denegado") al dispositivo móvil.

### 3. **Conexión WiFi y Envío de Logs**
- **Conexión WiFi**: Intenta conectar al SSID y contraseña proporcionados.
- **Envío de Logs**: Usa HTTP POST para enviar logs en formato JSON al servidor especificado. Los logs incluyen:
  - `device_id`: Identificador del ESP32.
  - `message`: Mensaje descriptivo del evento.
  - `level`: Nivel de severidad (ej. "info", "error").
  - `timestamp`: Tiempo en milisegundos desde el inicio.

### 4. **Seguridad**
- **Código de Acceso**: El código válido se almacena en la variable `allowedCode`. Para mayor seguridad, considera cifrar este código o usar tokens dinámicos.
- **WiFi**: Las credenciales WiFi están hardcodeadas. Para producción, usa métodos de provisioning (ej. WiFiManager o BLE provisioning ).

---

## 🔧 Requisitos y Personalización

### Hardware
- **ESP32** (cualquier versión con BLE).
- **Relay o actuador** para controlar la cerradura eléctrica.
- **Fuente de alimentación** adecuada para el relay y la cerradura.

### Software
- **Bibliotecas**:
  - `BLEDevice.h`, `BLEServer.h`, `BLEUtils.h`, `BLE2902.h` para BLE.
  - `WiFi.h` y `HTTPClient.h` para WiFi y HTTP.
  - `ArduinoJson.h` para crear los JSON de logs.
- **Servidor Web**: Debes tener un endpoint (ej. `/logs`) que acepte POST requests con JSON.

### Personalización
- **Cambiar UUIDs**: Si necesitas UUIDs personalizados, genera nuevos con [uuidgenerator.net](https://www.uuidgenerator.net/) .
- **Pin del Relay**: Modifica `relayPin` según tu conexión.
- **Código Válido**: Cambia `allowedCode` por tu código deseado.
- **URL del Servidor**: Ajusta `SERVER_URL` a tu endpoint.

---

## 📱 App Móvil

Para interactuar con el ESP32, necesitas una app móvil que:
1. **Se conecte via BLE** al dispositivo "ESP32_Cerradura".
2. **Escriba** el código en la característica RX (UUID `6E400002-B5A3-F393-E0A9-E50E24DCCA9E`).
3. **Escuche** notificaciones en la característica TX (UUID `6E400003-B5A3-F393-E0A9-E50E24DCCA9E`).

Puedes desarrollar una app usando:
- **Android**: Android Studio con Bluetooth API.
- **iOS**: CoreBluetooth framework.
- **Plataformas cruzadas**: Frameworks como React Native o Flutter con plugins BLE.

---

## 🚀 Mejoras Futuras

- **Provisioning WiFi via BLE**: En lugar de hardcodear credenciales, implementa provisioning BLE para que los usuarios configuren WiFi desde una app .
- **Mayor Seguridad**: Usa cifrado AES para los códigos de acceso .
- **Tokens Temporales**: Genera códigos de un solo uso (TOTP) para acceso más seguro.
- **OTA Updates**: Para actualizar el firmware via WiFi.

Este código proporciona una base sólida para integrar BLE y WiFi en tu proyecto de cerradura electrónica. ¡Ajusta y expande según tus necesidades!