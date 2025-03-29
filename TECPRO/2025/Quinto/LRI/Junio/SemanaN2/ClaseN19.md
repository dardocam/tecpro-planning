

## Clase 19 – Integración de Node.js con MQTT I

### Objetivos 
- **Teoría:**  
  - Conocer la integración de Node.js con el protocolo MQTT mediante la librería **mqtt.js**, comprendiendo el modelo de publicación/suscripción.  
  - Analizar la arquitectura de comunicación entre el servidor Node.js y el broker MQTT.
- **Práctica:**  
  - Configurar e instalar la librería **mqtt.js** en el entorno de Node.js y desarrollar un script que se suscriba a un tópico, recibiendo mensajes desde el broker.

### Teoría (40 minutos)
- **Conceptos de MQTT en Node.js:**  
  - **Modelo Publish/Subscribe:** Se explicará cómo funciona la comunicación basada en tópicos, la suscripción y la publicación de mensajes.  
  - **Instalación de mqtt.js:** Instrucciones para la integración de la librería en proyectos Node.js, destacando sus funciones principales y métodos para establecer conexiones seguras.
  - **Casos de uso en IoT:** Discusión sobre la relevancia de MQTT para recibir datos de microcontroladores en tiempo real.
- **Recursos y Fuentes:**  
  - La [documentación de mqtt.js](https://github.com/mqttjs/MQTT.js) es fundamental para comprender la implementación y configuración.  
  - **Fuente:** cite_MQTTjsDocs2023

### Práctica (40 minutos)
- **Instalación y Configuración:**  
  - Instalación de la librería mediante npm (`npm install mqtt`) y verificación de su correcta integración en el proyecto.  
- **Desarrollo del Script de Suscripción:**  
  - Los estudiantes programarán un script en Node.js que se conecte al broker MQTT, se suscriba a un tópico específico y muestre en la consola los mensajes recibidos.  
  - Se abordarán aspectos de manejo de errores y reconexión en caso de fallos.
- **Ejercicio interactivo:**  
  - Uso de herramientas de simulación o entornos de prueba para enviar mensajes al tópico y verificar la correcta recepción por parte del script.

