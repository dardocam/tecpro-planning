### Filmina 1: Portada
- **Título:** Clase 9: Gestión de Sesiones y Cookies
- **Subtítulo:** Autenticación y persistencia de datos en PHP
- **Profesor:** Dardo Camaño
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Cómo podemos mantener información del usuario entre diferentes páginas web?”
  - Breve explicación sobre la importancia de las sesiones y cookies en la gestión de datos en el back-end.
- **Teoría (40 minutos):**
  - **Sesiones en PHP:**
    - Uso de `session_start()` y la superglobal `$_SESSION`.
    - Ventajas de utilizar sesiones para almacenar información del usuario.
  - **Gestión de Cookies:**
    - Concepto de cookies y su uso para guardar información en el navegador.
    - Funciones básicas: `setcookie()`, lectura y eliminación de cookies.
- **Práctica (40 minutos):**
  - Desarrollo de una funcionalidad simple de login utilizando sesiones:
    - Creación de un formulario de login.
    - Validación de credenciales y asignación de datos a `$_SESSION`.
    - Redirección y cierre de sesión.
- **Cierre (10 minutos):**
  - Resumen de los conceptos clave y espacio para preguntas y respuestas.

---

### Filmina 3: Objetivos de la Clase
- **Objetivos Teóricos:**
  - Comprender el funcionamiento del manejo de sesiones en PHP.
  - Conocer la función `session_start()` y el uso de la superglobal `$_SESSION`.
  - Entender el propósito de las cookies y su gestión mediante `setcookie()`.
- **Objetivos Prácticos:**
  - Implementar una funcionalidad de login que utilice sesiones para mantener la información del usuario.
  - Configurar y leer cookies para personalizar la experiencia del usuario.
  - Aplicar buenas prácticas en la gestión y seguridad de sesiones y cookies.

---

### Filmina 4: Introducción a las Sesiones en PHP
- **Definición y Función:**
  - Una sesión permite almacenar información del usuario durante la navegación en varias páginas.
  - Las sesiones se inician con `session_start()` al comienzo de cada script que requiera acceder a `$_SESSION`.
- **Ventajas:**
  - Información almacenada en el servidor, más segura que las cookies.
  - Facilita la persistencia de datos entre peticiones sin exponerlos en la URL.

---

### Filmina 5: Uso de la Superglobal $_SESSION
- **Sintaxis Básica:**
  ```php
  session_start();
  $_SESSION['usuario'] = "Juan";
  echo "Bienvenido, " . $_SESSION['usuario'];
  ```
- **Aspectos Clave:**
  - Los datos almacenados en `$_SESSION` están disponibles en todas las páginas durante la sesión.
  - Es esencial iniciar la sesión al principio del script para acceder a estos datos.
- **Buenas Prácticas:**
  - Limitar la cantidad y sensibilidad de la información almacenada.
  - Implementar mecanismos para finalizar la sesión de forma segura (logout).

---

### Filmina 6: Gestión de Cookies en PHP
- **Concepto de Cookies:**
  - Las cookies son pequeños archivos que se almacenan en el navegador del usuario.
  - Permiten guardar información persistente entre sesiones, aunque pueden ser menos seguras.
- **Funciones Básicas:**
  - **Crear una cookie:**
    ```php
    setcookie("idioma", "es", time() + (86400 * 30), "/"); // Válida por 30 días
    ```
  - **Leer una cookie:**
    ```php
    if(isset($_COOKIE['idioma'])) {
        echo "Idioma seleccionado: " . $_COOKIE['idioma'];
    }
    ```
  - **Eliminar una cookie:**
    ```php
    setcookie("idioma", "", time() - 3600, "/");
    ```
- **Consideraciones:**
  - Las cookies se envían en cada solicitud al servidor, por lo que deben usarse con moderación.

---

