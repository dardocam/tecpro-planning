Aquí tienes una propuesta completa para tu clase de programación con ESP32, centrada en construir un semáforo de LEDs y comparar dos enfoques: el bloqueante (con `delay`) y el profesional con máquina de estados finitos (no bloqueante). El material está pensado para explicar los conceptos de forma gradual y práctica.

---

## 🎯 Objetivos de la clase

- Controlar LEDs con un ESP32 (salidas digitales).
- Implementar un semáforo básico: rojo → rojo+amarillo → verde → amarillo → rojo...
- Comprender por qué `delay()` impide hacer otras tareas al mismo tiempo.
- Introducir el concepto de **máquina de estados finitos (FSM)**.
- Implementar el semáforo como FSM usando `millis()` para hacerlo **no bloqueante**.
- Comparar ambos enfoques y ver ejemplos de tareas concurrentes (ej. añadir un pulsador peatonal o un segundo semáforo).

---

## 🧰 Material necesario

- Placa ESP32 (cualquier modelo con pines GPIO)
- 3 LEDs (rojo, amarillo, verde) + resistencias de 220 Ω
- Protoboard y cables
- Opcional: 1 pulsador + resistencia de 10 kΩ (para extensión)
- Ordenador con Arduino IDE y soporte para ESP32 instalado

---

## 🔌 Esquema de conexión

| Componente    | Pin ESP32 |
|---------------|-----------|
| LED rojo      | GPIO 25   |
| LED amarillo  | GPIO 26   |
| LED verde     | GPIO 27   |
| Pulsador (opcional) | GPIO 14 (con pull-up) |

Conecta cada LED con su resistencia limitadora (~220 Ω) a tierra.

---

## 📚 Estructura de la clase (60–90 min)

### 1. Introducción (10 min)
- ¿Qué es un semáforo? Secuencia de tiempos fijos.
- Enfoque “fácil” usando `delay()`: ¿por qué se bloquea el programa?
- Demostración rápida del código con `delay()`.

### 2. Código versión 1: con `delay()` (15 min)
Escribir, cargar y probar:

```cpp
#define PIN_ROJO   25
#define PIN_AMAR    26
#define PIN_VERDE  27

void setup() {
  pinMode(PIN_ROJO, OUTPUT);
  pinMode(PIN_AMAR, OUTPUT);
  pinMode(PIN_VERDE, OUTPUT);
}

void loop() {
  // Rojo 5 seg
  digitalWrite(PIN_ROJO, HIGH);
  digitalWrite(PIN_AMAR, LOW);
  digitalWrite(PIN_VERDE, LOW);
  delay(5000);

  // Rojo + Amarillo 2 seg
  digitalWrite(PIN_AMAR, HIGH);
  delay(2000);

  // Verde 5 seg
  digitalWrite(PIN_ROJO, LOW);
  digitalWrite(PIN_AMAR, LOW);
  digitalWrite(PIN_VERDE, HIGH);
  delay(5000);

  // Amarillo 2 seg
  digitalWrite(PIN_VERDE, LOW);
  digitalWrite(PIN_AMAR, HIGH);
  delay(2000);
}
```

**Pregunta al grupo:** ¿Qué pasa si mientras está en rojo queremos atender un pulsador peatonal? (Queda claro que el `delay` impide hacer otra cosa).

### 3. Transición a máquina de estados (10 min – teoría)
- Explica el concepto de **estado** (rojo, rojoAmarillo, verde, amarillo).
- Cada estado define qué LEDs están encendidos y cuánto tiempo debe durar.
- Se usa `millis()` para medir el tiempo sin detener el programa.
- Se dibuja un diagrama sencillo de transiciones.

### 4. Código versión 2: FSM no bloqueante (20 min)
Implementación limpia con `enum`, `switch` y `millis()`:

