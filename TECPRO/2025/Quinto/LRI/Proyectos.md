(Due to technical issues, the search service is temporarily unavailable.)

**Tres Ideas Creativas de Proyectos Escolares Integrados para un Escape Room con Redes, Desarrollo Web y Microcontroladores**  

### 1. **Proyecto: "Eco-Rescate: Salva el Planeta"**  
**Tema:** Sostenibilidad ambiental y trabajo en equipo.  
**Descripción:**  
Los jugadores deben "salvar" un planeta virtual afectado por la contaminación resolviendo desafíos relacionados con energías renovables, reciclaje y conservación.  
- **Microcontroladores:**  
  - Sensores en contenedores de reciclaje (ej.: RFID para identificar objetos correctos).  
  - Circuitos simulando paneles solares (con fotocélulas que requieren luz para activarse).  
  - Un sistema de luces LED que muestra el avance de la "recuperación" del planeta.  
- **Desarrollo Web (6to):**  
  - Interfaz con un mapa interactivo del planeta que muestra zonas contaminadas y su progreso.  
  - Puzzles web como ordenar componentes de turbinas eólicas o resolver acertijos sobre huella de carbono.  
- **Redes (5to):**  
  - Configurar una red local para conectar sensores a un servidor central.  
  - Implementar comunicación MQTT entre microcontroladores y la interfaz web para actualizaciones en tiempo real.  

**Mensaje Positivo:** "Pequeñas acciones colectivas pueden transformar el mundo".  

---

### 2. **Proyecto: "Puente de la Solidaridad"**  
**Tema:** Colaboración y empatía.  
**Descripción:**  
El aula se divide en dos zonas, y los equipos deben cooperar para resolver desafíos interconectados y "construir un puente" simbólico que una ambas partes.  
- **Microcontroladores:**  
  - Motores que activan puentes físicos (ej.: maqueta de puente de madera) al completar acertijos.  
  - Pulsadores inalámbricos (ESP32) para sincronizar respuestas entre equipos.  
- **Desarrollo Web (6to):**  
  - Plataforma web con puzzles que requieren intercambiar pistas (ej.: un equipo ve códigos binarios y el otro traduce a letras).  
  - Tablero compartido que muestra el progreso del puente.  
- **Redes (5to):**  
  - Crear una VPN para conectar las dos zonas del aula.  
  - Gestionar APIs REST para sincronizar respuestas y activar los motores mediante HTTP.  

**Mensaje Positivo:** "La unidad supera cualquier barrera".  

---

### 3. **Proyecto: "El Jardín de las Buenas Acciones"**  
**Tema:** Gratitud y comunidad.  
**Descripción:**  
Los jugadores cultivan un jardín virtual y físico resolviendo acertijos sobre actos de bondad. Cada desafío completado "riega" el jardín y revela mensajes inspiradores.  
- **Microcontroladores:**  
  - Sistema de riego automático con solenoides controlados por Arduino/ESP32.  
  - Matriz LED que muestra frases positivas al completar etapas (ej.: "Gracias", "Tú importas").  
- **Desarrollo Web (6to):**  
  - Aplicación web con minijuegos como armar palabras de agradecimiento o resolver historias interactivas sobre ayudar a otros.  
  - Dashboard con el crecimiento del jardín y mensajes desbloqueados.  
- **Redes (5to):**  
  - Configurar un servidor Node.js para manejar solicitudes IoT desde los microcontroladores.  
  - Implementar WebSockets para actualizaciones instantáneas entre el jardín físico y virtual.  

**Mensaje Positivo:** "Cada acto de bondad siembra un futuro mejor".  

---

**Integración Clave:**  
- Los estudiantes de 5to enfocan en infraestructura de red, protocolos de comunicación (HTTP/MQTT/WebSockets) y seguridad.  
- Los de 6to diseñan la UX/UI, lógica del juego y integración frontend-backend.  
- Microcontroladores vinculan el mundo físico y digital, reforzando el tema de cada proyecto.

---

(Due to technical issues, the search service is temporarily unavailable.)

### **Proyecto Ampliado: "El Jardín de las Buenas Acciones"**  
**Tema Principal:** Gratitud, comunidad y empatía.  
**Mensaje Central:** "Cada acto de bondad siembra un futuro mejor".  

---

