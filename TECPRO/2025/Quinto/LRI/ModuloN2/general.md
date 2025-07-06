## 🎓 **Módulo 2: Introducción a los Microcontroladores y Conectividad**

**🎯 Objetivo:**
Familiarizar a los estudiantes con los microcontroladores y su conexión a redes locales, preparando el terreno para la comunicación IoT.

---

### 📘 **Tema 9 – Introducción a los Microcontroladores**

**🎓 Teoría**

* ¿Qué es un microcontrolador?
* Comparativa de plataformas:

  * **Arduino Uno** (ATmega328P)
  * **ESP8266 / ESP32** (con WiFi integrado)
  * **Raspberry Pi (Pico o SBC)** *(según disponibilidad)*
* Arquitectura básica:

  * Unidad de procesamiento (CPU)
  * Memoria (Flash, RAM)
  * Entradas/Salidas (GPIO)
* Ciclo de vida de un sistema embebido
* Aplicaciones típicas en IoT, automatización, domótica, etc.

**🔧 Práctica**

* Actividad: Análisis físico de placas reales.
* Actividad grupal: Armar un cuadro comparativo de características.

---

### 🛠️ **Tema 10 – Configuración del Entorno de Desarrollo**

**🎓 Teoría**

* Herramientas necesarias:

  * **Arduino IDE**
  * Alternativas: PlatformIO, Thonny (para Raspberry Pico con MicroPython)
* Instalación de drivers y librerías.
* Carga de programas mediante puerto USB.
* Estructura de un sketch de Arduino:

  ```cpp
  void setup() {
    // configuración
  }

  void loop() {
    // se ejecuta en bucle
  }
  ```

**🔧 Práctica**

* Instalación guiada del entorno de desarrollo.
* Primer código: Encender y apagar un LED ("Hola Mundo" embebido).
* Diagnóstico de errores comunes al compilar/cargar.

---

### 🧠 **Tema 11 – Programación Básica en Microcontroladores**

**🎓 Teoría**

* Entradas y salidas digitales:

  * `pinMode()`, `digitalWrite()`, `digitalRead()`
* Sensores básicos:

  * **LDR** (sensor de luz)
  * **NTC** (sensor de temperatura)
* Monitor Serial y `Serial.print()` para depuración.
* Delays, ciclos, y condiciones simples (`if`, `for`)

**🔧 Práctica**

* Conexión de un sensor LDR a un pin analógico.
* Programar lectura de valores y mostrarlos en el monitor serial.
* Actividad de laboratorio:

  * Si la luz es baja, encender un LED rojo.
  * Si la luz es alta, encender un LED verde.

---

### 📡 **Tema 12 – Conectividad WiFi en Microcontroladores**

**🎓 Teoría**

* Conceptos clave:

  * Módulos WiFi: ESP8266, ESP32
  * Redes WiFi, DHCP y dirección IP
  * Proceso de conexión a una red inalámbrica
* Librería `WiFi.h` (ESP32) o `ESP8266WiFi.h`
* Estructura básica para conexión:

  ```cpp
  WiFi.begin("SSID", "password");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
  ```

**🔧 Práctica**

* Configuración y conexión a la red WiFi del aula.
* Mostrar dirección IP asignada en el monitor serial.
* Diagnóstico de errores de red: contraseña incorrecta, sin señal, etc.

---

## 📦 Materiales Necesarios por Clase

| Clase | Materiales mínimos requeridos                            |
| ----- | -------------------------------------------------------- |
| 9     | Placas Arduino / ESP / Raspberry, proyectores, fichas    |
| 10    | PCs con Arduino IDE, cable USB, resistencias, LED        |
| 11    | Sensores (LDR, NTC), LEDs, resistencias, protoboard      |
| 12    | Módulos WiFi, acceso a red local, adaptadores USB-serial |

---

## 🧪 Evaluación Continua Sugerida

* ✅ **Autoevaluaciones breves** al finalizar cada clase.
* 🧩 **Mini-proyecto integrador parcial**: Sensado + conexión WiFi.
* 🛠 **Desafíos prácticos**: Diagnóstico de fallos, interpretar salidas.

---
