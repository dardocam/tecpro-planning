# Consigna de trabajo: Creación de un diagrama de Gantt en Google Sheets

**Objetivo:** Utilizar la guía proporcionada para aprender a planificar y organizar las tareas de un proyecto mediante un diagrama de Gantt.

### Actividad

Leé atentamente la guía y seguí sus instrucciones para crear un diagrama de Gantt en Google Sheets.

Deberás elegir un proyecto informático, como el desarrollo de una página web, una aplicación móvil, un videojuego o la construcción de un dispositivo electrónico.

Tu trabajo deberá incluir:

1. Un título que identifique el proyecto.
2. Al menos seis tareas necesarias para realizarlo.
3. Las fechas de inicio y finalización de cada tarea.
4. Un responsable para cada actividad.
5. Una línea de tiempo con las fechas correspondientes.
6. Barras de colores generadas mediante el formato condicional, según las indicaciones de la guía.

### Entrega

Compartí el enlace de tu hoja de cálculo con el docente, verificando que tenga los permisos necesarios para visualizarla.

### Criterios de evaluación

Se evaluará la correcta organización de las tareas, la asignación de fechas y responsables, la aplicación del formato condicional y la presentación general del diagrama.

**Importante:** el trabajo debe ser realizado por el estudiante, quien deberá poder explicar cómo funciona su diagrama y qué información representa.

---

# Guía práctica: Cómo crear un diagrama de Gantt en Google Sheets

**Área:** Informática\
**Nivel:** Básico\
**Objetivo:** Aprender a organizar las tareas de un proyecto mediante un diagrama de Gantt.

## 1. ¿Qué es un diagrama de Gantt?

Un diagrama de Gantt es una herramienta que permite organizar las tareas de un proyecto y visualizar cuándo comienza y termina cada una.

- **Filas:** representan las tareas.
- **Columnas:** representan las fechas.
- **Barras de colores:** indican durante qué días se realiza cada tarea.

Por ejemplo, podemos utilizarlo para planificar la construcción de un semáforo electrónico con un ESP32.

## 2. Crear una hoja de cálculo

1. Ingresá a [Google Sheets](https://sheets.google.com).
2. Creá una hoja de cálculo en blanco.
3. En la celda **A1**, escribí: `Proyecto: Semáforo conectado`.
4. Seleccioná la celda **A3** y copiá la siguiente tabla.

```
Tarea	Inicio	Fin	Responsable	02/11/2026	03/11/2026	04/11/2026	05/11/2026	06/11/2026	07/11/2026	08/11/2026	09/11/2026	10/11/2026	11/11/2026
Definir objetivos	02/11/2026	03/11/2026	Equipo A
Diseñar el circuito	03/11/2026	04/11/2026	Equipo A
Armar el semáforo	04/11/2026	07/11/2026	Equipo B
Programar el ESP32	05/11/2026	08/11/2026	Equipo C
Integrar y probar	08/11/2026	10/11/2026	Todo el equipo
Preparar la presentación	09/11/2026	11/11/2026	Todo el equipo
```

**Importante:** los datos deben quedar distribuidos en columnas. Si no ocurre automáticamente, seleccioná las celdas pegadas y utilizá **Datos → Dividir texto en columnas**, con el tabulador como separador.

## 3. Comprender la tabla

Antes de continuar, identificá las partes de la tabla:

- **Tarea:** actividad que se debe realizar.
- **Inicio:** fecha en la que comienza.
- **Fin:** fecha en la que termina.
- **Responsable:** persona o equipo encargado.
- **Fechas:** período que muestra la planificación del proyecto.

Las fechas de la primera fila de la tabla deben estar ubicadas entre las columnas **E y N**.

## 4. Crear las barras del diagrama

Ahora vamos a utilizar el formato condicional para que Google Sheets coloree automáticamente los días en los que se realiza cada tarea.

### Paso 1. Seleccionar las celdas

Seleccioná el rango:

`E4:N9`

Este espacio será utilizado para dibujar las barras.

### Paso 2. Abrir el formato condicional

En el menú superior, ingresá a:

**Formato → Formato condicional**

Se abrirá un panel en el lado derecho.

### Paso 3. Elegir una fórmula

En el apartado de reglas de formato, seleccioná **La fórmula personalizada es**.

Escribí la siguiente fórmula:

```
=Y(E$3>=$B4;E$3<=$C4)
```

Si tu hoja utiliza nombres de funciones en inglés y comas como separadores, probá con:

```
=AND(E$3>=$B4,E$3<=$C4)
```

### Paso 4. Elegir un color

1. Seleccioná un color de relleno, por ejemplo, azul.
2. Hacé clic en **Listo**.

¡Ya tenés tu primer diagrama de Gantt!

Las celdas correspondientes al período de cada tarea se colorearán automáticamente.

## 5. ¿Cómo funciona la fórmula?

La fórmula comprueba si la fecha de cada columna está comprendida entre el inicio y el fin de una tarea.

Por ejemplo, si una tarea comienza el 4 de noviembre y termina el 7 de noviembre, se colorearán esas cuatro fechas.

| Parte de la fórmula | Significado                                   |
| ------------------- | --------------------------------------------- |
| `E$3`               | Fecha ubicada en el encabezado de la columna. |
| `$B4`               | Fecha de inicio de la tarea.                  |
| `$C4`               | Fecha de finalización de la tarea.            |
| `Y(...)`            | Comprueba que se cumplan ambas condiciones.   |

El símbolo `$` permite mantener fija la fila o columna que corresponde cuando la fórmula se aplica a otras celdas.

## 6. Mejorar la presentación

Para que el diagrama resulte más claro:

1. Aplicá negrita a los encabezados.
2. Agregá un color de fondo a la fila 3.
3. Centrá las fechas.
4. Ajustá el ancho de las columnas.
5. Aplicá bordes a las celdas de la tabla.

## 7. Actividad de práctica

Creá tu propio diagrama de Gantt para un proyecto informático.

Podés elegir entre desarrollar una página web, crear una aplicación móvil, construir un robot o preparar una exposición tecnológica.

Tu diagrama debe incluir:

- Un título.
- Al menos seis tareas.
- Fechas de inicio y finalización.
- Un responsable para cada tarea.
- Una línea de tiempo con fechas.
- Barras de colores generadas automáticamente.

**Prueba final:** modificá la fecha de inicio o finalización de una tarea y comprobá cómo cambia su barra en el diagrama.

## 8. Preguntas de reflexión

Respondé con tus propias palabras:

1. ¿Para qué sirve un diagrama de Gantt?
2. ¿Qué información representa una barra de color?
3. ¿Qué sucede si modificamos la fecha de una tarea?
4. ¿Por qué es útil conocer las tareas que se realizan al mismo tiempo?
5. ¿Cómo puede ayudar esta herramienta a organizar un proyecto informático?

**Resultado esperado:** una hoja de cálculo que permita identificar las tareas del proyecto, sus responsables, sus fechas y su duración de manera visual.
