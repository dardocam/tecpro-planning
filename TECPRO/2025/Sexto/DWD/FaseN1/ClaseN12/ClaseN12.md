### Filmina 1: Portada
- **Título:** Clase 12: Desarrollo de una Aplicación CRUD Básica
- **Subtítulo:** Integración de Formularios, PHP y Bases de Datos
- **Profesor:** Dardo Camaño
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Cómo podemos integrar formularios, PHP y bases de datos para gestionar registros de forma eficiente?”
  - Presentación sobre la importancia de la modularización y la separación de responsabilidades en el código.
- **Teoría (40 minutos):**
  - Integración de formularios HTML, PHP y bases de datos para operaciones CRUD.
  - Uso de `include` y `require` para modularizar el código (ej. encabezados, pies de página, conexión a la base de datos).
- **Práctica (40 minutos):**
  - Desarrollo guiado de un mini sistema (gestión de contactos o productos):
    - Creación y procesamiento de formularios.
    - Conexión a la base de datos y ejecución de operaciones CRUD.
    - Modularización del código con `include` y `require`.
- **Cierre (10 minutos):**
  - Resumen de los conceptos clave y sesión de preguntas y respuestas.

---

### Filmina 3: Objetivos de la Clase
- **Objetivo General:**
  - Desarrollar una aplicación CRUD básica que integre formularios, PHP y bases de datos, y que esté modularizada para facilitar su mantenimiento.
- **Objetivos Específicos:**
  - Integrar formularios HTML para capturar datos.
  - Utilizar PHP para procesar formularios y ejecutar consultas SQL.
  - Conectar y manipular una base de datos para operaciones CRUD.
  - Modularizar el código con `include` y `require` para separar la conexión, la interfaz y la lógica de negocio.

---

### Filmina 4: Integración de Formularios, PHP y Bases de Datos
- **Estructura General:**
  - **Formularios HTML:** Permiten capturar datos del usuario.
  - **PHP:** Procesa la información enviada y ejecuta consultas SQL.
  - **Base de Datos:** Almacena, actualiza y elimina registros.
- **Flujo del Proceso:**
  - El usuario ingresa datos en un formulario.
  - PHP recibe la información, la valida y la sanitiza.
  - Se ejecutan operaciones SQL para insertar, actualizar, eliminar o consultar registros.
- **Beneficios:**
  - Permite crear aplicaciones interactivas y dinámicas.
  - Facilita la administración de información en tiempo real.

---

### Filmina 5: Modularización con include y require
- **Concepto:**
  - Separar el código en archivos reutilizables para mejorar la organización y facilitar el mantenimiento.
- **Ejemplos Comunes:**
  - Archivo de configuración para la conexión a la base de datos (`config.php`).
  - Encabezado (`header.php`) y pie de página (`footer.php`) comunes a todas las páginas.
  - Funciones reutilizables en un archivo separado.
- **Sintaxis:**
  ```php
  include 'config.php';
  require 'header.php';
  // Código de la aplicación
  require 'footer.php';
  ```
- **Ventajas:**
  - Facilita la actualización del código.
  - Evita la duplicación y mejora la legibilidad.

---

### Filmina 6: Diseño Básico de la Aplicación CRUD
- **Ejemplo de Esquema:**
  - **Página de Listado:** Muestra todos los registros (ej. lista de contactos).
  - **Página de Registro/Edición:** Formulario para crear o editar un registro.
  - **Acciones:** Procesamiento de inserción, actualización y eliminación de registros.
- **Diagrama de Flujo:**
  - Diagrama simple que muestre el flujo entre el listado, el formulario y el procesamiento en PHP.

---

### Filmina 7: Ejemplo Práctico – Estructura de Archivos
- **Estructura Recomendada:**
  - `index.php`: Página principal con listado de registros.
  - `formulario.php`: Formulario para agregar/editar registros.
  - `procesar.php`: Lógica de inserción, actualización y eliminación.
  - `config.php`: Configuración de la conexión a la base de datos.
  - `header.php` y `footer.php`: Plantillas de encabezado y pie de página.
- **Código de Ejemplo:**
  ```php
  // config.php
  $mysqli = new mysqli("localhost", "usuario", "contraseña", "basedatos");
  if ($mysqli->connect_error) {
      die("Error de conexión: " . $mysqli->connect_error);
  }
  ```
  ```php
  // header.php
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Gestión de Contactos</title>
  </head>
  <body>
  <header>
      <h1>Gestión de Contactos</h1>
  </header>
  ```
  ```php
  // footer.php
  <footer>
      <p>&copy; 2025 Mi Aplicación CRUD</p>
  </footer>
  </body>
  </html>
  ```

---

### Filmina 8: Demostración en Vivo – Desarrollo Guiado
- **Paso a Paso:**
  - Creación de la base de datos y la tabla (ej. tabla `contactos` con campos id, nombre, email, teléfono).
  - Desarrollo del formulario HTML en `formulario.php`.
  - Implementación de la lógica en `procesar.php` para realizar operaciones CRUD:
    - **INSERT:** Insertar un nuevo contacto.
    - **UPDATE:** Actualizar un contacto existente.
    - **DELETE:** Eliminar un contacto.
  - Mostrar cómo incluir `config.php`, `header.php` y `footer.php` en cada página.
- **Interacción:**
  - Invitar a los estudiantes a sugerir mejoras y a depurar el código en tiempo real.

---

### Filmina 9: Actividad Práctica – Desarrollo de la Aplicación CRUD
- **Nombre de la Actividad:** Mini Sistema de Gestión de Contactos
- **Duración:** 40 minutos
- **Instrucciones:**
  - Los estudiantes, individualmente o en parejas, desarrollarán un mini sistema que permita:
    - Listar, agregar, editar y eliminar registros de una tabla (contactos o productos).
    - Utilizar formularios HTML para capturar la información.
    - Conectar a la base de datos y ejecutar operaciones CRUD.
    - Modularizar el código con `include` y `require`.
  - Al finalizar, se realizará una puesta en común para discutir desafíos y soluciones implementadas.

---

### Filmina 10: Cierre y Preguntas
- **Resumen de Conceptos:**
  - Integración de formularios, PHP y bases de datos para operaciones CRUD.
  - Uso de `include` y `require` para modularizar el código.
  - Diseño y desarrollo de un mini sistema de gestión de registros.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas sobre la implementación, modularización y manejo de datos.
  - Discusión sobre la importancia de la separación de responsabilidades en aplicaciones web.

---

### Filmina 11: Recursos y Bibliografía
- **Documentación Oficial:**
  - [PHP Manual – include/require](https://www.php.net/manual/es/function.include.php)
  - [PHP Manual – MySQLi](https://www.php.net/manual/es/book.mysqli.php)
  - [PHP Manual – PDO](https://www.php.net/manual/es/book.pdo.php)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre el desarrollo de aplicaciones CRUD en PHP.
  - Ejercicios interactivos en plataformas como W3Schools y freeCodeCamp.
- **Enlaces Recomendados:**
  - [W3Schools – PHP CRUD Tutorial](https://www.w3schools.com/php/php_mysql_crud.asp)
  - Blogs y foros especializados en desarrollo web con PHP.

---
