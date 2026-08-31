# Proyecto Final

## Diseño y desarrollo de un sitio web dinámico

### 🎯 Propósito

En esta etapa deberán integrar los conocimientos adquiridos durante el curso para desarrollar un **sitio web dinámico y funcional**, utilizando HTML, CSS, PHP, MySQL y JavaScript y/o AJAX.

El proyecto podrá ser de **temática libre**

El objetivo no es solamente crear una página visualmente atractiva, sino desarrollar un sistema que permita **gestionar información, interactuar con usuarios y almacenar datos en una base de datos**.

---

## 1. Elección del proyecto

Cada grupo deberá seleccionar una de las siguientes alternativas:

### Proyecto de temática libre

Podrán desarrollar un sistema relacionado con cualquier temática que resulte de interés.

Algunos ejemplos:

* Biblioteca.
* Sistema de turnos.
* Gestión de eventos.
* Catálogo de productos.
* Blog.
* Sistema de reservas.
* Gestión de películas o series.
* Sitio de una institución.
* Sistema de noticias.
* Gestión de cursos.
* Otro proyecto acordado con el docente.

---

# 2. Requisitos mínimos

El proyecto deberá cumplir **obligatoriamente** con los siguientes requisitos.

### A. Interfaz web

El sistema deberá utilizar:

* HTML5 para la estructura.
* CSS3 para la presentación.
* Diseño organizado y adaptable a diferentes tamaños de pantalla.
* Navegación entre las diferentes secciones del sistema.

### B. PHP

PHP deberá utilizarse para implementar la lógica del sistema y procesar las solicitudes realizadas por los usuarios.

Deberá existir interacción entre:

**Usuario → HTML/CSS → PHP → MySQL**

### C. Base de datos

El sistema deberá utilizar una **base de datos relacional MySQL**.

Deberá contener las tablas necesarias para almacenar la información del sistema.

Como mínimo deberá existir una entidad principal que pueda ser gestionada mediante un CRUD.

### D. CRUD

El proyecto deberá implementar al menos **un CRUD funcional**.

CRUD significa:

* **C**reate → Crear registros.
* **R**ead → Consultar registros.
* **U**pdate → Modificar registros.
* **D**elete → Eliminar registros.

Ejemplo:

> Si el sistema administra productos, deberá permitir agregar, consultar, modificar y eliminar productos.

El CRUD deberá funcionar realmente sobre la base de datos.

---

# 3. Sistema de usuarios

El sistema deberá incorporar un mecanismo básico de usuarios.

Como mínimo deberá permitir:

* Registrarse o disponer de usuarios previamente creados.
* Iniciar sesión.
* Cerrar sesión.
* Mantener la sesión mediante PHP.
* Restringir determinadas funcionalidades a usuarios autenticados.

Por ejemplo:

**Usuario no autenticado**

→ Puede visualizar información pública.

**Usuario autenticado**

→ Puede acceder al panel de gestión y realizar operaciones permitidas.

---

# 4. Control de acceso

No todas las funcionalidades deberán estar disponibles para cualquier usuario.

Deberán implementar algún mecanismo básico de **control de acceso**.

Por ejemplo:

```text
Página pública
      │
      ├── Inicio
      ├── Productos
      └── Contacto

Usuario autenticado
      │
      └── Panel de gestión
              ├── Alta
              ├── Modificación
              └── Eliminación
```

El sistema deberá comprobar que el usuario tenga una sesión válida antes de acceder a las funcionalidades protegidas.

---

# 5. Validaciones

El sistema deberá validar los datos ingresados por el usuario.

Deberán existir, como mínimo:

### Validaciones del lado del cliente

Utilizando HTML y/o JavaScript.

Ejemplos:

* Campos obligatorios.
* Formato de email.
* Longitud mínima.
* Valores permitidos.

### Validaciones del lado del servidor

Utilizando PHP.

El servidor **no deberá confiar únicamente en las validaciones realizadas mediante HTML o JavaScript**.

---

# 6. Seguridad básica

El proyecto deberá aplicar buenas prácticas básicas de seguridad.

Como mínimo:

* Las contraseñas no deberán almacenarse en texto plano.
* Utilizar `password_hash()` para almacenar contraseñas.
* Utilizar `password_verify()` para comprobarlas.
* Utilizar consultas preparadas para interactuar con MySQL.
* Validar y sanitizar los datos recibidos.
* Controlar el acceso a páginas que requieran autenticación.
* No mostrar información sensible de la base de datos.
* Evitar incorporar directamente datos recibidos del usuario dentro de consultas SQL.

