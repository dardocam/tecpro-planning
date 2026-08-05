#include <WiFi.h>

// 1. Configura tus credenciales WiFi aquí
const char* ssid = "";
const char* password = "";

void setup() {
  Serial.begin(115200);
  delay(1000); // Pequeña pausa para estabilizar el serial

  Serial.println();
  Serial.print("Conectando a: ");
  Serial.println(ssid);

  // 2. Iniciar conexión
  WiFi.begin(ssid, password);

  // 3. Esperar hasta que se conecte (máximo 20 segundos)
  int intentos = 0;
  while (WiFi.status() != WL_CONNECTED && intentos < 20) {
    delay(500);
    Serial.print(".");
    intentos++;
  }

  // 4. Verificar resultado
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n¡Conexión exitosa!");
    Serial.print("Dirección IP asignada: ");
    Serial.println(WiFi.localIP()); // Muestra la IP
    Serial.print("Potencia de señal (RSSI): ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
  } else {
    Serial.println("\nFallo en la conexión. Verifica usuario y contraseña.");
  }
}

void loop() {
  // Opcional: Verificar si se desconecta
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Conexión perdida. Intentando reconectar...");
    WiFi.reconnect();
    delay(5000);
  }
  delay(5000); 
}   