```cpp
enum EstadoSemaforo {
  ROJO,
  ROJO_AMARILLO,
  VERDE,
  AMARILLO
};

EstadoSemaforo estadoActual = ROJO;
unsigned long tiempoEstado = 0;  // momento en que entró al estado

// Duración de cada estado en ms
const unsigned long T_ROJO = 5000;
const unsigned long T_ROJO_AMAR = 2000;
const unsigned long T_VERDE = 5000;
const unsigned long T_AMAR = 2000;

void setup() {
  pinMode(PIN_ROJO, OUTPUT);
  pinMode(PIN_AMAR, OUTPUT);
  pinMode(PIN_VERDE, OUTPUT);
  // Establecer estado inicial
  cambiarEstado(ROJO);
}

void loop() {
  unsigned long ahora = millis();
  bool cambiar = false;

  // ¿Toca cambiar de estado?
  switch (estadoActual) {
    case ROJO:
      if (ahora - tiempoEstado >= T_ROJO) cambiar = true;
      break;
    case ROJO_AMARILLO:
      if (ahora - tiempoEstado >= T_ROJO_AMAR) cambiar = true;
      break;
    case VERDE:
      if (ahora - tiempoEstado >= T_VERDE) cambiar = true;
      break;
    case AMARILLO:
      if (ahora - tiempoEstado >= T_AMAR) cambiar = true;
      break;
  }

  if (cambiar) {
    // Avanzar al siguiente estado
    switch (estadoActual) {
      case ROJO:          cambiarEstado(ROJO_AMARILLO); break;
      case ROJO_AMARILLO: cambiarEstado(VERDE); break;
      case VERDE:         cambiarEstado(AMARILLO); break;
      case AMARILLO:      cambiarEstado(ROJO); break;
    }
  }

  // Aquí puedes leer pulsadores, enviar datos, etc., porque loop() nunca se bloquea.
}

void cambiarEstado(EstadoSemaforo nuevo) {
  // Apagar todos los LEDs primero
  digitalWrite(PIN_ROJO, LOW);
  digitalWrite(PIN_AMAR, LOW);
  digitalWrite(PIN_VERDE, LOW);

  // Encender los que corresponden al nuevo estado
  switch (nuevo) {
    case ROJO:
      digitalWrite(PIN_ROJO, HIGH);
      break;
    case ROJO_AMARILLO:
      digitalWrite(PIN_ROJO, HIGH);
      digitalWrite(PIN_AMAR, HIGH);
      break;
    case VERDE:
      digitalWrite(PIN_VERDE, HIGH);
      break;
    case AMARILLO:
      digitalWrite(PIN_AMAR, HIGH);
      break;
  }

  estadoActual = nuevo;
  tiempoEstado = millis();  // reiniciar el cronómetro del estado
}
```

**Prueba:** ejecutar el semáforo, comprobar que funciona igual pero el `loop()` puede estar haciendo otras cosas (por ejemplo, imprimir por serial sin retraso).

### 5. Demostración de concurrencia (10 min)
Añade un pulsador peatonal que, al pulsarse, active una interrupción o simplemente se lea en cada `loop()`. Si el semáforo está en rojo, puede acortar el tiempo o poner un LED azul adicional. Como el sistema ya no se bloquea, es trivial.

Fragmento de ejemplo dentro de `loop()`:
```cpp
if (digitalRead(PIN_PULSADOR) == LOW) {  // supone pull-up
  // Ejemplo: si está en ROJO y se pulsa, forzar transición a verde más rápido
  if (estadoActual == ROJO && (millis() - tiempoEstado > 2000)) {
    cambiarEstado(ROJO_AMARILLO);  // salto bajo demanda
  }
}
```

### 6. Comparativa y debate (10 min)

| Característica               | `delay()`              | Máquina de estados (`millis()`) |
|------------------------------|------------------------|----------------------------------|
| ¿Bloquea el procesador?      | Sí                     | No                               |
| ¿Puede hacer varias tareas?  | No (secuencial forzado)| Sí (lectura de sensores, comunicación, etc.) |
| Código simple                | Muy fácil              | Más estructurado pero robusto    |
| Escalabilidad                | Pobre                  | Excelente                        |
| Uso en proyectos reales      | Solo pruebas pequeñas  | Estándar en firmware profesional |

**Conclusión:** La máquina de estados es la forma correcta de programar sistemas embebidos que deben reaccionar a eventos y gestionar múltiples temporizaciones concurrentes.

---

## 🧩 Posibles extensiones para alumnos avanzados

