# 📘 Trabajo Práctico: Sistema de Gestión de Biblioteca (POO)

## 🎯 Objetivo

Desarrollar un sistema orientado a objetos que permita gestionar el préstamo de libros en una biblioteca. Se deberán aplicar los **principios fundamentales de la Programación Orientada a Objetos (POO)**: **abstracción** y **encapsulamiento**, mediante la creación de clases representativas del dominio.

---

## 🧱 Clases Principales

Deberán implementarse las siguientes clases:

### 📗 `Libro`

* Atributos sugeridos:

  * `titulo` (String)
  * `autor` (String)
  * `isbn` (String)
  * `disponible` (boolean)
* Métodos sugeridos:

  * `estaDisponible()`
  * `prestar()`
  * `devolver()`

### 👤 `Usuario`

* Atributos sugeridos:

  * `nombre` (String)
  * `idUsuario` (String o entero)
  * `librosPrestados` (lista de objetos `Libro`)
* Métodos sugeridos:

  * `verLibrosPrestados()`
  * `pedirPrestado(libro: Libro)`
  * `devolverLibro(libro: Libro)`

### 🏛️ `Biblioteca`

* Atributos sugeridos:

  * `nombre` (String)
  * `coleccionLibros` (lista de objetos `Libro`)
  * `usuariosRegistrados` (lista de objetos `Usuario`)
* Métodos sugeridos:

  * `listarLibrosDisponibles()`
  * `registrarUsuario(usuario: Usuario)`
  * `prestarLibro(usuario: Usuario, libro: Libro)`
  * `recibirLibro(usuario: Usuario, libro: Libro)`

---

## 🧠 Principios POO a Aplicar

### ✅ Encapsulamiento

* Los atributos deben estar **protegidos** (por ejemplo, usando `_atributo` o `private`) y ser accedidos/modificados a través de **métodos públicos**.

### ✅ Abstracción

* Separar **la lógica interna** de cada clase de su **interfaz pública**, mostrando sólo lo necesario para interactuar.

---

## 📋 Historias de Usuario (User Stories)

### 🧑‍🎓 Usuario (lector)

1. **Como usuario registrado, quiero poder ver una lista de libros disponibles**, para saber qué puedo pedir prestado.
2. **Como usuario registrado, quiero poder pedir prestado un libro**, para poder leerlo fuera de la biblioteca.
3. **Como usuario registrado, quiero poder devolver un libro prestado**, para que otros usuarios también puedan usarlo.
4. **Como usuario, quiero ver un listado de los libros que tengo actualmente prestados**, para llevar el control de mis préstamos.

---

## 📎 Requisitos Técnicos

* El código debe estar implementado en lenguaje PHP orientado a objetos.
* Cada clase debe estar en su propio archivo.
* Se debe incluir un **script principal o main** donde se simule la interacción entre los usuarios, los libros y la biblioteca.
* Comentar el código explicando las responsabilidades de cada clase y método.

---

## ✅ Criterios de Evaluación

| Criterio                                 | Peso |
| ---------------------------------------- | ---- |
| Correcta aplicación de la POO            | 30%  |
| Cumplimiento de las historias de usuario | 30%  |
| Legibilidad y organización del código    | 20%  |
| Creatividad y solución técnica           | 10%  |
| Presentación y documentación             | 10%  |

---

## ✅ Entrega
- Subir el proyecto a un repositorio público en la plataforma Github
- Entregar la dirección web del repositorio.

