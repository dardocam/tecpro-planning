// Definición del pin del LED interno (GPIO 2 para ESP32 WROOM32)
#define LED_PIN 2

void setup() {
  // Configurar el pin como salida
  pinMode(LED_PIN, OUTPUT);
  
  // Iniciar comunicación serial para depuración (opcional)
  Serial.begin(115200);
  Serial.println("Iniciando Blink...");
}

void loop() {
  digitalWrite(LED_PIN, HIGH);   // Encender LED
  Serial.println("LED ON");
  delay(1000);                   // Esperar 1 segundo
  
  digitalWrite(LED_PIN, LOW);    // Apagar LED
  Serial.println("LED OFF");
  delay(1000);                   // Esperar 1 segundo
}   