#### **Objetivo General**  
Crear una experiencia inmersiva que combine tecnología, redes y valores humanos, donde los jugadores deban resolver desafíos basados en actos de bondad para "cultivar" un jardín virtual y físico. El proyecto busca fomentar la reflexión sobre el impacto positivo de las pequeñas acciones en la comunidad.  

---

### **Descripción Detallada**  

#### **1. Dinámica del Juego**  
- **Narrativa:**  
  Los jugadores son "jardineros digitales" que deben restaurar un jardín abandonado, simbolizando la reconstrucción de una comunidad fragmentada. Cada desafío resuelto representa un acto de bondad (ej.: ayudar a un vecino, compartir recursos) que nutre el jardín.  
- **Mecánica:**  
  - **Fase 1:** Resolver acertijos en la plataforma web para recolectar "semillas de bondad".  
  - **Fase 2:** Usar las semillas para "plantar" flores virtuales y activar sistemas físicos (riego, luces).  
  - **Fase 3:** Desbloquear mensajes inspiradores de figuras históricas o locales (ej.: citas de Mandela, líderes comunitarios).  

---

#### **2. Componentes Técnicos**  

**A. Instalación Física (Microcontroladores y Redes)**  
- **Jardín Interactivo:**  
  - **Sistema de Riego Automatizado:**  
    - Uso de solenoides controlados por Arduino/ESP32 para liberar agua en macetas reales al completar desafíos.  
    - Sensores de humedad (ej.: capacitivos) para verificar el estado de las plantas y enviar alertas a la plataforma web.  
  - **Matriz LED Emocional:**  
    - Pantalla LED 16x32 que muestra mensajes animados (ej.: "Gracias", "Tú importas") y el progreso del jardín.  
    - Integración con reconocimiento de voz (mediante módulos como el DFPlayer Mini) para reproducir frases al desbloquear logros.  
  - **Elementos Decorativos:**  
    - Flores con neopixels que cambian de color según el avance del equipo.  
    - Maqueta del jardín impresa en 3D, con sectores que se iluminan al ser "cultivados".  

**B. Plataforma Web (Desarrollo Web)**  
- **Interfaz Principal:**  
  - Dashboard con vista 3D del jardín (usando Three.js o Babylon.js) que muestra áreas cultivadas y zonas por restaurar.  
  - Panel de progreso con métricas: semillas recolectadas, agua usada, mensajes desbloqueados.  
- **Minijuegos Temáticos:**  
  - **Juego 1:** "Palabras de Gratitud": Armar frases con letras dispersas (ej.: "GRACIAS", "SOLIDARIDAD").  
  - **Juego 2:** "Historias en Cadena": Resolver una secuencia lógica de acciones para ayudar a un personaje virtual (ej.: donar alimentos, organizar una campaña).  
  - **Juego 3:** "Memoria de la Comunidad": Encontrar pares de imágenes que representen problemas sociales y sus soluciones (ej.: contaminación ↔ reciclaje).  
- **Conexión Social:**  
  - Muro virtual donde los jugadores pueden escribir mensajes de agradecimiento o compartir experiencias, visible en tiempo real en la matriz LED.  
  - Integración con una base de datos Firebase para guardar y mostrar contribuciones históricas.  

**C. Infraestructura de Red (Laboratorio de Redes)**  
- **Arquitectura de Comunicación:**  
  - **Servidor Central:** Raspberry Pi 4 como nodo maestro, gestionando solicitudes HTTP/MQTT desde los microcontroladores y la web.  
  - **Protocolos:**  
    - MQTT para comunicación bidireccional entre sensores y la plataforma web.  
    - WebSockets para actualizar el estado del jardín físico y virtual simultáneamente.  
  - **Seguridad:**  
    - Autenticación OAuth2 para acceder al dashboard.  
    - Encriptación TLS en las comunicaciones entre dispositivos.  
- **Desafíos de Red para 5to Año:**  
  - Configurar una red LAN con VLANs para segmentar tráfico (ej.: una VLAN para sensores, otra para usuarios web).  
  - Implementar balanceo de carga en el servidor para manejar múltiples conexiones IoT.  

---

### **3. Integración Educativa**  
- **Para 6to (Desarrollo Web):**  
  - Diseñar una API REST con Node.js/Express para conectar los minijuegos con la base de datos.  
  - Usar React o Vue.js para la interfaz dinámica, integrando animaciones CSS para feedback visual.  
