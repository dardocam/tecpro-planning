Para lograr que el LED amarillo parpadee manteniendo una estructura similar a tu función `pintar()`, puedes crear una nueva función que alterne el estado de la luz (encendido/apagado) utilizando lapsos de tiempo con `delay()`.

Asumiendo que estás trabajando con un semáforo donde la luz amarilla ocupa una posición fija dentro del array (por ejemplo, el índice `1`), aquí tienes la implementación básica:

```cpp
// Función para hacer parpadear la luz amarilla
// Asumiendo que el índice 1 corresponde al LED amarillo
void parpadearAmarillo(int veces, int tiempo) {
  int indiceAmarillo = 1; // Cambia este índice si el amarillo está en otra posición (0, 1 o 2)

  // 1. Apagamos todos los LEDs primero
  for (int j = 0; j < 3; j++) {
    tira.setPixelColor(j, 0);
  }
  tira.show();

  // 2. Ejecutamos el parpadeo
  for (int i = 0; i < veces; i++) {
    // Enciende solo el amarillo
    tira.setPixelColor(indiceAmarillo, colorLed[indiceAmarillo]);
    tira.show();
    delay(tiempo);

    // Apaga el amarillo
    tira.setPixelColor(indiceAmarillo, 0);
    tira.show();
    delay(tiempo);
  }
}

```

### ¿Cómo usarla en tu código?

Puedes llamarla directamente en tu bucle principal (`loop()`) especificando cuántas veces quieres que parpadee y con qué intervalo de tiempo (en milisegundos):

```cpp
// Ejemplo: Parpadea 5 veces con intervalos de 500ms
parpadearAmarillo(5, 500); 

```

### Aspectos a tener en cuenta:

* **Índice del LED:** Asegúrate de que `indiceAmarillo` sea el número correcto (en arreglos de 3 posiciones suele ser `0` para rojo, `1` para amarillo y `2` para verde).
* **Bloqueo con `delay()`:** Esta función utiliza `delay()`, por lo que detendrá la ejecución de otras tareas mientras parpadea. Si necesitas que el programa lea botones u otros sensores al mismo tiempo, convendría implementarlo utilizando `millis()`.