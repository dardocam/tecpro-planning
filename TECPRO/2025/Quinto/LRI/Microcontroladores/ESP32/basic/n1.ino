#include <Adafruit_NeoPixel.h>

#define PIN_NEOPIXEL  12
#define NUM_LEDS      6
#define PIN_BUTTON    13      // Usá un pin seguro, no el 12

Adafruit_NeoPixel strip(NUM_LEDS, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800);

// Colores fijos de cada LED
uint32_t colores[NUM_LEDS] = {
  strip.Color(255, 0, 0),     // Rojo
  strip.Color(255, 165, 0),   // Naranja
  strip.Color(255, 255, 0),   // Amarillo
  strip.Color(0, 255, 0),     // Verde
  strip.Color(0, 0, 255),     // Azul
  strip.Color(128, 0, 128)    // Violeta
};

enum EstadoJuego { CORRIENDO, FRENANDO, DETENIDO };
EstadoJuego estado = CORRIENDO;

int ledActual = NUM_LEDS - 1;   // empezamos en 5, el primer avance irá al 0
unsigned long tUltimoPaso = 0;
unsigned long intervalo = 80;    // ms entre saltos
unsigned long tDetenido = 0;
const unsigned long duracionResultado = 3000; // 3 s

// Botón
bool estadoBoton = HIGH;  // NUEVO: estado actual estable del botón
bool ultimoEstadoBoton = HIGH;
unsigned long tUltimoRebote = 0;
const unsigned long retardoRebote = 50;

// Parpadeo mientras está detenido
bool ledEncendido = true;
unsigned long tUltimoParpadeo = 0;

void setup() {
  Serial.begin(115200);
  strip.begin();
  strip.setBrightness(95);
  strip.show();

  pinMode(PIN_BUTTON, INPUT_PULLUP);
  Serial.println("🟢 Juego listo. Botón siempre activo: STOP o REINICIAR.");
}

void loop() {
  // --- Lectura robusta del botón con antirrebotes ---
  bool lectura = digitalRead(PIN_BUTTON);
  if (lectura != ultimoEstadoBoton) {
    tUltimoRebote = millis();
  }
  if ((millis() - tUltimoRebote) > retardoRebote) {
    // El estado es estable
    if (lectura != estadoBoton) {
      estadoBoton = lectura;
      // Flanco de bajada (presionado)
      if (estadoBoton == LOW) {
        botonPulsado();  // NUEVO: se llama siempre, la decisión se toma dentro
      }
    }
  }
  ultimoEstadoBoton = lectura;

  // --- Máquina de estados del juego ---
  unsigned long ahora = millis();

  switch (estado) {
    case CORRIENDO:
      if (ahora - tUltimoPaso >= intervalo) {
        avanzarLuz();
        tUltimoPaso = ahora;
      }
      break;

    case FRENANDO:
      if (ahora - tUltimoPaso >= intervalo) {
        avanzarLuz();
        tUltimoPaso = ahora;
        intervalo = intervalo * 1.25;
        if (intervalo > 600) {
          estado = DETENIDO;
          tDetenido = ahora;
          ledEncendido = true;     // empezar a parpadear
          tUltimoParpadeo = ahora;
          Serial.print("🔴 Detenido en LED ");
          Serial.println(ledActual);
        }
      }
      break;

    case DETENIDO:
      // Parpadeo del LED ganador para indicar que está detenido
      if (ahora - tUltimoParpadeo >= 400) {
        tUltimoParpadeo = ahora;
        ledEncendido = !ledEncendido;
        strip.clear();
        if (ledEncendido) {
            strip.setPixelColor(ledActual, colores[ledActual]);
        }
        strip.show();
      }
      // Reinicio automático tras duracionResultado
      if (ahora - tDetenido >= duracionResultado) {
        reiniciarJuego();
      }
      break;
  }
}

void avanzarLuz() {
  ledActual = (ledActual + 1) % NUM_LEDS;   // primero mover el puntero
  strip.clear();
  strip.setPixelColor(ledActual, colores[ledActual]); // encender el LED al que apunta
  strip.show();
}

void botonPulsado() {
  // NUEVO: ahora el botón siempre es útil
  if (estado == CORRIENDO) {
    estado = FRENANDO;
    Serial.println("⏸️  Frenando...");
  } else if (estado == DETENIDO) {
    // NUEVO: si ya está detenido, reinicia al instante
    Serial.println("🔁 Reinicio manual");
    reiniciarJuego();
  }
  // Si está FRENANDO, no hacemos nada (evitamos reinicios accidentales)
}

void reiniciarJuego() {
  estado = CORRIENDO;
  intervalo = 80;
  strip.clear();
  strip.show();
  Serial.println("🔄 Juego reiniciado");
}