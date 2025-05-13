## TPN2 Layout HTML CSS

Esta actividad propone crear una página web estática que incluya **cabecera**, **barra de navegación**, **contenido principal**, **barra lateral** y **pie de página**, empleando **HTML semántico** y **CSS externo** para practicar la estructura de documentos y las técnicas de maquetación más habituales (Flexbox o Grid). El ejercicio fomenta además la **organización de archivos**, el uso de **selectores CSS**, la **resposividad básica** y la correcta separación de contenido, presentación y comportamiento. 

## Objetivos

1. Diseñar la **estructura semántica** de una página web usando etiquetas HTML5 (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) 
2. Aplicar un **CSS externo** para dar estilo y disposición (layout) a los distintos bloques de contenido 
3. Utilizar **Flexbox** o **Grid** para alinear y distribuir los elementos principales en la página 
4. Organizar los archivos en carpetas (`css/`, `img/`, `index.html`) y enlazar correctamente los recursos
5. Introducir **media queries** básicas para asegurar una presentación aceptable en pantallas estrechas (mínimo 320 px) 

## Requisitos técnicos

* El archivo **`index.html`** debe incluir un encabezado con título y enlace a hoja de estilos externa 
* La hoja **`style.css`** debe definir al menos:

  * Layout principal con **display: flex** o **display: grid** en `<body>` o un contenedor principal.
  * Estilos para la **navegación horizontal** (`<nav> ul { display: flex; gap: 1em; }`).
  * Ancho relativo de `<main>` y `<aside>` (por ejemplo, `flex: 3` y `flex: 1`) para crear una **barre lateral** informativa.
  * Pie de página centrado y fijo en la parte inferior de la ventana o inmediatamente tras el contenido .
* Incluir al menos **una imagen** en la barra lateral (`<aside>`) y una lista de enlaces en la navegación .
* Añadir **media query** que convierta la navegación en columna vertical y apile `<main>` y `<aside>` en móviles (≤ 600 px) .

## Entregables

1. **Carpeta comprimida** (`.zip`) con:

   * `index.html`
   * `css/style.css`
   * Carpeta `img/` con la imagen utilizada
2. **Captura de pantalla** mostrando la vista de escritorio y la de móvil (simulada o real) 
3. **Documento PDF** (opcional) con breve descripción de la estructura y los desafios encontrados 

## Criterios de evaluación

| Aspecto                   | Puntuación | Comentarios                                                                                          |
| ------------------------- | ---------: | ---------------------------------------------------------------------------------------------------- |
| Uso de HTML semántico     |       30 % | Correcta elección de etiquetas `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`  |
| Organización de archivos  |       10 % | Carpeta `css/`, `img/` y enlazado adecuado                                                           |
| Implementación del layout |       30 % | Uso efectivo de Flexbox o Grid para distribuir secciones     |
| Estilos y diseño visual   |       20 % | Espaciados, tipografía legible, coherencia de colores                            |
| Responsividad básica      |       10 % | Media queries funcionales para vista móvil y escritorio                           |

---
