## Enciende cada LED secuencialmente alternando entre rojo, verde y azul, luego apaga todo y repite.

```cpp
#include <Adafruit_NeoPixel.h>

#define PIN_NEOPIXEL  14
#define NUM_LEDS      3

Adafruit_NeoPixel strip(NUM_LEDS, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800);

void setup() {
  strip.begin();
  strip.setBrightness(50);
  strip.show();
}

void loop() {
  for (int i = 0; i < NUM_LEDS; i++) {
    strip.clear();
    // Asignar color según la posición: rojo, verde o azul
    if (i % 3 == 0) {
      strip.setPixelColor(i, 255, 0, 0);   // Rojo
    } else if (i % 3 == 1) {
      strip.setPixelColor(i, 0, 255, 0);   // Verde
    } else {
      strip.setPixelColor(i, 0, 0, 255);   // Azul
    }
    strip.show();
    delay(200);
  }

  strip.clear();
  strip.show();
  delay(1000);
}
```

**Conceptos utilizados:**
- `strip.clear()` borra todos los colores en memoria.
- `strip.setPixelColor(pos, r, g, b)` define el color de un LED.
- `strip.show()` envía los cambios a la tira.
- `i % 3` (resto de la división por 3) permite alternar entre tres colores.

Este código es ideal para empezar: solo necesitas la tira conectada al pin 27 y verás cada LED encenderse con un color distinto en secuencia, apagarse un segundo y volver a empezar.


---

## Explicación línea por línea del código simplificado de NeoPixel.

```cpp
#include <Adafruit_NeoPixel.h>
```
**Incluye la librería** Adafruit_NeoPixel, que contiene todas las funciones para controlar tiras de LEDs direccionables. Sin esta línea, el compilador no reconocería las funciones como `strip.begin()`.

```cpp
#define PIN_NEOPIXEL  27
```
**Define una constante** llamada `PIN_NEOPIXEL` con valor 27. Es el número de pin del ESP32 donde conectas el cable de datos (DIN) de la tira. Usar `#define` permite cambiar el pin fácilmente en un solo lugar.

```cpp
#define NUM_LEDS      8
```
**Define la cantidad de LEDs** de la tira. Si tu tira tiene 8 LEDs, este número es 8. Si tuvieras 12, solo cambiarías este valor y todo el código se adaptaría.

```cpp
Adafruit_NeoPixel strip(NUM_LEDS, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800);
```
**Crea el objeto `strip`** (la tira). Los parámetros son:
- `NUM_LEDS`: cuántos LEDs tiene la tira.
- `PIN_NEOPIXEL`: pin de datos.
- `NEO_GRB + NEO_KHZ800`: configuración del tipo de LED. `NEO_GRB` indica el orden de colores (verde, rojo, azul) que espera la tira. `NEO_KHZ800` es la velocidad de comunicación (800 kHz), estándar para WS2812B.

```cpp
void setup() {
```
**Inicio de la función setup()**. Se ejecuta una sola vez al encender o reiniciar el ESP32. Aquí se configuran las cosas iniciales.

```cpp
  strip.begin();
```
**Inicializa la tira NeoPixel**. Prepara los pines y la comunicación con los LEDs. Debe llamarse antes de usar cualquier otra función de la tira.

```cpp
  strip.setBrightness(50);
```
**Ajusta el brillo global** de la tira. El valor va de 0 (apagado) a 255 (máximo brillo). Aquí se pone a 50, que es aproximadamente el 20% de brillo. Esto no cambia los colores, solo la intensidad luminosa. Es útil para no encandilar y para reducir el consumo.

```cpp
  strip.show();
```
**Envía los datos a la tira**. Como todavía no hemos puesto ningún color, todos los LEDs se apagan (quedan en negro). Es una forma de asegurarse de que la tira comience apagada.

```cpp
}
```
**Fin de setup()**.

```cpp
void loop() {
```
**Inicio de loop()**. Esta función se ejecuta una y otra vez infinitamente después de setup(). Aquí va la lógica principal.

