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
 