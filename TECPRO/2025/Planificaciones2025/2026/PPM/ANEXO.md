Perfecto. Entonces el objetivo queda mucho más preciso:

> **No queremos evaluar React ni React Native todavía. Queremos determinar si los estudiantes, después de haber recorrido toda la Tecnicatura en Programación, poseen los conocimientos previos necesarios para poder aprender y abordar el desarrollo de una aplicación móvil con React Native.**

Eso cambia la evaluación: sería una **evaluación teórica de saberes previos**, que posteriormente tendrá una evaluación práctica equivalente.

## 1. Qué queremos medir

No preguntaría simplemente "¿qué es una variable?" o "¿qué es HTTP?". Queremos evaluar si el estudiante **comprende conceptos que después necesitará utilizar en una aplicación móvil**.

Por eso organizaría la evaluación en **6 competencias previas**.

| Competencia                          | Qué queremos comprobar                                |
| ------------------------------------ | ----------------------------------------------------- |
| **A. Programación**                  | Puede razonar y resolver problemas algorítmicos       |
| **B. JavaScript**                    | Puede comprender y manipular datos con JS             |
| **C. Datos y estructuras**           | Puede representar y transformar información           |
| **D. Comunicación cliente-servidor** | Comprende cómo una app obtiene/envía datos            |
| **E. Persistencia y bases de datos** | Comprende dónde y cómo se almacenan los datos         |
| **F. Desarrollo y herramientas**     | Comprende conceptos básicos del entorno de desarrollo |

**React queda deliberadamente fuera.**

---

# 2. Competencia A — Programación

Esta debería ser la primera dimensión porque React Native sigue siendo **programación**.

### El estudiante debería comprender:

* variables y constantes;
* tipos de datos;
* operadores;
* decisiones;
* repetición;
* funciones;
* parámetros;
* retorno de valores;
* estructuras de datos;
* algoritmos;
* modularización;
* manejo básico de errores.

Pero, sobre todo, debería poder **interpretar código**.

Por ejemplo:

```javascript
function calcularTotal(precio, cantidad) {
    return precio * cantidad;
}
```

Una buena pregunta no sería:

> ¿Qué es una función?

Sino:

> Si `precio = 1500` y `cantidad = 3`, ¿qué devuelve la función y qué función cumple el `return`?

Eso evalúa comprensión, no memorización.

---

# 3. Competencia B — JavaScript

Esta es particularmente importante porque **JavaScript será el lenguaje de programación que encontrarán en React Native**.

No evaluaría todavía React.

Sí evaluaría:

### JavaScript fundamental

* `let` / `const`;
* tipos de datos;
* operadores;
* condicionales;
* ciclos;
* funciones;
* funciones flecha;
* arrays;
* objetos;
* métodos de arrays;
* desestructuración;
* spread operator;
* módulos;
* `import` / `export`.

### Especialmente:

```javascript
const usuarios = [
    { nombre: "Ana", activo: true },
    { nombre: "Pedro", activo: false },
    { nombre: "Luis", activo: true }
];
```

Preguntar:

> ¿Qué contiene `usuarios`?

> ¿Cómo obtendría solamente los usuarios activos?

> ¿Qué diferencia existe entre `usuarios` y `usuarios[0]`?

Esto es mucho más significativo para nuestro propósito.

---

# 4. Competencia C — Datos y estructuras

Esta competencia merece estar separada de "JavaScript".

Una aplicación móvil fundamentalmente **maneja datos**.

El estudiante debería comprender:

```text
Dato
 ↓
Variable
 ↓
Estructura
 ↓
Transformación
 ↓
Presentación
```

Debe poder interpretar estructuras como:

```javascript
const producto = {
    id: 10,
    nombre: "Teclado",
    precio: 25000,
    stock: 4
};
```

y:

```javascript
const productos = [
    { id: 1, nombre: "Mouse", precio: 15000 },
    { id: 2, nombre: "Teclado", precio: 25000 }
];
```

### También debería comprender JSON

```json
{
    "id": 1,
    "nombre": "Mouse",
    "precio": 15000
}
```

Y diferenciar:

**Objeto JavaScript**

de

**JSON transmitido entre sistemas.**

Esto será fundamental cuando trabajemos con APIs.

---

# 5. Competencia D — Comunicación cliente-servidor

Esta probablemente sea una de las competencias **más importantes para el proyecto móvil**.

El estudiante debería poder interpretar esta arquitectura:

```text
┌─────────────────┐
│ Aplicación móvil│
└────────┬────────┘
         │ HTTP
         ↓
┌─────────────────┐
│      API        │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│    Backend      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Base de datos   │
└─────────────────┘
```

Y comprender qué función cumple cada componente.

### Debería conocer:

* cliente;
* servidor;
* HTTP;
* URL;
* endpoint;
* API;
* REST;
* request;
* response;
* GET;
* POST;
* PUT/PATCH;
* DELETE;
* JSON;
* códigos HTTP básicos.

Por ejemplo:

> Una aplicación necesita mostrar los productos almacenados en un servidor. ¿Qué método HTTP debería utilizar y qué información espera recibir?

Esto evalúa una competencia directamente transferible al proyecto.

---

