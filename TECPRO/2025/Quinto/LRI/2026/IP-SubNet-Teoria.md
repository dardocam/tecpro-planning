# 📚 Clase Teórica: Direccionamiento IP y Máscara de Subred (Subnetting Básico)

## 🎯 Objetivo de la clase

Comprender cómo funciona una dirección IP, cómo se divide en red y host, y cómo la **máscara de subred determina esa división**, sentando bases para el subnetting.

---

# 🌐 1. ¿Qué es una dirección IP?

Una **dirección IP** es un identificador único que permite que un dispositivo pueda:

* Ser reconocido dentro de una red
* Enviar y recibir información

👉 Es comparable a una dirección postal:

* La **red** sería la ciudad
* El **host** sería la casa

---

## 🧠 Idea clave

> Para que dos dispositivos se comuniquen, deben “encontrarse” dentro de la red usando su IP.

---

# 🔢 2. Estructura de una dirección IP (IPv4)

Una dirección IPv4 está compuesta por 4 números:

```id="ej1"
192.168.1.10
```

Cada número:

* Va de 0 a 255
* Representa 8 bits

👉 Total: **32 bits**

---

# ⚙️ 3. División lógica: Red y Host

Toda dirección IP tiene dos partes:

| Parte | Función                   |
| ----- | ------------------------- |
| Red   | Identifica la red         |
| Host  | Identifica el dispositivo |

📌 Pero hay un problema importante:
👉 **La IP sola NO indica dónde termina la red y empieza el host**

✔️ Ahí es donde entra la máscara de subred

---

# 🧩 4. ¿Qué es la máscara de subred?

La **máscara de subred** es un valor que indica:
👉 Qué parte de la IP corresponde a la red
👉 Qué parte corresponde al host

---

## 📌 Ejemplo más común:

255.255.255.0

---

## 🔍 ¿Cómo se interpreta?

La máscara funciona como un “filtro”:

* **255 → parte de red**
* **0 → parte de host**

---

## 🧠 Aplicación directa

IP:

```id="ej2"
192.168.1.10
```

Máscara:

```id="ej3"
255.255.255.0
```

👉 Resultado:

* Red → 192.168.1
* Host → 10

---

# 🔗 5. Relación clave: IP + Máscara

👉 Esta es la idea más importante de toda la clase:

> **La IP identifica al dispositivo, pero la máscara define cómo interpretar esa IP**

---

## 📊 Ejemplo comparativo

### Caso 1:

IP: 192.168.1.10
Máscara: 255.255.255.0

✔️ Red: 192.168.1
✔️ Host: 10

---

### Caso 2:

IP: 192.168.1.10
Máscara: 255.255.0.0

✔️ Red: 192.168
✔️ Host: 1.10

---

## 🧠 Conclusión

👉 **La misma IP puede pertenecer a redes diferentes según la máscara**

---

# 🧪 6. Ejemplo completo en una red LAN

| Dispositivo | IP          | Máscara       |
| ----------- | ----------- | ------------- |
| Router      | 192.168.1.1 | 255.255.255.0 |
| PC1         | 192.168.1.2 | 255.255.255.0 |
| PC2         | 192.168.1.3 | 255.255.255.0 |

✔️ Todos comparten:

* Misma red
* Misma máscara

👉 Por eso pueden comunicarse directamente

---

# ⚠️ 7. Reglas fundamentales

### 🔴 1. Misma red para comunicarse

Dos dispositivos pueden comunicarse si:

* Tienen la misma red
* Y la misma máscara

---

### 🔴 2. No repetir IP

Si dos dispositivos tienen la misma IP:
👉 Se genera conflicto

---

### 🔴 3. La máscara debe coincidir

Si la máscara es distinta:
👉 Puede haber errores de comunicación

---

# 🌍 8. IP privada vs pública

### 🔹 IP privada

* Se usa dentro de una LAN
* Ej: 192.168.x.x

---

### 🔹 IP pública

* Se usa en internet
* La asigna el proveedor

👉 El router traduce entre ambas (NAT)

---

# 🧩 9. Introducción al Subnetting

El **subnetting** consiste en:
👉 Dividir una red en subredes más pequeñas usando la máscara

---

## 📌 Ejemplo conceptual

Red original:

```id="ej4"
192.168.1.0 /24
```

👉 (/24 significa 255.255.255.0)

---

Si cambiamos la máscara:

* /25 → redes más pequeñas
* /26 → aún más pequeñas

👉 Esto permite crear múltiples redes dentro de una sola

---

## 🧠 Idea clave

> Subnetting = modificar la máscara para dividir redes

---

# 🔢 10. ¿Por qué es importante esto?

Porque permite:

* Organizar redes grandes
* Mejorar seguridad
* Reducir tráfico innecesario

---

## 🏫 Ejemplo real

En una escuela:

* Subred 1 → Administración
* Subred 2 → Alumnos
* Subred 3 → Laboratorio

👉 Todas dentro de una red principal

---

# 🔗 11. Conexión con la práctica

Después de esta clase, el alumno debería poder:

* Identificar red y host
* Interpretar una máscara
* Asignar IP correctamente
* Entender por qué dos dispositivos no se conectan

---

# 🧠 12. Actividad 

1. ¿Qué función cumple la máscara de subred?
2. ¿Puede cambiar la red si cambia la máscara?
3. ¿Qué pasa si dos dispositivos tienen distinta máscara?
4. ¿Qué parte identifica al dispositivo?

---

# 🚀 Cierre de la clase

👉 La comunicación en red depende de dos cosas:

* La **dirección IP** → quién soy
* La **máscara de subred** → a qué red pertenezco

---

## 🔥 Frase clave 

> “La IP dice quién sos, la máscara dice dónde estás”

---

