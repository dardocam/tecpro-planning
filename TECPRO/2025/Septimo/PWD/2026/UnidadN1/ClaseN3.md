

# 🧑‍🏫 CLASE AVANZADA II – HTML5 EN CONTEXTO REAL

## 🎯 Objetivos

Que los estudiantes:

* Comprendan cómo se usa HTML5 en proyectos reales
* Incorporen **SEO básico y metadatos**
* Integren **contenido multimedia**
* Conozcan **APIs modernas de HTML5**
* Produzcan código más cercano al entorno profesional

---

# 🟦 PARTE 1 – DISPARADOR (10 min)

💬 Pregunta:
👉 “¿Por qué algunas páginas aparecen primero en Google?”

Escuchar respuestas…

👉 Conclusión:

> No solo importa el contenido… también **cómo está construido el HTML**

---

# 🟦 PARTE 2 – HEAD PROFESIONAL Y SEO (20 min)

## 🧠 El `<head>` en profundidad

```html
<head>
  <meta charset="UTF-8">
  <meta name="description" content="Tienda de tecnología en Necochea">
  <meta name="keywords" content="tecnología, notebooks, celulares">
  <meta name="author" content="Alumno">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tienda Tech</title>
</head>
```

---

## 🎯 Explicación clave:

* `description` → Lo que aparece en buscadores
* `viewport` → Hace la web responsive
* `charset` → Soporte de caracteres

---

## 💡 Concepto importante:

👉 HTML influye en el posicionamiento (SEO)

---

# 🟩 PARTE 3 – MULTIMEDIA EN HTML5 (20 min)

## 🎥 Video y audio sin plugins

```html
<video controls width="300">
  <source src="video.mp4" type="video/mp4">
</video>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>
```

---

## 🧠 Ventajas:

* No se necesita Flash
* Funciona en todos los navegadores modernos
* Control total desde HTML

---

## 🧪 Mini actividad:

👉 Insertar un video o audio en la web personal

---

# 🟨 PARTE 4 – HTML5 Y APIS DEL NAVEGADOR (15 min)

👉 HTML5 no es solo etiquetas… también habilita funcionalidades

## 📍 Ejemplo: Geolocalización (conceptual)

👉 Permite obtener ubicación del usuario

## 💾 Ejemplo: LocalStorage

👉 Guardar datos en el navegador

---

## 🎯 Explicación simple:

> HTML5 + JS → aplicaciones web modernas

---

# 🟧 PARTE 5 – ESTRUCTURA REAL DE PROYECTO (15 min)

## 📁 Organización profesional

```bash
proyecto/
│
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── script.js
├── img/
└── assets/
```

---

## 🎯 Conceptos clave:

* Separación de responsabilidades
* Escalabilidad
* Orden del proyecto

---

# 🟪 PARTE 6 – HTML LIMPIO Y ESCALABLE (15 min)

## ❌ Ejemplo incorrecto:

```html
<div>
  <div>
    <div>Texto</div>
  </div>
</div>
```

## ✅ Ejemplo correcto:

```html
<main>
  <section>
    <p>Texto</p>
  </section>
</main>
```

---

## 🧠 Regla profesional:

👉 “Si podés evitar un `<div>`, hacelo”

---

# 🟫 PARTE 7 – PRÁCTICA INTEGRADORA (30 min)

## 🧪 Actividad:

👉 Crear una **landing page avanzada** que incluya:

✔ `<head>` completo
✔ Estructura semántica
✔ Video o audio
✔ Imagen con `alt`
✔ Formulario
✔ Organización clara

---

## 📌 Consigna:

💻 “Landing page de una app o emprendimiento real”

---

## 🎯 Ejemplo base:

```html
<header>
  <h1>App Fitness</h1>
</header>

<main>
  <section>
    <h2>Sobre la app</h2>
    <video controls>
      <source src="app.mp4">
    </video>
  </section>
</main>
```

---

# 🟥 PARTE 8 – CIERRE REFLEXIVO (10 min)

💬 Preguntas:

* ¿Por qué es importante el `<head>`?
* ¿Qué aporta HTML5 frente a versiones anteriores?
* ¿Qué diferencia hay entre una web simple y una profesional?

---

# 🧠 ACTIVIDAD PARA EL CUADERNO

✍️ Responder:

1. ¿Qué función cumple `meta viewport`?
2. ¿Para qué sirve `meta description`?
3. ¿Qué ventajas tiene HTML5 multimedia?
4. ¿Por qué es importante organizar carpetas?

---

# 📊 EVALUACIÓN

| Criterio        | Evaluación |
| --------------- | ---------- |
| Uso de `<head>` | ✔ / ✖      |
| Multimedia      | ✔ / ✖      |
| Semántica       | ✔ / ✖      |
| Organización    | ✔ / ✖      |

---

# 🚀 DESAFÍO EXTRA (MUY IMPORTANTE)

👉 Investigar y aplicar:

* Favicon
* Open Graph (para compartir en redes)
* Íconos

---



