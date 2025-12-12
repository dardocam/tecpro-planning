# 📡 **Funcionamiento básico de una red Ethernet cableada**

Ethernet es una tecnología de red de área local (LAN) que permite comunicar dispositivos mediante **cables** y **protocolos estándar** para enviar y recibir datos de forma confiable.

A continuación se describen sus elementos fundamentales.

---

# 1️⃣ **Componentes esenciales**

### **a) Dispositivos finales**

Son los equipos que generan o consumen datos:

* Computadoras
* Impresoras
* Cámaras IP
* Servidores

### **b) Interconexión**

* **Switch:** equipo que conecta varios dispositivos, detecta qué equipo está en qué puerto y envía los datos solo al destinatario correcto.
* **Router:** conecta la red local con otras redes (por ejemplo, Internet).
* **Cables Ethernet:** típicamente UTP categoría 5e/6/6A. Usa conectores RJ-45.

---

# 2️⃣ **Direcciones necesarias**

### **a) Dirección MAC**

* Identificador físico único de 48 bits.
* Asignado a cada tarjeta de red.
* Formato: `AA:BB:CC:11:22:33`.
* Funciona en la **capa 2 (enlace de datos)**.

### **b) Dirección IP**

* Identificador lógico usado para comunicarse en una red IP.
* Ejemplo IPv4: `192.168.0.15`.
* Funciona en la **capa 3 (red)**.

---

# 3️⃣ **Capas relevantes del modelo OSI**

Ethernet usa principalmente:

### **🔹 Capa 1: Física**

Incluye:

* Cables
* Señales eléctricas
* Conectores
* Especificaciones de velocidad (100 Mbps, 1 Gbps, 10 Gbps)

### **🔹 Capa 2: Enlace de datos**

Define:

* Formato de **trama Ethernet**
* Dirección MAC
* Protocolo ARP
* Control de errores básico (FCS)

---

# 4️⃣ **Trama Ethernet (estructura básica)**

Una trama es la unidad de datos que se envía por Ethernet.

Contiene:

| Campo              | Función                                           |
| ------------------ | ------------------------------------------------- |
| **Destino MAC**    | Dirección física del receptor                     |
| **Origen MAC**     | Dirección física del emisor                       |
| **Tipo/Ethertype** | Indica qué protocolo va dentro (p. ej. IPv4, ARP) |
| **Payload**        | Datos (paquete IP u otra info)                    |
| **FCS**            | Chequeo de errores CRC-32                         |

Tamaño: **64 a 1518 bytes** (estándar).

---

# 5️⃣ **Cómo se envían los datos en Ethernet**

### **Paso 1: El dispositivo quiere comunicarse**

Ej.: PC1 quiere enviar datos a PC2.

### **Paso 2: Se determina la MAC destino (ARP)**

Si PC1 solo conoce la dirección IP de PC2:

* Envía una **consulta ARP (Broadcast)**.
* PC2 responde con su MAC.

### **Paso 3: PC1 arma la trama Ethernet**

Incluye:

* MAC destino de PC2
* MAC origen de PC1
* Paquete IP dentro de la trama

### **Paso 4: El switch recibe la trama**

El switch:

* Detecta la MAC origen y la registra en su tabla de direcciones.
* Busca la MAC destino en su tabla.
* Envía la trama **solo al puerto adecuado**.
  (Si no la conoce, hace *flooding* enviándola a todos los puertos excepto el origen).

### **Paso 5: El receptor procesa los datos**

PC2 recibe la trama:

* Verifica el FCS (CRC)
* Extrae el paquete IP
* Procesa los datos de la capa superior (TCP/UDP, aplicación, etc.)

---

# 6️⃣ **Velocidad y negociación**

Cuando un dispositivo se conecta:

* Negocian automáticamente la velocidad (10/100/1000/10000 Mbps)
* Determinan si usar **full-duplex** (envío y recepción simultánea) o **half-duplex**.

---

# 7️⃣ **Dominios importantes en la red**

### **a) Dominio de colisión**

* Áreas donde los dispositivos compiten por el medio físico.
* Con switches modernos: prácticamente **cada puerto es su propio dominio**, por lo que no colisionan.

### **b) Dominio de broadcast**

* Un broadcast lo reciben todos en la LAN.
* ARP, DHCP, anuncios…
* Se puede separar con **routers o VLANs**.

---

# 8️⃣ **Protocolos más comunes relacionados**

| Protocolo       | Función                      |
| --------------- | ---------------------------- |
| **Ethernet II** | Formato principal de trama   |
| **ARP**         | Resolver IP ↔ MAC            |
| **IP**          | Enrutamiento lógico          |
| **TCP/UDP**     | Transporte                   |
| **DHCP**        | Asignación automática de IPs |
| **STP**         | Previene bucles en switches  |

---

# 9️⃣ **Topología típica de una red Ethernet**

```
PC ––\
Laptop ––> SWITCH ––> ROUTER ––> INTERNET
Servidor –/
Impresora –/
```

---

# 🔟 **Ventajas de Ethernet**

