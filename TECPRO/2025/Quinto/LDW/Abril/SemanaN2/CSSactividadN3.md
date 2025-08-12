## **Actividad Práctica:**

🎯 **Título:** *Galería Interactiva con Efectos Hover y Transiciones*

**Objetivo de Aprendizaje:**

* Comprender cómo usar `:hover` para generar cambios visuales.
* Implementar `transition` para suavizar efectos.
* Aplicar animaciones simples en imágenes y botones.

---

### **1. Descripción de la tarea**

Los estudiantes crearán una **galería de imágenes** con:

* Efectos de **escala y sombra** al pasar el mouse sobre cada imagen.
* Botones con **cambio de color y tamaño suave** al hacer hover.
* Uso de **transiciones** para suavizar cambios de estilo.

---

### **2. Estructura HTML base**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galería Interactiva</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Mi Galería Interactiva</h1>
    <div class="galeria">
        <div class="card">
            <img src="https://via.placeholder.com/200" alt="Imagen 1">
            <button>Ver más</button>
        </div>
        <div class="card">
            <img src="https://via.placeholder.com/200" alt="Imagen 2">
            <button>Ver más</button>
        </div>
        <div class="card">
            <img src="https://via.placeholder.com/200" alt="Imagen 3">
            <button>Ver más</button>
        </div>
    </div>
</body>
</html>
```

---

### **3. Hoja de estilo `style.css`**

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f7f7f7;
    text-align: center;
}

h1 {
    margin-top: 20px;
}

.galeria {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
}

.card {
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.3s ease; /* transición para el efecto hover */
}

.card:hover {
    transform: scale(1.05); /* agrandar suavemente */
    box-shadow: 0 8px 15px rgba(0,0,0,0.2);
}

.card img {
    max-width: 100%;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.card img:hover {
    transform: scale(1.1); /* zoom en la imagen */
}

button {
    margin-top: 10px;
    padding: 10px 15px;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.4s ease, transform 0.3s ease;
}

button:hover {
    background-color: #45a049;
    transform: scale(1.1);
}
```

---

### **4. Instrucciones para los estudiantes**

1. Crear el archivo HTML con la galería y vincular el CSS.
2. Usar `:hover` en `.card` para agrandar y aplicar sombra.
3. Usar `transition` para suavizar:

   * Cambios en `transform`.
   * Cambios en `background-color`.
4. Añadir un efecto de **zoom** sobre la imagen dentro de `.card img:hover`.
5. Hacer que los botones cambien de color y tamaño suavemente al pasar el mouse.

---

### **5. Extensión opcional**

* Usar `@keyframes` para agregar una **animación de entrada** a las tarjetas.
* Aplicar un efecto **fade-in** a las imágenes.
* Cambiar el cursor por un icono personalizado al hacer hover sobre la tarjeta.

---

📌 **Resultado esperado:**
Una galería de tres imágenes donde:

* Las tarjetas se agrandan suavemente y muestran una sombra más fuerte al pasar el mouse.
* Las imágenes hacen un **zoom suave**.
* Los botones cambian de color y tamaño de forma animada.

---
