## **Actividad Práctica:**

🎯 **Título:** *Diseñando un Portafolio Responsivo con Flexbox y Grid*

**Objetivo de Aprendizaje:**

* Usar **Flexbox** para crear cabeceras y secciones alineadas.
* Usar **CSS Grid** para organizar tarjetas de proyectos.
* Adaptar el diseño a **pantallas grandes, medianas y pequeñas** con media queries.

---

### **1. Descripción de la tarea**

Los estudiantes crearán una página web de **portafolio** con:

1. **Encabezado** con logo y menú (usando Flexbox).
2. **Sección de presentación** con imagen y texto (usando Flexbox).
3. **Galería de proyectos** en forma de grilla (usando CSS Grid).
4. **Diseño responsivo** que se adapte a celulares, tablets y escritorio.

---

### **2. Estructura HTML base**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portafolio Responsivo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="logo">Mi Logo</div>
        <nav class="menu">
            <a href="#">Inicio</a>
            <a href="#">Proyectos</a>
            <a href="#">Contacto</a>
        </nav>
    </header>

    <!-- Sección presentación -->
    <section class="presentacion">
        <div class="texto">
            <h1>Hola, soy Juan</h1>
            <p>Desarrollador web apasionado por el diseño limpio y funcional.</p>
        </div>
        <div class="imagen">
            <img src="https://via.placeholder.com/300" alt="Foto de presentación">
        </div>
    </section>

    <!-- Galería de proyectos -->
    <section class="galeria">
        <div class="proyecto">Proyecto 1</div>
        <div class="proyecto">Proyecto 2</div>
        <div class="proyecto">Proyecto 3</div>
        <div class="proyecto">Proyecto 4</div>
        <div class="proyecto">Proyecto 5</div>
        <div class="proyecto">Proyecto 6</div>
    </section>
</body>
</html>
```

---

### **3. Hoja de estilo `style.css`**

```css
body {
    margin: 0;
    font-family: Arial, sans-serif;
}

/* ===== HEADER con FLEXBOX ===== */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #333;
    color: white;
}

.menu a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
}

/* ===== SECCIÓN PRESENTACIÓN con FLEXBOX ===== */
.presentacion {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 30px;
    background-color: #f0f0f0;
}

.presentacion img {
    max-width: 100%;
    border-radius: 10px;
}

/* ===== GALERÍA con CSS GRID ===== */
.galeria {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 30px;
}

.proyecto {
    background-color: #ddd;
    padding: 40px;
    text-align: center;
    border-radius: 8px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
    .presentacion {
        flex-direction: column;
    }

    .galeria {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .galeria {
        grid-template-columns: 1fr;
    }
}
```

---

### **4. Instrucciones paso a paso para estudiantes**

1. Crear el archivo HTML con la estructura dada.
2. Implementar **Flexbox** en:

   * `.header` para distribuir logo y menú.
   * `.presentacion` para alinear texto e imagen.
3. Implementar **Grid** en:

   * `.galeria` para organizar las tarjetas de proyectos.
4. Usar **media queries** para:

   * Cambiar de 3 columnas a 2 en pantallas medianas.
   * Cambiar a 1 columna en móviles.
5. Probar la página en distintos anchos de ventana y en el inspector del navegador.

---

### **5. Extensión opcional**

* Agregar animaciones `hover` a los proyectos.
* Usar `minmax()` y `auto-fit` en Grid para mayor flexibilidad.
* Convertir el menú en un **menú hamburguesa** en móviles.

---

📌 **Resultado esperado:**
Una página **responsiva y moderna**, que permita a los estudiantes experimentar la diferencia entre **Flexbox y Grid**, y ver cómo se complementan para lograr un layout adaptable.

---

