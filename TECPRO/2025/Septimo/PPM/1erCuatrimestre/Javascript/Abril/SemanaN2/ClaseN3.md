### **Clase 3: Estructuras de control**

**Objetivo**  
Utilizar estructuras de control condicionales y de bucle para dirigir el flujo de ejecución de los programas y resolver problemas de lógica.

**Duración**  
2 horas.

**Estructura de la Clase**  

- **Introducción (10 minutos)**
  - Pregunta inicial: "¿Cómo podemos dirigir el flujo de ejecución de un programa y tomar decisiones en tiempo de ejecución?"
  - Introducción a la importancia de las estructuras de control en la lógica de programación.

- **Desarrollo (80 minutos)**
  - **Condicionales:**
    - Explicación de `if`, `else` y `switch`.
    - Ejemplos prácticos que muestren la toma de decisiones según condiciones.
  - **Bucles:**
    - Explicación y ejemplos de `for`, `while`, `for...of` y `for...in`.
    - Comparación de casos de uso: cuándo es preferible cada tipo de bucle.
  - Análisis de casos prácticos:
    - Iteración sobre arreglos.
    - Creación de programas sencillos que combinen condicionales y bucles.
  - Demostración en vivo de la ejecución de estructuras de control y cómo afectan el flujo del programa.

- **Cierre (10 minutos)**
  - Recapitulación de cuándo y cómo utilizar cada estructura.
  - Sesión de preguntas y respuestas para afianzar los conceptos.

**Actividad Práctica**  
- **Nombre:** Creación de un programa interactivo  
- **Duración:** 30 minutos  
- **Descripción:**  
  Los estudiantes desarrollarán una aplicación sencilla (por ejemplo, un juego de adivinanzas o un proceso de filtrado de datos) que haga uso intensivo de estructuras condicionales y bucles. Deberán probar diferentes escenarios y explicar sus elecciones de estructuras en cada caso.

----

A continuación se presenta un conjunto de filminas (slides) estructuradas profesionalmente para la **Clase 3: Estructuras de control** en JavaScript. La sesión tiene una duración de 2 horas e integra teoría, demostraciones en vivo y una actividad práctica denominada "Creación de un programa interactivo".

---

### Filmina 1: Portada
- **Título:** Clase 3: Estructuras de control
- **Subtítulo:** Condicionales y bucles para dirigir el flujo de ejecución
- **Instructor:** [Nombre del Instructor]
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos)**
  - Pregunta inicial: “¿Cómo podemos dirigir el flujo de ejecución de un programa y tomar decisiones en tiempo de ejecución?”
  - Importancia de las estructuras de control en la lógica de programación.
- **Desarrollo (80 minutos)**
  - **Condicionales:**
    - Explicación de `if`, `else` y `switch`.
    - Ejemplos prácticos de toma de decisiones según condiciones.
  - **Bucles:**
    - Explicación y ejemplos de `for`, `while`, `for...of` y `for...in`.
    - Comparación de casos de uso: cuándo es preferible cada tipo de bucle.
  - Análisis de casos prácticos:
    - Iteración sobre arreglos.
    - Creación de programas sencillos que combinen condicionales y bucles.
  - Demostración en vivo de la ejecución y flujo del programa.
- **Cierre (10 minutos)**
  - Recapitulación de cuándo y cómo utilizar cada estructura.
  - Sesión de preguntas y respuestas.
- **Actividad Práctica – Creación de un programa interactivo (30 minutos)**
  - Desarrollar una aplicación sencilla (por ejemplo, un juego de adivinanzas o un proceso de filtrado de datos) utilizando intensivamente estructuras condicionales y bucles.

---

### Filmina 3: Objetivos de la Clase
- **Objetivo General:**
  - Utilizar estructuras de control condicionales y de bucle para dirigir el flujo de ejecución de los programas y resolver problemas de lógica.
- **Metas Específicas:**
  - Comprender el uso de `if`, `else` y `switch` para la toma de decisiones.
  - Conocer y aplicar diferentes tipos de bucles (`for`, `while`, `for...of`, `for...in`).
  - Integrar condicionales y bucles en programas que procesen datos y manejen iteraciones.
  - Experimentar con casos prácticos y analizar la eficiencia de cada estructura.

---

### Filmina 4: Introducción a las Estructuras de Control
- **Pregunta Inicial:**
  - “¿Cómo podemos dirigir el flujo de ejecución de un programa y tomar decisiones en tiempo de ejecución?”
- **Importancia:**
  - Las estructuras de control permiten definir la lógica y el comportamiento de una aplicación.
  - Permiten ejecutar diferentes bloques de código en función de condiciones y repetir tareas de forma automatizada.
- **Ejemplo Conceptual:**
  - Decidir si un usuario tiene acceso a una funcionalidad o repetir una tarea hasta cumplir una condición.

---

### Filmina 5: Estructuras Condicionales – if, else y switch
- **if y else:**
  - Sintaxis básica:
    ```javascript
    if (condición) {
      // Bloque de código si la condición es verdadera
    } else {
      // Bloque de código si la condición es falsa
    }
    ```
  - Ejemplo:
    ```javascript
    let edad = 20;
    if (edad >= 18) {
      console.log("Eres mayor de edad");
    } else {
      console.log("Eres menor de edad");
    }
    ```
