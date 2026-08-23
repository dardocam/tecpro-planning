/*
========================================================
  ESP32 + DHT22 + MQTT (HiveMQ Cloud)
  Arquitectura profesional IoT
========================================================

  Librerías necesarias:
  
  - WiFi.h
  - WiFiClientSecure.h
  - PubSubClient
  - DHT sensor library

  Instalar desde Arduino IDE:
  --------------------------------
  PubSubClient by Nick O'Leary
  DHT sensor library by Adafruit

========================================================
*/

#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <DHT.h>

/* ======================================================
   CONFIG WIFI
====================================================== */

const char* WIFI_SSID = "";
const char* WIFI_PASSWORD = "";

/* ======================================================
   CONFIG MQTT HIVEMQ CLOUD
====================================================== */

const char* MQTT_HOST = "wss://a99569f0bc9044628cc88aebdc1cbb73.s1.eu.hivemq.cloud:8884/mqtt";
const int MQTT_PORT = 8884;

const char* MQTT_USER = "dardo";
const char* MQTT_PASSWORD = "@mqttPasww2026@";

/* ======================================================
   DEVICE CONFIG
====================================================== */

const char* DEVICE_ID = "esp32-01-Home-Dardo";

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

/* ======================================================
   MQTT TOPIC
====================================================== */

String topic = "home/subsuelo/esp32-01";

/* ======================================================
   CERTIFICADO ROOT CA
   HiveMQ usa Let's Encrypt
====================================================== */

static const char *root_ca PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIFszCCA5ugAwIBAgIQIZxULej27HF3+k7ow3BXlzANBgkqhkiG9w0BAQwFADBj
MQswCQYDVQQGEwJERTEnMCUGA1UECgweRGV1dHNjaGUgVGVsZWtvbSBTZWN1cml0
eSBHbWJIMSswKQYDVQQDDCJUZWxla29tIFNlY3VyaXR5IFRMUyBSU0EgUm9vdCAy
MDIzMB4XDTIzMDMyODEyMTY0NVoXDTQ4MDMyNzIzNTk1OVowYzELMAkGA1UEBhMC
REUxJzAlBgNVBAoMHkRldXRzY2hlIFRlbGVrb20gU2VjdXJpdHkgR21iSDErMCkG
A1UEAwwiVGVsZWtvbSBTZWN1cml0eSBUTFMgUlNBIFJvb3QgMjAyMzCCAiIwDQYJ
KoZIhvcNAQEBBQADggIPADCCAgoCggIBAO01oYGA88tKaVvC+1GDrib94W7zgRJ9
cUD/h3VCKSHtgVIs3xLBGYSJwb3FKNXVS2xE1kzbB5ZKVXrKNoIENqil/Cf2SfHV
cp6R+SPWcHu79ZvB7JPPGeplfohwoHP89v+1VmLhc2o0mD6CuKyVU/QBoCcHcqMA
U6DksquDOFczJZSfvkgdmOGjup5czQRxUX11eKvzWarE4GC+j4NSuHUaQTXtvPM6
Y+mpFEXX5lLRbtLevOP1Czvm4MS9Q2QTps70mDdsipWol8hHD/BeEIvnHRz+sTug
BTNoBUGCwQMrAcjnj02r6LX2zWtEtefdi+zqJbQAIldNsLGyMcEWzv/9FIS3R/qy
8XDe24tsNlikfLMR0cN3f1+2JeANxdKz+bi4d9s3cXFH42AYTyS2dTd4uaNir73J
co4vzLuu2+QVUhkHM/tqty1LkCiCc/4YizWN26cEar7qwU02OxY2kTLvtkCJkUPg
8qKrBC7m8kwOFjQgrIfBLX7JZkcXFBGk8/ehJImr2BrIoVyxo/eMbcgByU/J7MT8
rFEz0ciD0cmfHdRHNCk+y7AO+oMLKFjlKdw/fKifybYKu6boRhYPluV75Gp6SG12
mAWl3G0eQh5C2hrgUve1g8Aae3g1LDj1H/1Joy7SWWO/gLCMk3PLNaaZlSJhZQNg
+y+TS/qanIA7AgMBAAGjYzBhMA4GA1UdDwEB/wQEAwIBBjAdBgNVHQ4EFgQUtqeX
gj10hZv3PJ+TmpV5dVKMbUcwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBS2
p5eCPXSFm/c8n5OalXl1UoxtRzANBgkqhkiG9w0BAQwFAAOCAgEAqMxhpr51nhVQ
pGv7qHBFfLp+sVr8WyP6Cnf4mHGCDG3gXkaqk/QeoMPhk9tLrbKmXauw1GLLXrtm
9S3ul0A8Yute1hTWjOKWi0FpkzXmuZlrYrShF2Y0pmtjxrlO8iLpWA1WQdH6DErw
M807u20hOq6OcrXDSvvpfeWxm4bu4uB9tPcy/SKE8YXJN3nptT+/XOR0so8RYgDd
GGah2XsjX/GO1WfoVNpbOms2b/mBsTNHM3dA+VKq3dSDz4V4mZqTuXNnQkYRIer+
CqkbGmVps4+uFrb2S1ayLfmlyOw7YqPta9BO1UAJpB+Y1zqlklkg5LB9zVtzaL1t
xKITDmcZuI1CfmwMmm6gJC3VRRvcxAIU/oVbZZfKTpBQCHpCNfnqwmbU+AGuHrS+
w6jv/naaoqYfRvaE7fzbzsQCzndILIyy7MMAo+wsVRjBfhnu4S/yrYObnqsZ38aK
L4x35bcF7DvB7L6Gs4a8wPfc5+pbrrLMtTWGS9DiP7bY+A4A7l3j941Y/8+LN+lj
X273CXE2whJdV/LItM3z7gLfEdxquVeEHVlNjM7IDiPCtyaaEBRx/pOyiriA8A4Q
ntOoUAw3gi/q4Iqd4Sw5/7W0cwDk90imc6y/st53BIe0o82bNSQ3+pCTE4FCxpgm
dTdmQRCsu/WU48IxK63nI1bMNSWSs1A=
-----END CERTIFICATE-----

)EOF";

