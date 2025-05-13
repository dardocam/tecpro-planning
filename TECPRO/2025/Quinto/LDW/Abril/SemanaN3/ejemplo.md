Aquí tienes un ejemplo sencillo de un layout básico en HTML y CSS que incluye cabecera, navegación, contenido principal, barra lateral y pie de página, implementado con Flexbox y con una media query para móvil.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Layout Básico</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header>
    <h1>Mi Sitio Web</h1>
  </header>

  <nav>
    <ul>
      <li><a href="#">Inicio</a></li>
      <li><a href="#">Servicios</a></li>
      <li><a href="#">Portfolio</a></li>
      <li><a href="#">Contacto</a></li>
    </ul>
  </nav>

  <div class="container">
    <main>
      <h2>Contenido Principal</h2>
      <p>Este es el área principal donde va el contenido más importante de la página.</p>
    </main>

    <aside>
      <h3>Barra Lateral</h3>
      <img src="img/ejemplo.jpg" alt="Ejemplo" />
      <p>Enlaces o información adicional.</p>
    </aside>
  </div>

  <footer>
    <p>© 2025 Mi Sitio Web. Todos los derechos reservados.</p>
  </footer>
</body>
</html>
```

```css
/* css/style.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

header {
  background: #336699;
  color: white;
  padding: 1rem;
  text-align: center;
}

nav {
  background: #f4f4f4;
}

nav ul {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0.5rem;
}

nav ul li + li {
  margin-left: 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
}

.container {
  display: flex;
  flex: 1;
  padding: 1rem;
  gap: 1rem;
}

main {
  flex: 3;
  background: #eaeaea;
  padding: 1rem;
}

aside {
  flex: 1;
  background: #ddd;
  padding: 1rem;
}

aside img {
  max-width: 100%;
  height: auto;
  display: block;
  margin-bottom: 0.5rem;
}

footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 0.75rem;
}

/* Media query para pantallas pequeñas */
@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
    align-items: center;
  }
  .container {
    flex-direction: column;
  }
  main, aside {
    width: 100%;
  }
}
```

**Descripción breve del layout:**

* **Header**: barra superior de color con título centrado.
* **Nav**: menú horizontal que se convierte en vertical en móvil.
* **Container**: contenedor flex que aloja `<main>` (3 partes) y `<aside>` (1 parte).
* **Footer**: pie de página siempre al final.
* **Responsividad**: a partir de 600 px de ancho, el menú pasa a columna y los bloques de contenido se apilan.

