### **Clase 2: Arreglos**

**Objetivo**  
Dominar el uso de arreglos y sus métodos comunes para la manipulación y transformación de datos en JavaScript.

**Duración**  
2 horas.

**Estructura de la Clase**  

- **Introducción (10 minutos)**
  - Pregunta inicial: "¿Cómo organizarías y procesarías conjuntos de datos en una aplicación?"
  - Introducción sobre la importancia de los arreglos para gestionar colecciones de datos.

- **Desarrollo (80 minutos)**
  - **Conceptos Teóricos:**
    - Creación, acceso y modificación de elementos en un arreglo.
  - **Métodos Comunes:**
    - Explicación detallada y ejemplos de `map`, `filter`, `reduce`, `find`, `forEach`, `some` y `every`.
    - Comparación de casos de uso de cada método y su impacto en la eficiencia del código.
  - **Ejercicios Prácticos:**
    - Demostración en vivo de la transformación de un arreglo con diferentes métodos.
    - Resolución de problemas comunes, como filtrar elementos o acumular valores.

- **Cierre (10 minutos)**
  - Recapitulación de los conceptos aprendidos.
  - Sesión de preguntas y respuestas.

**Actividad Práctica**  
- **Nombre:** Procesamiento de Datos  
- **Duración:** 30 minutos  
- **Descripción:**  
  Los estudiantes crearán un arreglo que contenga información de usuarios y aplicarán los métodos vistos para transformar, filtrar y extraer información relevante, comprobando los resultados mediante la consola.

---

A continuación se presenta un conjunto de filminas (slides) estructuradas profesionalmente para la **Clase 2: Arreglos** en JavaScript. La sesión tiene una duración de 2 horas e integra una introducción, desarrollo teórico-práctico, cierre y una actividad práctica llamada "Procesamiento de Datos".

---

### Filmina 1: Portada
- **Título:** Clase 2: Arreglos en JavaScript
- **Subtítulo:** Manipulación y transformación de datos con métodos comunes
- **Instructor:** [Nombre del Instructor]
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos)**
  - Pregunta inicial: "¿Cómo organizarías y procesarías conjuntos de datos en una aplicación?"
  - Importancia de los arreglos para gestionar colecciones de datos.
- **Desarrollo (80 minutos)**
  - **Conceptos Teóricos:**
    - Creación, acceso y modificación de elementos en un arreglo.
  - **Métodos Comunes:**
    - Explicación y ejemplos de: `map`, `filter`, `reduce`, `find`, `forEach`, `some` y `every`.
    - Comparación de casos de uso y su impacto en la eficiencia del código.
  - **Ejercicios Prácticos:**
    - Demostración en vivo de la transformación de un arreglo con los métodos vistos.
    - Resolución de problemas comunes (filtrar elementos, acumular valores, etc.).
- **Cierre (10 minutos)**
  - Recapitulación de los conceptos aprendidos.
  - Sesión de preguntas y respuestas.
- **Actividad Práctica – Procesamiento de Datos (30 minutos)**
  - Creación de un arreglo con información de usuarios.
  - Aplicación de los métodos para transformar, filtrar y extraer información relevante.
  - Verificación de resultados mediante la consola.

---

### Filmina 3: Objetivos de la Clase
- **Objetivo Principal:**
  - Dominar el uso de arreglos y sus métodos comunes para la manipulación y transformación de datos en JavaScript.
- **Metas Específicas:**
  - Aprender a crear, acceder y modificar elementos de un arreglo.
  - Conocer y aplicar métodos como `map`, `filter`, `reduce`, `find`, `forEach`, `some` y `every`.
  - Desarrollar habilidades para organizar y procesar conjuntos de datos de manera eficiente.

---

### Filmina 4: Introducción a los Arreglos
- **Pregunta Inicial:**
  - “¿Cómo organizarías y procesarías conjuntos de datos en una aplicación?”
- **Importancia de los Arreglos:**
  - Estructuras de datos que permiten almacenar colecciones de elementos.
  - Facilitan el manejo de datos relacionados y operaciones sobre colecciones.
- **Ejemplo Conceptual:**
  - Un arreglo de usuarios, productos o cualquier conjunto de información que requiera procesamiento.

---

### Filmina 5: Conceptos Teóricos – Creación y Acceso
- **Creación de Arreglos:**
  - Notación literal:  
    ```javascript
    let numeros = [1, 2, 3, 4, 5];
    ```
  - Uso del constructor:  
    ```javascript
    let frutas = new Array("Manzana", "Banana", "Cereza");
    ```
- **Acceso y Modificación:**
  - Acceder a un elemento: `frutas[1]` (accede a "Banana").
  - Modificar un elemento: `frutas[2] = "Naranja";`.

---

### Filmina 6: Métodos Comunes – Parte 1
- **forEach:**
  - Itera sobre cada elemento del arreglo.
  - Ejemplo:
    ```javascript
    frutas.forEach(function(fruta) {
      console.log(fruta);
    });
    ```
- **map:**
  - Crea un nuevo arreglo transformando cada elemento.
  - Ejemplo:
    ```javascript
    let numerosDoblados = numeros.map(num => num * 2);
    console.log(numerosDoblados); // [2, 4, 6, 8, 10]
    ```
