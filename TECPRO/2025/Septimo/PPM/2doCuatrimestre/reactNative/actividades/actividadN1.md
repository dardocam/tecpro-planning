# Actividad Práctica — React: JSX, Componentes y Props

- **Clase:** Fundamentos de React
- **Tema:** JSX, componentes funcionales y props


---

## 1. Objetivo

Construir una pequeña pantalla de **perfil de estudiantes** utilizando componentes funcionales de React Native.

Durante la actividad deberán aplicar:

* JSX.
* Componentes funcionales.
* Props.
* Destructuring de props.
* `children`.
* `.map()`.
* `key`.
* Estilos básicos con `StyleSheet`.

---

# 2. Situación problemática

Una institución educativa quiere mostrar en una aplicación móvil información básica de sus estudiantes.

Cada estudiante debe aparecer dentro de una tarjeta con:

* Foto.
* Nombre.
* Curso.
* Estado.
* Descripción.
* Una información adicional utilizando `children`.

La pantalla debe construirse utilizando **componentes reutilizables**, evitando escribir una tarjeta diferente para cada estudiante.

---

# 3. Parte A — Crear el componente `PerfilEstudiante`

Crear un archivo:

```text
PerfilEstudiante.js
```

El componente deberá recibir mediante props:

```text
nombre
curso
estado
descripcion
avatar
```

Además deberá aceptar:

```text
children
```

### Estructura esperada

```jsx
const PerfilEstudiante = ({
  nombre,
  curso,
  estado,
  descripcion,
  avatar,
  children
}) => {

  return (
    // JSX
  );

};
```

La tarjeta deberá mostrar:

```text
[ FOTO ]

Nombre del estudiante
Curso: 5°A
Estado: Activo

Descripción del estudiante

Información adicional
```

Por ejemplo:

```text
[ FOTO ]

Lucía Gómez
Curso: 5°A
Estado: Activo

Estudiante de programación.

Proyecto: Aplicación móvil
```

---

# 4. Parte B — Diseñar la tarjeta

Utilizar los componentes de React Native:

```jsx
View
Text
Image
```

Crear estilos mediante:

```jsx
StyleSheet.create()
```

La tarjeta debe tener como mínimo:

* Una imagen.
* Nombre destacado.
* Curso.
* Estado.
* Descripción.
* Contenido recibido mediante `children`.

No es necesario realizar un diseño complejo.

El objetivo principal es que funcione correctamente.

---

# 5. Parte C — Utilizar `children`

Desde `App.js`, colocar información adicional dentro del componente.

Ejemplo:

```jsx
<PerfilEstudiante
  nombre="Lucía Gómez"
  curso="5°A"
  estado="Activo"
  descripcion="Estudiante de programación."
  avatar={require("./assets/avatar1.png")}
>
  <Text>Proyecto: Aplicación móvil</Text>
</PerfilEstudiante>
```

Observar que:

```jsx
<Text>Proyecto: Aplicación móvil</Text>
```

no se envía como una prop tradicional.

Ese contenido llega al componente mediante:

```jsx
{children}
```

---

# 6. Parte D — Crear varios estudiantes

En `App.js`, crear un arreglo:

```jsx
const estudiantes = [
  {
    id: 1,
    nombre: "Lucía Gómez",
    curso: "5°A",
    estado: "Activo",
    descripcion: "Estudiante de programación."
  },
  {
    id: 2,
    nombre: "Mateo Pérez",
    curso: "5°A",
    estado: "Activo",
    descripcion: "Interesado en desarrollo web."
  },
  {
    id: 3,
    nombre: "Sofía Rodríguez",
    curso: "5°A",
    estado: "Ausente",
    descripcion: "Trabaja en un proyecto de IoT."
  }
];
```

Luego utilizar `.map()` para mostrar las tarjetas.

```jsx
{estudiantes.map((estudiante) => (
  <PerfilEstudiante
    key={estudiante.id}
    nombre={estudiante.nombre}
    curso={estudiante.curso}
    estado={estudiante.estado}
    descripcion={estudiante.descripcion}
    avatar={require("./assets/avatar1.png")}
  />
))}
```

---

# 7. Parte E — Modificar el estado visualmente

El estado del estudiante puede ser:

```text
Activo
Ausente
```

Modificar el componente para que el texto del estado tenga un estilo diferente según su valor.

Por ejemplo:

```jsx
<Text
  style={
    estado === "Activo"
      ? styles.estadoActivo
      : styles.estadoAusente
  }
>
  {estado}
</Text>
```

Crear los estilos correspondientes.

---

# 8. Desafío adicional

Si terminaste la actividad anterior, agregar una nueva prop:

```text
especialidad
```

Por ejemplo:

```jsx
<PerfilEstudiante
  nombre="Lucía Gómez"
  curso="7°A"
  especialidad="Programación"
  estado="Activo"
  descripcion="Estudiante de programación."
>
```

Mostrarla dentro de la tarjeta:

```text
Lucía Gómez
Curso: 7°A
Especialidad: Programación
Estado: Activo
```

---

# 9. Preguntas de comprensión

Responder al finalizar:

### 1.

¿Qué función cumple JSX?

### 2.

¿Qué diferencia existe entre un componente y una pantalla?

### 3.

¿Cómo se envía una prop?

Mostrar un ejemplo.

### 4.

¿Dónde se reciben las props?

### 5.

¿Qué función cumple `children`?

### 6.

¿Por qué utilizamos `key` cuando usamos `.map()`?

### 7.

¿Qué ventaja tiene crear un componente `PerfilEstudiante` en lugar de escribir tres tarjetas directamente en `App.js`?

---

# 10. Entrega

La aplicación debe contener como mínimo:

```text
App.js
PerfilEstudiante.js
assets/
```

Y debe mostrar **3 estudiantes utilizando el mismo componente**.

### Requisitos obligatorios

* [ ] La aplicación ejecuta correctamente.
* [ ] Existe un componente `PerfilEstudiante`.
* [ ] Se utilizan componentes funcionales.
* [ ] Se utilizan props.
* [ ] Se utiliza destructuring de props.
* [ ] Se utiliza `children`.
* [ ] Se utiliza `.map()`.
* [ ] Cada elemento tiene una `key`.
* [ ] Se utilizan estilos con `StyleSheet`.
* [ ] Los tres estudiantes utilizan el mismo componente.

---

# 11. Criterio de evaluación

| Criterio                        | Logrado |
| ------------------------------- | ------- |
| JSX correctamente utilizado     | ✓       |
| Componente funcional            | ✓       |
| Props                           | ✓       |
| `children`                      | ✓       |
| `.map()` y `key`                | ✓       |
| Reutilización del componente    | ✓       |
| Funcionamiento de la aplicación | ✓       |

**Idea central de la actividad:**

> En React no creamos tres tarjetas diferentes. Creamos **un componente** y le enviamos **datos diferentes mediante props**.

Esto permite pasar de:

```jsx
<Tarjeta1 />
<Tarjeta2 />
<Tarjeta3 />
```

a:

```jsx
estudiantes.map((estudiante) => (
  <PerfilEstudiante ... />
))
```

Ese cambio representa uno de los conceptos fundamentales de React: **construir interfaces mediante componentes reutilizables y parametrizables**.
