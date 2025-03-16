## Objetivos Generales del Curso

- **Comprender y aplicar el patrón MVC en aplicaciones PHP.**
- **Diseñar y estructurar un proyecto e-commerce modular y escalable.**
- **Adquirir prácticas profesionales de trabajo en equipo, utilizando herramientas de control de versiones y metodologías ágiles.**
- **Integrar aspectos clave como seguridad, rendimiento, testing y despliegue.**

---

## Plan de Clases

### 1: Introducción al Curso y Planificación del Proyecto E-commerce**  
- **Objetivos:**  
  - Presentar el curso, metodologías y expectativas.
  - Definir el alcance del proyecto e-commerce.
  - Conocer roles y herramientas colaborativas.
- **Contenidos:**  
  - Visión general del e-commerce: características, funcionalidades y arquitectura general.
  - Introducción al trabajo en equipo profesional: roles (desarrollador, diseñador, QA, project manager) y herramientas colaborativas (Slack, Trello/Jira, Google Drive).
  - Organización del curso y formación de equipos.
- **Actividad práctica:**  
  - Dinámica de presentación y definición de ideas para el proyecto.

---

### 2: Fundamentos del Patrón MVC y Arquitectura de Aplicaciones Web**  
- **Objetivos:**  
  - Comprender el concepto de separación de responsabilidades.
  - Conocer las ventajas y el flujo de trabajo en MVC.
- **Contenidos:**  
  - Definición de Modelo, Vista y Controlador.
  - Ejemplos teóricos y casos de uso en aplicaciones web.
  - Comparativa con otros patrones de diseño.
- **Actividad práctica:**  
  - Análisis de diagramas de flujo y discusión en equipo sobre la estructura MVC.

---

### 3: Estructura de un Proyecto MVC en PHP y Configuración Inicial**  
- **Objetivos:**  
  - Definir la estructura de directorios y archivos en un proyecto MVC.
  - Implementar un Front Controller básico.
- **Contenidos:**  
  - Organización de carpetas: /app (controllers, models, views), /public, etc.
  - Configuración del archivo `index.php` y manejo de rutas simples.
  - Uso de .htaccess y mod_rewrite para URLs limpias.
- **Actividad práctica:**  
  - Configuración inicial en un repositorio y creación de la estructura base.

---

### 4: Desarrollo del Modelo – Conexión a Base de Datos y Operaciones CRUD**  
- **Objetivos:**  
  - Implementar la capa de acceso a datos usando PHP y MySQL.
  - Desarrollar un modelo base y ejemplos de CRUD.
- **Contenidos:**  
  - Conexión a MySQL usando PDO.
  - Creación de una clase BaseModel y definición de métodos para crear, leer, actualizar y eliminar datos.
  - Introducción al patrón Active Record.
- **Actividad práctica:**  
  - Creación de un módulo sencillo (por ejemplo, gestión de productos) y realización de operaciones CRUD.

---

### 5: Desarrollo de Vistas – Plantillas, HTML, CSS y JavaScript**  
- **Objetivos:**  
  - Separar la capa de presentación utilizando plantillas.
  - Aplicar técnicas de diseño responsivo y usabilidad.
- **Contenidos:**  
  - Organización de archivos de vistas y uso de includes/plantillas.
  - Integración de CSS (Bootstrap o similar) y JavaScript para interactividad.
  - Buenas prácticas en la generación de HTML desde PHP.
- **Actividad práctica:**  
  - Desarrollo de una vista para listar productos, implementando un header, footer y layout consistente.

---

### 6: Desarrollo de Controladores – Lógica de Negocio y Gestión de Solicitudes**  
- **Objetivos:**  
  - Crear controladores que coordinen modelos y vistas.
  - Gestionar la lógica de negocio y el flujo de la aplicación.
- **Contenidos:**  
  - Estructura de un controlador en PHP.
  - Manejo de peticiones GET y POST.
  - Validación y sanitización de datos.
- **Actividad práctica:**  
  - Programar un controlador para registrar usuarios o procesar formularios de contacto.

---

### 7: Integración MVC – Unificando Modelo, Vista y Controlador**  
- **Objetivos:**  
  - Integrar las tres capas en un módulo funcional.
  - Manejar el paso de parámetros y la gestión de errores.
- **Contenidos:**  
  - Coordinación entre el Front Controller y los controladores específicos.
  - Pasaje de datos del modelo a la vista.
  - Estrategias de manejo de errores y mensajes al usuario.
- **Actividad práctica:**  
  - Desarrollo de un módulo completo (por ejemplo, “detalle del producto”) integrando las tres capas.

---

### 8: Introducción a Git y Gestión del Código en Equipo**  
- **Objetivos:**  
  - Conocer las bases de Git y flujo de trabajo colaborativo.
  - Configurar un repositorio central para el proyecto.
- **Contenidos:**  
  - Fundamentos de Git: commits, branches, merge y resolución de conflictos.
  - Introducción a plataformas colaborativas (GitHub, GitLab o Bitbucket).
  - Buenas prácticas en commit messages y estructura de ramas.
- **Actividad práctica:**  
  - Inicialización de un repositorio, creación de ramas y simulación de un merge conflict.

---

