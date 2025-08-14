## **Clase: Arduino III – Salidas Analógicas (PWM) y Control de Motores**

### 🎯 Objetivos de Aprendizaje

Al finalizar la clase, el estudiante será capaz de:

1. Comprender qué es una salida analógica simulada (PWM) en Arduino.
2. Usar `analogWrite()` para controlar el brillo de LEDs y la velocidad de motores.
3. Conectar y controlar un motor de corriente continua con un transistor.
4. Implementar un circuito que ajuste la velocidad de un motor con un potenciómetro.

---

## **1. Repaso de conceptos previos**

* Entradas digitales y analógicas.
* Funciones básicas: `digitalRead()`, `analogRead()`, `digitalWrite()`.
* Uso de sensores para accionar salidas.

---

## **2. Salidas analógicas simuladas (PWM)**

### 2.1. ¿Qué es PWM?

* **PWM** (*Pulse Width Modulation*) es una técnica para simular voltajes intermedios mediante el encendido y apagado rápido de una señal digital.
* El valor enviado se ajusta entre **0** (0% encendido) y **255** (100% encendido).

📌 En Arduino UNO, los pines con **\~** (3, 5, 6, 9, 10, 11) soportan PWM.

---

### 2.2. Función básica

```cpp
analogWrite(pin, valorPWM);
```

* `pin`: pin PWM de salida.
* `valorPWM`: número entre 0 y 255.

---

## **3. Ejemplo 1: Control de brillo de un LED**

**Materiales:**

* 1 LED
* 1 resistencia de 220 Ω
* Cables y protoboard

**Código:**

```cpp
int led = 9;
int brillo = 0;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  for (brillo = 0; brillo <= 255; brillo++) {
    analogWrite(led, brillo);
    delay(10);
  }
  for (brillo = 255; brillo >= 0; brillo--) {
    analogWrite(led, brillo);
    delay(10);
  }
}
```

💡 Este código hace un efecto de **fade**.

---

## **4. Control de motores DC con Arduino**

### 4.1. Problema

* Los pines de Arduino no entregan suficiente corriente para mover un motor directamente.
* Solución: usar **transistores** como interruptores de potencia (ej. 2N2222, TIP120) o un módulo **driver** (ej. L298N, L293D).

---

### 4.2. Ejemplo 2: Motor controlado por potenciómetro

**Materiales:**

* 1 motor DC
* 1 transistor NPN (ej. TIP120)
* 1 diodo 1N4007 (protección contra picos)
* 1 resistencia de 1 kΩ
* 1 potenciómetro de 10 kΩ
* Fuente de 5V o 9V
* Protoboard y cables

**Conexión básica:**

* Potenciómetro → Pin A0
* Base del transistor → Pin 9 (PWM) con resistencia de 1 kΩ
* Emisor del transistor → GND
* Colector → un terminal del motor
* Otro terminal del motor → +V (5V/9V)
* Diodo en paralelo al motor (polaridad inversa).

---

**Código:**

```cpp
int pot = A0;
int motor = 9;
int valorPot = 0;
int velocidad = 0;

void setup() {
  pinMode(motor, OUTPUT);
}

void loop() {
  valorPot = analogRead(pot); // 0 a 1023
  velocidad = map(valorPot, 0, 1023, 0, 255);
  analogWrite(motor, velocidad);
}
```

---

## **5. Explicación del código**

* `analogRead(pot)` obtiene el valor del potenciómetro.
* `map()` convierte el rango de 0–1023 a 0–255 (PWM).
* `analogWrite(motor, velocidad)` regula la velocidad del motor.

---

## **6. Actividad práctica guiada**

1. Probar el fade de LED con PWM.
2. Conectar el motor con transistor y potenciómetro.
3. Modificar el código para que el motor se detenga si el potenciómetro está por debajo de un cierto valor.
4. Añadir impresión de la velocidad por `Serial.println()`.

---

## **7. Evaluación rápida**

1. ¿Qué significa PWM y para qué se usa?
2. ¿Por qué no podemos conectar el motor directamente a Arduino?
3. ¿Qué pines de Arduino UNO soportan PWM?

---

## **8. Tarea**

Investigar el funcionamiento y conexiones del módulo **L298N** para controlar motores DC y servomotores.

