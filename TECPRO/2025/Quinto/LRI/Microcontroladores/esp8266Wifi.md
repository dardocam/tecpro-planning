        #include <ESP8266WiFi.h>
        #include <ESP8266WebServer.h>

        // 🔧 Config WiFi
        const char* ssid     = "moviles";
        const char* password = "";

        // Servidor HTTP en el puerto 80
        ESP8266WebServer server(80);

        void handleRoot() {
        String html = "<!DOCTYPE html><html><head><meta charset='utf-8'>";
        html += "<title>ESP8266 Info</title>";
        html += "<style>body{font-family:Arial;background:#f4f4f4;color:#333;padding:20px;} ";
        html += "h1{color:#0066cc;} table{border-collapse:collapse;width:60%;margin:auto;} ";
        html += "td,th{border:1px solid #ccc;padding:10px;text-align:left;}</style></head><body>";
        html += "<h1>ESP8266 - Datos de conexión</h1>";
        html += "<table>";
        html += "<tr><th>Parametro</th><th>Valor</th></tr>";
        html += "<tr><td>SSID</td><td>" + WiFi.SSID() + "</td></tr>";
        html += "<tr><td>Dirección IP</td><td>" + WiFi.localIP().toString() + "</td></tr>";
        html += "<tr><td>Gateway</td><td>" + WiFi.gatewayIP().toString() + "</td></tr>";
        html += "<tr><td>Mascara</td><td>" + WiFi.subnetMask().toString() + "</td></tr>";
        html += "<tr><td>DNS</td><td>" + WiFi.dnsIP().toString() + "</td></tr>";
        html += "<tr><td>MAC</td><td>" + WiFi.macAddress() + "</td></tr>";
        html += "<tr><td>RSSI</td><td>" + String(WiFi.RSSI()) + " dBm</td></tr>";
        html += "</table></body></html>";

        server.send(200, "text/html", html);
        }

        void setup() {
        Serial.begin(115200);
        delay(1000);

        Serial.println("\nConectando a la red WiFi...");
        WiFi.begin(ssid, password);

        while (WiFi.status() != WL_CONNECTED) {
            delay(500);
            Serial.print(".");
        }

        Serial.println("\n✅ Conectado a WiFi!");
        Serial.print("Dirección IP: ");
        Serial.println(WiFi.localIP());

        // Iniciar servidor
        server.on("/", handleRoot);
        server.begin();
        Serial.println("🌐 Servidor web iniciado. Accede desde tu navegador a la IP arriba mostrada.");
        }

        void loop() {
        server.handleClient(); // Mantiene el servidor web en funcionamiento
        }



---

# Dirección IP estática

## 📘 Sketch: Conexión WiFi con IP fija (ESP8266)

```cpp
#include <ESP8266WiFi.h>

// ---------------------------
// CONFIGURACIÓN DE RED
// ---------------------------
const char* ssid = "TU_SSID";          // 🔹 Cambiar por el nombre de tu red WiFi
const char* password = "TU_PASSWORD";  // 🔹 Cambiar por tu contraseña

// Definición de IP fija (ajustar según tu red)
IPAddress local_IP(192, 168, 1, 50);     // IP estática deseada para el ESP8266
IPAddress gateway(192, 168, 1, 1);       // Puerta de enlace (router)
IPAddress subnet(255, 255, 255, 0);      // Máscara de subred
IPAddress primaryDNS(8, 8, 8, 8);        // DNS primario (opcional)
IPAddress secondaryDNS(8, 8, 4, 4);      // DNS secundario (opcional)

// ---------------------------
// SETUP
// ---------------------------
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println();
  Serial.println("🚀 Iniciando conexión WiFi con IP fija...");

  // Configurar IP estática antes de conectar
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("⚠️ Error al configurar IP estática");
  }

  // Conectar a la red
  WiFi.begin(ssid, password);
  Serial.print("Conectando a ");
  Serial.println(ssid);

  // Esperar conexión
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Una vez conectado, mostrar información
  Serial.println("\n✅ Conectado a la red WiFi");
  Serial.print("Dirección IP asignada: ");
  Serial.println(WiFi.localIP());
  Serial.print("Gateway: ");
  Serial.println(WiFi.gatewayIP());
  Serial.print("Máscara de subred: ");
  Serial.println(WiFi.subnetMask());
}

// ---------------------------
// LOOP
// ---------------------------
void loop() {
  // Muestra el estado de conexión cada 5 segundos
  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("📶 Conectado - IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("❌ Desconectado, intentando reconectar...");
    WiFi.reconnect();
  }
  delay(5000);
}
```

---

## 💡 Explicación

| Elemento         | Descripción                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| `WiFi.config()`  | Configura manualmente la IP, gateway, máscara y DNS **antes de conectar**.  |
| `WiFi.begin()`   | Inicia la conexión a la red WiFi.                                           |
| `WiFi.status()`  | Permite verificar si está conectado.                                        |
| `WiFi.localIP()` | Devuelve la IP actual del ESP8266 (debería coincidir con la que asignaste). |

---

## ⚙️ Ejemplo de configuración típica

Supongamos que tu router usa la red `192.168.0.x`, podrías usar:

```cpp
IPAddress local_IP(192, 168, 0, 50);
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 255, 0);
```

⚠️ Asegúrate de que la IP elegida **no esté ocupada** por otro dispositivo.
Podés reservarla en tu router para mayor seguridad.

---

## ✅ Resultado esperado en el Monitor Serial

```
🚀 Iniciando conexión WiFi con IP fija...
Conectando a MiRedWiFi
........
✅ Conectado a la red WiFi
Dirección IP asignada: 192.168.1.50
Gateway: 192.168.1.1
Máscara de subred: 255.255.255.0
```

---