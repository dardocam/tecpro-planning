
### **Actividad: Estilizando tu primera tarjeta de perfil**
**Objetivo:** Crear una tarjeta de perfil simple usando HTML y CSS.

---

#### **Paso 1: Estructura HTML Básica**
Crea un archivo HTML con este contenido:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Tarjeta de Perfil</title>
    <style>
        /* ¡Aquí escribiremos nuestro CSS! */
    </style>
</head>
<body>
    <div class="tarjeta">
        <h1>Hola, soy Ana</h1>
        <p>Desarrolladora web en formación</p>
        <ul>
            <li>📍 Necochea, Argentina</li>
            <li>💻 Aprendiendo HTML/CSS</li>
            <li>🎨 Amante del diseño</li>
        </ul>
    </div>
</body>
</html>
```

---

#### **Paso 2: Conceptos Básicos de CSS**
1. **Selectores:**  
   - `div`: Selecciona TODAS las etiquetas `<div>`.
   - `.tarjeta`: Selecciona elementos con la clase "tarjeta".
   - `h1`: Selecciona TODOS los encabezados `<h1>`.

2. **Propiedades comunes:**
   - `color`: Color del texto.
   - `background-color`: Color de fondo.
   - `padding`/`margin`: Espaciado interno/externo.
   - `border`: Borde del elemento.
   - `font-family`: Tipo de letra.

---

#### **Paso 3: Añade Estilos Básicos**
Dentro de `<style>`, añade:
```css
.tarjeta {
    width: 300px;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin: 50px auto; /* Centra la tarjeta */
}

h1 {
    color: #2c3e50;
    font-family: Arial, sans-serif;
    margin-bottom: 10px;
}

p {
    color: #e74c3c;
    font-style: italic;
}

ul {
    list-style: none;
    padding-left: 0;
}

li {
    margin: 8px 0;
    color: #34495e;
}
```

---

#### **Paso 4: Experimenta con el Modelo de Caja**
- **Prueba estos cambios:**
  ```css
  .tarjeta {
      border: 2px solid #3498db;
      padding: 30px; /* Más espacio interno */
      margin: 20px auto; /* Menos margen exterior */
  }
  ```

---

#### **Paso 5: ¡Personaliza!**
1. Cambia los colores (usa [colores HEX](https://htmlcolorcodes.com/)).
2. Modifica el `box-shadow` para hacer la sombra más pronunciada.
3. Añade un efecto hover:
   ```css
   .tarjeta:hover {
       transform: scale(1.02);
       transition: 0.3s;
   }
   ```

---

#### **Desafíos Adicionales:**
1. Centra el texto del `<h1>`.
2. Cambia el estilo de los puntos de la lista (usa `list-style-type: square`).
3. Añade una clase `.destacado` a un elemento y dale un color diferente.

---

### **Recursos Útiles:**
- [W3Schools CSS Tutorial](https://www.w3schools.com/css/)
