# 4. Pensar primero el proyecto

Antes de escribir código debemos responder:

### ¿Qué sistema vamos a desarrollar?

Algunos ejemplos:

* catálogo de productos
* biblioteca
* sistema de noticias
* tienda online
* gestión de eventos
* sistema de turnos
* biblioteca escolar
* sistema de películas

Para comenzar conviene elegir un problema pequeño.

Por ejemplo:

> Sistema de productos.

El sistema tendrá:

```text
Producto
---------
id
nombre
descripcion
precio
stock
```

Después podemos ampliarlo.

---

# 5. Crear la base de datos

Entramos a:

```text
http://localhost/phpmyadmin
```

Creamos una base de datos:

```text
mi_proyecto
```

Luego creamos la tabla:

```sql
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0
);
```

Agregamos algunos datos de prueba:

```sql
INSERT INTO productos
(nombre, descripcion, precio, stock)
VALUES
('Teclado', 'Teclado USB', 25000, 10),
('Mouse', 'Mouse inalámbrico', 18000, 15),
('Monitor', 'Monitor LED 24 pulgadas', 150000, 5);
```

---
