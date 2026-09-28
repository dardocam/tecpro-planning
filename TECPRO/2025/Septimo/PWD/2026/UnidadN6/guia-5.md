
# 8. Primera página dinámica

Vamos a mostrar los productos.

Archivo:

```text
productos/index.php
```

Código:

```php
<?php

require_once '../config/database.php';

$stmt = $pdo->query(
    "SELECT * FROM productos ORDER BY id DESC"
);

$productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Productos</title>
</head>

<body>

<h1>Listado de productos</h1>

<a href="crear.php">
    Nuevo producto
</a>

<table border="1">

    <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Stock</th>
    </tr>

    <?php foreach ($productos as $producto): ?>

        <tr>

            <td>
                <?= htmlspecialchars($producto['id']) ?>
            </td>

            <td>
                <?= htmlspecialchars($producto['nombre']) ?>
            </td>

            <td>
                $<?= htmlspecialchars($producto['precio']) ?>
            </td>

            <td>
                <?= htmlspecialchars($producto['stock']) ?>
            </td>

        </tr>

    <?php endforeach; ?>

</table>

</body>
</html>
```

Probamos:

```text
http://localhost/mi-proyecto/productos/
```

Ahora tenemos nuestro primer sistema dinámico.

---

# 9. Comprender qué está ocurriendo

Cuando el usuario entra en:

```text
productos/index.php
```

ocurre:

```text
Navegador
   │
   │ HTTP
   ▼
Apache
   │
   ▼
PHP
   │
   │ SQL
   ▼
MySQL
   │
   │ datos
   ▼
PHP
   │
   │ HTML generado
   ▼
Navegador
```

Es importante comprender que PHP se ejecuta en el **servidor**.

El navegador recibe principalmente:

```text
HTML
CSS
JavaScript
```

No recibe el código PHP.