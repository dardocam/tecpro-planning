## Clase 3 – Modelos de Referencia: OSI y TCP/IP

### Objetivos
- **Teoría:** Comprender en profundidad las 7 capas del modelo OSI, su función y cómo se compara con el modelo TCP/IP.
- **Práctica:** Utilizar diagramas interactivos para relacionar las funciones de cada capa y visualizar el flujo de datos en una red.

### Teoría (40 minutos)
- **Modelo OSI:**  
  - **Desglose de las 7 capas:** Desde la capa física hasta la capa de aplicación, explicando el rol de cada una y cómo se realiza la comunicación.  
  - **Concepto de encapsulación:** Se detallará cómo un paquete de datos se envuelve en cada capa, agregando información relevante (encabezados y pies de página).  
- **Comparación con TCP/IP:**  
  - Se ilustrará la equivalencia y diferencias entre ambas arquitecturas, resaltando la simplicidad del modelo TCP/IP para entornos prácticos.  
- **Recursos y fuentes:**  
  - Manuales de referencia de Cisco y documentos técnicos de IETF sobre protocolos de Internet.  
  - **Fuente:** cite_CiscoModelosOSI2023

### Práctica (40 minutos)
- **Diagramas interactivos:**  
  - Utilización de herramientas digitales (por ejemplo, simuladores web o aplicaciones interactivas) para “desarmar” un paquete de datos y visualizar su recorrido a través de las capas OSI y TCP/IP.  
  - Ejercicio en el que los estudiantes deberán etiquetar cada parte del diagrama y explicar su función.  
- **Discusión en grupo:**  
  - Análisis de casos reales donde se muestre cómo la estructura de los paquetes influye en la eficiencia y seguridad de la comunicación.


---


A continuación se presenta un conjunto de filminas (slides) estructuradas profesionalmente para la **Clase 3 – Modelos de Referencia: OSI y TCP/IP**. La clase está dividida en 40 minutos de teoría y 40 minutos de práctica, permitiendo a los estudiantes comprender en profundidad las 7 capas del modelo OSI, el concepto de encapsulación y la comparación con el modelo TCP/IP, así como visualizar el flujo de datos mediante diagramas interactivos.

---

### Filmina 1: Portada
- **Título:** Clase 3 – Modelos de Referencia: OSI y TCP/IP
- **Subtítulo:** Comprendiendo la arquitectura de redes y el flujo de datos
- **Instructor:** [Nombre del Instructor]
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Teoría (40 minutos):**
  - Desglose de las 7 capas del modelo OSI y su función.
  - Concepto de encapsulación: cómo se envuelve un paquete de datos.
  - Comparación entre el modelo OSI y el modelo TCP/IP, destacando sus diferencias y equivalencias.
- **Práctica (40 minutos):**
  - Uso de diagramas interactivos para “desarmar” un paquete de datos.
  - Ejercicio de etiquetado y explicación de las funciones de cada capa.
  - Discusión en grupo sobre casos reales y la influencia de la estructura de los paquetes en la eficiencia y seguridad.

---

### Filmina 3: Objetivos de la Clase
- **Objetivos Teóricos:**
  - Comprender en profundidad las 7 capas del modelo OSI y el rol de cada una.
  - Entender el proceso de encapsulación en la comunicación de datos.
  - Comparar el modelo OSI con el modelo TCP/IP, resaltando la simplicidad y aplicaciones prácticas de este último.
- **Objetivos Prácticos:**
  - Utilizar herramientas digitales para visualizar y analizar el recorrido de un paquete de datos.
  - Etiquetar cada parte de un diagrama interactivo y explicar su función en la transmisión de datos.
  - Discutir en grupo casos reales sobre la eficiencia y seguridad en la comunicación de redes.

---

### Filmina 4: Modelo OSI – Desglose de Capas
- **Capa 1: Física**
  - Encargada de la transmisión de bits a través de medios físicos.
- **Capa 2: Enlace de Datos**
  - Proporciona la transferencia confiable de datos entre dispositivos.
- **Capa 3: Red**
  - Maneja la dirección y el enrutamiento de paquetes (ej. IP).
- **Capa 4: Transporte**
  - Controla el flujo y la integridad de los datos (ej. TCP, UDP).
