# Clase: Del Box Model a Flexbox

- **Espacio curricular:** Laboratorio de Diseño Web
- **Tema:** CSS — Box Model y Flexbox

---

## 1. Propósito

Comprender que el **Box Model** permite definir el tamaño y el espacio de cada elemento, mientras que **Flexbox** permite organizar y distribuir varios elementos dentro de un contenedor.

La idea central de la clase será:

> **Box Model = controlar una caja.**
> **Flexbox = organizar varias cajas.**

---

# 2. Objetivos

Al finalizar la clase, el estudiante podrá:

* Reconocer los componentes del Box Model.
* Comprender la diferencia entre `margin`, `padding`, `width` y `height`.
* Identificar las limitaciones de organizar elementos utilizando solamente Box Model.
* Convertir una estructura HTML sencilla a un diseño Flexbox.
* Utilizar las propiedades básicas de Flexbox:

  * `display: flex`
  * `flex-direction`
  * `justify-content`
  * `align-items`
  * `gap`
  * `flex-wrap`

---

# 3. Situación inicial

Supongamos que tenemos tres cajas:

```html
<div class="contenedor">
    <div class="caja">Caja 1</div>
    <div class="caja">Caja 2</div>
    <div class="caja">Caja 3</div>
</div>
```

Inicialmente podemos modificar cada caja:

```css
.caja {
    width: 150px;
    height: 100px;
    margin: 10px;
    padding: 20px;
}
```

Esto permite controlar **cada caja individualmente**.

Pero aparece una pregunta:

> ¿Cómo hacemos para colocar las tres cajas una al lado de la otra y distribuirlas correctamente?

Aquí aparece **Flexbox**.

---

# 4. Recordamos el Box Model

Cada elemento HTML puede entenderse como una caja:

```text
┌──────────────────────────────┐
│           MARGIN             │
│  ┌────────────────────────┐  │
│  │        BORDER          │  │
│  │  ┌──────────────────┐  │  │
│  │  │      PADDING     │  │  │
│  │  │  ┌────────────┐  │  │  │
│  │  │  │  CONTENT   │  │  │  │
│  │  │  └────────────┘  │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### Propiedades principales

| Propiedad | Función             |
| --------- | ------------------- |
| `width`   | Ancho del contenido |
| `height`  | Alto del contenido  |
| `padding` | Espacio interno     |
| `border`  | Borde               |
| `margin`  | Espacio externo     |

Por ejemplo:

```css
.caja {
    width: 150px;
    height: 100px;
    padding: 20px;
    border: 2px solid black;
    margin: 10px;
}
```

El Box Model nos permite **controlar el tamaño y los espacios**.

Pero todavía no estamos utilizando un mecanismo específico para **organizar las cajas entre sí**.

---

# 5. El problema

Tenemos:

```html
<div class="contenedor">
    <div class="caja">1</div>
    <div class="caja">2</div>
    <div class="caja">3</div>
</div>
```

Queremos:

```text
┌─────────────────────────────────────────────┐
│                                             │
│   ┌──────┐    ┌──────┐    ┌──────┐         │
│   │  1   │    │  2   │    │  3   │         │
│   └──────┘    └──────┘    └──────┘         │
│                                             │
└─────────────────────────────────────────────┘
```

Podríamos intentar hacerlo utilizando:

* `width`
* `margin`
* `display`
* posiciones
* valores fijos

Pero estaríamos resolviendo manualmente un problema de **distribución**.

Flexbox fue diseñado precisamente para eso.

---

# 6. Primer paso hacia Flexbox

No necesitamos modificar las cajas.

Modificamos el **contenedor**:

```css
.contenedor {
    display: flex;
}
```

Y automáticamente los elementos hijos se organizan horizontalmente.

```text
Antes:

1
2
3


Después de display: flex:

1    2    3
```

Esta es la idea fundamental:

> **Flexbox se aplica principalmente al contenedor, no a las cajas que queremos organizar.**

---

# 7. Dirección

Por defecto:

```css
.contenedor {
    display: flex;
}
```

equivale a una dirección horizontal:

```text
1 → 2 → 3
```

Podemos cambiarla:

```css
.contenedor {
    display: flex;
    flex-direction: column;
}
```

Resultado:

```text
1
↓
2
↓
3
```

Tenemos entonces:

```css
flex-direction: row;
```

para trabajar horizontalmente.

Y:

```css
flex-direction: column;
```

para trabajar verticalmente.

---

# 8. Distribuir los elementos

Ahora queremos controlar cómo se distribuyen las cajas.

Utilizamos:

```css
justify-content
```

Por ejemplo:

```css
.contenedor {
    display: flex;
    justify-content: center;
}
```

Resultado:

```text
┌───────────────────────────────────────┐
│                                       │
│       1       2       3               │
│                                       │
└───────────────────────────────────────┘
```

Otros valores importantes:

```css
justify-content: flex-start;
justify-content: center;
justify-content: flex-end;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;
```

### Ejemplo

```css
.contenedor {
    display: flex;
    justify-content: space-between;
}
```

Resultado conceptual:

```text
1                     2                     3
```

---

# 9. Alinear verticalmente

Para controlar la alineación sobre el eje perpendicular utilizamos:

```css
align-items
```

Por ejemplo:

```css
.contenedor {
    display: flex;
    align-items: center;
}
```

Esto permite centrar los elementos verticalmente dentro del contenedor.

Por ejemplo:

```text
┌─────────────────────────────────────┐
│                                     │
│      ┌───┐    ┌───┐    ┌───┐       │
│      │ 1 │    │ 2 │    │ 3 │       │
│      └───┘    └───┘    └───┘       │
│                                     │
└─────────────────────────────────────┘
```

---

# 10. Espacio entre elementos

En lugar de colocar `margin` manualmente:

```css
.caja {
    margin: 10px;
}
```

podemos utilizar:

```css
.contenedor {
    display: flex;
    gap: 20px;
}
```

Esto resulta mucho más sencillo para separar elementos.

---

# 11. Ejemplo completo

### HTML

```html
<div class="contenedor">
    <div class="caja">Caja 1</div>
    <div class="caja">Caja 2</div>
    <div class="caja">Caja 3</div>
