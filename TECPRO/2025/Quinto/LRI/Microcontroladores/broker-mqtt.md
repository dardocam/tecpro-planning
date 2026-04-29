**Broker público de HiveMQ**:

```bash
mosquitto_pub -h broker.hivemq.com -p 1883 -t "test/topic" -m "Hola desde HiveMQ"
```

**Para suscribirte:**
```bash
mosquitto_sub -h broker.hivemq.com -p 1883 -t "test/topic"
```

**Características:**
*   **Host:** `broker.hivemq.com`
*   **Puerto:** `1883` (TCP), `8883` (TLS), `80` y `443` (WebSockets).
*   **Sin autenticación requerida** para pruebas básicas.
*   Es muy estable y ampliamente utilizado para pruebas.

