
## Clase 18 – Creación de un Servidor Node.js Básico

### Objetivos 
- **Teoría:**  
  - Entender los conceptos de programación asíncrona y el ciclo de vida de un servidor HTTP en Node.js.  
  - Aprender a configurar y estructurar un servidor básico, así como a comprender los fundamentos del acceso remoto vía SSH.
- **Práctica:**  
  - Desarrollar un servidor local en Node.js que responda a solicitudes HTTP y permita la gestión de rutas básicas.  
  - Realizar una demostración de acceso remoto al servidor mediante SSH.

### Teoría (40 minutos)
- **Creación del Servidor:**  
  - **Módulo HTTP:** Explicación de la creación de un servidor utilizando el módulo nativo `http` de Node.js.  
  - **Programación asíncrona:** Detalle de cómo se manejan las peticiones y respuestas de forma asíncrona mediante callbacks y promesas.  
  - **Acceso remoto:** Introducción al uso de SSH para acceder y gestionar servidores de forma remota, resaltando su importancia en entornos de producción.
- **Recursos y Fuentes:**  
  - La [documentación de Node.js](https://nodejs.org/en/docs/) es una referencia clave para entender la creación y gestión de servidores.  
  - **Fuente:** cite_NodejsDocs2023

### Práctica (40 minutos)
- **Desarrollo del Servidor Básico:**  
  - Los estudiantes crearán un servidor que escuche en un puerto determinado y responda con mensajes estáticos o simples datos en formato JSON.  
  - Se probará el servidor utilizando herramientas como el navegador o Postman para verificar el flujo de datos.
- **Configuración de Acceso Remoto:**  
  - Se realizará una demostración de cómo conectar al servidor mediante SSH, utilizando clientes como PuTTY o la terminal de comandos, explicando conceptos de seguridad y autenticación.
- **Ejercicios de debugging:**  
  - Se incluirán retos simples para detectar y corregir errores en la configuración o en el manejo asíncrono de las peticiones.

