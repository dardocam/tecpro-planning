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
