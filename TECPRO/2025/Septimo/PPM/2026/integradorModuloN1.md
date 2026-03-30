# 🧪 TRABAJO PRÁCTICO INTEGRADOR AVANZADO

## 💻 “Sistema Web Completo de Gestión Inteligente (SPA Pro)”

---

## 🎯 OBJETIVO GENERAL

Desarrollar una **aplicación web completa (SPA)** utilizando **JavaScript Vanilla**, que permita gestionar información de forma dinámica, persistente y escalable, aplicando:

✔ Lógica de programación
✔ Manipulación avanzada del DOM
✔ Programación modular
✔ Persistencia de datos
✔ Interfaz interactiva

---

# 🧩 IDEA DEL PROYECTO

El estudiante deberá crear un sistema tipo:

👉 **Aplicación de gestión real**

Ejemplos sugeridos:

* Sistema de gestión de productos (tipo mini e-commerce)
* Gestor de tareas profesional (tipo Trello simplificado)
* Sistema de alumnos y calificaciones
* App de gastos personales
* Catálogo de películas con filtros

---

# 🏗️ ARQUITECTURA DEL PROYECTO (OBLIGATORIO)

El proyecto debe estar organizado en:

```
/proyecto
 ├── index.html
 ├── css/
 │    └── styles.css
 ├── js/
 │    ├── app.js
 │    ├── data.js
 │    ├── ui.js
 │    └── utils.js
```

👉 Esto introduce **separación de responsabilidades (clave profesional)**

---

# ⚙️ FUNCIONALIDADES OBLIGATORIAS (NIVEL AVANZADO)

---

## 🔹 1. CRUD COMPLETO

El sistema debe permitir:

* Crear elementos
* Leer (mostrar)
* Editar
* Eliminar

✔ Con actualización automática en pantalla (sin recargar)

---

## 🔹 2. MODELO DE DATOS COMPLEJO

Cada elemento debe ser un objeto con mínimo:

```js
{
  id: 1,
  nombre: "Producto",
  categoria: "Tecnología",
  precio: 1000,
  activo: true,
  fecha: "2026-01-01"
}
```

✔ Debe incluir:

* distintos tipos de datos
* uso realista

---

## 🔹 3. PERSISTENCIA (OBLIGATORIO)

Usar:

👉 `localStorage`

✔ Requisitos:

* Guardar datos automáticamente
* Cargar datos al iniciar la app

---

## 🔹 4. FILTROS Y BÚSQUEDA AVANZADA

Implementar:

* Búsqueda por texto
* Filtro por categoría
* Filtro por estado (activo/inactivo)

✔ En tiempo real

---

## 🔹 5. ORDENAMIENTO DE DATOS

Permitir ordenar por:

* Nombre
* Precio / valor
* Fecha

Ascendente y descendente

---

## 🔹 6. INTERFAZ DINÁMICA (DOM AVANZADO)

Debe incluir:

* Renderizado dinámico completo
* Creación de elementos HTML desde JS
* Uso intensivo de eventos

---

## 🔹 7. MANEJO DE EVENTOS COMPLEJO

Usar:

* click
* submit
* input
* change

✔ Event delegation (muy importante 👈)

---

## 🔹 8. FUNCIONES Y MODULARIZACIÓN

Código dividido en funciones:

* renderizar()
* guardarDatos()
* cargarDatos()
* filtrar()
* ordenar()
* actualizarUI()

---

## 🔹 9. USO AVANZADO DE ARRAYS

Debe usar mínimo:

* map()
* filter()
* find()
* some() o reduce()

---

## 🔹 10. VALIDACIONES

Formulario con:

* campos obligatorios
* validaciones lógicas
* mensajes de error en pantalla

---

# 🚀 FUNCIONALIDADES PROFESIONALES (OBLIGATORIAS)

(esto es lo que lo vuelve “nivel 7mo año” real)

---

## 🔸 1. MODO OSCURO 🌙

* Botón toggle
* Guardado en localStorage

---

## 🔸 2. SISTEMA DE NOTIFICACIONES

Mostrar mensajes tipo:

* “Elemento agregado”
* “Error en formulario”

---

## 🔸 3. CONTADORES DINÁMICOS

Ejemplo:

* Total de elementos
* Activos / inactivos

---

## 🔸 4. EDICIÓN EN MODAL O FORMULARIO

Editar sin recargar la página

---

## 🔸 5. DISEÑO RESPONSIVO BÁSICO

* Que funcione en celular

---

# 🧠 FUNCIONALIDADES EXTRA (OPCIONALES - NOTA MÁXIMA)

* Exportar datos a JSON
* Importar datos
* Drag & drop (avanzado)
* Paginación
* Animaciones CSS
* Sistema de usuarios simple (simulado)

---

# 📅 ORGANIZACIÓN POR ETAPAS (CLAVE PARA 3 MESES)

---

## 🟢 ETAPA 1 (Semanas 1–3)

* Estructura base
* Formulario
* Array + objetos

---

## 🟡 ETAPA 2 (Semanas 4–6)

* Renderizado DOM
* Eventos
* CRUD básico

---

## 🟠 ETAPA 3 (Semanas 7–9)

* Filtros
* Ordenamiento
* Métodos de arrays

---

## 🔵 ETAPA 4 (Semanas 10–12)

* localStorage
* UI avanzada
* mejoras visuales

---

## 🔴 ETAPA FINAL

* Integración total
* Presentación

---

# 📦 ENTREGABLE FINAL

El estudiante debe presentar:

✔ Proyecto funcionando
✔ Código organizado
✔ Datos persistentes
✔ Interfaz usable

✔ OPCIONAL (MUY RECOMENDADO):

* GitHub con commits

---

# 📊 RÚBRICA DE EVALUACIÓN (PROFESIONAL)

| Criterio     | Bajo        | Medio      | Alto               |
| ------------ | ----------- | ---------- | ------------------ |
| Lógica       | No funciona | Parcial    | Completo           |
| CRUD         | Incompleto  | Funciona   | Completo + edición |
| DOM          | Básico      | Intermedio | Avanzado           |
| Arrays       | Mínimo      | Correcto   | Avanzado           |
| UI/UX        | Deficiente  | Aceptable  | Clara y usable     |
| Código       | Desordenado | Aceptable  | Modular y limpio   |
| Persistencia | No          | Parcial    | Completa           |

---

# ⚡ CHECKLIST DOCENTE (CORRECCIÓN EN 3 MIN)

✔ ¿Tiene CRUD completo?
✔ ¿Usa localStorage?
✔ ¿Usa arrays avanzados?
✔ ¿Manipula DOM correctamente?
✔ ¿Tiene filtros?
✔ ¿Tiene ordenamiento?
✔ ¿Código organizado?

---

# 🎓 VALOR PEDAGÓGICO REAL

Este TP:

✔ Integra TODO el módulo
✔ Simula trabajo profesional
✔ Prepara para React / React Native
✔ Desarrolla autonomía
✔ Permite diferenciar niveles (muy importante en aula real)

---