# 6. Competencia E — Persistencia y bases de datos

No necesitamos evaluar SQL avanzado.

Queremos saber si el estudiante comprende **el problema de la persistencia**.

Debe saber diferenciar:

```text
Memoria de la aplicación
        ≠
Almacenamiento permanente
```

Y comprender:

```text
Aplicación
     ↓
API
     ↓
Backend
     ↓
Base de datos
```

### Conceptos mínimos

* tabla;
* registro;
* campo;
* clave primaria;
* relación;
* CRUD;
* consulta;
* persistencia.

Y debería comprender una situación como:

> Si el usuario cierra la aplicación y mañana vuelve a abrirla, ¿por qué los datos deberían almacenarse en algún lugar diferente de la memoria de la aplicación?

Esta pregunta parece sencilla, pero permite detectar una comprensión conceptual importante.

---

# 7. Competencia F — Desarrollo de software y herramientas

Finalmente incluiría una competencia más pequeña.

El estudiante debería comprender:

### Proyecto

```text
Proyecto
 ├── código
 ├── dependencias
 ├── configuración
 └── recursos
```

### Dependencias

Debe saber conceptualmente qué significa que un proyecto utilice una biblioteca externa.

### Git

Comprender:

* repositorio;
* versión;
* commit;
* clonación;
* sincronización.

### Debugging

Y algo que considero fundamental:

> **capacidad para interpretar un error.**

Por ejemplo:

```text
Cannot read properties of undefined
```

No necesitamos que necesariamente sepa solucionarlo inmediatamente.

Queremos comprobar si puede **analizar qué significa el error y dónde buscar el problema**.

---

# 8. Lo que deliberadamente NO evaluaría

Para mantener la evaluación limpia, sacaría completamente:

### React

* JSX;
* componentes;
* props;
* state;
* hooks;
* renderizado;
* ciclo de vida.

### React Native

* `View`;
* `Text`;
* `FlatList`;
* `StyleSheet`;
* navegación;
* Expo.

Eso será evaluado **después**, durante el desarrollo del año.

Tampoco evaluaría:

* TypeScript;
* Redux;
* arquitectura avanzada;
* patrones de diseño;
* testing;
* Docker;
* CI/CD;
* publicación de aplicaciones.

---

# 9. La evaluación teórica debería tener otro criterio

Yo evitaría una prueba del tipo:

> "Defina API."

> "¿Qué es JSON?"

> "¿Qué significa CRUD?"

Porque podemos terminar midiendo memoria.

La evaluación debería combinar **tres tipos de preguntas**:

### Tipo 1 — Comprensión

> ¿Cuál es la diferencia entre un objeto y un array de objetos?

### Tipo 2 — Interpretación

Dado:

```javascript
const productos = [
    { nombre: "A", precio: 100 },
    { nombre: "B", precio: 200 }
];
```

> ¿Qué representa `productos[1].precio`?

### Tipo 3 — Situación problemática

> Una aplicación móvil necesita mostrar información almacenada en una base de datos remota. Describa qué componentes intervienen desde que el usuario solicita la información hasta que esta aparece en la aplicación.

**El tercer tipo es el más importante.**

---

# 10. Y establecería niveles de competencia

No utilizaría solamente "correcto/incorrecto".

Podemos establecer:

| Nivel              | Significado                                                |
| ------------------ | ---------------------------------------------------------- |
| **0 — No logrado** | No comprende el concepto                                   |
| **1 — Inicial**    | Reconoce el concepto pero no puede aplicarlo correctamente |
| **2 — Adecuado**   | Comprende y puede aplicarlo en situaciones conocidas       |
| **3 — Sólido**     | Puede relacionarlo con situaciones nuevas                  |

Así, por ejemplo, un estudiante podría obtener:

| Competencia      | Nivel |
| ---------------- | ----: |
| Programación     |     3 |
| JavaScript       |     2 |
| Datos            |     3 |
| Cliente-servidor |     2 |
| BD               |     3 |
| Herramientas     |     1 |

Esto nos da algo mucho más útil que un simple **7/10**.

---

# 11. El objetivo final de la evaluación

La evaluación teórica debería responder **una única pregunta institucional**:

> ### ¿El estudiante posee los saberes previos necesarios para comenzar el aprendizaje y posterior desarrollo de una aplicación móvil con React Native?

Y después la práctica respondería:

> ### ¿Puede utilizar esos saberes para resolver problemas concretos de programación?

Y recién después, durante el año:

> ### ¿Puede desarrollar una aplicación móvil utilizando React Native?

Por lo tanto tendríamos una progresión muy clara:

**Saberes previos → Evaluación teórica → Evaluación práctica → React → React Native → Proyecto móvil**

Esto además nos permitiría hacer algo muy interesante para el curso: **aplicar la misma evaluación teórica a todo el grupo al inicio de 7.º, obtener un diagnóstico cuantificable y utilizarlo para decidir qué contenidos necesitan ser reforzados antes de entrar de lleno en React Native.**

El próximo paso lógico sería construir **la matriz de evaluación teórica**, definiendo para cada competencia: **saber esperado → indicador → tipo de pregunta → cantidad de preguntas → puntaje**. A partir de esa matriz podemos generar directamente la evaluación.
