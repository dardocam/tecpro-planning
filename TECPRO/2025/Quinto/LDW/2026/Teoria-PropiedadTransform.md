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