El objetivo es comprender que **una aplicación funcional también debe ser una aplicación segura**.

---

# 7. JavaScript y/o AJAX

El proyecto deberá incorporar JavaScript y/o AJAX de manera significativa.

No se deberá utilizar JavaScript solamente para efectos visuales.

Deberá aportar alguna funcionalidad al sistema.

Por ejemplo:

* Validación de formularios.
* Confirmación antes de eliminar registros.
* Filtrado de información.
* Búsqueda dinámica.
* Actualización parcial de información.
* Carga de datos mediante AJAX.
* Interacción dinámica con formularios.
* Actualización de contenidos sin recargar toda la página.

---

# 8. Estructura del proyecto

El proyecto deberá mantener una estructura organizada.

Por ejemplo:

```text
proyecto/
│
├── index.php
│
├── css/
│   └── estilos.css
│
├── js/
│   └── script.js
│
├── img/
│
├── includes/
│   ├── conexion.php
│   ├── autenticacion.php
│   └── funciones.php
│
├── usuarios/
│   ├── login.php
│   ├── registro.php
│   └── logout.php
│
├── admin/
│   └── ...
│
└── database/
    └── proyecto.sql
```

La estructura podrá variar según las características del proyecto, pero deberá mantenerse **ordenada y coherente**.

---

# 9. Documentación técnica

El proyecto deberá estar acompañado por una documentación que permita comprender y utilizar el sistema.

### A. Descripción del sistema

Deberá explicar:

* Nombre del proyecto.
* Problema o necesidad que intenta resolver.
* Objetivo del sistema.
* Usuarios a los que está destinado.
* Principales funcionalidades.
* Tecnologías utilizadas.

### B. Estructura del proyecto

Deberá explicar brevemente la organización de las carpetas y archivos principales.

### C. Base de datos

Deberá incluir:

* Nombre de la base de datos.
* Tablas utilizadas.
* Campos principales.
* Relaciones entre las tablas.
* Diagrama de la base de datos, si corresponde.

### D. Manual de usuario

Deberá explicar cómo utilizar el sistema.

Por ejemplo:

1. Cómo ingresar.
2. Cómo registrarse.
3. Cómo iniciar sesión.
4. Cómo realizar una operación.
5. Cómo modificar información.
6. Cómo eliminar información.
7. Cómo cerrar sesión.

Se podrán incorporar capturas de pantalla para facilitar la explicación.

---

# 10. Entrega

La entrega deberá contener:

```text
📁 Proyecto
│
├── Código fuente
├── Base de datos (.sql)
└── Documentación
```

La documentación deberá incluir:

* Descripción del sistema.
* Tecnologías utilizadas.
* Estructura del proyecto.
* Descripción de la base de datos.
* Manual de usuario.
* Consideraciones de seguridad.

---

# 11. Presentación y demostración

Cada grupo deberá realizar una breve presentación del proyecto.

Durante la demostración deberán mostrar el funcionamiento real del sistema.

Como mínimo deberán demostrar:

1. Acceso al sistema.
2. Inicio de sesión.
3. Uso de sesiones.
4. Acceso a una funcionalidad protegida.
5. CRUD completo.
6. Lectura y escritura en MySQL.
7. Validaciones.
8. Alguna funcionalidad implementada con JavaScript y/o AJAX.
9. Control de acceso.
10. Medidas básicas de seguridad.

---

# 12. Condición mínima de aprobación

Para considerar el proyecto **funcional**, deberá cumplir como mínimo con:

| Requisito                | Obligatorio |
| ------------------------ | :---------: |
| HTML + CSS               |      ✅      |
| PHP                      |      ✅      |
| MySQL                    |      ✅      |
| Base de datos relacional |      ✅      |
| CRUD completo            |      ✅      |
| Sistema de usuarios      |      ✅      |
| Sesiones                 |      ✅      |
| Control de acceso        |      ✅      |
| Validaciones             |      ✅      |
| Seguridad básica         |      ✅      |
| JavaScript y/o AJAX      |      ✅      |
| Documentación            |      ✅      |

**Importante:** No se evaluará únicamente la apariencia visual. Se tendrá especialmente en cuenta el correcto funcionamiento del sistema, la integración entre sus componentes, la organización del código y la aplicación de los conceptos trabajados durante el curso.

### 💡 Recomendación

Es preferible desarrollar un proyecto **simple pero completo y funcional** antes que intentar construir un sistema demasiado grande que no pueda terminarse correctamente.

**La prioridad es integrar los conocimientos, no agregar funcionalidades innecesarias.**
