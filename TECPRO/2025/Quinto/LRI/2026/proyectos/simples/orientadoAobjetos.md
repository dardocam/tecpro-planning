# 📘 Guía educativa: Patrón State en C++ para un semáforo NeoPixel

Esta guía asume que ya viste el código y quieres **entender cada pieza**, tanto del patrón de diseño como del **C++ subyacente** (`*`, `&`, `~`, `->`, `virtual`, etc.).

---

## 1. ¿Qué es el patrón State?

El patrón **State** permite que un objeto **cambie su comportamiento cuando cambia su estado interno**, como si cambiara de clase.

Sin patrón, un semáforo se vería así:

```cpp
if (estado == ROJO) { ... }
else if (estado == VERDE) { ... }
else if (estado == AMARILLO) { ... }
```

Con patrón State, **cada estado es una clase** que sabe:
- Qué hacer al **entrar** (`enter`).
- Qué hacer mientras **está activo** (`update`).
- **A quién** delegar cuando debe cambiar.

Ventajas:
- Añadir un estado (intermitente, emergencia) = crear una clase nueva, **no tocar las existentes** (principio Open/Closed).
- Cada estado es independiente y fácil de probar.

---

## 2. Diagrama de clases

```
        ┌──────────────────┐
        │      State       │  (interfaz abstracta)
        │------------------│
        │ + enter(ctx)     │
        │ + update(ctx)    │
        └────────▲─────────┘
                 │ hereda
      ┌──────────┼──────────┐
      │          │          │
 ┌────────┐ ┌────────┐ ┌──────────┐
 │  Red   │ │ Green  │ │ Yellow   │
 └────────┘ └────────┘ └──────────┘
      ▲
      │ usa (contiene puntero a State)
 ┌──────────────────┐
 │  TrafficLight    │  (contexto)
 │------------------│
 │ - State* current │
 │ + setState(s)    │
 │ + update()       │
 └──────────────────┘
```

---

## 3. Teoría de C++ usada en el código

### 3.1 Punteros `*`

Un **puntero** guarda **la dirección de memoria** de otro objeto.

```cpp
State* current;   // "current es un puntero a State"
```

- `State*` se lee: *puntero a State*.
- No guarda el objeto, guarda **dónde está**.

### 3.2 Referencias `&`

Una **referencia** es un alias: otro nombre para el mismo objeto.

```cpp
void enter(TrafficLight& ctx);  // "ctx es una referencia a TrafficLight"
```

Usamos referencia cuando **no queremos copiar** el objeto y **no puede ser nulo**.
Un puntero puede ser `nullptr`, una referencia **no**.

Comparación rápida:

| Puntero `T*`        | Referencia `T&`        |
|---------------------|------------------------|
| Puede ser `nullptr` | Nunca es nula          |
| Se reasigna         | No se reasigna         |
| Acceso con `->`     | Acceso con `.`         |

### 3.3 Operador de acceso `->` y `.`

- `obj.metodo()` → cuando tienes el **objeto** (o una referencia).
- `ptr->metodo()` → cuando tienes un **puntero**. Equivale a `(*ptr).metodo()`.

En el código:
```cpp
current->enter(*this);   // current es puntero → usar ->
ctx.show(...)            // ctx es referencia → usar .
```

### 3.4 `*this` (desreferenciar `this`)

Dentro de un método, `this` es un **puntero al objeto actual**.
- `this` → tipo `TrafficLight*`.
- `*this` → el **objeto** en sí.

Cuando un método pide una **referencia** (`TrafficLight&`), debes pasar `*this`:

```cpp
current->enter(*this);   // pasamos el objeto actual como referencia
```

### 3.5 `virtual`, `override`, y funciones virtuales puras

**Polimorfismo**: llamar a un método a través de un puntero a la clase base y que se ejecute la versión de la clase derivada.

```cpp
virtual void update(TrafficLight& ctx) = 0;
```

