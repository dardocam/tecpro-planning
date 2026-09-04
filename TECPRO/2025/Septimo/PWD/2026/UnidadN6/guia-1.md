Guía de proyecto
Sitio web en PHP tradicional + MySQL + API para aplicaciones móviles
1. Objetivo del proyecto

El objetivo es desarrollar un sitio web dinámico utilizando:

HTML5
CSS3
PHP
MySQL
JavaScript

Además, el sistema deberá disponer de una API REST que permita que una aplicación móvil pueda consultar y modificar información.

La idea general será:

                    ┌──────────────────┐
                    │    BASE DE DATOS │
                    │      MySQL       │
                    └────────┬─────────┘
                             │
                       PHP + PDO
                             │
              ┌──────────────┴──────────────┐
              │                             │
       ┌──────▼──────┐               ┌──────▼──────┐
       │ SITIO WEB   │               │     API     │
       │ PHP + HTML  │               │   REST/JSON │
       └──────┬──────┘               └──────┬──────┘
              │                             │
          Navegador                  App móvil / React

Un mismo sistema tendrá entonces dos formas de acceso:

Usuario → navegador → sitio PHP

App móvil → HTTP → API PHP → base de datos
2. Antes de comenzar

Necesitás tener instalado un entorno de desarrollo.

Para trabajar de manera sencilla podés utilizar:

- XAMPP
- Apache
- PHP
- MySQL/MariaDB
- phpMyAdmin
- Visual Studio Code
- Navegador web

En Linux también pueden utilizarse Apache, PHP y MariaDB instalados directamente.

Para este proyecto vamos a suponer que el servidor web utiliza:

- http://localhost/

3. Crear el proyecto

Dentro de la carpeta correspondiente al servidor web vamos a crear:

mi-proyecto/

Por ejemplo, con XAMPP:

htdocs/
└── mi-proyecto/

La primera prueba será crear:

index.php

con:

<?php

echo "Hola mundo";

?>

Abrimos:

- http://localhost/mi-proyecto/

Si aparece:

Hola mundo

el servidor PHP está funcionando correctamente.
