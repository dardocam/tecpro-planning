## Temporizadores no bloqueantes con `millis()`

La clave es **reemplazar `delay()`** por el patrón de `millis() - inicio >= duracion`. Así el `loop()` sigue girando libremente.

### Patrón básico

```cpp
unsigned long inicio = 0;
const unsigned long duracion = 5000; // 5 segundos

void loop() {
  if (millis() - inicio >= duracion) {
    inicio = millis(); // reiniciar temporizador
    // acción a ejecutar
  }
  // el resto del código sigue corriendo cada iteración
}
```

> **Regla crítica:** siempre usa **sustracción** (`millis() - inicio`), nunca suma. La sustracción con `unsigned long` maneja correctamente el *overflow* de `millis()` (que se reinicia a 0 cada ~49,7 días).

### Integrado con la MEF

Cada estado puede llevar su propio temporizador:

```cpp
enum Estado { INICIO, ESPERANDO, ACCION, FIN };
Estado estadoActual = INICIO;

unsigned long tiempoEstado = 0;

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  tiempoEstado = millis();
}

void loop() {
  unsigned long ahora = millis();

  switch (estadoActual) {
    case INICIO:
      if (ahora - tiempoEstado >= 1000) { // 1 s
        estadoActual = ESPERANDO;
        tiempoEstado = ahora;
      }
      break;

    case ESPERANDO:
      // Aquí puedes leer sensores, botones, etc.
      if (digitalRead(2) == HIGH) {       // botón presionado
        estadoActual = ACCION;
        tiempoEstado = ahora;
      }
      break;

    case ACCION:
      digitalWrite(13, HIGH);
      if (ahora - tiempoEstado >= 3000) { // 3 s
        estadoActual = FIN;
        tiempoEstado = ahora;
      }
      break;

    case FIN:
      digitalWrite(13, LOW);
      if (ahora - tiempoEstado >= 2000) { // 2 s
        estadoActual = INICIO;
        tiempoEstado = ahora;
      }
      break;
  }
}
```

### Múltiples temporizadores independientes

Si necesitas varios timers simultáneos (p. ej., un sensor cada 2 s y un display cada 500 ms), simplemente declarás uno por tarea:

```cpp
unsigned long lastSensor = 0, lastDisplay = 0;

void loop() {
  unsigned long now = millis();

  if (now - lastSensor >= 2000) {
    lastSensor = now;
    // leer sensor
  }

  if (now - lastDisplay >= 500) {
    lastDisplay = now;
    // actualizar display
  }
}
```

### Errores comunes a evitar

| Error | Por qué falla |
|---|---|
| `delay()` | Congela todo el `loop()`; nada más se ejecuta |
| `millis() == inicio + duracion` | Puede saltarse el tick exacto; usa `>=` |
| `millis() > inicio + duracion` (suma) | Rompe en el *overflow* de 49,7 días |
| Variables `int` para tiempos | `int` es de 16 bits en AVR; usá siempre `unsigned long` |

### Alternativa: librería `arduino-timer`

Si preferís una API más limpia, la librería [arduino-timer](https://github.com/LuKks/arduino-timer) (~50 líneas) ofrece:

```cpp
#include <Timer.h>
Timer t;

void loop() {
  if (t.every(1000, "sensor")) {   // cada 1 s
    // leer sensor
  }
  if (t.every(500, "display")) {   // cada 500 ms
    // actualizar display
  }
}
```

Para la mayoría de proyectos, el **patrón `millis()` + sustracción** integrado en la MEF es suficiente y no requiere dependencias externas.

