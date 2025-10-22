# **
        <?php
        //composer require php-mqtt/client
        require __DIR__ . '/vendor/autoload.php';

        use PhpMqtt\Client\MqttClient;
        use PhpMqtt\Client\Exceptions\MqttClientException;

        //header('Content-Type: application/json');


        $f3 = \Base::instance();

        $f3->route('GET /', function(){
            echo "APP MQTT: http://192.168.0.200/mqtt";
        });

        $f3->route('GET /arduino/led/off',
            function() {
                try {
            // Configuración del broker Mosquitto
            $server   = '127.0.0.1';   // o la IP/hostname de tu servidor Mosquitto
            $port     = 1883;          // Puerto por defecto MQTT
            $clientId = 'php-client-' . rand(1000, 9999);

            $mqtt = new MqttClient($server, $port, $clientId);

            // Conectar al broker
            $mqtt->connect();

            // Parámetros del endpoint (ejemplo: ?topic=test&message=hola)
            $topic   = $_GET['topic'] ?? 'arduino/led';
            $message = $_GET['message'] ?? 'off';

            // Publicar mensaje
            $mqtt->publish($topic, $message, 0);

            // Desconectar
            $mqtt->disconnect();

            echo json_encode([
                "status"  => "success",
                "topic"   => $topic,
                "message" => $message,
            ]);

        } catch (MqttClientException $e) {
            http_response_code(500);
            echo json_encode([
                "status"  => "error",
                "message" => $e->getMessage(),
            ]);
        }
        });

        $f3->route('GET /arduino/led/on',
            function() {
                try {
            // Configuración del broker Mosquitto
            $server   = '127.0.0.1';   // o la IP/hostname de tu servidor Mosquitto
            $port     = 1883;          // Puerto por defecto MQTT
            $clientId = 'php-client-' . rand(1000, 9999);

            $mqtt = new MqttClient($server, $port, $clientId);

            // Conectar al broker
            $mqtt->connect();

            // Parámetros del endpoint (ejemplo: ?topic=test&message=hola)
            $topic   = $_GET['topic'] ?? 'arduino/led';
            $message = $_GET['message'] ?? 'on';

            // Publicar mensaje
            $mqtt->publish($topic, $message, 0);

            // Desconectar
            $mqtt->disconnect();

            echo json_encode([
                "status"  => "success",
                "topic"   => $topic,
                "message" => $message,
            ]);

        } catch (MqttClientException $e) {
            http_response_code(500);
            echo json_encode([
                "status"  => "error",
                "message" => $e->getMessage(),
            ]);
        }
        });


        $f3->run();
 ---
 

 ¡Excelente pregunta! Es un punto crucial que toca un error conceptual común al trabajar con MQTT y APIs HTTP. Voy a explicarte por qué **crear un endpoint POST `/subscribe` en `index.php` es una mala idea** en este contexto y cuál es la forma correcta de hacerlo.

---

### ❌ **El Problema Fundamental: Bloquerío y Escalabilidad**

El endpoint `/subscribe` que propuse en el ejemplo anterior es **técnicamente incorrecto** para una suscripción MQTT de larga duración. Aquí el por qué:

1.  **Una petición HTTP es efímera:** Un cliente HTTP (como un navegador o la herramienta `curl`) hace una solicitud POST y espera una respuesta. Una vez que el servidor envía la respuesta, la conexión se **cierra**. MQTT, por el contrario, necesita una conexión **persistente y abierta** para escuchar mensajes de forma continua.

2.  **El método `$mqtt->loop(true)` es bloqueante:** Cuando llamas a este método en el controlador, el proceso de PHP se queda esperando indefinidamente por mensajes MQTT. Esto significa:
    *   La petición HTTP **nunca terminará**, el cliente se quedará "colgado" esperando una respuesta que nunca llega.
    *   **Bloqueará un worker** completo de tu servidor web (Apache, Nginx + PHP-FPM). Si tienes 10 workers y 10 personas llaman a `/subscribe`, tu servidor web se quedará sin recursos y dejará de responder a otras peticiones.

