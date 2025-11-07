Implementación directa de **login con Express + express-session + MySQL real** usando `mysql2/promise`.

## 1. Instalación

```bash
npm install express express-session bcryptjs mysql2
```

## 2. Estructura mínima

```
project/
 ├─ server.js
 ├─ db.js
 ├─ queries.sql   (opcional)
```

## 3. SQL de ejemplo (tabla real)

**queries.sql**

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Inserta un usuario con contraseña hasheada:
-- La contraseña es: 123456
INSERT INTO users (username, password)
VALUES ('admin', '$2a$10$9oK1iFmyH0P7eJ7uyHhVfeX3N6p/RtLRxUp5kKTKkVN2JDsJVF6VS');
```

## 4. Conexión MySQL (pool)

**db.js**

```js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "tu_password",
  database: "tu_db",
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
```

## 5. Servidor Express con sesiones

**server.js**

```js
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const pool = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "clave-secreta-super-segura",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 30 }
  })
);

function authRequired(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: "No autorizado" });
  next();
}

// Login real con MySQL
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username
  ]);

  if (rows.length === 0)
    return res.status(400).json({ error: "Usuario no encontrado" });

  const user = rows[0];

  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(400).json({ error: "Credenciales inválidas" });

  req.session.user = { id: user.id, username: user.username };

  res.json({ message: "Login exitoso" });
});

// Ruta protegida
app.get("/perfil", authRequired, (req, res) => {
  res.json({ user: req.session.user });
});

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: "Error cerrando sesión" });
    res.json({ message: "Sesión finalizada" });
  });
});

app.listen(3000);
```

## 6. Notas técnicas

* `express-session` almacena la sesión en memoria por defecto. Para producción debes usar un **store**: `express-mysql-session`, `redis`, etc.
* La contraseña en la base debe estar hasheada con `bcrypt`.

