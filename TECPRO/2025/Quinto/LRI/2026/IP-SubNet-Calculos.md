# 🧪 Trabajo Práctico Integrador

## 📡 Cálculo de Dirección de Red y Broadcast

## 🎯 Objetivos

* Aplicar operaciones lógicas (**AND, OR, NOT**)
* Calcular dirección de red y broadcast
* Interpretar máscara y wildcard
* Comprender el funcionamiento a nivel binario

---

# 🧠 PARTE 1: Recordatorio conceptual guiado

## 📌 Fórmulas clave

👉 Dirección de red:

```
IP AND Máscara
```

👉 Máscara wildcard:

```
255.255.255.255 - Máscara
```

👉 Dirección de broadcast:

```
Red OR Wildcard
```

---

## 🧠 Idea clave

> La red se obtiene “apagando” bits de host (AND)
> El broadcast se obtiene “encendiendo” bits de host (OR)

---

# ✏️ PARTE 2: Ejercicio resuelto guiado

## 📌 Datos

* IP: 192.168.1.100
* Máscara: 255.255.255.0

---

## 🔹 Paso 1: Dirección de red

```
192.168.1.100 AND 255.255.255.0 = 192.168.1.0
```

---

## 🔹 Paso 2: Wildcard

```
255.255.255.255 - 255.255.255.0 = 0.0.0.255
```

---

## 🔹 Paso 3: Broadcast

```
192.168.1.0 OR 0.0.0.255 = 192.168.1.255
```

---

# 🟢 PARTE 3: Nivel básico (cálculo directo)

## ✏️ Consigna

Calcular:

* Dirección de red
* Wildcard
* Broadcast

---

### 🔹 Ejercicio 1

* IP: 192.168.10.25
* Máscara: 255.255.255.0

---

### 🔹 Ejercicio 2

* IP: 192.168.5.200
* Máscara: 255.255.255.0

---

### 🔹 Ejercicio 3

* IP: 10.0.0.15
* Máscara: 255.0.0.0

---

# 🟡 PARTE 4: Nivel intermedio (interpretación)

## ✏️ Consigna

Sin hacer cuentas completas, responder:

---

### 🔹 Caso A

* IP: 192.168.1.50
* Máscara: 255.255.255.0

👉 ¿El broadcast termina en .255? ¿Por qué?

---

### 🔹 Caso B

* IP: 172.16.10.5
* Máscara: 255.255.0.0

👉 ¿Qué parte cambia en el broadcast?

---

### 🔹 Caso C

* IP: 10.10.10.10
* Máscara: 255.0.0.0

👉 ¿Cuántos octetos son de host?

---

# 🟠 PARTE 5: Nivel binario (comprensión profunda)

## ✏️ Consigna

Resolver en binario:

---

### 🔹 Ejercicio

IP:

```
192.168.1.100
```

Máscara:

```
255.255.255.0
```

---

### 📌 Pasos

1. Pasar a binario
2. Aplicar AND → obtener red
3. Obtener wildcard
4. Aplicar OR → obtener broadcast

---

## 🧠 Pregunta clave

👉 ¿Qué bits cambian entre red y broadcast?

---

# 🔴 PARTE 6: Nivel avanzado (subnetting conceptual)

## ✏️ Consigna

---

### 🔹 Ejercicio

* IP: 192.168.1.130
* Máscara: 255.255.255.128

---

### 📌 Resolver:

1. Dirección de red
2. Dirección de broadcast
3. Rango de hosts válidos

---

## 🧠 Pista

👉 255.255.255.128 divide la red en bloques de 128

---

# 🔵 PARTE 7: Desafío integrador

## ✏️ Situación real

Una red tiene:

* IP: 192.168.50.70
* Máscara: 255.255.255.192

---

### 📌 Resolver:

1. Dirección de red
2. Dirección de broadcast
3. Primer host
4. Último host
5. Cantidad de hosts posibles

---

## 🧠 Pista

👉 255.255.255.192 → bloques de 64

---

# 🧩 PARTE 8: Análisis conceptual

Responder:

1. ¿Por qué el AND “apaga” bits?
2. ¿Por qué el OR “enciende” bits?
3. ¿Qué representa realmente el broadcast?
4. ¿Por qué no se puede asignar a un dispositivo?

---

# 📦 ENTREGA

📘 El cuaderno debe incluir:

* Procedimientos completos
* Cálculos (no solo resultados)
* Justificación conceptual

---

# 🧩 CRITERIOS DE EVALUACIÓN

✔️ Uso correcto de AND / OR
✔️ Cálculo de wildcard
✔️ Identificación de red y broadcast
✔️ Comprensión binaria
✔️ Resolución de subnetting básico

---

# 🚀 VALOR PEDAGÓGICO

Este TP logra que el alumno:

* Entienda redes a nivel real (no superficial)
* Trabaje lógica binaria aplicada
* Comprenda cómo funcionan routers y redes
* Se prepare para certificaciones (Cisco, etc.)

---

# 🔥 FRASE CLAVE FINAL

> “El AND define la red, el OR define el alcance total de la red”

---
