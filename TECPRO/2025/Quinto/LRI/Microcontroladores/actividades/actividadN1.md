## **Actividad Práctica en Tinkercad**

### 🎯 **Título:**

*“Mi primer programa en Arduino: Parpadeo de un LED”*

### 📝 **Consigna para los estudiantes:**

En esta actividad utilizarás **Tinkercad Circuits** para simular tu primer proyecto con Arduino UNO. El objetivo es **encender y apagar un LED** de manera intermitente usando un programa básico.

---

### **1. Materiales virtuales en Tinkercad**

* 1 placa **Arduino UNO**
* 1 **LED rojo**
* 1 **resistencia de 220 Ω**
* 1 **protoboard**
* Cables de conexión

---

### **2. Paso a paso (guía práctica)**

#### 🛠 **Montaje del circuito:**

1. Arrastra una placa Arduino UNO al área de trabajo.
2. Arrastra un **protoboard pequeño**.
3. Coloca un **LED** en la protoboard (recuerda que el pin largo es el **ánodo** y el corto es el **cátodo**).
4. Conecta el ánodo del LED → al **pin digital 13** de Arduino.
5. Conecta el cátodo del LED → a una resistencia de 220 Ω → luego a **GND**.

---

#### 💻 **Código a cargar en Tinkercad:**

```cpp
// Programa: Blink en Tinkercad
// Enciende y apaga un LED conectado al pin 13

void setup() {
  pinMode(13, OUTPUT);  // Configura el pin 13 como salida
}

void loop() {
  digitalWrite(13, HIGH); // Enciende LED
  delay(1000);            // Espera 1 segundo
  digitalWrite(13, LOW);  // Apaga LED
  delay(1000);            // Espera 1 segundo
}
```

---

### **3. Prueba y observación**

1. Haz clic en **Iniciar simulación** en Tinkercad.
2. Observa cómo el LED se enciende y apaga cada segundo.
3. Cambia los valores de `delay(1000)` a `delay(200)` y luego a `delay(2000)` para observar la diferencia en el parpadeo.

---

### **4. Variantes para experimentar**

* Cambiar el pin del LED a otro digital (ej. pin 8) y modificar el código.
* Conectar un segundo LED y hacerlo parpadear alternadamente con el primero.
* Usar un LED verde o amarillo para diferenciar.

---

## 🔎 **Desafío de la Actividad: “Semáforo básico”**

👉 **Reto:** Modifica tu proyecto en Tinkercad para que funcione como un **semáforo de un solo sentido**.

### **Instrucciones del desafío**

1. Agrega **dos LEDs más** al circuito:

   * **LED verde** conectado al pin 12.
   * **LED amarillo** conectado al pin 11.
   * (El LED rojo ya lo tienes en el pin 13).
2. Usa resistencias de **220 Ω** para cada LED.
3. Programa la secuencia típica de un semáforo:

   * **Rojo encendido** → 3 segundos
   * **Verde encendido** → 3 segundos
   * **Amarillo encendido** → 1 segundo
   * Repetir el ciclo indefinidamente.

---
### **Preguntas de cierre (reflexión)**

1. ¿Qué sucede si eliminas la resistencia del circuito?
2. ¿Por qué es importante identificar cuál es el ánodo y el cátodo del LED?
3. ¿Qué diferencia notas al cambiar los valores del `delay()`?
