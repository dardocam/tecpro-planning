## Clase 4 – Direccionamiento IP y Subnetting Básico

### Objetivos 
- **Teoría:** Entender el direccionamiento IPv4, la función de las máscaras de subred y los conceptos de red y host.
- **Práctica:** Realizar ejercicios de cálculo de subredes tanto de forma manual como mediante herramientas de simulación.

### Teoría (40 minutos)
- **Direccionamiento IPv4:**  
  - **Estructura y notación:** Explicación de la notación decimal punteada, la importancia de cada octeto y ejemplos prácticos.  
  - **Máscaras de subred:** Cómo se definen y utilizan para dividir una red en subredes más pequeñas, optimizando la administración.  
- **Conceptos de red y host:**  
  - Se explicará la diferencia entre la parte de red y la parte de host en una dirección IP, y cómo esto impacta en la escalabilidad de la red.  
- **Recursos y fuentes:**  
  - Tutoriales técnicos de Cisco y guías especializadas en direccionamiento IP, disponibles en sitios como NetworkLessons.com.  
  - **Fuente:** cite_CiscoIPSubnetting2023

### Práctica (40 minutos)
- **Ejercicios manuales:**  
  - Cálculo de subredes a partir de direcciones IP proporcionadas, identificando rangos de red y broadcast.  
  - Resolución de casos prácticos en papel, con ejemplos que simulan la división de una red empresarial.  
- **Uso de herramientas de simulación:**  
  - Empleo de calculadoras de subred en línea para verificar resultados y reforzar la comprensión del proceso.  
  - Comparación entre el método manual y el uso de software para afianzar los conceptos.

---

A continuación se presenta un conjunto de filminas (slides) estructuradas profesionalmente para la **Clase 4 – Direccionamiento IP y Subnetting Básico**. La clase está dividida en 40 minutos de teoría y 40 minutos de práctica, permitiendo a los estudiantes entender la estructura de las direcciones IPv4, el uso de máscaras de subred y aplicar ejercicios prácticos de cálculo de subredes.

---

### Filmina 1: Portada
- **Título:** Clase 4 – Direccionamiento IP y Subnetting Básico
- **Subtítulo:** Comprendiendo IPv4, máscaras de subred y conceptos de red y host
- **Instructor:** [Nombre del Instructor]
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Teoría (40 minutos):**
  - **Direccionamiento IPv4:**
    - Estructura y notación decimal punteada.
    - Importancia de cada octeto y ejemplos prácticos.
  - **Máscaras de subred:**
    - Definición y uso para dividir una red en subredes.
  - **Conceptos de red y host:**
    - Diferenciación entre la parte de red y la parte de host en una dirección IP.
- **Práctica (40 minutos):**
  - **Ejercicios Manuales:**
    - Cálculo de subredes a partir de direcciones IP.
    - Identificación de rangos de red y direcciones de broadcast.
  - **Uso de Herramientas de Simulación:**
    - Empleo de calculadoras de subred en línea para verificar resultados.
    - Comparación entre cálculos manuales y herramientas digitales.

---

### Filmina 3: Objetivos de la Clase
- **Objetivos Teóricos:**
  - Entender el direccionamiento IPv4 y la notación decimal punteada.
  - Comprender el funcionamiento y la importancia de las máscaras de subred.
  - Diferenciar claramente entre la parte de red y la parte de host en una dirección IP.
- **Objetivos Prácticos:**
  - Realizar ejercicios manuales de cálculo de subredes.
  - Verificar y reforzar el proceso de subnetting mediante herramientas de simulación.
  - Aplicar conceptos teóricos a casos prácticos de redes empresariales.

---

### Filmina 4: Direccionamiento IPv4 – Estructura y Notación
- **Notación Decimal Punteada:**
  - Una dirección IPv4 se compone de 4 octetos (por ejemplo, 192.168.1.1).
  - Cada octeto representa 8 bits y puede tener un valor entre 0 y 255.
