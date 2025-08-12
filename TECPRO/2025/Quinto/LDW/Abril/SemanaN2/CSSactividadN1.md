## **Actividad Práctica:**

🎯 **Título:** *Diseñando una “Tarjeta de Perfil” con Selectores y Box Model*

**Objetivo de Aprendizaje:**

* Aplicar distintos tipos de **selectores CSS** (elemento, clase, ID, descendente, pseudo-clases).
* Comprender y manipular el **box model** (margen, borde, padding, contenido).

---

### **1. Descripción de la tarea**

Los estudiantes crearán una tarjeta de perfil personal que incluya:

* Una imagen de usuario.
* Nombre y ocupación.
* Breve descripción.
* Botón de contacto.

Deberán dar formato usando **CSS3** sin frameworks externos, aplicando al menos:

* **5 tipos diferentes de selectores**.
* Ajustes de **margen, padding, border y border-radius**.

---

### **2. Estructura HTML base**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarjeta de Perfil</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="perfil">
        <img src="https://via.placeholder.com/150" alt="Foto de perfil" class="avatar">
        <h2 class="nombre">Juan Pérez</h2>
        <p class="ocupacion">Desarrollador Web</p>
        <p class="descripcion">Apasionado por el diseño web y la programación. Me encanta aprender nuevas tecnologías.</p>
        <a href="#" class="boton-contacto">Contactar</a>
    </div>
</body>
</html>
```

---

### **3. Hoja de estilo `style.css`**

```css
/* Selector de elemento */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

/* Selector de ID */
#perfil {
    width: 300px;
    margin: 50px auto;
    background-color: white;
    border: 2px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}

/* Selector de clase */
.avatar {
    width: 150px;
    border-radius: 50%;
    border: 3px solid #4CAF50;
}

/* Selector descendente */
#perfil p {
    color: #555;
    font-size: 14px;
}

/* Pseudo-clase */
.boton-contacto:hover {
    background-color: #45a049;
}

/* Estilo del botón */
.boton-contacto {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 15px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
```

---

### **4. Instrucciones paso a paso para los estudiantes**

1. **Crear el archivo HTML** con la estructura dada.
2. **Crear la hoja CSS** y vincularla al HTML.
3. Aplicar:

   * Selector de **elemento** (`body`).
   * Selector de **ID** (`#perfil`).
   * Selector de **clase** (`.avatar`, `.boton-contacto`).
   * Selector **descendente** (`#perfil p`).
   * **Pseudo-clase** (`:hover` en el botón).
4. Usar propiedades del **box model**:

   * **margin**: centrar la tarjeta.
   * **padding**: dar espacio interno.
   * **border**: definir contornos.
   * **border-radius**: bordes redondeados.
5. Probar diferentes valores para observar cambios visuales.

---

### **5. Extensión para estudiantes avanzados**

* Añadir un **selector de atributo** para personalizar enlaces (`a[href^="#"]`).
* Usar `box-shadow` para dar profundidad a la tarjeta.
* Cambiar colores con transiciones (`transition`).

---

💡 **Resultado esperado:** Una tarjeta visualmente atractiva que permita al estudiante **ver en acción** los selectores CSS y entender cómo el **box model** influye en la distribución y estilo de los elementos.

---

