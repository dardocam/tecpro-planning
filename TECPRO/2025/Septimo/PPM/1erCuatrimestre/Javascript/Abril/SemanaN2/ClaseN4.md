### **Clase 4: Funciones**

**Objetivo**  
Crear y utilizar funciones en JavaScript, diferenciando entre declaración y expresión, y explorar el uso de funciones flecha para escribir código más conciso.

**Duración**  
2 horas.

**Estructura de la Clase**  

- **Introducción (10 minutos)**
  - Pregunta inicial: "¿Por qué es importante modularizar el código mediante funciones?"
  - Breve introducción a la reutilización de código y la reducción de la duplicidad.

- **Desarrollo (80 minutos)**
  - **Declaración de funciones:**  
    - Sintaxis básica, parámetros y retorno de valores.
    - Ejemplos prácticos de funciones tradicionales.
  - **Expresión de funciones:**  
    - Diferencias con la declaración, funciones anónimas.
  - **Funciones flecha (`=>`):**
    - Sintaxis simplificada y casos de uso.
    - Ejemplos comparativos entre funciones tradicionales y flecha.
  - Discusión sobre el ámbito de las variables dentro de las funciones y el concepto de "hoisting" en funciones.
  - Ejecución de código en vivo para demostrar la modularización y reutilización de funciones en distintos escenarios.

- **Cierre (10 minutos)**
  - Resumen de la importancia de las funciones en la organización del código.
  - Sesión de preguntas y respuestas para clarificar dudas.

**Actividad Práctica**  
- **Nombre:** Creación de funciones reutilizables  
- **Duración:** 30 minutos  
- **Descripción:**  
  Los estudiantes deberán desarrollar una serie de funciones que realicen tareas específicas (por ejemplo, cálculos, procesamiento de arreglos o formateo de cadenas). Se les pedirá definir funciones mediante declaración, expresión y función flecha, y compararán sus implementaciones y resultados en un entorno de desarrollo.

---

A continuación se presenta un conjunto de filminas (slides) estructuradas profesionalmente para la **Clase 4: Funciones** en JavaScript. La sesión tiene una duración de 2 horas e integra una introducción, desarrollo teórico-práctico, cierre y una actividad práctica denominada "Creación de funciones reutilizables".

---

### Filmina 1: Portada
- **Título:** Clase 4: Funciones en JavaScript
- **Subtítulo:** Declaración, Expresión y Funciones Flecha para código modular
- **Instructor:** [Nombre del Instructor]
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Por qué es importante modularizar el código mediante funciones?”
  - Breve introducción sobre la reutilización de código y reducción de duplicidad.
- **Desarrollo (80 minutos):**
  - **Declaración de funciones:**
    - Sintaxis básica, parámetros y retorno de valores.
    - Ejemplos prácticos de funciones tradicionales.
  - **Expresión de funciones:**
    - Diferencias con la declaración y funciones anónimas.
  - **Funciones flecha (`=>`):**
    - Sintaxis simplificada y casos de uso.
    - Ejemplos comparativos entre funciones tradicionales y flecha.
  - Discusión sobre el ámbito de las variables y el concepto de "hoisting" en funciones.
  - Ejecución de código en vivo demostrando la modularización y reutilización en distintos escenarios.
- **Cierre (10 minutos):**
  - Resumen de la importancia de las funciones en la organización del código.
  - Sesión de preguntas y respuestas.
- **Actividad Práctica – Creación de funciones reutilizables (30 minutos):**
  - Desarrollo de funciones que realicen tareas específicas (cálculos, procesamiento de arreglos o formateo de cadenas) utilizando declaración, expresión y funciones flecha.
  - Comparación de implementaciones y resultados en un entorno de desarrollo.

---

### Filmina 3: Objetivos de la Clase
- **Objetivo General:**
  - Crear y utilizar funciones en JavaScript para modularizar y reutilizar código.
- **Objetivos Específicos:**
  - Diferenciar entre declaración de funciones y expresión de funciones.
  - Explorar y aplicar funciones flecha para escribir código más conciso.
  - Entender el ámbito de las variables dentro de las funciones y el concepto de hoisting.
  - Demostrar la aplicación práctica de funciones en distintos escenarios de programación.

---

### Filmina 4: Introducción a la Modularización con Funciones
- **Pregunta Inicial:**
  - “¿Por qué es importante modularizar el código mediante funciones?”
- **Importancia:**
  - Favorece la reutilización y mantenimiento del código.
  - Reduce la duplicidad y mejora la legibilidad.
  - Permite separar tareas específicas y resolver problemas de manera más organizada.
- **Ejemplo Conceptual:**
  - Dividir un proceso complejo en pequeños bloques de funciones reutilizables.

---

### Filmina 5: Declaración de Funciones
- **Sintaxis Básica:**
  - Definición de una función tradicional:
    ```javascript
    function sumar(a, b) {
      return a + b;
    }
    ```
- **Características:**
  - Puede ser llamada antes de su definición gracias al hoisting.
  - Permite definir parámetros y retornar valores.
- **Ejemplo Práctico:**
  - Llamada a la función:
    ```javascript
    let resultado = sumar(3, 4);
    console.log("La suma es:", resultado);
    ```

---

### Filmina 6: Expresión de Funciones
- **Definición:**
  - Las funciones se asignan a una variable, a menudo anónimas:
    ```javascript
    const restar = function(a, b) {
      return a - b;
    };
    ```