- Agregar un segundo semáforo (cruce) sincronizado usando una sola máquina de estados.
- Incorporar un sensor de luz para modo noche (luz ámbar intermitente).
- Comunicación Bluetooth con el móvil para cambiar tiempos.
- Manejo de interrupciones reales con `attachInterrupt()`.

---

## 📝 Tarea sugerida

“Agrega un LED azul de ‘peatón’ que se encienda cuando el semáforo está en rojo y se apague al pasar a verde. Asegúrate de que el parpadeo del azul (500 ms ON, 500 ms OFF) funcione sin bloquear el sistema, utilizando otra pequeña máquina de estados o simplemente revisando `millis()` dentro del mismo loop.”

---
Vamos a profundizar en el corazón de la solución no bloqueante: **la máquina de estados finitos (FSM – Finite State Machine)**. Entender bien este concepto es la clave para escribir firmware profesional y escalable.

---

## 1. ¿Qué es una máquina de estados finitos?

Es un modelo de comportamiento compuesto por:

- Un conjunto **finito de estados** (ej. ROJO, VERDE, AMARILLO).
- **Transiciones** entre esos estados, que ocurren cuando se cumple una **condición** (evento o temporizador).
- **Acciones** que se ejecutan al entrar, salir o permanecer en un estado.

Pensemos en el semáforo: no puede estar en dos estados a la vez. En cada momento el sistema *está* en uno de ellos y sabe exactamente a cuál debe ir después y cuándo.

---

## 2. Componentes fundamentales en código

Los materiales de construcción son muy simples:

- **Enum para los estados**: legible, extensible.
  ```cpp
  enum Estado { ROJO, ROJO_AMARILLO, VERDE, AMARILLO };
  Estado estadoActual;
  ```

- **Variable para el reloj del estado**: `unsigned long tiempoEstado` guarda el millis() del momento en que se entró al estado actual.

- **Tabla de duraciones** (puede ser un array o constantes) para saber cuánto tiempo quedarse en cada estado.

- **Función `cambiarEstado(nuevoEstado)`**: apaga lo necesario, enciende lo que corresponde al nuevo estado y reinicia el `tiempoEstado`.

- **Lógica de evaluación en `loop()`**: simplemente preguntamos "¿ha pasado ya el tiempo necesario en este estado?". Si sí, disparamos la transición.

Todo esto hace que `loop()` nunca espere, solo revisa condiciones y actúa cuando toca. Así la CPU queda libre para atender otras tareas.

---

## 3. Tipos de máquinas de estados (Moore vs Mealy)

Para sistemas embebidos nos interesa especialmente la **máquina de Moore**, donde las salidas (qué LEDs están encendidos) dependen *únicamente del estado actual*. Es la más intuitiva y la que usamos en el semáforo:

> **Estado ROJO** → LED rojo encendido (siempre igual mientras esté en ese estado).

La **máquina de Mealy** hace que las salidas dependan del estado *y de las entradas actuales*. Un ejemplo sería un semáforo que parpadea el verde cuando un peatón ha pulsado un botón mientras está en VERDE. No usaremos Mealy por ahora, pero es bueno conocer la diferencia.

---

## 4. Diseño del semáforo como FSM (diagrama)

Representemos la secuencia en ASCII para visualizarla:

```
         ┌─────────┐
         │  ROJO   │─────── temporizador 5 s ──────┐
         └─────────┘                               │
              │                                     ▼
              │                             ┌──────────────┐
              │                             │ ROJO_AMARILLO│
              │                             └──────────────┘
              │                                     │
              │                          temporizador 2 s
              │                                     │
              │                                     ▼
              │                               ┌─────────┐
              │                               │  VERDE  │
              │                               └─────────┘
              │                                     │
              │                          temporizador 5 s
              │                                     │
              │                                     ▼
              │                               ┌──────────┐
              └───────────────────────────────│ AMARILLO │
                     temporizador 2 s         └──────────┘
```

- Las flechas son **transiciones** disparadas por el **evento temporizador**.
- Las **acciones de entrada** en cada estado encienden los LEDs correspondientes y apagan los demás.

No hay bifurcaciones, es una secuencia circular simple, pero la estructura permite agregar eventos (como un pulsador) que fuercen transiciones adicionales (por ejemplo, de ROJO a VERDE bajo demanda).

