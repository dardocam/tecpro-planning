### **Filmina 1: Introducción a F3**  
**Título**: *"Fat-Free Framework: Ligero, Rápido y Potente"*  
**Contenido**:  
- ¿Qué es F3?  
  - Framework PHP minimalista (~65 KB).  
  - Arquitectura MVC integrada.  
  - Ideal para proyectos pequeños/medianos y aprendizaje.  
- Ventajas para estudiantes:  
  - Sin configuración compleja.  
  - Sintaxis clara y documentación concisa.  
- Casos de uso:  
  - APIs REST, blogs, aplicaciones web simples.  



---

### **Filmina 2: Instalación y Configuración Inicial**  
**Título**: *"Primeros Pasos con F3"*  
**Contenido**:  
- Instalación via Composer:  
  ```bash
  composer require bcosca/fatfree-core
  ```  
- Estructura de carpetas recomendada:  
  ```markdown
  proyecto/
  ├── public/
  │   └── index.php   # Punto de entrada
  ├── app/
  │   ├── controllers/
  │   ├── models/
  │   └── views/
  └── vendor/         # Dependencias
  ```  
- Archivo `index.php` básico:  
  ```php
  require 'vendor/autoload.php';
  $f3 = Base::instance();
  $f3->route('GET /', function() { echo '¡Hola F3!'; });
  $f3->run();
  ```  

**Visual**: Diagrama de carpetas + terminal con Composer.  

---

### **Filmina 3: Enrutamiento (Routing)**  
**Título**: *"Definiendo Rutas y Acciones"*  
**Contenido**:  
- Sintaxis básica de rutas:  
  ```php
  $f3->route('GET /ruta', 'Controlador@método');  
  ```  
- Parámetros dinámicos:  
  ```php
  $f3->route('GET /usuario/@id', function($f3, $params) {
    echo "ID: " . $params['id'];
  });
  ```  
- Verbos HTTP (GET, POST, PUT, DELETE).  
- Rutas agrupadas con `$f3->map()`.  

**Visual**: Ejemplo de ruta con parámetro + navegador mostrando resultado.  

---

### **Filmina 4: Controladores y MVC**  
**Título**: *"Organizando Lógica con Controladores"*  
**Contenido**:  
- Crear un controlador:  
  ```php
  namespace App\Controllers;
  class UserController {
    public function listar($f3) {
      // Lógica aquí
    }
  }
  ```  
- Vincular ruta a controlador:  
  ```php
  $f3->route('GET /usuarios', 'App\Controllers\UserController->listar');
  ```  
- Paso de parámetros a vistas.  

**Visual**: Diagrama MVC + código de controlador ejemplo.  

---

### **Filmina 5: Vistas y Plantillas**  
**Título**: *"Diseñando Interfaces con el Motor de Plantillas"*  
**Contenido**:  
- Sintaxis de variables en plantillas:  
  ```html
  <h1>{{ @titulo }}</h1>
  ```  
- Condicionales y bucles:  
  ```html
  <check if="{{ @usuarios }}">
    <repeat group="{{ @usuarios }}" value="{{ @user }}">
      {{ @user.nombre }}
    </repeat>
  </check>
  ```  
- Inclusión de partials:  
  ```html
  <include href="header.html" />
  ```  

**Visual**: Plantilla HTML + renderizado en navegador.  

---

### **Filmina 6: Trabajando con Bases de Datos**  
**Título**: *"Persistencia de Datos con F3 ORM"*  
**Contenido**:  
- Configurar conexión a MySQL:  
  ```php
  $f3->set('DB', new DB\SQL(
    'mysql:host=localhost;dbname=test',
    'user',
    'password'
  ));
  ```  
- Modelo con `DB\SQL\Mapper`:  
  ```php
  class Producto extends DB\SQL\Mapper {
    public function __construct() {
      parent::__construct($f3->get('DB'), 'productos');
    }
  }
  ```  
- CRUD básico:  
  ```php
  $producto = new Producto();
  $producto->load(['id = ?', 1]); // Leer
  $producto->nombre = 'Nuevo nombre'; // Actualizar
  $producto->save();
  ```  

**Visual**: Diagrama de base de datos + código CRUD.  

---

