
---

# 📘 CLASE 2

# 🔐 Validación, Sanitización, Sesiones y Cookies en PHP

---

## 🎯 Objetivos

El estudiante será capaz de:

* Validar datos del usuario
* Sanitizar entradas para evitar ataques
* Implementar sesiones
* Utilizar cookies
* Comprender la gestión de estado en la web

---

## 🧠 1. Problema clave: confiar en el usuario

👉 TODO dato que llega desde el cliente es **potencialmente peligroso**

Ejemplos de ataques:

* XSS (Cross Site Scripting)
* Inyección SQL
* Manipulación de formularios

---

## 🛡️ 2. Validación vs Sanitización

### ✔️ Validación

👉 Verifica si el dato es correcto

```php
if (empty($_POST['email'])) {
    echo "Email obligatorio";
}
```

---

### ✔️ Sanitización

👉 Limpia el dato

```php
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
```

---

## 🔧 3. Funciones útiles

### Validar email

```php
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email válido";
}
```

---

### Limpiar texto

```php
$nombre = htmlspecialchars($_POST['nombre']);
```

---

## 🚨 4. Prevención de XSS

Ejemplo peligroso:

```php
echo $_POST['nombre'];
```

👉 Solución:

```php
echo htmlspecialchars($_POST['nombre']);
```

---

## 🍪 5. Cookies

### 📌 ¿Qué son?

Pequeños datos almacenados en el navegador

---

### Crear cookie

```php
setcookie("usuario", "Juan", time() + 3600);
```

---

### Leer cookie

```php
echo $_COOKIE['usuario'];
```

---

### Eliminar cookie

```php
setcookie("usuario", "", time() - 3600);
```

---

## 🔐 6. Sesiones

### 📌 ¿Qué son?

Permiten mantener información entre páginas (login, carrito, etc.)

---

### Iniciar sesión

```php
session_start();
```

---

### Guardar datos

```php
$_SESSION['usuario'] = "Juan";
```

---

### Leer datos

```php
echo $_SESSION['usuario'];
```

---

### Destruir sesión

```php
session_destroy();
```

---

## 🔄 7. Flujo típico de login

1. Usuario envía formulario
2. PHP valida datos
3. Si es correcto:

   * Se crea sesión
4. Usuario navega autenticado

---

## 🧪 8. Ejemplo completo

```php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $usuario = htmlspecialchars($_POST['usuario']);
    $clave = $_POST['clave'];

    if ($usuario == "admin" && $clave == "1234") {
        $_SESSION['login'] = true;
        echo "Bienvenido";
    } else {
        echo "Error de acceso";
    }
}
```

---

## ⚠️ 9. Buenas prácticas de seguridad

* Nunca confiar en datos del cliente
* Usar `htmlspecialchars`
* Validar SIEMPRE
* Evitar mostrar errores sensibles
* Regenerar sesiones

---

## 🧠 10. Concepto clave: HTTP es sin estado

👉 Cada request es independiente
👉 Sesiones y cookies solucionan esto

---

## 🧪 Actividad conceptual

Analizar:

```php
echo $_POST['comentario'];
```

👉 Preguntas:

* ¿Qué riesgo existe?
* ¿Cómo lo protegerías?
* ¿Qué función usarías?

---

## 📌 Cierre de la unidad

👉 Idea central:

La programación backend no es solo funcionalidad, sino **seguridad y control de datos**.

---

