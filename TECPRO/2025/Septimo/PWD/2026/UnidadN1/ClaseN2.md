# 🧑‍🏫 CLASE AVANZADA – HTML5 PROFESIONAL

## 🎯 Objetivos

Que los estudiantes:

* Comprendan el uso **avanzado y correcto de HTML5**
* Apliquen **semántica real**
* Incorporen **accesibilidad**
* Integren **formularios avanzados**
* Conozcan buenas prácticas profesionales

---

# 🟦 PARTE 1 – REPASO RÁPIDO (10 min)

💬 Preguntas:

* ¿Qué hace HTML?
* ¿Qué etiquetas usamos?

👉 Conclusión:

> HTML estructura la web → pero bien usado mejora SEO, accesibilidad y mantenimiento.

---

# 🟦 PARTE 2 – HTML SEMÁNTICO AVANZADO (20 min)

## 🧩 Estructura profesional

![Image](https://images.openai.com/static-rsc-4/VcSxWycG3NSkcW-s_AyVpg27ygCi-y3TfM6eU2hc_A2tTzn_idlTDHJMVOn5N_qk5D8Bud_yRtvSk5JD8BTQm908VvKsASKGwNRz5IgCD_oBP-aKw2OW_EU_XZa5GsI8ivTdgnWuj0d7iFVUX1de9v6YKUU-6vwk7iUSWmGAZwgsmoSgcadpDwxA49M_7gtS?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/u3LxPA2XSVupuzHFxWSsa64DinhHFbYUmqs_CUwXBK9wHuiB2-GeXAxYuYdaliX4_VXYY9VhWWmQNF6v0U64SfFneScO3j1Mu0hgFNHCrLC1FldNzho7n3ElfY6-7as2c90ZJwHd29AWb6sFg67W1wMC_d7qeCDCL4HRotjfgTD2mO-HH6CnaaqRDuuaqcY2?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/1MUNhTafM1cO_Uu4R64fBwzk6bm2kBG5imW2_dTSihxGuzCEZFYaZTJZIbJ8A9O0B60NMBSOlgxGaJwZCqyl11KAHNMZ7IiZKKM5GT2Ql8VFDj_O5VCMQvKi2eailwTSOv9lXv5kfAQUOousu-G8SLmU4VXrTMhOtGlZqpeWZrvEGcTDVuIKl3_jWTfGVtQd?purpose=fullsize)

```html
<header>
  <h1>Mi sitio</h1>
</header>

<nav>
  <a href="#">Inicio</a>
  <a href="#">Contacto</a>
</nav>

<main>
  <section>
    <article>
      <h2>Artículo 1</h2>
      <p>Contenido...</p>
    </article>
  </section>

  <aside>
    Publicidad o info extra
  </aside>
</main>

<footer>
  <p>© 2026</p>
</footer>
```

---

## 🎯 Conceptos clave:

* `<section>` → Agrupa contenido
* `<article>` → Contenido independiente
* `<aside>` → Información secundaria

👉 **Regla profesional:**

> Si el contenido puede existir solo → usar `<article>`

---

# 🟩 PARTE 3 – ACCESIBILIDAD WEB (15 min)

## ♿ ¿Qué es?

👉 Hacer la web usable para todos (incluyendo personas con discapacidad)

---

## 🧠 Buenas prácticas:

* Usar etiquetas correctas
* Agregar `alt` en imágenes
* Usar jerarquía de títulos (`h1 → h6`)

```html
<img src="foto.jpg" alt="Persona usando una computadora">
```

---

## 🎯 Importancia:

* Mejora SEO
* Mejora experiencia de usuario
* Es un estándar profesional

---

# 🟨 PARTE 4 – FORMULARIOS AVANZADOS (20 min)

## 📋 Inputs modernos de HTML5

```html
<form>
  <label>Email:</label>
  <input type="email" required>

  <label>Edad:</label>
  <input type="number" min="1" max="100">

  <label>Fecha:</label>
  <input type="date">

  <button type="submit">Enviar</button>
</form>
```

---

## 🎯 Tipos importantes:

* `email` → valida automáticamente
* `number` → control numérico
* `date` → calendario
* `required` → campo obligatorio

---

## 💡 Ventaja:

👉 HTML5 valida sin usar JavaScript

---

# 🟧 PARTE 5 – BUENAS PRÁCTICAS PROFESIONALES (15 min)

## ✅ Reglas clave:

* No abusar de `<div>`
* Usar nombres claros en clases
* Código ordenado e indentado
* Separar HTML de CSS

---

## 🧠 Ejemplo correcto:

```html
<section class="productos">
  <article class="producto">
    <h2>Notebook</h2>
    <p>Descripción...</p>
  </article>
</section>
```

---

# 🟪 PARTE 6 – PRÁCTICA GUIADA (25 min)

## 🧪 Actividad:

👉 Crear una página completa que tenga:

✔ Header
✔ Nav
✔ Main
✔ Section con 2 artículos
✔ Aside
✔ Footer
✔ Formulario

---

## 📌 Consigna:

💻 “Crear una página de un emprendimiento (ej: tecnología, ropa, comida)”

---

## 🎯 Estructura mínima esperada:

```html
<header>
  <h1>Mi emprendimiento</h1>
</header>

<nav>
  <a href="#">Inicio</a>
</nav>

<main>
  <section>
    <article>
      <h2>Producto</h2>
      <p>Descripción</p>
    </article>
  </section>

  <aside>
    Promoción
  </aside>
</main>

<footer>
  <p>Contacto</p>
</footer>
```

---

# 🟥 PARTE 7 – CIERRE Y REFLEXIÓN (10 min)

💬 Preguntas:

* ¿Por qué es mejor usar HTML semántico?
* ¿Qué diferencia hay entre `<section>` y `<article>`?
* ¿Para qué sirve `required`?

---

# 🧠 ACTIVIDAD PARA EL CUADERNO

✍️ Responder:

1. ¿Qué es HTML semántico?
2. ¿Qué función cumple `<aside>`?
3. ¿Qué ventaja tienen los formularios HTML5?
4. ¿Qué es accesibilidad web?

---


