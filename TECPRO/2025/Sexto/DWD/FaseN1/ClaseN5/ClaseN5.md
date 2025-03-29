### Filmina 1: Portada
- **Título:** Funciones en PHP
- **Subtítulo:** Modularización y Reutilización de Código
- **Profesor:** Dardo Camaño
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Por qué es importante dividir nuestro código en funciones?”
  - Breve explicación sobre la modularización y sus ventajas.
- **Desarrollo (80 minutos):**
  - **Definición y Concepto de Función:**
    - ¿Qué es una función y cuál es su propósito en PHP?
    - Ventajas de reutilizar código a través de funciones.
  - **Sintaxis y Tipos de Funciones:**
    - Declaración de funciones: sintaxis, parámetros y retorno.
    - Funciones con parámetros opcionales y valores por defecto.
    - Funciones anónimas y su uso (closure).
  - **Ejemplos Prácticos:**
    - Creación de funciones para cálculos simples.
    - Ejemplos de procesamiento de cadenas y arrays mediante funciones.
    - Ejecución en vivo y depuración de funciones.
- **Cierre (10 minutos):**
  - Resumen de los conceptos clave.
  - Sesión de preguntas y respuestas.
- **Actividad Práctica (30 minutos):**
  - Desarrollo de un script PHP que contenga funciones reutilizables:
    - Una función para calcular el promedio de un arreglo.
    - Una función que formatee una cadena (ejemplo: capitalizar palabras).
    - Integración de varias funciones en un flujo de procesamiento de datos.

---

### Filmina 3: Objetivos de la Clase
- **Objetivo General:**
  - Dominar la creación y utilización de funciones en PHP para modularizar y optimizar el código en aplicaciones back-end.
- **Objetivos Específicos:**
  - Comprender la sintaxis básica de la declaración de funciones.
  - Aprender a definir y utilizar funciones con parámetros y valores de retorno.
  - Explorar el uso de funciones anónimas para crear código más flexible.
  - Aplicar funciones en casos prácticos relacionados con el procesamiento de arrays, cadenas y otros datos.

---

### Filmina 4: ¿Qué es una Función?
- **Definición:**
  - Una función es un bloque de código reutilizable que realiza una tarea específica.
- **Beneficios:**
  - Facilita la organización del código.
  - Permite evitar la duplicación y facilita el mantenimiento.
  - Mejora la legibilidad y modularidad del programa.
- **Ejemplo Conceptual:**
  - Dividir el proceso de validación de formularios en funciones específicas para reutilizar en distintos formularios.

---

### Filmina 5: Declaración de Funciones en PHP
- **Sintaxis Básica:**
  ```php
  function nombreDeLaFuncion($param1, $param2) {
      // Cuerpo de la función
      return $resultado;
  }
  ```
- **Explicación:**
  - La palabra clave `function` seguida del nombre.
  - Paréntesis para parámetros y llaves para delimitar el cuerpo.
- **Ejemplo Práctico:**
  ```php
  function sumar($a, $b) {
      return $a + $b;
  }
  echo sumar(5, 3); // Salida: 8
  ```

---

### Filmina 6: Parámetros, Valores por Defecto y Funciones Anónimas
- **Parámetros y Valores por Defecto:**
  ```php
  function saludar($nombre = "Invitado") {
      return "Hola, " . $nombre;
  }
  echo saludar();         // Salida: Hola, Invitado
  echo saludar("Ana");    // Salida: Hola, Ana
  ```
- **Funciones Anónimas (Closures):**
  ```php
  $multiplicar = function($x, $y) {
      return $x * $y;
  };
  echo $multiplicar(4, 5); // Salida: 20
  ```
- **Ventajas:**
  - Permiten asignar funciones a variables y pasar funciones como argumentos.

---

### Filmina 7: Ejemplos Prácticos – Procesamiento de Datos
- **Ejemplo 1: Cálculo de Promedio en un Arreglo**
  ```php
  function promedio($numeros) {
      $suma = 0;
      foreach ($numeros as $num) {
          $suma += $num;
      }
      return $suma / count($numeros);
  }
  $datos = [10, 20, 30, 40];
  echo "El promedio es: " . promedio($datos);
  ```
- **Ejemplo 2: Formateo de Cadenas**
  ```php
  function capitalizar($cadena) {
      return ucwords(strtolower($cadena));
  }
  echo capitalizar("hOlA mUnDo"); // Salida: Hola Mundo
  ```
- **Ejemplo 3: Uso de Funciones para Procesar Arrays**
  - Crear funciones que filtren o transformen datos de un array.

---

### Filmina 8: Demostración en Vivo
- **Ejercicio en Tiempo Real:**
  - Crear y ejecutar en vivo una función que combine procesamiento de datos y retorno de resultados.
  - Depurar paso a paso el código en el editor, mostrando el uso de `echo` para imprimir resultados.
- **Interacción:**
  - Preguntar a los estudiantes cómo podrían modularizar una tarea compleja en varias funciones.

---

### Filmina 9: Actividad Práctica – Creación de Funciones Reutilizables
- **Nombre de la Actividad:** Funciones Reutilizables
- **Duración:** 30 minutos
- **Descripción:**
  - Los estudiantes desarrollarán un script PHP que incluya:
    - Una función para calcular el promedio de un conjunto de números.
    - Una función que realice el formateo de cadenas.
    - Funciones adicionales para manipular arrays (por ejemplo, filtrar valores).
  - Se les invitará a integrar estas funciones en un flujo de procesamiento de datos, por ejemplo, validando datos de un formulario simulado.
- **Dinámica:**
  - Trabajo individual o en parejas.
  - Puesta en común y discusión de las diferentes implementaciones y optimizaciones.

---

### Filmina 10: Cierre y Preguntas
- **Resumen de la Clase:**
  - Repaso de la sintaxis y ventajas de utilizar funciones en PHP.
  - Diferentes tipos de funciones: declarativas, con parámetros, con valores por defecto y funciones anónimas.
  - Importancia de modularizar el código para facilitar el mantenimiento y la reutilización.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas sobre ejemplos y casos prácticos.
  - Discusión sobre aplicaciones prácticas en proyectos reales.

---

### Filmina 11: Recursos y Bibliografía
- **Documentación Oficial:**
  - [PHP Manual – Functions](https://www.php.net/manual/es/language.functions.php)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre funciones en PHP.
  - Ejercicios interactivos en plataformas como W3Schools y freeCodeCamp.
- **Enlaces Recomendados:**
  - [W3Schools – PHP Functions](https://www.w3schools.com/php/php_functions.asp)
  - Blogs y foros especializados en PHP y desarrollo back-end.

---
