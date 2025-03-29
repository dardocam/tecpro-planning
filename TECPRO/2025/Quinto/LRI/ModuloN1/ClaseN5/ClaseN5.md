## Clase 5 – Protocolos de Comunicación y Herramientas Básicas de Diagnóstico

### Objetivos 
- **Teoría:** Conocer los principales protocolos de comunicación (TCP, UDP, ICMP) y comprender el rol que desempeñan en la transmisión de datos.
- **Práctica:** Utilizar comandos de diagnóstico para verificar conexiones y detectar problemas en la red.

### Teoría (40 minutos)
- **Protocolos esenciales:**  
  - **TCP vs. UDP:** Diferencias en la transmisión (orientado a conexión vs. no orientado a conexión), casos de uso y aplicaciones en redes locales.  
  - **ICMP:** Función de los mensajes de control y diagnóstico (por ejemplo, el comando ping).  
- **Importancia de las herramientas de diagnóstico:**  
  - Se explicará cómo y por qué se utilizan comandos como ping, tracert y nslookup, resaltando su importancia en la resolución de problemas y mantenimiento de la red.  
- **Recursos y fuentes:**  
  - Documentación oficial de IETF y guías de redes de sitios como TechTarget y Cisco.  
  - **Fuente:** cite_IETFProtocolos2023

### Práctica (40 minutos)
- **Ejercicios de diagnóstico:**  
  - Los estudiantes ejecutarán comandos desde la terminal para diagnosticar la conectividad de la red.  
  - Se plantearán escenarios donde deban identificar fallas o cuellos de botella, utilizando herramientas como ping y tracert para rastrear rutas.  
- **Simulación y análisis:**  
  - Uso de un entorno virtual o laboratorio físico para reproducir problemas comunes y practicar su solución en tiempo real.
  
---

### Filmina 1: Portada
- **Título:** Clase 5 – Protocolos de Comunicación y Herramientas Básicas de Diagnóstico
- **Subtítulo:** Comprensión de TCP, UDP, ICMP y uso de herramientas de diagnóstico
- **Profesor:** Dardo Camaño
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Teoría (40 minutos):**
  - **Protocolos Esenciales:**
    - Diferencias entre **TCP** y **UDP**: orientado a conexión vs. no orientado a conexión, casos de uso y aplicaciones en redes locales.
    - **ICMP:** Rol en mensajes de control y diagnóstico (ej. comando ping).
  - **Herramientas de Diagnóstico:**
    - Uso y propósito de comandos como **ping**, **tracert** y **nslookup**.
  - **Recursos:** Basados en documentación oficial de IETF y guías de redes de TechTarget y Cisco cite_IETFProtocolos2023.
- **Práctica (40 minutos):**
  - Ejercicios de diagnóstico desde la terminal para verificar conectividad.
  - Simulación de escenarios con fallas y cuellos de botella usando **ping** y **tracert**.
  - Análisis en tiempo real en entorno virtual o laboratorio físico.

---

### Filmina 3: Objetivos de la Clase
- **Objetivos Teóricos:**
  - Conocer los principales protocolos de comunicación: TCP, UDP e ICMP.
  - Comprender las diferencias en la transmisión de datos entre TCP y UDP.
  - Reconocer el rol de ICMP en el diagnóstico de la red.
  - Entender la importancia de utilizar herramientas de diagnóstico para mantener la red.
- **Objetivos Prácticos:**
  - Ejecutar comandos de diagnóstico para verificar conectividad y rastrear rutas.
  - Identificar problemas y cuellos de botella en la red.
  - Aplicar lo aprendido en un entorno simulado o laboratorio físico.

---

### Filmina 4: Protocolos Esenciales – TCP vs. UDP
- **TCP (Transmission Control Protocol):**
  - **Orientado a Conexión:** Se establece una conexión antes de transmitir datos.
  - **Fiabilidad:** Garantiza la entrega de datos mediante confirmaciones y retransmisiones.
  - **Uso:** Aplicaciones que requieren alta confiabilidad (ej. web, email).