- **filter:**
  - Devuelve un nuevo arreglo con los elementos que cumplan una condición.
  - Ejemplo:
    ```javascript
    let numerosPares = numeros.filter(num => num % 2 === 0);
    console.log(numerosPares); // [2, 4]
    ```

---

### Filmina 7: Métodos Comunes – Parte 2
- **reduce:**
  - Acumula todos los valores del arreglo en uno solo.
  - Ejemplo:
    ```javascript
    let sumaTotal = numeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    console.log(sumaTotal); // 15
    ```
- **find:**
  - Retorna el primer elemento que cumpla la condición.
  - Ejemplo:
    ```javascript
    let frutaEncontrada = frutas.find(fruta => fruta === "Banana");
    console.log(frutaEncontrada);
    ```
- **some & every:**
  - **some:** Comprueba si al menos un elemento cumple la condición.
    ```javascript
    let hayNegativos = numeros.some(num => num < 0);
    console.log(hayNegativos); // false
    ```
  - **every:** Comprueba si todos los elementos cumplen la condición.
    ```javascript
    let todosPositivos = numeros.every(num => num > 0);
    console.log(todosPositivos); // true
    ```

---

### Filmina 8: Ejercicios Prácticos en Vivo
- **Demostración:**
  - Crear un arreglo de objetos, por ejemplo, una lista de estudiantes.
  - Aplicar `map` para transformar la lista (e.g., convertir nombres a mayúsculas).
  - Usar `filter` para seleccionar estudiantes que cumplen una condición.
  - Emplear `reduce` para sumar calificaciones.
  - Mostrar resultados en la consola.
- **Código de Ejemplo:**
  ```javascript
  let estudiantes = [
    { nombre: "Ana", calificacion: 85 },
    { nombre: "Luis", calificacion: 92 },
    { nombre: "Marta", calificacion: 78 },
    { nombre: "Carlos", calificacion: 90 }
  ];

  // Transformar nombres a mayúsculas
  let nombresMayuscula = estudiantes.map(est => est.nombre.toUpperCase());
  console.log("Nombres en mayúscula:", nombresMayuscula);

  // Filtrar estudiantes con calificación mayor a 80
  let aprobados = estudiantes.filter(est => est.calificacion > 80);
  console.log("Estudiantes aprobados:", aprobados);

  // Sumar todas las calificaciones
  let sumaCalificaciones = estudiantes.reduce((total, est) => total + est.calificacion, 0);
  console.log("Suma total de calificaciones:", sumaCalificaciones);
  ```

---

### Filmina 9: Cierre de la Sesión
- **Resumen de Conceptos:**
  - Creación, acceso y modificación de arreglos.
  - Uso de métodos como `map`, `filter`, `reduce`, `find`, `forEach`, `some` y `every`.
  - Importancia de elegir el método adecuado según el problema a resolver.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas y discutir ejemplos vistos en la clase.
  - Retroalimentación sobre los ejercicios prácticos presentados.

---

### Filmina 10: Actividad Práctica – Procesamiento de Datos
- **Nombre de la Actividad:** Procesamiento de Datos
- **Duración:** 30 minutos
- **Descripción:**
  - **Objetivo:** Crear un arreglo que contenga información de usuarios (por ejemplo, nombre, edad, ciudad) y aplicar los métodos aprendidos.
  - **Tareas:**
    - Declarar un arreglo de objetos con datos de usuarios.
    - Utilizar `map` para transformar los nombres.
    - Aplicar `filter` para seleccionar usuarios mayores de cierta edad.
    - Usar `reduce` para calcular la suma total de edades o algún otro dato relevante.
    - Verificar y mostrar los resultados en la consola.
- **Ejemplo Inicial:**
  ```javascript
  let usuarios = [
    { nombre: "Ana", edad: 25, ciudad: "Madrid" },
    { nombre: "Luis", edad: 30, ciudad: "Barcelona" },
    { nombre: "Marta", edad: 22, ciudad: "Valencia" },
    { nombre: "Carlos", edad: 28, ciudad: "Sevilla" }
  ];
  
  // Ejemplo de uso de métodos aquí
  ```

---

### Filmina 11: Recursos y Bibliografía
- **Documentación Oficial:**
  - [MDN Web Docs – Arrays](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube y freeCodeCamp sobre métodos de arreglos.
  - Blogs y foros especializados en JavaScript.
- **Enlaces Recomendados:**
  - [JavaScript.info – Arrays](https://javascript.info/array-methods)

---

### Filmina 12: Consideraciones Finales
- **Puntos a Reforzar:**
  - La versatilidad de los arreglos para gestionar colecciones de datos.
  - La importancia de los métodos integrados para transformar y filtrar datos de manera eficiente.
- **Próximos Pasos:**
  - Experimentar con ejercicios adicionales.
  - Aplicar estos métodos en proyectos reales para fortalecer la comprensión.

---

Esta estructura de filminas ofrece una visión completa sobre el uso de arreglos en JavaScript, combinando teoría, ejemplos en vivo y una actividad práctica para que los estudiantes dominen las técnicas de manipulación y transformación de datos.