# Wireshark: Tabla Principal de Captura

Cuando iniciamos una captura en Wireshark, la pantalla principal muestra una tabla donde cada fila representa un paquete capturado en la red.

Esta tabla es el punto de partida para cualquier análisis de tráfico y permite observar rápidamente qué está ocurriendo en la comunicación.

---

# Estructura General de la Tabla

| No. | Time     | Source       | Destination  | Protocol | Length | Info                                   |
| --- | -------- | ------------ | ------------ | -------- | ------ | -------------------------------------- |
| 1   | 0.000000 | 192.168.1.10 | 192.168.1.1  | ARP      | 60     | Who has 192.168.1.1? Tell 192.168.1.10 |
| 2   | 0.000435 | 192.168.1.1  | 192.168.1.10 | ARP      | 60     | 192.168.1.1 is at 00:11:22:33:44:55    |
| 3   | 0.001210 | 192.168.1.10 | 8.8.8.8      | ICMP     | 98     | Echo (ping) request                    |
| 4   | 0.025430 | 8.8.8.8      | 192.168.1.10 | ICMP     | 98     | Echo (ping) reply                      |

Cada columna proporciona información específica sobre cada paquete.

---

# 1. Columna No.

## ¿Qué representa?

Es el número secuencial del paquete dentro de la captura.

Ejemplo:

| No. |
| --- |
| 1   |
| 2   |
| 3   |
| 4   |

No es un dato de la red.

Simplemente es una numeración que Wireshark asigna para organizar los paquetes.

### Utilidad

Permite:

* Referenciar paquetes específicos.
* Comparar eventos.
* Encontrar rápidamente un paquete mencionado en un informe.

---

# 2. Columna Time

## ¿Qué representa?

Indica el momento exacto en que Wireshark capturó el paquete.

Ejemplo:

| Time     |
| -------- |
| 0.000000 |
| 0.000435 |
| 0.001210 |

Por defecto:

* El primer paquete comienza en 0 segundos.
* Los demás muestran el tiempo transcurrido desde el inicio de la captura.

---

## Utilidad

Permite medir:

* Latencia.
* Retrasos.
* Tiempo entre solicitudes y respuestas.

---

### Ejemplo con Ping

Solicitud:

```
Time = 0.001
```

Respuesta:

```
Time = 0.025
```

Tiempo de ida y vuelta:

```
0.025 - 0.001 = 0.024 segundos
```

24 ms aproximadamente.

---

# 3. Columna Source

## ¿Qué representa?

Indica quién envió el paquete.

Ejemplo:

| Source       |
| ------------ |
| 192.168.1.10 |
| 192.168.1.1  |
| 8.8.8.8      |

Puede mostrar:

* Direcciones IP.
* Direcciones MAC.
* Nombres de host.
* Dispositivos detectados.

---

## Utilidad

Permite identificar:

* El origen del tráfico.
* El equipo que inicia una comunicación.
* Posibles equipos sospechosos.

---

### Ejemplo

```
192.168.1.10 → 8.8.8.8
```

El equipo local está enviando datos.

---

# 4. Columna Destination

## ¿Qué representa?

Indica el destino del paquete.

Ejemplo:

| Destination  |
| ------------ |
| 8.8.8.8      |
| 192.168.1.10 |
| Broadcast    |

---

## Utilidad

Permite saber:

* Hacia dónde viaja el paquete.
* Qué dispositivo recibe la información.

---

### Ejemplo

```
192.168.1.10 → 8.8.8.8
```

La información viaja hacia el servidor DNS de Google.

---

# 5. Columna Protocol

## ¿Qué representa?

Muestra el protocolo identificado por Wireshark.

Ejemplo:

| Protocol |
| -------- |
| ARP      |
| ICMP     |
| TCP      |
| UDP      |
| DNS      |
| HTTP     |
| HTTPS    |

---

## Utilidad

Permite comprender qué está ocurriendo en la red.

---

### Protocolos frecuentes

| Protocolo | Función                  |
| --------- | ------------------------ |
| ARP       | Resolver direcciones MAC |
| ICMP      | Diagnóstico (Ping)       |
| TCP       | Comunicación confiable   |
| UDP       | Comunicación rápida      |
| DNS       | Resolución de nombres    |
| HTTP      | Navegación web           |
| HTTPS     | Navegación segura        |

