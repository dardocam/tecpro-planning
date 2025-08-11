### 🎓 **Clase: Introducción a Fat-Free Framework (F3) para desarrolladores PHP**

#### 🧭 **Objetivo de la clase**

Que los estudiantes comprendan la estructura básica, configuración y filosofía del framework **Fat-Free (F3)**, y que sean capaces de construir una pequeña aplicación MVC funcional.

---

## 🗂️ **Estructura de la clase (duración sugerida: 90 minutos)**

---

### 🧠 1. **Teoría – 40 minutos**

#### 📌 1.1 ¿Qué es Fat-Free Framework?

* Microframework PHP con enfoque **minimalista** y **modular**.
* No requiere instalación compleja, solo `index.php` y `lib/base.php`.
* Ideal para pequeñas y medianas aplicaciones.
* Respeta el **paradigma MVC** sin imponer estructura rígida.
* Ligero (\~65 KB), pero potente.

#### 📌 1.2 Ventajas frente a proyectos PHP puros

* Organización clara: separación de lógica, rutas y vistas.
* URLs limpias y seguras (sin `.php`).
* Enrutamiento flexible y simple.
* Abstracción de sesiones, formularios, validación, bases de datos.
* Fácil de extender con librerías externas (via Composer).

#### 📌 1.3 Requisitos y entorno

* PHP 7.2 o superior hasta 8.2 u 8.3 - puede dar problemas con la version 8.4
* Servidor web (Apache/Nginx con PHP-FPM)
* Composer (opcional, pero recomendado)
* Conocimientos previos de PHP (funciones, clases, arrays, etc.)

---

### 💻 2. **Práctica guiada – 50 minutos**

> 💡 **Proyecto práctico**: "Directorio de contactos" (Mini app CRUD base)

#### 📁 2.1 Estructura inicial del proyecto

```plaintext
/mi-proyecto
│
├── app/
│   ├── controllers/
│   ├── models/
│   └── views/
├── public/
│   ├── index.php
├── lib/
│   └── base.php
├── .htaccess
└── composer.json
```

#### ⚙️ 2.2 Configuración inicial

* Descargar `base.php`: [https://fatfreeframework.com/down](https://fatfreeframework.com/down)
* Configurar `.htaccess` para Apache:

```apache
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.php [QSA,L]
```

#### 🧾 2.3 Código base – `public/index.php`

```php
<?php
require 'vendor/autoload.php';
$f3 = \Base::instance();
$f3->route('GET /',
    function() {
        echo 'Hello, world!';
    }
);
$f3->run();
```

#### 📂 2.4 Controlador básico – `app/controllers/HomeController.php`

```php
<?php

class HomeController {
    function index($f3) {
        $f3->set('message', '¡Bienvenidos a Fat-Free!');
        echo Template::instance()->render('home.html');
    }
}
```

#### 📄 2.5 Vista – `app/views/home.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Inicio</title>
</head>
<body>
  <h1>{{ @message }}</h1>
</body>
</html>
```

---

### 🧪 3. **Prueba final del entorno (5 minutos)**

* Levantar servidor local:

```bash
php -S localhost:8000 -t public
```

* Acceder desde el navegador: [http://localhost:8000](http://localhost:8000)

#### Para utilizarlo con Apache crear la carpeta del proyecto en el directorio htdocs
* Iniciar Apache
* Acceder desde el navegador: [http://localhost/mi-proyecto](http://localhost/mi-proyecto)

---

### ✅ **Resultados esperados**

* El estudiante debe ver el mensaje: “¡Bienvenidos a Fat-Free!” renderizado desde un controlador MVC.
* Comprender la organización básica de un proyecto F3.
* Ser capaz de agregar rutas, vistas y lógica básica.

---

