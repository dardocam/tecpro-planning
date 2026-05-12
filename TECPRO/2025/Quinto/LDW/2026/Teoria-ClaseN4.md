# Clase N4 — Introducción a HTML5 y estructura básica de una página web

## Objetivos de la clase

Al finalizar la clase, los estudiantes podrán:

* Comprender qué es HTML5.
* Identificar la estructura básica de una página web.
* Crear una página simple utilizando etiquetas fundamentales.
* Comprender el concepto de etiquetas, atributos y elementos.

---

# 1. ¿Qué es HTML5?

HTML significa:

> **HyperText Markup Language**
> Lenguaje de Marcado de Hipertexto.

HTML5 es la versión moderna utilizada para crear la estructura de sitios web.

HTML:

* NO es un lenguaje de programación.
* Es un lenguaje de marcado.
* Organiza el contenido de una página.

---

# 2. ¿Cómo funciona una página web?

Cuando ingresamos a una web:

1. El navegador recibe archivos.
2. HTML organiza el contenido.
3. CSS aplica estilos.
4. JavaScript agrega interactividad.

---

# 3. Estructura básica de HTML5

## Explicación general

Toda página HTML5 tiene:

* Declaración del documento.
* Encabezado.
* Cuerpo visible.

---

## Primer ejemplo completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Primera Página</title>
</head>
<body>

    <h1>Hola Mundo</h1>
    <p>Esta es mi primera página web.</p>

</body>
</html>
```

---

# 4. Explicación línea por línea

## `<!DOCTYPE html>`

Indica que el documento utiliza HTML5.

---

## `<html>`

Contiene todo el contenido de la página.

```html
<html lang="es">
```

El atributo `lang="es"` indica idioma español.

---

## `<head>`

Contiene información para el navegador.

Ejemplos:

* título
* codificación
* configuración

---

## `<meta charset="UTF-8">`

Permite usar:

* tildes
* ñ
* caracteres especiales

---

## `<title>`

Texto que aparece en la pestaña del navegador.

---

## `<body>`

Contiene todo lo visible.

---

# 5. Etiquetas básicas

## Encabezados

```html
<h1>Título principal</h1>
<h2>Subtítulo</h2>
<h3>Otro subtítulo</h3>
```

### Explicación

* `h1` → título más importante
* `h6` → menos importante

---

## Párrafos

```html
<p>Este es un párrafo.</p>
```

---

## Saltos de línea

```html
<br>
```

---

## Línea horizontal

```html
<hr>
```

---

# 6. Listas

## Lista desordenada

```html
<ul>
    <li>Pan</li>
    <li>Leche</li>
    <li>Azúcar</li>
</ul>
```

---

## Lista ordenada

```html
<ol>
    <li>Abrir VSCode</li>
    <li>Crear archivo HTML</li>
    <li>Ejecutar</li>
</ol>
```

---

# 7. Imágenes

```html
<img src="imagen.jpg" alt="Descripción">
```

## Explicación

* `src` → ubicación de imagen
* `alt` → descripción alternativa

---

# 8. Enlaces

```html
<a href="https://www.google.com">
    Ir a Google
</a>
```

---

# 9. Actividad práctica guiada

## Crear una página personal

Los estudiantes deben crear:

* Un título principal.
* Una breve descripción personal.
* Una lista de hobbies.
* Una imagen.
* Un enlace a una red social.

---

## Modelo esperado

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Perfil</title>
</head>
<body>

    <h1>Juan Pérez</h1>

    <p>Me gusta la programación y el diseño web.</p>

    <h2>Hobbies</h2>

    <ul>
        <li>Videojuegos</li>
        <li>Música</li>
        <li>Programar</li>
    </ul>

    <img src="foto.jpg" alt="Mi foto" width="300">

    <br><br>

    <a href="https://instagram.com">
        Mi Instagram
    </a>

</body>
</html>
```

---
