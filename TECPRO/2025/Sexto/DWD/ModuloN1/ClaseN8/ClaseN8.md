### Filmina 1: Portada
- **Título:** Clase 8: Validación y Sanitización de Datos
- **Subtítulo:** Técnicas modernas para proteger y validar entradas en formularios
- **Profesor:** Dardo Camaño
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Por qué es crucial validar y sanear la información que recibimos de los usuarios?”
  - Importancia de la validación y sanitización para la seguridad y robustez de las aplicaciones.
- **Teoría (40 minutos):**
  - Técnicas de validación de formularios sin `filter_var`: uso de expresiones regulares (`preg_match`) y funciones personalizadas.
  - Métodos de sanitización de entradas para prevenir inyección de código.
  - Manejo de errores y retroalimentación clara al usuario.
- **Práctica (40 minutos):**
  - Implementación de validaciones y sanitización en formularios reales usando `preg_match`, `htmlspecialchars`, `trim` y otras funciones nativas.
  - Ejercicios prácticos y análisis de mensajes de error.
- **Cierre (10 minutos):**
  - Resumen de conceptos clave.
  - Sesión de preguntas y respuestas.

---

### Filmina 3: Objetivos de la Clase
- **Objetivos Teóricos:**
  - Comprender las técnicas modernas para validar formularios sin recurrir a `filter_var`.
  - Conocer cómo utilizar expresiones regulares para validar datos (ej. correos electrónicos).
  - Aprender a sanitizar datos con funciones nativas como `htmlspecialchars` y `trim`.
- **Objetivos Prácticos:**
  - Implementar validaciones personalizadas en formularios PHP.
  - Mostrar mensajes de error y retroalimentación clara al usuario.
  - Integrar estas técnicas en un entorno de procesamiento seguro de datos.

---

### Filmina 4: Importancia de la Validación y Sanitización
- **Razones Clave:**
  - **Seguridad:** Prevenir ataques de inyección de código (SQL, XSS, etc.).
  - **Integridad de Datos:** Garantizar que la información recibida sea coherente y esté en el formato esperado.
  - **Experiencia del Usuario:** Ofrecer retroalimentación inmediata y comprensible en caso de errores.
- **Ejemplo Conceptual:**
  - Un formulario sin validación puede permitir la inserción de scripts maliciosos; la validación adecuada protege la aplicación.

---

### Filmina 5: Técnicas de Validación sin filter_var
- **Validación con Expresiones Regulares:**
  - **Validar Email:**
    ```php
    $email = $_POST['email'] ?? '';
    if (!preg_match("/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $email)) {
        $errores[] = "El correo electrónico no es válido.";
    }
    ```
  - **Validar Números Enteros:**
    ```php
    $edad = $_POST['edad'] ?? '';
    if (!preg_match("/^\d+$/", $edad)) {
        $errores[] = "La edad debe ser un número entero.";
    }
    ```
- **Funciones Personalizadas:**
  - Se pueden crear funciones para validar otros tipos de datos según el requerimiento.

---

### Filmina 6: Técnicas de Sanitización de Datos
- **Funciones Clave:**
  - **htmlspecialchars():** Convierte caracteres especiales en entidades HTML para evitar XSS.
  - **trim():** Elimina espacios en blanco al inicio y al final.
  - **Ejemplo:**
    ```php
    $nombre = trim($_POST['nombre'] ?? '');
    $nombreSeguro = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
    ```
- **Importancia:**
  - Garantiza que los datos mostrados en la aplicación sean seguros y estén limpios.

---

### Filmina 7: Manejo de Errores y Retroalimentación al Usuario
- **Captura y Acumulación de Errores:**
  - Validar cada campo y acumular mensajes de error en un array.
  - Ejemplo:
    ```php
    $errores = [];
    if (empty($nombreSeguro)) {
        $errores[] = "El campo nombre es obligatorio.";
    }
    if (!preg_match("/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $email)) {
        $errores[] = "El correo electrónico no es válido.";
    }
    ```