- **Para 5to (Redes):**  
  - Simular fallos de red (ej.: cortes de conexión) y resolverlos en tiempo real durante el juego.  
  - Optimizar la latencia usando QoS (Calidad de Servicio) para priorizar tráfico crítico (ej.: sensores de riego).  

---

### **4. Innovación y Sostenibilidad**  
- **Energías Renovables:**  
  - Alimentar los microcontroladores con paneles solares en miniatura, vinculando el tema de sostenibilidad al gameplay.  
- **Impacto Post-Juego:**  
  - Los mensajes creados por los jugadores se imprimirán en tarjetas físicas para donar a hogares de ancianos o escuelas.  
  - Opción de adoptar una planta real del jardín, promoviendo responsabilidad ambiental.  

---

### **5. Presupuesto y Materiales**  
| **Componente**               | **Descripción**                                  | **Costo Estimado (USD)** |  
|-------------------------------|--------------------------------------------------|--------------------------|  
| Microcontroladores (ESP32)    | 5 unidades para sensores y actuadores            | $75                      |  
| Sensores de humedad           | 3 unidades                                       | $30                      |  
| Solenoides y bombas de agua   | 2 kits                                           | $50                      |  
| Matriz LED 16x32              | 1 unidad                                         | $40                      |  
| Raspberry Pi 4                | 1 unidad como servidor                           | $60                      |  
| Materiales para maqueta       | Impresión 3D, madera, neopixels                  | $100                     |  
| **Total**                     |                                                 | **$355**                 |  

---

### **6. Evaluación**  
- **Criterios para 6to (Desarrollo Web):**  
  - Originalidad en los minijuegos y fluidez de la interfaz.  
  - Integración efectiva con APIs y base de datos.  
- **Criterios para 5to (Redes):**  
  - Estabilidad de la red bajo carga máxima.  
  - Implementación de protocolos de seguridad.  
- **Impacto Social:**  
  - Encuesta post-juego para medir la percepción de los participantes sobre el mensaje de gratitud.  

---

### **7. Escalabilidad**  
- **Futuras Mejoras:**  
  - Agregar realidad aumentada (AR) para visualizar el jardín virtual superpuesto al físico.  
  - Integrar donaciones reales a ONGs al completar etapas (ej.: por cada 10 semillas, se dona $1 a un banco de alimentos).  

---

**Conclusión:**  
"El Jardín de las Buenas Acciones" no solo enseña habilidades técnicas, sino que también deja una huella emocional en los participantes, vinculando tecnología con valores humanos. Al finalizar, cada jugador recibe una "semilla real" (ej.: planta o flor) como recordatorio de su contribución a un mundo mejor.

---

(Due to technical issues, the search service is temporarily unavailable.)

### **Esquema Scrum para Estudiantes de 6to Año (Desarrollo Web)**  
**Proyecto:** "El Jardín de las Buenas Acciones"  
**Duración:** 16 clases de 2 horas cada una (32 horas totales ≈ 4 sprints de 4 clases cada uno).  
**Equipos:** 2 equipos de 4-5 estudiantes cada uno, enfocados en **Frontend** y **Backend**.  

---

#### **Roles y Responsabilidades**  
| **Rol**              | **Responsabilidades**                                                                 |  
|-----------------------|---------------------------------------------------------------------------------------|  
| **Product Owner**     | - Definir prioridades del backlog (ej.: minijuegos vs. dashboard).<br>- Validar entregas con los profesores. |  
| **Scrum Master**      | - Facilitar reuniones diarias (stand-ups).<br>- Eliminar obstáculos técnicos o de comunicación. |  
| **Frontend Team**     | - Desarrollo de la interfaz web (Three.js, React/Vue.js).<br>- Diseño de minijuegos y animaciones. |  
| **Backend Team**      | - Creación de APIs (Node.js/Express).<br>- Integración con base de datos (Firebase) y microcontroladores. |  
| **IoT/Redes Liaison** | - Coordinar con estudiantes de 5to año para pruebas de comunicación (WebSockets/MQTT). |  

---

### **Planificación por Sprints**  
#### **Sprint 1 (Clases 1-4): Definición y Prototipo**  
**Objetivo:** Estructurar el proyecto y crear un prototipo funcional.  
- **Frontend Team:**  
  - Diseñar wireframes del dashboard y minijuegos (Figma/Canva).  
  - Implementar la vista 3D básica del jardín con Three.js.  
