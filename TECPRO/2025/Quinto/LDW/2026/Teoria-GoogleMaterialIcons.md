Google Material Icons es una biblioteca de más de 900 iconos vectoriales, gratuitos y de código abierto, diseñados para ser usados en cualquier página web. La forma más sencilla de integrarlos es a través de Google Fonts, que te permite añadir iconos a tu HTML con solo unas pocas líneas de código.

A continuación, te presento una guía completa con todas las opciones disponibles.

### 🚀 Configuración Básica

Para empezar, solo necesitas añadir una línea dentro de la etiqueta `<head>` de tu documento HTML.

1.  **Añade el enlace a la fuente**: Incluye este enlace para cargar la fuente de iconos clásica (Material Icons).
    ```html
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    ```
    Este método no requiere descarga ni instalación.

2.  **Usa un icono**: Para mostrar un icono, usa una etiqueta en línea como `<i>` o `<span>` con la clase `material-icons` y escribe el nombre del icono como texto (esto se conoce como ligadura).
    ```html
    <i class="material-icons">cloud</i>
    ```
    El icono `cloud` se renderizará automáticamente.

### 🎨 Personalización y Opciones

Puedes modificar el tamaño, color y otras propiedades de los iconos fácilmente con CSS.

**Tamaño**
Por defecto, los iconos tienen un tamaño de `24px`. Puedes cambiarlo usando la propiedad `font-size`. Los tamaños recomendados son **18px, 24px, 36px y 48px**.

```html
<!-- Ejemplo con estilo en línea -->
<i class="material-icons" style="font-size: 48px;">cloud</i>

<!-- Ejemplo con una clase CSS -->
<style>
  .icon-large { font-size: 36px; }
</style>
<i class="material-icons icon-large">cloud</i>
```

**Color**
El color del icono se hereda de la propiedad `color` de su contenedor o se puede aplicar directamente.

```html
<i class="material-icons" style="color: #FB8C00;">cloud</i>
```

**Otras propiedades**
Al ser una fuente, puedes aplicar cualquier propiedad CSS de texto, como `text-shadow` o `background`, y se reflejará en el icono.

### 🖌️ Estilos de Iconos Disponibles

Google ofrece dos conjuntos de iconos: **Material Icons** (el clásico) y **Material Symbols** (el más moderno y recomendado). Ambos comparten diseños, pero difieren en sus capacidades.

**Material Icons (Clásico)**
Este es el conjunto original. Está disponible en cinco estilos distintos, cada uno con su propia hoja de estilos.

| Estilo | Enlace a Google Fonts | Clase CSS a usar |
| :--- | :--- | :--- |
| **Filled** (Relleno) | `https://fonts.googleapis.com/icon?family=Material+Icons` | `material-icons` |
| **Outlined** (Contorno) | `https://fonts.googleapis.com/icon?family=Material+Icons+Outlined` | `material-icons-outlined` |
| **Rounded** (Redondeado) | `https://fonts.googleapis.com/icon?family=Material+Icons+Round` | `material-icons-round` |
| **Sharp** (Afilado) | `https://fonts.googleapis.com/icon?family=Material+Icons+Sharp` | `material-icons-sharp` |
| **Two-Tone** (Dos Tonos) | `https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone` | `material-icons-two-tone` |

**Cómo usarlos**: Debes cargar la hoja de estilos específica para el estilo que quieras usar y luego aplicar la clase correspondiente.

```html
<!-- En el <head>, carga el estilo Outlined -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined">

<!-- En el <body>, usa la clase material-icons-outlined -->
<i class="material-icons-outlined">favorite</i>
```

**Material Symbols (Moderno)**
Es el conjunto más reciente, con más de 2,500 iconos. Se basa en una **fuente variable**, lo que permite ajustar cuatro ejes de diseño mediante CSS para personalizar cada icono.

| Eje de la Fuente Variable | Valores Permitidos | Descripción |
| :--- | :--- | :--- |
| **`FILL`** | `0` (por defecto) o `1` | Controla si el icono está relleno o no. Permite animar entre estados. |
| **`wght`** (Weight) | `100` a `700` | Define el grosor del trazo del icono. |
| **`GRAD`** (Grade) | Valores numéricos (ej. -25, 200) | Ajusta el grosor de forma más sutil que `wght`. Útil para dar más o menos énfasis. |
| **`opsz`** (Optical Size) | `20` a `48` | Ajusta automáticamente el grosor del trazo según el tamaño del icono para mantener la legibilidad. |

**Cómo usarlos**: Para usar Material Symbols, carga la hoja de estilos con los ejes que necesites y aplica los valores a través de la propiedad CSS `font-variation-settings`.

```html
<!-- En el <head>, carga Material Symbols Outlined con ejes variables -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

<!-- En el <body>, usa la clase material-symbols-outlined y personaliza con CSS -->
<style>
  .icon-custom {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 48;
  }
</style>
<span class="material-symbols-outlined icon-custom">favorite</span>
```
Este ejemplo muestra un icono `favorite` relleno, con un grosor de 600 y un tamaño óptico de 48.

### 🔍 ¿Cómo Encontrar Todos los Iconos?

Google no proporciona una lista estática en un solo archivo, pero sí una herramienta oficial para explorar toda la biblioteca.

**La Biblioteca Oficial de Iconos**
La mejor forma de ver todos los iconos disponibles es visitar la **biblioteca oficial de Google Fonts**:

