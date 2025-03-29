### Filmina 1: Portada
- **Título:** Clase 6: Manejo de Arrays y Manipulación de Cadenas
- **Subtítulo:** Procesando estructuras de datos y cadenas en PHP
- **Profesor:** Dardo Camaño
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Temas a Tratar:**
  - **Arrays en PHP:**
    - Arrays indexados y arrays asociativos.
    - Funciones básicas para manipular arrays (creación, recorrido, ordenación, búsqueda).
  - **Manipulación de Cadenas:**
    - Operaciones con cadenas de texto: búsqueda, reemplazo y concatenación.
- **Actividades:**
  - Ejercicios prácticos para crear y procesar estructuras de datos y cadenas.
  - Demostración en vivo y resolución de casos prácticos.

---

### Filmina 3: Objetivos de la Clase
- **Objetivo General:**
  - Dominar el manejo de arrays y la manipulación de cadenas en PHP para procesar y transformar datos de manera eficiente.
- **Objetivos Específicos:**
  - Conocer la diferencia entre arrays indexados y asociativos.
  - Utilizar funciones básicas de arrays para su creación, modificación y recorrido.
  - Aplicar operaciones de búsqueda, reemplazo y concatenación en cadenas de texto.
  - Resolver ejercicios prácticos que integren ambas temáticas.

---

### Filmina 4: Introducción a los Arrays en PHP
- **¿Qué es un Array?**
  - Una estructura de datos que permite almacenar múltiples valores en una sola variable.
- **Tipos de Arrays:**
  - **Indexados:** Los elementos se identifican mediante un índice numérico.
  - **Asociativos:** Los elementos se identifican mediante claves (keys) que pueden ser strings.
- **Ejemplo Conceptual:**
  - Comparar un array indexado con una lista ordenada y un array asociativo con un diccionario.

---

### Filmina 5: Arrays Indexados y Asociativos – Ejemplos
- **Array Indexado:**
  ```php
  $numeros = [10, 20, 30, 40];
  echo $numeros[2]; // Imprime: 30
  ```
- **Array Asociativo:**
  ```php
  $persona = [
      "nombre" => "María",
      "edad" => 25,
      "ciudad" => "Madrid"
  ];
  echo $persona["nombre"]; // Imprime: María
  ```

---

### Filmina 6: Funciones Básicas para Arrays en PHP
- **Creación y Modificación:**
  - `array_push($array, $valor)`: Añade un elemento al final del array.
  - `array_pop($array)`: Elimina el último elemento.
  - `count($array)`: Retorna el número de elementos.
- **Recorrido y Búsqueda:**
  - Uso de `foreach` para iterar sobre arrays.
  - `in_array($valor, $array)`: Verifica si un valor existe en el array.
  - `array_search($valor, $array)`: Retorna la clave del valor encontrado.
- **Ejemplo:**
  ```php
  $frutas = ["manzana", "banana", "cereza"];
  array_push($frutas, "naranja");
  echo "Total de frutas: " . count($frutas);
  ```

---

### Filmina 7: Manipulación de Cadenas en PHP
- **Operaciones Básicas:**
  - **Concatenación:** Uso del operador `.` para unir cadenas.
  - **Búsqueda:** `strpos($cadena, $busqueda)` para encontrar la posición de una subcadena.
  - **Reemplazo:** `str_replace($buscar, $reemplazar, $cadena)` para cambiar partes de la cadena.
- **Ejemplo de Concatenación:**
  ```php
  $saludo = "Hola";
  $nombre = "Carlos";
  echo $saludo . " " . $nombre; // Imprime: Hola Carlos
  ```
- **Ejemplo de Búsqueda y Reemplazo:**
  ```php
  $frase = "El cielo es azul";
  $pos = strpos($frase, "azul"); // Retorna la posición de "azul"
  echo $pos;
  $nuevaFrase = str_replace("azul", "gris", $frase);
  echo $nuevaFrase; // Imprime: El cielo es gris
  ```

---

### Filmina 8: Ejemplos Prácticos – Integrando Arrays y Cadenas
- **Ejercicio de Integración:**
  - Crear un array de nombres y luego concatenar todos en una cadena separada por comas.
  ```php
  $nombres = ["Ana", "Luis", "Marta", "Juan"];
  $lista = implode(", ", $nombres);
  echo "Los nombres son: " . $lista;
  ```
- **Discusión:**
  - ¿Cómo podemos utilizar estas funciones para procesar datos provenientes de formularios?

---

### Filmina 9: Demostración en Vivo
- **Ejercicio en Vivo:**
  - Recorrer un array asociativo para mostrar los detalles de una persona.
  - Realizar un reemplazo en una cadena para actualizar información (por ejemplo, cambiar una ciudad).
- **Interacción:**
  - Invitar a los estudiantes a modificar ejemplos y experimentar con funciones adicionales.

---

### Filmina 10: Actividad Práctica – Procesamiento de Datos
- **Nombre de la Actividad:** Manipulación de Arrays y Cadenas
- **Duración:** 30 minutos
- **Descripción:**
  - Los estudiantes desarrollarán un script PHP que:
    - Cree un array de registros (por ejemplo, una lista de productos con nombre y precio).
    - Use funciones de arrays para agregar, eliminar y buscar elementos.
    - Convierta parte de la información en una cadena formateada (por ejemplo, una lista de productos separada por comas).
    - Realice operaciones de búsqueda y reemplazo en cadenas para actualizar datos.
- **Dinámica:**
  - Trabajo individual o en parejas.
  - Puesta en común de soluciones y discusión de enfoques.

---

### Filmina 11: Cierre y Preguntas
- **Resumen de Conceptos:**
  - Revisión de la creación y manipulación de arrays indexados y asociativos.
  - Repaso de las operaciones básicas sobre cadenas de texto.
  - Importancia de integrar ambas herramientas para procesar datos de forma eficiente.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas y discutir ejemplos prácticos.
  - Retroalimentación sobre la actividad y sugerencias de mejoras.

---

### Filmina 12: Recursos y Bibliografía
- **Documentación Oficial:**
  - [PHP Manual – Arrays](https://www.php.net/manual/es/language.types.array.php)
  - [PHP Manual – Strings](https://www.php.net/manual/es/function.str_replace.php)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre manipulación de arrays y cadenas en PHP.
  - Ejercicios interactivos en plataformas como W3Schools y freeCodeCamp.
- **Enlaces Recomendados:**
  - [W3Schools – PHP Arrays](https://www.w3schools.com/php/php_arrays.asp)
  - [W3Schools – PHP Strings](https://www.w3schools.com/php/php_strings.asp)

