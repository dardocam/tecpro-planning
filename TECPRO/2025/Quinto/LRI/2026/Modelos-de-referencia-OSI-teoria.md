# Modelos de Referencia: OSI y TCP/IP

## Clase 1 – Modelo OSI: Funcionamiento, Capas y Comunicación de Datos

# Objetivos de Aprendizaje

Al finalizar la clase, los estudiantes serán capaces de:

* Comprender la necesidad de los modelos de referencia en redes.
* Identificar las 7 capas del modelo OSI y sus funciones.
* Relacionar protocolos y dispositivos con cada capa.
* Entender el concepto de encapsulamiento y paquetes de datos.
* Analizar cómo viaja la información a través de Internet.

---

# 1. Introducción a las Redes y los Modelos de Referencia

Las redes informáticas permiten que distintos dispositivos puedan intercambiar información.

Cuando una computadora envía datos a otra, intervienen numerosos procesos:

* preparación de datos,
* identificación del destino,
* control de errores,
* transmisión física,
* recepción y reconstrucción de la información.

Para evitar incompatibilidades entre fabricantes y tecnologías, se crearon modelos de referencia.

Un modelo de referencia es una estructura teórica que divide el proceso de comunicación en etapas organizadas llamadas capas.

Cada capa tiene funciones específicas y trabaja junto con las demás.

---

# 2. ¿Por Qué Se Utilizan Capas?

Sin división en capas, las redes serían extremadamente complejas.

El trabajo por capas aporta:

## Modularidad

Cada parte del sistema puede desarrollarse por separado.

## Compatibilidad

Dispositivos de distintas marcas pueden comunicarse.

## Escalabilidad

Es posible agregar nuevas tecnologías sin modificar todo el sistema.

## Diagnóstico de fallas

Permite identificar problemas de manera más sencilla.

Ejemplo:

* Si una página no carga:

  * podría fallar DNS,
  * la conexión física,
  * el router,
  * el servidor,
  * o el navegador.

Gracias al modelo por capas es posible aislar el problema.

---

# 3. Modelo OSI

OSI significa:

## Open Systems Interconnection

Fue desarrollado por la ISO como un modelo estándar para entender las comunicaciones de red.

El modelo OSI posee 7 capas organizadas desde la comunicación física hasta la interacción con el usuario.

---

# 4. Las 7 Capas del Modelo OSI

---

# Capa 7 – Aplicación

Es la capa más cercana al usuario.

Permite que programas y aplicaciones utilicen servicios de red.

No es la aplicación en sí, sino los protocolos que permiten la comunicación.

## Funciones

* Acceso a servicios de red
* Transferencia de archivos
* Navegación web
* Envío de correos
* Resolución de nombres

## Protocolos importantes

* HTTP / HTTPS
* FTP
* SMTP
* POP3
* DNS

## Ejemplos cotidianos

* Abrir Google
* Enviar un correo
* Descargar archivos
* Utilizar WhatsApp Web

---

# Capa 6 – Presentación

Se ocupa del formato y representación de los datos.

Permite que diferentes sistemas puedan interpretar la información correctamente.

## Funciones

* Conversión de formatos
* Codificación
* Compresión
* Cifrado y descifrado

## Ejemplos

* Imágenes JPG o PNG
* Archivos MP3
* Cifrado HTTPS
* Codificación UTF-8

## Importancia

Sin esta capa, dos sistemas podrían interpretar datos de manera diferente.

---

# Capa 5 – Sesión

Administra las sesiones de comunicación entre dispositivos.

Una sesión es una conexión lógica establecida entre dos aplicaciones.

## Funciones

* Apertura de sesión
* Mantenimiento de sesión
* Sincronización
* Cierre de sesión

## Ejemplos

* Videollamadas
* Sesiones de usuario
* Chats online

## Situación real

Cuando una videollamada se corta y vuelve automáticamente, interviene la gestión de sesión.

---

# Capa 4 – Transporte

Garantiza el envío correcto de datos entre origen y destino.

Es una de las capas más importantes.

## Funciones

* Segmentación de datos
* Control de errores
* Control de flujo
* Confirmación de recepción
* Reenvío de paquetes perdidos

## Protocolos principales

### TCP

Transmission Control Protocol

Características:

* confiable,
* orientado a conexión,
* verifica recepción.

Usos:

* navegación web,
* correos,
* transferencias importantes.

### UDP

User Datagram Protocol

Características:

* rápido,
* no verifica errores,
* menor sobrecarga.

Usos:

* streaming,
* videojuegos,
* videollamadas.

---

# Capa 3 – Red

Se encarga del direccionamiento lógico y del enrutamiento.

Aquí aparecen las direcciones IP.

## Funciones

* Direccionamiento IP
* Enrutamiento
* Selección de rutas
* Fragmentación de paquetes

## Dispositivos

* Routers

## Protocolos

* IP
* ICMP
* RIP
* OSPF

## Ejemplo práctico

Cuando enviamos un mensaje a otro país, los routers determinan el mejor camino.

---

# Capa 2 – Enlace de Datos

Controla la comunicación dentro de una misma red local.

Utiliza direcciones MAC.

## Funciones

* Detección de errores
* Control de acceso al medio
* Creación de tramas
* Comunicación local

## Dispositivos

* Switches

## Concepto importante: Dirección MAC

Cada placa de red posee una dirección física única.

Ejemplo:
`00:1A:2B:3C:4D:5E`

---

# Capa 1 – Física

Es la capa encargada de transmitir bits mediante señales.

No interpreta datos.

Solo transmite:

* electricidad,
* luz,
* ondas de radio.

## Ejemplos

* Cable UTP
* Fibra óptica
* WiFi
* Conectores RJ45

## Dispositivos

* Hubs
* Repetidores
* Cableado

---

# 5. Encapsulamiento

Cuando enviamos datos, cada capa agrega información propia.

Este proceso se llama encapsulamiento.

---

## Ejemplo de recorrido

Un mensaje pasa por:

| Capa       | Unidad de datos |
| ---------- | --------------- |
| Aplicación | Datos           |
| Transporte | Segmento        |
| Red        | Paquete         |
| Enlace     | Trama           |
| Física     | Bits            |

---

# 6. Concepto de Paquete de Datos

Un paquete es una pequeña unidad de información enviada por la red.

Contiene:

* datos,
* dirección origen,
* dirección destino,
* control de errores.

Internet divide grandes archivos en múltiples paquetes.

Esto mejora:

* velocidad,
* control,
* recuperación ante fallos.

---

# 7. Analogía del Correo Postal

| Red Informática | Correo Postal           |
| --------------- | ----------------------- |
| Datos           | Carta                   |
| IP destino      | Dirección postal        |
| Router          | Centro de distribución  |
| Cable/WiFi      | Transporte físico       |
| TCP             | Confirmación de entrega |

---

## Preguntas

1. ¿Cuál es la función principal de la capa de red?
2. ¿Qué diferencia existe entre IP y MAC?
3. ¿Qué capa utiliza TCP?
4. ¿Por qué se utiliza encapsulamiento?
5. ¿Qué ocurre si falla la capa física?

---

## Reflexión final:

Aunque Internet parece instantáneo, en realidad miles de dispositivos y protocolos trabajan juntos utilizando estructuras organizadas por capas.

---