- **Backend Team:**  
  - Configurar servidor Node.js y API REST inicial.  
  - Conectar Firebase para almacenar mensajes de gratitud.  
- **Entregables:**  
  - Prototipo navegable del dashboard.  
  - API funcional para guardar/recuperar mensajes.  

---

#### **Sprint 2 (Clases 5-8): Desarrollo de Módulos**  
**Objetivo:** Implementar minijuegos y comunicación con IoT.  
- **Frontend Team:**  
  - Programar el minijuego "Palabras de Gratitud" (HTML5 Canvas + JS).  
  - Integrar el muro social con actualizaciones en tiempo real.  
- **Backend Team:**  
  - Desarrollar endpoints para controlar la matriz LED y riego automático.  
  - Implementar WebSockets para sincronizar el jardín físico-virtual.  
- **IoT/Redes Liaison:**  
  - Realizar pruebas con sensores de humedad y ESP32.  

---

#### **Sprint 3 (Clases 9-12): Integración y Testing**  
**Objetivo:** Unir frontend-backend y depurar errores.  
- **Frontend Team:**  
  - Conectar minijuegos a la API para enviar "semillas de bondad".  
  - Añadir animaciones al dashboard (ej.: flores que crecen).  
- **Backend Team:**  
  - Optimizar la base de datos para reducir latencia.  
  - Implementar autenticación OAuth2 para el dashboard.  
- **Testing Cross-Funcional:**  
  - Simular 10 usuarios simultáneos para probar estabilidad.  

---

#### **Sprint 4 (Clases 13-16): Pulido y Presentación**  
**Objetivo:** Finalizar detalles y preparar demo final.  
- **Frontend Team:**  
  - Mejorar UX/UI (feedback visual, sonidos).  
  - Añadir tutorial interactivo para nuevos jugadores.  
- **Backend Team:**  
  - Asegurar encriptación TLS en todas las comunicaciones.  
  - Documentar APIs y configuración del servidor.  
- **Entregable Final:**  
  - Demo funcional con jardín físico-virtual integrado.  
  - Presentación de 20 minutos explicando el código y mensaje social.  

---

### **Herramientas de Gestión**  
- **Tablero Scrum:** Trello o Jira para organizar tareas en columnas (*To Do*, *In Progress*, *Done*).  
- **Repositorio:** GitHub con ramas por equipo (*frontend*, *backend*).  
- **Comunicación:** Discord/Slack para stand-ups diarios (10 minutos al inicio de cada clase).  

---

### **Ceremonias Scrum**  
1. **Sprint Planning (Inicio de cada sprint):**  
   - Priorizar tareas del backlog y asignar responsabilidades (1 hora).  
2. **Daily Stand-Up (Inicio de cada clase):**  
   - ¿Qué hice ayer? ¿Qué haré hoy? ¿Qué obstáculos tengo? (10 minutos por equipo).  
3. **Sprint Review (Final de cada sprint):**  
   - Demostrar avances a los profesores y equipo de redes (30 minutos).  
4. **Retrospectiva (Final de cada sprint):**  
   - Identificar mejoras para el próximo sprint (ej.: "Falta comunicación entre equipos", 20 minutos).  

---

### **Ejemplo de Distribución de Tareas por Equipo**  
#### **Frontend Team (Ejemplo)**  
| **Tarea**                          | **Sprint** | **Responsable** |  
|-------------------------------------|------------|------------------|  
| Diseñar UI del dashboard            | 1          | Ana, Luis        |  
| Programar minijuego de memoria      | 2          | Carlos           |  
| Integrar Three.js con WebSockets    | 3          | Marta            |  
| Añadir efectos de sonido            | 4          | Todos            |  

#### **Backend Team (Ejemplo)**  
| **Tarea**                          | **Sprint** | **Responsable** |  
|-------------------------------------|------------|------------------|  
| Configurar Firebase                 | 1          | Pedro            |  
| Crear API para controlar matriz LED | 2          | Sofía            |  
| Implementar autenticación OAuth2    | 3          | Juan             |  
| Documentar APIs                     | 4          | Todos            |  

---

### **Consejos Clave**  
- **Pair Programming:** Rotar roles para evitar cuellos de botella (ej.: un estudiante de backend ayuda en frontend).  
- **MVP Primero:** Enfocarse en una versión mínima viable (ej.: un minijuego funcional) antes de añadir complejidad.  
- **Coordinación con 5to Año:** Reuniones semanales para ajustar protocolos de red (ej.: MQTT vs HTTP).  

