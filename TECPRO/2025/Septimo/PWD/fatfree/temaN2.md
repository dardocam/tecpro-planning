# 🎓 **Clase 2: CRUD completo en Fat-Free Framework con SQLite**

### 🧭 Objetivo de la clase

Que los estudiantes puedan construir un CRUD completo (Crear, Leer, Actualizar, Eliminar) utilizando el patrón MVC con **Fat-Free Framework** y una base de datos **SQLite**.

---

## 🗂️ **Estructura de la clase (Duración sugerida: 90 minutos)**

---

### 🧠 1. Teoría (40 minutos)

#### 📌 1.1 ¿Qué es un CRUD?

* **C**reate: Agregar registros
* **R**ead: Consultar registros
* **U**pdate: Modificar registros existentes
* **D**elete: Eliminar registros

#### 📌 1.2 Arquitectura en F3

* **Modelo**: Acceso a base de datos (ORM)
* **Controlador**: Lógica de aplicación
* **Vista**: Interfaz de usuario con sintaxis F3

#### 📌 1.3 Conexión a base de datos en F3

```php
$db = new DB\SQL('sqlite:data/db.sqlite');
$db = new DB\SQL('mysql:host=localhost;port=3306;dbname=nombre_basedatos', 'usuario', 'contraseña'); // utilizar esta linea para mysql
$f3->set('DB', $db);
```

#### 📌 1.4 ORM en F3

```php
$user = new DB\SQL\Mapper($db, 'users');
```

---

### 💻 2. Práctica guiada (50 minutos)

> 💡 **Proyecto práctico**: Agenda de contactos (nombre, email, teléfono)

---

### 🧾 Paso a paso

#### 📁 2.1 Estructura del proyecto

```plaintext
/agenda/
├── app/
│   ├── controllers/
│   │   └── ContactController.php
│   ├── models/
│   │   └── Contact.php
│   └── views/
│       ├── layout.html
│       ├── list.html
│       ├── form.html
├── data/
│   └── db.sqlite
├── lib/
│   └── base.php
├── public/
│   └── index.php
├── .htaccess
```

---

#### 📄 2.2 Base de datos SQLite

```sql
-- Crear archivo: data/db.sqlite
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT
);
```

---

#### ⚙️ 2.3 Configuración principal – `index.php`

```php
<?php
$f3 = require('../lib/base.php');

$f3->set('AUTOLOAD', '../app/');
$f3->set('UI', '../app/views/');

$db = new DB\SQL('sqlite:../data/db.sqlite');
$f3->set('DB', $db);

// Rutas
$f3->route('GET /', 'ContactController->index');
$f3->route('GET /create', 'ContactController->create');
$f3->route('POST /create', 'ContactController->store');
$f3->route('GET /edit/@id', 'ContactController->edit');
$f3->route('POST /edit/@id', 'ContactController->update');
$f3->route('GET /delete/@id', 'ContactController->delete');

$f3->run();
```

---

#### 📄 2.4 Modelo – `Contact.php`

```php
<?php
class Contact extends DB\SQL\Mapper {
    public function __construct($db) {
        parent::__construct($db, 'contacts');
    }
}
```

---

#### 📂 2.5 Controlador – `ContactController.php`

```php
<?php
class ContactController {
    function index($f3) {
        $contact = new Contact($f3->get('DB'));
        $f3->set('contacts', $contact->find());
        echo Template::instance()->render('list.html');
    }

    function create($f3) {
        $f3->set('contact', ['id'=>null, 'name'=>'', 'email'=>'', 'phone'=>'']);
        echo Template::instance()->render('form.html');
    }

    function store($f3) {
        $contact = new Contact($f3->get('DB'));
        $contact->copyFrom('POST');
        $contact->save();
        $f3->reroute('/');
    }

    function edit($f3, $params) {
        $contact = new Contact($f3->get('DB'));
        $f3->set('contact', $contact->load(['id=?', $params['id']]));
        echo Template::instance()->render('form.html');
    }

    function update($f3, $params) {
        $contact = new Contact($f3->get('DB'));
        $contact->load(['id=?', $params['id']]);
        $contact->copyFrom('POST');
        $contact->update();
        $f3->reroute('/');
    }

    function delete($f3, $params) {
        $contact = new Contact($f3->get('DB'));
        $contact->load(['id=?', $params['id']]);
        $contact->erase();
        $f3->reroute('/');
    }
}
```

---

#### 📄 2.6 Vistas

##### 📄 `layout.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Agenda</title>
</head>
<body>
  <h1>Agenda de Contactos</h1>
  <repeat group="{{ @errors }}" value="{{ @error }}">
    <div style="color:red">{{ @error }}</div>
  </repeat>
  <include href="{{ @content }}"/>
</body>
</html>
```

##### 📄 `list.html`

```html
<include href="layout.html" content="list_inner.html"/>

<!-- list_inner.html -->
<a href="/create">+ Nuevo contacto</a>
<table border="1">
  <tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr>
  <repeat group="{{ @contacts }}" value="{{ @c }}">
    <tr>
      <td>{{ @c.name }}</td>
      <td>{{ @c.email }}</td>
      <td>{{ @c.phone }}</td>
      <td>
        <a href="/edit/{{ @c.id }}">Editar</a> |
        <a href="/delete/{{ @c.id }}">Eliminar</a>
      </td>
    </tr>
  </repeat>
</table>
```

##### 📄 `form.html`

```html
<include href="layout.html" content="form_inner.html"/>

<!-- form_inner.html -->
<form method="post" action="{{ @contact.id ? '/edit/' ~ @contact.id : '/create' }}">
  <label>Nombre: <input type="text" name="name" value="{{ @contact.name }}" required></label><br>
  <label>Email: <input type="email" name="email" value="{{ @contact.email }}"></label><br>
  <label>Teléfono: <input type="text" name="phone" value="{{ @contact.phone }}"></label><br>
  <input type="submit" value="Guardar">
</form>
```

---

### ✅ Resultados esperados

* Crear, listar, editar y eliminar contactos correctamente.
* Navegar entre vistas sin recargar la página completamente.
* Ver arquitectura MVC en funcionamiento con persistencia de datos.

---


