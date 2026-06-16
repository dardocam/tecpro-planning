## HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Layout Clásico</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <header>
        Header
    </header>

    <nav>
        Left Nav
    </nav>

    <main>
        Main Content
    </main>

    <footer>
        Footer
    </footer>

</body>
</html>
```

## CSS

```css
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Arial, sans-serif;
}

/* Encabezado */
header{
    height:80px;
    background:#2c3e50;
    color:white;
    text-align:center;
    line-height:80px;
}

/* Menú lateral */
nav{
    float:left;
    width:250px;
    height:500px;
    background:#34495e;
    color:white;
    padding:20px;
}

/* Contenido principal */
main{
    margin-left:250px;
    height:500px;
    background:#ecf0f1;
    padding:20px;
}

/* Pie de página */
footer{
    clear:both;
    height:60px;
    background:#2c3e50;
    color:white;
    text-align:center;
    line-height:60px;
}
```

## Funcionamiento

La clave está en tres propiedades:

```css
float:left;
```

Hace que el menú lateral se pegue al lado izquierdo.

```css
margin-left:250px;
```

Desplaza el contenido principal para que no quede debajo del menú.

```css
clear:both;
```

Obliga al footer a colocarse debajo de los elementos flotantes.

## Resultado

```text
+----------------------------------+
|             HEADER               |
+-----------+----------------------+
|           |                      |
|   NAV     |        MAIN          |
|           |                      |
|           |                      |
+-----------+----------------------+
|             FOOTER               |
+----------------------------------+
```

### Valor didáctico

Esta técnica es excelente para mostrar la evolución histórica de CSS:

1. Posicionamiento normal (block e inline).
2. Float Layouts (2000-2015).
3. Flexbox (2015+).
4. CSS Grid (2017+).