--- 

Este esquema garantiza que ambos equipos avancen en paralelo, manteniendo un equilibrio entre creatividad, funcionalidad y colaboración interdisciplinaria.


---

(Due to technical issues, the search service is temporarily unavailable.)

### **Esquema Scrum para Estudiantes de 5to Año (Redes)**  
**Proyecto:** "El Jardín de las Buenas Acciones"  
**Duración:** 16 clases de 2 horas cada una (32 horas totales ≈ 4 sprints de 4 clases cada uno).  
**Equipos:** 2 equipos de 4-5 estudiantes cada uno, enfocados en **Infraestructura de Red** y **Seguridad IoT**.  

---

#### **Roles y Responsabilidades**  
| **Rol**                  | **Responsabilidades**                                                                 |  
|---------------------------|---------------------------------------------------------------------------------------|  
| **Product Owner**         | - Priorizar tareas técnicas (ej.: VLANs vs. protocolos de comunicación).<br>- Validar la estabilidad de la red con los profesores. |  
| **Scrum Master**          | - Facilitar reuniones diarias y resolver bloqueos (ej.: fallos de conexión).<br>- Coordinar con el Scrum Master de 6to año. |  
| **Redes Básicas Team**    | - Configurar VLANs, servidores (Raspberry Pi) y balanceo de carga.<br>- Gestionar direccionamiento IP y QoS. |  
| **Seguridad IoT Team**    | - Implementar autenticación OAuth2 y encriptación TLS.<br>- Asegurar comunicación MQTT/WebSockets con microcontroladores. |  
| **Web Liaison**           | - Coordinar con el equipo de 6to para integrar APIs y probar endpoints. |  

---

### **Planificación por Sprints**  
#### **Sprint 1 (Clases 1-4): Diseño de Infraestructura**  
**Objetivo:** Definir arquitectura de red y servidor inicial.  
- **Redes Básicas Team:**  
  - Configurar una red LAN con switch gestionable.  
  - Instalar Raspberry Pi como servidor central con Node-RED para pruebas iniciales.  
- **Seguridad IoT Team:**  
  - Investigar protocolos de comunicación (MQTT vs. HTTP).  
  - Conectar un ESP32 básico para pruebas de sensores.  
- **Entregables:**  
  - Diagrama de red funcional (usando herramientas como Cisco Packet Tracer).  
  - Servidor Raspberry Pi operativo con acceso remoto.  

---

#### **Sprint 2 (Clases 5-8): Implementación de Comunicación**  
**Objetivo:** Establecer comunicación entre dispositivos IoT y la web.  
- **Redes Básicas Team:**  
  - Segmentar la red en VLANs (ej.: una para sensores, otra para usuarios).  
  - Configurar balanceo de carga en el servidor para manejar múltiples conexiones.  
- **Seguridad IoT Team:**  
  - Implementar MQTT con autenticación básica (usando Mosquitto Broker).  
  - Integrar WebSockets para sincronizar el jardín físico-virtual.  
- **Web Liaison:**  
  - Probar endpoints con el backend de 6to año (ej.: activar riego desde la web).  

---

#### **Sprint 3 (Clases 9-12): Seguridad y Optimización**  
**Objetivo:** Asegurar la red y optimizar rendimiento.  
- **Redes Básicas Team:**  
  - Configurar QoS para priorizar tráfico crítico (ej.: sensores de humedad).  
  - Simular cortes de red y aplicar soluciones de redundancia.  
- **Seguridad IoT Team:**  
  - Implementar TLS para encriptar comunicaciones servidor-microcontroladores.  
  - Agregar autenticación OAuth2 al dashboard de administración.  
- **Testing:**  
  - Realizar pruebas de estrés con 20+ dispositivos conectados simultáneamente.  

---

#### **Sprint 4 (Clases 13-16): Pruebas Finales y Documentación**  
**Objetivo:** Garantizar estabilidad y preparar entrega.  
- **Redes Básicas Team:**  
  - Ajustar configuración de VLANs según feedback del testing.  
  - Documentar topología de red y direccionamiento IP.  
- **Seguridad IoT Team:**  
  - Auditar vulnerabilidades con herramientas como Wireshark o Nmap.  
  - Crear manual de configuración para microcontroladores.  
