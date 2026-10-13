# Guía práctica: publicar mi página web en GitHub Pages

Laboratorio de Diseño Web · Nivel inicial · Sin instalar programas

## ¿Qué vamos a hacer?

Vamos a publicar nuestra página web para que cualquier persona pueda visitarla desde un navegador mediante un enlace. Para esto utilizaremos GitHub Pages, un servicio gratuito de GitHub que permite publicar páginas web creadas con HTML, CSS y JavaScript.


## Paso 1. Crear una cuenta

![GitHub Vs. Bitbucket: Which Code Hosting Platform is Best? - Hatica](https://images.openai.com/static-rsc-4/h6nY0yf7JsEycY0Sx4mRb8nNKCcIcOBcXiDBB5zoyQB53kJfJ3b9fumZfym32-9QtI9bMIOfte8A4pxGn5j31kvTkB5L6rFXiUBQgJque7-Zjv7CR_c2oXmVt6Bh1m44flmqva6djfbFywIxlr_rYABjp8Znp5gQnvWf0wXwtYs?purpose=inline)

1. Entrá en

   github.com

   .

2. Seleccioná Sign up para registrarte.

3. Completá el registro y verificá tu correo electrónico.

4. Iniciá sesión con tu cuenta.

## Paso 2. Crear un repositorio

Un repositorio es un espacio donde guardaremos los archivos de nuestra página web.

![Continuous Deployment With Netlify](https://images.openai.com/static-rsc-4/D_ynQJlkmEJdASysRelvvrfuLn70myVaOqp_KDVwZHlrY5k2XQIPnlm2_fgXawzkPwgyQRdZL9sj0ib9U0KLQGwRfySCxRJfRmo1jFyfzGxZZptAJcsLeI-yOQFlWhhFE6aIsUbyhJ9K1lZ8H8TAk2MOhUmfdQzk0y1cGY2Emvw?purpose=inline)

1. Buscá el botón New repository. También podés ingresar directamente en

github.com/new

.

2. Completá los datos:

* Repository name: `mi-primera-web`

* Description: Mi primera página web (opcional).

* Visibility: seleccioná `Public`.

* Add a README file: podés dejarlo activado.

3. Presioná Create repository.

## Paso 3. Subir los archivos de mi página

Ahora vamos a copiar los archivos que ya tenemos realizados en el laboratorio.

Ejemplo de organización de archivos

mi-primera-web/

`index.html`

Obligatorio

`estilos.css`

`script.js`

`img/`

La estructura es solo un ejemplo. Subí los archivos y las carpetas que realmente utiliza tu proyecto.

Seguí estos pasos:

1. Dentro del repositorio, seleccioná Add file.

2. Elegí Upload files.

3. Arrastrá los archivos de tu página desde tu computadora hasta la ventana del navegador.

4. Verificá que aparezca `index.html` y que los demás archivos estén incluidos.

5. Presioná Commit changes para guardar los archivos en GitHub.

Importante: `index.html` debe quedar en la carpeta principal del repositorio, no dentro de otra carpeta, cuando publiquemos desde la raíz.


## Paso 4. Activar GitHub Pages

Esta es la configuración que permite que el repositorio se convierta en una página web pública.

![Guide – data science for openwashdata](https://images.openai.com/static-rsc-4/HS6S3hN6TyoTsYCgI5vdaUIodwY0PbBESWXiojH396cMtK-Y9_f6U88etJcq3KBZOc2R7HJKjC-cmzEphXtfMmxYDq4Ti8FN9G-q2fYwFwizwUsgrkhFCv6YxZfYTcNhmayR0lJQ4SBWYeG4gSWZ1BB34hqE4uXmXoZVFLcoO_I?purpose=inline)

1. Entrar en Settings

Dentro del repositorio, hacé clic en Settings.

![Guides
Deploying
Deploying to GitHub Pages](https://images.openai.com/static-rsc-4/7_I-cs-aaVT8dHzwuPot4E0OqceiG7qlA4t17vGlVnq4klDJHXeIHyqMlmGyqzz_yPfcuHHpObJdI_rYgx9kBIC7o5tZayoW-3gu4GkkB7C2EadAlinVlQSh4TJZ1ZS-MphvEqYJccjS--BzLM07BdcaCuEPpowoSIre89wSgnU?purpose=inline)

2. Buscar Pages

En el menú lateral, seleccioná Pages.

![](https://images.openai.com/static-rsc-4/GeYd790pBbaiJBcE0mA6hrJgUalX5dTauvwynUXTkr3a7MEes_twmIAiiIAVQIRWOT7w8SgNIrfCdFfBq-FxVwiLs7pLosNlpfr9Eqwkm5JjnmzDQMxpdtk8rPukW2DUvMpnqtDdBElbcWNyVCpzukDF4d_7bp77x0LVtEfLfYE?purpose=inline)

3. Configurar la publicación

En Build and deployment, seleccioná:

* Source: `Deploy from a branch`

* Branch: `main`

* Folder: `/(root)`

Finalmente, presioná Save.

Esta configuración indica que GitHub debe publicar los archivos de la raíz de la rama `main`.


## Paso 5. Visitar mi página web

- Después de guardar la configuración, GitHub comenzará a publicar el sitio. Puede demorar unos minutos.

- La dirección tendrá este formato:

Dirección de mi página

Reemplazá los dos datos por los tuyos.

[https://TU-USUARIO.github.io/mi-primera-web/](https://TU-USUARIO.github.io/mi-primera-web/)

Copiar ejemplo de dirección

Para conocer la dirección exacta, volvé a Settings → Pages y buscá el enlace que GitHub muestra para visitar el sitio. También podés consultar el estado de publicación en esa sección.

## Paso 6. Comprobar que funciona

- Abrí la dirección publicada en una pestaña nueva y revisá:

- Lista de verificación

- 0 de 5

- La página principal se abre correctamente.

- Los estilos CSS se aplican correctamente.

- Las imágenes se visualizan.

- Los enlaces funcionan.

- El diseño se ve bien en una pantalla de celular.

## Problemas frecuentes

| Problema                  | ¿Qué revisar?                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------- |
| Aparece un error 404      | Que `index.html` esté en la raíz y Pages esté configurado correctamente.              |
| No se ven los estilos     | Que el nombre y la ruta de los archivos CSS coincidan exactamente.                    |
| No aparecen las imágenes  | Revisá las rutas y las mayúsculas/minúsculas en los nombres.                          |
| No se actualiza la página | Esperá unos minutos y recargá el sitio. Revisá también el estado en Settings → Pages. |

## Lo que tenés que recordar

* GitHub almacena los archivos de tu proyecto.

* GitHub Pages publica tu sitio web.

* `index.html` es el archivo principal de la página.

* Cuando modificás los archivos y guardás los cambios en el repositorio, GitHub puede volver a publicar el sitio automáticamente.

* La página publicada es accesible públicamente. No subas contraseñas, datos personales ni información privada.



Limitación importante para el laboratorio: GitHub Pages sirve sitios estáticos. Permite publicar HTML, CSS y JavaScript del lado del navegador, pero no ejecuta PHP ni aloja una base de datos MySQL.
