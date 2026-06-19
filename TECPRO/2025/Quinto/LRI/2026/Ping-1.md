# Wiki Herramientas de diagnóstico de redes

El comando **`ping`** es una de las herramientas de diagnóstico más utilizadas en redes. Permite comprobar si un equipo es alcanzable y medir el tiempo que tardan los paquetes en viajar hasta él y regresar.

## Sintaxis básica

### Linux

```bash
ping [opciones] destino
```

Ejemplo:

```bash
ping 8.8.8.8
```

Por defecto, Linux envía pings indefinidamente hasta que se presiona:

```text
Ctrl + C
```

---

### Windows

```cmd
ping [opciones] destino
```

Ejemplo:

```cmd
ping 8.8.8.8
```

Por defecto, Windows envía **4 solicitudes ICMP** y luego finaliza.

---

# Opciones más utilizadas en Linux

| Opción        | Descripción                               |
| ------------- | ----------------------------------------- |
| `-c cantidad` | Envía una cantidad específica de paquetes |
| `-i segundos` | Intervalo entre paquetes                  |
| `-s tamaño`   | Tamaño de los datos enviados              |
| `-t ttl`      | Define el TTL del paquete                 |
| `-W tiempo`   | Tiempo de espera por respuesta            |
| `-f`          | Flood Ping (envío masivo)                 |
| `-b`          | Permite enviar a broadcast                |
| `-4`          | Fuerza IPv4                               |
| `-6`          | Fuerza IPv6                               |
| `-I interfaz` | Selecciona interfaz de red                |

Ejemplo:

```bash
ping -c 10 8.8.8.8
```

Envía exactamente 10 paquetes.

---

# Opciones más utilizadas en Windows

| Opción        | Descripción                |
| ------------- | -------------------------- |
| `-t`          | Ping continuo (indefinido) |
| `-n cantidad` | Número de solicitudes      |
| `-l tamaño`   | Tamaño del buffer          |
| `-i ttl`      | TTL                        |
| `-w tiempo`   | Timeout en ms              |
| `-4`          | IPv4                       |
| `-6`          | IPv6                       |
| `-a`          | Resolver nombre DNS        |
| `-f`          | No fragmentar paquete      |

Ejemplo:

```cmd
ping -n 20 8.8.8.8
```

Envía 20 solicitudes.

---

# Ping indefinido en Windows

Una diferencia importante entre Linux y Windows:

### Linux

```bash
ping 8.8.8.8
```

Ya es continuo.

---

### Windows

```cmd
ping -t 8.8.8.8
```

Genera paquetes de forma indefinida.

Salida:

```text
Respuesta desde 8.8.8.8:
Respuesta desde 8.8.8.8:
Respuesta desde 8.8.8.8:
...
```

Se detiene con:

```text
Ctrl + C
```

Al finalizar muestra estadísticas:

```text
Paquetes: enviados = 1200,
recibidos = 1200,
perdidos = 0
```

---

# Ping Broadcast

## ¿Qué es un Broadcast?

Es un paquete enviado a **todos los dispositivos de una red local**.

Por ejemplo:

```text
Red: 192.168.1.0/24

Broadcast:
192.168.1.255
```

Todos los hosts de la red reciben ese paquete.

---

## Linux y Broadcast

Linux bloquea por seguridad el envío a broadcast.

Para habilitarlo:

```bash
ping -b 192.168.1.255
```

Ejemplo:

```bash
ping -b 192.168.1.255
```

Salida posible:

```text
64 bytes from 192.168.1.10
64 bytes from 192.168.1.15
64 bytes from 192.168.1.22
```

Puede responder más de un equipo.

---

## ¿Para qué sirve?

* Descubrir hosts activos.
* Diagnóstico de redes locales.
* Prácticas de laboratorio.
* Verificar comportamiento de switches y routers.

---

## Broadcast en Windows

Windows **no dispone de una opción específica equivalente a `-b`**.

Si intentamos:

```cmd
ping 192.168.1.255
```

normalmente:

```text
Error general.
```

o

```text
Tiempo de espera agotado.
```

Porque Windows no permite enviar Echo Request a broadcast de manera estándar.