### 9: Metodologías Ágiles y Gestión de Proyectos en Equipos de Desarrollo**  
- **Objetivos:**  
  - Introducir conceptos ágiles aplicables al desarrollo web.
  - Planificar sprints y organizar tareas.
- **Contenidos:**  
  - Fundamentos de Scrum y Kanban.
  - Herramientas de gestión (Jira, Trello, Asana).
  - Roles y reuniones: stand-ups, retrospectivas y planificación.
- **Actividad práctica:**  
  - Simulación de una reunión de planificación y asignación de tareas para el proyecto e-commerce.

---

### 10: Desarrollo Avanzado – Módulos de Productos, Usuarios y Carrito de Compras**  
- **Objetivos:**  
  - Diseñar y desarrollar módulos centrales de un e-commerce.
  - Gestionar la lógica de negocio compleja y la interacción entre módulos.
- **Contenidos:**  
  - Diseño de la base de datos para productos, usuarios, pedidos y carrito.
  - Implementación de módulos MVC para la gestión de productos y usuarios.
  - Manejo de sesiones y estado del carrito.
- **Actividad práctica:**  
  - Programación de un módulo de “Agregar al carrito” y validación de stock.

---

### 11: Integración de Pagos y Seguridad en Aplicaciones E-commerce**  
- **Objetivos:**  
  - Conocer la integración de pasarelas de pago.
  - Implementar medidas de seguridad en el desarrollo web.
- **Contenidos:**  
  - Introducción a APIs de pago (PayPal, Stripe).
  - Implementación de un flujo de pago simulado.
  - Buenas prácticas de seguridad: validación de inputs, prevención de inyección SQL, XSS, CSRF.
- **Actividad práctica:**  
  - Desarrollo de un módulo básico para simular la integración de pagos y pruebas de vulnerabilidades.

---

### 12: Optimización, Rendimiento y Escalabilidad**  
- **Objetivos:**  
  - Mejorar el rendimiento de la aplicación e-commerce.
  - Implementar técnicas de optimización en el código y consultas.
- **Contenidos:**  
  - Caching (uso de memcached, Redis o cache en PHP).
  - Optimización de consultas MySQL y uso de índices.
  - Profiling y depuración de rendimiento.
- **Actividad práctica:**  
  - Realizar pruebas de rendimiento y optimizar un módulo de consulta de productos.

---

### 13: Testing y Aseguramiento de la Calidad**  
- **Objetivos:**  
  - Introducir pruebas unitarias y funcionales en PHP.
  - Garantizar la calidad del código a través de testing.
- **Contenidos:**  
  - Uso de PHPUnit para pruebas unitarias.
  - Creación de casos de prueba para modelos y controladores.
  - Estrategias de testing en integración y revisión de código.
- **Actividad práctica:**  
  - Escribir tests para un módulo del proyecto y ejecutar un ciclo de pruebas.

---

### 14: Despliegue y Mantenimiento de la Aplicación**  
- **Objetivos:**  
  - Preparar el entorno de producción y aprender técnicas de despliegue.
  - Conocer herramientas y procesos para el mantenimiento.
- **Contenidos:**  
  - Estrategias de despliegue: servidores, staging y producción.
  - Uso de Docker o herramientas similares para la contenedorización.
  - Automatización y scripts de despliegue.
- **Actividad práctica:**  
  - Configuración de un entorno local simulado de producción y despliegue de una versión del proyecto.

---

### 15: Integración Final – Construcción del Proyecto E-commerce (Parte 1)**  
- **Objetivos:**  
  - Integrar todos los módulos desarrollados por el equipo.
  - Realizar pruebas de integración y depuración conjunta.
- **Contenidos:**  
  - Revisión de la arquitectura general y de la integración de módulos (productos, usuarios, carrito, pagos).
  - Pruebas de integración y resolución de conflictos.
  - Sesión de code review colaborativo.
- **Actividad práctica:**  
  - Taller de integración en equipo, con revisión y feedback en tiempo real.

---

### 16: Integración Final – Construcción del Proyecto E-commerce (Parte 2) y Presentación**  
- **Objetivos:**  
  - Finalizar los detalles del proyecto.
  - Presentar el producto final y realizar una retrospectiva del trabajo en equipo.
- **Contenidos:**  
  - Últimas correcciones, optimizaciones y pruebas de usabilidad.
  - Preparación de la documentación y demo del proyecto.
  - Retroalimentación, lecciones aprendidas y evaluación final.
- **Actividad práctica:**  
  - Presentación de cada equipo, discusión de retos y conclusiones del proceso de desarrollo.

---

## Consideraciones Finales

- **Metodología:**  
  - Se combinarán exposiciones teóricas, ejemplos de código en vivo, ejercicios prácticos y trabajo colaborativo en equipo.
- **Evaluación:**  
  - Se evaluará la participación en clase, la correcta integración de los módulos y la presentación final del proyecto e-commerce.
- **Herramientas recomendadas:**  
  - IDE (PHPStorm, VSCode), Git y plataforma colaborativa, sistema de gestión de proyectos (Trello, Jira), servidor local (XAMPP, Docker).

Este plan de 16 clases está diseñado para cubrir de forma integral tanto los fundamentos del patrón MVC como las competencias necesarias para el trabajo colaborativo en equipo y el desarrollo de un proyecto de e-commerce completo y profesional.