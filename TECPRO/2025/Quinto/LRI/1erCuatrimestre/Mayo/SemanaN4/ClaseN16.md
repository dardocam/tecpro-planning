## Clase 16 – Programación en Microcontroladores con MQTT II

### Objetivos de la sesión
- **Teoría:**  
  - Profundizar en la recepción de mensajes mediante MQTT, analizando callbacks y la respuesta a eventos.  
  - Integrar la comunicación bidireccional para construir aplicaciones reactivas y dinámicas.
- **Práctica:**  
  - Realizar un ejercicio integrador donde dos microcontroladores se comuniquen vía MQTT: uno envía datos y el otro responde a los mensajes, activando una acción (por ejemplo, encender un LED).

### Teoría (40 minutos)
- **Recepción y Manejo de Mensajes:**  
  - Explicación de la función de callback en la recepción de mensajes y cómo procesar eventos en tiempo real.  
  - Discusión sobre la sincronización y manejo de errores en sistemas de comunicación distribuida.
- **Recursos y Fuentes:**  
  - Ejemplos prácticos de proyectos IoT y documentación de las librerías utilizadas para manejo de MQTT en microcontroladores.  
  - **Fuente:** cite_ArduinoMQTT2023

### Práctica (40 minutos)
- **Ejercicio Integrador:**  
  - Configuración de dos microcontroladores: el primero se encarga de enviar datos (por ejemplo, lecturas de sensor) y el segundo, al recibir dichos datos, ejecuta una acción (como activar un LED o un motor).  
  - Los estudiantes deberán documentar y explicar cada paso del proceso, asegurándose de comprender la interacción entre publicación y suscripción.
- **Pruebas y Validación:**  
  - Monitoreo de la comunicación en tiempo real utilizando herramientas de debugging y clientes MQTT para validar el flujo de mensajes.

