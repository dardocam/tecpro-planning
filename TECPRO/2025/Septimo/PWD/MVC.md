Para hacerlo práctico y sencillo, te propongo abordar MVC a través de un ejemplo real, como una aplicación que muestra un listado de alumnos. La idea es que cada componente (Modelo, Vista y Controlador) tenga una responsabilidad clara:

---

### 1. **Explicación Breve de MVC**

- **Modelo (Model):** Se encarga de la lógica y el manejo de datos (por ejemplo, consultar una base de datos o, para simplificar, usar datos en un arreglo).
- **Vista (View):** Es la parte visual, es decir, el HTML que se muestra al usuario.
- **Controlador (Controller):** Coordina la interacción entre el Modelo y la Vista. Recibe la solicitud, invoca el Modelo para obtener datos y luego carga la Vista con la información.

Esta separación ayuda a que el código sea más ordenado, modular y fácil de mantener, lo que es muy importante para proyectos reales y para el aprendizaje.

---

### 2. **Propuesta de Estructura de Archivos**

Puedes comenzar con una estructura de directorios sencilla como la siguiente:

```
/tu_proyecto_mvc
   ├── app/
   │    ├── controllers/
   │    │       └── MainController.php
   │    ├── models/
   │    │       └── Student.php
   │    └── views/
   │            ├── header.php
   │            ├── footer.php
   │            └── students.php
   └── index.php
```

- **index.php:** Será el Front Controller que canaliza todas las solicitudes.
- **MainController.php:** Controlador principal que decide qué acción realizar.
- **Student.php:** Modelo que maneja los datos de los alumnos.
- **Vistas:** Archivos que contienen la parte de presentación (HTML).

---

### 3. **Ejemplo Práctico**

#### **Archivo: index.php**

```php
<?php
// index.php: Punto de entrada de la aplicación
require_once 'app/controllers/MainController.php';

$controller = new MainController();
$controller->handleRequest();
?>
```

#### **Archivo: app/controllers/MainController.php**

```php
<?php
class MainController {
    public function handleRequest() {
        // Cargar el modelo
        require_once 'app/models/Student.php';
        $studentModel = new Student();
        $students = $studentModel->getStudents();
        
        // Cargar la vista, pasando los datos
        require_once 'app/views/students.php';
    }
}
?>
```

#### **Archivo: app/models/Student.php**

```php
<?php
class Student {
    public function getStudents() {
        // Para simplificar, usamos un arreglo de datos
        return [
            ['id' => 1, 'name' => 'Juan Pérez'],
            ['id' => 2, 'name' => 'María Gómez'],
            // Puedes agregar más datos o, eventualmente, conectarte a una base de datos.
        ];
    }
}
?>
```

#### **Archivo: app/views/students.php**

```php
<?php include 'header.php'; ?>
<h1>Listado de Alumnos</h1>
<ul>
    <?php foreach ($students as $student): ?>
        <li><?php echo $student['id'] . ": " . $student['name']; ?></li>
    <?php endforeach; ?>
</ul>
<?php include 'footer.php'; ?>
```

#### **Archivos: app/views/header.php y footer.php**

*header.php:*

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Escuela Técnica - MVC en PHP</title>
</head>
<body>
```

*footer.php:*

```html
</body>
</html>
```

---

### 4. **Enfoque Pedagógico**

- **Explicación Teórica:** Inicia explicando qué es MVC, sus ventajas (modularidad, reutilización, separación de responsabilidades) y por qué se usa en aplicaciones modernas.
- **Descomponer el Ejemplo:** Muéstrales cómo cada archivo cumple una función. Por ejemplo, el Modelo gestiona datos, el Controlador coordina y la Vista presenta la información.
- **Ejercicios Prácticos:** Anima a los estudiantes a modificar el ejemplo: agregar nuevos métodos en el Modelo, cambiar la forma en que se presenta la información en la Vista o añadir nuevas acciones en el Controlador.
- **Reflexión sobre Escalabilidad:** Finalmente, discute cómo esta estructura se puede expandir para proyectos más grandes y cómo se relaciona con frameworks MVC como Laravel o Symfony, sin perder la idea básica.

---
### Ruteo
El ruteo (o routing) se utiliza para dirigir cada petición –ya sea de carga de página o envío de formulario– al controlador y acción adecuados. En esencia, el mismo sistema de ruteo se encarga de ambas cosas, aunque en la práctica suelen presentarse algunos matices:

---

### Ruteo para Páginas

1. **Uso de .htaccess y mod_rewrite:**  
   Con un archivo `.htaccess` puedes redirigir todas las peticiones a un único archivo (por lo general `index.php`), lo que permite centralizar el enrutamiento. Por ejemplo:

   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteRule ^(.*)$ index.php?url=$1 [QSA,L]
   </IfModule>
   ```

