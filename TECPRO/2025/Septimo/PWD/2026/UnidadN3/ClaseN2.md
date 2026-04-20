# 📘 CLASE 2

# 🔗 PHP + MySQL + CRUD + Integración Profesional

---

## 🎯 Objetivos

* Integrar PHP con MySQL correctamente
* Ejecutar consultas SQL seguras
* Implementar CRUD completo
* Entender flujo real de una aplicación

---

# 🔌 1. Conexión con PDO (profesional)

```php
<?php
try {
    $conn = new PDO("mysql:host=localhost;dbname=sistema", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

---

# 🔄 2. Flujo real de datos

1. Usuario interactúa (formulario)
2. PHP recibe datos
3. Valida y sanitiza
4. Ejecuta SQL
5. MySQL responde
6. PHP devuelve resultado

---

# 🧩 3. CRUD completo (profesional)

---

## ➕ CREATE

```php
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email) VALUES (?, ?)");
$stmt->execute([$nombre, $email]);
```

---

## 🔍 READ

```php
$stmt = $conn->query("SELECT * FROM usuarios");
$usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
```

---

## ✏️ UPDATE

```php
$stmt = $conn->prepare("UPDATE usuarios SET nombre = ? WHERE id = ?");
$stmt->execute([$nombre, $id]);
```

---

## ❌ DELETE

```php
$stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
$stmt->execute([$id]);
```

---

# 🔗 4. Consultas con relaciones (JOIN)

---

## 📌 INNER JOIN

```sql
SELECT usuarios.nombre, posts.titulo
FROM usuarios
INNER JOIN posts ON usuarios.id = posts.usuario_id;
```

👉 Trae datos relacionados

---

## 📌 Ejemplo N:M

```sql
SELECT alumnos.nombre, cursos.nombre
FROM alumno_curso
JOIN alumnos ON alumno_curso.alumno_id = alumnos.id
JOIN cursos ON alumno_curso.curso_id = cursos.id;
```

---

# 🛡️ 5. Seguridad (obligatorio)

---

## ❌ SQL Injection

```php
$query = "SELECT * FROM usuarios WHERE email = '$email'";
```

---

## ✅ Solución

```php
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
```

---

# 🧠 6. Validación + Sanitización

```php
$nombre = htmlspecialchars($_POST['nombre']);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
```

---

# ⚙️ 7. Ejemplo integrado (flujo real)

```php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nombre = htmlspecialchars($_POST['nombre']);

    if (empty($nombre)) {
        echo "Campo obligatorio";
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO usuarios (nombre) VALUES (?)");
    $stmt->execute([$nombre]);

    echo "Guardado correctamente";
}
```

---

# 🧱 8. Organización profesional (muy importante)

👉 No mezclar todo en un archivo

Separar:

* Conexión (`db.php`)
* Lógica (controladores)
* Vistas (HTML)

👉 Base de MVC

---

# ⚠️ 9. Errores comunes

❌ No usar prepared statements
❌ No validar datos
❌ No manejar errores
❌ Código desordenado
❌ Consultas innecesarias

---

# 🧪 10. Actividad práctica

Desarrollar:

👉 Sistema de gestión de productos

Debe incluir:

* CRUD completo
* Relación con categorías
* Uso de JOIN
* Validaciones

---

# 📊 Rúbrica

| Criterio                      | Puntaje |
| ----------------------------- | ------- |
| CRUD funcional                | 3       |
| Relaciones bien implementadas | 2       |
| Uso de JOIN                   | 2       |
| Seguridad                     | 2       |
| Organización                  | 1       |

---

# 🧠 Cierre de la unidad

👉 PHP + MySQL no es solo código:

Es:

* Diseño
* Seguridad
* Arquitectura
* Pensamiento lógico

---

