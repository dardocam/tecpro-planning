**Módulo 4: Proyecto Integrador – Conexión con “El Jardín de las Buenas Acciones”**

## Clase 21 – Planificación del Proyecto Integrador

### Objetivos de la sesión
- **Teoría:**  
  - Definir los objetivos del proyecto, los roles de los integrantes y las funcionalidades esperadas.  
  - Establecer la interacción entre el sistema IoT y el juego, determinando cómo se traducirán las acciones digitales en respuestas físicas.
- **Práctica:**  
  - Realizar una lluvia de ideas grupal y elaborar un documento preliminar de planificación que incluya objetivos, roles, cronograma y funcionalidades.

### Teoría (40 minutos)
- **Fundamentos de la planificación de proyectos IoT:**  
  - Introducción a metodologías ágiles y gestión de proyectos (Scrum, Kanban).  
  - Importancia de definir claramente los objetivos, alcance y roles de cada miembro.  
  - Ejemplos de casos de éxito en integración de sistemas físicos y digitales.
- **Recursos y fuentes:**  
  - Materiales de Project Management Institute (PMI) y guías de metodologías ágiles.  
  - **Fuente:** cite_PMI2023

### Práctica (40 minutos)
- **Dinámica de grupo:**  
  - Formación de equipos y discusión de ideas sobre la interacción del “Jardín de las Buenas Acciones” con el juego.  
  - Elaboración de un borrador que detalle objetivos, roles, funcionalidades y herramientas a utilizar (p. ej., Trello o diagramas colaborativos).
- **Entrega:**  
  - Cada grupo presentará un esquema preliminar para retroalimentación.

---

## Clase 22 – Diseño de la Arquitectura del Sistema

### Objetivos de la sesión
- **Teoría:**  
  - Comprender la importancia del diseño de la arquitectura del sistema IoT integrador.  
  - Aprender a crear diagramas de flujo, esquemas de red y asignar correctamente los componentes (microcontroladores, broker, servidor, interfaz de usuario).
- **Práctica:**  
  - Diseñar el diagrama de arquitectura general del proyecto, identificando cada componente y su interconexión.

### Teoría (40 minutos)
- **Diseño de arquitecturas IoT:**  
  - Explicación de los diagramas de flujo y esquemas de red.  
  - Consideraciones de escalabilidad, redundancia y seguridad en la comunicación entre dispositivos.  
  - Ejemplos de arquitecturas integradas en proyectos IoT reales.
- **Recursos y fuentes:**  
  - Documentación de Cisco Networking Academy y publicaciones especializadas en IoT.  
  - **Fuente:** cite_CiscoArquitecturaIoT2023

### Práctica (40 minutos)
- **Elaboración de esquemas:**  
  - Uso de herramientas como Microsoft Visio o Lucidchart para crear el diagrama de la arquitectura del sistema.  
  - Identificación de los puntos de integración entre el juego y el entorno físico (sensores, actuadores, servidor).
- **Feedback:**  
  - Revisión conjunta de los esquemas y ajustes basados en comentarios del instructor.

---

## Clase 23 – Desarrollo de la Interfaz de Comunicación

### Objetivos de la sesión
- **Teoría:**  
  - Introducir conceptos de desarrollo de APIs y dashboards para monitoreo y control de dispositivos IoT.  
  - Explicar la importancia de una interfaz intuitiva que permita la interacción entre usuarios, el juego y el sistema IoT.
- **Práctica:**  
  - Esbozar y comenzar el desarrollo de una API o dashboard que muestre el estado de los dispositivos y permita enviar comandos al sistema.

### Teoría (40 minutos)
- **Interfaz de comunicación:**  
  - Fundamentos de RESTful APIs, WebSockets y frameworks para desarrollo de dashboards (por ejemplo, Express.js, React).  
  - Ejemplos de aplicaciones de monitoreo en tiempo real.
- **Recursos y fuentes:**  
  - Tutoriales y documentación de Express.js y React, además de ejemplos prácticos disponibles en la comunidad IoT.  
  - **Fuente:** cite_ExpressReact2023

### Práctica (40 minutos)
- **Desarrollo inicial:**  
  - Configuración de un proyecto básico en Node.js para exponer endpoints REST.  
  - Creación de una interfaz simple que permita visualizar el estado de un dispositivo simulado.
