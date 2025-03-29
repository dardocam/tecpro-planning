### Filmina 1: Portada
- **Título:** Clase 10: Introducción a Bases de Datos y SQL
- **Subtítulo:** Conceptos, diseño y manipulación de bases de datos relacionales
- **Profesor:** Dardo Camaño
- **Fecha:** [Fecha de la Clase]

---

### Filmina 2: Agenda de la Clase
- **Introducción (10 minutos):**
  - Pregunta inicial: “¿Qué es una base de datos relacional y cómo nos ayuda a gestionar información?”
  - Importancia de las bases de datos en aplicaciones web.
- **Teoría (40 minutos):**
  - Conceptos básicos de bases de datos relacionales.
  - Introducción al lenguaje SQL: comandos principales (SELECT, INSERT, UPDATE, DELETE).
  - Diseño básico de una base de datos: tablas, relaciones y claves.
- **Práctica (40 minutos):**
  - Ejercicios prácticos en phpMyAdmin o herramienta similar para:
    - Crear una base de datos y tablas.
    - Insertar, consultar, actualizar y eliminar datos.
- **Cierre (10 minutos):**
  - Resumen de los conceptos clave y sesión de preguntas y respuestas.

---

### Filmina 3: Objetivos de la Clase
- **Objetivos Teóricos:**
  - Conocer los fundamentos de las bases de datos relacionales.
  - Aprender el lenguaje SQL y sus comandos básicos (SELECT, INSERT, UPDATE, DELETE).
  - Comprender el diseño básico de una base de datos (tablas, relaciones, claves primarias y foráneas).
- **Objetivos Prácticos:**
  - Crear y manipular una base de datos usando phpMyAdmin u otra herramienta.
  - Realizar operaciones de consulta y modificación de datos en un entorno práctico.

---

### Filmina 4: Introducción a las Bases de Datos Relacionales
- **Definición:**
  - Conjunto de datos organizados en tablas que se relacionan entre sí mediante claves.
- **Componentes Principales:**
  - **Tablas:** Estructuras que almacenan datos en filas y columnas.
  - **Claves Primarias:** Identificadores únicos de cada registro.
  - **Claves Foráneas:** Campos que relacionan una tabla con otra.
- **Importancia:**
  - Permite una gestión eficiente y estructurada de la información.
  - Facilita la realización de consultas complejas y la integridad referencial.

---

### Filmina 5: Introducción al Lenguaje SQL
- **SQL (Structured Query Language):**
  - Lenguaje estándar para interactuar con bases de datos relacionales.
- **Comandos Básicos:**
  - **SELECT:** Consulta y recuperación de datos.
  - **INSERT:** Inserción de nuevos registros.
  - **UPDATE:** Actualización de registros existentes.
  - **DELETE:** Eliminación de registros.
- **Ejemplo Básico:**
  ```sql
  SELECT * FROM usuarios;
  INSERT INTO usuarios (nombre, email) VALUES ('Ana', 'ana@example.com');
  UPDATE usuarios SET email = 'nuevo@example.com' WHERE id = 1;
  DELETE FROM usuarios WHERE id = 1;
  ```

---

### Filmina 6: Diseño Básico de una Base de Datos
- **Elementos Clave:**
  - **Tablas:** Definición de cada entidad (ej. usuarios, productos).
  - **Relaciones:** Cómo se conectan las tablas (uno a muchos, muchos a muchos).
  - **Normalización:** Organización de datos para reducir la redundancia.
- **Ejemplo de Diseño:**
  - **Tabla Usuarios:**
    - id (PK), nombre, email, contraseña.
  - **Tabla Pedidos:**
    - id (PK), usuario_id (FK), fecha, total.
- **Diagrama Simple:**
  - Representación visual de las tablas y sus relaciones.

---

### Filmina 7: Ejercicios Prácticos – Uso de SQL en phpMyAdmin
- **Herramienta:** phpMyAdmin (o simulador similar).
- **Tareas:**
  - Crear una base de datos llamada `tienda`.
  - Crear tablas `usuarios` y `pedidos` siguiendo el diseño propuesto.
  - Realizar operaciones SQL:
    - Insertar datos en ambas tablas.
    - Consultar datos usando SELECT.
    - Actualizar y eliminar registros.
- **Objetivo:**
  - Familiarizarse con la interfaz y comandos SQL en un entorno gráfico.

---

### Filmina 8: Demostración en Vivo
- **Paso a Paso:**
  - Mostrar la creación de la base de datos y tablas en phpMyAdmin.
  - Ejecutar comandos SQL para insertar, consultar, actualizar y eliminar datos.
- **Interacción:**
  - Invitar a los estudiantes a sugerir consultas y modificaciones en tiempo real.

---

### Filmina 9: Actividad Práctica – Ejercicios con Bases de Datos
- **Nombre de la Actividad:** Manipulación de Bases de Datos con SQL
- **Duración:** 40 minutos
- **Instrucciones:**
  - Los estudiantes, individualmente o en parejas, deberán:
    - Crear una base de datos y diseñar tablas según un esquema sencillo.
    - Escribir y ejecutar comandos SQL para insertar y manipular datos.
    - Realizar consultas que integren JOINs para relacionar datos entre tablas (si el tiempo lo permite).
- **Objetivo:**
  - Aplicar los conceptos teóricos de SQL y diseño de bases de datos en un entorno práctico.
  - Mejorar la capacidad de resolver problemas y estructurar datos de manera eficiente.

---

### Filmina 10: Cierre y Preguntas
- **Resumen de la Clase:**
  - Repaso de los conceptos básicos de bases de datos relacionales y del lenguaje SQL.
  - Importancia del diseño de bases de datos y la integridad referencial.
  - Revisión de los ejercicios prácticos y la experiencia en phpMyAdmin.
- **Preguntas y Respuestas:**
  - Espacio para resolver dudas y discutir casos prácticos.
  - Retroalimentación sobre los problemas encontrados y soluciones aplicadas.

---

### Filmina 11: Recursos y Bibliografía
- **Documentación Oficial:**
  - [MySQL Documentation](https://dev.mysql.com/doc/)
  - [PHP Manual – Bases de Datos](https://www.php.net/manual/es/book.mysql.php)
- **Tutoriales y Ejercicios:**
  - Videos y cursos en YouTube sobre SQL y diseño de bases de datos.
  - Ejercicios interactivos en plataformas como W3Schools y freeCodeCamp.
- **Enlaces Recomendados:**
  - [W3Schools – SQL Tutorial](https://www.w3schools.com/sql/)
  - Blogs y foros especializados en bases de datos y desarrollo web.