---

# ¿Por qué se restringe el Ping Broadcast?

En los años 90 existía un ataque denominado:

Smurf Attack

Funcionaba así:

```text
Atacante
      ↓
Ping Broadcast
      ↓
192.168.1.255
      ↓
Todos responden
      ↓
Víctima saturada
```

Miles de respuestas ICMP podían inundar una red.

Por este motivo:

* Muchos routers bloquean broadcast.
* Windows no lo habilita.
* Linux requiere la opción explícita `-b`.

---

# Opciones interesantes para prácticas de aula

## 1. Ping continuo

Windows:

```cmd
ping -t 8.8.8.8
```

Linux:

```bash
ping 8.8.8.8
```

Permite observar estabilidad de la conexión.

---

## 2. Cambiar TTL

Windows:

```cmd
ping -i 5 8.8.8.8
```

Linux:

```bash
ping -t 5 8.8.8.8
```

Sirve para estudiar cómo disminuye el TTL en cada router.

---

## 3. Aumentar tamaño de paquete

Windows:

```cmd
ping -l 1400 8.8.8.8
```

Linux:

```bash
ping -s 1400 8.8.8.8
```

Permite analizar fragmentación y MTU.

---

## 4. Evitar fragmentación

Windows:

```cmd
ping -f -l 1500 8.8.8.8
```

Linux:

```bash
ping -M do -s 1472 8.8.8.8
```

Muy útil para estudiar el concepto de **MTU (Maximum Transmission Unit)**.

---

## Actividad práctica sugerida

1. Ejecutar:

```cmd
ping -t 8.8.8.8
```

2. Abrir Wireshark y filtrar:

```text
icmp
```

3. Observar:

   * Echo Request.
   * Echo Reply.
   * TTL.
   * Tiempo de respuesta.
   * Número de secuencia.

4. Desconectar temporalmente la red.

5. Analizar cómo aparecen los mensajes:

```text
Tiempo de espera agotado para esta solicitud.
```

6. Reconectar y observar la recuperación automática del flujo de respuestas.

Esta práctica permite relacionar directamente el comando `ping` con los paquetes ICMP observados en Wireshark.

---

# TTL (Time To Live) en profundidad

El campo **TTL (Time To Live)** es uno de los más importantes de una trama IP y suele generar muchas preguntas cuando se analiza el comando `ping` con Wireshark.

---

# ¿Qué es TTL?

TTL es un campo de **8 bits** presente en la cabecera IPv4.

Su función es evitar que un paquete quede circulando indefinidamente por la red debido a errores de enrutamiento.

Sin TTL podría ocurrir algo así:

```text
PC A
 ↓
Router 1
 ↓
Router 2
 ↓
Router 3
 ↓
Router 1
 ↓
Router 2
 ↓
Router 3
...
```

Si existiera un bucle de enrutamiento, el paquete nunca desaparecería.

TTL evita este problema.

---

# ¿Cómo funciona?

Cuando un equipo genera un paquete IP:

```text
TTL = 64
```

Cada router que atraviesa:

1. Recibe el paquete.
2. Reduce el TTL en 1.
3. Reenvía el paquete.

Ejemplo:

```text
Origen
TTL=64
   ↓
Router 1
TTL=63
   ↓
Router 2
TTL=62
   ↓
Router 3
TTL=61
   ↓
Destino
TTL=61
```

---

# ¿Qué ocurre cuando llega a cero?

Cuando un router recibe un paquete con:

```text
TTL = 1
```

lo decrementa:

```text
TTL = 0
```

y lo descarta.

Luego envía un mensaje ICMP al origen:

```text
ICMP Time Exceeded
```

Esto permite informar:

> "Tu paquete murió antes de llegar al destino."

---

# Relación con Traceroute

El comando `traceroute` (Linux) o `tracert` (Windows) aprovecha precisamente el TTL.

Ejemplo:

```bash
traceroute 8.8.8.8
```

Envía:

```text
Paquete 1 → TTL=1
Paquete 2 → TTL=2
Paquete 3 → TTL=3
...
```

Cada router responde con:

```text
ICMP Time Exceeded
```