---

# 6. Columna Length

## ¿Qué representa?

Indica el tamaño total del paquete en bytes.

Ejemplo:

| Length |
| ------ |
| 60     |
| 98     |
| 1514   |

---

## Utilidad

Permite:

* Detectar paquetes anormalmente grandes.
* Analizar consumo de ancho de banda.
* Detectar fragmentación.

---

### Ejemplo

Paquete ARP:

```
60 bytes
```

Paquete Ping:

```
98 bytes
```

Página web:

```
1500 bytes aproximadamente
```

---

# 7. Columna Info

## ¿Qué representa?

Es una descripción resumida generada por Wireshark.

Es probablemente la columna más utilizada.

---

### Ejemplos ARP

Solicitud:

```
Who has 192.168.1.1?
Tell 192.168.1.10
```

Significa:

"¿Quién tiene la IP 192.168.1.1?"

---

Respuesta:

```
192.168.1.1 is at 00:11:22:33:44:55
```

Significa:

"La IP 192.168.1.1 corresponde a la MAC 00:11:22:33:44:55"

---

### Ejemplos ICMP

Solicitud:

```
Echo (ping) request
```

---

Respuesta:

```
Echo (ping) reply
```

---

### Ejemplos TCP

```
SYN
```

Inicio de conexión.

```
SYN, ACK
```

Confirmación.

```
ACK
```

Conexión establecida.

---

### Ejemplos DNS

```
Standard query
```

Consulta DNS.

```
Standard query response
```

Respuesta DNS.

---

# Colores de la Tabla

Wireshark utiliza colores para identificar rápidamente distintos tipos de tráfico.

| Color      | Significado               |
| ---------- | ------------------------- |
| Verde      | TCP                       |
| Celeste    | UDP                       |
| Amarillo   | ARP                       |
| Negro/Rojo | Errores o retransmisiones |
| Morado     | DNS                       |

---

## Ejemplo

Al ejecutar:

```bash
ping 8.8.8.8
```

Podemos observar:

| No. | Time  | Source       | Destination  | Protocol | Length | Info                  |
| --- | ----- | ------------ | ------------ | -------- | ------ | --------------------- |
| 1   | 0.000 | 192.168.1.10 | Broadcast    | ARP      | 60     | Who has 192.168.1.1?  |
| 2   | 0.001 | 192.168.1.1  | 192.168.1.10 | ARP      | 60     | 192.168.1.1 is at ... |
| 3   | 0.002 | 192.168.1.10 | 8.8.8.8      | ICMP     | 98     | Echo request          |
| 4   | 0.028 | 8.8.8.8      | 192.168.1.10 | ICMP     | 98     | Echo reply            |

Interpretación:

1. El equipo necesita conocer la MAC del gateway.
2. Envía una consulta ARP.
3. El router responde.
4. Se envía el Ping.
5. Llega la respuesta del servidor.

---

# Resumen de las Columnas

| Campo       | ¿Qué muestra?           | Ejemplo      |
| ----------- | ----------------------- | ------------ |
| No.         | Número de paquete       | 125          |
| Time        | Momento de captura      | 0.025 s      |
| Source      | Origen                  | 192.168.1.10 |
| Destination | Destino                 | 8.8.8.8      |
| Protocol    | Protocolo               | ICMP         |
| Length      | Tamaño en bytes         | 98           |
| Info        | Descripción del paquete | Echo Request |

## Idea clave

Al observar una fila de Wireshark deben hacerse siempre estas preguntas:

1. ¿Quién envía el paquete? (**Source**)
2. ¿Quién lo recibe? (**Destination**)
3. ¿Qué protocolo utiliza? (**Protocol**)
4. ¿Cuándo ocurrió? (**Time**)
5. ¿Cuánto ocupa? (**Length**)
6. ¿Qué está haciendo exactamente? (**Info**)

Si pueden responder estas seis preguntas para cada paquete, estarán interpretando correctamente el tráfico de red capturado por Wireshark.
