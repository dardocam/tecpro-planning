### Filmina 1: Portada
- **Título:** Clase 7: Formularios HTML y Uso de Superglobales
- **Subtítulo:** Captura y Procesamiento de Datos en PHP
- **Profesor:** Dardo Camaño
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Qué información necesitas recopilar de los usuarios y cómo la enviarías a un servidor?”
  - Breve explicación sobre la importancia de los formularios para la interacción en aplicaciones web.
- **Teoría (40 minutos):**
  - Creación de formularios en HTML: estructura y elementos básicos.
  - Métodos GET y POST: características, ventajas y cuándo usar cada uno.
  - Uso de superglobales en PHP: `$_GET`, `$_POST` y `$_SERVER`.
- **Práctica (40 minutos):**
  - Desarrollo de formularios simples para capturar datos.
  - Procesamiento de la información utilizando superglobales en PHP.
- **Cierre (10 minutos):**
  - Resumen de los conceptos clave y sesión de preguntas y respuestas.

---

### Filmina 3: Objetivos de la Clase
- **Objetivos Teóricos:**
  - Comprender la estructura y elementos de un formulario HTML.
  - Diferenciar entre los métodos GET y POST.
  - Conocer y utilizar las superglobales en PHP para acceder a la información enviada.
- **Objetivos Prácticos:**
  - Crear un formulario HTML que capture datos (ej. nombre, email).
  - Procesar y validar esos datos en PHP usando `$_GET` y `$_POST`.
  - Utilizar `$_SERVER` para obtener información del entorno de ejecución.

---

### Filmina 4: Introducción a los Formularios HTML
- **¿Qué es un Formulario?**
  - Una herramienta para recopilar información del usuario.
  - Utiliza la etiqueta `<form>` para definir el inicio y fin del formulario.
- **Elementos Clave:**
  - Campos de entrada (`<input>`, `<textarea>`, `<select>`)
  - Etiquetas (`<label>`) para describir cada campo.
  - Botones para enviar el formulario (`<button>` o `<input type="submit">`).
- **Ejemplo Básico:**
  ```html
  <form action="procesar.php" method="post">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre">
    <button type="submit">Enviar</button>
  </form>
  ```

---

### Filmina 5: Métodos GET y POST
- **Método GET:**
  - Envía datos a través de la URL.
  - Útil para búsquedas y datos no sensibles.
  - Ejemplo: `procesar.php?nombre=Ana`
- **Método POST:**
  - Envía datos en el cuerpo de la solicitud.
  - Más seguro para datos sensibles y mayor cantidad de información.
- **Comparativa:**
  - GET es visible en la URL y tiene limitaciones de longitud.
  - POST oculta la información y es más adecuado para formularios complejos.

---

### Filmina 6: Uso de Superglobales en PHP
- **Superglobales:**
  - `$_GET`: Acceso a datos enviados mediante el método GET.
  - `$_POST`: Acceso a datos enviados mediante el método POST.
  - `$_SERVER`: Información sobre el servidor y la solicitud (por ejemplo, IP, método, etc.).
- **Ejemplo de Uso:**
  ```php
  // En procesar.php
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $nombre = $_POST['nombre'] ?? 'Sin Nombre';
      echo "Bienvenido, " . htmlspecialchars($nombre);
  }
  ```
- **Buenas Prácticas:**
  - Sanitizar y validar los datos para evitar problemas de seguridad.

---

### Filmina 7: Ejemplo Práctico en Vivo – Creación de un Formulario
- **Desarrollo del Formulario:**
  - Crear un formulario que solicite al usuario su nombre y email.
  - Utilizar etiquetas `<label>`, `<input>` y un botón de envío.
- **Código HTML de Ejemplo:**
  ```html
  <form action="procesar.php" method="post">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre">
    <br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    <br>
    <button type="submit">Enviar</button>
  </form>
  ```
- **Procesamiento en PHP:**
  ```php
  // procesar.php
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $nombre = $_POST['nombre'] ?? 'Invitado';
      $email = $_POST['email'] ?? 'No especificado';
      echo "Nombre: " . htmlspecialchars($nombre) . "<br>";
      echo "Email: " . htmlspecialchars($email);
  }
  ```

---

### Filmina 8: Actividad Práctica – Desarrollo de Formularios
- **Nombre de la Actividad:** Captura y Procesamiento de Datos
- **Duración:** 40 minutos
- **Instrucciones:**
  - Crear un formulario HTML con varios campos (nombre, email, mensaje).
  - Configurar el formulario para enviar los datos mediante POST a un script PHP.
  - En el script PHP, utilizar `$_POST` para procesar y mostrar los datos.
  - Utilizar `$_SERVER` para mostrar información adicional, como el método de solicitud.
- **Objetivo:**
  - Reforzar la creación de formularios y el uso de superglobales para la validación y presentación de datos.

---

### Filmina 9: Cierre y Preguntas
- **Resumen de Conceptos Clave:**
  - Estructura de un formulario HTML y la diferencia entre GET y POST.
  - Uso de las superglobales `$_GET`, `$_POST` y `$_SERVER` para acceder y procesar datos.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas sobre la implementación y la seguridad en el procesamiento de datos.

---

### Filmina 10: Recursos y Bibliografía
- **Documentación Oficial:**
  - [MDN Web Docs – HTML Forms](https://developer.mozilla.org/es/docs/Learn/Forms)
  - [PHP Manual – Superglobales](https://www.php.net/manual/es/language.variables.superglobals.php)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre el procesamiento de formularios en PHP.
  - Ejercicios interactivos en plataformas como W3Schools y freeCodeCamp.
- **Enlaces Recomendados:**
  - [W3Schools – HTML Forms](https://www.w3schools.com/html/html_forms.asp)
  - Blogs especializados en PHP y desarrollo web.

