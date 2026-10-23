# 14. Crear nuestra primera API

Archivo:

```text
api/productos.php
```

Código inicial:

```php
<?php

require_once '../config/database.php';

header('Content-Type: application/json');

$stmt = $pdo->query(
    "SELECT id, nombre, descripcion, precio, stock
     FROM productos
     ORDER BY id DESC"
);

$productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($productos);
```

Ahora podemos acceder desde:

```text
http://localhost/mi-proyecto/api/productos.php
```

El resultado será JSON.

---

# 15. ¿Qué hace la API?

La aplicación móvil puede realizar una solicitud:

```text
GET /api/productos.php
```

El servidor responde:

```json
[
    {
        "id": 1,
        "nombre": "Teclado",
        "descripcion": "Teclado USB",
        "precio": "25000.00",
        "stock": 10
    }
]
```

La aplicación móvil no necesita conocer cómo funciona MySQL.

Solo necesita conocer la API.

---

# 16. Métodos HTTP

Una API REST normalmente utiliza diferentes métodos HTTP.

```text
GET
POST
PUT
DELETE
```

Podemos asociarlos con CRUD:

| HTTP   | CRUD   | Función   |
| ------ | ------ | --------- |
| GET    | Read   | Consultar |
| POST   | Create | Crear     |
| PUT    | Update | Modificar |
| DELETE | Delete | Eliminar  |

Por ejemplo:

```text
GET /api/productos.php
```

obtiene productos.

Mientras que:

```text
POST /api/productos.php
```

podría crear un nuevo producto.

---