- **Demostración:**  
  - Pruebas de la API local y validación de respuestas con herramientas como Postman.

---

## Clase 24 – Configuración Final del Broker MQTT y Pruebas de Conectividad

### Objetivos de la sesión
- **Teoría:**  
  - Revisar la configuración óptima del broker MQTT en un entorno de red local, enfatizando la seguridad y estabilidad.  
  - Discutir estrategias de ajuste para un rendimiento óptimo.
- **Práctica:**  
  - Realizar pruebas de conectividad y ajustes en la configuración del broker MQTT para asegurar su funcionamiento en el entorno del proyecto.

### Teoría (40 minutos)
- **Ajustes y buenas prácticas en brokers MQTT:**  
  - Parámetros de configuración recomendados, seguridad (certificados, autenticación) y manejo de conexiones.  
  - Ejemplos de implementación en entornos productivos.
- **Recursos y fuentes:**  
  - Guías oficiales de Mosquitto y documentación técnica de Eclipse.  
  - **Fuente:** cite_MosquittoGuide2023

### Práctica (40 minutos)
- **Laboratorio de configuración:**  
  - Revisión y ajuste de la configuración del broker MQTT en un entorno real o virtual.  
  - Ejecución de pruebas de conectividad con clientes MQTT y simulación de fallos para verificar la robustez.
- **Validación:**  
  - Registro de tiempos de respuesta y documentación de cualquier incidencia para su posterior análisis.

---

## Clase 25 – Integración de Sensores y Actuadores en el Prototipo

### Objetivos de la sesión
- **Teoría:**  
  - Revisar los conceptos de sensores y actuadores, y su papel en la interacción física del proyecto.  
  - Explicar el proceso de conexión y la importancia de la calibración en sistemas IoT.
- **Práctica:**  
  - Conectar físicamente sensores y actuadores a los microcontroladores, integrándolos en el prototipo del “Jardín de las Buenas Acciones”.

### Teoría (40 minutos)
- **Sensores y actuadores:**  
  - Tipos de sensores (de luz, temperatura, humedad, etc.) y actuadores (motores, luces LED, relés) aplicables al proyecto.  
  - Recomendaciones para la instalación, calibración y mantenimiento de estos dispositivos.
- **Recursos y fuentes:**  
  - Tutoriales y hojas de datos técnicos de fabricantes de sensores y actuadores.  
  - **Fuente:** cite_SensAct2023

### Práctica (40 minutos)
- **Implementación física:**  
  - Montaje de circuitos integrando sensores y actuadores en el prototipo, siguiendo esquemas de conexión previamente diseñados.  
  - Pruebas de funcionamiento: lectura de datos de sensores y activación de respuestas (por ejemplo, encendido de LED o activación de motores) en función de eventos simulados.
- **Documentación:**  
  - Registro de las conexiones y resultados obtenidos en el laboratorio.

---

## Clase 26 – Integración del Sistema IoT con el Juego

### Objetivos de la sesión
- **Teoría:**  
  - Analizar el mecanismo de comunicación entre el juego y el sistema IoT, definiendo cómo se mapearán las acciones digitales a respuestas físicas.  
  - Discutir protocolos y estrategias de sincronización.
- **Práctica:**  
  - Configurar la comunicación para que eventos en el juego (por ejemplo, registrar un acto de bondad) generen señales que activen respuestas en el sistema IoT.

### Teoría (40 minutos)
- **Interacción digital-física:**  
  - Modelos de integración que permiten que las acciones del juego influyan en dispositivos físicos (ej. triggers vía MQTT, Webhooks).  
  - Estrategias de sincronización y validación de eventos en tiempo real.
- **Recursos y fuentes:**  
  - Ejemplos de integración en proyectos IoT y documentación de APIs para eventos en tiempo real.  
  - **Fuente:** cite_IoTIntegration2023

### Práctica (40 minutos)
- **Configuración de la comunicación:**  
  - Desarrollo de scripts y configuración del servidor Node.js para recibir eventos del juego y enviar comandos a los microcontroladores.  
  - Simulación de eventos del juego y verificación de la respuesta en el prototipo (activación de actuadores, cambios en el “jardín”).
- **Testing:**  
  - Uso de clientes de MQTT y dashboards para monitorear la interacción en tiempo real.

---

## Clase 27 – Pruebas de Campo y Validación del Sistema

