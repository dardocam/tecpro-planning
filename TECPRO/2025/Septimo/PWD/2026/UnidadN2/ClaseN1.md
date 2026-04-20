# 📘 CLASE 1

# 🧠 PHP y Formularios Web (GET, POST y Procesamiento del Lado del Servidor)

---

## 🎯 Objetivos de la clase

Al finalizar esta clase, el estudiante podrá:

* Comprender el rol de PHP en el backend
* Diferenciar métodos **GET vs POST**
* Procesar formularios HTML con PHP
* Acceder y manipular datos enviados por el usuario
* Aplicar buenas prácticas iniciales

---

## 🌐 1. ¿Qué es PHP?

PHP (**Hypertext Preprocessor**) es un lenguaje de programación que se ejecuta en el **servidor**.

👉 Flujo básico:

1. El usuario envía un formulario
2. El servidor ejecuta PHP
3. PHP procesa los datos
4. Devuelve una respuesta HTML

---

## ⚙️ 2. Integración HTML + PHP

Ejemplo básico:

```html
<form action="procesar.php" method="POST">
  <input type="text" name="nombre">
  <button type="submit">Enviar</button>
</form>
```

Archivo `procesar.php`:

```php
<?php
$nombre = $_POST['nombre'];
echo "Hola " . $nombre;
?>
```

---

## 🔁 3. Métodos de envío: GET vs POST

### 📌 Método GET

* Los datos viajan en la URL
* Visible
* Limitado en tamaño
* No seguro

Ejemplo:

```
pagina.php?nombre=Juan
```

```php
$nombre = $_GET['nombre'];
```

---

### 📌 Método POST

* Datos ocultos (no visibles en URL)
* Más seguro
* Sin límite práctico de tamaño

```php
$nombre = $_POST['nombre'];
```

---

## ⚖️ Comparación

| Característica  | GET       | POST        |
| --------------- | --------- | ----------- |
| Visible         | ✅         | ❌           |
| Seguridad       | ❌         | ✅           |
| Tamaño          | Limitado  | Mayor       |
| Uso recomendado | Búsquedas | Formularios |

---

## 🧩 4. Variables superglobales

PHP provee variables especiales:

* `$_GET`
* `$_POST`
* `$_REQUEST`
* `$_SERVER`

Ejemplo:

```php
echo $_SERVER['REQUEST_METHOD'];
```

---

## 🧪 5. Ejemplo completo

### HTML

```html
<form action="datos.php" method="POST">
  <input type="text" name="usuario" placeholder="Usuario">
  <input type="email" name="email" placeholder="Email">
  <button type="submit">Enviar</button>
</form>
```

### PHP

```php
<?php
$usuario = $_POST['usuario'];
$email = $_POST['email'];

echo "Usuario: " . $usuario . "<br>";
echo "Email: " . $email;
?>
```

---

## ⚠️ 6. Problemas comunes

* Variables no definidas
* Acceso directo al script sin formulario
* Campos vacíos

👉 Solución básica:

```php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // procesar
}
```

---

## 🧠 7. Buenas prácticas iniciales

* Verificar método de envío
* No confiar en el usuario
* Separar HTML y lógica
* Usar nombres claros

---

## 🧪 Actividad conceptual

Analizar:

```php
$nombre = $_GET['nombre'];
```

👉 Preguntas:

* ¿Qué pasa si no existe el dato?
* ¿Es seguro?
* ¿Cómo lo mejorarías?

---

## 📌 Cierre de la clase

👉 Idea clave:
PHP permite **recibir y procesar información del usuario**, pero esto implica riesgos si no se controla.

---