- **Diferencias con la declaración:**
  - No se benefician del hoisting; deben definirse antes de ser llamadas.
  - Permiten crear funciones de forma más flexible.
- **Ejemplo Práctico:**
  - Uso de la función de resta:
    ```javascript
    let diferencia = restar(10, 4);
    console.log("La diferencia es:", diferencia);
    ```

---

### Filmina 7: Funciones Flecha
- **Sintaxis Simplificada:**
  - Uso de la flecha (`=>`) para definir funciones de forma concisa:
    ```javascript
    const multiplicar = (a, b) => a * b;
    ```
- **Ventajas:**
  - Código más corto y legible.
  - No vinculan su propio `this`, lo que facilita el manejo del contexto.
- **Comparativa:**
  - Función tradicional vs. función flecha:
    ```javascript
    // Tradicional
    function dividir(a, b) {
      return a / b;
    }
    // Flecha
    const dividirFlecha = (a, b) => a / b;
    ```
- **Ejemplo Práctico:**
  - Uso en la consola:
    ```javascript
    console.log("División:", dividirFlecha(20, 4));
    ```

---

### Filmina 8: Ámbito de Variables y Hoisting en Funciones
- **Ámbito de Variables:**
  - Variables definidas dentro de una función no son accesibles fuera de ella.
  - Ejemplo:
    ```javascript
    function ejemplo() {
      let mensaje = "Hola desde la función";
      console.log(mensaje);
    }
    // console.log(mensaje); // Error: mensaje no está definido
    ```
- **Hoisting:**
  - Las declaraciones de funciones tradicionales se elevan al inicio del contexto.
  - No ocurre con expresiones de funciones o funciones flecha.
- **Discusión:**
  - Cómo el hoisting puede afectar la organización del código y su depuración.

---

### Filmina 9: Ejecución de Código en Vivo
- **Demostración en Vivo:**
  - Crear una función que reciba un arreglo de números y devuelva su promedio.
  - Mostrar versiones utilizando declaración, expresión y función flecha.
- **Código de Ejemplo:**
  ```javascript
  // Declaración de función
  function promedioDeclaracion(numeros) {
    let suma = 0;
    numeros.forEach(num => suma += num);
    return suma / numeros.length;
  }
  
  // Expresión de función
  const promedioExpresion = function(numeros) {
    let suma = 0;
    numeros.forEach(num => suma += num);
    return suma / numeros.length;
  };
  
  // Función flecha
  const promedioFlecha = numeros => {
    let suma = 0;
    numeros.forEach(num => suma += num);
    return suma / numeros.length;
  };
  
  let nums = [10, 20, 30, 40];
  console.log("Promedio (Declaración):", promedioDeclaracion(nums));
  console.log("Promedio (Expresión):", promedioExpresion(nums));
  console.log("Promedio (Flecha):", promedioFlecha(nums));
  ```
- **Análisis:**
  - Comparar sintaxis, legibilidad y comportamiento.
  - Discusión sobre cuándo utilizar cada enfoque.

---

### Filmina 10: Cierre de la Sesión
- **Resumen de Puntos Clave:**
  - Diferencias entre declaración, expresión y funciones flecha.
  - Importancia del hoisting y del ámbito de variables.
  - Cómo la modularización mejora la organización y reutilización del código.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas y discutir ejemplos vistos.

---

### Filmina 11: Actividad Práctica – Creación de Funciones Reutilizables
- **Nombre de la Actividad:** Creación de funciones reutilizables
- **Duración:** 30 minutos
- **Descripción:**
  - Los estudiantes deberán desarrollar una serie de funciones que realicen tareas específicas, por ejemplo:
    - Calcular el área de un círculo.
    - Procesar un arreglo de números (por ejemplo, filtrar números pares y calcular su suma).
    - Formatear una cadena de texto (capitalizar la primera letra de cada palabra).
  - Deberán definir estas funciones utilizando:
    - **Declaración de funciones**
    - **Expresión de funciones**
    - **Funciones flecha**
  - Luego, compararán sus implementaciones y resultados en el entorno de desarrollo.
- **Puntos a Evaluar:**
  - Correcta modularización del código.
  - Eficiencia y claridad en la implementación.
  - Manejo adecuado de parámetros y retorno de valores.

---

### Filmina 12: Recursos y Bibliografía
- **Documentación Oficial:**
  - [MDN Web Docs – Functions](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en plataformas como freeCodeCamp y YouTube.
  - Blogs y foros especializados en JavaScript.
- **Enlaces Recomendados:**
  - [JavaScript.info – Functions](https://javascript.info/function-basics)
  - Ejemplos de código en GitHub y CodePen.

---

### Filmina 13: Consideraciones Finales
- **Aspectos a Reforzar:**
  - La importancia de usar funciones para reducir la duplicidad y mejorar la mantenibilidad.
  - Diferencias sintácticas y prácticas entre los distintos tipos de funciones.
- **Próximos Pasos:**
  - Practicar más ejercicios y aplicar funciones en proyectos reales.
  - Investigar patrones de diseño y mejores prácticas en la reutilización de código.

---

Esta estructura de filminas proporciona un marco completo para que los estudiantes comprendan, implementen y comparen funciones en JavaScript, desarrollando habilidades esenciales para la modularización y reutilización de código en aplicaciones modernas.