- **Entregable Final:**  
  - Red funcional con latencia <100ms y cero caídas durante la demo.  
  - Presentación técnica explicando protocolos y medidas de seguridad.  

---

### **Herramientas de Gestión**  
- **Tablero Scrum:** Trello o Jira para tareas como *Configurar VLAN*, *Testear MQTT*, etc.  
- **Repositorio:** GitHub para documentación técnica y scripts de configuración.  
- **Comunicación:** Discord/Slack para coordinación con 6to año y reportes diarios.  

---

### **Ceremonias Scrum**  
1. **Sprint Planning (Inicio de cada sprint):**  
   - Definir tareas técnicas y asignar equipos (1 hora).  
2. **Daily Stand-Up (Inicio de cada clase):**  
   - Reportar avances y problemas técnicos (10 minutos por equipo).  
3. **Sprint Review (Final de cada sprint):**  
   - Demostrar estabilidad de la red a profesores y 6to año (30 minutos).  
4. **Retrospectiva (Final de cada sprint):**  
   - Analizar fallos (ej.: "MQTT no responde bajo carga") y soluciones (20 minutos).  

---

### **Ejemplo de Distribución de Tareas por Equipo**  
#### **Redes Básicas Team (Ejemplo)**  
| **Tarea**                          | **Sprint** | **Responsable** |  
|-------------------------------------|------------|------------------|  
| Configurar VLANs en switch          | 1          | Marco, Paula     |  
| Implementar balanceo de carga       | 2          | Diego            |  
| Simular cortes de red               | 3          | Laura            |  
| Documentar topología                | 4          | Todos            |  

#### **Seguridad IoT Team (Ejemplo)**  
| **Tarea**                          | **Sprint** | **Responsable** |  
|-------------------------------------|------------|------------------|  
| Configurar MQTT con autenticación   | 2          | Andrés           |  
| Implementar TLS en Raspberry Pi     | 3          | Valeria          |  
| Auditar red con Wireshark           | 4          | Rodrigo          |  
| Crear manual de microcontroladores  | 4          | Todos            |  

---

### **Consejos Clave**  
- **Simulaciones:** Usar Cisco Packet Tracer o GNS3 para practicar configuraciones sin riesgo.  
- **Documentación:** Mantener un registro detallado de IPs, contraseñas y protocolos.  
- **Coordinación con 6to Año:** Revisar diariamente los endpoints requeridos por el backend (ej.: URLs de APIs).  

--- 

Este esquema asegura que los equipos de 5to año trabajen en sincronía con los de 6to, priorizando una red robusta, segura y escalable para el escape room. Al final, ambos cursos integrarán sus componentes en una demo unificada.




---



A continuación se presenta una propuesta revisada para el plan de estudios de 5to año en "Laboratorio de Redes Informáticas", enfocado en redes locales y la integración de microcontroladores con protocolo MQTT y un servidor Node.js. Se ha considerado que cada clase se divide en dos partes de 40 minutos (total de 80 minutos por sesión) y se omiten temas avanzados de routing, centrándose en aplicaciones prácticas para conectar dispositivos físicos con proyectos como “El Jardín de las Buenas Acciones”.

---

## Objetivo General

Que los estudiantes comprendan los fundamentos de las redes locales y aprendan a integrar microcontroladores en sistemas IoT. Utilizando el protocolo MQTT y un servidor Node.js, se desarrollará un sistema práctico que permita la comunicación entre dispositivos físicos y aplicaciones (como el juego), fortaleciendo tanto los conocimientos técnicos como el trabajo en proyectos integradores.

---

## Distribución de 32 Clases (80 minutos cada una)

### **Módulo 1: Fundamentos de Redes Locales (Clases 1 a 4)**  
**Objetivo:** Conocer los conceptos básicos de las redes locales, su configuración y administración en un entorno controlado (laboratorio y aula).  

1. **Clase 1 – Introducción a las Redes Locales**  
   - Conceptos básicos de redes: definición, tipos (LAN vs. WAN), y su importancia en IoT.  
   - Actividad práctica: Identificar componentes y topologías simples en redes locales.

2. **Clase 2 – Conexiones Cableadas e Inalámbricas**  
   - Diferencias entre redes Ethernet y WiFi, ventajas y limitaciones.  
   - Laboratorio: Configuración básica de una red local en el aula (configuración de router, switch y puntos de acceso).

