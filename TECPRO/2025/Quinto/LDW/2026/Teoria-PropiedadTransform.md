# La propiedad `transform` en CSS

La propiedad `transform` permite **modificar el espacio de coordenadas de un elemento**: moverlo, rotarlo, escalarlo, inclinarlo o deformarlo, sin que esto afecte al flujo normal del documento (no empuja a otros elementos). Es una de las herramientas más potentes para animaciones y efectos visuales.

---

## 1. Sintaxis básica

```css
.elemento {
    transform: none | <función-transformación>+;
}
```

- **`none`**: valor por defecto, no aplica ninguna transformación.
- **`<función-transformación>`**: una o varias funciones separadas por espacios. Se aplican en el orden indicado (aunque el orden visual es de derecha a izquierda, como veremos).

Ejemplo:
```css
.caja {
    transform: translateX(50px) rotate(45deg) scale(1.2);
}
```

---

## 2. Funciones de transformación

### 2D

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `translate(x, y)` | Mueve el elemento en X e Y. | `translate(20px, 10px)` |
| `translateX(n)` | Mueve solo en X. | `translateX(50px)` |
| `translateY(n)` | Mueve solo en Y. | `translateY(-30px)` |
| `scale(x, y)` | Escala el elemento. | `scale(1.5, 0.8)` |
| `scaleX(n)` / `scaleY(n)` | Escala en un solo eje. | `scaleX(2)` |
| `rotate(ángulo)` | Rota el elemento. | `rotate(45deg)` |
| `skew(ax, ay)` | Inclina el elemento. | `skew(20deg, 10deg)` |
| `skewX(ax)` / `skewY(ay)` | Inclina en un eje. | `skewX(15deg)` |
| `matrix(a, b, c, d, e, f)` | Matriz de transformación 2D. | `matrix(1, 0, 0, 1, 50, 0)` |

### 3D

| Función | Descripción |
|---------|-------------|
| `translate3d(x, y, z)` | Mueve en los tres ejes. |
| `translateZ(z)` | Mueve en el eje Z (profundidad). |
| `scale3d(x, y, z)` | Escala en tres ejes. |
| `scaleZ(z)` | Escala en Z. |
| `rotate3d(x, y, z, ángulo)` | Rota alrededor de un eje vectorial. |
| `rotateX(ángulo)` | Rota alrededor del eje X. |
| `rotateY(ángulo)` | Rota alrededor del eje Y. |
| `rotateZ(ángulo)` | Rota alrededor del eje Z (igual que `rotate`). |
| `perspective(n)` | Aplica perspectiva a la transformación. |
| `matrix3d(...)` | Matriz 4x4 para transformaciones 3D complejas. |

> **Nota:** Los ángulos pueden expresarse en `deg`, `rad`, `grad` o `turn`. Las distancias en `px`, `%`, `em`, etc.

---

## 3. Orden de las funciones (muy importante)

El orden en que escribes las funciones **afecta el resultado**. Las transformaciones se aplican de **derecha a izquierda** (la última función es la primera que se aplica al elemento).

Ejemplo:
```css
transform: translate(100px) rotate(45deg);
```
Primero se rota el elemento 45° y luego se traslada 100px en el eje X original.  
En cambio:
```css
transform: rotate(45deg) translate(100px);
```
Primero se traslada 100px en X y luego se rota todo 45°, por lo que el desplazamiento se ve en diagonal.

---

## 4. Propiedades relacionadas con `transform`

Además de `transform`, existen otras propiedades que controlan cómo se aplican las transformaciones:

| Propiedad | Valores | Descripción |
|-----------|---------|-------------|
| `transform-origin` | `x y z` (ej. `50% 50% 0`) | Punto de origen para las transformaciones. Por defecto es el centro del elemento. |
| `transform-style` | `flat` \| `preserve-3d` | Define si los hijos conservan su posición 3D. |
| `perspective` | `none` \| `length` | Aplica perspectiva a los hijos de un elemento (se coloca en el contenedor). |
| `perspective-origin` | `x y` | Punto de fuga para la perspectiva. |
| `backface-visibility` | `visible` \| `hidden` | Oculta la cara posterior de un elemento rotado en 3D. |

Ejemplo de tarjeta 3D:
```css
.contenedor {
    perspective: 1000px;
}
.tarjeta {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}
.tarjeta:hover {
    transform: rotateY(180deg);
}
.cara {
    backface-visibility: hidden;
}
```

---

## 5. Propiedades individuales: `translate`, `rotate`, `scale`

CSS moderno permite aplicar estas transformaciones como propiedades independientes:

```css
.elemento {
    translate: 50px 20px;
    rotate: 45deg;
    scale: 1.2;
}
```

Ventajas:
- Se pueden animar por separado.
- El orden de aplicación es fijo: primero `translate`, luego `rotate`, luego `scale`, y finalmente `transform`.
- No reemplazan a `transform`, pero son más legibles.

---

## 6. Ejemplo práctico completo

```css
.boton {
    padding: 16px 40px;
    background: #6c5ce7;
    color: white;
    border: none;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.boton:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

.boton:active {
    transform: translateY(0) scale(0.98);
}
```

---

## 7. Buenas prácticas y rendimiento