permitiendo descubrir la ruta.

```text
TTL=1 → Router 1
TTL=2 → Router 2
TTL=3 → Router 3
TTL=4 → Router 4
...
```

---

# Valores TTL iniciales típicos

Cada sistema operativo define un TTL inicial.

| Sistema         | TTL inicial |
| --------------- | ----------- |
| Linux           | 64          |
| macOS           | 64          |
| Android         | 64          |
| Windows         | 128         |
| Equipos Cisco   | 255         |
| Algunos routers | 255         |

---

# Ejemplo real con Ping

Supongamos:

```bash
ping 8.8.8.8
```

Resultado:

```text
64 bytes from 8.8.8.8:
ttl=113
```

Muchos estudiantes preguntan:

> ¿Por qué aparece 113 y no 64?

La respuesta es que **ese TTL corresponde al paquete de respuesta**, no al paquete que enviamos.

---

# Analizando el ejemplo TTL=113

Sabemos que los servidores de Google suelen responder con:

```text
TTL inicial = 128
```

Si recibimos:

```text
TTL = 113
```

entonces:

```text
128 - 113 = 15
```

Significa que la respuesta atravesó aproximadamente:

```text
15 routers
```

antes de llegar a nuestro equipo.

---

# Otro ejemplo

Si observamos:

```text
ttl=52
```

y suponemos que el origen usa:

```text
TTL inicial = 64
```

entonces:

```text
64 - 52 = 12
```

Hubo aproximadamente 12 saltos.

---

# ¿TTL equivale a tiempo?

Originalmente sí.

Cuando se diseñó IP se pensó como:

```text
Time To Live
```

es decir:

> "tiempo de vida"

Sin embargo, en la práctica se implementó como:

```text
cantidad máxima de saltos
```

porque es mucho más fácil para los routers.

Por eso hoy TTL funciona como un **contador de routers**.

---

# TTL en Wireshark

Al capturar un ping veremos algo parecido:

```text
Internet Protocol Version 4
    Time to Live: 64
```

o

```text
Internet Protocol Version 4
    Time to Live: 113
```

Wireshark muestra el TTL que tiene el paquete en ese instante.

---

# Modificando TTL manualmente

## Linux

```bash
ping -t 5 8.8.8.8
```

## Windows

```cmd
ping -i 5 8.8.8.8
```

Se envía con:

```text
TTL = 5
```

---

# ¿Qué ocurrirá?

Si el destino está a más de 5 routers:

```text
TTL=5
 ↓
Router 1 → TTL=4
 ↓
Router 2 → TTL=3
 ↓
Router 3 → TTL=2
 ↓
Router 4 → TTL=1
 ↓
Router 5 → TTL=0
```

El paquete será descartado.

Recibirás algo como:

```text
Time to live exceeded
```

o

```text
TTL expired in transit
```

---

# TTL y seguridad

Muchos sistemas utilizan el TTL para:

* Detección de sistemas operativos.
* Análisis forense.
* Detección de túneles VPN.
* Detección de tráfico anómalo.
* Mitigación de ataques.

Por ejemplo:

```text
TTL recibido = 127
```

suele indicar:

```text
Windows a 1 salto
```

porque:

```text
128 - 127 = 1
```

---

# Actividad práctica con Wireshark

### Paso 1

Iniciar captura.

### Paso 2

Ejecutar:

```bash
ping -t 5 8.8.8.8
```

(Linux)

o

```cmd
ping -i 5 8.8.8.8
```

(Windows)

### Paso 3

Filtrar:

```text
icmp
```

### Paso 4

Observar:

```text
Echo Request
TTL = 5
```

### Paso 5

Buscar el mensaje:

```text
ICMP Time Exceeded
```

### Paso 6

Identificar el router que descartó el paquete.

---

# Idea clave para recordar

El TTL no mide distancia física ni tiempo real.

El TTL indica:

> **¿Cuántos routers más puede atravesar este paquete antes de ser descartado?**

Por eso, cuando ves:

```text
ttl=113
```

significa que el paquete todavía tenía "113 vidas" disponibles cuando llegó a tu computadora. Cada router que atravesó consumió una de esas vidas.
