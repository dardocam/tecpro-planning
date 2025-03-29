### Filmina 1: Portada
- **Título:** Clase 2: Fundamentos de PHP: Sintaxis, Variables y Operadores
- **Subtítulo:** Introducción a la sintaxis básica y manejo de datos en PHP
- **Profesor:** Dardo Camaño

---

### Filmina 2: Agenda de la Clase
- **Temas a Tratar:**
  - Etiquetas PHP: Apertura y cierre de código.
  - Declaración y tipos de variables en PHP.
  - Operadores básicos: aritméticos, de asignación y de comparación.
  - Salida de información: Uso de **echo** y **print**.
- **Actividades:**
  - Ejercicios prácticos de asignación y manipulación de variables.
  - Prácticas en vivo para demostrar el uso de operadores y funciones de salida.

---

### Filmina 3: Objetivos de la Clase
- Comprender el uso correcto de las etiquetas PHP y la estructura básica del código.
- Aprender a declarar variables y reconocer sus tipos (números, cadenas, booleanos, etc.).
- Conocer y aplicar operadores básicos para realizar cálculos y comparaciones.
- Practicar la salida de información mediante **echo** y **print** para depurar y mostrar resultados.

---

### Filmina 4: Introducción a las Etiquetas PHP
- **Etiquetas de Apertura y Cierre:**
  - Código PHP se delimita con `<?php ... ?>`.
  - Uso de etiquetas cortas (según configuración del servidor) pero se recomienda la forma completa.
- **Buenas Prácticas:**
  - Separar el código PHP del HTML para mantener la legibilidad.
  - Usar la etiqueta completa para asegurar la compatibilidad.

---

### Filmina 5: Declaración de Variables en PHP
- **Sintaxis Básica:**
  - Las variables se definen con el signo `$` seguido del nombre.
  - Ejemplo:
    ```php
    <?php
      $numero = 42;
      $texto = "Hola Mundo";
      $esValido = true;
    ?>
    ```
- **Tipos de Variables:**
  - **Numéricas:** Enteros y flotantes.
  - **Cadenas (Strings):** Textos.
  - **Booleanos:** Valores `true` o `false`.
  - Otros tipos (Arrays, Objetos, etc.) se abordarán en clases futuras.

---

### Filmina 6: Operadores Básicos en PHP
- **Operadores Aritméticos:**
  - Suma (`+`), Resta (`-`), Multiplicación (`*`), División (`/`), Módulo (`%`).
  - Ejemplo:  
    ```php
    $resultado = 10 + 5;  // 15
    ```
- **Operadores de Asignación:**
  - Asignación simple (`=`) y compuestos (`+=`, `-=`, `*=`, `/=`).
  - Ejemplo:  
    ```php
    $contador = 5;
    $contador += 2;  // Ahora $contador es 7
    ```
- **Operadores de Comparación:**
  - Igualdad (`==`), idéntico (`===`), diferente (`!=`), mayor (`>`), menor (`<`).
  - Usados en condiciones y estructuras de control.

---

### Filmina 7: Salida de Información: echo y print
- **echo:**
  - Imprime uno o más valores.
  - No devuelve un valor.
  - Ejemplo:
    ```php
    <?php
      echo "¡Bienvenidos a PHP!";
    ?>
    ```
- **print:**
  - Similar a echo, pero retorna un valor (siendo útil en expresiones).
  - Solo acepta un argumento.
  - Ejemplo:
    ```php
    <?php
      print "Ejemplo de print.";
    ?>
    ```
- **Comparativa:**
  - Ambos se usan para mostrar información, con **echo** siendo ligeramente más rápido y flexible en la impresión de múltiples argumentos.

---

### Filmina 8: Ejemplos Prácticos en Vivo
- **Ejemplo de Declaración y Operación:**
  ```php
  <?php
    // Declaración de variables
    $a = 8;
    $b = 12;
    $suma = $a + $b;
    
    // Salida de la operación
    echo "La suma de $a y $b es: " . $suma;
  ?>
  ```
- **Ejemplo de Concatenación de Cadenas:**
  ```php
  <?php
    $saludo = "Hola";
    $nombre = "Mundo";
    print $saludo . " " . $nombre;
  ?>
  ```

---

### Filmina 9: Actividad Práctica – Asignación y Manipulación de Variables
- **Objetivo de la Actividad:**
  - Practicar la declaración de variables y la utilización de operadores para manipular datos.
- **Instrucciones:**
  - Crear un archivo PHP (por ejemplo, `practica.php`).
  - Declarar variables de distintos tipos (números, cadenas y booleanos).
  - Realizar operaciones aritméticas y concatenaciones.
  - Utilizar **echo** y **print** para mostrar los resultados.
- **Dinámica:**
  - Trabajo individual o en parejas.
  - Posterior discusión de resultados y análisis de errores comunes.

---

### Filmina 10: Revisión y Preguntas
- **Resumen de Conceptos Clave:**
  - Uso correcto de las etiquetas PHP.
  - Declaración y manejo de variables.
  - Aplicación de operadores básicos.
  - Diferencias entre **echo** y **print**.
- **Espacio para Preguntas:**
  - Aclaración de dudas y revisión de ejemplos prácticos.
  - Debate sobre casos de uso y mejores prácticas en la sintaxis PHP.

---

### Filmina 11: Recursos y Bibliografía
- **Documentación Oficial:**
  - [PHP Manual en español](https://www.php.net/manual/es/)
- **Tutoriales y Ejercicios:**
  - [W3Schools PHP Tutorial](https://www.w3schools.com/php/)
  - Videos y cursos introductorios en YouTube y freeCodeCamp.
- **Enlaces Recomendados:**
  - Blogs y foros especializados en PHP para ampliar el conocimiento.

---

### Filmina 12: Consideraciones Finales
- **Aspectos a Reforzar:**
  - La importancia de seguir la sintaxis correcta para evitar errores.
  - La práctica constante para dominar la manipulación de variables y operadores.
- **Próximos Pasos:**
  - Experimentar con el código, modificar ejemplos y compartir resultados.
  - Aplicar lo aprendido en proyectos más complejos conforme avance el curso.

