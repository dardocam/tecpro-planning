
# 🚀 CLASE 4 : MINI FRAMEWORK MVC (PHP PURO)

# 🧱 1. ESTRUCTURA FINAL

```txt
/proyecto
│
├── index.php
│
├── /core
│   ├── Router.php
│   ├── Controller.php
│   ├── Database.php
│   └── helpers.php
│
├── /controllers
│   ├── AuthController.php
│   └── HomeController.php
│
├── /models
│   └── User.php
│
└── /views
    ├── /layouts
    │   ├── main.php
    │   └── auth.php
    │
    ├── /partials
    │   ├── header.php
    │   └── footer.php
    │
    └── /pages
        ├── login.php
        ├── register.php
        └── dashboard.php
```

---

# 🚪 2. FRONT CONTROLLER

📄 `index.php`

```php
<?php

session_start();

require 'core/helpers.php';
require 'core/Router.php';

$router = new Router();

// Rutas
$router->get('/', 'HomeController@index');

$router->get('/login', 'AuthController@loginForm');
$router->post('/login', 'AuthController@login');

$router->get('/register', 'AuthController@registerForm');
$router->post('/register', 'AuthController@register');

$router->get('/dashboard', 'HomeController@dashboard');
$router->get('/logout', 'AuthController@logout');

$router->run();
```

---

# 🔀 3. ROUTER

📄 `core/Router.php`

```php
<?php

class Router {

    private $routes = [];

    public function get($uri, $action) {
        $this->routes['GET'][$uri] = $action;
    }

    public function post($uri, $action) {
        $this->routes['POST'][$uri] = $action;
    }

    public function run() {

        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $method = $_SERVER['REQUEST_METHOD'];

        if (!isset($this->routes[$method][$uri])) {
            echo "404 - Página no encontrada";
            return;
        }

        list($controllerName, $methodName) = explode('@', $this->routes[$method][$uri]);

        require "controllers/$controllerName.php";

        $controller = new $controllerName();
        $controller->$methodName();
    }
}
```

---

# 🧠 4. CONTROLADOR BASE (MEJORADO)

📄 `core/Controller.php`

```php
<?php

class Controller {

    public function view($view, $data = [], $layout = 'main') {

        extract($data);

        $viewPath = "views/pages/$view.php";

        require "views/layouts/$layout.php";
    }

    public function redirect($url) {
        header("Location: $url");
        exit();
    }
}
```

---

# 🔌 5. BASE DE DATOS

📄 `core/Database.php`

```php
<?php

class Database {

    public static function connect() {
        return new PDO(
            "mysql:host=localhost;dbname=mvc_app",
            "root",
            "",
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    }
}
```

---

# 🛠️ 6. HELPERS

📄 `core/helpers.php`

```php
<?php

function e($text) {
    return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}
```

---

# 🧠 7. MODELO

📄 `models/User.php`

```php
<?php

require_once 'core/Database.php';

class User {

    private $conn;

    public function __construct() {
        $this->conn = Database::connect();
    }

    public function create($email, $password) {

        $stmt = $this->conn->prepare(
            "INSERT INTO users (email, password) VALUES (?, ?)"
        );

        return $stmt->execute([$email, $password]);
    }

    public function findByEmail($email) {

        $stmt = $this->conn->prepare(
            "SELECT * FROM users WHERE email = ?"
        );

        $stmt->execute([$email]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
```

---

# 🔐 8. AUTH CONTROLLER

📄 `controllers/AuthController.php`

```php
<?php

require_once 'core/Controller.php';
require_once 'models/User.php';

class AuthController extends Controller {

    public function loginForm() {
        $this->view('login', [], 'auth');
    }

    public function registerForm() {
        $this->view('register', [], 'auth');
    }

    public function register() {

        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->view('register', ['error' => 'Email inválido'], 'auth');
            return;
        }

        $hash = password_hash($password, PASSWORD_BCRYPT);

        $user = new User();
        $user->create($email, $hash);

        $this->redirect('/login');
    }

    public function login() {

        $email = $_POST['email'];
        $password = $_POST['password'];

        $userModel = new User();
        $user = $userModel->findByEmail($email);

        if ($user && password_verify($password, $user['password'])) {

            $_SESSION['user'] = $user['email'];

            $this->redirect('/dashboard');

        } else {
            $this->view('login', ['error' => 'Credenciales incorrectas'], 'auth');
        }
    }

    public function logout() {
        session_destroy();
        $this->redirect('/login');
    }
}
```

---

# 🏠 9. HOME CONTROLLER

