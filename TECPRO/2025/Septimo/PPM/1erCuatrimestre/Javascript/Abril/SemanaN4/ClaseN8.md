### **Clase 4: Fechas y Horas**

**Objetivo**  
Comprender el uso del objeto `Date` en JavaScript y aplicar métodos para el manejo y formateo de fechas y horas, permitiendo la realización de cálculos y validaciones temporales.

**Duración**  
2 horas.

**Estructura de la Clase**  

- **Introducción (10 minutos)**
  - Pregunta inicial: "¿Cómo podemos representar y trabajar con fechas y horas en nuestras aplicaciones?"
  - Presentación sobre la importancia de gestionar la temporalidad en el desarrollo de software.

- **Desarrollo (80 minutos)**
  - **Conceptos Teóricos:**
    - Creación de instancias del objeto `Date`.
    - Métodos para obtener componentes de la fecha (año, mes, día, hora, minutos y segundos).
  - **Ejemplos Prácticos:**
    - Formateo de fechas: mostrar fechas en formatos legibles.
    - Cálculo de diferencias entre fechas (por ejemplo, calcular la cantidad de días entre dos fechas).
    - Ejemplos en vivo demostrando cómo manipular y comparar fechas.
  - **Casos de Uso:**
    - Validación de fechas en formularios y aplicaciones que requieren cálculos temporales.

- **Cierre (10 minutos)**
  - Resumen de los puntos clave y repaso de los métodos utilizados.
  - Sesión de preguntas y resolución de dudas.

**Actividad Práctica**  
- **Nombre:** Agenda Digital  
- **Duración:** 30 minutos  
- **Descripción:**  
  Los estudiantes desarrollarán un pequeño programa que permita ingresar fechas, calcular la diferencia entre ellas y presentar la información en un formato legible, aplicando lo aprendido sobre el objeto `Date` y sus métodos.

---

A continuación se presenta un conjunto de filminas (slides) estructuradas profesionalmente para la **Clase 4: Fechas y Horas** en JavaScript. La sesión tiene una duración total de 2 horas y abarca desde la introducción de conceptos básicos hasta la aplicación práctica mediante una actividad denominada "Agenda Digital".

---

### Filmina 1: Portada
- **Título:** Clase 4: Fechas y Horas en JavaScript
- **Subtítulo:** Manejo, formateo y cálculos temporales con el objeto Date
- **Instructor:** [Nombre del Instructor]
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Cómo podemos representar y trabajar con fechas y horas en nuestras aplicaciones?”
  - Importancia de gestionar la temporalidad en el desarrollo de software.
- **Desarrollo (80 minutos):**
  - **Conceptos Teóricos:**
    - Creación de instancias del objeto `Date`.
    - Métodos para obtener componentes de la fecha (año, mes, día, hora, minutos y segundos).
  - **Ejemplos Prácticos:**
    - Formateo de fechas: mostrar fechas en formatos legibles.
    - Cálculo de diferencias entre fechas (por ejemplo, cantidad de días entre dos fechas).
    - Ejemplos en vivo demostrando cómo manipular y comparar fechas.
  - **Casos de Uso:**
    - Validación de fechas en formularios y aplicaciones que requieren cálculos temporales.
- **Cierre (10 minutos):**
  - Resumen de los puntos clave y repaso de los métodos utilizados.
  - Sesión de preguntas y resolución de dudas.
- **Actividad Práctica – Agenda Digital (30 minutos):**
  - Desarrollar un programa que permita ingresar fechas, calcular la diferencia entre ellas y presentar la información en un formato legible.

---

### Filmina 3: Objetivos de la Clase
- **Objetivo General:**
  - Comprender el uso del objeto `Date` en JavaScript y aplicar sus métodos para el manejo y formateo de fechas y horas.
- **Metas Específicas:**
  - Crear instancias del objeto `Date` y obtener sus componentes (año, mes, día, etc.).
  - Realizar cálculos entre fechas y formatear la salida de la información.
  - Implementar validaciones y comparaciones temporales en aplicaciones.

---

### Filmina 4: Introducción a las Fechas y Horas
- **Pregunta Inicial:**
  - “¿Cómo podemos representar y trabajar con fechas y horas en nuestras aplicaciones?”
- **Importancia de la Gestión Temporal:**
  - Permite realizar validaciones en formularios, cálculos de plazos, recordatorios y más.
  - Fundamental para el desarrollo de aplicaciones dinámicas y basadas en eventos temporales.

---

### Filmina 5: Conceptos Teóricos – Creación del Objeto Date
- **Instanciación:**
  - Creación de un objeto `Date` con la fecha y hora actual:
    ```javascript
    let ahora = new Date();
    ```
  - Creación con una fecha específica:
    ```javascript
    let fechaEspecifica = new Date("2025-03-22T10:30:00");
    ```
- **Notas:**
  - Diferentes formatos de entrada y la importancia del estándar ISO 8601.
  - La fecha se maneja internamente en milisegundos desde el 1 de enero de 1970.

---

