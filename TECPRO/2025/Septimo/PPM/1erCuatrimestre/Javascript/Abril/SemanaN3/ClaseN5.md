### MODULO II

### **Clase 5: Objetos**

**Objetivo**  
Comprender la creación, manipulación y uso de métodos útiles para trabajar con objetos en JavaScript, destacando la importancia de estos en la estructuración de la información.

**Duración**  
2 horas.

**Estructura de la Clase**  

- **Introducción (10 minutos)**
  - Pregunta inicial: "¿Qué es un objeto en JavaScript y en qué situaciones lo utilizarías?"
  - Breve introducción sobre la utilidad de los objetos para agrupar datos relacionados.

- **Desarrollo (80 minutos)**
  - **Conceptos Teóricos:**
    - Definición y sintaxis de objetos literales.
    - Creación de objetos y asignación de propiedades.
    - Diferencias entre propiedades y métodos.
  - **Métodos Útiles:**
    - Uso de `Object.keys`, `Object.values` y `Object.entries` para explorar objetos.
  - **Ejemplos Prácticos:**
    - Demostración en vivo de la creación y manipulación de un objeto.
    - Ejemplos de actualización, eliminación y adición de propiedades.
  
- **Cierre (10 minutos)**
  - Resumen de los puntos clave.
  - Espacio para preguntas y aclaración de dudas.

**Actividad Práctica**  
- **Nombre:** Gestión de Inventario  
- **Duración:** 30 minutos  
- **Descripción:**  
  Los estudiantes crearán un objeto que represente un inventario de productos (con propiedades como nombre, precio y cantidad) y utilizarán los métodos aprendidos para listar claves, valores y entradas, así como modificar propiedades según requerimientos.

----


A continuación se presenta un conjunto de filminas (slides) estructuradas profesionalmente para la **Clase 5: Objetos** en JavaScript. La sesión tiene una duración total de 2 horas e incluye una introducción, desarrollo teórico-práctico, cierre y una actividad práctica de 30 minutos.

---

### Filmina 1: Portada
- **Título:** Clase 5: Objetos en JavaScript
- **Subtítulo:** Creación, Manipulación y Métodos Útiles para trabajar con Objetos
- **Instructor:** [Nombre del Instructor]
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: "¿Qué es un objeto en JavaScript y en qué situaciones lo utilizarías?"
  - Breve introducción sobre la utilidad de los objetos para agrupar datos relacionados.
- **Desarrollo (80 minutos):**
  - **Conceptos Teóricos:**
    - Definición y sintaxis de objetos literales.
    - Creación de objetos y asignación de propiedades.
    - Diferencias entre propiedades y métodos.
  - **Métodos Útiles:**
    - Uso de `Object.keys`, `Object.values` y `Object.entries` para explorar objetos.
  - **Ejemplos Prácticos:**
    - Demostración en vivo de la creación y manipulación de un objeto.
    - Ejemplos de actualización, eliminación y adición de propiedades.
- **Cierre (10 minutos):**
  - Resumen de los puntos clave.
  - Espacio para preguntas y aclaración de dudas.
- **Actividad Práctica – Gestión de Inventario (30 minutos):**
  - Creación de un objeto que represente un inventario de productos.
  - Uso de métodos aprendidos para listar claves, valores y entradas, y modificar propiedades.

---

### Filmina 3: Objetivos de la Clase
- **Objetivo Principal:**
  - Comprender la creación, manipulación y uso de métodos útiles para trabajar con objetos en JavaScript.
- **Metas Específicas:**
  - Aprender a agrupar datos relacionados en un objeto.
  - Diferenciar entre propiedades y métodos.
  - Conocer y aplicar métodos como `Object.keys`, `Object.values` y `Object.entries` para inspeccionar objetos.

---

### Filmina 4: Introducción a los Objetos en JavaScript
- **Pregunta Inicial:**
  - “¿Qué es un objeto en JavaScript y en qué situaciones lo utilizarías?”
- **Definición:**
  - Un objeto es una colección de propiedades y métodos que agrupa datos y funcionalidades relacionadas.
- **Utilidad:**
  - Organizar y estructurar información de forma coherente.
  - Facilitar la manipulación de datos complejos en aplicaciones.

---

### Filmina 5: Conceptos Teóricos – Objetos Literales
- **Sintaxis Básica:**
  - Definición de un objeto literal:
    ```javascript
    let persona = {
      nombre: "Ana",
      edad: 30,
      saludar: function() {
        return "Hola, mi nombre es " + this.nombre;
      }
    };
    ```
- **Propiedades vs. Métodos:**
  - **Propiedades:** Variables que almacenan datos (ej. `nombre`, `edad`).
  - **Métodos:** Funciones asociadas al objeto (ej. `saludar`).

---

### Filmina 6: Creación y Asignación de Propiedades
- **Creación de Objetos:**
  - Usando notación literal y asignación de propiedades.
