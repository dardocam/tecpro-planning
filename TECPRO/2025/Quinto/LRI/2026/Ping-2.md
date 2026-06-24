# Análisis del comando `ping www.google.com` con Wireshark

## Objetivos

* Comprender el proceso completo que ocurre al ejecutar un comando `ping` utilizando un nombre de dominio.
* Identificar los protocolos involucrados.
* Analizar la información contenida en cada paquete capturado con Wireshark.
* Relacionar direcciones IP y direcciones MAC durante la comunicación.

---

# Introducción

Cuando un usuario ejecuta el comando:

```bash
ping www.google.com
```

la computadora no conoce inicialmente la dirección IP del servidor de Google. Para poder enviar los paquetes ICMP es necesario realizar varios pasos previos utilizando distintos protocolos de red.

Los principales protocolos involucrados son:

* ARP (Address Resolution Protocol)
* DNS (Domain Name System)
* ICMP (Internet Control Message Protocol)

Cada uno cumple una función específica dentro del proceso de comunicación.

---

# Paso 1: Resolución de Dirección MAC mediante ARP

Antes de enviar cualquier paquete fuera de la red local, el equipo debe conocer la dirección MAC del Gateway (Router).

Supongamos:

| Dispositivo | IP            |
| ----------- | ------------- |
| PC          | 192.168.1.100 |
| Gateway     | 192.168.1.1   |
| DNS         | 8.8.8.8       |

La PC envía un mensaje broadcast:

```text
¿Quién tiene la IP 192.168.1.1?
```

Este mensaje llega a todos los equipos de la red local.

El router responde:

```text
La IP 192.168.1.1 me pertenece.
Mi MAC es AA:BB:CC:DD:EE:FF
```

A partir de ese momento la PC puede enviar tráfico al exterior.

---

# Paso 2: Consulta DNS

Ahora la PC necesita conocer la dirección IP asociada al nombre:

```text
www.google.com
```

Para ello realiza una consulta DNS.

Consulta:

```text
¿Cuál es la dirección IP de www.google.com?
```

Respuesta típica:

```text
www.google.com = 142.250.184.36
```

Una vez obtenida la dirección IP, el sistema operativo puede iniciar el ping.

---

# Paso 3: Comunicación ICMP

Finalmente comienza el intercambio ICMP.

La PC envía:

```text
ICMP Echo Request
```

Google responde:

```text
ICMP Echo Reply
```

Este proceso se repite varias veces mientras el comando permanece activo.

---

# Diagrama General del Proceso

```text
PC
 │
 ├── ARP Request ─────────► Red Local
 │
 ◄──────── ARP Reply ───── Router
 │
 ├── DNS Query ───────────► Servidor DNS
 │
 ◄──────── DNS Response ── Servidor DNS
 │
 ├── ICMP Echo Request ───► Google
 │
 ◄──────── Echo Reply ───── Google
 │
 ├── ICMP Echo Request ───► Google
 │
 ◄──────── Echo Reply ───── Google
```

---

# Tabla de Análisis de Paquetes

## Ejemplo de Captura

Supongamos:

| Equipo     | Dirección IP   | Dirección MAC           |
| ---------- | -------------- | ----------------------- |
| PC         | 192.168.1.100  | 00:11:22:33:44:55       |
| Router     | 192.168.1.1    | AA:BB:CC:DD:EE:FF       |
| DNS Google | 8.8.8.8        | No visible (red remota) |
| Google     | 142.250.184.36 | No visible (red remota) |

---

## Paquete 1 – ARP Request

| Campo       | Valor                           |
| ----------- | ------------------------------- |
| Protocolo   | ARP                             |
| IP Origen   | 192.168.1.100                   |
| IP Destino  | 192.168.1.1                     |
| MAC Origen  | 00:11:22:33:44:55               |
| MAC Destino | FF:FF:FF:FF:FF:FF (Broadcast)   |
| Descripción | ¿Quién tiene la IP 192.168.1.1? |

---

## Paquete 2 – ARP Reply

| Campo       | Valor                    |
| ----------- | ------------------------ |
| Protocolo   | ARP                      |
| IP Origen   | 192.168.1.1              |
| IP Destino  | 192.168.1.100            |
| MAC Origen  | AA:BB:CC:DD:EE:FF        |
| MAC Destino | 00:11:22:33:44:55        |
| Descripción | El router informa su MAC |

---

## Paquete 3 – DNS Query

| Campo       | Valor                                                |
| ----------- | ---------------------------------------------------- |
| Protocolo   | DNS                                                  |
| IP Origen   | 192.168.1.100                                        |
| IP Destino  | 8.8.8.8                                              |
| MAC Origen  | 00:11:22:33:44:55                                    |
| MAC Destino | AA:BB:CC:DD:EE:FF                                    |
| Descripción | Consulta por [www.google.com](http://www.google.com) |

**Observación:** Aunque el destino IP es 8.8.8.8, la MAC destino sigue siendo la del router porque el DNS está fuera de la red local.

---

## Paquete 4 – DNS Response

| Campo       | Valor                         |
| ----------- | ----------------------------- |
| Protocolo   | DNS                           |
| IP Origen   | 8.8.8.8                       |
| IP Destino  | 192.168.1.100                 |
| MAC Origen  | AA:BB:CC:DD:EE:FF             |
| MAC Destino | 00:11:22:33:44:55             |
| Descripción | Respuesta con la IP de Google |

---

## Paquete 5 – ICMP Echo Request

| Campo       | Valor                   |
| ----------- | ----------------------- |
| Protocolo   | ICMP                    |
| IP Origen   | 192.168.1.100           |
| IP Destino  | 142.250.184.36          |
| MAC Origen  | 00:11:22:33:44:55       |
| MAC Destino | AA:BB:CC:DD:EE:FF       |
| Descripción | Solicitud de eco (Ping) |

---

## Paquete 6 – ICMP Echo Reply

| Campo       | Valor             |
| ----------- | ----------------- |
| Protocolo   | ICMP              |
| IP Origen   | 142.250.184.36    |
| IP Destino  | 192.168.1.100     |
| MAC Origen  | AA:BB:CC:DD:EE:FF |
| MAC Destino | 00:11:22:33:44:55 |
| Descripción | Respuesta de eco  |

---

# Análisis Importante

## Direcciones IP

Las direcciones IP identifican el origen y destino final de la comunicación.

Ejemplo:

```text
192.168.1.100 → 142.250.184.36
```

La IP no cambia durante el recorrido.

---

## Direcciones MAC

Las direcciones MAC identifican únicamente el siguiente salto dentro de la red local.

Cuando el paquete atraviesa un router:

```text
IP Origen = permanece igual
IP Destino = permanece igual

MAC Origen = cambia
MAC Destino = cambia
```

Por este motivo, desde nuestra PC observamos siempre la MAC del router como destino para cualquier servidor de Internet.

---

# Conclusión

Al ejecutar:

```bash
ping www.google.com
```

intervienen tres protocolos fundamentales:

1. **ARP** → Obtiene la MAC del Gateway.
2. **DNS** → Obtiene la dirección IP de Google.
3. **ICMP** → Realiza la prueba de conectividad.

La secuencia completa observada en Wireshark es:

```text
ARP Request
ARP Reply
DNS Query
DNS Response
ICMP Echo Request
ICMP Echo Reply
```

Comprender esta secuencia permite interpretar correctamente las capturas de Wireshark y entender cómo cooperan las distintas capas del modelo TCP/IP para lograr una comunicación exitosa en Internet.
