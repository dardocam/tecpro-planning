# 🧪 Actividad Práctica: Direccionamiento IP y Máscara de Subred

## 📚 Tema

Dirección IP – Máscara de subred – Identificación de red y host

## 🎯 Objetivo

* Identificar la red y el host en una IP
* Comprender el rol de la máscara
* Analizar comunicación entre dispositivos
* Introducir el razonamiento de subnetting

---

## 👥 Modalidad

* Individual o en parejas
* Resolución en cuaderno
* Trabajo progresivo por niveles

---

# 🟢 NIVEL 1: Identificación básica (Fundamentos)

## ✏️ Consigna

Dadas las siguientes direcciones IP con máscara:

* 192.168.1.10 / 255.255.255.0
* 192.168.1.25 / 255.255.255.0
* 192.168.1.200 / 255.255.255.0

👉 Completar:

| IP | Parte de Red | Parte de Host |
| -- | ------------ | ------------- |
| -- | ------------ | ------------- |
| -- | ------------ | ------------- |
| -- | ------------ | ------------- |


---

## 🧠 Preguntas

1. ¿Qué parte de la IP representa la red?
2. ¿Qué parte identifica al dispositivo?
3. ¿Qué tienen en común todas las direcciones?

---

# 🟡 NIVEL 2: Comparación de redes

## ✏️ Consigna

Analizar si los siguientes pares de dispositivos pueden comunicarse:

### Caso A

* 192.168.1.10 / 255.255.255.0
* 192.168.1.20 / 255.255.255.0

### Caso B

* 192.168.1.10 / 255.255.255.0
* 192.168.2.20 / 255.255.255.0

### Caso C

* 192.168.1.10 / 255.255.0.0
* 192.168.2.20 / 255.255.0.0

---

## 🧠 Responder

1. ¿En qué casos hay misma red?
2. ¿En qué casos no pueden comunicarse directamente?
3. ¿Qué cambia entre los casos B y C?

---

# 🟠 NIVEL 3: Interpretación de máscara

## ✏️ Consigna

Dadas las siguientes máscaras:

* 255.255.255.0
* 255.255.0.0
* 255.0.0.0

👉 Completar:

| Máscara | Parte de Red | Parte de Host |
| ------- | ------------ | ------------- |
| ------- | ------------ | ------------- |
| ------- | ------------ | ------------- |
| ------- | ------------ | ------------- |


---

## 🧠 Reflexión

1. ¿Qué ocurre cuando la máscara “se hace más grande”?
2. ¿Hay más dispositivos o menos disponibles?

---

# 🔵 NIVEL 4: Análisis aplicado

## ✏️ Situación

Una red tiene:

* IP: 192.168.10.50
* Máscara: 255.255.255.0

---

### 🔹 Consigna

Responder:

1. ¿Cuál es la red?
2. ¿Cuál es el host?
3. ¿Podría comunicarse con 192.168.10.80?
4. ¿Podría comunicarse con 192.168.11.20?

---

# 🔴 NIVEL 5: Introducción al subnetting (razonamiento)

## ✏️ Consigna

Dada la IP:

* 192.168.1.10

Analizar qué ocurre con estas máscaras:

* 255.255.255.0
* 255.255.255.128

---

## 🧠 Responder

1. ¿La red es la misma en ambos casos?
2. ¿Qué cambia al usar 255.255.255.128?
3. ¿La red se divide? Explicar

---

# 🧩 NIVEL 6: Desafío final (integrador)

## ✏️ Consigna

Determinar cuáles dispositivos pertenecen a la misma red:

| Dispositivo | IP            | Máscara       |
| ----------- | ------------- | ------------- |
| A           | 192.168.1.10  | 255.255.255.0 |
| B           | 192.168.1.200 | 255.255.255.0 |
| C           | 192.168.2.10  | 255.255.255.0 |
| D           | 192.168.1.50  | 255.255.0.0   |

---

## 🧠 Responder

1. ¿Qué dispositivos están en la misma red?
2. ¿Cuál es el “caso especial”?
3. Justificar cada respuesta

---

# 📦 Entrega

📘 El cuaderno debe incluir:

* Tablas completas
* Respuestas justificadas
* Procedimientos (no solo resultados)

---

# 🧩 Criterios de evaluación

✔️ Identificación correcta de red y host
✔️ Interpretación de máscara
✔️ Análisis de comunicación
✔️ Justificación lógica
✔️ Prolijidad

---

# 🚀 Valor pedagógico

Esta actividad logra que el alumno:

* Entienda la máscara (tema más difícil)
* Detecte redes sin memorizar
* Desarrolle pensamiento lógico
* Se prepare para subnetting real

---

# 🔥 Frase clave para cerrar

> “La IP te dice quién sos, pero la máscara define con quién podés hablar”

---