### Objetivos de la sesión
- **Teoría:**  
  - Revisar metodologías para realizar pruebas integrales de sistemas IoT, enfocándose en la validación de funcionalidades y desempeño.  
  - Explicar la importancia de pruebas en entornos reales y simulados.
- **Práctica:**  
  - Ejecutar pruebas de campo en el laboratorio, simulando el entorno real de operación del proyecto, y documentar los resultados.

### Teoría (40 minutos)
- **Metodologías de testing IoT:**  
  - Pruebas de conectividad, rendimiento, latencia y estabilidad.  
  - Recomendaciones para la identificación y solución de problemas en sistemas distribuidos.
- **Recursos y fuentes:**  
  - Guías de testing en IoT y estudios de caso en publicaciones técnicas.  
  - **Fuente:** cite_IoTTesting2023

### Práctica (40 minutos)
- **Pruebas integrales:**  
  - Ejecución de pruebas de campo que incluyan la comunicación entre juego, servidor y dispositivos físicos.  
  - Uso de herramientas de monitoreo y logging para identificar fallas o cuellos de botella.
- **Revisión en grupo:**  
  - Discusión y documentación de incidencias para ajustar configuraciones en tiempo real.

---

## Clase 28 – Análisis y Ajuste de Parámetros

### Objetivos de la sesión
- **Teoría:**  
  - Evaluar el desempeño del sistema integrador en términos de tiempos de respuesta, estabilidad y seguridad.  
  - Discutir estrategias para el ajuste y optimización de parámetros del sistema.
- **Práctica:**  
  - Analizar los datos recolectados durante las pruebas de campo y ajustar configuraciones en el broker, servidor y dispositivos IoT.

### Teoría (40 minutos)
- **Optimización de sistemas IoT:**  
  - Parámetros clave a analizar: latencia, throughput, tasa de error, y seguridad en la transmisión.  
  - Herramientas y técnicas para la medición y optimización.
- **Recursos y fuentes:**  
  - Publicaciones y whitepapers de optimización en sistemas distribuidos y IoT.  
  - **Fuente:** cite_IoTOptimization2023

### Práctica (40 minutos)
- **Análisis de métricas:**  
  - Revisión de logs y métricas obtenidas durante las pruebas de campo.  
  - Ajuste de parámetros en el broker MQTT, servidor Node.js y dispositivos para mejorar el rendimiento.
- **Retroalimentación:**  
  - Presentación de resultados y discusión de las mejoras implementadas.

---

## Clase 29 – Documentación del Proyecto

### Objetivos de la sesión
- **Teoría:**  
  - Subrayar la importancia de la documentación en proyectos IoT, incluyendo manuales técnicos, diagramas y reportes de funcionamiento.  
  - Explicar las mejores prácticas para la elaboración de documentación técnica clara y precisa.
- **Práctica:**  
  - Elaborar y estructurar la documentación del proyecto, generando diagramas de red, flujos de comunicación y manuales de usuario.

### Teoría (40 minutos)
- **Buenas prácticas en documentación:**  
  - Herramientas y estándares para la documentación (p. ej., Markdown, diagramas UML).  
  - Ejemplos de documentación en proyectos tecnológicos y su impacto en la escalabilidad y mantenimiento.
- **Recursos y fuentes:**  
  - Guías de documentación técnica de Microsoft y Atlassian.  
  - **Fuente:** cite_DocumentationGuide2023

### Práctica (40 minutos)
- **Elaboración colaborativa:**  
  - Trabajo en equipo para redactar la documentación del proyecto, abarcando desde la arquitectura hasta la configuración final.  
  - Uso de herramientas colaborativas (Google Docs, Confluence) para integrar la información de cada módulo.
- **Revisión y ajuste:**  
  - Intercambio de feedback entre grupos para unificar criterios y mejorar la calidad de la documentación.

---

## Clase 30 – Presentación Interna y Retroalimentación

### Objetivos de la sesión
- **Teoría:**  
  - Desarrollar habilidades de presentación y comunicación técnica, fundamentales para exponer proyectos en entornos profesionales.  
  - Discutir la importancia de la retroalimentación constructiva para la mejora continua.
- **Práctica:**  
  - Realizar presentaciones internas del proyecto ante compañeros y docentes, demostrando las funcionalidades del sistema y recibiendo comentarios.