- **Mostrar Retroalimentación:**
  - Imprimir cada error en un formato claro:
    ```php
    if (!empty($errores)) {
        foreach ($errores as $error) {
            echo "<p class='error'>{$error}</p>";
        }
    } else {
        echo "<p>Formulario enviado correctamente.</p>";
    }
    ```

---

### Filmina 8: Ejemplos Prácticos en Vivo
- **Demostración Práctica:**
  - Crear un formulario simple con campos (nombre, email, mensaje).
  - Procesar el formulario en un script PHP usando `preg_match` para validar el email y expresiones regulares para otros campos.
  - Sanitizar la información usando `htmlspecialchars` y `trim`.
- **Código Integrado de Ejemplo:**
  ```html
  <!-- formulario.html -->
  <form action="procesar.php" method="post">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre">
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
      <br>
      <label for="mensaje">Mensaje:</label>
      <textarea id="mensaje" name="mensaje"></textarea>
      <br>
      <button type="submit">Enviar</button>
  </form>
  ```
  ```php
  // procesar.php
  $errores = [];
  $nombre = trim($_POST['nombre'] ?? '');
  $email = trim($_POST['email'] ?? '');
  $mensaje = trim($_POST['mensaje'] ?? '');

  // Sanitización
  $nombreSeguro = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
  $emailSeguro = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
  $mensajeSeguro = htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8');

  // Validación
  if (empty($nombreSeguro)) {
      $errores[] = "El campo nombre es obligatorio.";
  }
  if (!preg_match("/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $emailSeguro)) {
      $errores[] = "El correo electrónico no es válido.";
  }
  if (empty($mensajeSeguro)) {
      $errores[] = "El campo mensaje es obligatorio.";
  }

  // Mostrar resultados
  if (!empty($errores)) {
      foreach ($errores as $error) {
          echo "<p class='error'>{$error}</p>";
      }
  } else {
      echo "<p>Formulario enviado correctamente.</p>";
      // Procesamiento adicional (por ejemplo, almacenar en base de datos)
  }
  ```

---

### Filmina 9: Actividad Práctica – Implementación de Validación y Sanitización
- **Nombre de la Actividad:** Validación y Sanitización de Formularios sin filter_var
- **Duración:** 40 minutos
- **Instrucciones:**
  - Crear un formulario con campos como nombre, email, teléfono y mensaje.
  - Implementar validaciones usando `preg_match` para el email y números, y otras expresiones según sea necesario.
  - Sanitizar cada campo usando `htmlspecialchars` y `trim`.
  - Mostrar mensajes de error o confirmación de forma clara.
- **Dinámica:**
  - Trabajo individual o en parejas.
  - Compartir y discutir soluciones, resaltando mejoras y enfoques alternativos.

---

### Filmina 10: Cierre y Preguntas
- **Resumen de Conceptos Clave:**
  - Técnicas modernas de validación usando expresiones regulares en lugar de `filter_var`.
  - Importancia de sanitizar datos con funciones nativas para proteger la aplicación.
  - Cómo manejar errores y ofrecer retroalimentación útil al usuario.
- **Sesión de Preguntas:**
  - Espacio para resolver dudas y repasar ejemplos prácticos.
  - Discusión sobre la aplicabilidad de estas técnicas en proyectos reales.

---

### Filmina 11: Recursos y Bibliografía
- **Documentación Oficial:**
  - [PHP Manual – Regular Expressions](https://www.php.net/manual/es/reference.pcre.pattern.syntax.php)
  - [PHP Manual – htmlspecialchars](https://www.php.net/manual/es/function.htmlspecialchars.php)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre validación y sanitización en PHP sin filter_var.
  - Ejercicios interactivos en plataformas como W3Schools y freeCodeCamp.
- **Enlaces Recomendados:**
  - [W3Schools – PHP String Functions](https://www.w3schools.com/php/php_ref_string.asp)
  - Blogs especializados en seguridad y validación de datos en PHP.