/* ======================================================
   CLIENTES
====================================================== */

WiFiClientSecure secureClient;
PubSubClient mqttClient(secureClient);

/* ======================================================
   WIFI CONNECT
====================================================== */

void connectWiFi() {

  Serial.println();
  Serial.println("Conectando WiFi...");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi conectado");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

/* ======================================================
   MQTT CONNECT
====================================================== */

void connectMQTT() {

  while (!mqttClient.connected()) {

    Serial.println("Conectando MQTT...");

    String clientId = "ESP32-" + String(random(0xffff), HEX);

    if (mqttClient.connect(
          clientId.c_str(),
          MQTT_USER,
          MQTT_PASSWORD
        )) {

      Serial.println("MQTT conectado");

    } else {

      Serial.print("Error MQTT: ");
      Serial.println(mqttClient.state());

      delay(5000);
    }
  }
}

/* ======================================================
   PUBLICAR DATOS
====================================================== */

void publishSensorData() {

  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {

    Serial.println("Error leyendo DHT22");
    return;
  }

  /* ==========================================
     JSON PAYLOAD
  ========================================== */

  String payload = "{";

  payload += "\"deviceId\":\"";
  payload += DEVICE_ID;
  payload += "\",";

  payload += "\"temp\":";
  payload += String(temperature, 2);
  payload += ",";

  payload += "\"hum\":";
  payload += String(humidity, 2);
  payload += ",";

  payload += "\"timestamp\":";
  payload += String(millis());

  payload += "}";

  Serial.println("Publicando:");
  Serial.println(payload);

  bool ok = mqttClient.publish(
              topic.c_str(),
              payload.c_str(),
              true
            );

  if (ok) {
    Serial.println("Datos enviados");
  } else {
    Serial.println("Error publicando");
  }
}

/* ======================================================
   SETUP
====================================================== */

void setup() {

  Serial.begin(115200);
  delay(1000);
  Serial.println("\n Starting...\n");
  Serial.flush();

  dht.begin();

  delay(1000);

  connectWiFi();

  delay(1000);
  /* ==========================================
     TLS CERTIFICATE
  ========================================== */

  secureClient.setCACert(root_ca);

  mqttClient.setServer(MQTT_HOST, MQTT_PORT);

  connectMQTT();
}

/* ======================================================
   LOOP
====================================================== */

unsigned long lastPublish = 0;
const long publishInterval = 10000;

void loop() {

  /* ==========================================
     WIFI RECONNECT
  ========================================== */

  if (WiFi.status() != WL_CONNECTED) {

    Serial.println("WiFi desconectado");
    connectWiFi();
  }

  /* ==========================================
     MQTT RECONNECT
  ========================================== */

  if (!mqttClient.connected()) {

    connectMQTT();
  }

  mqttClient.loop();

  /* ==========================================
     PUBLICAR CADA 10 SEGUNDOS
  ========================================== */

  unsigned long now = millis();

  if (now - lastPublish > publishInterval) {

    lastPublish = now;

    publishSensorData();
  }
}