- `virtual` → permite sobrescribir el método en clases hijas.
- `= 0` → **función virtual pura**: no tiene implementación; la clase `State` es **abstracta** (no se puede instanciar).
- `override` (en las clases hijas) → verifica en compilación que realmente estás sobrescribiendo.

**¿Por qué importa aquí?**

```cpp
State* current = &greenState;
current->update(trafficLight);   // llama GreenState::update, no State::update
```

Sin `virtual`, se llamaría a la versión de `State` (que no existe porque es pura). Con `virtual`, el compilador resuelve **en tiempo de ejecución** qué versión usar.

### 3.6 Destructor virtual `~State()`

```cpp
virtual ~State() {}
```

**Regla de oro**: si una clase tiene métodos virtuales y vas a destruir objetos derivados a través de un puntero base, el destructor **debe ser virtual**.

```cpp
State* s = new GreenState();
delete s;    // si ~State NO es virtual → fuga/UB
             // si ~State ES virtual → se llama ~GreenState correctamente
```

En nuestro código no usamos `new`, pero es **buena práctica** dejarlo virtual siempre que haya herencia.

El `~` es el operador **bitwise NOT** a nivel de bits… pero delante del nombre de una clase significa **destructor**. Contexto manda.

### 3.7 Declaraciones adelantadas (forward declarations)

```cpp
class TrafficLight;
class RedState;
```

Le dicen al compilador: *"existe una clase con este nombre, ya la definiré después"*. Necesario porque `State` usa `TrafficLight` y `TrafficLight` usa `State`: **dependencia circular**.

### 3.8 Variables globales `extern`

```cpp
extern RedState redState;
```

Le dice al compilador: *"esta variable existe en algún archivo, no la definas aquí, solo úsala"*. En un solo archivo `.ino` es opcional pero **aclara la intención**.

### 3.9 `const` en colores

```cpp
const uint32_t RED = strip.Color(255, 0, 0);
```

- `const` → no modificable (el compilador te avisa si intentas).
- `uint32_t` → entero sin signo de 32 bits. NeoPixel usa 32 bits por color (formato GRB empaquetado).

### 3.10 `millis()` y código no bloqueante

```cpp
unsigned long t0 = millis();
if (millis() - t0 >= 4000) { ... }
```

- `millis()` devuelve milisegundos desde el encendido.
- Comparamos **diferencias**, no valores absolutos → **resistente al desbordamiento** (cada ~49 días).
- **Nunca** usamos `delay()` dentro de `update()` porque bloquearía todo el sistema (no podrías leer botones, sensores, etc.).

---

## 4. Recorrido línea por línea del código

### 4.1 Librería y configuración

```cpp
#include <Adafruit_NeoPixel.h>
#define PIN       5
#define NUM_LEDS  3
#define BRILLO    80
Adafruit_NeoPixel strip(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);
```

- `#define` es una **macro del preprocesador**: sustituye texto antes de compilar. Para constantes modernas se prefiere `constexpr` / `const`, pero en Arduino es tradición usar `#define`.
- `NEO_GRB + NEO_KHZ800` → tipo de chip (WS2812B, orden de color GRB, 800 kHz).

### 4.2 Colores

```cpp
const uint32_t RED = strip.Color(255, 0, 0);
```

`strip.Color(r,g,b)` devuelve un `uint32_t` con los 3 bytes empaquetados. Lo guardamos una vez, así no recalculamos.

### 4.3 Interfaz State

```cpp
class State {
public:
  virtual ~State() {}
  virtual void enter(TrafficLight& ctx) {}     // opcional
  virtual void update(TrafficLight& ctx) = 0;  // obligatorio
};
```

- `enter` tiene implementación vacía → las clases hijas **pueden** sobrescribirla (ej. para cambiar de color).
- `update` es **pura** → obliga a cada estado a definirla.

### 4.4 Contexto TrafficLight

```cpp
class TrafficLight {
  State* current = nullptr;
public:
  void setState(State* s) {
    current = s;
    if (current) current->enter(*this);
  }
  void update() {
    if (current) current->update(*this);
  }
  void show(uint32_t c0, uint32_t c1, uint32_t c2) { ... }
};
```