- **Usa `transform` en lugar de `top`, `left`, `width` o `height`** para animaciones. `transform` no provoca *reflow* (recálculo de layout) y se acelera por GPU.
- **`will-change: transform;`** puede mejorar el rendimiento, pero úsalo con moderación.
- **Respeta las preferencias del usuario**:
  ```css
  @media (prefers-reduced-motion: reduce) {
      .elemento {
          transition: none;
          transform: none;
      }
  }
  ```
- **Cuidado con el contexto de apilamiento**: `transform` crea un nuevo contexto de apilamiento, lo que puede afectar a `z-index`.
- **No abuses de las transformaciones 3D** si no son necesarias; pueden consumir más recursos.

---

## Resumen

- `transform` modifica la forma, posición y orientación de un elemento sin alterar el layout.
- Se compone de funciones 2D y 3D que se aplican en orden (de derecha a izquierda).
- Propiedades asociadas: `transform-origin`, `transform-style`, `perspective`, `backface-visibility`.
- Existen propiedades individuales: `translate`, `rotate`, `scale`.
- Es ideal para animaciones fluidas y eficientes.
---
# EJEMPLO

# 🎴 Tarjeta 3D con volteo (Flip Card)

Aquí tienes el ejemplo completo y funcional. El CSS que diste estaba incompleto, así que lo he completado con lo necesario para que funcione correctamente.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarjeta 3D con Volteo</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            font-family: 'Segoe UI', sans-serif;
        }

        /* Contenedor con perspectiva: da profundidad 3D */
        .contenedor {
            width: 300px;
            height: 400px;
            perspective: 1000px; /* Distancia del observador a la escena 3D */
        }

        /* Tarjeta que gira */
        .tarjeta {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d; /* Mantiene a los hijos en 3D */
            transition: transform 0.6s ease; /* Animación del giro */
            cursor: pointer;
        }

        /* Al pasar el mouse, gira 180° sobre el eje Y */
        .tarjeta:hover {
            transform: rotateY(180deg);
        }

        /* Caras frontal y trasera */
        .cara {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 15px;
            backface-visibility: hidden; /* Oculta la cara que mira hacia atrás */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            padding: 20px;
            box-sizing: border-box;
            text-align: center;
        }

        /* Cara frontal */
        .frontal {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #fff;
        }

        .frontal h2 {
            font-size: 28px;
            margin-bottom: 10px;
        }

        .frontal p {
            font-size: 15px;
            opacity: 0.85;
        }

        /* Cara trasera: empieza ya girada 180° */
        .trasera {
            background: linear-gradient(135deg, #f093fb, #f5576c);
            color: #fff;
            transform: rotateY(180deg);
        }

        .trasera h2 {
            font-size: 26px;
            margin-bottom: 15px;
        }

        .trasera p {
            font-size: 15px;
            line-height: 1.5;
        }

        .emoji {
            font-size: 60px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="contenedor">
        <div class="tarjeta">
            <!-- Cara frontal -->
            <div class="cara frontal">
                <div class="emoji">🎨</div>
                <h2>CSS 3D</h2>
                <p>Pasa el mouse para ver el otro lado</p>
            </div>

            <!-- Cara trasera -->
            <div class="cara trasera">
                <div class="emoji">✨</div>
                <h2>¡Magia!</h2>
                <p>El efecto se logra con <strong>perspective</strong>, <strong>transform-style: preserve-3d</strong> y <strong>backface-visibility: hidden</strong>.</p>
            </div>
        </div>
    </div>
</body>
</html>
```

---

## 🔍 Explicación de cada propiedad clave

### 🧭 `perspective: 1000px` (en el contenedor)
Define **qué tan lejos está el espectador** de la escena. Cuanto menor sea el valor, más exagerado será el efecto 3D.
- `500px` → efecto muy marcado
- `1000px` → efecto moderado (ideal)
- `2000px` → efecto sutil

### 🏗️ `transform-style: preserve-3d` (en la tarjeta)
Sin esta propiedad, los hijos se "aplanan" y el efecto 3D no funciona. Le dice al navegador que **mantenga la posición 3D** de los elementos hijos.

### 🔄 `transition: transform 0.6s ease`
Suaviza el giro durante 600 ms con una curva de velocidad `ease`.

### 🎭 `backface-visibility: hidden` (en las caras)
Oculta la cara que está mirando **hacia atrás**. Sin esto, verías el texto de la cara frontal reflejado al girar.

### 🪞 `transform: rotateY(180deg)` (en la cara trasera)
Coloca la cara trasera ya girada 180°, para que al voltear la tarjeta aparezca correctamente.

---

## 🎯 Cómo funciona paso a paso

1. **Estado inicial**: La cara frontal está visible (0°) y la trasera está oculta (girada 180° + `backface-visibility: hidden`).
2. **Al hacer hover**: La `.tarjeta` gira 180° con `transition`, arrastrando consigo ambas caras.
3. **Resultado**: La frontal ahora mira hacia atrás (oculta) y la trasera queda visible.

---

## 💡 Variantes que puedes probar

**Volteo vertical** (rotar en X):
```css
.tarjeta:hover {
    transform: rotateX(180deg);
}
.trasera {
    transform: rotateX(180deg);
}
```

**Volteo con escala** (más dramático):
```css
.tarjeta:hover {
    transform: rotateY(180deg) scale(1.05);
}
```

**Hacer el flip con clic en vez de hover** (requiere JavaScript):
```html
<div class="tarjeta" onclick="this.classList.toggle('girada')">
```
```css
.tarjeta.girada {
    transform: rotateY(180deg);
}
```
