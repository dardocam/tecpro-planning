## Filmina 1: Portada
- **Título:** Clase 14: Subir Imágenes al Servidor con PHP  
- **Subtítulo:** Integración de Formularios de Archivos y PHP  
- **Profesor:** Dardo Camaño  
- **Fecha:** [Fecha de la Clase]  

## Filmina 2: Agenda de la Clase
1. **Introducción (10 minutos):**  
   - Pregunta inicial: “¿Qué pasos y precauciones debemos tener al permitir la carga de archivos en un sitio web?”  
   - Breve repaso de seguridad y buenas prácticas al recibir datos de usuario.  
2. **Teoría (40 minutos):**  
   - Configuración de PHP (`php.ini`) para habilitar cargas de archivos.  
   - Formularios HTML con `<input type="file">` y atributo `enctype`.  
   - Procesamiento en PHP: superglobal `$_FILES`, validación y sanitización.  
   - Uso de `move_uploaded_file()` e `is_uploaded_file()` para almacenamiento seguro.  
   - Manejo de errores y límites de tamaño.  
3. **Práctica (40 minutos):**  
   - Desarrollo guiado de un mini sistema de carga de imágenes:  
     - Creación del formulario HTML.  
     - Script PHP para recibir, validar y mover el archivo.  
     - Modularización con `include` y `require`.  
4. **Cierre (10 minutos):**  
   - Resumen de los conceptos clave.  
   - Sesión de preguntas y respuestas.

## Filmina 3: Objetivos de la Clase
- **Objetivo General:**  
  Implementar un módulo de carga de imágenes en PHP que sea seguro, modular y fácil de mantener.  
- **Objetivos Específicos:**  
  1. Configurar PHP para permitir cargas de archivos.  
  2. Crear formularios HTML con el atributo `enctype="multipart/form-data"`
  3. Utilizar la superglobal `$_FILES` para acceder a los datos del archivo 
  4. Validar tipo, tamaño y errores antes de mover el archivo.  
  5. Emplear `move_uploaded_file()` e `is_uploaded_file()` para almacenamiento seguro   
  6. Modularizar el código con `include` y `require`.

## Filmina 4: Integración Formulario HTML y PHP
- **Formulario HTML:**  
  ```html
  <form action="upload.php" method="post" enctype="multipart/form-data">
    <label for="fileToUpload">Selecciona una imagen:</label>
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Subir Imagen" name="submit">
  </form>
  ```  
  - El atributo `enctype="multipart/form-data"` es indispensable para enviar archivos   
- **PHP:**  
  - La superglobal `$_FILES` contiene la información del archivo subido:  
    - `$_FILES['fileToUpload']['name']`, `['type']`, `['size']`, `['tmp_name']`, `['error']`.  
- **Base de Datos (opcional):**  
  - Se puede almacenar la ruta o el nombre del archivo en una tabla para su gestión.  
- **Flujo del Proceso:**  
  1. El usuario selecciona un archivo y envía el formulario.  
  2. PHP recibe la petición, valida y sanitiza los datos.  
  3. Si todo es correcto, se ejecuta `move_uploaded_file()` para ubicar el archivo en la carpeta destino.

## Filmina 5: Modularización con include y require
- **Concepto:** Separar la lógica de conexión, presentación y proceso en archivos independientes.  
- **Ejemplos comunes:**  
  - `config.php`: datos de conexión y configuración general.  
  - `header.php` y `footer.php`: plantilla de cabecera y pie.  
  - `upload.php`: procesamiento de la carga.  
- **Sintaxis en PHP:**  
  ```php
  include 'config.php';   // warning si falla, el script continúa 
  require 'header.php';   // error fatal si falta el archivo 
  // Lógica de la aplicación…
  require 'footer.php';
  ```
- **Ventajas:**  
  - Evita duplicación de código y mejora la legibilidad.  
  - Facilita el mantenimiento y las actualizaciones.

## Filmina 6: Diseño Básico de la Aplicación de Carga
- **Esquema de páginas:**  
  1. **index.php:** listado de imágenes subidas.  
  2. **upload_form.php:** formulario para subir nuevas imágenes.  
  3. **upload.php:** lógica de validación y almacenamiento.  