---

## 5. ¿Por qué `millis()` y no `delay()`? – La diferencia de paradigma

| Con `delay()`                            | Con FSM y `millis()`                              |
|------------------------------------------|---------------------------------------------------|
| El programa se duerme, no puede hacer nada más. | El `loop()` itera miles de veces por segundo.    |
| Difícil añadir un segundo semáforo o un botón.  | Puedes gestionar decenas de tareas concurrentes. |
| El tiempo se maneja con retrasos relativos.     | Cada estado tiene una referencia absoluta de inicio. |
| Código spaghetti para cualquier tarea extra.    | El código se organiza en estados, muy modular.    |

En la práctica, una FSM con `millis()` es como tener un cronómetro para cada estado: miras el reloj, comparas y actúas sin quedarte parado.

---

## 6. Implementación paso a paso de una FSM genérica (patrón)

Voy a mostrarte una receta que puedes aplicar a **cualquier proyecto con estados**:

### a. Define los estados con `enum`
```cpp
enum class EstadoSemaforo { ROJO, ROJO_AMARILLO, VERDE, AMARILLO };
```
(Recomiendo `enum class` para evitar colisiones de nombres, pero `enum` simple también sirve).

### b. Crea una estructura o variables globales
```cpp
EstadoSemaforo estado = EstadoSemaforo::ROJO;
unsigned long tiempoInicioEstado = 0;
```

### c. Escribe una función de transición
```cpp
void cambiarA(EstadoSemaforo nuevoEstado) {
  // Acción de salida (apagar todo)
  // Acción de entrada (encender según nuevoEstado)
  // Actualizar variables
  estado = nuevoEstado;
  tiempoInicioEstado = millis();
}
```

### d. En `loop()`, evalúa condiciones y transita
```cpp
void loop() {
  unsigned long ahora = millis();
  switch (estado) {
    case EstadoSemaforo::ROJO:
      if (ahora - tiempoInicioEstado >= 5000) cambiarA(EstadoSemaforo::ROJO_AMARILLO);
      break;
    // ... otros estados
  }

  // OTRAS TAREAS NO BLOQUEANTES AQUÍ
}
```

Este patrón es escalable: si necesito añadir un modo "intermitente" por fallo, creo un nuevo estado `INTERMITENTE` y las transiciones pertinentes.

---

## 7. Extensión realista: semáforo peatonal con FSM

Imagina que queremos añadir un pulsador peatonal. Mientras el semáforo está en ROJO, el peatón puede solicitar el cruce. Agregamos un **evento de entrada**:

- En el estado ROJO, además del temporizador, comprobamos si el pulsador ha sido presionado *y* ya hemos superado un tiempo mínimo de rojo (para evitar cambios instantáneos).
- Si se cumple, cambiamos al estado `ROJO_AMARILLO` incluso si no han pasado los 5 s completos.

La máquina ahora tiene dos posibles disparadores desde ROJO:
1. Temporizador completo (5 s).
2. Pulsador + tiempo mínimo (2 s).

Esto se expresa con condiciones OR en la evaluación:

```cpp
case EstadoSemaforo::ROJO:
  if ( (ahora - tiempoInicioEstado >= T_ROJO) ||
       (digitalRead(PIN_PULSADOR) == LOW && (ahora - tiempoInicioEstado >= 2000)) )
  {
    cambiarA(EstadoSemaforo::ROJO_AMARILLO);
  }
  break;
```

Sigue sin bloquear. Podríamos añadir un LED peatonal que parpadea mientras el semáforo del coche está en VERDE, usando otra variable de temporización y un flag en ese mismo `loop()`. La FSM nos da orden y capacidad de crecimiento.

---

## 8. Buenas prácticas al programar FSM en embebidos

- **Inicializa siempre el estado en `setup()`** usando la misma función `cambiarA()`, para que las acciones de entrada se ejecuten desde el principio.
- **No uses `delay()` dentro de las acciones** de la máquina de estados. Si necesitas un parpadeo, crea un sub-estado o una máquina secundaria.
- **Documenta el diagrama de estados** en comentarios o en un documento aparte; ayuda mucho al mantenimiento.
- **Separa las preocupaciones**: una FSM para el semáforo, otra para la comunicación WiFi, otra para el sensor de movimiento, etc. Cada una con su `enum` y su función de actualización.
- **Cuidado con el desbordamiento de `millis()`**: si usas `unsigned long` y restas correctamente, el desbordamiento no causa errores. La resta de dos `unsigned long` en C++ sigue siendo correcta incluso cuando `millis()` da la vuelta (a los ~50 días). Ej: `ahora - tiempoInicioEstado` siempre da el tiempo transcurrido aunque haya overflow.

