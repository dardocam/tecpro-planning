# 🧪 TP INTEGRADOR

# 🔐 Sistema de Login y Registro con PHP + MySQL

---

## 🎯 Objetivos

El estudiante deberá:

* Implementar un sistema de **registro de usuarios**
* Crear un sistema de **login seguro**
* Validar y sanear datos del lado del servidor
* Utilizar **sesiones**
* Conectarse a una base de datos MySQL
* Aplicar buenas prácticas de seguridad

---

## 🧱 Estructura del proyecto

```
/proyecto
│
├── index.php           (login)
├── registro.php        (formulario registro)
├── procesar_login.php
├── procesar_registro.php
├── dashboard.php
├── logout.php
│
├── /config
│   └── db.php
│
└── /assets
    └── estilos.css
```

---

## 🗄️ 1. Base de Datos

```sql
CREATE DATABASE sistema_usuarios;

USE sistema_usuarios;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

---

## 🔌 2. Conexión a la base de datos

📄 `/config/db.php`

```php
<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "sistema_usuarios";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
```

---

## 📝 3. Registro de usuario

📄 `registro.php`

```html
<form action="procesar_registro.php" method="POST">
  <input type="text" name="usuario" placeholder="Usuario" required>
  <input type="email" name="email" placeholder="Email" required>
  <input type="password" name="password" placeholder="Contraseña" required>
  <button type="submit">Registrarse</button>
</form>
```

---

## ⚙️ 4. Procesar registro

📄 `procesar_registro.php`

```php
<?php
require 'config/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $usuario = htmlspecialchars($_POST['usuario']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    // Validaciones
    if (empty($usuario) || empty($email) || empty($password)) {
        die("Todos los campos son obligatorios");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Email inválido");
    }

    // Hash de contraseña
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Insertar
    $stmt = $conn->prepare("INSERT INTO usuarios (usuario, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $usuario, $email, $passwordHash);

    if ($stmt->execute()) {
        echo "Usuario registrado correctamente";
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>
```

---

## 🔐 5. Login

📄 `index.php`

```html
<form action="procesar_login.php" method="POST">
  <input type="text" name="usuario" placeholder="Usuario" required>
  <input type="password" name="password" placeholder="Contraseña" required>
  <button type="submit">Ingresar</button>
</form>
```

---

## ⚙️ 6. Procesar login

📄 `procesar_login.php`

```php
<?php
session_start();
require 'config/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $usuario = htmlspecialchars($_POST['usuario']);
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows == 1) {

        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {

            $_SESSION['usuario'] = $user['usuario'];
            header("Location: dashboard.php");

        } else {
            echo "Contraseña incorrecta";
        }

    } else {
        echo "Usuario no encontrado";
    }
}
?>
```

---

## 🏠 7. Dashboard (área privada)

📄 `dashboard.php`

```php
<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: index.php");
    exit();
}
?>

<h1>Bienvenido <?php echo $_SESSION['usuario']; ?></h1>
<a href="logout.php">Cerrar sesión</a>
```

---

## 🚪 8. Logout

📄 `logout.php`

```php
<?php
session_start();
session_destroy();

header("Location: index.php");
?>
```

---

## 🛡️ 9. Validaciones implementadas

✔ Campos obligatorios
✔ Validación de email
✔ Sanitización de datos
✔ Uso de `password_hash()`
✔ Uso de `password_verify()`
✔ Uso de consultas preparadas (prevención SQL Injection)

---

## ⚠️ 10. Mejoras recomendadas (nivel profesional)

👉 Esto es clave para subir de nivel:

* Confirmación de contraseña
* Mensajes de error amigables (no `die()`)
* Token CSRF
* Regenerar sesión:

```php
session_regenerate_id(true);
```

* Manejo de intentos fallidos (anti fuerza bruta)
* Validaciones del lado del cliente (JS)

---

## 🎓 Consigna del TP

El estudiante debe:

1. Implementar todo el sistema funcional
2. Agregar:

   * Confirmación de contraseña
   * Validación de longitud mínima
3. Mejorar la interfaz (CSS)
4. Proteger rutas privadas
5. Documentar el flujo del sistema

---

## 📊 Rúbrica de evaluación

| Criterio                               | Puntaje |
| -------------------------------------- | ------- |
| Registro funcional                     | 2 pts   |
| Login funcional                        | 2 pts   |
| Uso de sesiones                        | 2 pts   |
| Validaciones correctas                 | 2 pts   |
| Seguridad (hash + prepared statements) | 1 pt    |
| Organización del código                | 1 pt    |

---

## 🚀 Bonus (para destacar)

* Panel de administración
* CRUD de usuarios
* Recordar sesión con cookies
* API REST con PHP

---

## 🧠 Cierre

Este TP no es “un ejercicio más”.

👉 Es la base de:

* Cualquier sistema web real
* Aplicaciones con usuarios
* Sistemas profesionales

---
