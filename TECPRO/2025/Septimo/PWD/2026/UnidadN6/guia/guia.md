# Guía de proyecto

## Sitio web en PHP tradicional + MySQL + API para aplicaciones móviles

### 1. Objetivo del proyecto

El objetivo es desarrollar un sitio web dinámico utilizando:

* HTML5
* CSS3
* PHP
* MySQL
* JavaScript

Además, el sistema deberá disponer de una **API REST** que permita que una aplicación móvil pueda consultar y modificar información.

La idea general será:

```text
                    ┌──────────────────┐
                    │    BASE DE DATOS │
                    │      MySQL       │
                    └────────┬─────────┘
                             │
                       PHP + PDO
                             │
              ┌──────────────┴──────────────┐
              │                             │
       ┌──────▼──────┐               ┌──────▼──────┐
       │ SITIO WEB   │               │     API     │
       │ PHP + HTML  │               │   REST/JSON │
       └──────┬──────┘               └──────┬──────┘
              │                             │
          Navegador                  App móvil / React
```

Un mismo sistema tendrá entonces **dos formas de acceso**:

```text
Usuario → navegador → sitio PHP

App móvil → HTTP → API PHP → base de datos
```

---

# 2. Antes de comenzar

Necesitás tener instalado un entorno de desarrollo.

Para trabajar de manera sencilla podés utilizar:

* XAMPP
* Apache
* PHP
* MySQL/MariaDB
* phpMyAdmin
* Visual Studio Code
* Navegador web

En Linux también pueden utilizarse Apache, PHP y MariaDB instalados directamente.

Para este proyecto vamos a suponer que el servidor web utiliza:

```text
http://localhost/
```

---

# 3. Crear el proyecto

Dentro de la carpeta correspondiente al servidor web vamos a crear:

```text
mi-proyecto/
```

Por ejemplo, con XAMPP:

```text
htdocs/
└── mi-proyecto/
```

La primera prueba será crear:

```text
index.php
```

con:

```php
<?php

echo "Hola mundo";

?>
```

Abrimos:

```text
http://localhost/mi-proyecto/
```

Si aparece:

```text
Hola mundo
```

el servidor PHP está funcionando correctamente.

---

# 4. Pensar primero el proyecto

Antes de escribir código debemos responder:

### ¿Qué sistema vamos a desarrollar?

Algunos ejemplos:

* catálogo de productos
* biblioteca
* sistema de noticias
* tienda online
* gestión de eventos
* sistema de turnos
* biblioteca escolar
* sistema de películas

Para comenzar conviene elegir un problema pequeño.

Por ejemplo:

> Sistema de productos.

El sistema tendrá:

```text
Producto
---------
id
nombre
descripcion
precio
stock
```

Después podemos ampliarlo.

---

# 5. Crear la base de datos

Entramos a:

```text
http://localhost/phpmyadmin
```

Creamos una base de datos:

```text
mi_proyecto
```

Luego creamos la tabla:

```sql
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0
);
```

Agregamos algunos datos de prueba:

```sql
INSERT INTO productos
(nombre, descripcion, precio, stock)
VALUES
('Teclado', 'Teclado USB', 25000, 10),
('Mouse', 'Mouse inalámbrico', 18000, 15),
('Monitor', 'Monitor LED 24 pulgadas', 150000, 5);
```

---

# 6. Organizar las carpetas

No vamos a poner todo el código en `index.php`.

Una estructura inicial sencilla puede ser:

```text
mi-proyecto/
│
├── index.php
│
├── config/
│   └── database.php
│
├── includes/
│   ├── header.php
│   └── footer.php
│
├── productos/
│   ├── index.php
│   ├── crear.php
│   ├── editar.php
│   └── eliminar.php
│
├── api/
│   └── productos.php
│
├── public/
│   ├── css/
│   │   └── estilos.css
│   │
│   └── js/
│       └── app.js
│
└── README.md
```

La estructura debe mantenerse simple.

Más adelante puede evolucionar.

---

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

---

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

---

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

---

