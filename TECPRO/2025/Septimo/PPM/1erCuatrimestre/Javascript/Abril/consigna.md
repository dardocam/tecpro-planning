## Resumen de la tarea

Crear una mini-aplicación web que pueda **crear**, **editar** y **eliminar** tarjetas (“cards”) de producto dinámicamente manipulando el DOM con JavaScript. Deberán gestionar el proyecto con Git, subirlo a un repositorio en GitHub y documentar tanto el código como el proceso en un README.md profesional.

---

## 1. Objetivos de la entrega

1. Poner en práctica las técnicas de selección y manipulación del DOM vistas en clase.
2. Trabajar con Git y GitHub: repositorio, commits atómicos, branching, pull requests.
3. Redactar una documentación clara y completa sobre la estructura, el uso y las decisiones de implementación.

---

## 2. Requisitos funcionales

* **Crear tarjetas**: Mediante un formulario o botón “+”, generar nuevos cards con:

  * Imagen (URL),
  * Título,
  * Descripción.
* **Editar tarjetas**: Al hacer doble-click (o pulsar un icono “✎”) sobre el título o la descripción, permitir edición inline.
* **Eliminar tarjetas**: Botón “×” que quite la tarjeta correspondiente del DOM.
* **Persistencia opcional**: Guardar el estado en `localStorage` para que al recargar la página los cards persistan (extra).

---

## 3. Entregables en GitHub

1. **Repositorio público** en GitHub bajo tu cuenta, nombrado `dom-manipulation-<apellido>` (por ejemplo, `dom-manipulation-garcia`).
2. **Branch principal** (`main` o `master`) con el código final funcionando.
3. **Commits descriptivos** y frecuentes (al menos un commit por funcionalidad añadida).
4. **Pull Request**: crear un branch de desarrollo (`dev`) y luego un PR hacia `main` que incluya:

   * Descripción de cambios,
   * Capturas de pantalla,
   * Lista de chequeo (checklist) con las funcionalidades implementadas.
5. **README.md** en la raíz del repo, que incluya:

   * **Título y descripción** del proyecto.
   * **Instrucciones de instalación** (clonar, abrir `index.html`, etc.).
   * **Uso**: cómo crear/editar/eliminar tarjetas.
   * **Estructura del proyecto** (carpetas y archivos principales).
   * **Tecnologías**: HTML5, CSS3 (o framework ligero), JavaScript ES6+.
   * **Decisiones de diseño**: breve explicación de cómo manejaste el DOM, ejemplos de métodos clave usados.
   * **Retos y aprendizajes**: 2–3 párrafos reflexivos.
   * **Opcional**: Capturas de pantalla o GIFs mostrando la app en acción.

---

## 4. Estructura sugerida del repositorio

```
dom-manipulation-<apellido>/
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  └─ app.js
├─ assets/
│  └─ (imágenes, íconos…)
├─ README.md
└─ .gitignore
```

---

## 5. Criterios de evaluación

| Ítem                                          | Puntaje |
| --------------------------------------------- | :-----: |
| Funcionalidad completa (CRUD)                 |   40%   |
| Calidad del código (legibilidad, modularidad) |   20%   |
| Uso correcto de Git/GitHub                    |   15%   |
| Documentación (README y PR)                   |   15%   |
| Extras (persistencia, animaciones, pruebas)   |   10%   |

---

## 6. Plazos y modalidad de entrega

* **Fecha de entrega**: Viernes 23 de mayo de 2025 a las 23:59 (UTC−3).
* **Modo**: Subir repositorio público antes de la fecha límite.
* **Revisión**: Cada grupo enviará el enlace al repositorio por el aula virtual.

---

## 7. Pasos para publicar en GitHub

1. En tu máquina local, inicializa el repo:

   ```bash
   git init
   git add .
   git commit -m "Proyecto inicial: estructura base"
   git branch -M main
   git remote add origin https://github.com/tu_usuario/dom-manipulation-<apellido>.git
   git push -u origin main
   ```
2. Para desarrollar nuevas funcionalidades:

   ```bash
   git checkout -b dev
   # trabajar...
   git add .
   git commit -m "Añadida función de crear tarjetas"
   git push -u origin dev
   ```
3. En GitHub: abre un **Pull Request** de `dev` a `main`, completa la plantilla y asigna a tu instructor para revisión.
4. Una vez aprobado, haz merge y elimina la rama `dev`:

   ```bash
   git checkout main
   git merge dev
   git push
   git branch -d dev
   ```

---
