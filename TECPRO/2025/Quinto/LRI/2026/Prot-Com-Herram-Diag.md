# Protocolos de Comunicación y Herramientas Básicas de Diagnóstico

## Funcionamiento del comando PING y visualización de paquetes ARP e ICMP


# Objetivos de Aprendizaje

Al finalizar la clase, el estudiante será capaz de:

* Comprender qué es un protocolo de comunicación.
* Diferenciar los protocolos ARP e ICMP.
* Entender el funcionamiento interno del comando PING.
* Analizar el intercambio de paquetes ARP e ICMP.
* Utilizar herramientas de diagnóstico de red.
* Capturar y visualizar tráfico de red mediante Wireshark.
* Interpretar tiempos de respuesta y pérdidas de paquetes.

---

# 1. Introducción a los Protocolos de Comunicación

## ¿Qué es un protocolo?

Un protocolo es un conjunto de reglas que permiten que dos dispositivos intercambien información.

Ejemplos cotidianos:

* Dos personas hablando el mismo idioma.
* Un semáforo regulando el tránsito.
* Un reglamento deportivo.

En redes sucede exactamente lo mismo.

---

## Ejemplos de protocolos

| Protocolo | Función                      |
| --------- | ---------------------------- |
| HTTP      | Navegación web               |
| HTTPS     | Navegación segura            |
| FTP       | Transferencia de archivos    |
| DNS       | Traducción de nombres        |
| DHCP      | Asignación de IP             |
| ARP       | Obtención de direcciones MAC |
| ICMP      | Diagnóstico de red           |
| TCP       | Comunicación confiable       |
| UDP       | Comunicación rápida          |

---

# 2. Direcciones IP y MAC

Antes de entender PING debemos comprender dos identificadores fundamentales.

## Dirección IP

Identifica un dispositivo dentro de una red lógica.

Ejemplo:

```
192.168.1.100
```

Es comparable al número de una casa.

---

## Dirección MAC

Identifica físicamente una interfaz de red.

Ejemplo:

```
A4:CF:12:8D:3B:AA
```

Es comparable al DNI de la placa de red.

---

# 3. ¿Qué es ARP?

ARP significa:

**Address Resolution Protocol**

Su función es:

> Obtener la dirección MAC asociada a una dirección IP.

---

## Problema que resuelve

Supongamos:

```
PC A → 192.168.1.10

PC B → 192.168.1.20
```

La PC A conoce la IP de la PC B.

Pero Ethernet no transmite usando IP.

Ethernet transmite utilizando MAC.

Por lo tanto:

```
Necesito la MAC correspondiente
a la IP 192.168.1.20
```

Aquí aparece ARP.

---

# 4. Funcionamiento de ARP

## Paso 1

La PC A envía un broadcast:

```
ARP Request
```

Mensaje:

```
¿Quién tiene la IP 192.168.1.20?
```

---

## Paso 2

Todos reciben el mensaje.

Solo la PC B responde:

```
ARP Reply
```

Mensaje:

```
192.168.1.20 soy yo
Mi MAC es:
00:11:22:33:44:55
```

---

## Paso 3

La PC A guarda la asociación en la tabla ARP.

```
IP                MAC
192.168.1.20      00:11:22:33:44:55
```

---

# Visualización del proceso

```text
PC A                           PC B

¿Quién tiene 192.168.1.20?
------ ARP Request -------->

<------ ARP Reply ----------
Mi MAC es 00:11:22:33:44:55
```

---

# 5. ¿Qué es ICMP?

ICMP significa:

**Internet Control Message Protocol**

Se utiliza para:

* Diagnóstico
* Reporte de errores
* Verificación de conectividad

---

## Herramientas que usan ICMP

### Ping

Verifica si un host está activo.

### Traceroute

Determina la ruta seguida por los paquetes.

---

# 6. ¿Qué es PING?

PING es una herramienta que utiliza mensajes ICMP.

Permite responder:

* ¿Existe conectividad?
* ¿Cuánto tarda la comunicación?
* ¿Hay pérdidas de paquetes?

---

## Sintaxis

Windows:

```cmd
ping 192.168.1.20
```

Linux:

```bash
ping 192.168.1.20
```

---

# 7. Funcionamiento Interno de PING

Muchos estudiantes creen que PING es un protocolo.

No lo es.

PING es una aplicación.

Utiliza mensajes ICMP.

---

## Paso 1

El equipo genera un:

```text
ICMP Echo Request
```

---

## Paso 2

El paquete viaja hacia el destino.

---

## Paso 3

El destino responde:

```text
ICMP Echo Reply
```

---

# Esquema

```text
PC A                             PC B

Echo Request
------ ICMP -------->

<------ ICMP --------
Echo Reply
```

---

# 8. Secuencia Completa Real

Cuando hacemos:

```bash
ping 192.168.1.20
```

ocurren dos protocolos simultáneamente.

---

## Si no existe entrada ARP

Primero:

```text
ARP Request
```

Luego:

```text
ARP Reply
```

---

## Después

```text
ICMP Echo Request
```

---

## Finalmente

```text
ICMP Echo Reply
```

---

# Secuencia completa

```text
PC A                            PC B

ARP Request
------------------------------->

<-------------------------------
ARP Reply

ICMP Echo Request
------------------------------->

<-------------------------------
ICMP Echo Reply
```

---

# Concepto importante

Cuando hacemos el primer ping:

```bash
ping 192.168.1.20
```

normalmente el primer paquete demora más.

¿Por qué?

Porque primero debe resolverse ARP.

Una vez aprendida la MAC:

```text
ARP Cache
```

los siguientes paquetes son más rápidos.

---

# 9. Tabla ARP

Visualización en Windows:

```cmd
arp -a
```

Ejemplo:

```text
Interface: 192.168.1.10

Internet Address      Physical Address

192.168.1.20          00-11-22-33-44-55
```

---

# Borrar caché ARP

Windows:

```cmd
arp -d *
```

Linux:

```bash
sudo ip neigh flush all
```

---

# 10. Captura de ARP e ICMP con Wireshark

## ¿Qué es Wireshark?

Es un analizador de protocolos.

Permite observar los paquetes que circulan por la red.

Wireshark

---

# Práctica de Laboratorio

## Paso 1

Abrir Wireshark.

Seleccionar la interfaz de red.

---

## Paso 2

Comenzar captura.

---

## Paso 3

Limpiar caché ARP.

```cmd
arp -d *
```

---

## Paso 4

Ejecutar:

```cmd
ping 192.168.1.20
```

---

# Filtrar ARP

En Wireshark:

```text
arp
```

Veremos:

```text
Who has 192.168.1.20?
Tell 192.168.1.10
```

---

## Respuesta

```text
192.168.1.20 is at
00:11:22:33:44:55
```

---

# Filtrar ICMP

Filtro:

```text
icmp
```

Veremos:

```text
Echo Request
Echo Reply
Echo Request
Echo Reply
```

---

# Ejemplo de Captura

```text
No.   Source        Destination     Protocol

1     PC A          Broadcast       ARP
2     PC B          PC A            ARP

3     PC A          PC B            ICMP
4     PC B          PC A            ICMP

5     PC A          PC B            ICMP
6     PC B          PC A            ICMP
```

---

# 11. Interpretación de Resultados

## Respuesta exitosa

```text
Reply from 192.168.1.20

time=1ms
TTL=64
```

---

## Tiempo (RTT)

Round Trip Time

Tiempo total de ida y vuelta.

```text
1 ms
```

Excelente.

```text
100 ms
```

Aceptable.

```text
500 ms
```

Problemas de red.

---

## Pérdida de paquetes

```text
Packets: Sent = 4
Received = 4
Lost = 0
```

Perfecto.

---

## Host inaccesible

```text
Destination Host Unreachable
```

No existe ruta válida.

---

## Tiempo agotado

```text
Request Timed Out
```

El destino no respondió.

---

# 12. Actividad Práctica

## Objetivo

Visualizar la secuencia ARP + ICMP.

---

### Grupo de trabajo

Dos computadoras conectadas a la misma red.

---

### Tareas

1. Obtener IP de ambas PCs.
2. Abrir Wireshark.
3. Eliminar caché ARP.
4. Ejecutar ping.
5. Capturar tráfico.
6. Identificar:

* ARP Request
* ARP Reply
* ICMP Echo Request
* ICMP Echo Reply

---

### Preguntas

1. ¿Qué protocolo apareció primero?
2. ¿Por qué?
3. ¿Cuál era la IP buscada?
4. ¿Cuál era la MAC encontrada?
5. ¿Cuántos paquetes ICMP se enviaron?
6. ¿Cuál fue el RTT promedio?
7. ¿Qué ocurre al repetir el ping?

---

# Conclusión

El comando **PING** es una de las herramientas más importantes para el diagnóstico de redes porque permite verificar la conectividad mediante mensajes **ICMP Echo Request** y **Echo Reply**. Sin embargo, antes de que ICMP pueda funcionar en una red local, generalmente interviene **ARP**, encargado de descubrir la dirección MAC asociada a la IP de destino.

Por lo tanto, cada vez que ejecutamos un ping dentro de una LAN, normalmente observamos la siguiente secuencia:

```text
ARP Request
ARP Reply
ICMP Echo Request
ICMP Echo Reply
```

Comprender esta secuencia permite interpretar correctamente los diagnósticos de red, solucionar problemas de conectividad y analizar el tráfico utilizando herramientas profesionales como Wireshark.