📄 `controllers/HomeController.php`

```php
<?php

require_once 'core/Controller.php';

class HomeController extends Controller {

    public function index() {
        $this->redirect('/login');
    }

    public function dashboard() {

        if (!isset($_SESSION['user'])) {
            $this->redirect('/login');
        }

        $this->view('dashboard', [
            'user' => $_SESSION['user']
        ]);
    }
}
```

---

# 🎨 10. LAYOUTS

---

## 📄 `views/layouts/main.php`

```php
<!DOCTYPE html>
<html>
<body>

<?php require "views/partials/header.php"; ?>

<main>
    <?php require $viewPath; ?>
</main>

<?php require "views/partials/footer.php"; ?>

</body>
</html>
```

---

## 📄 `views/layouts/auth.php`

```php
<!DOCTYPE html>
<html>
<body>

<h2>Zona pública</h2>

<?php require $viewPath; ?>

</body>
</html>
```

---

# 🧩 11. PARTIALS

---

## 📄 `views/partials/header.php`

```php
<nav>
    <a href="/login">Login</a> |
    <a href="/register">Registro</a> |
    <a href="/dashboard">Dashboard</a> |
    <a href="/logout">Logout</a>
</nav>
<hr>
```

---

## 📄 `views/partials/footer.php`

```php
<hr>
<p>Mini Framework MVC</p>
```

---

# 📄 12. VISTAS

---

## 📄 `views/pages/login.php`

```php
<h3>Login</h3>

<?php if (isset($error)): ?>
    <p style="color:red"><?= e($error) ?></p>
<?php endif; ?>

<form method="POST" action="/login">
    <input type="email" name="email" required>
    <input type="password" name="password" required>
    <button>Ingresar</button>
</form>
```

---

## 📄 `views/pages/register.php`

```php
<h3>Registro</h3>

<?php if (isset($error)): ?>
    <p style="color:red"><?= e($error) ?></p>
<?php endif; ?>

<form method="POST" action="/register">
    <input type="email" name="email" required>
    <input type="password" name="password" required>
    <button>Registrarse</button>
</form>
```

---

## 📄 `views/pages/dashboard.php`

```php
<h3>Dashboard</h3>

<p>Bienvenido <?= e($user) ?></p>
```

---

# 🗄️ 13. BASE DE DATOS

```sql
CREATE DATABASE mvc_app;

USE mvc_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);
```

---

# 🧠 RESULTADO FINAL

👉 Tenés un sistema con:

* Arquitectura MVC real
* Sistema de vistas reutilizable
* Login completo
* Seguridad básica correcta
* Código organizado

---



# 📘 CLASE COMPLETA

# 🚀 Mini Framework MVC en PHP (Explicación Total)

---

## 🎯 Objetivos de la clase

Al finalizar, el estudiante podrá:

* Comprender cómo funciona un framework MVC desde cero
* Entender el flujo completo de una aplicación web
* Interpretar el uso de URLs y rutas
* Diferenciar responsabilidades (MVC)
* Modificar y extender el sistema

---

# 🧠 1. ¿Qué estamos construyendo?

👉 Un **mini framework MVC en PHP**

Esto significa:

* No usamos frameworks externos
* Todo lo construimos nosotros
* Entendemos cómo funciona por dentro

---

# 🧱 2. Estructura del proyecto

```txt
/proyecto
│
├── index.php
├── /core
├── /controllers
├── /models
└── /views
```

---

## 📌 ¿Qué hace cada carpeta?

| Carpeta     | Función                   |
| ----------- | ------------------------- |
| core        | lógica base del framework |
| controllers | controladores             |
| models      | acceso a datos            |
| views       | interfaz (HTML)           |

---

# 🌐 3. ¿Cómo funcionan las URLs?

---

## 📌 Ejemplos

```txt
http://localhost/login
http://localhost/register
http://localhost/dashboard
```

---

## 🧠 ¿Qué pasa cuando accedemos a una URL?

👉 TODO entra por:

📄 `index.php`

---

# 🚪 4. FRONT CONTROLLER (index.php)

```php
$router->get('/login', 'AuthController@loginForm');
```

---

## 🔍 ¿Qué significa?

👉 Cuando el usuario entra a:

```txt
/login
```

👉 Se ejecuta:

```php
AuthController → loginForm()
```

---

# 🔀 5. EL ROUTER (el traductor de URLs)

---

## 📄 `Router.php`

👉 Se encarga de:

* Leer la URL
* Detectar método (GET / POST)
* Llamar al controlador correcto