---

## 9. Para cerrar

Una máquina de estados convierte un problema complejo en una serie de situaciones discretas con reglas claras. Es la base de protocolos de comunicación, interfaces de usuario, control de motores, y por supuesto sistemas de tiempo real como los semáforos.

Si los alumnos dominan este patrón, serán capaces de estructurar casi cualquier firmware de manera robusta.

---

¡Perfecto! Vamos a crear juntos un **ejercicio práctico guiado** donde los estudiantes diseñan, programan y extienden un semáforo de cruce usando una máquina de estados finitos. Este ejercicio se puede dividir en etapas incrementales para que todos sigan el razonamiento.

---

## 🚦 Ejercicio guiado: Semáforo de cruce sincronizado (2 direcciones)

### 🎯 Objetivos de aprendizaje

- Modelar un sistema real (cruce de calles) con una máquina de estados finitos.
- Implementar la FSM en ESP32 usando `millis()` (código no bloqueante).
- Controlar dos semáforos simultáneos (6 LEDs) manteniendo la sincronización.
- Experimentar con la ampliación del sistema (pulsador peatonal) sin rehacer la estructura.

---

## 🧰 Material necesario (por pareja/grupo)

- 1 ESP32
- 6 LEDs (3 para cada semáforo: rojo, amarillo, verde) + resistencias de 220 Ω
- 1 pulsador + resistencia de 10 kΩ (modo pull-up)
- Cables y protoboard

---

## 📐 Lógica del cruce

Imaginemos un cruce simple de dos calles perpendiculares: **Norte‑Sur (NS)** y **Este‑Oeste (EW)**. La secuencia segura es:

1. **Verde NS** y rojo EW (tráfico circula por la calle NS).
2. **Amarillo NS** y rojo EW (precaución).
3. **Todo rojo** durante un breve tiempo (evita colisiones si alguien se pasa el amarillo).
4. **Verde EW** y rojo NS (cambio de sentido).
5. **Amarillo EW** y rojo NS.
6. **Todo rojo** otra vez.
7. Vuelta al paso 1.

Los tiempos típicos: Verde 5 s, Amarillo 2 s, Todo rojo 1 s.

---

## 🗺️ Paso 1 – Diseñar el diagrama de estados

Antes de escribir una línea de código, dibujamos el diagrama de la FSM.

```
          ┌──────────────┐
          │   NS_GREEN   │ Tiempo verde NS = 5000 ms
          │ NS:🟢 EW:🔴  │
          └──────┬───────┘
                 │ temporizador 5 s
                 ▼
          ┌──────────────┐
          │  NS_YELLOW   │ Tiempo amarillo NS = 2000 ms
          │ NS:🟡 EW:🔴  │
          └──────┬───────┘
                 │ temporizador 2 s
                 ▼
          ┌──────────────┐
          │ ALL_RED_NS   │ Tiempo todo rojo = 1000 ms (transición NS→EW)
          │ NS:🔴 EW:🔴  │
          └──────┬───────┘
                 │ temporizador 1 s
                 ▼
          ┌──────────────┐
          │   EW_GREEN   │ Tiempo verde EW = 5000 ms
          │ NS:🔴 EW:🟢  │
          └──────┬───────┘
                 │ temporizador 5 s
                 ▼
          ┌──────────────┐
          │  EW_YELLOW   │ Tiempo amarillo EW = 2000 ms
          │ NS:🔴 EW:🟡  │
          └──────┬───────┘
                 │ temporizador 2 s
                 ▼
          ┌──────────────┐
          │ ALL_RED_EW   │ Tiempo todo rojo = 1000 ms (transición EW→NS)
          │ NS:🔴 EW:🔴  │
          └──────┬───────┘
                 │ temporizador 1 s
                 └────► vuelve a NS_GREEN
```

