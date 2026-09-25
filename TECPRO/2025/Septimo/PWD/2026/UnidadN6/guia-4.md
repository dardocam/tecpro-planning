
# 7. Conectar PHP con MySQL

Crearemos:

```text
config/database.php
```

Utilizaremos **PDO**.

```php
<?php

$host = 'localhost';
$dbname = 'mi_proyecto';
$user = 'root';
$password = '';

try {

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $password
    );

    $pdo->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

} catch (PDOException $e) {

    die("Error de conexión");

}
```

Ahora cualquier página que necesite la base de datos podrá incluir:

```php
require_once '../config/database.php';
```