3. **Clase 3 – Modelos de Referencia: OSI y TCP/IP**  
   - Desglose de las 7 capas del modelo OSI y comparación con el modelo TCP/IP.  
   - Concepto de paquete de datos. 
   - Actividad práctica: Uso de diagramas interactivos para relacionar funciones de cada capa.

4. **Clase 4 -- Direccionamiento IP y Subnetting Básico**  
   - Introducción al direccionamiento IPv4, máscaras de subred y nociones de red y host.
   - Ejercicios de cálculo de subredes en papel y en herramientas de simulación.

5. **Clase 5 – Protocolos de Comunicación y Herramientas Básicas de Diagnóstico**  
   - Principales protocolos (TCP, UDP, ICMP) y su rol en la transmisión de datos.  
   - Uso de comandos básicos (ping, tracert, nslookup) para la verificación de conexiones.

6. **Clase 6 – Configuración Básica de Dispositivos de Red**  
   - Fundamentos de configuración inicial de routers y switches.  
   - Ejercicios en simuladores o equipos reales, estableciendo configuraciones mínimas (interfaces, IPs).

7. **Clase 7 – Diseño y Planificación de Redes Locales (LAN)**  
   - Principios de segmentación, diseño de topologías y planificación de una red local. 
   - Elaboración de esquemas de red y simulación de escenarios básicos. 

8. **Clase 8 – Repaso y Evaluación de los contenidos del Módulo**  
   - Realización de una actividad integradora (ejemplo: simulación de red) donde se apliquen todos los conocimientos vistos.
   - Realización de evaluación estilo *Multiple Choise*

---

### **Módulo 2: Introducción a los Microcontroladores y Conectividad **  
**Objetivo:** Familiarizar a los estudiantes con los microcontroladores y su conexión a redes locales, preparando el terreno para la comunicación IoT.

9. **Clase 9 – Introducción a los Microcontroladores**  
   - Presentación de plataformas: Arduino, ESP8266/ESP32, Raspberry Pi (según disponibilidad).  
   - Conceptos básicos de hardware y arquitectura.

10. **Clase 10 – Configuración del Entorno de Desarrollo**  
   - Instalación y uso del Arduino IDE u otro entorno para programar microcontroladores.  
   - Primeros ejemplos de código: “Hola Mundo” en microcontroladores (encender un LED).

11. **Clase 11 – Programación Básica en Microcontroladores**  
   - Uso de entradas y salidas digitales, conexión de sensores simples (luz, temperatura).  
   - Laboratorio: Lectura de datos de un sensor y visualización en el monitor serial.

12. **Clase 12 – Conectividad WiFi en Microcontroladores**  
   - Configuración de módulos WiFi y conexión a redes locales.  
   - Ejercicio práctico: Conectar un microcontrolador a una red inalámbrica del aula.
   - Protocolo DHCP

13. **Clase 13 – Introducción a MQTT y Comunicación IoT**  
   - Conceptos de comunicación publish/subscribe y beneficios de MQTT en entornos IoT.  
   - Discusión: Casos de uso en proyectos de integración física-digital.

14. **Clase 14 – Instalación y Configuración de un Broker MQTT**  
    - Uso de Mosquitto (u otro broker) en un entorno local.  
    - Laboratorio: Configuración del broker y pruebas de conexión básicas.

15. **Clase 15 – Programación en Microcontroladores con MQTT I**  
    - Ejemplo práctico: Programar un microcontrolador para enviar mensajes a través de MQTT.  
    - Actividad en dos bloques: explicación teórica y práctica en laboratorio.

16. **Clase 16 – Programación en Microcontroladores con MQTT II**  
    - Continuación del desarrollo: Recepción de mensajes y respuesta a eventos.  
    - Ejercicio integrador: Prueba de comunicación entre dos microcontroladores vía MQTT.

---

### **Módulo 3: Integración con Node.js y Desarrollo del Servidor IoT (Clases 13 a 20)**  
**Objetivo:** Aprender a utilizar Node.js para crear un servidor que se comunique con el broker MQTT, recibiendo y procesando datos de microcontroladores.

17. **Clase 17 – Introducción a Node.js**  
    - Fundamentos, instalación y configuración de un entorno Node.js.  
    - Presentación de ejemplos sencillos.

18. **Clase 18 – Creación de un Servidor Node.js Básico**  
    - Configuración de un servidor básico y revisión de conceptos de programación asíncrona.  
    - Práctica: Primer servidor local en Node.js.
    - Acceso remoto vía SSH.

