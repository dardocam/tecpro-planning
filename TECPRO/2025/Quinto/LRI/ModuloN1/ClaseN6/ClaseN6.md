## Clase 6 – Configuración Básica de Dispositivos de Red

### Objetivos 
- **Teoría:** Conocer los fundamentos de la configuración inicial de dispositivos de red (routers y switches), enfocándose en la asignación de IP y parámetros básicos.
- **Práctica:** Realizar configuraciones mínimas en simuladores o equipos reales, ejecutando ajustes en interfaces y servicios de red.

### Teoría (40 minutos)
- **Fundamentos de configuración:**  
  - **Configuración de interfaces:** Introducción a la configuración de puertos, asignación de direcciones IP y activación de servicios básicos (por ejemplo, DHCP).  
  - **Parámetros esenciales:** Seguridad básica en la configuración (contraseñas, acceso remoto) y gestión de dispositivos en red.  
- **Metodología y estándares:**  
  - Se explicará cómo se aplican estándares de configuración de fabricantes reconocidos (Cisco, Juniper) y la importancia de seguir buenas prácticas.
- **Recursos y fuentes:**  
  - Guías oficiales de configuración de Cisco y manuales técnicos especializados.  
  - **Fuente:** cite_CiscoConfig2023

### Práctica (40 minutos)
- **Laboratorio en simulador:**  
  - Uso de Packet Tracer o GNS3 para realizar configuraciones básicas en routers y switches.  
  - Actividad paso a paso donde se configuran interfaces, se asignan direcciones IP y se verifica la conectividad entre dispositivos.  
- **Ejercicios de troubleshooting:**  
  - Se presentarán escenarios de fallas comunes, de modo que los estudiantes identifiquen y solucionen problemas de configuración en tiempo real.
  
---

A continuación se presenta un conjunto de filminas (slides) estructuradas profesionalmente para la **Clase 6 – Configuración Básica de Dispositivos de Red**. Esta clase está diseñada para que los estudiantes conozcan los fundamentos de la configuración inicial de dispositivos de red (routers y switches) y practiquen en simuladores o equipos reales la asignación de direcciones IP y otros parámetros básicos, siguiendo estándares de fabricantes reconocidos.

---

### Filmina 1: Portada
- **Título:** Clase 6 – Configuración Básica de Dispositivos de Red
- **Subtítulo:** Fundamentos y práctica en la asignación de IP y parámetros esenciales
- **Instructor:** [Nombre del Instructor]
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Teoría (40 minutos):**
  - Fundamentos de configuración de dispositivos de red.
  - Configuración de interfaces: asignación de direcciones IP y activación de servicios básicos (ej. DHCP).
  - Parámetros esenciales de seguridad (contraseñas, acceso remoto) y gestión de dispositivos.
  - Metodología basada en estándares de fabricantes reconocidos (Cisco, Juniper).  
  - **Fuente:** cite_CiscoConfig2023
- **Práctica (40 minutos):**
  - Laboratorio en simulador (Packet Tracer o GNS3).
  - Configuración paso a paso en routers y switches.
  - Ejercicios de troubleshooting: identificar y solucionar problemas de configuración.

---

### Filmina 3: Objetivos de la Clase
- **Objetivos Teóricos:**
  - Conocer los fundamentos de la configuración inicial de dispositivos de red.
  - Entender la configuración de interfaces, asignación de IP y servicios básicos.
  - Aplicar buenas prácticas y estándares de configuración de Cisco y Juniper.
- **Objetivos Prácticos:**
  - Realizar configuraciones mínimas en routers y switches mediante simuladores o equipos reales.
  - Configurar interfaces, asignar direcciones IP y verificar la conectividad entre dispositivos.
  - Identificar y solucionar problemas comunes en la configuración de red.

---

### Filmina 4: Fundamentos de Configuración de Dispositivos de Red
- **Conceptos Clave:**
  - **Dispositivos de Red:** Routers y switches.
  - **Interfaces de Red:** Puertos físicos y virtuales para la transmisión de datos.
  - **Servicios Básicos:** DHCP para la asignación automática de direcciones IP.
- **Importancia:**
  - Una configuración correcta garantiza la conectividad y el correcto funcionamiento de la red.
  - La seguridad básica y la gestión adecuada de dispositivos son fundamentales para evitar vulnerabilidades.

---

### Filmina 5: Configuración de Interfaces y Asignación de IP
- **Configuración de Puertos:**
  - Asignación de direcciones IP estáticas a interfaces.
  - Ejemplo de comandos en routers Cisco:
    ```plaintext
    Router(config)# interface GigabitEthernet0/0
    Router(config-if)# ip address 192.168.1.1 255.255.255.0
    Router(config-if)# no shutdown
    ```
