# Modelos de Referencia: OSI y TCP/IP
## Clase 2: Modelo TCP/IP y Comparación con OSI

## Objetivos de Aprendizaje

Al finalizar la clase, los estudiantes serán capaces de:

* Comprender el modelo TCP/IP.
* Comparar OSI y TCP/IP.
* Relacionar protocolos reales con capas específicas.
* Interpretar comunicaciones reales de Internet.
* Diseñar diagramas de redes simples.

---

# 1. Introducción al Modelo TCP/IP

Aunque el modelo OSI es muy importante para aprender redes, Internet funciona principalmente mediante el modelo TCP/IP.

TCP/IP fue desarrollado antes del OSI y se convirtió en la base de Internet.

El nombre proviene de dos protocolos fundamentales:

* TCP
* IP

---

# 2. Características del Modelo TCP/IP

TCP/IP es:

* práctico,
* flexible,
* escalable,
* ampliamente utilizado.

Es el modelo real utilizado por:

* Internet,
* redes empresariales,
* servidores,
* servicios cloud.

---

# 3. Las 4 Capas del Modelo TCP/IP

| TCP/IP       | Función                        |
| ------------ | ------------------------------ |
| Aplicación   | Servicios de red               |
| Transporte   | Comunicación extremo a extremo |
| Internet     | Direccionamiento IP            |
| Acceso a Red | Comunicación física            |

---

# 4. Capa de Aplicación

Integra funciones equivalentes a:

* Aplicación,
* Presentación,
* Sesión del modelo OSI.

## Protocolos

* HTTP
* HTTPS
* FTP
* DNS
* SMTP

## Función

Permitir interacción entre usuario y red.

---

# 5. Capa de Transporte

Administra la comunicación entre dispositivos.

## Protocolos

### TCP

* confiable,
* seguro,
* verifica recepción.

### UDP

* rápido,
* liviano,
* menor latencia.

---

# 6. Capa de Internet

Responsable del direccionamiento lógico.

## Protocolos

* IP
* ICMP
* ARP

## Funciones

* envío de paquetes,
* selección de rutas,
* comunicación entre redes.

---

# 7. Capa de Acceso a Red

Incluye:

* transmisión física,
* direcciones MAC,
* acceso al medio.

Equivale a:

* Física + Enlace de Datos del OSI.

---

# 8. Comparación OSI vs TCP/IP

| Modelo OSI   | Modelo TCP/IP |
| ------------ | ------------- |
| Aplicación   | Aplicación    |
| Presentación | Aplicación    |
| Sesión       | Aplicación    |
| Transporte   | Transporte    |
| Red          | Internet      |
| Enlace       | Acceso a Red  |
| Física       | Acceso a Red  |

---

# 9. Ejemplo Real de Navegación Web

## Situación:

Abrir YouTube desde una notebook.

---

## Paso 1 – DNS

El navegador consulta:
“¿Cuál es la IP de youtube.com?”

---

## Paso 2 – TCP

Se establece una conexión confiable.

---

## Paso 3 – HTTP/HTTPS

El navegador solicita la página.

---

## Paso 4 – IP

Los paquetes viajan por Internet pasando por routers.

---

## Paso 5 – Recepción

El servidor responde enviando:

* texto,
* imágenes,
* videos,
* scripts.

---

# 10. Protocolos Fundamentales

## DNS

Convierte nombres en direcciones IP.

## DHCP

Asigna IP automáticamente.

## HTTP/HTTPS

Permite navegación web.

## ICMP

Diagnóstico de red.

Ejemplo:
`ping`

---

# 11. Dispositivos de Red

| Dispositivo | Función              | Capa   |
| ----------- | -------------------- | ------ |
| Hub         | Repetir señales      | Física |
| Switch      | Comunicación LAN     | Enlace |
| Router      | Interconectar redes  | Red    |
| Firewall    | Filtrado y seguridad | Varias |

---
## Preguntas de análisis

1. ¿Por qué Internet utiliza TCP/IP?
2. ¿Qué ventajas ofrece TCP?
3. ¿Qué ocurre si un router falla?
4. ¿Por qué UDP se usa en videojuegos?
5. ¿Qué diferencia existe entre dirección MAC e IP?

---

## Conclusión Final

Las redes modernas funcionan gracias a modelos organizados que permiten dividir tareas complejas en capas.

El modelo OSI ayuda a comprender cómo funcionan las comunicaciones.

El modelo TCP/IP es la implementación real que sostiene Internet y prácticamente todas las redes actuales.