- **Acciones permitidas:**  
  - **INSERT:** almacenar la imagen y registrar su nombre/ruta en la base de datos.  
  - **DELETE:** eliminar el archivo del servidor y su registro.  
- **Diagrama de Flujo:**  
  ```
  [Formulario] → [Validación PHP] → [move_uploaded_file] → [Carpeta uploads/]
        ↓                                      ↓
    Mensaje de éxito o error                Registro DB
  ```

## Filmina 7: Estructura de Archivos y Código de Ejemplo
- **Estructura recomendada:**
  ```
  /project
    ├─ config.php
    ├─ header.php
    ├─ upload_form.php
    ├─ upload.php
    ├─ index.php
    ├─ uploads/             (carpeta con permisos de escritura)
    └─ footer.php
  ```
- **config.php:**  
  ```php
  <?php
  // Configuración de conexión
  $mysqli = new mysqli('localhost', 'usuario', 'clave', 'basedatos');
  if ($mysqli->connect_error) {
      die('Error de conexión: ' . $mysqli->connect_error);
  }
  ?>
  ```
- **upload.php (fragmento):**  
  ```php
  <?php
  include 'config.php';
  if (isset($_POST['submit'])) {
      $target_dir = 'uploads/';
      $target_file = $target_dir . basename($_FILES['fileToUpload']['name']);
      if (is_uploaded_file($_FILES['fileToUpload']['tmp_name'])) {
          if (move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target_file)) {
              echo 'La imagen se ha subido correctamente.';
          } else {
              echo 'Error al mover el archivo.'; 
          }
      } else {
          echo 'El archivo no es válido.';
      }
  }
  ?>
  ```

## Filmina 8: Demostración en Vivo – Desarrollo Guiado
1. **Crear la base de datos** y la tabla `imagenes` con campos `id`, `nombre_archivo`, `fecha_subida`.  
2. **Desarrollar `upload_form.php`** con el formulario HTML.  
3. **Implementar `upload.php`:**  
   - Verificar `$_FILES['fileToUpload']['error']` y códigos de error.  
   - Validar tipo MIME y tamaño antes de `move_uploaded_file()` .  
   - Guardar registro en la base de datos.  
4. **Incluir config, header y footer** en cada página para mantener la modularidad.  
5. **Iterar** con sugerencias de los estudiantes: tipos de validación, límites de tamaño, feedback al usuario.

## Filmina 9: Actividad Práctica – Mini Sistema de Carga
- **Nombre:** Gestión de Imágenes  
- **Duración:** 40 minutos  
- **Instrucciones:**  
  1. Crear formulario para subir imágenes.  
  2. Implementar validación de tipo (solo JPG, PNG, GIF) y tamaño (< 2 MB).  
  3. Usar `move_uploaded_file()` para almacenar en `/uploads`.  
  4. Mostrar lista de imágenes subidas en `index.php`.  
  5. Modularizar con `include` y `require`.  
- **Puesta en común:** compartir desafíos y soluciones.

## Filmina 10: Cierre y Preguntas
- **Resumen de Conceptos:**  
  - Configuración de PHP para cargas de archivos.  
  - Formularios con `multipart/form-data`.  
  - Superglobal `$_FILES` y manejo de errores.  
  - Funciones `is_uploaded_file()` y `move_uploaded_file()` para seguridad.  
  - Modularización con `include`/`require`.  
- **Preguntas:**  
  Espacio abierto para resolver dudas sobre seguridad, validación y flujo de carga.

## Filmina 11: Recursos y Bibliografía
- **PHP Manual – POST method uploads**   
- **PHP Manual – Variables $_FILES**   
- **PHP Manual – move_uploaded_file()**   
- **PHP Manual – Errores de carga de archivos**   
- **W3Schools – Tutorial PHP File Upload**   
- **W3Schools – HTML File Upload Button**   
- **PHP Manual – include/require**   
- **PHP Manual – Common Pitfalls (configuracion php.ini)**