3.  **No es escalable:** No puedes tener miles de clientes HTTP manteniendo una conexión abierta simultáneamente. Agotarías los recursos del servidor muy rápido.

---

### ✅ **La Solución Correcta: Separar las Responsabilidades**

La arquitectura correcta implica separar completamente la lógica de la **API HTTP** de la lógica del **Cliente Suscriptor MQTT**.

#### **Capa 1: API HTTP (index.php) - Para Publicar y Comandos**
*   **Función:** Recibe peticiones HTTP breves, realiza una acción (como publicar un mensaje MQTT) y responde inmediatamente.
*   **Endpoints válidos:**
    *   `POST /publish` → Publica un mensaje en un topic y responde `{"status": "success"}`.
    *   `GET /sensor/@id` → Consulta el último estado de un sensor desde una base de datos (no escuchando MQTT).
    *   `POST /semaphore/control` → Publica un comando para cambiar un semáforo.

#### **Capa 2: Worker de Suscripción MQTT (mqtt-worker.php) - Para Escuchar**
*   **Función:** Es un **script de línea de comandos (CLI)** que se ejecuta de forma independiente y permanente en segundo plano.
*   **Cómo funciona:**
    1.  Se conecta al broker MQTT.
    2.  Se suscribe a los topics que le interesan (ej: `logistica/entrada/#`, `vehiculos/+/posicion`).
    3.  Entra en un loop infinito (`->loop(true)`) escuchando mensajes.
    4.  Cuando un mensaje llega, su callback **toma acciones sin involucrar la API HTTP**:
        *   Guardar los datos en una base de datos (MySQL, InfluxDB).
        *   Procesar la lógica de negocio.
        *   Enviar una notificación push (ej: con WebSockets).
        *   Llamar a *otro* endpoint de la API *internamente* si es necesario.

### 🔧 **Cómo Debería Quedar el Código**

**1. `index.php` (Solo para publicar):**
```php
<?php
require 'vendor/autoload.php';

$f3 = \Base::instance();
$mqttService = App\Services\MqttService::getInstance();

// ENDPOINT PARA PUBLICAR - ¡Este sí es válido!
$f3->route('POST /publish', function($f3) use ($mqttService) {
    $topic = $f3->get('POST.topic');
    $message = $f3->get('POST.message');
    
    $mqttService->publish($topic, $message);
    
    echo json_encode(['status' => 'success', 'message' => 'Mensaje publicado']);
});

// ELIMINA el endpoint /subscribe de aquí

$f3->run();
?>
```

**2. `mqtt-worker.php` (El suscriptor real):**
```php
<?php
require 'vendor/autoload.php';

$mqttService = App\Services\MqttService::getInstance();
$db = new \DB\SQL('mysql:host=localhost;dbname=test', 'user', 'password');

// Suscripción para logística
$mqttService->subscribe('logistica/entrada/@id', function ($topic, $message) use ($db) {
    // 1. Procesar el mensaje
    $data = json_decode($message, true);
    $id = explode('/', $topic)[2]; // Extrae el ID dinámico del topic
    
    // 2. Guardar en Base de Datos (acción no bloqueante para la API)
    $db->exec(
        'INSERT INTO log_entradas (sensor_id, mensaje) VALUES (?, ?)',
        [$id, $message]
    );
    
    // 3. Puedes publicar otro mensaje como confirmación si es necesario
    // $mqttService->publish("logistica/confirmacion/$id", "OK");
    
    echo "[LOG] Entrada registrada desde $topic: $message\n";
});

// Mantiene el script vivo escuchando para siempre
$mqttService->loop(true);
?>
```

**3. Gestionar el worker con Supervisor:**
Como se mencionó antes, usas Supervisor para asegurarte de que el worker siempre esté corriendo, incluso si se cae.