2. **Análisis de la URL:**  
   En `index.php` se obtiene el segmento de URL (por ejemplo, `/alumnos/listado`) y se separa en partes para determinar el controlador, la acción y, en su caso, parámetros. Por ejemplo:

   ```php
   <?php
   // index.php: Punto de entrada
   $url = isset($_GET['url']) ? $_GET['url'] : '';
   $segments = explode('/', trim($url, '/'));

   $controllerName = !empty($segments[0]) ? ucfirst($segments[0]).'Controller' : 'HomeController';
   $action = isset($segments[1]) ? $segments[1] : 'index';
   $params = array_slice($segments, 2);

   // Se incluye el controlador y se invoca la acción
   require_once "app/controllers/{$controllerName}.php";
   $controller = new $controllerName;
   call_user_func_array([$controller, $action], $params);
   ?>
   ```

3. **Mapeo a controladores y acciones:**  
   Con este enfoque, una URL como `http://tu-sitio.com/alumnos/listado` llamará al método `listado()` del controlador `AlumnosController`.

---

### Ruteo para Formularios

1. **Definir la URL de destino (action):**  
   En el formulario HTML, el atributo `action` debe apuntar a una ruta definida. Por ejemplo, para un formulario de registro:

   ```html
   <form method="POST" action="/usuario/registrar">
       <input type="text" name="nombre" placeholder="Nombre">
       <button type="submit">Registrar</button>
   </form>
   ```

2. **Procesamiento en el controlador:**  
   Al enviar el formulario, el ruteo redirige la petición a `UsuarioController` y al método `registrar()`. Dentro de ese método, se verificará que la solicitud sea POST y se procesarán los datos enviados (usando `$_POST`).

   ```php
   <?php
   class UsuarioController {
       public function registrar() {
           if ($_SERVER['REQUEST_METHOD'] === 'POST') {
               // Procesar datos del formulario
               $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
               // Lógica para registrar el usuario...
               
               // Luego se puede redirigir a otra página usando PRG (Post/Redirect/Get)
               header('Location: /usuario/gracias');
               exit;
           } else {
               // Si no es POST, se muestra el formulario
               require_once 'app/views/usuario/registro.php';
           }
       }
   }
   ?>
   ```

3. **Redirección y URLs limpias:**  
   Es una práctica común (el patrón Post/Redirect/Get) procesar el formulario y luego redirigir a una URL limpia para evitar el reenvío accidental de datos al recargar la página. Así, aunque el formulario se envíe con POST, el usuario termina viendo una URL que sigue el mismo esquema limpio del ruteo.

---

### Resumen

- **Para páginas:** El ruteo analiza la URL para determinar qué controlador y acción ejecutar.  
- **Para formularios:** El mismo mecanismo se usa; el formulario especifica en su atributo `action` la ruta destino y el controlador correspondiente procesa la solicitud (usualmente validando que sea una petición POST) y, tras procesarla, puede redirigir al usuario a una nueva URL limpia.

Con este enfoque, se mantiene la consistencia en la forma en que se gestionan todas las peticiones, y se separa la lógica de presentación (las vistas) de la lógica de negocio (los modelos) y de la coordinación (los controladores).