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
