### Clase 2: Variables y alcance
#### Objetivo
- Comprender el funcionamiento y las diferencias entre las declaraciones de variables (var, let y const), así como el concepto de alcance (global, local y de bloque).

- Duración
80 minutos.

### Estructura de la Clase

#### Introducción (10 minutos)

- Pregunta inicial: "¿Por qué es importante declarar las variables de forma correcta y cómo afecta su alcance al comportamiento de una aplicación?"
Presentación de la importancia del manejo de variables en el código.

#### Desarrollo (30 minutos)

- Explicación teórica sobre: 
    - var: características, hoisting y ámbito de función.
    - let: alcance de bloque y diferencias con var.
    - const: declaración de constantes y su comportamiento.

    - Ejemplos prácticos en vivo:
        - Comparar el comportamiento de variables declaradas con var y let dentro de funciones y bloques (if, bucles).
        - Mostrar errores comunes al intentar reasignar valores a constantes.
        - Análisis de casos en los que se recomienda cada tipo de declaración.

#### Cierre (10 minutos)

- Recapitulación de las diferencias clave entre var, let y const.
- Sesión de preguntas y respuestas para clarificar conceptos.

### Actividad Práctica

#### Experimentos con variables y alcance
- Duración: 30 minutos
- Descripción:
  - Los estudiantes desarrollarán pequeños fragmentos de código para evidenciar el comportamiento de las variables en distintos ámbitos. Deberán crear ejemplos en los que se demuestre el hoisting, la diferencia entre el ámbito de función y de bloque, y la inmutabilidad de const.

---

A continuación se presenta un conjunto de filminas (slides) estructuradas profesionalmente para la **Clase 2: Variables y Alcance**. La sesión está diseñada para 80 minutos en total, distribuidos en:

- **Introducción (10 minutos)**
- **Desarrollo (30 minutos)**
- **Cierre (10 minutos)**
- **Actividad Práctica (30 minutos)**

---

### Filmina 1: Portada
- **Título:** Clase 2: Variables y Alcance
- **Subtítulo:** Dominando var, let y const y comprendiendo su ámbito de aplicación
- **Profesor:** Dardo Camaño

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: "¿Por qué es importante declarar las variables de forma correcta y cómo afecta su alcance al comportamiento de una aplicación?"
  - Presentación de la importancia del manejo de variables en el código.
- **Desarrollo (30 minutos):**
  - Teoría y explicación sobre:
    - **var:** Características, hoisting y ámbito de función.
    - **let:** Alcance de bloque y diferencias con var.
    - **const:** Declaración de constantes y su comportamiento.
  - Ejemplos en vivo que comparen el comportamiento de var, let y const en funciones, bloques (if, bucles) y casos de error.
- **Cierre (10 minutos):**
  - Recapitulación de las diferencias clave entre var, let y const.
  - Sesión de preguntas y respuestas.
- **Actividad Práctica (30 minutos):**
  - Desarrollar fragmentos de código para evidenciar:
    - Hoisting y diferencias de ámbito (global, local y de bloque).
    - Comportamiento de variables declaradas con var y let dentro de funciones y bloques.
    - Inmutabilidad de las variables declaradas con const.

---

### Filmina 3: Introducción y Pregunta Inicial
- **Pregunta Inicial:**
  - “¿Por qué es importante declarar las variables de forma correcta y cómo afecta su alcance al comportamiento de una aplicación?”
- **Importancia del Manejo de Variables:**
  - Facilita la escritura de código limpio y predecible.
  - Previene errores y comportamientos inesperados durante la ejecución.
  - Contribuye a una mejor organización y mantenimiento del código.

---

### Filmina 4: Declaración con **var**
- **Características de var:**
  - **Ámbito de Función:** La variable es accesible dentro de la función donde se declara.
  - **Hoisting:** Las variables declaradas con var se "elevan" al inicio de su ámbito, aunque solo se eleva la declaración, no su asignación.
  - **Consideraciones:** 
    - Puede generar problemas de sobreescritura accidental.
    - Menor control sobre el ámbito en comparación con let y const.