*   **Material Icons**: [https://fonts.google.com/icons?icon.set=Material+Icons](https://fonts.google.com/icons?icon.set=Material+Icons)
*   **Material Symbols**: [http://fonts.google.com/icons](http://fonts.google.com/icons)

En esta web puedes buscar por nombre, ver una previsualización de cada icono y obtener el código HTML exacto para copiarlo y pegarlo en tu proyecto.

**¿Necesitas un icono específico?**
Si buscas un icono en particular, puedes indicarme su nombre o el concepto que quieres representar y te ayudaré a encontrar el más adecuado.

### 💡 Consejos Adicionales

*   **Self-Hosting**: Si prefieres no depender de los servidores de Google, puedes descargar los archivos de la fuente y alojarlos en tu propio servidor. El repositorio de GitHub contiene todos los archivos necesarios.
*   **Paquetes npm**: Existen paquetes mantenidos por la comunidad, como `material-icons` o `material-symbols`, que pueden facilitar la integración en proyectos con gestores de paquetes.
---

# Descarga Icono en formato SVG
## 💡 Iconos decorativos o cuando no necesitas modificar su estilo con CSS.

Una vez que has descargado un icono en formato SVG desde la biblioteca de Google, tienes varias formas de integrarlo en tu página web. Cada método ofrece diferentes niveles de control y personalización.

Aquí tienes una guía con las opciones disponibles.

### 📥 Métodos para Insertar un SVG Descargado

#### 1. Usando la etiqueta `<img>` (El más sencillo)
Es la forma más directa, tratando el SVG como cualquier otra imagen. Es ideal para iconos decorativos o cuando no necesitas modificar su estilo con CSS.

**Cómo usarlo:**
```html
<img src="ruta/a/tu-icono.svg" alt="Descripción del icono" width="24" height="24">
```
*   **Ventajas**: Muy fácil de implementar y compatible con todos los navegadores.
*   **Limitación**: No puedes aplicar estilos CSS directamente al contenido del SVG (colores, trazos) desde tu hoja de estilos.

#### 2. Usando CSS `background-image` (Para fondos)
Útil si el icono es puramente decorativo o parte de un fondo más complejo.

**Cómo usarlo:**
```css
.icono-fondo {
  background-image: url('ruta/a/tu-icono.svg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
}
```
*   **Ventajas**: Permite reutilizar un mismo archivo para múltiples elementos y es ideal para imágenes decorativas.
*   **Limitación**: Al igual que con `<img>`, no puedes interactuar con el contenido interno del SVG.

#### 3. SVG Inline (La opción más potente y flexible)
Consiste en copiar el código XML del archivo SVG y pegarlo directamente dentro de tu HTML. Este es el método **recomendado** si necesitas personalizar el icono (colores, grosor, animaciones).

**Cómo usarlo:**
Abre tu archivo SVG con un editor de texto, copia todo su contenido y pégalo en tu HTML.
```html
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
  <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q150 0 255 105t105 255q0 150-105 255T480-120Z"/>
</svg>
```
*   **Ventajas**: Control total. Puedes aplicar estilos CSS a cualquier parte del icono, animarlo con CSS o JavaScript, y no requiere una petición HTTP adicional.
*   **Limitación**: Aumenta el tamaño de tu archivo HTML si usas muchos iconos.

#### 4. Usando la etiqueta `<object>` (Para SVG independientes)
Inserta el SVG como un objeto externo, lo que mantiene el archivo separado pero permite una mayor interacción que `<img>`.

**Cómo usarlo:**
```html
<object data="ruta/a/tu-icono.svg" type="image/svg+xml" width="24" height="24"></object>
```
*   **Ventaja**: El SVG se trata como un documento independiente, lo que puede ser útil para ciertas integraciones.

### 🎨 Personalización con CSS (Para SVG Inline)
Cuando usas el método **SVG Inline**, puedes modificar casi cualquier aspecto del icono. La forma más común es cambiar el color del trazo (`stroke`) o del relleno (`fill`).

**Ejemplo: Cambiar color y grosor**
```html
<style>
  .mi-icono-personalizado {
    /* Cambia el color del trazo (borde) del icono */
    stroke: #FB8C00; 
    /* Cambia el grosor del trazo */
    stroke-width: 1.5;
    /* Cambia el color de relleno (si el icono lo tiene) */
    fill: #FFD54F;
  }
</style>

<svg class="mi-icono-personalizado" ...>
  <!-- Contenido del SVG -->
</svg>
```
Para iconos monocromáticos que usan `fill: currentColor`, simplemente cambia la propiedad `color` del elemento padre.

### 💡 Consejos Adicionales
*   **Optimización**: Si usas muchos iconos como SVG Inline, considera crear un **sprite SVG** (un solo archivo con todos los iconos) y referenciarlos con `<use>`. Esto reduce las peticiones HTTP.
*   **Accesibilidad**: Añade siempre un atributo `title` o `aria-label` al SVG para que los lectores de pantalla puedan describir el icono.
*   **Self-Hosting**: Al descargar los SVG, ya estás alojando los archivos en tu propio servidor, lo que te da control total y privacidad.

En resumen, si solo necesitas mostrar el icono, usa `<img>`. Si necesitas personalizarlo a fondo (colores, animaciones), usa **SVG Inline**.