* Alta velocidad y estabilidad
* Menor interferencia que el WiFi
* Bajo costo
* Bajísima latencia
* Fácil mantenimiento y escalabilidad

---

---
---


# **Cómo se comunica un Host A con un Host B cuando Host A ejecuta un comando `ping` hacia Host B**.

Incluye todo lo que ocurre en **cada capa**, cómo intervienen **MAC, IP, ARP, ICMP, switches y routers**, y cómo se devuelven las respuestas.

---

# 📡 **¿Qué es `ping`?**

`ping` usa el protocolo **ICMP (Internet Control Message Protocol)** para enviar:

* **Echo Request** (solicitud de eco)
* **Echo Reply** (respuesta de eco)

Sirve para:

* Verificar conectividad
* Medir latencia

---

# 🧬 **Supuestos del escenario**

* Host A quiere hacer `ping` a la **IP de Host B**.
* Ambos están en la **misma red** (ej.: 192.168.1.0/24).
* Están conectados a través de switches Ethernet.

*(Si deseas, te explico también el caso con router/router intermedio.)*

---

# 🛰️ **FLUJO COMPLETO DEL PING — PASO A PASO**

---

# ✅ **PASO 1 — Host A analiza si Host B está en su misma red**

Host A compara:

* Su IP: `192.168.1.10`
* Máscara: `255.255.255.0`
* IP destino: `192.168.1.20`

Como ambas IP pertenecen a la misma red /24…
➡️ **Host A sabe que puede enviar directamente a Host B** sin pasar por un router.

---

# ✅ **PASO 2 — Host A necesita la MAC de Host B**

Para enviar datos por Ethernet se necesita la **dirección MAC**, no la IP.

Host A consulta su **tabla ARP**:

* Si ya tiene la IP–MAC de Host B → pasa al paso 4.
* Si **NO la tiene**…

---

# 🔍 **PASO 3 — Resolución ARP (si es necesario)**

Host A envía un **ARP Request**:

* Trama Ethernet **broadcast** → FF:FF:FF:FF:FF:FF
* Pide:

  > “¿Quién tiene la IP 192.168.1.20? Que responda con su MAC.”

Todos los hosts reciben el broadcast, pero solo Host B responde:

* **ARP Reply** (unicast a Host A) con su MAC:

  > “Yo, 192.168.1.20, tengo la MAC AA:BB:CC:DD:EE:FF.”

Host A **guarda** esa relación en su tabla ARP.

---

# 🚀 **PASO 4 — Host A construye el paquete ICMP Echo Request**

### **a) Nivel ICMP**

Crea un **ICMP Echo Request**:

* Tipo: 8
* Código: 0
* Identificador
* Contador de secuencia
* Datos (usualmente 56 bytes)

### **b) Nivel IP**

Encapsula el ICMP en un paquete IP:

* IP Origen: 192.168.1.10
* IP Destino: 192.168.1.20
* Protocolo: ICMP (1)

### **c) Nivel Ethernet**

Crea una **trama Ethernet**:

* MAC destino: MAC de Host B
* MAC origen: MAC de Host A
* Ethertype: 0x0800 (IPv4)
* Payload: paquete IP

---

# 🟦 **PASO 5 — El switch procesa la trama**

El switch:

1. Aprende la MAC de Host A por el puerto de entrada.
2. Consulta su **tabla CAM/FIB** para encontrar dónde está la MAC de Host B.
3. Reenvía la trama **solo por el puerto correcto**.

*(Si no sabe la MAC → flooding a todos los puertos excepto el de entrada.)*

---

# 🟢 **PASO 6 — Host B recibe la trama**

Host B:

1. Ve que la MAC destino coincide → acepta la trama.
2. Verifica el **FCS** (Checksum Ethernet).
3. Extrae el **paquete IP**.
4. Verifica:

   * IP destino coincide
   * Protocolo = ICMP
5. Extrae el **ICMP Echo Request**.

---

# 🔄 **PASO 7 — Host B genera un ICMP Echo Reply**

Host B prepara una respuesta:

### ICMP Echo Reply

* Tipo: 0
* Código: 0
* Mismo identificador y secuencia que el Request

### Cabecera IP

* IP origen: 192.168.1.20
* IP destino: 192.168.1.10

### Trama Ethernet

* MAC destino: MAC de Host A
* MAC origen: MAC de Host B

---

# 🟧 **PASO 8 — Switch reenvía la respuesta hacia Host A**

Mismo proceso:

* Aprende/actualiza tabla MAC
* Reenvía por el puerto donde está Host A

---

# 🟩 **PASO 9 — Host A recibe la respuesta**

Host A:

* Recibe ICMP Echo Reply
* Calcula RTT (Round Trip Time)
* Muestra resultados:

```
Respuesta desde 192.168.1.20: bytes=32 tiempo=1ms TTL=64
```

---

# 📘 **RESUMEN DEL CICLO COMPLETO**

```
A → ARP Request (broadcast)
B → ARP Reply (unicast)
A → ICMP Echo Request (unicast)
B → ICMP Echo Reply (unicast)
```

---