```cpp
  for (int i = 0; i < NUM_LEDS; i++) {
```
**Bucle `for`** que recorre cada LED de la tira. `i` empieza en 0, se incrementa en 1 cada vuelta, y se repite mientras `i` sea menor que `NUM_LEDS` (8). Por lo tanto, `i` tomará los valores 0, 1, 2, 3, 4, 5, 6, 7 (los índices de los LEDs).

```cpp
    strip.clear();
```
**Limpia todos los colores** en la memoria interna de la tira. Esto pone todos los LEDs en color negro (apagado), pero **no** los apaga físicamente todavía; solo prepara los datos en memoria. Es necesario para que al encender un LED, los demás estén apagados.

```cpp
    // Asignar color según la posición: rojo, verde o azul
```
**Comentario**. No tiene efecto en el programa, solo sirve para que los humanos entiendan qué hace el código siguiente. 🫩​

```cpp
    if (i % 3 == 0) {
```
**Condición `if`**. El operador `%` obtiene el resto de la división entera. `i % 3` devuelve 0, 1 o 2 según el valor de `i`. Si `i % 3 == 0` (es decir, cuando `i` es 0, 3, 6...), se ejecuta lo que está dentro de estas llaves.

```cpp
      strip.setPixelColor(i, 255, 0, 0);   // Rojo
```
**Establece el color del LED número `i`** en rojo puro. Los parámetros son: índice del LED, componente rojo (255), componente verde (0) y componente azul (0). Esto lo guarda en memoria, no lo muestra aún.

```cpp
    } else if (i % 3 == 1) {
```
**Si la condición anterior fue falsa**, se evalúa esta nueva. `i % 3 == 1` ocurre cuando `i` es 1, 4, 7...

```cpp
      strip.setPixelColor(i, 0, 255, 0);   // Verde
```
**Color verde** para esos LEDs (índices 1, 4, 7). Componente verde en 255, rojo y azul en 0.

```cpp
    } else {
```
**Si ninguna de las dos condiciones anteriores se cumplió**, significa que `i % 3 == 2` (cuando `i` es 2, 5, 8...). Se ejecuta este bloque.

```cpp
      strip.setPixelColor(i, 0, 0, 255);   // Azul
```
**Color azul** para los LEDs restantes. Componente azul en 255, rojo y verde en 0.

```cpp
    }
```
**Cierre del bloque if/else**. Todo el condicional termina aquí.

```cpp
    strip.show();
```
**Envía los datos a la tira física**. Hasta ahora todo se guardó en memoria; al llamar a `show()`, los LEDs se actualizan: se apagan todos (por el `clear()` anterior) y se enciende solo el LED `i` con el color asignado.

```cpp
    delay(200);
```
**Pausa de 200 milisegundos** (0,2 segundos). Durante este tiempo, el LED queda encendido y luego pasa al siguiente. Esta pausa **bloquea** el programa; no se puede hacer nada más mientras tanto. En proyectos más avanzados se reemplaza por `millis()` para no bloquear, pero para un ejemplo básico está bien.

```cpp
  }
```
**Fin del bucle `for`**. Cuando `i` llega a 8, el bucle termina y se sale de él.

```cpp
  strip.clear();
```
**Limpia la memoria** de colores (todos apagados) después de haber recorrido todos los LEDs.

```cpp
  strip.show();
```
**Envía el apagado a la tira**. Ahora todos los LEDs quedan apagados físicamente.

```cpp
  delay(1000);
```
**Espera 1 segundo** con la tira apagada para que se note el ciclo completo, y luego `loop()` se repite desde el principio, creando un efecto interminable.

```cpp
}
```
**Fin de loop()**.

## Resumen visual del flujo
1. Se enciende el LED 0 en rojo, se apaga, se enciende el LED 1 en verde, se apaga, se enciende el LED 2 en azul, se apaga... así hasta el LED 7.
2. Luego todos apagados durante 1 segundo.
3. Se repite indefinidamente.

Este código es ideal para familiarizarte con las operaciones básicas: inicializar, limpiar, asignar colores, mostrar y usar retardos simples.