# Paso a paso: Arduino + Ethernet Shield (W5100/W5500) + Ping

## 1) Lo que necesitas

* Arduino UNO (o similar) + **Ethernet Shield** (W5100 o W5500).
* Cable de red **UTP**.
* Un **router/switch** (o conexión directa a una PC, ver nota al final).
* PC para cargar el sketch y hacer `ping`.

## 2) Conexión física

1. Monta el shield sobre el Arduino (alineado y bien presionado).
2. Conecta el Arduino por **USB** a la PC para alimentarlo y cargar el código.
3. Conecta el **cable de red** desde el shield al **router/switch** (o a la PC si será conexión directa).
4. Revisa los LEDs del puerto RJ45 del shield: normalmente se enciende **LINK** fijo y **ACT** parpadea cuando hay tráfico.

## 3) Plan de red (elige una de dos opciones)

**Opción A – DHCP (automático):** el router asignará IP al Arduino. Es lo más simple.
**Opción B – IP fija:** define una IP libre de tu red (ej.: 192.168.1.200), junto con **gateway**, **DNS** (normalmente la IP del router) y **subred** (255.255.255.0 en redes hogareñas).

> Tip: averigua tu red desde tu PC
>
> * Windows: `ipconfig`
> * macOS/Linux: `ifconfig` o `ip a`
>   Fíjate la IP del **router** (p. ej. 192.168.1.1) y el rango de tu red (p. ej. 192.168.1.x).

## 4) Carga este sketch (DHCP con fallback a IP fija)

Copia y sube este código. Si el DHCP falla, usará la IP fija que definas.

```cpp
#include <SPI.h>
#include <Ethernet.h>

// MAC "localmente administrada" (cámbiala si tienes varios Arduinos)
byte mac[] = { 0x02, 0x60, 0x94, 0x00, 0x00, 0x01 };

// --- Ajusta estos valores si usarás IP fija ---
IPAddress ip(192, 168, 1, 200);
IPAddress gateway(192, 168, 1, 1);
IPAddress dns(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);
// ----------------------------------------------

void printNetworkInfo() {
  Serial.print(F("IP local: "));     Serial.println(Ethernet.localIP());
  Serial.print(F("Gateway: "));      Serial.println(Ethernet.gatewayIP());
  Serial.print(F("DNS: "));          Serial.println(Ethernet.dnsServerIP());
  Serial.print(F("Subnet: "));       Serial.println(Ethernet.subnetMask());
}

void setup() {
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
}

void loop() {
  // No hace falta nada más: el chip WIZnet responde a ping por hardware
  // una vez inicializado con Ethernet.begin(...)
}
```

> Nota: El chip WIZnet (W5100/W5500) responde **automáticamente** a ICMP Echo (ping) cuando está inicializado con `Ethernet.begin(...)`. No necesitas “server” ni manejar ICMP en tu sketch.

## 5) Ver la IP del Arduino

* Abre el **Monitor Serie** a 9600 baudios y espera el mensaje:

  * Si usaste DHCP, verás la IP asignada (p. ej. `192.168.1.123`).
  * Si falló el DHCP, verás la IP fija (p. ej. `192.168.1.200`).

## 6) Probar con `ping`

Desde tu PC (en la **misma red**):

* **Windows:**

  ```
  ping 192.168.1.200
  ```
* **macOS/Linux (4 intentos):**

  ```
  ping -c 4 192.168.1.200
  ```

Deberías ver respuestas con tiempo (**time=... ms**) y **TTL**. Si todo está OK, ¡listo!

---

## Conexión directa Arduino ↔ PC (sin router)

1. Conecta el cable de red entre shield y PC (la mayoría de NICs hacen auto MDI-X; no necesitas crossover).
2. Configura una **IP estática en la PC**, por ejemplo:

   * PC: 192.168.10.1 / máscara 255.255.255.0