Puntos clave:
- `current = nullptr` → **inicialización en sitio** (C++11), evita puntero colgante.
- `if (current)` → comprobación de seguridad antes de desreferenciar.
- `show()` encapsula el manejo del NeoPixel: los estados no conocen el hardware.

### 4.5 Un estado concreto (ej. Red)

```cpp
class RedState : public State {
  unsigned long t0;
public:
  void enter(TrafficLight& ctx) override {
    ctx.show(RED, OFF, OFF);
    t0 = millis();
  }
  void update(TrafficLight& ctx) override {
    if (millis() - t0 >= 4000) ctx.setState(&greenState);
  }
};
```

- `: public State` → **herencia** pública (es-un State).
- `override` → confirmación y protección contra errores de firma.
- `t0` es miembro **privado por defecto** en `class` (recuerda: en `class` todo es privado hasta que pongas `public:`).
- `&greenState` → pasamos la **dirección** del objeto global.

### 4.6 Instanciación y uso

```cpp
RedState redState;
GreenState greenState;
YellowState yellowState;
TrafficLight trafficLight;

void setup() {
  strip.begin();
  strip.setBrightness(BRILLO);
  strip.show();
  trafficLight.setState(&redState);   // arranca en rojo
}
void loop() {
  trafficLight.update();              // no bloqueante
}
```

---

## 5. ¿Por qué el `loop()` es tan corto?

Todo el trabajo ocurre dentro de `update()` del estado activo. `loop()` solo "da un pulso" al contexto. Esto es la esencia de la **máquina de estados no bloqueante**.

Flujo de una transición Rojo → Verde:

```
loop() → trafficLight.update()
       → current->update(*this)       // Red::update
       → pasa 4s → ctx.setState(&greenState)
                  → current = &greenState
                  → greenState.enter(ctx) → pinta verde
       → vuelve
```

---

## 6. Resumen de símbolos C++ vistos

| Símbolo | Significado                              | Ejemplo                          |
|---------|------------------------------------------|----------------------------------|
| `*`     | Puntero / desreferencia                  | `State* p; *p;`                  |
| `&`     | Referencia / dirección-de                | `State& r; &obj;`                |
| `->`    | Acceso a miembro vía puntero             | `p->update()`                    |
| `.`     | Acceso a miembro directo                 | `obj.update()`                   |
| `~`     | Destructor (o NOT bitwise)               | `~State()`                       |
| `::`    | Operador de ámbito                       | `Adafruit_NeoPixel::Color`       |
| `=`     | Asignación / `= 0` función virtual pura  | `virtual void f() = 0;`          |
| `virtual` | Habilita polimorfismo                  | `virtual void update()`          |
| `override` | Verifica sobrescritura                | `void update() override`         |

---

## 7. Ejercicios propuestos

1. **Añadir un botón** en GPIO 0 que active un estado `Emergency` (parpadeo amarillo).
2. **Estado `AllOff`**: apaga todo cuando no hay tráfico (simula con un segundo botón).
3. **Peatones**: crea un estado `PedestrianGreen` que encienda un 4.º LED blanco durante 3 s.
4. **Refactor**: cambia los `#define` por `constexpr uint8_t PIN = 5;`.
5. **Log por Serial**: haz que cada `enter()` imprima `"Entrando a estado X"` usando `Serial.println`.
6. **Transición con tabla**: en vez de que cada estado llame a `setState`, crea un `enum` y una tabla `next[state]` en el contexto.

---

## 8. Reglas de oro del patrón State

1. Cada estado **sabe** cuándo y a quién delegar.
2. El contexto **no decide transiciones**, solo delega.
3. Los estados **no bloquean** (nada de `delay()`).
4. Añadir estados **no modifica** el contexto ni los otros estados.
5. Si un estado necesita datos del contexto, pásale `*this` por referencia.

Con esto tienes la base para usar State en cualquier proyecto embebido: máquinas expendedoras, semáforos, menús de UI, protocolos de comunicación, etc. 🚦