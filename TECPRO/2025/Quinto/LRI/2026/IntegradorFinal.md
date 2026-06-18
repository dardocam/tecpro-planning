# Análisis del Comando PING y Herramientas de Diagnóstico de Red

## Objetivo

Comprender el funcionamiento del comando **PING** a nivel de red, identificando los protocolos involucrados y representando gráficamente el recorrido de los paquetes mediante un **Diagrama de Paquetes**. Complementar el análisis utilizando otras herramientas de diagnóstico de red.

---

## Consigna

Realizar un informe digital (PDF, Word o Presentación) que incluya los siguientes puntos:

### 1. Ejecución del comando PING

Desde una computadora conectada a Internet, ejecutar los siguientes comandos:

```bash
ping google.com
ping 8.8.8.8
```

Capturar una imagen (captura de pantalla) mostrando los resultados obtenidos.

---

### 2. Diagrama de Paquetes del comando PING

Realizar un diagrama que represente detalladamente el intercambio de paquetes cuando se ejecuta el comando:

```bash
ping google.com
```

El diagrama deberá incluir:

* Equipo origen (PC del usuario)
* Resolución DNS (si corresponde)
* Router local
* Proveedor de Internet (ISP)
* Routers intermedios
* Servidor destino
* Paquete ICMP Echo Request
* Paquete ICMP Echo Reply

Además, indicar:

* Dirección IP origen
* Dirección IP destino
* Protocolo utilizado (ICMP)
* Encapsulamiento Ethernet/IP/ICMP

Ejemplo simplificado:

```
PC
 │
 │ ICMP Echo Request
 ▼
Router Local
 │
 ▼
ISP
 │
 ▼
Internet
 │
 ▼
Servidor Google
 │
 │ ICMP Echo Reply
 ▼
PC
```

---

### 3. Análisis mediante TRACERT / TRACEROUTE

Ejecutar:

#### Windows

```cmd
tracert google.com
```

#### Linux

```bash
traceroute google.com
```

Responder:

1. ¿Cuántos saltos (hops) se observan?
2. ¿Qué representa cada salto?
3. ¿Por qué algunos routers no responden?
4. ¿Qué diferencias existen entre PING y TRACERT?

Adjuntar captura de pantalla.

---

### 4. Análisis del protocolo ARP

Investigar:

* ¿Qué es ARP?
* ¿Para qué sirve?
* ¿Cuándo se utiliza durante un PING?
* Diferencia entre dirección IP y dirección MAC.

Realizar un diagrama que muestre:

```
PC
 │ ¿Quién tiene 192.168.1.1?
 ▼
Router
 │ Soy 192.168.1.1
 ▼
PC
```

Explicar qué información intercambian ambos dispositivos.

---

### 5. Captura de paquetes con Wireshark

Instalar y utilizar Wireshark para capturar tráfico mientras se ejecuta un PING.

Filtrar:

```text
icmp
```

Capturar y explicar:

* ICMP Echo Request
* ICMP Echo Reply

Identificar:

* IP origen
* IP destino
* TTL
* Tamaño del paquete
* Tiempo de respuesta

Adjuntar imágenes de la captura.

---

### 6. Comparación de Herramientas de Diagnóstico

Completar la siguiente tabla:

| Herramienta        | Función | Protocolo |
| ------------------ | ------- | --------- |
| ping               |         |           |
| tracert/traceroute |         |           |
| arp                |         |           |
| nslookup           |         |           |
| wireshark          |         |           |

---

### 7. Conclusiones

Redactar una conclusión personal respondiendo:

* ¿Qué sucede exactamente cuando ejecutamos un PING?
* ¿Qué protocolos participan?
* ¿Por qué es importante ARP para la comunicación local?
* ¿Qué información adicional aporta TRACERT?
* ¿Qué aprendiste observando los paquetes en Wireshark?

---

## Entrega

**Formato:** PDF o Presentación.

**Debe incluir:**

* Capturas de pantalla.
* Diagramas realizados por el estudiante.
* Explicaciones propias.
* Bibliografía o fuentes consultadas.

### Criterios de evaluación

| Criterio                            | Puntaje |
| ----------------------------------- | ------- |
| Diagrama de paquetes completo       | 30%     |
| Uso correcto de PING, TRACERT y ARP | 25%     |
| Análisis de capturas Wireshark      | 25%     |
| Claridad de las explicaciones       | 10%     |
| Presentación y prolijidad           | 10%     |

**Puntaje total: 100 puntos**.
