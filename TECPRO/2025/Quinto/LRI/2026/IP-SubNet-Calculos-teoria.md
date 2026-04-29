# 🧠 1. Dirección de red

👉 **Fórmula:**
**IP AND Máscara**

## 📌 ¿Qué significa?

Es la **primera dirección del bloque**, identifica la red (no se asigna a hosts).

Se obtiene haciendo una operación lógica **AND bit a bit** entre:

* la IP
* la máscara de subred

---

## ⚙️ ¿Qué hace el AND?

Regla básica:

| Bit IP | Bit máscara | Resultado |
| ------ | ----------- | --------- |
| 1      | 1           | 1         |
| 1      | 0           | 0         |
| 0      | 1           | 0         |
| 0      | 0           | 0         |

👉 Solo da 1 si ambos bits son 1

---

## 📌 Ejemplo práctico

IP: `192.168.1.10`
Máscara: `255.255.255.0`

En binario:

```
IP        = 11000000.10101000.00000001.00001010
Máscara   = 11111111.11111111.11111111.00000000
------------------------------------------------
RED       = 11000000.10101000.00000001.00000000
```

Resultado:
👉 **192.168.1.0**

---

## 💡 Interpretación docente

* La máscara “apaga” los bits de host
* Solo deja la parte de red

---

# 🌐 2. Máscara Wildcard

👉 **Fórmula:**
**255.255.255.255 - Máscara**

---

## 📌 ¿Qué es?

Es la **máscara inversa**, muy usada en:

* ACLs (listas de acceso)
* Cisco / Mikrotik

---

## 📌 Ejemplo

Máscara: `255.255.255.0`

```
255.255.255.255
-255.255.255.0
----------------
0.0.0.255
```

👉 **Wildcard = 0.0.0.255**

---

## 💡 Interpretación

* Donde hay **0 → debe coincidir exactamente**
* Donde hay **255 → puede variar**

👉 Es lo opuesto a la máscara tradicional

---

## 🧠 Truco rápido

| Máscara | Wildcard |
| ------- | -------- |
| 255     | 0        |
| 0       | 255      |

---

# 📡 3. Dirección de broadcast

👉 **Fórmula:**
**Red OR Wildcard**

---

## 📌 ¿Qué significa?

Es la **última dirección del rango**, usada para enviar a todos los hosts.

---

## ⚙️ ¿Qué hace el OR?

| Bit Red | Bit Wildcard | Resultado |
| ------- | ------------ | --------- |
| 1       | 1            | 1         |
| 1       | 0            | 1         |
| 0       | 1            | 1         |
| 0       | 0            | 0         |

👉 Da 1 si alguno es 1

---

## 📌 Ejemplo completo

Red: `192.168.1.0`
Wildcard: `0.0.0.255`

```
RED       = 11000000.10101000.00000001.00000000
WILDCARD  = 00000000.00000000.00000000.11111111
------------------------------------------------
BROADCAST = 11000000.10101000.00000001.11111111
```

Resultado:
👉 **192.168.1.255**

---

# 🔗 Conexión entre las tres fórmulas

Todo se encadena así:

1. **Red**

   ```
   IP AND Máscara
   ```

2. **Wildcard**

   ```
   255.255.255.255 - Máscara
   ```

3. **Broadcast**

   ```
   Red OR Wildcard
   ```

---

# 🎯 Ejemplo completo integrador

IP: `10.0.5.130`
Máscara: `255.255.255.192`

---

### 🔹 Paso 1: Red

Resultado:
👉 `10.0.5.128`

---

### 🔹 Paso 2: Wildcard

```
255.255.255.255
-255.255.255.192
----------------
0.0.0.63
```

---

### 🔹 Paso 3: Broadcast

```
128 + 63 = 191
```

👉 `10.0.5.191`

---

# 🧠 Simplificación didáctica

Podés simplificarlo así:

* **AND → recorta → obtiene la red**
* **Resta → invierte → obtiene wildcard**
* **OR → completa → obtiene broadcast**

---

# 🚀 Analogía simple (muy efectiva en clase)

Pensalo como luces:

* Máscara = interruptores que dejan pasar corriente
* AND = corta lo que sobra
* Wildcard = lo contrario
* OR = prende todo lo posible

---

