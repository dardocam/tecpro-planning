
# Clase N5 — HTML5 Semántico 

## Objetivos de la clase

Al finalizar la clase, los estudiantes podrán:

* Comprender etiquetas semánticas.
* Organizar correctamente una web.
* Crear formularios básicos.
* Utilizar entradas de datos modernas de HTML5.

---

# 1. ¿Qué es HTML semántico?

HTML5 incorporó etiquetas con significado.

Antes se usaba:

```html
<div>
```

Ahora existen etiquetas específicas.

Beneficios:

* mejor organización,
* accesibilidad,
* SEO,
* mantenimiento.

---

# 2. Etiquetas semánticas principales

## `<header>`

Encabezado del sitio.

```html
<header>
    <h1>Mi Sitio Web</h1>
</header>
```

---

## `<nav>`

Menú de navegación.

```html
<nav>
    <a href="#">Inicio</a>
    <a href="#">Productos</a>
    <a href="#">Contacto</a>
</nav>
```

---

## `<main>`

Contenido principal.

```html
<main>
    <p>Contenido importante</p>
</main>
```

---

## `<section>`

Secciones temáticas.

```html
<section>
    <h2>Noticias</h2>
</section>
```

---

## `<article>`

Contenido independiente.

```html
<article>
    <h2>Artículo</h2>
    <p>Contenido...</p>
</article>
```

---

## `<aside>`

Contenido secundario.

```html
<aside>
    Publicidad o enlaces
</aside>
```

---

## `<footer>`

Pie de página.

```html
<footer>
    © 2026 Mi Sitio
</footer>
```

---

# 3. Estructura moderna HTML5

```html
<body>

    <header>
        <h1>Tienda Online</h1>
    </header>

    <nav>
        <a href="#">Inicio</a>
        <a href="#">Productos</a>
        <a href="#">Contacto</a>
    </nav>

    <main>

        <section>
            <h2>Productos destacados</h2>

            <article>
                <h3>Notebook</h3>
                <p>Excelente rendimiento.</p>
            </article>

        </section>

    </main>

    <footer>
        © Todos los derechos reservados
    </footer>

</body>
```

---
