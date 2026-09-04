# Actividad práctica: API en PHP y consumo desde React Native

## Objetivo

Desarrollar una pequeña aplicación completa formada por dos partes:

**Backend:** una API desarrollada en PHP que obtiene datos desde una base de datos.

**Frontend:** una aplicación React Native que realiza una petición HTTP a la API y muestra los datos recibidos.

El objetivo es comprender el recorrido completo de los datos:

```text
Base de datos
      ↓
     PHP
      ↓
     API
      ↓
    JSON
      ↓
React Native
      ↓
Pantalla
```

---

# 1. Parte A — Crear la API en PHP

Cada estudiante deberá desarrollar su propia API utilizando **PHP tradicional**.

La API deberá estar ejecutándose en el servidor local, por ejemplo:

```text
http://localhost/mi-api/
```

## 1.1. Crear el proyecto

Crear una carpeta para la API dentro del directorio utilizado por el servidor web local.

Por ejemplo:

```text
mi-api/
├── index.php
├── conexion.php
└── estudiantes.php
```

La estructura puede modificarse según el diseño elegido, pero deberá existir como mínimo un archivo PHP que responda las peticiones de la aplicación móvil.

---

## 1.2. Base de datos

Crear una base de datos para almacenar los estudiantes.

Crear una tabla con información similar a:

```text
estudiantes
--------------------------------
id
nombre
curso
estado
descripcion
avatar
```

Cargar como mínimo **5 estudiantes**.

El campo `avatar` deberá almacenar una URL de imagen.

Ejemplo:

```text
https://i.pravatar.cc/150?img=1
```

---

# 2. Crear el endpoint de la API

Crear un endpoint que permita obtener todos los estudiantes.

Por ejemplo:

```text
http://localhost/mi-api/estudiantes.php
```

La respuesta deberá estar en formato **JSON**.

Ejemplo:

```json
[
    {
        "id": 1,
        "nombre": "Lucía Gómez",
        "curso": "5°A",
        "estado": "Activo",
        "descripcion": "Estudiante de programación.",
        "avatar": "https://i.pravatar.cc/150?img=1"
    }
]
```

La API deberá consultar la información desde la base de datos.

**No se deberán escribir los estudiantes directamente dentro del código PHP.**

---

# 3. Probar la API

Antes de comenzar con React Native, comprobar que la API funciona correctamente.

Abrir en el navegador:

```text
http://localhost/mi-api/estudiantes.php
```

Deberá visualizarse una respuesta JSON.

Por ejemplo:

```json
[
    {
        "id": 1,
        "nombre": "Lucía Gómez",
        "curso": "5°A",
        "estado": "Activo",
        "descripcion": "Estudiante de programación.",
        "avatar": "https://i.pravatar.cc/150?img=1"
    }
]
```

Este paso es importante:

> **Primero comprobar que funciona la API y después conectarla con React Native.**

---

# 4. Parte B — Aplicación React Native

Utilizar la aplicación desarrollada anteriormente con el componente:

```text
PerfilEstudiante
```

La aplicación deberá dejar de utilizar el arreglo local de estudiantes.

En su lugar, deberá obtener los datos desde la API PHP.

---

# 5. Realizar la petición desde React Native

Utilizar:

```jsx
fetch()
```

para realizar una petición HTTP a la API.

Por ejemplo:

```jsx
const respuesta = await fetch(
    'http://DIRECCION_DEL_SERVIDOR/mi-api/estudiantes.php'
);
```

La URL deberá ser modificada según la configuración de cada estudiante.

---

# 6. Utilizar `useState`

Crear un estado para almacenar los estudiantes obtenidos desde la API:

```jsx
const [estudiantes, setEstudiantes] = useState([]);
```

También deberán existir estados para controlar la carga y los errores:

```jsx
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);
```

---

# 7. Utilizar `useEffect`

La petición deberá realizarse automáticamente cuando se inicia la aplicación.

Utilizar:

```jsx
useEffect(() => {
    obtenerEstudiantes();
}, []);
```

La función `obtenerEstudiantes()` deberá:

1. Realizar el `fetch`.
2. Comprobar la respuesta.
3. Convertir la respuesta a JSON.
4. Guardar los datos en `estudiantes`.
5. Detectar posibles errores.
6. Finalizar el estado de carga.

---

# 8. Mostrar los datos