- **Activación de Servicios Básicos:**
  - Configuración de DHCP:
    ```plaintext
    Router(config)# ip dhcp pool LAN
    Router(dhcp-config)# network 192.168.1.0 255.255.255.0
    Router(dhcp-config)# default-router 192.168.1.1
    ```

---

### Filmina 6: Parámetros Esenciales y Buenas Prácticas
- **Seguridad Básica:**
  - Establecer contraseñas seguras en el acceso a dispositivos.
  - Configurar acceso remoto seguro (por ejemplo, SSH en lugar de Telnet).
- **Gestión de Dispositivos:**
  - Documentar la configuración.
  - Aplicar estándares de configuración de fabricantes como Cisco y Juniper.
- **Ejemplo de Configuración de Contraseña:**
  ```plaintext
  Router(config)# enable secret MiContraseñaSegura
  Router(config)# line vty 0 4
  Router(config-line)# transport input ssh
  Router(config-line)# login local
  ```

---

### Filmina 7: Metodología y Estándares de Configuración
- **Estándares de Fabricantes:**
  - **Cisco:** Guías oficiales de configuración y mejores prácticas.
  - **Juniper:** Manuales técnicos especializados.
- **Importancia de Seguir Buenas Prácticas:**
  - Asegura la interoperabilidad y el rendimiento óptimo de la red.
  - Facilita la resolución de problemas y la escalabilidad.

---

### Filmina 8: Práctica – Laboratorio en Simulador
- **Herramientas Utilizadas:**
  - Packet Tracer o GNS3.
- **Actividades Prácticas:**
  - **Paso 1:** Configurar un router:
    - Asignar dirección IP a la interfaz.
    - Activar el puerto y configurar DHCP.
  - **Paso 2:** Configurar un switch:
    - Asignar direcciones IP a interfaces de administración (si es necesario).
    - Conectar varios dispositivos y verificar la conectividad.
  - **Paso 3:** Verificar la conectividad:
    - Utilizar comandos de diagnóstico (ping, show ip interface brief) para confirmar la configuración.

---

### Filmina 9: Ejercicios de Troubleshooting
- **Escenarios de Fallas Comunes:**
  - Interfaces administrativamente apagadas.
  - Direcciones IP mal asignadas o con conflicto.
  - Problemas en la asignación de direcciones DHCP.
- **Actividad de Diagnóstico:**
  - Identificar y solucionar problemas en el simulador.
  - Discutir las soluciones y las lecciones aprendidas en la sesión.

---

### Filmina 10: Actividad Práctica – Desarrollo Guiado
- **Nombre de la Actividad:** Configuración Básica y Diagnóstico de Red
- **Duración:** 40 minutos
- **Instrucciones:**
  - Los estudiantes, individualmente o en parejas, deberán:
    - Configurar un router y un switch en el simulador.
    - Asignar direcciones IP a las interfaces y configurar un pool DHCP.
    - Conectar dispositivos virtuales y verificar la conectividad.
    - Ejecutar ejercicios de troubleshooting para detectar y solucionar problemas comunes.
- **Objetivo:**
  - Aplicar de forma práctica los conceptos teóricos y mejorar la capacidad de diagnóstico en configuraciones de red.

---

### Filmina 11: Cierre y Preguntas
- **Resumen de Conceptos Clave:**
  - Fundamentos de configuración de interfaces y asignación de direcciones IP.
  - Importancia de la seguridad y la gestión adecuada en dispositivos de red.
  - Prácticas y estándares de configuración basados en Cisco y Juniper.
- **Sesión de Preguntas:**
  - Espacio para aclarar dudas sobre la configuración, la metodología y los ejercicios prácticos.
  - Discusión sobre la importancia de seguir buenas prácticas en entornos de red reales.

---

### Filmina 12: Recursos y Bibliografía
- **Documentación y Guías:**
  - [Documentación Oficial de Cisco – Configuración de Routers](https://www.cisco.com)
  - Manuales técnicos de Juniper y guías de configuración de redes.
- **Tutoriales y Simuladores:**
  - Recursos en Packet Tracer y GNS3.
  - Videos y cursos en YouTube sobre configuración básica de dispositivos de red.
- **Fuente:** cite_CiscoConfig2023

---

Esta estructura de filminas proporciona un marco integral para que los estudiantes comprendan y apliquen los fundamentos de la configuración de dispositivos de red, combinando teoría, ejercicios prácticos en simuladores y actividades de troubleshooting, siguiendo buenas prácticas y estándares reconocidos.