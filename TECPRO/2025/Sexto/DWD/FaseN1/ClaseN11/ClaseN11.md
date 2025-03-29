### Filmina 1: Portada
- **Título:** Clase 11: Conexión de PHP con Bases de Datos
- **Subtítulo:** Implementación de Operaciones CRUD utilizando mysqli/PDO
- **Profesor:** Dardo Camaño
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Cómo podemos conectar PHP con una base de datos y manipular los datos de forma dinámica?”
  - Breve repaso de la importancia de las bases de datos en aplicaciones web.
- **Teoría (40 minutos):**
  - Conexión a bases de datos usando **mysqli** y **PDO**.
  - Ejecución y manejo de consultas SQL.
  - Comparativa breve entre mysqli y PDO.
- **Práctica (40 minutos):**
  - Desarrollo de scripts PHP que realicen operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en una base de datos.
  - Ejercicios prácticos utilizando phpMyAdmin o un entorno de desarrollo local.
- **Cierre (10 minutos):**
  - Resumen de los conceptos clave.
  - Sesión de preguntas y respuestas.

---

### Filmina 3: Objetivos de la Clase
- **Objetivos Teóricos:**
  - Comprender cómo conectar PHP con una base de datos mediante mysqli y PDO.
  - Conocer el flujo de ejecución de consultas SQL y la gestión de resultados.
- **Objetivos Prácticos:**
  - Desarrollar scripts PHP que realicen operaciones CRUD en una base de datos.
  - Manejar errores y depurar consultas.
  - Comparar la experiencia de uso entre mysqli y PDO en un contexto práctico.

---

### Filmina 4: Conexión a Bases de Datos con mysqli
- **Uso de mysqli:**
  - Conexión básica:
    ```php
    $conexion = new mysqli("localhost", "usuario", "contraseña", "nombre_bd");
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }
    ```
- **Características:**
  - Interfaz orientada a objetos y procedimental.
  - Manejo de errores mediante propiedades como `$conexion->connect_error`.
- **Ventajas:**
  - Específico para MySQL, fácil de implementar para aplicaciones simples.

---

### Filmina 5: Conexión a Bases de Datos con PDO
- **Uso de PDO:**
  - Conexión básica:
    ```php
    try {
        $pdo = new PDO("mysql:host=localhost;dbname=nombre_bd", "usuario", "contraseña");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Error de conexión: " . $e->getMessage());
    }
    ```
- **Características:**
  - Soporta múltiples bases de datos.
  - Manejo de excepciones para gestionar errores.
- **Ventajas:**
  - Mayor flexibilidad y portabilidad en proyectos que puedan cambiar de motor de base de datos.

---

### Filmina 6: Ejecución y Manejo de Consultas SQL
- **Consultas con mysqli:**
  - Ejecución de una consulta SELECT:
    ```php
    $resultado = $conexion->query("SELECT * FROM usuarios");
    while ($fila = $resultado->fetch_assoc()) {
        echo $fila['nombre'] . "<br>";
    }
    ```
- **Consultas con PDO:**
  - Ejecución de una consulta SELECT:
    ```php
    $stmt = $pdo->query("SELECT * FROM usuarios");
    while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo $fila['nombre'] . "<br>";
    }
    ```
- **Manejo de Errores:**
  - Uso de excepciones (PDO) o verificación de métodos de error (mysqli).

---

### Filmina 7: Operaciones CRUD – Conceptos
- **Definición de CRUD:**
  - **Crear (INSERT):** Agregar nuevos registros.
  - **Leer (SELECT):** Consultar y visualizar registros.
  - **Actualizar (UPDATE):** Modificar registros existentes.
  - **Eliminar (DELETE):** Borrar registros.
- **Importancia:**
  - Permite la gestión completa de la información en una base de datos.

---

### Filmina 8: Ejemplo Práctico de CRUD con mysqli/PDO
- **Operación INSERT:**
  ```php
  // Con mysqli
  $sql = "INSERT INTO usuarios (nombre, email) VALUES ('Ana', 'ana@example.com')";
  if ($conexion->query($sql) === TRUE) {
      echo "Nuevo registro creado correctamente.";
  } else {
      echo "Error: " . $sql . "<br>" . $conexion->error;
  }
  ```
  ```php
  // Con PDO
  $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email) VALUES (:nombre, :email)");
  $stmt->execute(['nombre' => 'Ana', 'email' => 'ana@example.com']);
  echo "Nuevo registro creado correctamente.";
  ```
- **Operaciones SELECT, UPDATE y DELETE:**
  - Ejemplos análogos para leer, actualizar y eliminar registros.

---

### Filmina 9: Actividad Práctica – Desarrollo de Scripts CRUD
- **Nombre de la Actividad:** Operaciones CRUD en PHP
- **Duración:** 40 minutos
- **Instrucciones:**
  - Crear un script PHP que conecte a una base de datos utilizando mysqli o PDO.
  - Implementar las operaciones CRUD:
    - **INSERT:** Agregar un nuevo usuario.
    - **SELECT:** Mostrar la lista de usuarios.
    - **UPDATE:** Modificar la información de un usuario.
    - **DELETE:** Eliminar un usuario.
  - Utilizar phpMyAdmin (u otra herramienta) para verificar las operaciones en la base de datos.
- **Dinámica:**
  - Trabajo individual o en parejas.
  - Puesta en común de las soluciones y discusión sobre manejo de errores y optimización.

---

### Filmina 10: Cierre y Preguntas
- **Resumen de Conceptos Clave:**
  - Importancia de conectar PHP con bases de datos y ejecutar consultas de manera segura.
  - Diferencias entre mysqli y PDO, y cuándo utilizar cada uno.
  - Implementación de operaciones CRUD como base para la interacción con datos.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas sobre la conexión, ejecución de consultas y manejo de errores.
  - Discusión sobre la aplicación práctica en proyectos reales.

---

### Filmina 11: Recursos y Bibliografía
- **Documentación Oficial:**
  - [PHP Manual – mysqli](https://www.php.net/manual/es/book.mysqli.php)
  - [PHP Manual – PDO](https://www.php.net/manual/es/book.pdo.php)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre conexión de PHP con bases de datos y operaciones CRUD.
  - Ejercicios interactivos en plataformas como W3Schools, freeCodeCamp y phpMyAdmin.
- **Enlaces Recomendados:**
  - [W3Schools – PHP MySQLi](https://www.w3schools.com/php/php_mysql_connect.asp)
  - [W3Schools – PHP PDO](https://www.w3schools.com/php/php_pdo.asp)