- **switch:**
  - Sintaxis básica:
    ```javascript
    switch (expresión) {
      case valor1:
        // Código
        break;
      case valor2:
        // Código
        break;
      default:
        // Código si no se cumple ningún caso
    }
    ```
  - Ejemplo:
    ```javascript
    let dia = "lunes";
    switch(dia) {
      case "lunes":
        console.log("Inicio de semana");
        break;
      case "viernes":
        console.log("Fin de semana");
        break;
      default:
        console.log("Día regular");
    }
    ```

---

### Filmina 6: Bucles – Introducción y for
- **Bucle for:**
  - Sintaxis:
    ```javascript
    for (inicialización; condición; incremento) {
      // Código a ejecutar en cada iteración
    }
    ```
  - Ejemplo:
    ```javascript
    for (let i = 0; i < 5; i++) {
      console.log("Iteración número:", i);
    }
    ```
- **Aplicación:**
  - Iterar sobre un arreglo y procesar cada elemento.

---

### Filmina 7: Bucles – while, for...of y for...in
- **Bucle while:**
  - Sintaxis:
    ```javascript
    while (condición) {
      // Código a ejecutar mientras la condición sea verdadera
    }
    ```
  - Ejemplo:
    ```javascript
    let i = 0;
    while (i < 5) {
      console.log("Iteración while:", i);
      i++;
    }
    ```
- **Bucle for...of:**
  - Ideal para iterar sobre arreglos y elementos iterables.
  - Ejemplo:
    ```javascript
    let frutas = ["manzana", "banana", "cereza"];
    for (let fruta of frutas) {
      console.log("Fruta:", fruta);
    }
    ```
- **Bucle for...in:**
  - Para iterar sobre las propiedades de un objeto.
  - Ejemplo:
    ```javascript
    let persona = { nombre: "Juan", edad: 30, ciudad: "Madrid" };
    for (let propiedad in persona) {
      console.log(propiedad, ":", persona[propiedad]);
    }
    ```

---

### Filmina 8: Casos Prácticos y Demostración en Vivo
- **Ejemplo Integrado:**
  - Iteración sobre un arreglo de números para filtrar aquellos que sean pares:
    ```javascript
    let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let pares = [];
    for (let num of numeros) {
      if (num % 2 === 0) {
        pares.push(num);
      }
    }
    console.log("Números pares:", pares);
    ```
- **Demostración:**
  - Ejecutar en vivo un programa que combine condicionales y bucles.
  - Explicar cómo se controla el flujo de ejecución en cada iteración y en la toma de decisiones.

---

### Filmina 9: Análisis y Comparación de Estructuras
- **Cuándo usar cada estructura:**
  - **if/else:** Ideal para condiciones simples y decisiones binarias.
  - **switch:** Útil cuando se tienen múltiples casos de evaluación.
  - **Bucle for vs. while:** For es preferible cuando se conoce el número de iteraciones; while para condiciones dinámicas.
  - **for...of y for...in:** For...of para arreglos; for...in para objetos.
- **Impacto en la eficiencia:**
  - Elegir la estructura correcta mejora la legibilidad y el rendimiento del código.

---

### Filmina 10: Cierre de la Sesión
- **Resumen de Conceptos Clave:**
  - Uso de condicionales (`if`, `else`, `switch`) para dirigir el flujo.
  - Diferentes tipos de bucles (`for`, `while`, `for...of`, `for...in`) y sus casos de uso.
  - Importancia de combinar estas estructuras para resolver problemas de lógica.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas y debatir sobre los ejemplos vistos.

---

### Filmina 11: Actividad Práctica – Creación de un Programa Interactivo
- **Nombre de la Actividad:** Creación de un programa interactivo
- **Duración:** 30 minutos
- **Descripción:**
  - Los estudiantes desarrollarán una aplicación sencilla, por ejemplo:
    - Un juego de adivinanzas en el que el usuario intente adivinar un número secreto.
    - Un proceso de filtrado de datos en el que se evalúen condiciones y se itere sobre un arreglo.
  - **Requisitos:**
    - Utilizar condicionales para evaluar la entrada del usuario.
    - Emplear bucles para permitir múltiples intentos o procesar una lista de datos.
    - Mostrar mensajes en la consola explicando el flujo del programa.
- **Dinámica:**
  - Trabajo individual o en parejas.
  - Compartir y discutir los resultados y elecciones de estructuras de control.

---

### Filmina 12: Recursos y Bibliografía
- **Documentación Oficial:**
  - [MDN Web Docs – Control de Flujo](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre estructuras de control en JavaScript.
  - Ejercicios prácticos en plataformas como freeCodeCamp y JavaScript.info.
- **Enlaces Recomendados:**
  - [JavaScript.info – Loops](https://javascript.info/while-for)
  - Blogs y foros especializados en programación para profundizar en casos de uso.

---

### Filmina 13: Consideraciones Finales
- **Aspectos a Reforzar:**
  - La correcta elección de estructuras de control mejora la lógica y eficiencia del programa.
  - Practicar distintos escenarios ayuda a identificar el mejor enfoque para cada problema.
- **Próximos Pasos:**
  - Experimentar con más ejercicios y casos reales.
  - Integrar estas estructuras en proyectos para fortalecer la lógica de programación.

---

Esta estructura de filminas ofrece un marco completo para comprender y aplicar estructuras de control en JavaScript, combinando teoría, demostraciones en vivo y una actividad práctica que permita a los estudiantes resolver problemas lógicos de manera efectiva y modular.