### **Filmina 7: Manejo de Errores y Seguridad**  
**Título**: *"Buenas Prácticas: Errores y Seguridad"*  
**Contenido**:  
- Personalizar páginas de error:  
  ```php
  $f3->set('ONERROR', function($f3) {
    echo $f3->get('ERROR.text');
  });
  ```  
- Prevención de vulnerabilidades:  
  - CSRF: `{{ @CSRF }}` en formularios.  
  - XSS: Escape automático en plantillas.  
  - Validación de datos con `$f3->validate()`.  

**Visual**: Ejemplo de error 404 personalizado.  

---

### **Filmina 8: Despliegue y Optimización**  
**Título**: *"Llevando tu Aplicación a Producción"*  
**Contenido**:  
- Configuración para producción:  
  ```php
  $f3->set('DEBUG', 0); // Desactivar debug
  ```  
- Caching de rutas y plantillas:  
  ```php
  $f3->set('CACHE', 'folder=tmp/cache/');
  ```  
- Uso de CDN para assets estáticos.  
- Herramientas: XAMPP, Docker, o hosting compartido.  

**Visual**: Comparativa de rendimiento con/sin cache.  

---

### **Filmina 9: Recursos y Próximos Pasos**  
**Título**: *"Continúa tu Viaje con F3"*  
**Contenido**:  
- Documentación oficial: [fatfreeframework.com](https://fatfreeframework.com/)  
- Comunidad: GitHub, Stack Overflow.  
- Proyectos recomendados:  
  - API REST para un blog.  
  - Sistema de autenticación.  
  - Integración con APIs externas (Twitter, Google).  
- Frameworks para explorar después: Laravel, Symfony.  

**Visual**: Captura de la documentación + íconos de redes sociales.  

---

(Due to technical issues, the search service is temporarily unavailable.)

**Filmina 4 (Ampliada): Lógica del Controlador para Interactuar con Modelo y Vista**  
**Título**: *"Controladores: El Puente entre Modelo y Vista"*  

---

### **Parte 1: Estructura Básica del Controlador**  
**Código Ejemplo**:  
```php
namespace App\Controllers;

use App\Models\Libro; // Importar el modelo

class LibroController {

    public function listar($f3) {
        // 1. Obtener datos del Modelo
        $libro = new Libro(); // Instanciar el modelo
        $libros = $libro->find(); // Consultar todos los libros
        
        // 2. Pasar datos a la Vista
        $f3->set('libros', $libros); // Variable disponible en la vista
        
        // 3. Renderizar Vista
        echo \Template::instance()->render('views/libros/lista.html');
    }
}
```

---

### **Parte 2: Flujo de Datos MVC**  
**Diagrama**:  
```
[Modelo (Libro)] <--Consulta--> [Controlador] --Datos--> [Vista (lista.html)]
```

**Pasos Detallados**:  
1. **Modelo**:  
   - Define métodos para interactuar con la base de datos (ej: `find()`, `load()`, `save()`).  
2. **Controlador**:  
   - Recibe peticiones HTTP.  
   - Usa el modelo para obtener/guardar datos.  
   - Prepara datos para la vista.  
3. **Vista**:  
   - Muestra datos usando el motor de plantillas de F3 (`{{ @variable }}`).  

---

### **Parte 3: Ejemplo Completo (CRUD)**  

#### **3.1 Crear un Libro**  
```php
public function crear($f3) {
    if ($f3->VERB == 'POST') { // Si es una petición POST
        // Validar datos del formulario
        $titulo = $f3->clean($f3->get('POST.titulo'));
        
        // Guardar en el Modelo
        $libro = new Libro();
        $libro->titulo = $titulo;
        $libro->save(); // Persistir en la base de datos
        
        // Redirigir a la lista
        $f3->reroute('/libros');
    }
    
    // Mostrar formulario (GET)
    echo \Template::instance()->render('views/libros/crear.html');
}
```

#### **3.2 Vista Asociada (`crear.html`)**  
```html
<form method="post">
    <input type="text" name="titulo" placeholder="Título del libro">
    <button type="submit">Guardar</button>
</form>
```

---

### **Parte 4: Buenas Prácticas**  
- **Separación de preocupaciones**:  
  - El controlador **no** debe contener lógica de negocio compleja (debe estar en el modelo).  
- **Validación**:  
  - Usar `$f3->clean()` para sanitizar entradas.  
  - Ejemplo de validación manual:  
    ```php
    if (empty($titulo)) {
        $f3->set('error', 'El título es obligatorio');
        echo \Template::instance()->render('views/libros/crear.html');
        return;
    }
    ```
- **Reutilización**:  
  - Crear métodos helpers en el controlador para evitar código duplicado (ej: `cargarLibro($id)`).

---

### **Parte 5: Interacción con el Modelo (Casos Comunes)**  

| **Acción**         | **Código del Controlador**                          |
|---------------------|----------------------------------------------------|
| Obtener todos       | `$libros = $libro->find();`                        |
| Buscar por ID       | `$libro->load(['id = ?', $id]);`                   |
| Filtrar             | `$libro->find(['autor = ?', 'Gabriel García']);`   |
| Eliminar            | `$libro->load(['id = ?', $id]); $libro->erase();`  |

---

### **Parte 6: Paso de Datos a la Vista**  
**En el Controlador**:  
```php
$f3->set('titulo_pagina', 'Listado de Libros'); // Variable simple
$f3->set('libros', $libros); // Array de objetos
$f3->set('usuario', ['nombre' => 'Ana', 'rol' => 'admin']); // Array asociativo
```

**En la Vista (`lista.html`)**:  
```html
<h1>{{ @titulo_pagina }}</h1>
<ul>
    <repeat group="{{ @libros }}" value="{{ @libro }}">
        <li>{{ @libro.titulo }} ({{ @usuario.nombre }})</li>
    </repeat>
</ul>
```

---

**Visual Sugerido**:  
- Diagrama de flujo MVC con flechas que conectan controlador, modelo y vista.  
- Código lado a lado (controlador + vista) con resaltado de sintaxis.  
- Tabla comparativa de operaciones CRUD en el modelo.  

**Consejo para Estudiantes**:  
> "El controlador es como un chef: recibe ingredientes (datos), los procesa con herramientas (modelo), y sirve el plato final (vista)." 🧑🍳
>

---

(Due to technical issues, the search service is temporarily unavailable.)

**¡Sí!** Fat-Free Framework (F3) es flexible y permite renderizar vistas **sin usar `\Template`**. Aquí tienes alternativas profesionales:

---

### **1. Usar PHP Nativo (Include/Require)**  
Ejemplo en el controlador:  
```php
public function listar($f3) {
    $libros = $f3->get('DB')->exec('SELECT * FROM libros'); // Desde BD
    $f3->set('libros', $libros); // Variables para la vista
    
    // Renderizar vista PHP directamente
    include 'app/views/libros/lista.php';
}
```

**Vista (`lista.php`)**:  
```php
<!DOCTYPE html>
<html>
<body>
    <?php foreach ($libros as $libro): ?>
        <h2><?= htmlspecialchars($libro['titulo']) ?></h2>
    <?php endforeach; ?>
</body>
</html>
```

**Ventajas**:  
- Ideal para estudiantes que dominan PHP básico.  
- Sin sintaxis especial de plantillas.  

---

### **2. Usar `\View` para Contenido Dinámico**  
F3 incluye la clase `\View` para generar contenido programáticamente:  
```php
public function mostrar($f3) {
    $view = \View::instance();
    $html = $view->render('views/header.html') 
          . '<h1>Hola, ' . $f3->get('nombre') . '</h1>'
          . $view->render('views/footer.html');
    echo $html;
}
```

---

### **3. Integrar Motores de Plantillas Externos (Twig, Blade, etc.)**  
Ejemplo con **Twig**:  
```php
// Instalar Twig via Composer: composer require twig/twig

public function listar($f3) {
    $loader = new \Twig\Loader\FilesystemLoader('app/views');
    $twig = new \Twig\Environment($loader);
    
    $libros = $f3->get('DB')->exec('SELECT * FROM libros');
    echo $twig->render('libros/lista.twig', ['libros' => $libros]);
}
```

**Vista Twig (`lista.twig`)**:
```twig
{% for libro in libros %}
    <div>{{ libro.titulo|e }}</div>
{% endfor %}
```

---

### **4. Devolver Contenido Manualmente (JSON, XML, etc.)**  
Útil para APIs:  
```php
public function apiLibros($f3) {
    $libros = $f3->get('DB')->exec('SELECT * FROM libros');
    header('Content-Type: application/json');
    echo json_encode($libros);
}
```

---

### **5. Usar `ob_start()` + `ob_get_clean()`**  
Capturar el output de un archivo PHP:  
```php
public function home($f3) {
    $f3->set('mensaje', 'Hola F3');
    
    ob_start();
    include 'app/views/home.php';
    $contenido = ob_get_clean();
    
    echo $contenido;
}
```

---

### **Comparativa de Métodos**

| **Método**         | **Recomendado Para**          | **Complejidad** |  
|---------------------|-------------------------------|-----------------|  
| `\Template`         | Uso estándar en F3            | Baja            |  
| PHP Nativo (`include`)| Estudiantes principiantes   | Muy Baja        |  
| Twig/Blade          | Proyectos complejos           | Media-Alta      |  
| `\View`             | Contenido semi-dinámico       | Media           |  
| `ob_start()`        | Control manual del output     | Media           |  

---

### **¿Cuándo Evitar `\Template`?**  
- Si prefieres PHP puro en las vistas.  
- Si necesitas integración con librerías externas (ej: React/Vue).  
- Para APIs que no requieren HTML.  

---

**Consejo Pedagógico**:  
Para estudiantes, empieza con **PHP Nativo** (método 1) y luego introduce `\Template`. Así entenderán el flujo MVC sin abstracciones iniciales.


---

(Due to technical issues, the search service is temporarily unavailable.)

Aquí tienes una explicación detallada de cómo desarrollar un **Modelo** en Fat-Free Framework (F3), con ejemplos prácticos y mejores prácticas:

---

### **Filmina 10: Modelos en F3 - Capa de Datos y Lógica de Negocio**  
**Título**: *"Modelos: Interactuando con la Base de Datos"*  

---

### **Parte 1: Estructura Básica del Modelo**  
**Definición**:  
El modelo representa los datos y las reglas de negocio. En F3, se usa la clase `DB\SQL\Mapper` para mapear tablas de la base de datos.

#### **Ejemplo: Modelo `Libro`**  
```php
namespace App\Models;

use DB\SQL\Mapper;

class Libro extends Mapper {

    public function __construct() {
        // Obtener instancia de la base de datos desde F3
        $db = \Base::instance()->get('DB');
        
        // Inicializar Mapper con la tabla 'libros'
        parent::__construct($db, 'libros');
    }
}
```

---

### **Parte 2: Operaciones CRUD Básicas**  

#### **2.1 Crear un Registro**  
```php
$libro = new Libro();
$libro->titulo = "Cien años de soledad";
$libro->autor = "Gabriel García Márquez";
$libro->save(); // Guarda en la tabla 'libros'
```

#### **2.2 Leer Registros**  
```php
// Todos los libros
$libros = $libro->find();

// Buscar por ID
$libro->load(['id = ?', 1]);
echo $libro->titulo; // Acceder a campos

// Filtrar con condiciones
$novelas = $libro->find(['genero = ?', 'Novela']);
```

#### **2.3 Actualizar**  
```php
$libro->load(['id = ?', 1]);
$libro->genero = "Realismo mágico";
$libro->update(); // Actualiza el registro
```

#### **2.4 Eliminar**  
```php
$libro->load(['id = ?', 1]);
$libro->erase(); // Elimina el registro
```

---

### **Parte 3: Validación de Datos**  
**Ejemplo con reglas personalizadas**:  
```php
class Libro extends Mapper {

    public function __construct() { ... }

    public function validate($data) {
        $errores = [];
        
        if (empty($data['titulo'])) {
            $errores[] = "El título es obligatorio";
        }
        
        if (strlen($data['isbn']) != 13) {
            $errores[] = "ISBN inválido";
        }
        
        return $errores;
    }
}

// Uso en el controlador:
$libro = new Libro();
$errores = $libro->validate($_POST);
if (empty($errores)) {
    $libro->save();
} else {
    // Manejar errores
}
```

---

### **Parte 4: Relaciones entre Modelos**  
**Ejemplo: Relación 1:N (Libro -> Comentarios)**  

#### **Modelo `Comentario`**  
```php
class Comentario extends Mapper {
    public function __construct() {
        parent::__construct(\Base::instance()->get('DB'), 'comentarios');
    }
}
```

#### **Método en `Libro` para obtener comentarios**  
```php
class Libro extends Mapper {
    // ...
    
    public function comentarios() {
        $comentario = new Comentario();
        return $comentario->find(['libro_id = ?', $this->id]);
    }
}

// Uso:
$libro->load(['id = ?', 5]);
$comentarios = $libro->comentarios();
```

---

### **Parte 5: Consultas Avanzadas**  

#### **5.1 SQL Directo**  
```php
$db = \Base::instance()->get('DB');
$resultado = $db->exec('SELECT * FROM libros WHERE año > ?', [2000]);
```

#### **5.2 Paginación**  
```php
$pagina = 2;
$porPagina = 10;
$libros = $libro->paginate($pagina-1, $porPagina, ['genero = ?', 'Novela']);
```

#### **5.3 Transacciones**  
```php
$db = \Base::instance()->get('DB');
$db->begin();
try {
    $libro->save();
    $comentario->save();
    $db->commit();
} catch (Exception $e) {
    $db->rollback();
}
```

---

### **Parte 6: Mejores Prácticas**  
1. **Separación de responsabilidades**:  
   - El modelo debe contener **lógica de negocio**, no el controlador.  
2. **Reutilización**:  
   - Crear métodos genéricos en una clase `ModeloBase` heredada por todos los modelos.  
3. **Seguridad**:  
   - Usar `$f3->clean()` o `$db->param()` para evitar SQL injection.  
4. **Caching**:  
   ```php
   $libros = $libro->find(['genero = ?', 'Ciencia Ficción'], ['ttl' => 3600]); // Cache por 1 hora
   ```

---

### **Ejemplo Completo: Modelo con Herencia**  
```php
namespace App\Models;

use DB\SQL\Mapper;

abstract class ModeloBase extends Mapper {
    public function __construct($table) {
        parent::__construct(\Base::instance()->get('DB'), $table);
    }
    
    public function beforeSave() {
        $this->actualizado_en = date('Y-m-d H:i:s');
    }
}

// Modelo específico
class Libro extends ModeloBase {
    public function __construct() {
        parent::__construct('libros');
    }
}
```

---

**Visual Sugerido**:  
- Diagrama de modelo con métodos CRUD.  
- Tabla comparativa entre `save()`, `update()`, `erase()`.  
- Código con resaltado de sintaxis para relaciones.  

**Consejo para Estudiantes**:  
> "El modelo es como un bibliotecario: conoce todos los trucos para organizar y recuperar datos eficientemente." 📚

---

(Due to technical issues, the search service is temporarily unavailable.)

Aquí tienes una guía detallada para **configurar la conexión a la base de datos en Fat-Free Framework (F3)**:

---

### **1. Instalación del Driver de Base de Datos (si es necesario)**
F3 utiliza PDO de PHP. Asegúrate de tener instalado el driver según tu base de datos:
- **MySQL**: 
  ```bash
  sudo apt-get install php-mysql  # Linux
  ```
- **SQLite**: 
  ```bash
  sudo apt-get install php-sqlite3  # Linux
  ```

---

### **2. Configurar la Conexión en F3**
En tu archivo principal (`index.php` o `bootstrap.php`):

```php
$f3 = Base::instance();

// Configuración para MySQL
$f3->set('DB', new DB\SQL(
    'mysql:host=localhost;dbname=nombre_basedatos', // DSN
    'usuario',     // Usuario de la DB
    'contraseña',  // Contraseña
    [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION] // Opciones PDO
));

// Configuración para SQLite
$f3->set('DB', new DB\SQL('sqlite:/ruta/a/basedatos.sqlite'));
```

---

### **3. Uso de la Conexión**
Accede a la base de datos desde controladores o modelos:

#### **Ejemplo en un Controlador**:
```php
$f3->route('GET /libros', function($f3) {
    $db = $f3->get('DB'); // Obtener instancia de la DB
    
    // Ejecutar consulta SQL
    $libros = $db->exec('SELECT * FROM libros');
    
    // Pasar datos a la vista
    $f3->set('libros', $libros);
    echo Template::instance()->render('libros.html');
});
```

#### **Ejemplo en un Modelo**:
```php
namespace App\Models;

class Libro extends \DB\SQL\Mapper {
    public function __construct() {
        parent::__construct(\Base::instance()->get('DB'), 'libros');
    }
}
```

---

### **4. Manejo de Errores**
Configura PDO para lanzar excepciones en errores:
```php
$opciones = [
    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION, // Lanza excepciones
    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC // Resultados como array asociativo
];

$f3->set('DB', new DB\SQL(
    'mysql:host=localhost;dbname=test',
    'usuario',
    'contraseña',
    $opciones
));
```

---

### **5. Prueba de Conexión**
Crea una ruta para verificar la conexión:
```php
$f3->route('GET /test-db', function($f3) {
    try {
        $db = $f3->get('DB');
        $db->exec('SELECT 1'); // Consulta simple
        echo "¡Conexión exitosa!";
    } catch (\PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
});
```

---

### **6. Configuración Segura (Recomendado)**
Usa variables de entorno para no exponer credenciales:
1. Crea un archivo `.env` (y añádelo a `.gitignore`):
   ```env
   DB_DSN=mysql:host=localhost;dbname=mi_db
   DB_USER=root
   DB_PASS=secret
   ```
2. Carga las variables en F3:
   ```php
   $f3->set('DB', new DB\SQL(
       $_ENV['DB_DSN'],
       $_ENV['DB_USER'],
       $_ENV['DB_PASS']
   ));
   ```

---

### **7. Conexiones Múltiples (Ej: MySQL + SQLite)**
```php
// Base de datos principal (MySQL)
$f3->set('DB_MAIN', new DB\SQL(
    'mysql:host=localhost;dbname=main',
    'usuario',
    'contraseña'
));

// Base de datos secundaria (SQLite)
$f3->set('DB_LOG', new DB\SQL('sqlite:/ruta/logs.sqlite'));
```

Accede a ellas con:
```php
$dbMain = $f3->get('DB_MAIN');
$dbLog = $f3->get('DB_LOG');
```

---

### **Errores Comunes y Soluciones**
| **Error**                       | **Causa**                          | **Solución**                                  |
|---------------------------------|-------------------------------------|-----------------------------------------------|
| `PDOException: could not find driver` | Falta el driver PDO. | Instala el paquete `php-mysql` o `php-sqlite3`. |
| `Access denied for user`        | Credenciales incorrectas.           | Verifica usuario/contraseña en la conexión.   |
| `SQLSTATE[HY000] [2002]`        | Servidor MySQL no accesible.        | Revisa si MySQL está corriendo y la dirección. |

---

### **Resumen**
1. Configura la conexión en `index.php` usando `DB\SQL`.
2. Usa variables de entorno para credenciales.
3. Accede a la DB con `$f3->get('DB')` o desde modelos.
4. Maneja errores con excepciones PDO.

**Documentación oficial**: [Base de datos en F3](https://fatfreeframework.com/3.7/databases).

---

(Due to technical issues, the search service is temporarily unavailable.)

Para proteger las credenciales de la base de datos (usuario y contraseña) en Fat-Free Framework (F3), **nunca las guardes directamente en el código**. En su lugar, utiliza variables de entorno y un archivo `.env` seguro. Aquí te muestro cómo hacerlo profesionalmente:

---

### **Paso 1: Instalar la Librería `vlucas/phpdotenv`**
Esta librería carga variables de entorno desde un archivo `.env` a `$_ENV` o `$_SERVER`.

```bash
composer require vlucas/phpdotenv
```

---

### **Paso 2: Crear el Archivo `.env`**
En la raíz del proyecto, crea un archivo `.env` con las credenciales:
```env
# .env
DB_DSN=mysql:host=localhost;dbname=mi_basedatos
DB_USER=usuario_seguro
DB_PASS=contraseña_compleja
```

⚠️ **Importante**: 
- **No hagas commit** del archivo `.env` (agrégalo a `.gitignore`).
- Usa permisos restrictivos en el servidor (ej: `chmod 600 .env`).

---

### **Paso 3: Cargar las Variables en F3**
En tu archivo principal (`index.php` o `bootstrap.php`):

```php
<?php
require __DIR__ . '/vendor/autoload.php';

// Cargar variables de entorno
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Configurar F3 con las variables
$f3 = Base::instance();
$f3->set('DB', new DB\SQL(
    $_ENV['DB_DSN'],    // mysql:host=...
    $_ENV['DB_USER'],   // usuario_seguro
    $_ENV['DB_PASS'],   // contraseña_compleja
    [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION]
));
```

---

### **Paso 4: Configurar el Servidor para Proteger el `.env`**
Asegúrate de que el servidor web **bloquee el acceso al archivo `.env`**:

#### **Apache (`.htaccess`)**:
```apache
<Files ".env">
    Require all denied
</Files>
```

#### **Nginx** (en el `server block`):
```nginx
location ~ /\.env {
    deny all;
    return 403;
}
```

---

### **Alternativa Sin Librerías Externas**
Si no puedes usar `phpdotenv`, define las variables directamente en el entorno del servidor:

#### **En Linux (bash)**:
```bash
export DB_DSN="mysql:host=localhost;dbname=mi_bd"
export DB_USER="usuario"
export DB_PASS="contraseña"
```

#### **En PHP**:
```php
$f3->set('DB', new DB\SQL(
    getenv('DB_DSN'),
    getenv('DB_USER'),
    getenv('DB_PASS')
));
```

---

### **Buenas Prácticas Adicionales**
1. **Usar Diferentes Credenciales por Entorno**:
   - Crea archivos `.env.dev`, `.env.prod`, etc., y carga el adecuado según el entorno.
2. **Encriptar Datos Sensibles** (avanzado):
   - Usa herramientas como **Vault by HashiCorp** para gestionar secretos en producción.
3. **Rotar Contraseñas Periódicamente**:
   - Cambia las contraseñas de la base de datos cada 3-6 meses.
4. **Limitar Permisos del Usuario de la DB**:
   - Otorga solo los privilegios necesarios (ej: `SELECT`, `INSERT`, pero no `DROP`).

---

### **Ejemplo de Estructura Final del Proyecto**
```
mi-proyecto/
├── public/
│   └── index.php
├── app/
│   ├── controllers/
│   └── models/
├── vendor/
├── .env            # Archivo oculto y protegido
├── .gitignore      # Incluye ".env"
└── composer.json
```

---

### **¿Por qué Esto es Seguro?**
- **Las credenciales no están en el código fuente**: Evitas riesgos si el repositorio se hace público.
- **Variables de entorno son específicas del servidor**: Cada entorno (local, producción) tiene sus propias credenciales.
- **Protección contra ataques**: El archivo `.env` no es accesible desde el navegador.

---

**Consejo para Estudiantes**:  
> "Trata las contraseñas como tu contraseña de redes sociales: ¡nunca las compartas ni las expongas!" 🔒

---

(Due to technical issues, the search service is temporarily unavailable.)

Aquí tienes un ejemplo completo de un **CRUD profesional con Fat-Free Framework (F3) + Testing con PHPUnit**, incluyendo estructura modular, seguridad y buenas prácticas:

---

### **Estructura del Proyecto**
```
crud-f3/
├── app/
│   ├── controllers/
│   │   └── BookController.php
│   ├── models/
│   │   └── BookModel.php
│   ├── migrations/
│   │   └── 2023_create_books_table.php
│   └── views/
│       ├── books/
│       │   ├── index.html
│       │   ├── create.html
│       │   └── show.html
├── tests/
│   └── BookTest.php
├── public/
│   ├── index.php
│   └── .htaccess
├── vendor/
├── .env
├── .gitignore
├── composer.json
└── phpunit.xml
```

---

### **1. Configuración Inicial**
#### **.env**
```env
APP_ENV=local
DB_DSN=mysql:host=localhost;dbname=crud_f3
DB_USER=root
DB_PASS=secret
DB_TEST=sqlite::memory:
```

#### **composer.json**
```json
{
    "require": {
        "bcosca/fatfree-core": "^3.8",
        "vlucas/phpdotenv": "^5.5",
        "phpunit/phpunit": "^9.5"
    },
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
}
```

---

### **2. Modelo (`app/models/BookModel.php`)**
```php
<?php
namespace App\Models;

use DB\SQL\Mapper;

class BookModel extends Mapper {
    public function __construct() {
        parent::__construct(\Base::instance()->get('DB'), 'books');
    }

    public function validate(array $data): array {
        $errors = [];
        if (empty($data['title'])) $errors[] = "Title is required";
        if (strlen($data['title']) > 255) $errors[] = "Title too long";
        return $errors;
    }
}
```

---

### **3. Controlador (`app/controllers/BookController.php`)**
```php
<?php
namespace App\Controllers;

use App\Models\BookModel;

class BookController {
    private $model;
    
    public function __construct() {
        $this->model = new BookModel();
    }

    // Listar libros (GET /books)
    public function index($f3) {
        $page = $f3->get('GET.page') ?? 1;
        $books = $this->model->paginate($page-1, 5);
        $f3->set('books', $books);
        echo \Template::instance()->render('books/index.html');
    }

    // Crear libro (POST /books)
    public function store($f3) {
        $data = $f3->clean($f3->get('POST'));
        $errors = $this->model->validate($data);
        
        if (empty($errors)) {
            $this->model->save($data);
            $f3->reroute('/books');
        } else {
            $f3->set('errors', $errors);
            echo \Template::instance()->render('books/create.html');
        }
    }

    // Eliminar libro (DELETE /books/@id)
    public function delete($f3, $params) {
        $this->model->load(['id = ?', $params['id']]);
        if ($this->model->dry()) $f3->error(404);
        $this->model->erase();
        $f3->reroute('/books');
    }
}
```

---

### **4. Vistas**
#### **index.html**
```html
<include href="header.html" />
<h1>Books</h1>
<ul>
    <repeat group="{{ @books.subset }}" value="{{ @book }}">
        <li>{{ @book.title }} 
            <a href="/books/{{ @book.id }}">View</a>
            <form action="/books/{{ @book.id }}" method="POST">
                <input type="hidden" name="_METHOD" value="DELETE">
                <button type="submit">Delete</button>
            </form>
        </li>
    </repeat>
</ul>
<a href="/books/create">New Book</a>
```

#### **create.html**
```html
<include href="header.html" />
<h1>New Book</h1>
<form action="/books" method="POST">
    <input type="text" name="title" required>
    <check if="{{ @errors }}">
        <div class="errors">
            <repeat group="{{ @errors }}" value="{{ @error }}">
                {{ @error }}
            </repeat>
        </div>
    </check>
    <button type="submit">Save</button>
</form>
```

---

### **5. Testing (`tests/BookTest.php`)**
```php
<?php
use PHPUnit\Framework\TestCase;
use App\Models\BookModel;

class BookTest extends TestCase {
    protected $f3;
    protected $db;

    protected function setUp(): void {
        // Configurar F3 y base de datos en memoria
        $this->f3 = \Base::instance();
        $this->f3->set('DB', new \DB\SQL('sqlite::memory:'));
        $this->db = $this->f3->get('DB');
        
        // Ejecutar migración
        $this->db->exec('CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)');
    }

    public function testCreateBook() {
        $model = new BookModel();
        $model->title = "Test Book";
        $model->save();
        
        $this->assertEquals(1, $model->id);
    }

    public function testValidationFails() {
        $model = new BookModel();
        $errors = $model->validate(['title' => '']);
        $this->assertNotEmpty($errors);
    }

    protected function tearDown(): void {
        $this->db->exec('DROP TABLE books');
    }
}
```

---

### **6. Configuración de PHPUnit (`phpunit.xml`)**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap="vendor/autoload.php">
    <testsuites>
        <testsuite name="CRUD Tests">
            <directory>tests</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

---

### **7. Migración de Base de Datos**
```php
// migrations/2023_create_books_table.php
$db->exec('
    CREATE TABLE books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
');
```

---

### **Comandos para Ejecutar**
1. Instalar dependencias:
   ```bash
   composer install
   ```
2. Ejecutar tests:
   ```bash
   ./vendor/bin/phpunit
   ```
3. Iniciar servidor:
   ```bash
   php -S localhost:8000 -t public/
   ```

---

### **Características Profesionales Incluidas**
- **Validación de datos**: Método `validate()` en el modelo
- **Paginación**: Uso de `$model->paginate()`
- **Seguridad**: 
  - `$f3->clean()` para sanitizar inputs
  - Método HTTP override para DELETE
- **Testing**:
  - Base de datos en memoria para tests
  - Setup/teardown de tablas
- **MVC limpio**: Separación estricta de responsabilidades

Este ejemplo cubre desde la arquitectura hasta pruebas automatizadas, siguiendo estándares profesionales. 🚀