19. **Clase 19 – Integración de Node.js con MQTT I**  
    - Instalación de librerías (como mqtt.js) para conectar Node.js al broker MQTT.  
    - Laboratorio: Suscribirse a un tópico y recibir mensajes.

20. **Clase 20 – Integración de Node.js con MQTT II**  
    - Desarrollo de scripts para procesar y reenviar mensajes recibidos.  
    - Ejercicio práctico: Enviar datos desde un microcontrolador a Node.js.

---

### **Módulo 4: Proyecto Integrador – Conexión con “El Jardín de las Buenas Acciones” (Clases 21 a 32)**  
**Objetivo:** Consolidar los conocimientos integrando la red local, los microcontroladores y el servidor Node.js en un proyecto que interactúe con el juego, conectando acciones digitales con respuestas en dispositivos físicos.

21. **Clase 21 – Planificación del Proyecto Integrador**  
    - Definición de objetivos, roles y funcionalidades: cómo el sistema IoT interactuará con el juego y dispositivos físicos.

22. **Clase 22 – Diseño de la Arquitectura del Sistema**  
    - Creación de diagramas de flujo, esquemas de red y asignación de componentes (microcontroladores, broker, servidor, interfaz de usuario).

23. **Clase 23 – Desarrollo de la Interfaz de Comunicación**  
    - Diseño y desarrollo de una API o dashboard que muestre el estado de los dispositivos y permita la interacción con el juego.

24. **Clase 24 – Configuración Final del Broker MQTT y Pruebas de Conectividad**  
    - Revisión y ajuste de la configuración del broker para un entorno estable y seguro en la red local.

25. **Clase 25 – Integración de Sensores y Actuadores en el Prototipo**  
    - Implementación física: conectar sensores/actuadores a los microcontroladores para simular respuestas en el “jardín”.

26. **Clase 26 – Integración del Sistema IoT con el Juego**  
    - Configurar la comunicación para que acciones en el juego (por ejemplo, registrar un acto de bondad) envíen señales que “cultiven” el jardín físico o virtual.

27. **Clase 27 – Pruebas de Campo y Validación del Sistema**  
    - Ejecución de pruebas integrales en el entorno del laboratorio y ajustes en tiempo real.

28. **Clase 28 – Análisis y Ajuste de Parámetros**  
    - Evaluación del desempeño del sistema: tiempos de respuesta, estabilidad y seguridad; ajustes de configuración según resultados.

29. **Clase 29 – Documentación del Proyecto**  
    - Elaboración de manuales técnicos, diagramas de red y reportes que describan la arquitectura y funcionamiento del sistema.

30. **Clase 30 – Presentación Interna y Retroalimentación**  
    - Exposición del proyecto ante compañeros y docentes, con demostraciones prácticas y discusión de resultados.

31. **Clase 31 – Ajustes y Optimización Final**  
    - Implementación de mejoras basadas en la retroalimentación recibida y optimización del sistema en general.

32. **Clase 32 – Evaluación Final y Cierre del Proyecto**  
    - Presentación final, evaluación integral del aprendizaje y discusión sobre la aplicación de la tecnología en la sociedad.

---

## Consideraciones Adicionales

- **Estructura Modular:** Cada clase está dividida en dos bloques de 40 minutos, combinando teoría y práctica para reforzar el aprendizaje y permitir una aplicación inmediata de conceptos.
- **Enfoque Práctico:** Se priorizan actividades de laboratorio y proyectos integradores que permitan al estudiante experimentar con la configuración de redes locales, el uso de microcontroladores y la integración con aplicaciones web.
- **Conexión con el Proyecto de Desarrollo Web:** El sistema desarrollado en este curso servirá como soporte para el juego “El Jardín de las Buenas Acciones”, permitiendo la interacción entre el entorno digital y dispositivos físicos.
- **Seguridad y Buenas Prácticas:** Se incluye la seguridad básica en redes locales y la autenticación en comunicaciones IoT para garantizar sistemas robustos y confiables.

Esta propuesta ajustada busca responder a las necesidades planteadas, garantizando que en el tiempo disponible se aborden los temas esenciales para que los estudiantes adquieran las competencias necesarias en redes locales y en la integración de microcontroladores en sistemas IoT, sin adentrarse en temas avanzados de routing.