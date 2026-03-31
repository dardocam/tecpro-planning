📚 **Clase Práctica – Diseño Web Responsivo con Flexbox y Grid**

🎯 **Título:** Diseñando un Portafolio Responsivo con Flexbox y Grid

---

### 🎯 **Objetivo de Aprendizaje**

En esta actividad vas a aprender a:

✅ Usar **Flexbox** para crear cabeceras y secciones alineadas
✅ Usar **CSS Grid** para organizar contenido en forma de grilla
✅ Adaptar diseños a distintos dispositivos con **media queries**

---

### 🧩 **1. Descripción de la Actividad**

Vas a desarrollar una **página web de portafolio personal** que incluya:

* 🔹 Encabezado con logo y menú (Flexbox)
* 🔹 Sección de presentación con imagen y texto (Flexbox)
* 🔹 Galería de proyectos en formato grilla (Grid)
* 🔹 Diseño adaptable a **celular, tablet y PC**

---

### 🧱 **2. Estructura HTML Base**

Copiá y pegá el siguiente código en un archivo `index.html`:

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

### 🎨 **3. Hoja de Estilos (style.css)**

Creá un archivo `style.css` y pegá:

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

### 🛠️ **4. Instrucciones Paso a Paso**

1. 📁 Crear los archivos `index.html` y `style.css`

2. 🧩 Aplicar **Flexbox** en:

   * `.header` → logo + menú
   * `.presentacion` → texto + imagen

3. 🧱 Aplicar **Grid** en:

   * `.galeria` → organización de proyectos

4. 📱 Implementar **media queries**:

   * 3 columnas → PC
   * 2 columnas → tablet
   * 1 columna → celular

5. 🔍 Probar el diseño:

   * Cambiando el tamaño de la ventana
   * Usando el **inspector del navegador (F12)**

---

### 🚀 **5. Extensión Opcional (Nivel Pro)**

Si querés ir más allá:

✨ Agregar efectos `hover` a los proyectos
✨ Usar `minmax()` y `auto-fit` en Grid
✨ Crear un menú hamburguesa para móviles

---

### ✅ **Resultado Esperado**

Una web moderna, adaptable y funcional donde puedas ver claramente:

🔹 Cómo funciona **Flexbox** (alineación)
🔹 Cómo funciona **Grid** (estructura)
🔹 Cómo ambos se combinan para lograr **diseños responsivos reales**

---

💡 **Tip:** Este proyecto puede convertirse en tu primer portafolio real. ¡Personalizalo con tus datos!