# 12. CRUD

Nuestro sistema debería evolucionar hacia un CRUD.

CRUD significa:

```text
C → Create
R → Read
U → Update
D → Delete
```

En español:

```text
Crear
Consultar
Modificar
Eliminar
```

Para productos tendremos:

```text
productos/
├── index.php
├── crear.php
├── editar.php
└── eliminar.php
```

La meta inicial será completar el CRUD desde la web.

---

# 13. ¿Dónde aparece la API?

Una API permitirá que otro programa consulte nuestro sistema.

Por ejemplo:

```text
Aplicación móvil
       │
       │ HTTP
       ▼
api/productos.php
       │
       ▼
     MySQL
```

La diferencia fundamental es que el sitio web normalmente devuelve:

```text
HTML
```

mientras que la API devolverá:

```text
JSON
```

Por ejemplo:

```json
[
    {
        "id": 1,
        "nombre": "Teclado",
        "precio": 25000,
        "stock": 10
    },
    {
        "id": 2,
        "nombre": "Mouse",
        "precio": 18000,
        "stock": 15
    }
]
```

---

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

# 23. Seguridad básica

Desde el principio debemos aplicar algunas reglas.

### Nunca colocar directamente datos del usuario en SQL

Evitar:

```php
$sql = "SELECT * FROM productos WHERE id = $_GET[id]";
```

Preferir:

```php
$stmt = $pdo->prepare(
    "SELECT * FROM productos WHERE id = :id"
);

$stmt->execute([
    ':id' => $id
]);
```

### Escapar datos al generar HTML

Utilizar:

```php
htmlspecialchars()
```

Por ejemplo:

```php
<?= htmlspecialchars($producto['nombre']) ?>
```

### Validar datos

No debemos confiar en:

```text
$_GET
$_POST
JSON
```

Siempre debemos verificar:

```text
¿Existe?
¿Tiene el tipo correcto?
¿Está dentro del rango permitido?
¿Es obligatorio?
```

### No mostrar errores internos al usuario

Durante el desarrollo podemos mostrar errores.

En producción no debemos revelar información como:

```text
consultas SQL
rutas del servidor
credenciales
estructura interna
```

---

# 24. Más adelante: usuarios y sesiones

Una vez terminado el CRUD podemos agregar:

```text
Usuarios
Login
Logout
Sesiones
Roles
Permisos
```

Por ejemplo:

```text
usuario
---------
id
nombre
email
password
rol
```

La contraseña nunca debe almacenarse directamente.

PHP ofrece:

```php
password_hash()
```

para almacenar contraseñas de manera segura.

Para validar:

```php
password_verify()
```

---

# 25. API y autenticación

Cuando la aplicación móvil empiece a utilizar información privada, no debería existir algo como:

```text
/api/usuarios.php
```

que permita consultar información sin ningún control.

La API tendrá que incorporar mecanismos de autenticación.

En una primera etapa educativa pueden trabajar con sesiones o una clave sencilla para comprender el concepto.

Más adelante podrán estudiar:

```text
Tokens
JWT
OAuth
HTTPS
```

No es necesario implementar todo eso en la primera versión.

---

# 26. Primera versión recomendada

El proyecto puede dividirse en etapas.

### Etapa 1 — Sitio básico

Crear:

```text
index.php
```

y una estructura HTML/CSS.

### Etapa 2 — Base de datos

Crear:

```text
mi_proyecto
```

y las tablas necesarias.

### Etapa 3 — Conexión PHP + MySQL

Implementar:

```text
config/database.php
```

### Etapa 4 — CRUD

Completar:

```text
Crear
Consultar
Modificar
Eliminar
```

### Etapa 5 — API

Implementar:

```text
GET
POST
PUT
DELETE
```

### Etapa 6 — JavaScript

Agregar interacción mediante:

```text
fetch()
```

### Etapa 7 — Aplicación móvil

Crear una aplicación que consuma:

```text
API PHP
```

---

# 27. Proyecto mínimo esperado

Al finalizar la primera versión, el estudiante debería tener:

```text
mi-proyecto/
│
├── index.php
│
├── config/
│   └── database.php
│
├── productos/
│   ├── index.php
│   ├── crear.php
│   ├── editar.php
│   └── eliminar.php
│
├── api/
│   └── productos.php
│
├── public/
│   ├── css/
│   │   └── estilos.css
│   │
│   └── js/
│       └── app.js
│
└── README.md
```

Y deberá poder:

```text
✓ Mostrar información desde MySQL
✓ Crear registros
✓ Modificar registros
✓ Eliminar registros
✓ Consultar registros mediante API
✓ Devolver JSON
✓ Recibir datos mediante HTTP
✓ Utilizar consultas preparadas
✓ Validar datos
```

---

# 28. Primera prueba completa

El sistema debería permitir realizar este recorrido:

```text
1. Abrir el sitio

http://localhost/mi-proyecto/


2. Entrar en productos

/productos/


3. Crear un producto

/productos/crear.php


4. Guardarlo

        ↓

       MySQL


5. Volver al listado

/productos/


6. Consultar los mismos datos mediante la API

/api/productos.php
```

Esto demuestra algo muy importante:

```text
UN SISTEMA
     │
     ├── Sitio web PHP
     │
     └── API
             │
             └── Misma base de datos
```

---

# 29. Concepto fundamental

No debemos pensar que estamos construyendo:

```text
"una página web y después una API"
```

La idea correcta es:

```text
                 SISTEMA
                    │
             ┌──────┴──────┐
             │             │
          WEB PHP         API
             │             │
             └──────┬──────┘
                    │
                 DATOS
                    │
                  MySQL
```

El sitio web y la aplicación móvil son **dos clientes diferentes del mismo sistema**.

---

# 30. Actividad inicial

## Consigna

Crear un sitio web dinámico utilizando PHP tradicional y MySQL.

El sistema deberá resolver una problemática elegida por el estudiante y deberá permitir realizar un CRUD sobre al menos una entidad.

Ejemplos:

```text
Productos
Libros
Películas
Cursos
Eventos
Noticias
Mascotas
Turnos
```

Además, deberá implementarse una API que permita consultar la información almacenada en la base de datos utilizando JSON.

### Primera entrega

El proyecto deberá tener:

```text
1. Base de datos funcionando.
2. Conexión PHP + MySQL.
3. Listado de registros.
4. Alta de registros.
5. Modificación de registros.
6. Eliminación de registros.
7. API GET.
8. Respuesta en formato JSON.
9. Código organizado en carpetas.
10. README con instrucciones para ejecutar el proyecto.
```

### Objetivo de aprendizaje

Al finalizar esta etapa, el estudiante deberá comprender la diferencia entre:

```text
Frontend
Backend
Base de datos
Servidor web
PHP
SQL
HTTP
API
JSON
```

y cómo todos estos elementos se integran en un mismo sistema.

---

# 31. Checklist del estudiante

Antes de considerar terminada esta etapa:

```text
[ ] El servidor Apache funciona.
[ ] PHP funciona.
[ ] MySQL funciona.
[ ] La base de datos fue creada.
[ ] PHP puede conectarse a MySQL.
[ ] Se pueden consultar datos.
[ ] Se pueden insertar datos.
[ ] Se pueden modificar datos.
[ ] Se pueden eliminar datos.
[ ] Se utilizan consultas preparadas.
[ ] Se validan los datos.
[ ] Los datos HTML se escapan correctamente.
[ ] Existe una API.
[ ] La API devuelve JSON.
[ ] La API puede ser consultada mediante HTTP.
[ ] El proyecto está organizado.
[ ] Existe un README.
```

## Regla de trabajo

No comenzar agregando muchas tecnologías.

Primero lograr:

```text
PHP → MySQL → CRUD
```

Después:

```text
PHP → API → JSON
```

Y finalmente:

```text
Aplicación móvil → API → PHP → MySQL
```

De esta manera cada etapa agrega una pieza nueva sin perder de vista cómo funciona el sistema completo.