</div>
```

### CSS

```css
.contenedor {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.caja {
    width: 120px;
    height: 100px;
    padding: 20px;
    border: 2px solid black;
}
```

Aquí podemos observar que **Box Model y Flexbox no compiten**.

Se complementan.

```text
                CONTENEDOR
                    │
                    │ Flexbox
                    ▼
          ┌──────┬──────┬──────┐
          │ Caja │ Caja │ Caja │
          └──────┴──────┴──────┘
             ▲      ▲      ▲
             │      │      │
          Box Model en cada elemento
```

---

# 12. Box Model + Flexbox

Esta es la idea que los estudiantes deben llevarse de la clase:

### Box Model

Se ocupa principalmente de:

```text
¿De qué tamaño es mi caja?
¿Cuánto espacio interno tiene?
¿Cuánto espacio externo tiene?
¿Tiene borde?
```

### Flexbox

Se ocupa principalmente de:

```text
¿Cómo organizo mis cajas?
¿Horizontal o vertical?
¿Cómo las distribuyo?
¿Cómo las alineo?
¿Cuánto espacio hay entre ellas?
```

Por lo tanto:

```text
                 CSS
                  │
        ┌─────────┴─────────┐
        │                   │
    Box Model            Flexbox
        │                   │
   tamaño y espacio     distribución
        │                   │
        └─────────┬─────────┘
                  │
             Diseño web
```

---

# 13. Actividad práctica

## Actividad: "De cajas desordenadas a Flexbox"

Crear una página que contenga:

* Un encabezado.
* Un contenedor.
* Tres tarjetas.
* Un pie de página.

HTML inicial:

```html
<header>
    <h1>Mi página</h1>
</header>

<main class="contenedor">

    <div class="tarjeta">
        <h2>HTML</h2>
        <p>Estructura.</p>
    </div>

    <div class="tarjeta">
        <h2>CSS</h2>
        <p>Diseño.</p>
    </div>

    <div class="tarjeta">
        <h2>Flexbox</h2>
        <p>Distribución.</p>
    </div>

</main>

<footer>
    <p>Laboratorio de Diseño Web</p>
</footer>
```

### Paso 1

Aplicar Box Model a las tarjetas:

```css
.tarjeta {
    width: 200px;
    padding: 20px;
    border: 1px solid black;
}
```

### Paso 2

Aplicar Flexbox al contenedor:

```css
.contenedor {
    display: flex;
}
```

### Paso 3

Centrar las tarjetas:

```css
.contenedor {
    display: flex;
    justify-content: center;
}
```

### Paso 4

Separarlas:

```css
.contenedor {
    display: flex;
    justify-content: center;
    gap: 20px;
}
```

### Paso 5

Cambiar la dirección:

```css
flex-direction: column;
```

Observar qué sucede.

Luego volver a:

```css
flex-direction: row;
```

---

# 14. Desafío final

Modificar el diseño para conseguir:

```text
┌──────────────────────────────────────────────┐
│                  MI PÁGINA                   │
├──────────────────────────────────────────────┤
│                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│   │  HTML    │  │   CSS    │  │ FLEXBOX  │   │
│   │          │  │          │  │          │   │
│   └──────────┘  └──────────┘  └──────────┘   │
│                                              │
├──────────────────────────────────────────────┤
│              Laboratorio Web                 │
└──────────────────────────────────────────────┘
```

Utilizar únicamente:

```css
display: flex;
flex-direction;
justify-content;
align-items;
gap;
```

además de las propiedades básicas del Box Model.

---

# 15. Cierre de la clase

Preguntas rápidas:

1. ¿Qué problema resuelve el Box Model?
2. ¿Qué problema resuelve Flexbox?
3. ¿Dónde colocamos normalmente `display: flex`?
4. ¿Qué diferencia existe entre `justify-content` y `align-items`?
5. ¿Para qué sirve `gap`?
6. ¿Podemos utilizar Box Model y Flexbox al mismo tiempo?

### Concepto final

> **Box Model construye y dimensiona las cajas. Flexbox organiza esas cajas.**

Ese concepto será la base para continuar posteriormente con **layouts completos y diseño responsive**.
