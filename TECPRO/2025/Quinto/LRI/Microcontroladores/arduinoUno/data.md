# **
        #include <SPI.h>
        #include <Ethernet.h>
        #include <PubSubClient.h>
        // MAC "localmente administrada" (cámbiala si tienes varios Arduinos)
        byte mac[] = { 0x02, 0xAA, 0xBB, 0xCC, 0xDD, 0x01 };

        // --- Ajusta estos valores si usarás IP fija ---
        IPAddress ip(192, 168, 0, 66);
        IPAddress gateway(192, 168, 0, 1);
        IPAddress dns(192, 168, 0, 1);
        IPAddress subnet(255, 255, 255, 0);
        // ----------------------------------------------
        // --- MQTT ---
        IPAddress mqtt_server(192, 168, 0, 200); // IP del servidor Debian con broker Mosquitto
        // =================== OBJETOS DE CONEXIÓN ===================
        EthernetClient ethClient;         // Cliente Ethernet
        PubSubClient client(ethClient);   // Cliente MQTT usando Ethernet

        #define LED_PIN 5 // Pin digital donde está conectado el LED (no utilizar 13,12,11,10)

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

        mensaje.trim();

        if (mensaje == "on") {
            Serial.println("Activado por MQTT");
            digitalWrite(LED_PIN, HIGH);
        } else if (mensaje == "off") {
            Serial.println("Desactivado por MQTT");
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
        // ---

        void printNetworkInfo() {
        Serial.print(F("IP local: "));     Serial.println(Ethernet.localIP());
        Serial.print(F("Gateway: "));      Serial.println(Ethernet.gatewayIP());
        Serial.print(F("DNS: "));          Serial.println(Ethernet.dnsServerIP());
        Serial.print(F("Subnet: "));       Serial.println(Ethernet.subnetMask());
        }

        void setup() {
        pinMode(LED_PIN, OUTPUT);
        digitalWrite(LED_PIN, LOW);
        Serial.begin(9600);
        while (!Serial) { /* para placas con USB nativo */ }

        Serial.println(F("\nInicializando Ethernet..."));
        int dhcp = Ethernet.begin(mac);  // Intenta DHCP

        if (dhcp == 0) {
            Serial.println(F("DHCP falló. Usando IP fija."));
            Ethernet.begin(mac, ip, dns, gateway, subnet);
        } else {
            Serial.println(F("DHCP exitoso."));
        }

        delay(1000);
        printNetworkInfo();

        // Diagnóstico de hardware/enlace (requiere Ethernet >= 2.0)
        #if defined(ETHERNET_LIB_VERSION)
            auto hw = Ethernet.hardwareStatus();
            if (hw == EthernetNoHardware) Serial.println(F("No se encontró Ethernet Shield."));
            auto link = Ethernet.linkStatus();
            if (link == LinkOFF) Serial.println(F("Sin enlace: ¿cable desconectado o puerto apagado?"));
        #endif

        // --- Mqtt
        client.setServer(mqtt_server, 1883);
        client.setCallback(callback);

        Serial.println("Arduino listo y esperando mensajes MQTT...");
        }

        void loop() {
        if (!client.connected()) {
            reconnect();
        }
        client.loop();
        }