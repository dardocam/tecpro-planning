# 🚦 Semáforo con modo PARPADEO AMARILLO

## ¿Qué cambia?
- Se agrega un **4º estado: `PARPADEO`**.
- Al recibir el comando MQTT (por ejemplo `semaforo/todos/set` con `"PARPADEO"`) el semáforo entra en **parpadeo amarillo** durante `T_PARPADEO` ms y luego **reinicia la secuencia principal desde ROJO**.
- El parpadeo **no bloquea** el loop → MQTT y WiFi siguen funcionando.



## 🔁 Cómo funciona el parpadeo

1. Llega un comando MQTT (p. ej. `semaforo/todos/set` → `"PARPADEO"`).
2. `alRecibir()` llama a `cambiar(PARPADEO)`.
3. Durante `T_PARPADEO` ms (por defecto 6 s) el LED amarillo se prende y apaga cada `T_BLINK` ms (400 ms).
4. Al terminar, `cambiar(ROJO)` reinicia la secuencia principal (`ROJO → VERDE → AMARILLO → ROJO…`).
5. Se publica `PARPADEO` y luego `ROJO` por MQTT → el panel ve todo en vivo.

> El `return` después del bloque de parpadeo evita que la secuencia principal siga contando mientras parpadea.

---

## 🧪 Prueba rápida

Ver los estados en vivo:
```
mosquitto_sub -h 192.168.1.100 -t "semaforo/+/estado" -v
```

Provocar el parpadeo (con cualquier comando):
```
mosquitto_pub -h 192.168.1.100 -t "semaforo/1/set" -m "PARPADEO"
```

También funciona con `"ROJO"`, `"VERDE"`, `"AMARILLO"` → siempre entra en parpadeo primero.

---

## ⏱️ Ajustes rápidos
| Macro | Qué controla |
|---|---|
| `T_PARPADEO` | Cuánto dura el parpadeo antes de reiniciar (6 s) |
| `T_BLINK` | Velocidad del parpadeo (400 ms) |
| `T_ROJO`, `T_VERDE`, `T_AMARILLO` | Duraciones del ciclo normal |

Si quieres que **solo** `"PARPADEO"` dispare el parpadeo (y los otros comandos cambien directo al color), cambia `alRecibir()` así:

```cpp
if (msg == "PARPADEO" || msg == "BLINK") cambiar(PARPADEO);
else if (msg == "ROJO"     || msg == "RED")    cambiar(ROJO);
else if (msg == "AMARILLO" || msg == "YELLOW") cambiar(AMARILLO);
else if (msg == "VERDE"    || msg == "GREEN")  cambiar(VERDE);
```

---

## El problema de "arrancar al recibir"

Si en el callback hacés:

```cpp
void onMqtt(char* topic, byte* payload, unsigned int len) {
  NTP.update();          // ~100-300 ms
  runMainSequence();     // arranca AHORA
}
```

Cada ESP32 arranca en el instante en que **él** recibe el mensaje + el tiempo que le toma NTP. La variación entre nodos es típicamente **10–200 ms** (latencia WiFi + jitter del broker + tiempo de NTP). Para muchas aplicaciones alcanza, pero no es "al mismo tiempo" en sentido estricto.

## La solución: transmitir el **instante objetivo**, no la orden de arrancar

El mensaje MQTT no dice "arrancá ahora", sino **"arrancá a las `T_start`"**:

```
Topic:  esp32/sync
Payload: 1760438400   (Unix timestamp del instante de arranque)
```

Cada nodo, al recibirlo:

```cpp
void onMqtt(char* topic, byte* payload, unsigned int len) {
  long target = atol((char*)payload);  // instante absoluto de arranque
  NTP.update();                         // aseguro que mi reloj es confiable
  time_t now = time(nullptr);
  long wait_ms = (target - now) * 1000 - millis_offset();
  if (wait_ms > 0) delay(wait_ms);      // espero hasta T_start
  runMainSequence();                     // todos arrancan en T_start
}
```

Así, aunque el nodo A reciba el mensaje a las 10:00:00.050 y el nodo B a las 10:00:00.120, **ambos arrancan en 10:00:05.000** (o el `T_start` que definiste). La precisión pasa a ser la del reloj NTP local: **±1–5 ms** entre nodos.




