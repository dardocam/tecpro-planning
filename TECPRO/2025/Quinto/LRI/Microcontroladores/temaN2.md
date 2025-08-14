## **Clase: Arduino II – Lectura de Sensores y Control de Salidas Digitales**

### 🎯 Objetivos de Aprendizaje

Al finalizar la clase, el estudiante será capaz de:

1. Comprender cómo Arduino lee datos desde sensores.
2. Utilizar entradas digitales y analógicas.
3. Controlar salidas digitales en respuesta a entradas.
4. Implementar un circuito básico que reaccione a un sensor.

---

## **1. Repaso de conceptos previos**

* Microcontrolador = cerebro del Arduino.
* Salidas digitales: `HIGH` (1) o `LOW` (0).
* LED integrado y su control con `digitalWrite()`.
* Funciones básicas: `setup()`, `loop()`, `pinMode()` y `delay()`.

---

## **2. Tipos de entradas y sensores**

### 2.1. Entradas digitales

* Solo detectan **dos estados**: encendido/apagado, 1/0, HIGH/LOW.
* Ejemplos: botón pulsador, sensor magnético, interruptor.

### 2.2. Entradas analógicas

* Detectan un **rango de valores** (0–1023 en Arduino UNO).
* Usan conversor **ADC** (Analog to Digital Converter).
* Ejemplos: potenciómetro, sensor de luz (LDR), sensor de temperatura.

📌 **Importante:**

* **digitalRead(pin)** → lee valor de un pin digital.
* **analogRead(pin)** → lee valor de un pin analógico.

---

## **3. Primer ejemplo: Botón que enciende un LED**

### 3.1. Materiales

* 1 Arduino UNO
* 1 pulsador
* 1 resistencia de 10 kΩ (pull-down)
* 1 LED
* 1 resistencia de 220 Ω
* Cables y protoboard

### 3.2. Circuito

```
Botón → Pin digital 2
LED → Pin digital 13 (o externo con resistencia)
Resistencia pull-down a GND
```

### 3.3. Código

```cpp
int boton = 2;
int led = 13;
int estadoBoton = 0;

void setup() {
  pinMode(boton, INPUT);
  pinMode(led, OUTPUT);
}

void loop() {
  estadoBoton = digitalRead(boton);
  
  if (estadoBoton == HIGH) {
    digitalWrite(led, HIGH);
  } else {
    digitalWrite(led, LOW);
  }
}
```

---

## **4. Segundo ejemplo: LDR que regula brillo de LED**

### 4.1. Materiales

* 1 LDR (sensor de luz)
* 1 resistencia de 10 kΩ
* 1 LED
* 1 resistencia de 220 Ω

### 4.2. Conexión

* LDR + resistencia → divisor de tensión en pin A0
* LED → pin 9 (salida PWM)

### 4.3. Código

```cpp
int ldr = A0;
int led = 9;
int valorLuz = 0;

void setup() {
  pinMode(led, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  valorLuz = analogRead(ldr); // 0-1023
  Serial.println(valorLuz);
  
  int brillo = map(valorLuz, 0, 1023, 0, 255); // Ajusta rango
  analogWrite(led, brillo);
  
  delay(50);
}
```

---

## **5. Explicación del código**

* `analogRead()` lee un valor proporcional a la luz detectada.
* `map()` convierte el rango 0–1023 en 0–255 para PWM.
* `analogWrite()` controla el brillo del LED.

---

## **6. Actividad práctica guiada**

1. Probar el ejemplo del botón.
2. Modificarlo para que **el LED cambie de estado solo cuando se presione el botón una vez** (requiere *toggle*).
3. Probar el ejemplo del LDR.
4. Cambiar el sensor por un potenciómetro y observar el efecto.

---

## **7. Evaluación rápida**

1. ¿Qué diferencia hay entre `digitalRead()` y `analogRead()`?
2. ¿Qué función se utiliza para cambiar el rango de valores?
3. ¿Qué es una resistencia pull-down y para qué se usa?

---

## **8. Tarea**

Investigar cómo conectar y programar un sensor de temperatura **LM35** en Arduino y preparar el código para mostrar el valor en el monitor serial.