Los estudiantes obtenidos desde PHP deberán enviarse al componente `PerfilEstudiante` mediante props.

Ejemplo:

```jsx
{estudiantes.map((estudiante) => (
    <PerfilEstudiante
        key={estudiante.id}
        nombre={estudiante.nombre}
        curso={estudiante.curso}
        estado={estudiante.estado}
        descripcion={estudiante.descripcion}
        avatar={estudiante.avatar}
    />
))}
```

El componente deberá mostrar:

* imagen
* nombre
* curso
* estado
* descripción

---

# 9. Mostrar imágenes remotas

Como la dirección de la imagen proviene de la API, `PerfilEstudiante` deberá utilizar:

```jsx
<Image
    source={{ uri: avatar }}
    style={styles.imagen}
/>
```

Ya no se deberán utilizar imágenes mediante:

```jsx
require(...)
```

---

# 10. Estados de la aplicación

La aplicación deberá contemplar tres situaciones.

### Cargando

Mientras se realiza la petición:

```text
Cargando estudiantes...
```

o un `ActivityIndicator`.

### Error

Si la petición falla:

```text
No se pudieron obtener los estudiantes.
```

### Éxito

Si la petición funciona correctamente:

```text
Lista de estudiantes
```

mostrando las tarjetas.

---

# 11. Prueba completa

La aplicación deberá funcionar siguiendo este recorrido:

```text
        ┌─────────────────┐
        │    MySQL        │
        │  estudiantes    │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │       PHP       │
        │    API REST     │
        └────────┬────────┘
                 │
              JSON
                 │
                 ▼
        ┌─────────────────┐
        │  React Native   │
        │     fetch()     │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ PerfilEstudiante│
        └─────────────────┘
```

---

# 12. Problema importante: `localhost`

Prestar especial atención a la dirección utilizada.

Desde React Native, `localhost` hace referencia al dispositivo o emulador donde se está ejecutando la aplicación, no necesariamente a la computadora donde está instalado PHP.

Por lo tanto, según el entorno utilizado, deberán utilizar la dirección correspondiente al servidor donde se encuentra la API.

Por ejemplo:

```text
http://192.168.1.100/mi-api/estudiantes.php
```

En un dispositivo físico:

```text
Celular ───── Wi-Fi ───── PC
                           │
                           └── Apache + PHP + MySQL
```

El celular y la computadora deberán poder comunicarse mediante la red local.

---

# 13. Actividad adicional: modificar los datos

Una vez que la aplicación funcione correctamente, modificar desde PHP/MySQL uno de los estudiantes.

Por ejemplo:

```text
Nombre:
Lucía Gómez
```

cambiarlo por:

```text
Nombre:
Lucía Fernández
```

Volver a ejecutar la aplicación.

### Pregunta

¿Por qué el nombre cambió en React Native sin modificar el código JavaScript?

Explicar el recorrido de los datos.

---

# 14. Entrega

Cada estudiante deberá entregar:

### Backend

Proyecto PHP con:

```text
API
+
Base de datos
+
Endpoint JSON
```

### Aplicación móvil

Proyecto React Native que:

```text
consume la API
+
obtiene JSON
+
utiliza useState
+
utiliza useEffect
+
muestra los datos
```

### Evidencias

Capturas de:

1. La base de datos.
2. La respuesta JSON de la API en el navegador.
3. La aplicación React Native mostrando los estudiantes.

### Explicación

Responder:

**1. ¿Qué función cumple la API?**

**2. ¿Qué función cumple `fetch()`?**

**3. ¿Para qué se utiliza `useState`?**

**4. ¿Para qué se utiliza `useEffect`?**

**5. ¿Por qué los datos deben estar en la base de datos y no escritos directamente en React Native?**

**6. ¿Por qué `localhost` puede generar problemas cuando se utiliza un teléfono físico?**

---

# 15. Resultado esperado

Al finalizar, cada estudiante deberá tener una aplicación en la que:

```text
MySQL
  ↓
PHP
  ↓
API JSON
  ↓
React Native
  ↓
useState
  ↓
Props
  ↓
PerfilEstudiante
  ↓
Pantalla
```

La aplicación móvil **no tendrá almacenados los estudiantes en un arreglo local**.

Los datos deberán provenir de la **API PHP desarrollada por el propio estudiante**.