3. Ajusta el sketch a una IP fija en el mismo rango:

   * Arduino: 192.168.10.2 / máscara 255.255.255.0
     (gateway y DNS pueden quedar 0.0.0.0 o iguales a la PC; no se usan para ping local)
4. Carga y prueba `ping 192.168.10.2` desde la PC.

---

## Problemas típicos y soluciones rápidas

* **No hay respuesta al ping**

  * Verifica **LED LINK** en el conector: si está apagado, hay problema de cable/puerto/energía.
  * Asegúrate de que **PC y Arduino** están en la **misma subred** (ej.: ambos 192.168.1.x).
  * Evita **IP duplicadas**: cambia la IP fija si ya está usada.
  * En Wi-Fi, desactiva **AP/Client Isolation** en el Access Point.
  * En la PC, desactiva temporalmente firewalls que bloqueen **ICMP**.
  * Si intentas ping entre **subredes distintas**, necesitas **enrutamiento/gateway** correcto.
* **DHCP falla**: usa IP fija o revisa que el cable esté en el **router** y que el **servidor DHCP** esté activo.
* **Varios Arduinos**: cambia la **MAC** en cada uno para evitar conflictos.
* **Alimentación**: el shield suma consumo; asegúrate de alimentar bien el Arduino (USB o fuente 7–12 V de calidad).

## ¿Por qué los Arduino + Ethernet Shield no traen una MAC única de fábrica?

* Los **chips Ethernet más comunes para Arduino (W5100, W5500)** **no tienen una dirección MAC quemada en hardware** (no llevan EEPROM ni registro permanente de fábrica).
* Son **controladores genéricos** que el fabricante (WIZnet) vende como **"controlador Ethernet crudo"**, y espera que cada **fabricante de placa final** (o el usuario) defina qué MAC se va a usar.
* A diferencia de una **placa de red de PC**, un **router** o un **módulo ESP32 con WiFi**, que **sí traen una MAC única asignada** por el fabricante (registrada en el IEEE).

---

### 🔹 2. ¿Qué pasa si usas cualquier MAC?

* En una red, cada dispositivo debe tener una **MAC única**, porque es el identificador en la capa 2 (Ethernet).
* Si usas la **misma MAC en dos dispositivos**, la red se confunde: los paquetes pueden ir a un dispositivo u otro (colisiones de ARP).
* Por eso en los ejemplos de Arduino siempre ves una MAC "inventada" en el sketch:

```cpp
byte mac[] = { 0x02, 0x60, 0x94, 0x00, 0x00, 0x01 };
```

---

### 🔹 3. ¿Cómo elegir una MAC válida para Arduino?

El **bloque de direcciones MAC únicas** se compra al IEEE (eso hacen las empresas grandes).
Como usuarios, podemos usar **MACs “localmente administradas”**, que son válidas en tu red privada:

* Una MAC son **6 bytes en hex** (ej: `02:xx:xx:xx:xx:xx`).
* Si el **primer byte** es **par** → MAC "global" (asignada por IEEE).
* Si el **primer byte** es **impar en el bit 1** (ej. `02` o `06` o `0A`…), se considera **“locally administered”** (válida en redes privadas).

👉 Ejemplo de MAC seguras para Arduino:

```
02:AA:BB:CC:DD:01
02:AA:BB:CC:DD:02
02:AA:BB:CC:DD:03
```

Mientras no repitas la misma en tu LAN, no habrá problema.

---

### 🔹 4. ¿Entonces qué diferencia hay con un ESP32 o un router?

* **ESP32, WiFi de PC, routers, placas de red**: traen una **MAC global única** de fábrica, ya que el fabricante pagó al IEEE un bloque de direcciones.
* **Arduino + W5100/W5500**: **no** la trae → tienes que asignarla manualmente.

---

👉 En resumen:
El **Ethernet Shield no tiene MAC propia** porque el chip no la incluye.
Depende de ti (o del fabricante del shield, si lo programara de fábrica) asignar una **MAC válida y única en tu red**.

---