### Filmina 6: Métodos para Obtener Componentes de la Fecha
- **Métodos Clave:**
  - `getFullYear()`: Devuelve el año (ej. 2025).
  - `getMonth()`: Devuelve el mes (0-11, donde 0 es enero).
  - `getDate()`: Devuelve el día del mes.
  - `getHours()`, `getMinutes()`, `getSeconds()`: Devuelven la hora, minutos y segundos.
- **Ejemplo Práctico:**
  ```javascript
  let fecha = new Date();
  console.log("Año:", fecha.getFullYear());
  console.log("Mes:", fecha.getMonth() + 1); // Ajuste para mostrar 1-12
  console.log("Día:", fecha.getDate());
  console.log("Hora:", fecha.getHours());
  console.log("Minutos:", fecha.getMinutes());
  console.log("Segundos:", fecha.getSeconds());
  ```

---

### Filmina 7: Formateo de Fechas
- **Mostrar Fechas en Formatos Legibles:**
  - Métodos nativos y técnicas de formateo.
  - Ejemplo básico:
    ```javascript
    let fecha = new Date();
    let fechaFormateada = fecha.toLocaleDateString(); // Ej. "22/3/2025" según la configuración regional
    let horaFormateada = fecha.toLocaleTimeString();   // Ej. "10:30:00"
    console.log("Fecha:", fechaFormateada, "Hora:", horaFormateada);
    ```
- **Personalización:**
  - Uso de opciones en `toLocaleDateString` para definir formato:
    ```javascript
    let opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    console.log(fecha.toLocaleDateString('es-ES', opciones)); // Ej. "22 de marzo de 2025"
    ```

---

### Filmina 8: Cálculo de Diferencias entre Fechas
- **Método para Calcular Diferencias:**
  - Obtener la diferencia en milisegundos:
    ```javascript
    let fecha1 = new Date("2025-03-22");
    let fecha2 = new Date("2025-04-01");
    let diferenciaMs = fecha2 - fecha1;
    ```
  - Convertir milisegundos a días:
    ```javascript
    let diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);
    console.log("Diferencia en días:", diferenciaDias);
    ```
- **Aplicación Práctica:**
  - Cálculo de plazos, fechas de vencimiento y más.

---

### Filmina 9: Ejemplos Prácticos en Vivo
- **Manipulación y Comparación de Fechas:**
  - Ejemplo en vivo demostrando la creación de fechas, formateo y cálculo de diferencias.
  - Comparar fechas para validación (por ejemplo, verificar si una fecha ingresada es futura o pasada).

---

### Filmina 10: Casos de Uso y Validación
- **Validación en Formularios:**
  - Ejemplo de comprobación de fechas (edad mínima, fecha de eventos, etc.).
- **Aplicaciones:**
  - Sistemas de reservas, agendas, recordatorios y cualquier aplicación dependiente de la temporalidad.

---

### Filmina 11: Actividad Práctica – Agenda Digital
- **Nombre de la Actividad:** Agenda Digital
- **Duración:** 30 minutos
- **Descripción:**
  - Los estudiantes desarrollarán un programa en JavaScript que:
    - Permita ingresar dos fechas.
    - Calcule la diferencia en días entre ambas.
    - Presente la información en un formato legible (por ejemplo, “Faltan X días para el evento” o “El evento ocurrió hace X días”).
- **Puntos a Incluir:**
  - Creación de objetos `Date` a partir de entradas del usuario.
  - Uso de métodos para extraer componentes de fecha.
  - Cálculo y formateo de la diferencia entre fechas.
- **Dinámica:**
  - Trabajo individual o en parejas.
  - Compartir los resultados y discutir posibles mejoras o validaciones adicionales.

---

### Filmina 12: Cierre de la Clase
- **Resumen de Puntos Clave:**
  - Creación y manejo del objeto `Date`.
  - Métodos para obtener componentes y formatear fechas.
  - Cálculo de diferencias entre fechas y casos de uso en validaciones.
- **Preguntas y Respuestas:**
  - Espacio para resolver dudas y repasar ejemplos presentados.

---

### Filmina 13: Recursos y Bibliografía
- **Documentación Oficial:**
  - [MDN Web Docs – Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre manejo de fechas en JavaScript.
  - Blogs especializados en programación y desarrollo web.
- **Enlaces Recomendados:**
  - [JavaScript.info – Dates](https://javascript.info/date)
  - Recursos y ejemplos prácticos en plataformas como freeCodeCamp.

---

### Filmina 14: Consideraciones Finales
- **Aspectos a Reforzar:**
  - La importancia de la gestión correcta de fechas y horas en aplicaciones dinámicas.
  - La utilidad de los métodos del objeto `Date` para realizar cálculos y validaciones.
- **Próximos Pasos:**
  - Experimentar con más ejemplos y casos de uso.
  - Integrar la manipulación de fechas en proyectos reales y evaluar el impacto en la experiencia del usuario.

---

Esta estructura de filminas ofrece un marco completo para comprender y aplicar el manejo de fechas y horas en JavaScript, combinando teoría, ejemplos en vivo y una actividad práctica para que los estudiantes desarrollen sus habilidades en este aspecto fundamental del desarrollo web.