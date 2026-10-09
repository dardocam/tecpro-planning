# 12. CRUD

Nuestro sistema debería evolucionar hacia un CRUD.

CRUD significa:

```text
C → Create
R → Read
U → Update
D → Delete
```

En español:

```text
Crear
Consultar
Modificar
Eliminar
```

Para productos tendremos:

```text
productos/
├── index.php
├── crear.php
├── editar.php
└── eliminar.php
```

La meta inicial será completar el CRUD desde la web.

---

# 13. ¿Dónde aparece la API?

Una API permitirá que otro programa consulte nuestro sistema.

Por ejemplo:

```text
Aplicación móvil
       │
       │ HTTP
       ▼
api/productos.php
       │
       ▼
     MySQL
```

La diferencia fundamental es que el sitio web normalmente devuelve:

```text
HTML
```

mientras que la API devolverá:

```text
JSON
```

Por ejemplo:

```json
[
    {
        "id": 1,
        "nombre": "Teclado",
        "precio": 25000,
        "stock": 10
    },
    {
        "id": 2,
        "nombre": "Mouse",
        "precio": 18000,
        "stock": 15
    }
]
```

---
