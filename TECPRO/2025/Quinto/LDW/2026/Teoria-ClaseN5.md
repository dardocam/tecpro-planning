# Introducción a Visual Studio Code para Desarrollo Web

## Objetivos de la clase

Al finalizar esta clase, el estudiante será capaz de:

* Comprender qué es Visual Studio Code.
* Conocer la interfaz principal del entorno.
* Crear un proyecto web básico.
* Utilizar archivos HTML, CSS y JavaScript.
* Instalar extensiones fundamentales para desarrollo web.
* Ejecutar y visualizar páginas web durante el desarrollo.
* Aplicar buenas prácticas de organización de proyectos.

---

# 1. ¿Qué es Visual Studio Code?

[Visual Studio Code](https://code.visualstudio.com?utm_source=chatgpt.com) es un editor de código fuente gratuito desarrollado por [Microsoft](https://www.microsoft.com?utm_source=chatgpt.com).

No es un IDE completo como Eclipse o NetBeans, sino un editor muy ligero que puede ampliarse mediante extensiones para convertirlo en una potente herramienta profesional.

### Características principales

* Gratuito y multiplataforma.
* Compatible con Windows, Linux y MacOS.
* Soporte para cientos de lenguajes.
* Integración con Git.
* Terminal integrada.
* Autocompletado inteligente.
* Depuración de aplicaciones.
* Amplia biblioteca de extensiones.

---

# 2. ¿Por qué utilizar VS Code para Diseño Web?

Actualmente es una de las herramientas más utilizadas por desarrolladores frontend.

Permite trabajar con:

* HTML
* CSS
* JavaScript
* TypeScript
* React
* Angular
* Vue
* Node.js

y prácticamente cualquier tecnología web moderna.

### Ventajas para principiantes

✔ Fácil de instalar.

✔ Interfaz intuitiva.

✔ Ayudas visuales para escribir código.

✔ Detecta errores mientras se escribe.

✔ Gran cantidad de tutoriales disponibles.

---

# 3. Instalación

### Linux Ubuntu

```bash
sudo snap install code --classic
```

### Windows

Descargar desde:

[Sitio Oficial de VS Code](https://code.visualstudio.com/download?utm_source=chatgpt.com)

### Verificación

Abrir una terminal:

```bash
code --version
```

Debería mostrar la versión instalada.

---

# 4. Conociendo la Interfaz

## Barra de Actividades (lado izquierdo)

Contiene los accesos principales:

### Explorador

Permite visualizar carpetas y archivos.

Icono:

📁

### Buscar

Permite buscar texto dentro del proyecto.

Icono:

🔍

### Control de Versiones

Permite trabajar con Git.

Icono:

⑂

### Ejecutar y Depurar

Permite ejecutar programas.

Icono:

▶

### Extensiones

Permite instalar complementos.

Icono:

⬜

---

## Área del Editor

Es la zona central donde escribimos código.

Ejemplo:

```html
<h1>Hola Mundo</h1>
```

Cada archivo se abre en una pestaña.

---

## Panel Inferior

Contiene:

* Terminal
* Problemas
* Salida
* Consola de depuración

---

# 5. Creación del Primer Proyecto Web

Crear una carpeta:

```text
mi-sitio-web
```

Abrirla en VS Code:

```bash
code mi-sitio-web
```

Crear tres archivos:

```text
index.html
style.css
app.js
```

---

# 6. Estructura Básica HTML

Archivo:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Sitio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <h1>Hola Mundo</h1>

    <script src="app.js"></script>

</body>
</html>
```

---

# 7. Uso de CSS

Archivo:

```css
body{
    font-family: Arial;
    background-color: lightblue;
}

h1{
    color: darkblue;
}
```

---

# 8. Uso de JavaScript

Archivo:

```javascript
console.log("Hola desde JavaScript");
```

Abrir:

```text
F12 → Consola
```

y observar el mensaje.

---

# 9. Terminal Integrada

Una de las herramientas más importantes.

Abrir:

```text
Terminal → Nueva Terminal
```

o

```text
Ctrl + Ñ
```

En Linux:

```bash
pwd
ls
mkdir pruebas
```

---

# 10. Extensiones Fundamentales

Las extensiones amplían las capacidades de VS Code.

Abrir:

```text
Ctrl + Shift + X
```

---

## Live Server

Muy recomendada para principiantes.

Permite visualizar cambios automáticamente en el navegador.

Buscar:

```text
Live Server
```

Desarrollada por:

Ritwick Dey

### Uso

Clic derecho sobre:

```text
index.html
```

Luego:

```text
Open with Live Server
```

Se abrirá automáticamente:

```text
http://localhost:5500
```

---

## Prettier

Formatea automáticamente el código.

Buscar:

```text
Prettier
```

### Antes

```html
<h1>hola</h1><p>texto</p>
```

### Después

```html
<h1>hola</h1>
<p>texto</p>
```

---

## Auto Rename Tag

Renombra automáticamente etiquetas HTML.

Ejemplo:

Antes:

```html
<div>
</div>
```

Si cambiamos:

```html
<section>
```

Automáticamente:

```html
</section>
```

---

## HTML CSS Support

Mejora el autocompletado de clases CSS.

---

# 11. Organización Profesional de Archivos

Proyecto pequeño:

```text
proyecto/
│
├── index.html
├── style.css
└── app.js
```

Proyecto profesional:

```text
proyecto/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── img/
│
└── assets/
```

---

# 12. Atajos Más Utilizados

| Acción             | Atajo            |
| ------------------ | ---------------- |
| Guardar            | Ctrl + S         |
| Buscar             | Ctrl + F         |
| Buscar en proyecto | Ctrl + Shift + F |
| Comentario         | Ctrl + K + C     |
| Descomentar        | Ctrl + K + U     |
| Terminal           | Ctrl + Ñ         |
| Paleta de comandos | Ctrl + Shift + P |
| Extensiones        | Ctrl + Shift + X |

---

# 13. Paleta de Comandos

Es el "centro de control" de VS Code.

Abrir:

```text
Ctrl + Shift + P
```

Permite:

* Cambiar tema.
* Abrir configuraciones.
* Ejecutar tareas.
* Formatear documentos.
* Gestionar extensiones.

---

# 14. Ejercicio Práctico

Crear una página personal.

### HTML

```html
<h1>Mi Perfil</h1>
<p>Soy estudiante de desarrollo web.</p>
```

### CSS

```css
body{
    text-align:center;
}
```

### JavaScript

```javascript
alert("Bienvenido");
```

Ejecutar utilizando Live Server.

---

# 15. Buenas Prácticas para Principiantes

### Guardar frecuentemente

```text
Ctrl + S
```

### Mantener carpetas organizadas

Separar:

* HTML
* CSS
* JavaScript
* Imágenes

### Utilizar nombres descriptivos

Correcto:

```text
productos.html
```

Incorrecto:

```text
archivo1.html
```

### Instalar solo extensiones necesarias

Demasiadas extensiones pueden ralentizar el editor.

### Utilizar Prettier

Mantiene el código limpio y profesional.

---