- **Ejemplo de Creación:**
  ```javascript
  let producto = {
    nombre: "Camiseta",
    precio: 19.99,
    stock: 50
  };
  ```
- **Manipulación:**
  - **Actualización:** Cambiar el valor de una propiedad.
  - **Eliminación:** Uso del operador `delete` para remover propiedades.
  - **Adición:** Asignar una nueva propiedad a un objeto existente.
  
---

### Filmina 7: Métodos Útiles para Trabajar con Objetos
- **Object.keys:**
  - Devuelve un array con las claves (propiedades) del objeto.
  - Ejemplo:
    ```javascript
    console.log(Object.keys(producto));
    // Salida: ["nombre", "precio", "stock"]
    ```
- **Object.values:**
  - Devuelve un array con los valores del objeto.
  - Ejemplo:
    ```javascript
    console.log(Object.values(producto));
    // Salida: ["Camiseta", 19.99, 50]
    ```
- **Object.entries:**
  - Devuelve un array de pares [clave, valor].
  - Ejemplo:
    ```javascript
    console.log(Object.entries(producto));
    // Salida: [["nombre", "Camiseta"], ["precio", 19.99], ["stock", 50]]
    ```

---

### Filmina 8: Ejemplos Prácticos en Vivo
- **Creación y Manipulación:**
  - Demostración de creación de un objeto y actualización de sus propiedades.
  - Ejemplo en vivo:
    ```javascript
    let auto = {
      marca: "Toyota",
      modelo: "Corolla",
      anio: 2020
    };
    
    // Actualización de propiedad
    auto.anio = 2021;
    
    // Adición de una nueva propiedad
    auto.color = "Rojo";
    
    // Eliminación de una propiedad
    delete auto.modelo;
    
    // Uso de métodos útiles
    console.log("Claves:", Object.keys(auto));
    console.log("Valores:", Object.values(auto));
    console.log("Entradas:", Object.entries(auto));
    ```
- **Discusión:**
  - Análisis de cómo cada operación afecta al objeto.
  - Relevancia de utilizar métodos para inspeccionar y depurar objetos.

---

### Filmina 9: Cierre de la Sesión
- **Resumen de Puntos Clave:**
  - Definición y utilidad de los objetos.
  - Diferencia entre propiedades y métodos.
  - Uso práctico de `Object.keys`, `Object.values` y `Object.entries`.
- **Preguntas y Aclaración de Dudas:**
  - Espacio para que los estudiantes consulten y resuelvan inquietudes sobre la materia.

---

### Filmina 10: Actividad Práctica – Gestión de Inventario
- **Descripción de la Actividad:**
  - **Objetivo:** Crear un objeto que represente un inventario de productos.
  - **Propiedades Requeridas:** nombre, precio, cantidad.
  - **Tareas:**
    - Declarar un objeto `inventario` con varios productos.
    - Usar `Object.keys`, `Object.values` y `Object.entries` para listar información del inventario.
    - Modificar propiedades: actualizar la cantidad o el precio de un producto según requerimientos.
- **Ejemplo de Punto de Partida:**
  ```javascript
  let inventario = {
    producto1: { nombre: "Camiseta", precio: 19.99, cantidad: 100 },
    producto2: { nombre: "Pantalón", precio: 39.99, cantidad: 50 },
    producto3: { nombre: "Zapatos", precio: 59.99, cantidad: 30 }
  };
  
  // Listar claves del inventario
  console.log(Object.keys(inventario));
  
  // Listar valores del inventario
  console.log(Object.values(inventario));
  
  // Listar entradas del inventario
  console.log(Object.entries(inventario));
  ```
- **Dinámica:**
  - Trabajo individual o en pequeños grupos.
  - Discusión de las soluciones y métodos para modificar y ampliar el objeto.

---

### Filmina 11: Recursos y Bibliografía
- **Documentación y Tutoriales:**
  - [MDN Web Docs – Objetos en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects)
  - Ejemplos y ejercicios en plataformas como freeCodeCamp.
- **Enlaces Recomendados:**
  - Blogs y foros especializados en JavaScript para profundizar en el uso de objetos.
  - Videos tutoriales sobre manipulación de objetos y métodos útiles en JavaScript.

---

### Filmina 12: Consideraciones Finales
- **Aspectos a Reforzar:**
  - La importancia de los objetos para estructurar y organizar información.
  - La utilidad de métodos integrados para inspeccionar y manipular objetos.
- **Próximos Pasos:**
  - Practicar con ejercicios adicionales y aplicar los conceptos en proyectos reales.
  - Experimentar con la creación y modificación de objetos para mejorar la comprensión.

---

Esta estructura de filminas ofrece una visión completa y práctica sobre los objetos en JavaScript, permitiendo a los estudiantes comprender tanto la teoría como su aplicación mediante ejemplos en vivo y una actividad práctica de gestión de inventario.