- **UDP (User Datagram Protocol):**
  - **No Orientado a Conexión:** Envío de datos sin establecer conexión previa.
  - **Velocidad:** Menor latencia, pero sin garantía de entrega.
  - **Uso:** Aplicaciones en tiempo real (ej. streaming, juegos en línea).

---

### Filmina 5: Protocolo ICMP
- **ICMP (Internet Control Message Protocol):**
  - **Función Principal:** Enviar mensajes de control y diagnóstico.
  - **Ejemplo:** Comando **ping** para verificar la conectividad entre hosts.
  - **Importancia:** Detectar errores en la transmisión y problemas en la red.
- **Ejemplo Práctico:**
  - Uso del comando ping:
    ```bash
    ping www.ejemplo.com
    ```
  - Análisis de resultados: latencia, pérdida de paquetes, etc.

---

### Filmina 6: Herramientas de Diagnóstico
- **Comandos Clave:**
  - **ping:** Verifica la conectividad de red.
  - **tracert (o traceroute):** Rastrea la ruta que siguen los paquetes hasta el destino.
  - **nslookup:** Consulta el sistema de nombres de dominio (DNS) para resolver direcciones IP.
- **Importancia:**
  - Facilitan la identificación de problemas en la red.
  - Permiten medir tiempos de respuesta y detectar cuellos de botella.

---

### Filmina 7: Ejercicios Prácticos – Diagnóstico de Red (Parte Teórica)
- **Descripción de Escenarios:**
  - Ejemplo 1: Usar **ping** para comprobar la conectividad a un servidor.
  - Ejemplo 2: Emplear **tracert** para identificar en qué punto se produce una latencia alta o pérdida de paquetes.
  - Ejemplo 3: Utilizar **nslookup** para verificar la resolución DNS de un dominio.
- **Discusión:**
  - ¿Qué indica cada comando sobre el estado de la red?
  - Análisis de resultados y cómo interpretar los datos para resolver problemas.

---

### Filmina 8: Demostración en Vivo
- **Simulación y Ejecución:**
  - Abrir la terminal y ejecutar:
    - `ping www.google.com`
    - `tracert www.google.com` (o `traceroute` en sistemas Unix)
    - `nslookup www.google.com`
  - Mostrar cómo varían los resultados en función de la conexión.
- **Interacción:**
  - Invitar a los estudiantes a proponer dominios o IPs para probar y analizar.

---

### Filmina 9: Actividad Práctica – Ejercicios de Diagnóstico
- **Nombre de la Actividad:** Diagnóstico de Conectividad
- **Duración:** 40 minutos
- **Instrucciones:**
  - Los estudiantes utilizarán la terminal (o simulador) para:
    - Ejecutar el comando **ping** a diferentes destinos y documentar tiempos y pérdida de paquetes.
    - Utilizar **tracert** para rastrear la ruta hacia un destino y detectar posibles cuellos de botella.
    - Ejecutar **nslookup** para resolver nombres de dominio y verificar configuraciones DNS.
  - Registrar y analizar los resultados, identificando posibles problemas de red.
- **Objetivo:**
  - Familiarizarse con las herramientas de diagnóstico y aprender a interpretar sus resultados.

---

### Filmina 10: Cierre y Preguntas
- **Resumen de Conceptos Clave:**
  - Diferencias fundamentales entre TCP y UDP, y la función diagnóstica de ICMP.
  - Importancia de herramientas como ping, tracert y nslookup en el mantenimiento de la red.
- **Preguntas y Respuestas:**
  - Espacio para resolver dudas sobre los comandos ejecutados.
  - Discusión sobre cómo aplicar estos conocimientos en la solución de problemas reales de red.

---

### Filmina 11: Recursos y Bibliografía
- **Documentación Oficial:**
  - [IETF – Protocolos de Internet](https://www.ietf.org)
  - Guías de TechTarget y Cisco sobre protocolos de red.
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre diagnóstico de red y herramientas de línea de comandos.
  - Ejercicios interactivos y simuladores en línea para practicar **ping**, **tracert** y **nslookup**.
- **Fuente:** cite_IETFProtocolos2023