### Teoría (40 minutos)
- **Técnicas de presentación:**  
  - Estructuración de una presentación técnica, uso de diapositivas y narrativas efectivas para comunicar resultados.  
  - Estrategias para responder preguntas y justificar decisiones técnicas.
- **Recursos y fuentes:**  
  - Talleres y guías sobre presentaciones efectivas de TED Talks y Toastmasters.  
  - **Fuente:** cite_PresentacionTech2023

### Práctica (40 minutos)
- **Simulacro de presentación:**  
  - Cada equipo expone su proyecto utilizando la documentación y prototipos desarrollados, demostrando la integración entre el juego y el sistema IoT.  
  - Recopilación de comentarios y sugerencias para la optimización final.
- **Discusión:**  
  - Sesión de preguntas y respuestas para afianzar los conceptos y validar el funcionamiento del sistema.

---

## Clase 31 – Ajustes y Optimización Final

### Objetivos de la sesión
- **Teoría:**  
  - Revisar los feedbacks recibidos en la presentación y discutir posibles mejoras y optimizaciones en el sistema.  
  - Enfatizar la importancia de la iteración en proyectos tecnológicos.
- **Práctica:**  
  - Implementar ajustes finales en la configuración del sistema, optimizando el rendimiento y la integración de sus componentes.
  
### Teoría (40 minutos)
- **Iteración y mejora continua:**  
  - Principios del ciclo de mejora continua (Planificar, Hacer, Verificar, Actuar – PHVA) aplicados a sistemas IoT.  
  - Revisión de casos de éxito donde se implementaron ajustes post-presentación para optimizar el funcionamiento.
- **Recursos y fuentes:**  
  - Artículos y estudios de caso sobre optimización en proyectos tecnológicos publicados en IEEE Xplore y similares.  
  - **Fuente:** cite_IteracionIoT2023

### Práctica (40 minutos)
- **Implementación de ajustes:**  
  - Los equipos aplican mejoras en el código, configuraciones de hardware y ajustes en el broker/servidor basados en la retroalimentación.  
  - Pruebas de verificación de las mejoras implementadas y validación del rendimiento optimizado.
- **Documentación de cambios:**  
  - Registro de las modificaciones y los resultados obtenidos, asegurando la trazabilidad del proceso de optimización.

---

## Clase 32 – Evaluación Final y Cierre del Proyecto

### Objetivos de la sesión
- **Teoría:**  
  - Realizar una evaluación integral del proyecto, repasando los aprendizajes y la integración de los diversos sistemas.  
  - Discutir el impacto de la tecnología IoT en la sociedad y posibles aplicaciones futuras.
- **Práctica:**  
  - Presentar el proyecto final ante un panel evaluador, responder a preguntas y realizar una autoevaluación del proceso desarrollado.

### Teoría (40 minutos)
- **Evaluación y cierre:**  
  - Criterios de evaluación del proyecto: funcionalidad, integración, documentación y presentación.  
  - Reflexión sobre los desafíos encontrados y las lecciones aprendidas en la implementación de sistemas IoT integrados.
- **Recursos y fuentes:**  
  - Guías de evaluación de proyectos tecnológicos de universidades y centros de investigación en IoT.  
  - **Fuente:** cite_EvaluacionProyecto2023

### Práctica (40 minutos)
- **Presentación final:**  
  - Cada equipo expone el proyecto completo, demostrando la integración entre la red local, microcontroladores y el servidor Node.js que interactúa con el juego “El Jardín de las Buenas Acciones”.  
  - Sesión de preguntas y respuestas por parte del panel evaluador y compañeros.
- **Cierre y retroalimentación final:**  
  - Se lleva a cabo una evaluación integral, se comparten recomendaciones finales y se discute el potencial de aplicación de la tecnología en contextos reales.
- **Entrega de documentación:**  
  - Presentación de la documentación final del proyecto y registro de conclusiones.

---

Este módulo integrador está diseñado para que los estudiantes apliquen de forma completa y práctica los conocimientos teóricos y técnicos adquiridos en módulos previos. Cada clase equilibra el aprendizaje teórico con ejercicios prácticos, fomentando la colaboración, el pensamiento crítico y la capacidad de resolución de problemas en entornos reales. La integración entre acciones digitales y respuestas físicas se aborda de forma escalonada, permitiendo validar cada componente y optimizar el sistema para lograr un proyecto robusto y funcional.