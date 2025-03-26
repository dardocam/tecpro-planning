### Filmina 1: Portada
- **Título:** Estructuras de Control – Condicionales en PHP
- **Subtítulo:** Toma de decisiones y procesamiento de datos en el back-end
- **Profesor:** Dardo Camaño

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Cómo podemos dirigir el flujo de ejecución de un programa PHP y tomar decisiones en función de condiciones específicas?”
  - Breve introducción a la importancia de las estructuras condicionales en el desarrollo web y el procesamiento de formularios.
- **Desarrollo (80 minutos):**
  - **Teoría y Sintaxis:**
    - Uso de `if`, `else`, `elseif` y `switch` en PHP.
    - Operador ternario y ejemplos de validación básica.
  - **Casos Prácticos:**
    - Ejemplos que integran condicionales en el procesamiento de formularios y la validación de datos.
    - Ejercicios para diferenciar entre distintas estructuras condicionales y su impacto en la lógica de negocio.
- **Cierre (10 minutos):**
  - Resumen de conceptos clave.
  - Sesión de preguntas y respuestas.

---

### Filmina 3: Objetivos de la Clase
- **Objetivos Específicos:**
  - Comprender y aplicar estructuras condicionales en PHP para dirigir el flujo del programa.
  - Dominar la sintaxis de `if`, `else`, `elseif` y `switch` en escenarios reales.
  - Integrar condicionales en el procesamiento de formularios y validación de datos, aprovechando superglobales cuando sea necesario.
- **Relación con los Objetivos Generales:**
  - Refuerza la comprensión de la arquitectura del desarrollo web y el rol del back-end en PHP.
  - Contribuye al dominio de la sintaxis y estructuras de control, fundamentales para el manejo de arrays, cadenas y formularios.

---

### Filmina 4: Introducción a las Condicionales en PHP
- **¿Qué es una estructura condicional?**
  - Permite ejecutar diferentes bloques de código según se cumplan ciertas condiciones.
- **Importancia en el Desarrollo Web:**
  - Esencial para la toma de decisiones (ej. validación de formularios, control de acceso, rutas de ejecución).
  - Contribuye a la robustez y seguridad del procesamiento de datos.

---

### Filmina 5: Sintaxis Básica – If, Else y Elseif
- **Estructura de `if`:**
  ```php
  if ($condicion) {
      // Código si la condición es verdadera
  }
  ```
- **Uso de `else` y `elseif`:**
  ```php
  if ($edad >= 18) {
      echo "Mayor de edad";
  } elseif ($edad >= 13) {
      echo "Adolescente";
  } else {
      echo "Menor de edad";
  }
  ```
- **Comentarios:**
  - Explicación de cómo se evalúan las condiciones y la importancia del orden en `elseif`.

---

### Filmina 6: Sintaxis Alternativa – Switch
- **Uso de `switch`:**
  - Ideal para evaluar múltiples condiciones basadas en un mismo valor.
  ```php
  switch ($dia) {
      case "lunes":
          echo "Inicio de semana";
          break;
      case "viernes":
          echo "Fin de semana";
          break;
      default:
          echo "Día normal";
  }
  ```
- **Ventajas:**
  - Mayor legibilidad cuando se tienen múltiples casos.

---

### Filmina 7: Operador Ternario
- **Sintaxis del operador ternario:**
  - Permite escribir condicionales simples en una sola línea.
  ```php
  $resultado = ($valor > 10) ? "Mayor que 10" : "Menor o igual a 10";
  echo $resultado;
  ```
- **Uso en validaciones rápidas:**
  - Ejemplo en el procesamiento de datos de formularios para asignar valores predeterminados.

---

### Filmina 8: Ejemplos Prácticos – Procesamiento de Formularios
- **Ejemplo 1: Validación de un Formulario Simple**
  - Validar que un campo de texto no esté vacío:
  ```php
  if (!empty($_POST['nombre'])) {
      $nombre = htmlspecialchars($_POST['nombre']);
      echo "Bienvenido, " . $nombre;
  } else {
      echo "El campo nombre es obligatorio.";
  }
  ```
- **Ejemplo 2: Uso de Switch para Rutas de Ejecución**
  - Seleccionar una acción según la opción elegida por el usuario:
  ```php
  $accion = $_GET['accion'] ?? 'default';
  switch ($accion) {
      case 'crear':
          // Lógica para crear
          break;
      case 'editar':
          // Lógica para editar
          break;
      case 'borrar':
          // Lógica para borrar
          break;
      default:
          echo "Acción no reconocida.";
  }
  ```

---

### Filmina 9: Ejercicios en Vivo
- **Demostración:**
  - Realizar en vivo la creación de un pequeño script que valide datos de un formulario simulado.
  - Comparar la utilización de `if/else` y `switch` en diferentes escenarios.
- **Interacción:**
  - Invitar a estudiantes a sugerir casos prácticos y modificar el código en tiempo real.

---

### Filmina 10: Actividad Práctica – Integración de Condicionales
- **Nombre de la Actividad:** Validación y Procesamiento de Formularios
- **Duración:** 30 minutos
- **Descripción:**
  - Los estudiantes desarrollarán un script PHP que procese un formulario:
    - Validación de campos obligatorios.
    - Uso de condicionales para asignar mensajes de error o éxito.
    - Aplicación del operador ternario para asignar valores predeterminados.
  - Se alentará la integración de superglobales y técnicas básicas de sanitización (por ejemplo, `htmlspecialchars`).
- **Dinámica:**
  - Trabajo individual o en parejas.
  - Discusión y puesta en común de las soluciones implementadas.

---

### Filmina 11: Cierre y Preguntas
- **Resumen de Conceptos:**
  - Repaso de las estructuras condicionales (`if`, `else`, `elseif`, `switch` y operador ternario).
  - Importancia en el procesamiento de formularios y la validación de datos.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas y analizar ejemplos prácticos.
  - Retroalimentación sobre la actividad práctica.

---

### Filmina 12: Recursos y Bibliografía
- **Documentación Oficial:**
  - [PHP Manual – Control Structures](https://www.php.net/manual/es/language.control-structures.php)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre procesamiento de formularios en PHP.
  - Blogs especializados en PHP y desarrollo back-end.
- **Enlaces Recomendados:**
  - [W3Schools – PHP Conditions](https://www.w3schools.com/php/php_if_else.asp)
  - [Tutorial de PHP de freeCodeCamp](https://www.freecodecamp.org)

---