---

## 🧠 Flujo interno

```txt
URL → Router → Controlador → Método
```

---

# 🎮 6. CONTROLADORES

---

## 📌 ¿Qué hacen?

* Reciben la petición
* Procesan lógica
* Llaman al modelo
* Devuelven una vista

---

## 📄 Ejemplo

```php
public function loginForm() {
    $this->view('login');
}
```

---

# 🔐 7. FLUJO DEL LOGIN (completo)

---

## 🧩 Paso a paso

1. Usuario entra a `/login`
2. Router llama a `AuthController@loginForm`
3. Se carga la vista `login.php`
4. Usuario envía formulario (POST)
5. Router llama a `AuthController@login`
6. Se validan datos
7. Se crea sesión
8. Redirige a `/dashboard`

---

# 🎨 8. SISTEMA DE VISTAS (MUY IMPORTANTE)

---

## 📁 Estructura

```txt
/views
├── layouts
├── partials
└── pages
```

---

## 🧠 Concepto clave

👉 Separar:

* Layout (estructura general)
* Partials (componentes)
* Pages (contenido)

---

# 🧩 9. LAYOUT

📄 `views/layouts/main.php`

```php
<?php require "views/partials/header.php"; ?>

<?php require $viewPath; ?>

<?php require "views/partials/footer.php"; ?>
```

---

👉 Es la “plantilla base”

---

# 🧩 10. PARTIALS

---

## 📄 header.php

```php
<nav>
    <a href="/login">Login</a>
</nav>
```

---

👉 Se reutilizan en todas las páginas

---

# 📄 11. PÁGINAS (VISTAS)

---

## 📄 login.php

```php
<form method="POST" action="/login">
    <input name="email">
</form>
```

---

👉 Solo contienen HTML + datos

---

# 🧠 12. ¿Cómo llegan los datos a la vista?

---

## 📌 Desde el controlador

```php
$this->view('login', [
    'error' => 'Error de login'
]);
```

---

## 📌 En la vista

```php
<?= $error ?>
```

---

## 🔍 Gracias a:

```php
extract($data);
```

---

# 🔐 13. SESIONES (login real)

---

## 📌 Guardar usuario

```php
$_SESSION['user'] = $user['email'];
```

---

## 📌 Proteger rutas

```php
if (!isset($_SESSION['user'])) {
    $this->redirect('/login');
}
```

---

# 🔁 14. REDIRECCIONES

---

```php
$this->redirect('/dashboard');
```

👉 Internamente:

```php
header("Location: /dashboard");
```

---

# 🗄️ 15. MODELOS (acceso a datos)

---

## 📄 `User.php`

```php
public function findByEmail($email) {
    // consulta DB
}
```

---

👉 Se encargan de:

* Consultar
* Insertar
* Actualizar datos

---

# 🔌 16. BASE DE DATOS

---

## 📌 Conexión con PDO

```php
new PDO(...)
```

---

## 📌 Tabla

```sql
users (id, email, password)
```

---

# 🛡️ 17. SEGURIDAD

---

## ✔️ Hash de contraseña

```php
password_hash()
```

---

## ✔️ Verificación

```php
password_verify()
```

---

## ✔️ Escape HTML

```php
<?= e($user) ?>
```

---

# 🔄 18. FLUJO COMPLETO DEL SISTEMA

```txt
Usuario → URL → Router → Controlador → Modelo → DB
                                     ↓
                                 Vista → Usuario
```

---

# ⚠️ 19. ERRORES COMUNES

---

❌ Mezclar HTML con lógica
❌ No validar datos
❌ No usar sesiones correctamente
❌ No separar responsabilidades

---

# 🧪 20. ACTIVIDAD PRÁCTICA

---

## 🎯 Consigna

Modificar el sistema para:

* Agregar campo “nombre” en registro
* Mostrar nombre en dashboard

---

## 🧩 Pistas

* Modificar tabla
* Modificar modelo
* Modificar vista

---

# 🧠 21. CONCEPTO FINAL

---

👉 Este mini framework reproduce lo que hacen herramientas reales como:

* Laravel
* Symfony

---

👉 Pero vos lo entendés desde adentro

---

# 🚀 22. Siguiente nivel

Si querés continuar:

* Middleware (protección automática)
* Flash messages
* CRUD completo
* API REST
* Integración con frontend moderno

---

# 🧩 CIERRE

👉 Si entendés esta clase, ya no estás aprendiendo “PHP básico”

👉 Estás entendiendo **arquitectura web profesional**

---

