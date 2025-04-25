Aquí tienes un ejemplo de cómo leer un archivo CSV e insertar múltiples registros en una base de datos usando PHP y PDO:

```php
<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'tu_base_de_datos';
$user = 'usuario';
$pass = 'contraseña';

// Archivo CSV
$archivoCSV = 'datos.csv';

try {
    // Conectar a la base de datos
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Abrir el archivo CSV
    $file = fopen($archivoCSV, 'r');
    if ($file === false) {
        throw new Exception("No se pudo abrir el archivo CSV");
    }

    // Opcional: Saltar la primera línea si contiene encabezados
    $encabezados = fgetcsv($file);

    // Preparar la consulta SQL
    $stmt = $pdo->prepare("
        INSERT INTO tu_tabla (columna1, columna2, columna3) 
        VALUES (:campo1, :campo2, :campo3)
    ");

    // Iniciar transacción para múltiples inserciones
    $pdo->beginTransaction();

    // Leer el archivo línea por línea
    while (($fila = fgetcsv($file)) !== false) {
        // Validar que la fila tenga datos suficientes
        if (count($fila) < 3) {
            continue; // O manejar el error como prefieras
        }

        // Asignar valores a los parámetros
        $datos = [
            ':campo1' => $fila[0],
            ':campo2' => $fila[1],
            ':campo3' => $fila[2]
        ];

        // Ejecutar la inserción
        $stmt->execute($datos);
    }

    // Confirmar todas las inserciones
    $pdo->commit();

    // Cerrar archivo
    fclose($file);

    echo "Datos insertados correctamente!";
    
} catch (PDOException $e) {
    // Revertir transacción en caso de error
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    die("Error de base de datos: " . $e->getMessage());
} catch (Exception $e) {
    die("Error general: " . $e->getMessage());
}
?>
```

**Explicación del código:**

1. **Conexión a la base de datos:** Usamos PDO con los parámetros de conexión apropiados y activamos el manejo de excepciones.

2. **Apertura del archivo CSV:** Verificamos que el archivo pueda ser abierto correctamente.

3. **Transacción:** Iniciamos una transacción para mejorar el rendimiento en inserciones múltiples y mantener la integridad de los datos.

4. **Preparación de la consulta:** Usamos una sentencia preparada con parámetros nombrados para seguridad contra inyección SQL.

5. **Lectura del CSV:** Leemos el archivo línea por línea usando `fgetcsv()`.

6. **Ejecución múltiple:** Por cada fila del CSV, ejecutamos la sentencia preparada con los diferentes valores.

7. **Commit/Rollback:** Confirmamos todas las inserciones si todo va bien, o revertimos en caso de error.

**Personalizaciones posibles:**

- **Delimitador CSV:** Si usas otro delimitador (ej: punto y coma), modifica `fgetcsv()`:
  ```php
  fgetcsv($file, 0, ';')
  ```

- **Mapeo de columnas:** Ajusta los índices del array `$fila` y los nombres de los parámetros según la estructura de tu CSV y tabla.

- **Validación de datos:** Agrega más validaciones según tus necesidades (tipos de datos, formatos, etc).

- **Rendimiento:** Para archivos muy grandes, considera:
  - Aumentar el `memory_limit` en PHP
  - Procesar en lotes más pequeños
  - Usar `LOAD DATA INFILE` de MySQL (si tienes acceso directo al servidor)