---

### Filmina 5: Declaración con **let**
- **Características de let:**
  - **Ámbito de Bloque:** La variable está limitada al bloque ({ ... }) donde se declara.
  - **No se produce hoisting de la misma manera que var:** Aunque internamente se eleva, su uso antes de la declaración genera un error (Zona Temporal Muerta).
  - **Ventajas:**
    - Mayor precisión en el control del alcance.
    - Previene la redeclaración accidental en el mismo bloque.

---

### Filmina 6: Declaración con **const**
- **Características de const:**
  - **Inmutabilidad de la Referencia:** Una vez asignado, no se puede reasignar.
  - **Ámbito de Bloque:** Al igual que let, su alcance está limitado al bloque donde se declara.
  - **Uso Recomendado:**
    - Para valores que no deben cambiar durante la ejecución del programa.
    - Favorece la escritura de código predecible y seguro.
- **Errores Comunes:**
  - Intentar reasignar un valor a una variable declarada con const genera un error en tiempo de ejecución.

---

### Filmina 7: Ejemplos en Vivo
- **Comparativa de Comportamientos:**
  - **var en función:**
    ```javascript
    function ejemploVar() {
      console.log(miVar); // undefined (hoisting)
      var miVar = "Hola con var";
      console.log(miVar); // "Hola con var"
    }
    ejemploVar();
    ```
  - **let en bloque:**
    ```javascript
    if (true) {
      // Zona temporal muerta: console.log(miLet); // Error
      let miLet = "Hola con let";
      console.log(miLet); // "Hola con let"
    }
    ```
  - **const y la inmutabilidad:**
    ```javascript
    const miConst = "Valor constante";
    // miConst = "Nuevo valor"; // Error: No se puede reasignar
    console.log(miConst);
    ```
- **Discusión de Resultados:**
  - ¿Cómo se comportan las variables en diferentes ámbitos?
  - ¿Qué errores se pueden evitar con el uso correcto de let y const?

---

### Filmina 8: Cierre y Recapitulación
- **Resumen de Conceptos Clave:**
  - **var:** Ámbito de función, susceptible al hoisting y redeclaración.
  - **let:** Ámbito de bloque, mayor control y evita redeclaraciones en el mismo bloque.
  - **const:** Ámbito de bloque, inmutabilidad de la referencia, ideal para valores fijos.
- **Preguntas y Respuestas:**
  - Espacio para aclarar dudas y debatir casos prácticos.
  - Reflexión sobre las mejores prácticas en la declaración de variables.

---

### Filmina 9: Actividad Práctica – Experimentos con Variables y Alcance
- **Objetivo de la Actividad:**
  - Aplicar de forma práctica lo aprendido sobre la declaración y alcance de variables.
- **Instrucciones de la Actividad:**
  - Crear pequeños fragmentos de código que demuestren:
    - El hoisting de var.
    - La diferencia entre el ámbito de función y de bloque utilizando var y let.
    - El intento de reasignación a una variable declarada con const.
  - Utilizar `console.log` para observar y documentar el comportamiento en cada caso.
- **Dinámica:**
  - Trabajar individualmente o en parejas.
  - Discutir los resultados obtenidos y compartir conclusiones con el grupo.

---

