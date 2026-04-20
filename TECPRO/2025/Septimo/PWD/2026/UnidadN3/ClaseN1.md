# 📘 CLASE 1

# 🧠 Diseño de Bases de Datos Relacionales + Modelado + Relaciones

---

## 🎯 Objetivos

Al finalizar esta clase, el estudiante podrá:

* Comprender cómo se **diseña una base de datos desde cero**
* Aplicar el modelo relacional correctamente
* Identificar y construir relaciones entre tablas
* Evitar errores comunes de diseño
* Preparar una base de datos lista para una aplicación real

---

# 🧠 1. Pensar antes de programar (CLAVE)

Antes de escribir código o SQL, se debe responder:

👉 ¿Qué problema estoy resolviendo?
👉 ¿Qué información necesito guardar?
👉 ¿Cómo se relacionan esos datos?

---

## 🧩 Ejemplo guía

Sistema de gestión escolar:

* Alumnos
* Cursos
* Inscripciones

---

# 🧱 2. Modelo Relacional

El modelo relacional organiza los datos en:

* **Tablas**
* **Filas (registros)**
* **Columnas (atributos)**

---

## 🔑 Conceptos fundamentales

### ✔️ Clave primaria (PRIMARY KEY)

* Identificador único
* Ej: `id`

### ✔️ Clave foránea (FOREIGN KEY)

* Conecta tablas
* Representa relaciones

---

# 🔗 3. Tipos de relaciones (MUY IMPORTANTE)

---

## 🔹 1 a 1 (Uno a Uno)

👉 Un registro se relaciona con **solo uno** del otro lado

📌 Ejemplo:

* Usuario ↔ Perfil

```sql
usuarios (id, nombre)
perfiles (id, usuario_id, foto)
```

👉 Cada usuario tiene un solo perfil

---

## 🔹 1 a N (Uno a Muchos)

👉 Un registro se relaciona con **muchos**

📌 Ejemplo:

* Usuario → Posts

```sql
usuarios (id, nombre)
posts (id, titulo, usuario_id)
```

👉 Un usuario puede tener muchos posts

---

## 🔹 N a N (Muchos a Muchos)

👉 Muchos registros se relacionan con muchos

📌 Ejemplo:

* Alumnos ↔ Cursos

❗ Requiere tabla intermedia

```sql
alumnos (id, nombre)
cursos (id, nombre)

alumno_curso (
    alumno_id,
    curso_id
)
```

---

# 🧠 4. Diseño paso a paso

---

## 🧩 Paso 1: Identificar entidades

Ejemplo (tienda online):

* Usuarios
* Productos
* Pedidos

---

## 🧩 Paso 2: Definir atributos

```text
Usuarios: id, nombre, email
Productos: id, nombre, precio
Pedidos: id, usuario_id, fecha
```

---

## 🧩 Paso 3: Definir relaciones

* Usuario → Pedido (1:N)
* Pedido → Producto (N:M)

---

## 🧩 Paso 4: Crear tablas

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(100)
);
```

---

# 🧠 5. Normalización (clave profesional)

👉 Evita duplicación de datos

---

## ❌ Mal diseño

```text
usuario | producto | producto2 | producto3
```

---

## ✅ Buen diseño

* Tabla usuarios
* Tabla productos
* Tabla pedidos
* Tabla pedido_producto

---

## 🎯 Objetivo de la normalización

* Evitar redundancia
* Evitar inconsistencias
* Facilitar mantenimiento

---

# ⚙️ 6. Tipos de datos (decisiones importantes)

| Tipo    | Uso             |
| ------- | --------------- |
| INT     | identificadores |
| VARCHAR | texto corto     |
| TEXT    | texto largo     |
| DATE    | fechas          |
| DECIMAL | dinero          |

👉 Elegir bien el tipo impacta en rendimiento

---

# ⚠️ 7. Errores comunes de diseño

❌ No usar claves primarias
❌ Duplicar datos
❌ No definir relaciones
❌ Mezclar información en una sola tabla
❌ No pensar escalabilidad

---

# 🧪 8. Ejercicio de diseño (clave)

Diseñar base para:

👉 Sistema de turnos médicos

Debe incluir:

* Pacientes
* Médicos
* Turnos

Preguntas:

* ¿Qué relaciones hay?
* ¿Hay N:M?
* ¿Qué tablas intermedias usarías?

---

# 📌 Cierre de la clase

👉 Una base de datos mal diseñada:

* Genera errores
* Dificulta el desarrollo
* Rompe la aplicación

👉 Una buena base:

* Escala
* Es mantenible
* Es profesional

---