```bash
# Instalar Supervisor (ejemplo en Ubuntu)
sudo apt-get install supervisor

# Crear un archivo de configuración para tu worker
sudo nano /etc/supervisor/conf.d/mqtt-worker.conf
```
Contenido del archivo:
```conf
[program:mqtt-worker]
command=php /ruta/completa/a/tu/proyecto/mqtt-worker.php
directory=/ruta/completa/a/tu/proyecto
autostart=true
autorestart=true
stderr_logfile=/var/log/mqtt-worker.err.log
stdout_logfile=/var/log/mqtt-worker.out.log
user=www-data
```
Luego, recarga y inicia el worker:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start mqtt-worker
```

---

# Gestión de Workers MQTT desde la API: Enfoques y Limitaciones

Es una pregunta excelente que toca el núcleo del diseño de sistemas distribuidos. La respuesta es: **Sí, es posible, pero no directamente desde el proceso de la API HTTP**. Te explico los enfoques correctos.

## ❌ Por qué no gestionar directamente desde la API HTTP

El problema fundamental es el **modelo de ejecución**:
- Los workers MQTT necesitan ejecutarse de forma continua (`loop(true)`)
- Una API HTTP funciona bajo el modelo de petición-respuesta (corta duración)
- Si intentas ejecutar el worker dentro de la API, bloquearás el hilo de ejecución

## ✅ Enfoques Correctos para Gestionar Workers

### 1. Usar SupervisorD + API de Supervisord (Recomendado)

**SupervisorD** tiene una API HTTP XML-RPC que puedes llamar desde tu API de Fat-Free:

```php
// En tu MqttController.php
public function restartWorker($f3) {
    $workerName = $f3->get('PARAMS.worker');
    
    // Configurar cliente para API de Supervisor
    $serverUrl = 'http://localhost:9001/RPC2';
    $client = new \GuzzleHttp\Client();
    
    try {
        $response = $client->post($serverUrl, [
            'body' => xmlrpc_encode_request('supervisor.stopProcess', [$workerName])
        ]);
        
        // Esperar y reiniciar
        sleep(2);
        $response = $client->post($serverUrl, [
            'body' => xmlrpc_encode_request('supervisor.startProcess', [$workerName])
        ]);
        
        echo json_encode(['status' => 'success', 'message' => 'Worker reiniciado']);
    } catch (\Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
```

### 2. Ejecutar Comandos Shell de Forma Controlada

```php
public function startWorker($f3) {
    $workerType = $f3->get('PARAMS.type');
    
    // Validar y sanitizar el input
    if (!in_array($workerType, ['logistica', 'monitoreo', 'alertas'])) {
        echo json_encode(['status' => 'error', 'message' => 'Tipo de worker inválido']);
        return;
    }
    
    // Ejecutar comando en segundo plano
    $command = "nohup php /path/to/workers/{$workerType}-worker.php > /dev/null 2>&1 & echo $!";
    $pid = shell_exec($command);
    
    // Guardar PID para gestión posterior
    file_put_contents("/tmp/{$workerType}.pid", $pid);
    
    echo json_encode(['status' => 'success', 'pid' => $pid]);
}
```

### 3. Sistema de Colas con Base de Datos

Crea una tabla de control para workers:

```sql
CREATE TABLE mqtt_workers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    status ENUM('running', 'stopped', 'restarting') DEFAULT 'stopped',
    last_heartbeat TIMESTAMP NULL,
    config JSON NOT NULL
);
```

Y luego en tu API:

```php
public function updateWorkerConfig($f3) {
    $workerId = $f3->get('PARAMS.id');
    $newConfig = $f3->get('POST.config');
    
    // Actualizar configuración en BD
    $db = new \DB\SQL('mysql:host=localhost;dbname=tu_db', 'user', 'pass');
    $db->exec(
        'UPDATE mqtt_workers SET config = ?, status = "restarting" WHERE id = ?',
        [json_encode($newConfig), $workerId]
    );
    
    // El worker periódicamente verifica si necesita reiniciarse
    echo json_encode(['status' => 'success', 'message' => 'Configuración actualizada']);
}
```

### 4. API REST para Gestión con Comunicación Indirecta

```php
// Endpoint para gestionar workers
$f3->route('POST /worker/@action', 'App\Controllers\WorkerController->manage');

// En WorkerController.php
class WorkerController {
    public function manage($f3) {
        $action = $f3->get('PARAMS.action');
        $worker = $f3->get('POST.worker');
        
        // Publicar comando de control via MQTT
        $mqttService = MqttService::getInstance();
        $mqttService->publish("workers/control/$worker", $action);
        
        echo json_encode([
            'status' => 'success', 
            'message' => "Comando $action enviado al worker $worker"
        ]);
    }
}
```

## 🛡️ Consideraciones de Seguridad Críticas

Cualquier API que permita ejecutar comandos es un riesgo de seguridad. Debes implementar:

1. **Autenticación y Autorización**:
   ```php
   // En tu bootstrap o antes de las rutas
   $f3->route('POST /worker/*', function($f3) {
       if (!$f3->get('SESSION.user') || !$f3->get('SESSION.user.is_admin')) {
           echo json_encode(['status' => 'error', 'message' => 'No autorizado']);
           exit;
       }
   });
   ```

2. **Validación estricta de inputs**:
   ```php
   $allowedActions = ['start', 'stop', 'restart', 'status'];
   if (!in_array($action, $allowedActions)) {
       // Rechazar acción no permitida
   }
   ```

3. **Rate limiting** para prevenir abuso.

## 📋 Ejemplo Completo: API de Gestión

```php
<?php
class WorkerController {
    
    private $allowedWorkers = ['logistica', 'monitoreo', 'vehiculos'];
    
    public function status($f3) {
        $worker = $f3->get('PARAMS.worker');
        
        if (!in_array($worker, $this->allowedWorkers)) {
            echo json_encode(['status' => 'error', 'message' => 'Worker no válido']);
            return;
        }
        
        // Verificar si el proceso está ejecutándose
        $output = shell_exec("pgrep -f '$worker-worker.php'");
        $isRunning = !empty($output);
        
        echo json_encode([
            'worker' => $worker,
            'status' => $isRunning ? 'running' : 'stopped',
            'pid' => $isRunning ? trim($output) : null
        ]);
    }
    
    public function restart($f3) {
        $worker = $f3->get('PARAMS.worker');
        
        // 1. Publicar mensaje de parada via MQTT
        $mqttService = MqttService::getInstance();
        $mqttService->publish("workers/$worker/control", "stop");
        
        // 2. Esperar breve momento
        sleep(2);
        
        // 3. Iniciar nuevo proceso
        $pid = shell_exec("nohup php /path/to/workers/$worker-worker.php > /dev/null 2>&1 & echo $!");
        
        echo json_encode([
            'status' => 'success', 
            'message' => "Worker $worker reiniciado",
            'pid' => trim($pid)
        ]);
    }
}
?>
```

## 🔄 Arquitectura Recomendada

```
┌─────────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│   API Fat-Free  │    │     SupervisorD      │    │   Workers MQTT   │
│   (HTTP/REST)   │───>│ (Gestiona procesos)  │───>│ (Scripts PHP CLI)│
└─────────────────┘    └─────────────────────┘    └──────────────────┘
         │                      │                           │
         │                      │                           │
         └──────────────────────┴───────────────────────────┘
                     Comunicación via MQTT
```

## 💡 Conclusión

**Sí puedes gestionar workers desde tu API**, pero no directamente. La forma correcta es:

1. Usar **SupervisorD** con su API XML-RPC (mejor opción)
2. Comunicación indirecta via **MQTT** para enviar comandos
3. **Base de datos** como intermediario para configuración
4. **Ejecución controlada** de comandos shell con validación estricta

El enfoque más robusto y seguro es usar SupervisorD + su API HTTP, ya que está específicamente diseñado para gestionar procesos y ofrece mecanismos de seguridad incorporados.

¿Te gustaría que profundice en alguno de estos enfoques en particular?