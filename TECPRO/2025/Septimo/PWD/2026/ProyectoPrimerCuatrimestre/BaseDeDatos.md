# Bases de Datos MySQL Administradas con phpMyAdmin

## Ejemplo: Sistema de Tienda Online

En el desarrollo de aplicaciones web es muy común utilizar una base de datos relacional para almacenar información de usuarios, productos y compras. Una de las herramientas más utilizadas para administrar bases de datos MySQL es phpMyAdmin, ya que permite crear tablas, relaciones y realizar consultas desde una interfaz gráfica.

En este ejemplo construiremos una base de datos llamada **tienda_online** con las siguientes tablas:

* usuarios
* productos
* carrito
* pedidos
* detalle_pedido

---

# 1. ¿Qué es una Base de Datos Relacional?

Una base de datos relacional organiza la información en tablas relacionadas entre sí mediante claves.

Cada tabla contiene:

* **Campos (columnas)**: atributos de la información.
* **Registros (filas)**: datos almacenados.
* **Clave Primaria (Primary Key)**: identifica de forma única cada registro.
* **Clave Foránea (Foreign Key)**: relaciona una tabla con otra.

---

# 2. Diseño General del Sistema

```text
USUARIOS
    │
    ├── CARRITO
    │
    └── PEDIDOS
            │
            └── DETALLE_PEDIDO
                     │
                     └── PRODUCTOS
```

---

# 3. Tabla: usuarios

Almacena la información de los clientes.

| Campo          | Tipo         | Descripción           |
| -------------- | ------------ | --------------------- |
| id_usuario     | INT          | Clave primaria        |
| nombre         | VARCHAR(100) | Nombre completo       |
| email          | VARCHAR(100) | Correo electrónico    |
| password       | VARCHAR(255) | Contraseña encriptada |
| fecha_registro | DATETIME     | Fecha de alta         |

### SQL

```sql
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Clave Primaria

```text
id_usuario
```

Cada usuario tendrá un identificador único.

---

# 4. Tabla: productos

Contiene el catálogo de productos disponibles.

| Campo       | Tipo          |
| ----------- | ------------- |
| id_producto | INT           |
| nombre      | VARCHAR(100)  |
| descripcion | TEXT          |
| precio      | DECIMAL(10,2) |
| stock       | INT           |

### SQL

```sql
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0
);
```

### Clave Primaria

```text
id_producto
```

---

# 5. Tabla: carrito

Representa los productos agregados al carrito de compras por cada usuario.

| Campo       | Tipo |
| ----------- | ---- |
| id_carrito  | INT  |
| id_usuario  | INT  |
| id_producto | INT  |
| cantidad    | INT  |

### SQL

```sql
CREATE TABLE carrito (
    id_carrito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
);
```

### Relaciones

```text
usuarios (1) ---- (N) carrito
productos (1) --- (N) carrito
```

Un usuario puede tener muchos productos en su carrito.

---

# 6. Tabla: pedidos

Cuando el usuario confirma la compra se genera un pedido.

| Campo        | Tipo          |
| ------------ | ------------- |
| id_pedido    | INT           |
| id_usuario   | INT           |
| fecha_pedido | DATETIME      |
| total        | DECIMAL(10,2) |
| estado       | VARCHAR(50)   |

### SQL

```sql
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    estado VARCHAR(50),

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);
```

### Relaciones

```text
usuarios (1) ---- (N) pedidos
```

Un usuario puede realizar múltiples pedidos.

---

# 7. Tabla: detalle_pedido

Contiene cada producto comprado dentro de un pedido.

| Campo           | Tipo          |
| --------------- | ------------- |
| id_detalle      | INT           |
| id_pedido       | INT           |
| id_producto     | INT           |
| cantidad        | INT           |
| precio_unitario | DECIMAL(10,2) |

### SQL

```sql
CREATE TABLE detalle_pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2),

    FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido),

    FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
);
```

### Relaciones

```text
pedidos (1) ------ (N) detalle_pedido
productos (1) ---- (N) detalle_pedido
```

---

# 8. Diagrama Entidad-Relación (DER)

```text
┌──────────────┐
│  usuarios    │
├──────────────┤
│ id_usuario PK│
│ nombre       │
│ email        │
│ password     │
└──────┬───────┘
       │
       │1
       │
       │N
┌──────▼───────┐
│   pedidos    │
├──────────────┤
│ id_pedido PK │
│ id_usuario FK│
│ fecha        │
│ total        │
└──────┬───────┘
       │
       │1
       │
       │N
┌──────▼────────────┐
│ detalle_pedido    │
├───────────────────┤
│ id_detalle PK     │
│ id_pedido FK      │
│ id_producto FK    │
│ cantidad          │
│ precio_unitario   │
└──────┬────────────┘
       │
       │N
       │
       │1
┌──────▼───────┐
│ productos    │
├──────────────┤
│ id_producto PK│
│ nombre       │
│ precio       │
│ stock        │
└──────────────┘


┌──────────────┐
│ carrito      │
├──────────────┤
│ id_carrito PK│
│ id_usuario FK│
│ id_productoFK│
│ cantidad     │
└──────────────┘
```

---

# 9. Creación en phpMyAdmin

### Paso 1: Crear la Base de Datos

1. Ingresar a phpMyAdmin.
2. Seleccionar **Nueva**.
3. Escribir:

```text
tienda_online
```

4. Elegir cotejamiento:

```text
utf8mb4_general_ci
```

5. Presionar **Crear**.

---

### Paso 2: Crear las Tablas

Crear cada tabla ejecutando los scripts SQL anteriores en la pestaña:

```text
SQL
```

---

### Paso 3: Crear Relaciones

Ingresar en:

```text
Estructura → Vista Relacional
```

y configurar las claves foráneas.

Ejemplo:

```text
carrito.id_usuario
→ usuarios.id_usuario

carrito.id_producto
→ productos.id_producto
```

---

# 10. Consultas Útiles

### Ver todos los productos

```sql
SELECT * FROM productos;
```

### Ver pedidos de un usuario

```sql
SELECT
    p.id_pedido,
    p.fecha_pedido,
    p.total
FROM pedidos p
WHERE p.id_usuario = 1;
```

### Ver detalle de un pedido

```sql
SELECT
    pr.nombre,
    dp.cantidad,
    dp.precio_unitario
FROM detalle_pedido dp
INNER JOIN productos pr
ON dp.id_producto = pr.id_producto
WHERE dp.id_pedido = 1;
```

---

# 11. Ventajas de este Diseño



✔ Permite mantener integridad referencial mediante claves foráneas.

✔ Facilita consultas complejas con JOIN.

✔ Escalable para agregar:

* categorías de productos
* medios de pago
* direcciones de envío
* historial de estados
* facturación electrónica

