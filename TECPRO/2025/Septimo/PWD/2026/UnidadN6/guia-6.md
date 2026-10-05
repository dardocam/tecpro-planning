
# 10. Crear registros

Ahora agregaremos un formulario.

Archivo:

```text
productos/crear.php
```

Primero mostramos el formulario:

```php
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Nuevo producto</title>
</head>

<body>

<h1>Nuevo producto</h1>

<form method="POST">

    <label>
        Nombre:
        <input
            type="text"
            name="nombre"
            required
        >
    </label>

    <br><br>

    <label>
        Descripción:
        <textarea name="descripcion"></textarea>
    </label>

    <br><br>

    <label>
        Precio:
        <input
            type="number"
            name="precio"
            step="0.01"
            required
        >
    </label>

    <br><br>

    <label>
        Stock:
        <input
            type="number"
            name="stock"
            required
        >
    </label>

    <br><br>

    <button type="submit">
        Guardar
    </button>

</form>

</body>
</html>
```

Pero todavía no estamos guardando nada.

---

# 11. Procesar el formulario

Ahora agregamos PHP al comienzo del archivo:

```php
<?php

require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $stock = $_POST['stock'];

    $sql = "
        INSERT INTO productos
        (nombre, descripcion, precio, stock)
        VALUES
        (:nombre, :descripcion, :precio, :stock)
    ";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':nombre' => $nombre,
        ':descripcion' => $descripcion,
        ':precio' => $precio,
        ':stock' => $stock
    ]);

    header('Location: index.php');
    exit;
}

?>
```

Estamos utilizando una **consulta preparada**.

Esto es importante porque ayuda a evitar ataques de **inyección SQL**.