Estados totales: 6. Las transiciones siempre son por temporizador. Las salidas (LEDs) dependen únicamente del estado (Máquina de Moore).

---

## 🧠 Paso 2 – Código base de la FSM

### Definición de pines (ajusta según tu conexión)

```cpp
// Semáforo Norte-Sur
const int pinNS_rojo   = 25;
const int pinNS_amar   = 26;
const int pinNS_verde  = 27;
// Semáforo Este-Oeste
const int pinEW_rojo   = 14;
const int pinEW_amar   = 12;
const int pinEW_verde  = 13;
```

### Enumeración de estados

```cpp
enum EstadoCruce {
  NS_GREEN,
  NS_YELLOW,
  ALL_RED_NS,
  EW_GREEN,
  EW_YELLOW,
  ALL_RED_EW
};
```

### Variables globales de la FSM

```cpp
EstadoCruce estadoActual = NS_GREEN;
unsigned long tiempoEstado = 0;  // millis() al entrar al estado
```

### Constantes de tiempo

```cpp
const unsigned long T_GREEN  = 5000;
const unsigned long T_YELLOW = 2000;
const unsigned long T_ALL_RED = 1000;
```

### Configuración inicial

```cpp
void setup() {
  // Configurar todos los pines como salida
  pinMode(pinNS_rojo, OUTPUT);
  pinMode(pinNS_amar, OUTPUT);
  pinMode(pinNS_verde, OUTPUT);
  pinMode(pinEW_rojo, OUTPUT);
  pinMode(pinEW_amar, OUTPUT);
  pinMode(pinEW_verde, OUTPUT);

  // Iniciar en el primer estado correctamente
  cambiarEstado(NS_GREEN);
}
```

### Función para cambiar de estado (acciones de entrada)

```cpp
void cambiarEstado(EstadoCruce nuevo) {
  // 1. Apagar todo
  digitalWrite(pinNS_rojo, LOW);
  digitalWrite(pinNS_amar, LOW);
  digitalWrite(pinNS_verde, LOW);
  digitalWrite(pinEW_rojo, LOW);
  digitalWrite(pinEW_amar, LOW);
  digitalWrite(pinEW_verde, LOW);

  // 2. Encender LEDs según el estado
  switch (nuevo) {
    case NS_GREEN:
      digitalWrite(pinNS_verde, HIGH);
      digitalWrite(pinEW_rojo, HIGH);
      break;
    case NS_YELLOW:
      digitalWrite(pinNS_amar, HIGH);
      digitalWrite(pinEW_rojo, HIGH);
      break;
    case ALL_RED_NS:
      digitalWrite(pinNS_rojo, HIGH);
      digitalWrite(pinEW_rojo, HIGH);
      break;
    case EW_GREEN:
      digitalWrite(pinNS_rojo, HIGH);
      digitalWrite(pinEW_verde, HIGH);
      break;
    case EW_YELLOW:
      digitalWrite(pinNS_rojo, HIGH);
      digitalWrite(pinEW_amar, HIGH);
      break;
    case ALL_RED_EW:
      digitalWrite(pinNS_rojo, HIGH);
      digitalWrite(pinEW_rojo, HIGH);
      break;
  }

  // 3. Actualizar estado y reiniciar cronómetro
  estadoActual = nuevo;
  tiempoEstado = millis();
}
```

### Lógica principal en `loop()`