- **Importancia de Cada Octeto:**
  - Determina la parte de red y la parte de host.
  - Ejemplo: En la dirección 192.168.1.1, los primeros octetos pueden definir la red y el último, el host.
- **Ejemplo Práctico:**
  - Desglosar una dirección IP en binario para entender la distribución de bits.

---

### Filmina 5: Máscaras de Subred
- **Definición y Función:**
  - La máscara de subred es un número que acompaña a la dirección IP para definir qué parte corresponde a la red y qué parte a los hosts.
  - Ejemplo: Una máscara común es 255.255.255.0.
- **Cómo Dividir una Red:**
  - Utilizando la máscara, se pueden crear subredes más pequeñas, facilitando la administración y optimización de la red.
  - El proceso se conoce como subnetting.
- **Ilustración:**
  - Diagrama que muestre cómo se "encapsula" la dirección IP con la máscara para definir la red y el host.

---

### Filmina 6: Conceptos de Red y Host
- **Parte de Red:**
  - Identifica a la red a la que pertenece una dirección IP.
  - Es común que esté definida por los bits más significativos según la máscara.
- **Parte de Host:**
  - Identifica a los dispositivos (hosts) dentro de esa red.
  - Determinada por los bits restantes.
- **Impacto en la Escalabilidad:**
  - Un buen diseño de subnetting permite optimizar la cantidad de hosts por subred y planificar la expansión de la red.

---

### Filmina 7: Recursos y Fuentes de Referencia
- **Documentación y Guías:**
  - Tutoriales técnicos de Cisco y guías especializadas en direccionamiento IP.
  - Sitios como NetworkLessons.com ofrecen ejemplos y ejercicios detallados.
- **Fuente:** cite_CiscoIPSubnetting2023

---

### Filmina 8: Práctica – Ejercicios Manuales
- **Ejercicios en Papel:**
  - Calcular la subred para una dirección IP dada (ejemplo: 192.168.10.0/24).
  - Identificar:
    - Dirección de red.
    - Dirección de broadcast.
    - Rango de direcciones de host.
- **Casos Prácticos:**
  - Dividir una red empresarial en varias subredes con diferentes necesidades de hosts.
  - Análisis de ejemplos y resolución en grupo.

---

### Filmina 9: Práctica – Uso de Herramientas de Simulación
- **Herramientas en Línea:**
  - Uso de calculadoras de subred (por ejemplo, SubnetOnline.com o herramientas similares).
- **Tareas:**
  - Ingresar direcciones IP y máscaras para obtener la información de la subred.
  - Comparar resultados manuales con los de la herramienta para afianzar la comprensión.
- **Discusión:**
  - Ventajas y limitaciones del método manual versus el uso de software.

---

### Filmina 10: Demostración en Vivo
- **Visualización en el Simulador:**
  - Mostrar en vivo el proceso de cálculo de subred utilizando una calculadora en línea.
  - Resaltar cómo se interpretan los resultados: dirección de red, rango de host y dirección de broadcast.
- **Interacción:**
  - Invitar a los estudiantes a proponer direcciones IP y realizar cálculos en conjunto.

---

### Filmina 11: Cierre y Preguntas
- **Resumen de la Clase:**
  - Repaso de la estructura de direcciones IPv4, máscaras de subred y los conceptos de red y host.
  - Importancia del cálculo manual y el refuerzo con herramientas de simulación.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas y repasar ejemplos prácticos.
  - Discusión de casos reales y aplicación en entornos empresariales.

---

### Filmina 12: Recursos y Bibliografía
- **Documentación Técnica:**
  - [Cisco – Guías de direccionamiento IP](https://www.cisco.com)
  - [NetworkLessons.com – Subnetting](https://networklessons.com)
- **Tutoriales y Herramientas:**
  - Calculadoras de subred en línea.
  - Ejercicios y ejemplos en blogs especializados en redes.
- **Fuente:** cite_CiscoIPSubnetting2023

---
