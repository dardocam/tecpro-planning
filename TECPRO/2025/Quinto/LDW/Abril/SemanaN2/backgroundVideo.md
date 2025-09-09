```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video de Fondo</title>
    <style>
        /* Estilo del cuerpo para cubrir toda la página */
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: Arial, sans-serif;
            color: white;
            overflow: hidden; /* Evita barras de desplazamiento */
        }

        /* Contenedor del video de fondo */
        .video-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }

        .video-background video {
            position: absolute;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            transform: translateX(-50%) translateY(-50%);
            object-fit: cover; /* Asegura que el video cubra todo sin distorsión */
        }

        /* Contenido sobre el video */
        .content {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 20px;
            background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente para mejorar legibilidad */
            margin: 100px auto;
            max-width: 800px;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <!-- Contenedor del video de fondo -->
    <div class="video-background">
        <video autoplay muted loop>
            <source src="ruta/a/tu-video.mp4" type="video/mp4">
            Tu navegador no soporta el elemento de video.
        </video>
    </div>

    <!-- Contenido de la página -->
    <div class="content">
        <h1>Bienvenido</h1>
        <p>Este es un ejemplo de fondo con video en CSS.</p>
    </div>
</body>
</html>
```

### Instrucciones:
1. Reemplaza `ruta/a/tu-video.mp4` con la ruta real de tu archivo de video.
2. Asegúrate de que el video esté optimizado (pequeño en tamaño y formato `.mp4` recomendado).
3. El video se reproduce automáticamente, en bucle y sin sonido (`muted`), requisitos para que funcione en la mayoría de navegadores.

> ✅ **Consejo**: Para móviles, algunos navegadores pueden no reproducir video de fondo automáticamente. Considera usar una imagen de fondo como alternativa en pantallas pequeñas usando `@media` queries.