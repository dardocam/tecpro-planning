### Filmina 1: Portada
- **Título:** Estructuras de Repetición – Bucles en PHP
- **Subtítulo:** Automatizando tareas y procesando datos de manera iterativa
- **Profesor:** Dardo Camaño
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Cómo podemos repetir una acción automáticamente sin duplicar código?”
  - Breve introducción sobre la importancia de los bucles en la automatización y procesamiento de datos.
- **Desarrollo (80 minutos):**
  - **Tipos de Bucles en PHP:**
    - `for`: Uso y sintaxis.
    - `while` y `do...while`: Diferencias y ejemplos.
    - `foreach`: Iteración sobre arrays y objetos.
  - **Ejemplos Prácticos:**
    - Iteración sobre un arreglo.
    - Uso de bucles para procesar datos y realizar cálculos (por ejemplo, sumar elementos de un array).
  - **Consideraciones:**
    - Control de la condición y evitar bucles infinitos.
    - Uso adecuado de break y continue.
- **Cierre (10 minutos):**
  - Resumen de los conceptos clave.
  - Sesión de preguntas y respuestas.
- **Actividad Práctica (30 minutos):**
  - Desarrollar un script PHP que utilice diferentes tipos de bucles para:
    - Recorrer y mostrar datos de un arreglo.
    - Realizar operaciones como acumulación, conteo o búsqueda.
  - Comparar el uso de `for`, `while` y `foreach` en distintos escenarios.

---

### Filmina 3: Objetivos de la Clase
- **Objetivo General:**
  - Dominar el uso de las estructuras de repetición (bucles) en PHP para automatizar tareas y procesar datos de manera eficiente.
- **Objetivos Específicos:**
  - Conocer la sintaxis y funcionamiento de los bucles `for`, `while`, `do...while` y `foreach`.
  - Aplicar bucles para iterar sobre arreglos y ejecutar tareas repetitivas.
  - Identificar situaciones de uso óptimas para cada tipo de bucle.
  - Prevenir errores comunes, como bucles infinitos, mediante un control adecuado de condiciones.

---

### Filmina 4: Introducción a los Bucles en PHP
- **¿Por qué utilizar bucles?**
  - Permiten ejecutar el mismo bloque de código múltiples veces sin redundancia.
  - Son esenciales para procesar colecciones de datos y automatizar tareas.
- **Ejemplo Conceptual:**
  - Imagina que necesitas imprimir los números del 1 al 10 sin escribir 10 líneas de código. ¡Los bucles son la solución!

---

### Filmina 5: Bucle for
- **Sintaxis Básica:**
  ```php
  for ($i = 0; $i < 10; $i++) {
      echo "Número: " . $i . "<br>";
  }
  ```
- **Características:**
  - Ideal cuando se conoce el número exacto de iteraciones.
  - Control total sobre la variable de iteración.
- **Ejemplo Práctico:**
  - Iterar y mostrar elementos de un arreglo numérico.

---

### Filmina 6: Bucle while y do...while
- **Bucle while:**
  ```php
  $i = 0;
  while ($i < 10) {
      echo "Iteración while: " . $i . "<br>";
      $i++;
  }
  ```
  - Evalúa la condición antes de ejecutar el bloque.
- **Bucle do...while:**
  ```php
  $i = 0;
  do {
      echo "Iteración do...while: " . $i . "<br>";
      $i++;
  } while ($i < 10);
  ```
  - Ejecuta el bloque al menos una vez, evaluando la condición después.
- **Comparación:**
  - `while` puede no ejecutarse si la condición es falsa desde el inicio; `do...while` se garantiza al menos una ejecución.

---

### Filmina 7: Bucle foreach
- **Sintaxis Básica:**
  ```php
  $frutas = ["manzana", "banana", "cereza"];
  foreach ($frutas as $fruta) {
      echo "Fruta: " . $fruta . "<br>";
  }
  ```
- **Características:**
  - Ideal para recorrer arrays y objetos.
  - Sencillo y legible, sin necesidad de gestionar un contador.
- **Ejemplo Práctico:**
  - Mostrar cada elemento de un arreglo asociativo:
  ```php
  $persona = [
      "nombre" => "Carlos",
      "edad" => 28,
      "ciudad" => "Madrid"
  ];
  foreach ($persona as $clave => $valor) {
      echo $clave . ": " . $valor . "<br>";
  }
  ```

---

### Filmina 8: Control de Bucles – break y continue
- **break:**
  - Finaliza la ejecución del bucle.
  - Ejemplo: Salir de un bucle al encontrar un valor específico.
- **continue:**
  - Omite la iteración actual y continúa con la siguiente.
  - Ejemplo: Saltar elementos que no cumplen una condición.
- **Ejemplo Práctico:**
  ```php
  for ($i = 0; $i < 10; $i++) {
      if ($i == 5) {
          continue; // Salta el número 5
      }
      echo "Número: " . $i . "<br>";
  }
  ```

---

### Filmina 9: Ejercicios Prácticos en Vivo
- **Demostración:**
  - Crear un script que:
    - Use un bucle `for` para sumar los números de un arreglo.
    - Use `foreach` para mostrar una lista de nombres.
    - Combine `while` con condiciones para controlar la repetición.
- **Interacción:**
  - Invitar a estudiantes a modificar el código en tiempo real y observar cambios en la salida.

---

### Filmina 10: Actividad Práctica – Creación de un Programa Reutilizable
- **Nombre de la Actividad:** Procesamiento de Datos con Bucles
- **Duración:** 30 minutos
- **Descripción:**
  - Los estudiantes desarrollarán un script PHP que realice lo siguiente:
    - Reciba un arreglo de números.
    - Utilice un bucle para calcular el promedio.
    - Use un bucle `foreach` para mostrar cada número y su índice.
    - Incorpore condiciones (con `if` o `switch`) para resaltar números pares o impares.
  - Se evaluará la correcta aplicación de cada tipo de bucle y el manejo de condiciones.
- **Dinámica:**
  - Trabajo individual o en parejas.
  - Presentación de soluciones y discusión sobre estrategias de optimización.

---

### Filmina 11: Cierre y Preguntas
- **Resumen de Conceptos:**
  - Repaso de la sintaxis y aplicaciones de `for`, `while`, `do...while` y `foreach`.
  - Importancia de utilizar `break` y `continue` para controlar el flujo.
  - Cómo los bucles facilitan la automatización y procesamiento de datos en PHP.
- **Sesión de Preguntas:**
  - Espacio para aclarar dudas, repasar ejemplos y discutir casos prácticos.

---

### Filmina 12: Recursos y Bibliografía
- **Documentación Oficial:**
  - [PHP Manual – Bucles](https://www.php.net/manual/es/control-structures.for.php)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre estructuras de repetición en PHP.
  - Ejercicios interactivos en sitios como W3Schools y freeCodeCamp.
- **Enlaces Recomendados:**
  - [W3Schools – PHP Loops](https://www.w3schools.com/php/php_looping.asp)
  - Blogs especializados en PHP y desarrollo back-end.

---