### Filmina 10: Recursos y Bibliografía
- **Documentación y Referencias:**
  - [MDN Web Docs – var, let y const](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements)
  - [Artículo sobre hoisting en JavaScript](https://javascript.info/var)
  - Tutoriales y videos explicativos en plataformas educativas (YouTube, freeCodeCamp).
- **Enlaces Recomendados:**
  - [JavaScript.info – Variables](https://javascript.info/variables)
  - Blogs especializados y foros de discusión sobre buenas prácticas en JavaScript.

---

### Consideraciones Finales para la Clase
- **Teoría (40 minutos):**
  - Profundizar en los conceptos de ámbito y hoisting.
  - Utilizar ejemplos en vivo para demostrar el comportamiento de var, let y const.
- **Práctica (30 minutos):**
  - Fomentar la experimentación y el análisis crítico del comportamiento de variables en diferentes contextos.
  - Incentivar la discusión y colaboración entre los estudiantes para resolver dudas y compartir hallazgos.
- **Cierre (10 minutos):**
  - Recapitular los conceptos esenciales y resolver preguntas, consolidando el aprendizaje.

---

Para abordar esta pregunta de manera profesional, debemos analizar tres aspectos clave: el alcance léxico en JavaScript, el comportamiento de `let` vs. `var`, y las técnicas para aislar variables. Aquí está el desglose:

---

### **1. Alcance léxico y closures**
Las funciones en JavaScript capturan variables de su entorno léxico (donde fueron definidas, no donde se ejecutan). Esto explica por qué variables declaradas con `let` dentro de un bloque son accesibles en funciones internas:

```javascript
function ejemplo() {
  if (true) {
    let x = 10; // Alcance de bloque
    var y = 20; // Alcance de función

    function mostrar() {
      console.log(x); // 10 (accede al bloque padre)
      console.log(y); // 20 (accede a la función padre)
    }

    mostrar();
  }
}
```

- **`let` en bloques**: La variable `x` existe solo dentro del bloque `if`, pero `mostrar()` la accede porque la función se define en el mismo bloque (closure).
- **`var` en funciones**: La variable `y` es accesible en toda la función `ejemplo()`.

---

### **2. Diferencias clave entre `let` y `var`**

| Característica              | `let`                          | `var`                      |
|------------------------------|--------------------------------|----------------------------|
| **Alcance**                  | Bloque (`{}`)                  | Función                    |
| **Hoisting**                 | No inicializado (TDZ*)         | Inicializado como `undefined` |
| **Re-declaración**           | Error                          | Permitido                  |
| **Contexto global**          | No es propiedad de `window`    | Sí es propiedad de `window` |

*TDZ: Temporal Dead Zone (no accesible antes de su declaración).

---

### **3. Ejemplo crítico: Bucles y closures**
La diferencia es evidente en bucles con funciones asíncronas:

```javascript
// Con var (problema clásico)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)); // Siempre imprime 3
}

// Con let (solución)
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j)); // 0, 1, 2
}
```

- **`var`**: Hay una sola variable `i` compartida por todas las iteraciones.
- **`let`**: Crea una nueva variable `j` en cada iteración (aislamiento automático).

---

### **4. ¿Cómo aislar variables del contexto de funciones?**

#### **a. Bloques con `let`/`const`**
Agrupar código en bloques `{}` para limitar el alcance:
```javascript
function ejemplo() {
  // Variables no accesibles fuera del bloque
  {
    let a = 1;
    const b = 2;
  }
  console.log(a); // Error: a is not defined
}
```

#### **b. IIFE (Immediately Invoked Function Expression)**
Crea un ámbito nuevo para variables con `var`:
```javascript
(function() {
  var privada = "Solo aquí";
})();
console.log(privada); // Error
```

#### **c. Módulos ES6**
Cada módulo tiene su propio ámbito:
```javascript
// archivo.js
let secreto = "🤫";
export function mostrar() { console.log(secreto); }
```

---

### **5. Conclusión**
- **`let`** aísla variables a bloques, pero las funciones internas pueden acceder a ellas mediante closures.
- **`var`** es menos predecible por su alcance funcional y hoisting.
- Para aislamiento avanzado, usa **bloques**, **IIFE**, o **módulos**.

Este entendimiento es crucial para evitar bugs de alcance y gestionar correctamente el estado en aplicaciones complejas.