### Filmina 7: Ejemplo Práctico – Funcionalidad de Login con Sesiones
- **Flujo del Login:**
  - Usuario ingresa sus credenciales en un formulario HTML.
  - El script PHP valida las credenciales (en un ejemplo simple, se comparan con valores predefinidos).
  - Si la validación es exitosa, se inicia la sesión con `session_start()` y se almacena la información del usuario en `$_SESSION`.
  - Se redirige al usuario a una página protegida; en caso contrario, se muestra un mensaje de error.
- **Código de Ejemplo:**
  ```php
  // login.php
  session_start();
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $usuario = $_POST['usuario'] ?? '';
      $password = $_POST['password'] ?? '';
      
      // Validación simple (en la práctica, se usarían consultas a una base de datos)
      if ($usuario === "admin" && $password === "secreto") {
          $_SESSION['usuario'] = $usuario;
          header("Location: dashboard.php");
          exit();
      } else {
          $error = "Credenciales inválidas.";
      }
  }
  ?>
  <!-- Formulario HTML para login -->
  <form action="login.php" method="post">
      <label for="usuario">Usuario:</label>
      <input type="text" id="usuario" name="usuario">
      <br>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password">
      <br>
      <button type="submit">Iniciar Sesión</button>
  </form>
  <?php
  if (isset($error)) {
      echo "<p>$error</p>";
  }
  ?>
  ```
- **Dashboard (dashboard.php):**
  ```php
  // dashboard.php
  session_start();
  if (!isset($_SESSION['usuario'])) {
      header("Location: login.php");
      exit();
  }
  echo "Bienvenido, " . htmlspecialchars($_SESSION['usuario']);
  ?>
  <a href="logout.php">Cerrar Sesión</a>
  ```

---

### Filmina 8: Ejemplo Práctico – Gestión de Cookies en Login
- **Uso Complementario:**
  - Almacenar preferencias del usuario o recordar el idioma seleccionado.
  - Ejemplo: Guardar el idioma preferido después del login.
  ```php
  setcookie("idioma", "es", time() + (86400 * 30), "/");
  ```
- **Demostración:**
  - Mostrar cómo se lee la cookie en una página posterior para personalizar la experiencia.

---

### Filmina 9: Actividad Práctica – Desarrollo de una Funcionalidad de Login
- **Nombre de la Actividad:** Implementación de Login con Sesiones
- **Duración:** 40 minutos
- **Instrucciones:**
  - Crear un formulario de login que capture usuario y contraseña.
  - Desarrollar el procesamiento en PHP que:
    - Valide las credenciales (pueden ser valores fijos para el ejercicio).
    - Inicie la sesión y almacene la información del usuario.
    - Redirija al usuario a una página protegida.
    - Permita el cierre de sesión.
  - Integrar el uso de cookies para recordar alguna preferencia (por ejemplo, el idioma).
- **Dinámica:**
  - Trabajo individual o en parejas.
  - Discusión de las soluciones implementadas y análisis de seguridad.

---

### Filmina 10: Cierre y Preguntas
- **Resumen de Conceptos Clave:**
  - La importancia de `session_start()` y `$_SESSION` para gestionar la información del usuario.
  - Cómo las cookies permiten la persistencia de datos en el navegador.
  - Buenas prácticas en la implementación de funcionalidades de login.
- **Preguntas y Respuestas:**
  - Espacio para resolver dudas y analizar ejemplos presentados.
  - Discusión sobre posibles mejoras y consideraciones de seguridad.

---

### Filmina 11: Recursos y Bibliografía
- **Documentación Oficial:**
  - [PHP Manual – Sesiones](https://www.php.net/manual/es/book.session.php)
  - [PHP Manual – Cookies](https://www.php.net/manual/es/features.cookies.php)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre gestión de sesiones y cookies en PHP.
  - Ejercicios interactivos en plataformas como W3Schools y freeCodeCamp.
- **Enlaces Recomendados:**
  - [W3Schools – PHP Sessions](https://www.w3schools.com/php/php_sessions.asp)
  - Blogs y foros especializados en desarrollo back-end con PHP.
