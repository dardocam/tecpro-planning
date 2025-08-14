## **Clase: Arduino IV – Control de Servomotores y Motores Paso a Paso**

### 🎯 Objetivos de Aprendizaje

Al finalizar la clase, el estudiante será capaz de:

1. Comprender cómo funcionan los servomotores y motores paso a paso.
2. Conectar y controlar un servomotor usando la librería `Servo`.
3. Conectar y controlar un motor paso a paso usando un driver básico.
4. Implementar un ejemplo práctico con cada tipo de motor.

---

## **1. Repaso de conceptos previos**

* PWM y control de velocidad en motores DC.
* Uso de transistores y drivers para manejar motores.
* Lectura de entradas analógicas con potenciómetro.

---

## **2. Servomotores**

### 2.1. Características

* Movimiento limitado (0° a 180° en servos estándar).
* Control de posición precisa mediante señal PWM especial.
* Tres cables:

  * **Rojo:** +V (4.8–6V)
  * **Negro/Marrón:** GND
  * **Amarillo/Naranja:** señal.

---

### 2.2. Conexión básica

* Cable de señal → Pin digital de Arduino (ej. 9)
* Alimentación → +5V y GND
* Compartir GND con Arduino

---

### 2.3. Código básico con librería `Servo`

```cpp
#include <Servo.h>

Servo miServo;
int angulo = 0;

void setup() {
  miServo.attach(9); // Pin de señal del servo
}

void loop() {
  for (angulo = 0; angulo <= 180; angulo += 10) {
    miServo.write(angulo);
    delay(500);
  }
  for (angulo = 180; angulo >= 0; angulo -= 10) {
    miServo.write(angulo);
    delay(500);
  }
}
```

💡 Este código mueve el servo de 0° a 180° y viceversa.

---

## **3. Motores Paso a Paso**

### 3.1. Características

* Rotación controlada en **pasos** (movimientos discretos).
* Ideal para control de precisión (impresoras 3D, CNC, robótica).
* Requieren control especial mediante secuencias de pulsos.

---

### 3.2. Ejemplo con motor 28BYJ-48 + driver ULN2003

**Conexiones:**

* Conector del motor → módulo ULN2003
* IN1–IN4 del ULN2003 → pines 8, 9, 10, 11 de Arduino
* Alimentación módulo → +5V y GND

---

### 3.3. Código básico

```cpp
#include <Stepper.h>

const int pasosPorVuelta = 2048; // para 28BYJ-48
Stepper motor(pasosPorVuelta, 8, 10, 9, 11);

void setup() {
  motor.setSpeed(10); // Velocidad en RPM
}

void loop() {
  motor.step(pasosPorVuelta);   // 1 vuelta completa
  delay(1000);
  motor.step(-pasosPorVuelta);  // Vuelta en sentido contrario
  delay(1000);
}
```

---

## **4. Explicación de librerías**

* **Servo.h:** simplifica el control de posición enviando pulsos correctos.
* **Stepper.h:** permite manejar motores paso a paso definiendo pasos por revolución y velocidad.

---

## **5. Actividad práctica guiada**

1. Conectar y programar un servo para que se mueva de acuerdo a un potenciómetro (`analogRead()` → `miServo.write()`).
2. Hacer girar un motor paso a paso media vuelta en un sentido y media en otro.
3. Modificar la velocidad de giro usando un potenciómetro.

---

## **6. Evaluación rápida**

1. ¿Cuál es la diferencia entre un servomotor y un motor paso a paso?
2. ¿Qué librería se usa para controlar servos en Arduino?
3. ¿Qué parámetros se necesitan para inicializar un motor paso a paso?

---

## **7. Tarea**

Investigar el driver **A4988** y preparar un esquema para controlar un motor paso a paso NEMA 17 con Arduino.


