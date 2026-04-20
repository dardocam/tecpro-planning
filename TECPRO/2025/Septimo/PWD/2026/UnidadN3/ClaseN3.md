# 📘 CLASE 3

# 🧠 ¿Por qué usar MVC? + Introducción básica

---

## 🎯 Objetivos de la clase

Al finalizar, el estudiante podrá:

* Comprender el problema de no usar estructura
* Entender qué es MVC
* Identificar cada parte (Modelo, Vista, Controlador)
* Aplicar un primer ejemplo simple

---

# 🧠 1. El problema: programar “todo junto”

---

## 🧩 Ejemplo típico (mal enfoque)

```php
<?php

$conn = new mysqli("localhost", "root", "", "sistema");

$result = $conn->query("SELECT * FROM usuarios");

echo "<h1>Usuarios</h1>";

while ($row = $result->fetch_assoc()) {
    echo "<p>" . $row['nombre'] . "</p>";
}
?>
```

---

## ❌ ¿Qué está mal acá?

👉 Todo está mezclado:

* Conexión a base de datos ❌
* Lógica ❌
* HTML ❌

---

## 🚨 Problemas reales

* Difícil de mantener
* Difícil de escalar
* Código desordenado
* Reutilización imposible
* Errores difíciles de detectar

---

## 🧠 Analogía simple

👉 Es como construir una casa donde:

* El electricista
* El plomero
* El arquitecto

👉 hacen todo juntos en el mismo lugar

Resultado: caos

---

# 💡 2. La solución: separar responsabilidades

---

👉 Dividir el sistema en partes:

* Datos
* Lógica
* Interfaz

---

# 🧱 3. ¿Qué es MVC?

MVC significa:

* **Modelo (Model)**
* **Vista (View)**
* **Controlador (Controller)**

---

## 🧠 Idea clave

👉 Cada parte tiene **una responsabilidad clara**

---

# 🎮 4. El Controlador (Controller)

👉 Es el **cerebro**

Se encarga de:

* Recibir la petición
* Procesar lógica
* Pedir datos al modelo
* Enviar datos a la vista

---

## Ejemplo simple

```php
public function listar() {
    $usuarios = ["Juan", "Ana"];
    require "views/usuarios.php";
}
```

---

# 🗄️ 5. El Modelo (Model)

👉 Es el que maneja los datos

Se encarga de:

* Consultar la base de datos
* Insertar datos
* Actualizar datos

---

## Ejemplo

```php
public function getUsuarios() {
    return ["Juan", "Ana"];
}
```

---

# 🎨 6. La Vista (View)

👉 Es lo que ve el usuario

Se encarga de:

* Mostrar HTML
* Mostrar datos

---

## Ejemplo

```php
<h1>Usuarios</h1>

<?php foreach ($usuarios as $u): ?>
    <p><?= $u ?></p>
<?php endforeach; ?>
```

---

# 🔄 7. ¿Cómo trabajan juntos?

---

## 🔁 Flujo MVC

1. Usuario entra a una URL
2. El **Controlador** recibe la petición
3. El controlador pide datos al **Modelo**
4. El modelo devuelve datos
5. El controlador envía datos a la **Vista**
6. La vista genera HTML

---

## 🧠 Representación mental

```
Usuario → Controlador → Modelo → Controlador → Vista → Usuario
```

---

# ⚖️ 8. Comparación clave

| Sin MVC             | Con MVC           |
| ------------------- | ----------------- |
| Todo mezclado       | Todo separado     |
| Difícil de mantener | Fácil de mantener |
| Código caótico      | Código organizado |
| No escalable        | Escalable         |

---

# 🧪 9. Ejemplo comparativo

---

## ❌ SIN MVC

```php
<?php
$conn = new mysqli(...);
$result = $conn->query("SELECT * FROM usuarios");

while ($row = $result->fetch_assoc()) {
    echo $row['nombre'];
}
?>
```

---

## ✅ CON MVC

---

### Controlador

```php
$usuarios = $modelo->getUsuarios();
require "views/usuarios.php";
```

---

### Modelo

```php
public function getUsuarios() {
    return ["Juan", "Ana"];
}
```

---

### Vista

```php
<?php foreach ($usuarios as $u): ?>
    <p><?= $u ?></p>
<?php endforeach; ?>
```

---

# 🧠 10. Ventajas reales de MVC

---

## ✔️ Organización

Cada cosa en su lugar

---

## ✔️ Mantenimiento

Podés cambiar la vista sin tocar la lógica

---

## ✔️ Escalabilidad

Permite crecer el sistema

---

## ✔️ Trabajo en equipo

* Backend → modelo/controlador
* Frontend → vista

---

# ⚠️ 11. Errores comunes al aprender MVC

❌ Poner lógica en la vista
❌ Hacer consultas SQL en el controlador
❌ No separar archivos
❌ Sobrecomplicar (usar frameworks sin entender)

---

# 🧪 12. Actividad práctica

---

## 🎯 Consigna

Reorganizar este código usando MVC:

```php
<?php
$usuarios = ["Juan", "Ana"];
foreach ($usuarios as $u) {
    echo "<p>$u</p>";
}
?>
```

---

## 👉 Objetivo

Separarlo en:

* Controlador
* Vista

---

# 🧠 13. Cierre conceptual

---

👉 MVC no es “una moda”

Es una **forma profesional de pensar el software**

---

👉 Si entendés esto:

* Vas a entender frameworks como

  * Laravel
  * Angular

---

👉 Porque todos usan este mismo concepto

---

