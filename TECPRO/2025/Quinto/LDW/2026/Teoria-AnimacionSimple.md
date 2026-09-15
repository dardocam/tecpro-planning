# Botón con Transition y Transform

Aquí tienes un ejemplo completo de un botón que utiliza `transition` y `transform` para crear efectos visuales atractivos al pasar el mouse:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Botón con Transition y Transform</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            font-family: Arial, sans-serif;
        }

        .boton {
            padding: 16px 40px;
            font-size: 18px;
            font-weight: bold;
            color: #fff;
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            border: none;
            border-radius: 50px;
            cursor: pointer;
            letter-spacing: 1px;
            box-shadow: 0 8px 20px rgba(238, 90, 36, 0.4);
            
            /* Transición: qué propiedades animar y duración */
            transition: 
                transform 0.3s ease,
                box-shadow 0.3s ease,
                background 0.3s ease;
        }

        /* Efecto al pasar el mouse */
        .boton:hover {
            /* Transform: escala y eleva el botón */
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 15px 30px rgba(238, 90, 36, 0.6);
            background: linear-gradient(135deg, #ee5a24, #ff6b6b);
        }

        /* Efecto al hacer clic */
        .boton:active {
            /* Vuelve a su posición original */
            transform: translateY(2px) scale(0.98);
            box-shadow: 0 4px 10px rgba(238, 90, 36, 0.4);
        }
    </style>
</head>
<body>
    <button class="boton">¡Haz clic aquí!</button>
</body>
</html>
```

## 📌 Explicación de las propiedades clave

### `transition`
Controla **cómo** cambian las propiedades de forma suave:
```css
transition: transform 0.3s ease, box-shadow 0.3s ease;
```
- **`transform`** → propiedad a animar
- **`0.3s`** → duración de la animación
- **`ease`** → curva de velocidad (también puedes usar `linear`, `ease-in-out`, etc.)

### `transform`
Modifica el elemento visualmente sin afectar el flujo del documento:
- **`translateY(-4px)`** → mueve el botón hacia arriba
- **`scale(1.05)`** → lo agranda un 5%
- **`rotate(5deg)`** → lo rota (opcional)

## 🎨 Variaciones que puedes probar

**Rotación al hover:**
```css
.boton:hover {
    transform: rotate(-3deg) scale(1.1);
}
```

**Deslizamiento lateral:**
```css
.boton:hover {
    transform: translateX(10px);
}
```

**Efecto 3D:**
```css
.boton:hover {
    transform: perspective(500px) rotateX(15deg);
}
```

## 💡 Consejos
1. Usa `transform` en lugar de `top`/`left` para mejor rendimiento (se ejecuta en la GPU).
2. Siempre especifica la propiedad en `transition` para evitar animaciones no deseadas.
3. Combina `transform` + `box-shadow` para efectos realistas de elevación.

---
# OPCIONES AVANZADAS
---
# 🎨 Tres efectos avanzados para botones

Te muestro los tres efectos que te ofrecí, cada uno con su código completo y listo para usar.

---

## 1️⃣ Botón con efecto de onda (Ripple)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Botón Ripple</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #1a1a2e;
        }

        .boton-ripple {
            position: relative;
            padding: 16px 40px;
            font-size: 18px;
            font-weight: bold;
            color: #fff;
            background: #6c5ce7;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .boton-ripple:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(108, 92, 231, 0.5);
        }

        /* Círculo que se expande */
        .boton-ripple::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
        }

        .boton-ripple:active::after {
            width: 300px;
            height: 300px;
        }
    </style>
</head>
<body>
    <button class="boton-ripple">¡Haz clic!</button>
</body>
</html>
```

**Cómo funciona:** El pseudoelemento `::after` crea un círculo invisible que, al hacer clic (`:active`), se expande desde el centro usando `transition` en `width` y `height`.

---

## 2️⃣ Botón con borde animado

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Botón Borde Animado</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #0f0f0f;
        }

        .boton-borde {
            position: relative;
            padding: 18px 45px;
            font-size: 18px;
            font-weight: bold;
            color: #00f5d4;
            background: transparent;
            border: 2px solid transparent;
            border-radius: 10px;
            cursor: pointer;
            letter-spacing: 2px;
            transition: color 0.4s ease, transform 0.3s ease;
        }

        /* Borde con gradiente giratorio */
        .boton-borde::before {
            content: '';
            position: absolute;
            inset: -2px;
            background: conic-gradient(
                from 0deg,
                #00f5d4,
                #00bbf9,
                #f15bb5,
                #fee440,
                #00f5d4
            );
            border-radius: 10px;
            z-index: -1;
            transition: transform 0.5s ease;
        }

        /* Capa interna para efecto de borde */
        .boton-borde::after {
            content: '';
            position: absolute;
            inset: 0;
            background: #0f0f0f;
            border-radius: 8px;
            z-index: -1;
            transition: opacity 0.4s ease;
        }

        .boton-borde:hover {
            color: #fff;
            transform: scale(1.05);
        }

        .boton-borde:hover::before {
            transform: rotate(180deg) scale(1.1);
        }

        .boton-borde:hover::after {
            opacity: 0.3;
        }
    </style>
</head>
<body>
    <button class="boton-borde">BORDE ANIMADO</button>
</body>
</html>
```

**Cómo funciona:** Se usa `conic-gradient` para crear un borde multicolor. Al pasar el mouse, el pseudoelemento `::before` rota 180° con `transform`, mientras `::after` se vuelve transparente para revelar el gradiente.

---

## 3️⃣ Botón con gradiente en movimiento

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Botón Gradiente Animado</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #121212;
        }

        .boton-gradiente {
            padding: 18px 50px;
            font-size: 18px;
            font-weight: bold;
            color: #fff;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            letter-spacing: 1px;
            background: linear-gradient(
                90deg,
                #ff006e,
                #8338ec,
                #3a86ff,
                #06ffa5,
                #ff006e
            );
            background-size: 300% 100%;
            background-position: 0% 50%;
            transition: 
                background-position 0.8s ease,
                transform 0.3s ease,
                box-shadow 0.3s ease;
        }

        .boton-gradiente:hover {
            background-position: 100% 50%;
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 15px 30px rgba(131, 56, 236, 0.5);
        }

        .boton-gradiente:active {
            transform: translateY(0) scale(0.98);
        }
    </style>
</head>
<body>
    <button class="boton-gradiente">✨ GRADIENTE ✨</button>
</body>
</html>
```

**Cómo funciona:** El gradiente ocupa un `background-size` de 300%, pero solo se muestra una parte. Al hacer hover, `background-position` se anima de `0%` a `100%`, desplazando los colores suavemente.

---

## 📊 Comparativa rápida

| Efecto | Propiedad principal | Complejidad |
|--------|---------------------|-------------|
| Ripple | `::after` + `width/height` | ⭐⭐ |
| Borde animado | `conic-gradient` + `rotate` | ⭐⭐⭐ |
| Gradiente movimiento | `background-position` | ⭐ |

## 💡 Consejo extra
Para que cualquiera de estos botones tenga **accesibilidad**, agrega:

```css
.boton:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
    .boton {
        transition: none;
    }
}
```

Esto respeta a usuarios que prefieren menos animaciones o que navegan con teclado.
