# ESP32: Puerto Serial y conexión WiFi

## 🎯 Objetivo

Aprender a:

* Comunicar el ESP32 con la computadora mediante el **puerto serial**.
* Conectar el ESP32 a una red **WiFi**.
* Mostrar información de la conexión utilizando el Monitor Serial.

---

## 1. Puerto Serial

El puerto serial permite que el ESP32 **envíe y reciba información** desde la computadora.

### Inicializar la comunicación

En `setup()`:

```cpp
Serial.begin(115200);
```

Luego podemos enviar mensajes:

```cpp
Serial.println("Hola desde ESP32");
```

### Ejemplo mínimo

```cpp
void setup() {
  Serial.begin(115200);
  Serial.println("ESP32 iniciado");
}

void loop() {
}
```

Abrí el **Monitor Serial** y seleccioná:

**115200 baudios**

Deberías observar:

```text
ESP32 iniciado
```

---

# 2. Conexión WiFi

Para utilizar WiFi incorporado del ESP32 necesitamos la biblioteca:

```cpp
#include <WiFi.h>
```

Definimos la red:

```cpp
const char* ssid = "NOMBRE_RED";
const char* password = "CONTRASEÑA";
```

Luego intentamos conectarnos:

```cpp
WiFi.begin(ssid, password);
```

Podemos esperar hasta que se establezca la conexión:

```cpp
while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print(".");
}
```

Finalmente mostramos la dirección IP:

```cpp
Serial.println();
Serial.println("WiFi conectado");
Serial.println(WiFi.localIP());
```

---

# 3. Programa completo

```cpp
#include <WiFi.h>

const char* ssid = "NOMBRE_RED";
const char* password = "CONTRASEÑA";

void setup() {

  Serial.begin(115200);

  Serial.println("Iniciando ESP32...");
  Serial.println("Conectando a WiFi...");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi conectado");
  Serial.print("Direccion IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
}
```

---

# 4. ¿Qué debería aparecer?

En el Monitor Serial:

```text
Iniciando ESP32...
Conectando a WiFi...
........
WiFi conectado
Direccion IP: 192.168.1.25
```

La IP será diferente según la red utilizada.

---

# 🧪 Actividad

Modificar el programa para que:

1. Muestre por Serial el mensaje **"ESP32 iniciado"**.
2. Se conecte a una red WiFi.
3. Muestre:

   * Nombre de la red.
   * Estado de conexión.
   * Dirección IP.
4. Cada **5 segundos** informe:

```text
ESP32 funcionando...
```

### Preguntas para responder

**1.** ¿Para qué sirve `Serial.begin(115200)`?

**2.** ¿Qué función permite iniciar la conexión WiFi?

**3.** ¿Qué información representa `WiFi.localIP()`?

**4.** ¿Qué ocurre si el ESP32 no puede conectarse a la red?

**5.** ¿Por qué resulta útil mostrar información por el puerto Serial durante el desarrollo?

---

## 💡 Desafío

Hacer que el ESP32 muestre por Serial:

```text
-------------------------
ESP32
WiFi: CONECTADO
SSID: MiRed
IP: 192.168.1.25
-------------------------
```

Actualizar la información cada **5 segundos**.