- **Capa 5: Sesión**
  - Establece, gestiona y finaliza sesiones de comunicación.
- **Capa 6: Presentación**
  - Se ocupa de la traducción, cifrado y compresión de datos.
- **Capa 7: Aplicación**
  - Interfaz directa con el usuario y aplicaciones (ej. HTTP, FTP).

---

### Filmina 5: Encapsulación de Datos en OSI
- **Concepto de Encapsulación:**
  - Cada capa añade su propio encabezado (y en algunos casos, pie) al paquete de datos.
  - Ejemplo: Enviar un mensaje desde la Capa 7 implica que la información se "envuelve" sucesivamente en cada capa hasta llegar a la Capa 1.
- **Diagrama Ilustrativo:**
  - Visualización paso a paso del proceso de encapsulación en las 7 capas.

---

### Filmina 6: Comparación con el Modelo TCP/IP
- **Modelo TCP/IP:**
  - Modelo simplificado en 4 capas: Acceso a la red, Internet, Transporte y Aplicación.
- **Equivalencias y Diferencias:**
  - La capa de Acceso a la red engloba las funciones de las capas física y de enlace.
  - La capa de Internet corresponde a la Capa 3 del OSI.
  - La capa de Transporte es similar en ambos modelos.
  - La capa de Aplicación en TCP/IP integra funciones de las capas 5 a 7 del OSI.
- **Ventajas Prácticas:**
  - Mayor simplicidad y adaptabilidad en entornos de red reales.
- **Fuente:** cite_CiscoModelosOSI2023

---

### Filmina 7: Ejercicios Prácticos – Diagramas Interactivos
- **Herramientas Digitales:**
  - Utilización de simuladores web o aplicaciones interactivas para visualizar el recorrido de un paquete de datos.
- **Ejercicio:**
  - “Desarmar” un paquete de datos: los estudiantes deberán etiquetar cada capa y explicar su función.
  - Ejemplo interactivo: arrastrar y soltar etiquetas en un diagrama de las 7 capas del OSI y relacionarlo con el modelo TCP/IP.
  
---

### Filmina 8: Discusión en Grupo
- **Análisis de Casos Reales:**
  - Cómo la estructura de los paquetes influye en la eficiencia de la red.
  - Discusión sobre la seguridad en la transmisión de datos y cómo diferentes capas pueden afectar la confidencialidad y la integridad.
- **Preguntas Guía:**
  - ¿Qué problemas podrían surgir si alguna capa no realiza correctamente su función?
  - ¿Cómo mejora la eficiencia del sistema la encapsulación de datos?

---

### Filmina 9: Demostración en Vivo
- **Visualización del Flujo de Datos:**
  - Mostrar en vivo un diagrama interactivo y “desarmar” un paquete de datos.
  - Explicar cada paso del proceso de encapsulación y el recorrido del paquete desde la capa de aplicación hasta la capa física.
- **Interacción:**
  - Invitar a estudiantes a participar etiquetando elementos y explicando funciones.

---

### Filmina 10: Cierre y Preguntas
- **Resumen de la Clase:**
  - Repaso de las 7 capas del modelo OSI, el proceso de encapsulación y las diferencias con TCP/IP.
  - Importancia de comprender estos modelos para la eficiencia y seguridad en las redes.
- **Sesión de Preguntas y Respuestas:**
  - Resolución de dudas y discusión sobre la aplicación de los modelos en entornos reales.

---

### Filmina 11: Recursos y Bibliografía
- **Documentación Técnica:**
  - Manuales de referencia de Cisco.
  - Documentos técnicos de IETF sobre protocolos de Internet.
- **Enlaces Recomendados:**
  - [Cisco Networking Models](https://www.cisco.com) – Información detallada sobre OSI y TCP/IP.
  - [IETF RFCs](https://www.ietf.org) – Documentos técnicos sobre protocolos de red.
- **Fuente:** cite_CiscoModelosOSI2023

---

Esta estructura de filminas ofrece un marco integral para que los estudiantes comprendan y comparen los modelos de referencia OSI y TCP/IP, combinando teoría, ejercicios interactivos y discusión en grupo para profundizar en el flujo de datos y la encapsulación en las redes.
