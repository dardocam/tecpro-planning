# 17. Diseñar nuestra API

Una API inicial podría quedar así:

```text
GET    /api/productos.php
GET    /api/productos.php?id=1

POST   /api/productos.php

PUT    /api/productos.php?id=1

DELETE /api/productos.php?id=1
```

No es necesario implementar todo al mismo tiempo.

Conviene avanzar en este orden:

```text
1. GET
2. GET por ID
3. POST
4. PUT
5. DELETE
```

---

# 18. Recibir JSON desde una aplicación móvil

Una aplicación móvil puede enviar:

```json
{
    "nombre": "Teclado mecánico",
    "descripcion": "Teclado RGB",
    "precio": 50000,
    "stock": 8
}
```

PHP puede leer ese JSON:

```php
$datos = json_decode(
    file_get_contents('php://input'),
    true
);
```

Luego:

```php
$nombre = $datos['nombre'];
$descripcion = $datos['descripcion'];
$precio = $datos['precio'];
$stock = $datos['stock'];
```

Y finalmente insertar utilizando PDO.

---

# 19. Responder correctamente desde la API

Una API debería indicar claramente el resultado.

Por ejemplo:

```php
http_response_code(201);

echo json_encode([
    'mensaje' => 'Producto creado',
    'id' => $pdo->lastInsertId()
]);
```

Podemos devolver diferentes códigos HTTP:

```text
200 → operación correcta

201 → recurso creado

400 → datos incorrectos

401 → no autenticado

403 → acceso prohibido

404 → recurso no encontrado

500 → error del servidor
```

---

# 20. Probar la API

Antes de crear una aplicación móvil podemos probar la API utilizando herramientas como:

```text
Navegador
Postman
Insomnia
curl
```

Para comenzar:

```text
GET
```

se puede probar directamente desde el navegador.

Por ejemplo:

```text
http://localhost/mi-proyecto/api/productos.php
```

Para `POST`, `PUT` y `DELETE` es conveniente utilizar Postman o una herramienta similar.

---

# 21. Diferencia entre sitio web y API

Nuestro proyecto tendrá dos interfaces.

### Sitio web

```text
PHP
HTML
CSS
JavaScript
Sesiones
Formularios
```

Sirve principalmente para:

```text
Usuarios humanos
```

### API

```text
HTTP
JSON
GET
POST
PUT
DELETE
```

Sirve principalmente para:

```text
Aplicaciones móviles
Aplicaciones web
Otros sistemas
```

Ambas pueden trabajar con la misma base de datos.

---

# 22. No duplicar la lógica

Un error común sería hacer:

```text
Sitio web → SQL

API → SQL diferente
```

Esto puede provocar problemas.

Es mejor que la lógica de acceso a datos pueda reutilizarse.

Por ejemplo:

```text
                ┌─────────────┐
                │   MySQL     │
                └──────▲──────┘
                       │
                ┌──────┴──────┐
                │ PHP / Datos │
                └──────▲──────┘
                       │
              ┌────────┴────────┐
              │                 │
          Sitio web            API
```

De esta forma, el sitio web y la API trabajan sobre la misma lógica y los mismos datos.

---
