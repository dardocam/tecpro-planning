# 1) Estructura mínima

```
/api
  ├─ index.php
  └─ data.json   // se crea automático si no existe
```

# 2) (Opcional) .htaccess para Apache

Si usas Apache y quieres URLs limpias:

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [QSA,L]
```

# 3) `index.php` (router + CRUD con archivo JSON)

```php
<?php
// index.php
declare(strict_types=1);

// --- Opcional: CORS para pruebas locales ---
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); exit;
}

header('Content-Type: application/json; charset=utf-8');

// --- Utilidades ---
function readBody(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') return [];
    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        respond(['error' => 'JSON inválido'], 400);
    }
    return $data ?? [];
}

function respond($data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function loadDB(): array {
    if (!file_exists('data.json')) {
        file_put_contents('data.json', json_encode(['tasks' => []], JSON_PRETTY_PRINT));
    }
    $json = file_get_contents('data.json');
    return json_decode($json, true) ?: ['tasks' => []];
}

function saveDB(array $db): void {
    file_put_contents('data.json', json_encode($db, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

function nextId(array $items): int {
    $max = 0;
    foreach ($items as $it) { if (($it['id'] ?? 0) > $max) $max = $it['id']; }
    return $max + 1;
}

// --- Router súper simple ---
$method = $_SERVER['REQUEST_METHOD'];
$path   = $_GET['path'] ?? ($_SERVER['PATH_INFO'] ?? '/'); // soporta ?path=/tasks
$parts  = array_values(array_filter(explode('/', $path)));   // ["tasks", "123"]

// Solo un recurso de ejemplo: /tasks
if (count($parts) === 0) {
    respond(['message' => 'API OK', 'endpoints' => ['/tasks']], 200);
}

$resource = $parts[0];
$id = $parts[1] ?? null;

$db = loadDB();

if ($resource !== 'tasks') {
    respond(['error' => 'Recurso no encontrado'], 404);
}

// --- Métodos ---
switch ($method) {
    case 'GET':
        if ($id === null) {
            respond($db['tasks']);
        } else {
            foreach ($db['tasks'] as $t) {
                if ((string)$t['id'] === (string)$id) respond($t);
            }
            respond(['error' => 'Task no encontrada'], 404);
        }
        break;

    case 'POST':
        $body = readBody();
        $title = trim($body['title'] ?? '');
        if ($title === '') respond(['error' => 'title es requerido'], 400);

        $task = [
            'id' => nextId($db['tasks']),
            'title' => $title,
            'done' => (bool)($body['done'] ?? false),
            'created_at' => date('c'),
        ];
        $db['tasks'][] = $task;
        saveDB($db);
        respond($task, 201);
        break;

    case 'PUT':
        if ($id === null) respond(['error' => 'ID requerido'], 400);
        $body = readBody();

        $updated = null;
        foreach ($db['tasks'] as &$t) {
            if ((string)$t['id'] === (string)$id) {
                if (isset($body['title'])) $t['title'] = trim((string)$body['title']);
                if (isset($body['done']))  $t['done']  = (bool)$body['done'];
                $updated = $t;
                break;
            }
        }
        if (!$updated) respond(['error' => 'Task no encontrada'], 404);
        saveDB($db);
        respond($updated);
        break;

    case 'DELETE':
        if ($id === null) respond(['error' => 'ID requerido'], 400);
        $found = false;
        $db['tasks'] = array_values(array_filter($db['tasks'], function ($t) use ($id, &$found) {
            if ((string)$t['id'] === (string)$id) { $found = true; return false; }
            return true;
        }));
        if (!$found) respond(['error' => 'Task no encontrada'], 404);
        saveDB($db);
        respond(['deleted' => (int)$id]);
        break;

    default:
        respond(['error' => 'Método no soportado'], 405);
}
```

> Nota: si no usas Apache o no tienes `PATH_INFO`, también puedes acceder con `index.php?path=/tasks` o `index.php?path=/tasks/1`.

# 4) Pruebas rápidas con `curl`

```bash
# Listar
curl -s http://localhost/api/index.php?path=/tasks

# Crear
curl -s -X POST http://localhost/api/index.php?path=/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Aprender PHP", "done": false}'

# Obtener por ID
curl -s http://localhost/api/index.php?path=/tasks/1

# Actualizar
curl -s -X PUT http://localhost/api/index.php?path=/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'

# Borrar
curl -s -X DELETE http://localhost/api/index.php?path=/tasks/1
```

# 5) Notas rápidas

* Es un ejemplo **didáctico**: usa archivo `data.json` (no concurrente). Para producción, usa base de datos (PDO con SQLite/MySQL).
* Agrega validaciones y auth si lo necesitas (tokens, API keys, etc.).
* Si lo sirves en Apache: coloca `.htaccess` y podrás usar `/tasks` y `/tasks/1` directamente.