```cpp
void loop() {
  unsigned long ahora = millis();
  bool cambiar = false;

  // Evaluar si se ha cumplido el tiempo en el estado actual
  switch (estadoActual) {
    case NS_GREEN:
      if (ahora - tiempoEstado >= T_GREEN) cambiar = true;
      break;
    case NS_YELLOW:
      if (ahora - tiempoEstado >= T_YELLOW) cambiar = true;
      break;
    case ALL_RED_NS:
      if (ahora - tiempoEstado >= T_ALL_RED) cambiar = true;
      break;
    case EW_GREEN:
      if (ahora - tiempoEstado >= T_GREEN) cambiar = true;
      break;
    case EW_YELLOW:
      if (ahora - tiempoEstado >= T_YELLOW) cambiar = true;
      break;
    case ALL_RED_EW:
      if (ahora - tiempoEstado >= T_ALL_RED) cambiar = true;
      break;
  }

  if (cambiar) {
    // Transición al siguiente estado
    switch (estadoActual) {
      case NS_GREEN:    cambiarEstado(NS_YELLOW); break;
      case NS_YELLOW:   cambiarEstado(ALL_RED_NS); break;
      case ALL_RED_NS:  cambiarEstado(EW_GREEN); break;
      case EW_GREEN:    cambiarEstado(EW_YELLOW); break;
      case EW_YELLOW:   cambiarEstado(ALL_RED_EW); break;
      case ALL_RED_EW:  cambiarEstado(NS_GREEN); break;
    }
  }

  // ¡Aquí podríamos leer sensores, comunicaciones, etc. sin bloquear!
}
```

📌 **Prueba:** Subir el programa y verificar que ambos semáforos cambian correctamente en secuencia.

---

## 🚶 Paso 3 – Extensión: pulsador peatonal (eventos externos)

Queremos que, si un peatón pulsa un botón mientras su semáforo está en rojo (ej. durante NS_GREEN), se acorte el tiempo de ese estado y se pase a verde para él más rápido.

### Añadir el pulsador

```cpp
const int pinBoton = 33; // con resistencia pull-up externa o INPUT_PULLUP
```
En `setup()`:
```cpp
pinMode(pinBoton, INPUT_PULLUP);
```

### Modificar la evaluación del estado NS_GREEN

En el `case NS_GREEN:` añadimos una condición extra:

```cpp
case NS_GREEN:
  if (ahora - tiempoEstado >= T_GREEN ||
      (digitalRead(pinBoton) == LOW && ahora - tiempoEstado >= 2000)) {
    cambiar = true;
  }
  break;
```

- La segunda parte significa: si el botón está presionado (`LOW` por la pull-up) **y** ya han pasado al menos 2 segundos de verde (evita cambios instantáneos peligrosos), forzamos la transición a amarillo.

### Comportamiento resultante

- Normalmente NS_GREEN dura 5 s.
- Si un peatón pulsa, y ya han pasado ≥2 s, el semáforo acorta el verde y pasa directamente a amarillo, acelerando el ciclo para darle paso al peatón (cuando el otro semáforo ponga verde). En un cruce real se añadiría además una luz peatonal, pero ya ves la potencia: la FSM absorbe eventos externos sin romperse.

---

## 🧪 Ejercicio propuesto para los estudiantes

1. **Añadir un LED peatonal blanco** para el cruce NS. Debe encenderse fijo cuando NS tiene rojo (es decir, en los estados EW_GREEN, EW_YELLOW, ALL_RED_EW) y apagarse en los demás. Hazlo dentro de `cambiarEstado()`.
2. **Hacer parpadear el LED peatonal** (500 ms ON, 500 ms OFF) en lugar de estar fijo. ¡Pista! Necesitarás una segunda máquina de estados o simplemente un flag y una variable `millis()` dentro del mismo `loop()`. Como el sistema no está bloqueado, puedes alternar el LED peatonal sin afectar a los semáforos.
3. **Sustituir los tiempos fijos por variables ajustables vía monitor serie** (recibiendo comandos como `GREEN=3000`). ¿Dónde pondrías esa lectura? Dentro del `loop()`, fuera de los `switch`, sin `delay()`.

---

## 📊 Comparativa final y reflexión

Una vez terminado, debate con el grupo:

- ¿Cuántas líneas de código habrían necesitado con `delay()` para lograr lo mismo?
- ¿Cómo manejarían el pulsador peatonal con `delay()`?
- ¿Qué pasaría si además quisieran conectar un sensor de tráfico o enviar datos a una app?
- ¿Entienden por qué en firmware profesional **no se usa `delay()`**?

La máquina de estados les ha permitido construir un sistema limpio, ampliable y cooperativo. Este mismo patrón se usa en lavadoras, ascensores, protocolos de comunicación (TCP, I2C) y robots.

---

## 📦 Resumen del material a entregar

- El esquema de conexiones (pines).
- El código completo sin y con pulsador.
- El diagrama ASCII de la FSM.
- Los tres ejercicios de ampliación.
