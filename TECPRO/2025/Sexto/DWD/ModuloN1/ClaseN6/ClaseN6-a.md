## Módulo 5: Modularización y Reutilización de Código

### Filmina 5.1 – ¿Por qué modularizar?

* **Teoría**

  * Separar la lógica en archivos independientes mejora la mantenibilidad.
  * Facilita la reutilización de funciones o clases en distintos puntos de la aplicación.
  * Permite trabajar de manera colaborativa sin conflictos de merge.
* **Práctica**

  ```php
  // helpers.php
  <?php
  function saludar($nombre) {
      return "¡Hola, $nombre!";
  }
  ```

  ```php
  // index.php
  <?php
  include 'helpers.php';
  echo saludar('María'); // Imprime: ¡Hola, María!
  ```

---

### Filmina 5.2 – include vs. require

* **Pregunta**
  ¿Qué instrucción PHP sirve para incluir un archivo y **continuar** aunque no exista?

  * a) require
  * b) include
  * c) import
  * d) use
* **Teoría**

  * `include 'archivo.php';`

    * Si `archivo.php` no se encuentra, PHP emite un *warning* pero **continúa** la ejecución.
  * `require 'archivo.php';`

    * Si falta el archivo, genera un *fatal error* y detiene la ejecución.
* **Código de ejemplo**

  ```php
  <?php
  include 'no_existe.php';   // Warning, continúa ejecución
  echo "Esto se muestra igual.\n";

  require 'no_existe.php';   // Fatal error, no se ejecuta lo siguiente
  echo "Nunca llega aquí.\n";
  ```

---

### Filmina 5.3 – include\_once y require\_once

* **Pregunta**
  Para evitar incluir dos veces un mismo archivo, se utiliza:

  * a) include\_once y require\_once
  * b) import\_once
  * c) use\_once
  * d) load\_once
* **Teoría**

  * `include_once 'archivo.php';` y `require_once 'archivo.php';`

    * Si ya se incluyó previamente, **no** vuelve a cargar el archivo.
    * Evita errores por redeclaración de funciones/clases.
* **Código de ejemplo**

  ```php
  <?php
  include_once 'config.php';
  include_once 'config.php'; // No se vuelve a cargar

  require_once 'lib.php';
  require_once 'lib.php';    // No se vuelve a cargar
  ```

---

## Módulo 6: Manejo de Arrays y Manipulación de Cadenas

### Filmina 6.1 – Arrays asociativos

* **Pregunta**
  ¿Cómo se define un array asociativo en PHP?

  * a) `$a = array("Juan", "María");`
  * b) `$a = ["clave" => "valor", "edad" => 25];`
  * c) `$a = { "clave": "valor" };`
  * d) `$a = ( "clave" => "valor" );`
* **Teoría**

  * Un *array associativo* usa **claves** personalizadas en lugar de índices numéricos.
* **Práctica**

  ```php
  <?php
  $usuario = [
      "nombre" => "Ana",
      "edad"   => 30,
      "email"  => "ana@ejemplo.com"
  ];

  echo "Nombre: {$usuario['nombre']}\n";  // Ana
  echo "Edad: {$usuario['edad']}\n";      // 30
  ```

---

### Filmina 6.2 – Longitud de cadenas

* **Pregunta**
  Dado `$texto = "Hola Mundo";`, ¿qué función devuelve la longitud de la cadena?

  * a) `strlen($texto)`
  * b) `length($texto)`
  * c) `count($texto)`
  * d) `size($texto)`
* **Teoría**

  * `strlen()` retorna el número de caracteres de la cadena (bytes).
* **Práctica**

  ```php
  <?php
  $texto = "Hola Mundo";
  echo strlen($texto); // Imprime: 10
  ```

---

### Filmina 6.3 – Convertir a minúsculas

* **Pregunta**
  ¿Cuál función convierte un string a minúsculas en PHP?

  * a) `lowercase($str)`
  * b) `strtolower($str)`
  * c) `toLowerCase($str)`
  * d) `lcfirst($str)`
* **Teoría**

  * `strtolower()` transforma cada carácter al equivalente en minúscula.
* **Práctica**

  ```php
  <?php
  $palabra = "PHP Rocks!";
  echo strtolower($palabra); // php rocks!
  ```

---

### Filmina 6.4 – Ordenar arrays numéricos

* **Pregunta**
  Para ordenar un array numérico `$nums` de menor a mayor, se usa:

  * a) `sort($nums);`
  * b) `asort($nums);`
  * c) `ksort($nums);`
  * d) `arsort($nums);`
* **Teoría**

  * `sort()` ordena por valores y reindexa desde 0 ascendiendo.
* **Práctica**

  ```php
  <?php
  $nums = [5, 2, 9, 1];
  sort($nums);
  print_r($nums); // [1, 2, 5, 9]
  ```

---

### Filmina 6.5 – Extraer subcadenas

* **Pregunta**
  ¿Cómo se extrae una subcadena de `$texto` desde la posición 5 con longitud 3?

  * a) `substr($texto, 5, 3)`
  * b) `slice($texto, 5, 3)`
  * c) `mid($texto, 5, 3)`
  * d) `substring($texto, 5, 3)`
* **Teoría**

  * `substr($str, $inicio, $longitud)` recorta una parte de la cadena.
* **Práctica**

  ```php
  <?php
  $texto = "Hola Mundo";
  echo substr($texto, 5, 3); // Imprime: Mun
  ```

---

### Filmina 6.6 – Ejercicio integrado

* **Objetivo**
  Crear un pequeño script que:

  1. Incluya un archivo de helpers con `include_once`.
  2. Defina un array asociativo con datos de un usuario.
  3. Obtenga y muestre la longitud de su nombre en minúsculas.
  4. Ordene un array de calificaciones y muestre la nota más baja y más alta.
* **Pista de solución**

  ```php
  <?php
  include_once 'helpers.php'; // helpers.php define alguna función genérica

  $user = ["nombre"=>"Carlos", "edad"=>28];

  $nombre = strtolower($user['nombre']);
  echo "Longitud de nombre: " . strlen($nombre) . "\n";

  $notas = [7, 10, 5, 8];
  sort($notas);
  echo "Nota más baja: {$notas[0]}, más alta: {$notas[count($notas)-1]}\n";
  ```

---

