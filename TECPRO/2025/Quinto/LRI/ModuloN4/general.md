## 🤖 **Unidad 4: Automatización y Control Remoto desde Aplicaciones Web o Móviles**

**🎯 Objetivo del módulo:**
Capacitar a los estudiantes para desarrollar sistemas que permitan el **control remoto** de dispositivos físicos mediante **interfaces web o móviles**, integrando sensores, actuadores y comunicación bidireccional sobre redes.

---

### 🧠 **Tema 19 – Fundamentos de Automatización IoT**

**🎓 Teoría**

* ¿Qué es la automatización? ¿Qué diferencia hay con el control manual?
* Elementos de un sistema automatizado:

  * Sensores
  * Procesamiento lógico (microcontrolador)
  * Actuadores
  * Condiciones o reglas (thresholds)
* Introducción a la lógica condicional en sistemas IoT

**🔧 Práctica**

* Diseñar en papel un sistema domótico (ej: control de luces según luz ambiente).
* Simulación básica de flujo de decisión con `if`, `else`, `switch`.

---

### 🔁 **Tema 20 – Actuadores y Control desde el Microcontrolador**

**🎓 Teoría**

* Tipos de actuadores:

  * Relés
  * Servomotores
  * Buzzer, LEDs de señalización
* Control digital vs. PWM
* Consideraciones eléctricas básicas: corriente, voltaje, protección

**🔧 Práctica**

* Conectar un LED o buzzer como actuador.
* Controlar encendido/apagado desde el código según una condición de sensor.
* Actividad: "Sistema de riego automatizado con humedad del suelo".

---

### 🌐 **Tema 21 – Control Remoto vía Interfaz Web**

**🎓 Teoría**

* Revisión del servidor web en ESP32
* Métodos HTTP usados para control (`GET`, `POST`)
* Generación dinámica de botones HTML con JavaScript

**🔧 Práctica**

* Crear una página web alojada en el ESP32 para encender/apagar un LED.
* Crear botones que envíen comandos al microcontrolador.
* Ejemplo de URL de control:

  ```
  http://192.168.1.100/led?state=on
  ```

---

### 📱 **Tema 22 – Control desde Aplicación Móvil (Blynk u otras)**

**🎓 Teoría**

* Revisión de plataformas no-code para móviles:

  * Blynk (botones, sliders, displays)
  * App Inventor o Flutter (opcional)
* Conceptos: autenticación con tokens, eventos, widgets

**🔧 Práctica**

* Crear un dashboard con Blynk
* Controlar un actuador desde el celular
* Visualizar en tiempo real el estado de un sensor (ej. temperatura o humedad)

---

### 🔐 **Tema 23 – Seguridad en Comunicación IoT**

**🎓 Teoría**

* Riesgos del control remoto: accesos no autorizados
* Buenas prácticas:

  * Redes locales seguras
  * Tokens de autenticación
  * Validación de comandos recibidos
* Introducción a HTTPS y cifrado básico (nivel conceptual)

**🔧 Práctica**

* Añadir validación de token en el código del microcontrolador
* Simular intento de acceso no autorizado y evitarlo con lógica simple

---

### 🧩 **Tema 24 – Proyecto Final Integrador del Módulo**

**🎓 Teoría**

* Definición del proyecto por equipo:

  * Objetivo funcional
  * Componentes (sensores, actuadores)
  * Tipo de interfaz (web o app móvil)
* Planificación de tareas (roles dentro del grupo)
* Diagrama de bloques del sistema

**🔧 Práctica**

* Desarrollo y pruebas del sistema
* Documentación de funcionamiento
* Presentación final del proyecto al aula (demo funcional)

---

## 📦 Materiales por Clase

| Clase | Materiales                                                    |
| ----- | ------------------------------------------------------------- |
| 19    | Protoboards, sensores simples, papel y lápiz                  |
| 20    | Relés, buzzers, LEDs, resistencias, sensores                  |
| 21    | ESP32, PC con WiFi, navegador moderno                         |
| 22    | Smartphone, app Blynk o alternativa, conexión WiFi            |
| 23    | Código de validación, red WiFi con contraseña                 |
| 24    | Todo el kit integrado por grupo: sensores + actuadores + WiFi |

---

## 🧪 Evaluación de Unidad

* ✔️ Evaluaciones prácticas por clase (checklist funcional)
* 📄 Mini informes de prácticas (diagrama + explicación + código)
* 🧪 **Proyecto grupal evaluado** según:

  * Funcionamiento del sistema
  * Control remoto efectivo
  * Código comentado y documentado
  * Presentación y comunicación oral

---

## 📍 Ejemplos de Proyectos Finales

* 🔆 **Control de luces desde celular según horario o luz ambiente**
* 💧 **Sistema de riego automático con control remoto**
* 🚪 **Alarma de movimiento con notificación por app**
* 🌡 **Monitoreo de temperatura y control de ventilador desde web**

---

